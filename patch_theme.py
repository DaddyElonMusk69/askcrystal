import json
import sys

# Update index.json
with open('index.json', 'r') as f:
    index_data = json.load(f)

hero_id = "hero_jVaWmY" # Based on the read output
if hero_id in index_data['sections']:
    index_data['sections'][hero_id]['settings']['image_1'] = "shopify://shop_images/A0d253f0b533a4b98a50b7ef4227f61c15.webp"
    # Update text block
    text_block_id = "text_YLPk4p"
    if text_block_id in index_data['sections'][hero_id]['blocks']:
        index_data['sections'][hero_id]['blocks'][text_block_id]['settings']['text'] = "<p>Discover Your Cosmic Energy</p>"
        index_data['sections'][hero_id]['blocks'][text_block_id]['settings']['type_preset'] = "h1"

with open('index_updated.json', 'w') as f:
    json.dump(index_data, f, indent=2)

# Update settings_data.json
with open('settings_data.json', 'r') as f:
    settings_data = json.load(f)

# Patching scheme-1 for a mystical theme
if 'current' in settings_data and 'sections' in settings_data['current']:
    # Assuming standard OS 2.0 structure
    pass

# Direct patch of color values if available or just update the whole scheme
# For brevity, let's just set the essential colors in the first scheme
if 'current' in settings_data:
    # Most themes store colors in settings_data.json under 'current'
    # We'll set a basic dark mystical theme
    settings_data['current']['colors_solid_button_labels'] = "#121212"
    settings_data['current']['colors_accent_1'] = "#D4AF37" # Gold
    settings_data['current']['colors_background_1'] = "#0F0F1B" # Deep Midnight Blue

with open('settings_data_updated.json', 'w') as f:
    json.dump(settings_data, f, indent=2)
