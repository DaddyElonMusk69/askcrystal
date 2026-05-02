# Product Image Generation

Use this reference when a user asks the Shopify COO skill to create product imagery, image prompts, local product assets, generated image sets, or Shopify media planning.

AskCrystal uses the system `imagegen` skill and its default built-in image generation path for generated product images. For products with source/reference photos, generation is part of the default product listing workflow and must not be skipped unless the user explicitly asks to defer media, skip generation, or use raw source images. Use Jimeng/Dreamina only when the user explicitly asks for Jimeng, Dreamina, or 即梦.

## Canonical Asset Location

Store generated product images in the repo, not in ad hoc downloads:

```text
data/shopify/catalog/assets/products/<product-handle>/
  manifest.json
  source/
    source-front.webp
    source-detail.webp
  01-hero-front.webp
  02-three-quarter.webp
  03-side-or-back-detail.webp
  04-macro-crystal.webp
  05-scale-in-hand.webp
  06-faceless-wearing-closeup.webp
  07-lifestyle-context.webp
  08-ritual-still-life.webp
  09-packaging-flatlay.webp
```

The repo asset path is the source of truth. Shopify CDN URLs/media IDs are deployment artifacts and should go into generated caches, not hand-authored product data.

Put raw/provided product reference images in:

```text
data/shopify/catalog/assets/products/<product-handle>/source/
```

Files in `source/` are references for generation, not product media. Do not add them to product JSON `media` or upload them to Shopify unless the user explicitly asks to use raw source images.

Generated images must use these source images as references whenever available so the exact product design, materials, colors, bead order, clasp/setting details, scale, and wearable placement are preserved.

## Required Shot Set

Generate exactly 9 images per product unless the user asks for a different count.

All images should be portrait 3:4.

1. `01-hero-front.webp`: front-facing ecommerce hero, full product visible.
2. `02-three-quarter.webp`: angled three-quarter product view.
3. `03-side-or-back-detail.webp`: side/back/construction detail; for jewelry, show clasp, chain, band, hook, closure, or setting where applicable.
4. `04-macro-crystal.webp`: close-up of stone texture, inclusions, polish, or raw edges.
5. `05-scale-in-hand.webp`: hand scale reference, realistic product size.
6. `06-faceless-wearing-closeup.webp`: faceless model close-up wearing the product for jewelry; for non-jewelry, hands holding the item.
7. `07-lifestyle-context.webp`: faceless model or lifestyle ritual context, product still dominant.
8. `08-ritual-still-life.webp`: styled ritual still life based on ritual uses.
9. `09-packaging-flatlay.webp`: premium gift/packaging flat lay with no readable text.

## Metadata Per Shot

Every manifest shot must include:

- `alt`: accessibility text and Shopify media alt text.
- `seo_title`: concise image title for future SEO/content systems.
- `seo_description`: concise image description for future SEO/content systems.
- `caption`: customer-facing caption candidate.
- `keywords`: short list of product, material, intention, shot-role, and brand terms.

Shopify product upload currently sends `alt` with media. The other fields stay in the local manifest so future agents can generate product-page captions, image SEO, collection copy, and search metadata without reverse-engineering assets.

## AskCrystal Luxury Base Prompt

Use this base prompt for every generated shot, then append the shot-specific angle/scenario instruction:

```text
Transform the provided image into a high-end luxury product photograph. Preserve the exact product design, materials, and colors without alteration.
Place it on a subtle dark mineral surface with a deep navy-to-black gradient background and faint particle bokeh.
Use controlled cinematic studio lighting: soft directional key light, gentle fill, and a warm rim light for separation. Add subtle backlighting to enhance translucency and internal glow in crystal materials.
Emphasize material quality with crisp specular highlights, internal reflections, and light scattering. Keep highlights sharp and premium, not blown out.
Ensure the full product is sharp and clearly visible, with a softly blurred background.
Apply a refined luxury grade: deep contrast, clean blacks, slightly cool shadows, warm highlights, enhanced micro-contrast, and a very subtle glow only in highlights and translucent areas.
Keep composition clean, centered, and visually striking—realistic, but elevated and eye-catching.
```

Because the base prompt says "provided image", use source/reference images with the default image generation path when source photos exist. Use pure text generation only for products without source photos or when the user explicitly asks for a text-only concept.

## Negative Requirements

Always include:

```text
No text, no typography, no logo, no watermark, no price tag, no medical claims, no extra unrelated products, no distorted jewelry structure, no broken chain, no deformed hands, no visible face for model shots, no unrealistic oversized crystal unless explicitly part of the product, no changing the product design, no changing material color, no placing jewelry on the wrong body part.
```

## Workflow

1. Make sure a local product JSON exists.
2. Generate the image manifest:

```bash
python3 skills/askcrystal-shopify-coo/scripts/product_ops.py image-plan --product <handle>
```

3. Put product source/reference photos in `data/shopify/catalog/assets/products/<handle>/source/` when available. These files enable reference-based generation and are not product media.
4. Use the system `imagegen` skill with its default built-in generation path. If source images are local files, inspect them first so they are available as references.
5. Generate one or two shots first, usually `01_hero_front`, and review product fidelity before generating the full nine-shot set.
6. Save approved generated files to the manifest `shots[].local_path` filenames.
7. Review images manually for product accuracy, scale, jewelry structure, and style fit.
8. Only after approval, add generated local paths to product JSON media. Do not add raw source/reference paths. Either rerun:

```bash
python3 skills/askcrystal-shopify-coo/scripts/product_ops.py image-plan --product <handle> --force --update-product-media
```

or add equivalent media entries manually after the generated files exist.

9. Shopify media sync uploads local files through staged uploads, attaches them to the product, and caches returned Shopify media IDs/CDN URLs in generated output.

Current upload command:

```bash
python3 skills/askcrystal-shopify-coo/scripts/product_ops.py product-upload --product <handle> --show-payload
python3 skills/askcrystal-shopify-coo/scripts/product_ops.py product-upload --product <handle> --apply
```

Use `--skip-media` only when the user explicitly asks to sync product data before images are approved or to defer media. State that no media will be uploaded. Do not paste Shopify CDN URLs into source product JSON after upload.

If the default image generation path is unavailable or generated images cannot be reviewed, stop and report the blocker instead of uploading raw source photos or quietly omitting media.

## Jimeng/Dreamina Opt-In Notes

Use this section only when the user explicitly asks for Jimeng, Dreamina, or 即梦.

- The local CLI executable is named `dreamina`, even though the user may call it Jimeng or 即梦.
- Check CLI help when behavior changes:

```bash
dreamina -h
dreamina text2image -h
dreamina query_result -h
```

- Product image generation uses `dreamina image2image --ratio=3:4` when source product images exist.
- `dreamina text2image --ratio=3:4` is for products without source photos, or can be forced with `--text-only` only when explicitly requested.
- Use `--resolution-type 2k` by default unless the user asks for a different quality/speed tradeoff.
- Use `--model-version` only after checking `dreamina text2image -h`; do not hardcode future model availability.
- Submit success requires a `submit_id` and non-fail `gen_status`, not just exit code 0.
- If Jimeng reports `AigcComplianceConfirmationRequired`, ask the user to complete Dreamina web-side authorization and retry.
- If Jimeng reports missing `dreamina_cli` permission or `current account is not maestro vip`, do not retry it. Use the default image generation path or ask the user for a product-data-only sync.

## Accuracy Rules

- Generated imagery must not claim to show the exact one-of-one natural stone unless the image is based on a real source photo.
- For raw stones and unique pieces, prefer product-style/editorial imagery language and keep natural variation notes visible in product copy.
- Faceless model crops are preferred for jewelry. Do not generate identifiable faces unless explicitly requested.
- Keep the product physically plausible: clasp, hook, band, chain, beads, pendant loop, and scale must make sense.
- Wearable placement must match product form:
  - Bracelet: wrist/lower forearm only.
  - Necklace: neck/collarbone only.
  - Ring: finger only.
  - Earrings: ear only, side crop without full face.
  - Anklet: ankle/lower leg only.
  - Pendant: chain at chest/collarbone only.
