import os
import json
import requests
import markdown

# Configuration
SHOP_URL = "askcrystal.myshopify.com"
ACCESS_TOKEN = "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"
API_VERSION = "2024-04"
BASE_DIR = "/Users/haokaiqin/Desktop/AskCrystal/store/descriptions/pillar3_4/"

# Product List with prices
products_meta = [
    {"file": "moonstone_amulet.md", "title": "Moonstone & Sterling Silver Amulet", "price": "89.99", "bucket": "Premium"},
    {"file": "amethyst_ring.md", "title": "Amethyst & Diamond Accented Ring", "price": "129.99", "bucket": "Premium"},
    {"file": "lapis_ring.md", "title": "Lapis Lazuli Sterling Statement Ring", "price": "119.99", "bucket": "Premium"},
    {"file": "rose_quartz_studs.md", "title": "Rose Quartz 14K Gold Plated Silver Studs", "price": "85.99", "bucket": "Premium"},
    {"file": "chakra_necklace.md", "title": "Chakra Alignment Station Necklace (925 Silver)", "price": "149.99", "bucket": "Premium"},
    {"file": "moissanite_studs.md", "title": "8ct Moissanite Spiritual Studs", "price": "95.99", "bucket": "Premium"},
    {"file": "witch_knot_ring.md", "title": "Witch Knot Premium Engraved Ring", "price": "109.99", "bucket": "Premium"},
    {"file": "affirmation_cuff.md", "title": "Personalized Affirmation Silver Cuff", "price": "159.99", "bucket": "Premium"},
    {"file": "flower_of_life.md", "title": "Flower of Life Pendant (925 Silver)", "price": "129.99", "bucket": "Premium"},
    {"file": "metatrons_cube.md", "title": "Metatron's Cube Necklace", "price": "139.99", "bucket": "Premium"},
    {"file": "seed_of_life.md", "title": "Seed of Life Studs", "price": "89.99", "bucket": "Premium"},
    {"file": "sri_yantra_plate.md", "title": "Sri Yantra Meditation Plate (Small Accessory)", "price": "169.99", "bucket": "Premium"},
    {"file": "toroidal_ring.md", "title": "Toroidal Flow Silver Ring", "price": "149.99", "bucket": "Premium"},
    {"file": "moldavite.md", "title": "Rare Moldavite & 14K Gold Pendant", "price": "349.99", "bucket": "Collector"},
    {"file": "emerald.md", "title": "Natural Emerald \"Abundance\" Ring", "price": "599.99", "bucket": "Collector"},
    {"file": "super_seven.md", "title": "Super Seven High-Vibration Bracelet", "price": "249.99", "bucket": "Collector"},
    {"file": "larimar.md", "title": "Larimar \"Ocean Calm\" Sterling Amulet", "price": "299.99", "bucket": "Collector"},
    {"file": "birth_chart_pendant.md", "title": "18K Gold Celestial Birth Chart Pendant", "price": "599.99", "bucket": "Collector"},
    {"file": "master_alignment_necklace.md", "title": "14K Gold \"Master Alignment\" Diamond Necklace", "price": "799.99", "bucket": "Collector"},
    {"file": "ritual_box_love.md", "title": "Numen Bespoke Ritual Box: LOVE", "price": "249.99", "bucket": "Collector"},
    {"file": "ritual_box_wealth.md", "title": "Numen Bespoke Ritual Box: WEALTH", "price": "249.99", "bucket": "Collector"},
    {"file": "ritual_box_protection.md", "title": "Numen Bespoke Ritual Box: PROTECTION", "price": "249.99", "bucket": "Collector"},
    {"file": "ritual_box_awakening.md", "title": "Numen Bespoke Ritual Box: AWAKENING", "price": "299.99", "bucket": "Collector"},
]

def extract_tags(content, bucket):
    tags = [f"price_bucket:{bucket}"]
    
    # Simple extraction logic based on keywords
    intentions = ["Love", "Wealth", "Protection", "Awakening", "Intuition", "Healing", "Alignment", "Abundance", "Peace", "Transformation", "Empowerment", "Clarity", "Focus", "Identity", "Manifestation", "Compassion", "Balance"]
    chakras = ["Root", "Sacral", "Solar Plexus", "Heart", "Throat", "Third Eye", "Crown"]
    elements = ["Water", "Fire", "Air", "Earth", "Ether", "Cosmic"]
    
    for i in intentions:
        if i.lower() in content.lower():
            tags.append(f"intention:{i}")
            
    for c in chakras:
        if c.lower() in content.lower():
            tags.append(f"chakra:{c}")
            
    for e in elements:
        if e.lower() in content.lower():
            tags.append(f"element:{e}")
            
    # Crystal type
    crystals = ["Moonstone", "Amethyst", "Lapis Lazuli", "Rose Quartz", "Moissanite", "Moldavite", "Emerald", "Super Seven", "Larimar", "Citrine", "Pyrite", "Aventurine", "Tourmaline", "Selenite", "Quartz"]
    for cr in crystals:
        if cr.lower() in content.lower():
            tags.append(f"crystal_type:{cr}")
            
    return list(set(tags))

def upload_product(item):
    filepath = os.path.join(BASE_DIR, item['file'])
    with open(filepath, 'r') as f:
        md_content = f.read()
    
    # Convert markdown to HTML
    html_content = markdown.markdown(md_content)
    
    # Tags
    tags = extract_tags(md_content, item['bucket'])
    
    product_data = {
        "product": {
            "title": item['title'],
            "body_html": html_content,
            "vendor": "AskCrystal",
            "product_type": "Jewelry" if "Ritual Box" not in item['title'] else "Experience",
            "status": "active",
            "tags": ", ".join(tags),
            "variants": [
                {
                    "price": item['price'],
                    "sku": item['file'].replace(".md", "").upper(),
                    "inventory_policy": "deny",
                    "fulfillment_service": "manual",
                    "inventory_management": "shopify"
                }
            ]
        }
    }
    
    url = f"https://{SHOP_URL}/admin/api/{API_VERSION}/products.json"
    headers = {
        "X-Shopify-Access-Token": ACCESS_TOKEN,
        "Content-Type": "application/json"
    }
    
    response = requests.post(url, headers=headers, json=product_data)
    if response.status_code == 201:
        print(f"Successfully uploaded: {item['title']}")
    else:
        print(f"Failed to upload: {item['title']} - {response.text}")

if __name__ == "__main__":
    for item in products_meta:
        upload_product(item)
