#!/bin/bash

SHOP_URL="${SHOPIFY_STORE_DOMAIN:?Set SHOPIFY_STORE_DOMAIN}"
ACCESS_TOKEN="${SHOPIFY_ADMIN_ACCESS_TOKEN:?Set SHOPIFY_ADMIN_ACCESS_TOKEN}"
API_VERSION="${SHOPIFY_ADMIN_API_VERSION:-2024-04}"
BASE_DIR="${ASKCRYSTAL_PRODUCT_DESCRIPTION_DIR:?Set ASKCRYSTAL_PRODUCT_DESCRIPTION_DIR}"

# Product list: file|title|price|bucket
PRODUCTS=(
    "moonstone_amulet.md|Moonstone & Sterling Silver Amulet|89.99|Premium"
    "amethyst_ring.md|Amethyst & Diamond Accented Ring|129.99|Premium"
    "lapis_ring.md|Lapis Lazuli Sterling Statement Ring|119.99|Premium"
    "rose_quartz_studs.md|Rose Quartz 14K Gold Plated Silver Studs|85.99|Premium"
    "chakra_necklace.md|Chakra Alignment Station Necklace (925 Silver)|149.99|Premium"
    "moissanite_studs.md|8ct Moissanite Spiritual Studs|95.99|Premium"
    "witch_knot_ring.md|Witch Knot Premium Engraved Ring|109.99|Premium"
    "affirmation_cuff.md|Personalized Affirmation Silver Cuff|159.99|Premium"
    "flower_of_life.md|Flower of Life Pendant (925 Silver)|129.99|Premium"
    "metatrons_cube.md|Metatron's Cube Necklace|139.99|Premium"
    "seed_of_life.md|Seed of Life Studs|89.99|Premium"
    "sri_yantra_plate.md|Sri Yantra Meditation Plate (Small Accessory)|169.99|Premium"
    "toroidal_ring.md|Toroidal Flow Silver Ring|149.99|Premium"
    "moldavite.md|Rare Moldavite & 14K Gold Pendant|349.99|Collector"
    "emerald.md|Natural Emerald \"Abundance\" Ring|599.99|Collector"
    "super_seven.md|Super Seven High-Vibration Bracelet|249.99|Collector"
    "larimar.md|Larimar \"Ocean Calm\" Sterling Amulet|299.99|Collector"
    "birth_chart_pendant.md|18K Gold Celestial Birth Chart Pendant|599.99|Collector"
    "master_alignment_necklace.md|14K Gold \"Master Alignment\" Diamond Necklace|799.99|Collector"
    "ritual_box_love.md|Numen Bespoke Ritual Box: LOVE|249.99|Collector"
    "ritual_box_wealth.md|Numen Bespoke Ritual Box: WEALTH|249.99|Collector"
    "ritual_box_protection.md|Numen Bespoke Ritual Box: PROTECTION|249.99|Collector"
    "ritual_box_awakening.md|Numen Bespoke Ritual Box: AWAKENING|299.99|Collector"
)

for row in "${PRODUCTS[@]}"; do
    IFS='|' read -r file title price bucket <<< "$row"
    echo "Processing $title..."
    
    filepath="$BASE_DIR/$file"
    content=$(cat "$filepath")
    
    # Extract tags (very basic)
    TAGS="price_bucket:$bucket"
    [[ "$content" =~ "Love" ]] && TAGS+=", intention:Love"
    [[ "$content" =~ "Wealth" ]] && TAGS+=", intention:Wealth"
    [[ "$content" =~ "Protection" ]] && TAGS+=", intention:Protection"
    [[ "$content" =~ "Awakening" ]] && TAGS+=", intention:Awakening"
    [[ "$content" =~ "Heart" ]] && TAGS+=", chakra:Heart"
    [[ "$content" =~ "Third Eye" ]] && TAGS+=", chakra:Third Eye"
    [[ "$content" =~ "Crown" ]] && TAGS+=", chakra:Crown"
    [[ "$content" =~ "Water" ]] && TAGS+=", element:Water"
    [[ "$content" =~ "Fire" ]] && TAGS+=", element:Fire"
    [[ "$content" =~ "Air" ]] && TAGS+=", element:Air"
    [[ "$content" =~ "Earth" ]] && TAGS+=", element:Earth"
    
    # Identify crystal types
    CRYSTALS=("Moonstone" "Amethyst" "Lapis Lazuli" "Rose Quartz" "Moissanite" "Moldavite" "Emerald" "Super Seven" "Larimar")
    for cr in "${CRYSTALS[@]}"; do
        if [[ "$content" =~ "$cr" ]]; then
            TAGS+=", crystal_type:$cr"
        fi
    done

    # Product Type
    PTYPE="Jewelry"
    [[ "$title" == *"Ritual Box"* ]] && PTYPE="Experience"
    
    # SKU
    SKU=$(echo "$file" | cut -d'.' -f1 | tr '[:lower:]' '[:upper:]')

    # Convert MD to HTML (very simple)
    # 1. Escaping for JSON is handled by jq
    # 2. Simple replacements
    HTML_CONTENT=$(echo "$content" | sed 's/^# \(.*\)/<h1>\1<\/h1>/' | sed 's/^## \(.*\)/<h2>\1<\/h2>/' | sed 's/^### \(.*\)/<h3>\1<\/h3>/' | sed 's/^\* \(.*\)/<li>\1<\/li>/' | sed 's/^\*\*\(.*\)\*\*/<b>\1<\/b>/g' | awk '{print $0 "<br>"}' | tr -d '\n')

    # Build JSON
    JSON_PAYLOAD=$(jq -n \
        --arg title "$title" \
        --arg body "$HTML_CONTENT" \
        --arg ptype "$PTYPE" \
        --arg tags "$TAGS" \
        --arg price "$price" \
        --arg sku "$SKU" \
        '{
            product: {
                title: $title,
                body_html: $body,
                vendor: "AskCrystal",
                product_type: $ptype,
                status: "active",
                tags: $tags,
                variants: [
                    {
                        price: $price,
                        sku: $sku,
                        inventory_policy: "deny",
                        fulfillment_service: "manual",
                        inventory_management: "shopify"
                    }
                ]
            }
        }')

    # Upload
    curl -s -X POST "https://$SHOP_URL/admin/api/$API_VERSION/products.json" \
        -H "X-Shopify-Access-Token: $ACCESS_TOKEN" \
        -H "Content-Type: application/json" \
        -d "$JSON_PAYLOAD" | jq -r '.product.id // ("FAILED: " + (.errors | tostring))'

done
