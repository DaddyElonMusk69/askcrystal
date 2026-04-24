from __future__ import annotations

import json
from dataclasses import dataclass, field
from pathlib import Path
from string import Formatter
from typing import Any

try:
    import yaml  # type: ignore
except ModuleNotFoundError:  # pragma: no cover
    yaml = None


class SkillError(Exception):
    """Base exception for skill runtime issues."""


class SkillNotFoundError(SkillError):
    """Raised when a requested skill id does not exist."""


class SkillValidationError(SkillError):
    """Raised when required skill inputs are missing."""


@dataclass(slots=True)
class SkillInput:
    name: str
    description: str
    required: bool = True
    default: str | None = None


@dataclass(slots=True)
class SkillDefinition:
    id: str
    name: str
    description: str
    when_to_use: str
    inputs: list[SkillInput] = field(default_factory=list)
    template: str = ""
    tags: list[str] = field(default_factory=list)

    def referenced_variables(self) -> set[str]:
        formatter = Formatter()
        fields: set[str] = set()
        for _, field_name, _, _ in formatter.parse(self.template):
            if field_name:
                fields.add(field_name)
        return fields

    def required_inputs(self) -> list[str]:
        return [item.name for item in self.inputs if item.required and item.default is None]


class SkillRuntime:
    def __init__(self, skill_files: list[Path]):
        self._skills: dict[str, SkillDefinition] = {}
        for path in skill_files:
            self._load_file(path)

        if not self._skills:
            raise SkillError("No skills were loaded. Add at least one skill YAML file.")

    @classmethod
    def from_directory(cls, skills_dir: Path) -> "SkillRuntime":
        files = _discover_skill_files(skills_dir)
        return cls(files)

    def list_skills(self) -> list[dict[str, Any]]:
        return [
            {
                "id": skill.id,
                "name": skill.name,
                "description": skill.description,
                "when_to_use": skill.when_to_use,
                "inputs": [
                    {
                        "name": i.name,
                        "description": i.description,
                        "required": i.required,
                        "default": i.default,
                    }
                    for i in skill.inputs
                ],
                "tags": skill.tags,
            }
            for skill in self._skills.values()
        ]

    def run_skill(self, skill_id: str, variables: dict[str, Any] | None = None) -> dict[str, Any]:
        if skill_id not in self._skills:
            raise SkillNotFoundError(f"Unknown skill_id: {skill_id}")

        variables = variables or {}
        skill = self._skills[skill_id]

        resolved = self._apply_defaults(skill, variables)
        missing = [name for name in skill.required_inputs() if not self._has_value(resolved.get(name))]
        if missing:
            raise SkillValidationError(
                f"Missing required inputs for skill '{skill_id}': {', '.join(missing)}"
            )

        rendered = _response_guardrail_prefix() + "\n\n" + skill.template.format_map(_SafeFormatDict(resolved))
        references = sorted(skill.referenced_variables())

        return {
            "skill_id": skill.id,
            "skill_name": skill.name,
            "description": skill.description,
            "when_to_use": skill.when_to_use,
            "rendered_instruction": rendered,
            "inputs_used": {key: resolved.get(key) for key in references},
            "tags": skill.tags,
        }

    def export_skill_ids(self) -> list[str]:
        return list(self._skills.keys())

    def _load_file(self, path: Path) -> None:
        suffix = path.suffix.lower()
        if suffix == ".json":
            data = json.loads(path.read_text(encoding="utf-8"))
        elif suffix in {".yml", ".yaml"}:
            if yaml is None:
                raise SkillError(
                    "PyYAML is not installed. Install dependencies or provide JSON skill files."
                )
            data = yaml.safe_load(path.read_text(encoding="utf-8"))
        else:
            raise SkillError(f"Unsupported skill file extension: {path}")

        if not isinstance(data, dict) or "skills" not in data:
            raise SkillError(f"Invalid skill file format: {path}")

        skills_data = data.get("skills", [])
        if not isinstance(skills_data, list):
            raise SkillError(f"'skills' must be a list in {path}")

        for item in skills_data:
            skill = self._parse_skill(item, path)
            if skill.id in self._skills:
                raise SkillError(f"Duplicate skill id '{skill.id}' in {path}")
            self._skills[skill.id] = skill

    def _parse_skill(self, raw: dict[str, Any], path: Path) -> SkillDefinition:
        required_fields = ["id", "name", "description", "when_to_use", "template"]
        missing_fields = [field for field in required_fields if field not in raw]
        if missing_fields:
            raise SkillError(f"Missing fields in {path}: {', '.join(missing_fields)}")

        inputs: list[SkillInput] = []
        for entry in raw.get("inputs", []):
            inputs.append(
                SkillInput(
                    name=str(entry["name"]),
                    description=str(entry.get("description", "")),
                    required=bool(entry.get("required", True)),
                    default=None if entry.get("default") is None else str(entry.get("default")),
                )
            )

        tags = [str(tag) for tag in raw.get("tags", [])]

        return SkillDefinition(
            id=str(raw["id"]),
            name=str(raw["name"]),
            description=str(raw["description"]),
            when_to_use=str(raw["when_to_use"]),
            inputs=inputs,
            template=str(raw["template"]),
            tags=tags,
        )

    @staticmethod
    def _apply_defaults(skill: SkillDefinition, variables: dict[str, Any]) -> dict[str, Any]:
        resolved = dict(variables)
        for field in skill.inputs:
            if field.name not in resolved and field.default is not None:
                resolved[field.name] = field.default
        return resolved

    @staticmethod
    def _has_value(value: Any) -> bool:
        if value is None:
            return False
        if isinstance(value, str) and not value.strip():
            return False
        return True


class _SafeFormatDict(dict):
    def __missing__(self, key: str) -> str:
        return "{" + key + "}"


def load_json(path: Path) -> Any:
    return json.loads(path.read_text(encoding="utf-8"))


def _discover_skill_files(skills_dir: Path) -> list[Path]:
    # Prefer YAML when available for readability; fall back to JSON-only mode when PyYAML is missing.
    selected: dict[str, Path] = {}

    if yaml is not None:
        for path in sorted(skills_dir.glob("*.yml")) + sorted(skills_dir.glob("*.yaml")):
            selected[path.stem] = path

    for path in sorted(skills_dir.glob("*.json")):
        selected.setdefault(path.stem, path)

    return list(selected.values())


def _response_guardrail_prefix() -> str:
    return (
        "Response contract:\n"
        "- Speak directly to the end user with final guidance only.\n"
        "- Do not mention skills, tools, prompts, routing, or your internal process.\n"
        "- Do not use meta/planning phrases such as \"I'll use...\", \"The user wants...\", or "
        "\"Based on the tool...\".\n"
        "- Keep wording supportive, clear, and practical."
    )
