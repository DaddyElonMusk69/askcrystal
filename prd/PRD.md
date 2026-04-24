# PRD: AskCrystal — AI-First Spiritual Wellness E-Commerce

**Version:** 1.0
**Date:** April 21, 2026
**Status:** Draft — Ready for Review

---

## 1. Project Overview

### 1.1 What We're Building

> *"Your personal AI crystal companion, matching your unique energy to the exact crystal you need."*

AskCrystal is an **AI-first spiritual wellness e-commerce platform** that uses conversational AI to diagnose a user's emotional and energetic state, then recommends perfectly matched crystal jewelry through a seamless in-chat shopping experience.

### 1.2 Core Value Proposition

| Traditional Crystal E-Commerce | AskCrystal |
|---|---|
| Browse endless product lists | Tell the AI how you feel, get matched |
| Static product descriptions | Personalized "energy prescriptions" |
| Low conversion (2-4%) | High conversion via trust-building dialogue |
| One-time transaction | Ongoing "energy check-in" relationship |

### 1.3 Business Model

- **Primary Revenue:** Direct sales of crystal jewelry and accessories ($29–$149 AOV)
- **Secondary Revenue:** Premium AI readings, manifestation kits, subscription energy forecasts
- **Margin Target:** 70%+ gross margin (direct sourcing + AI-driven upsells)

---

## 2. Target Audience

### 2.1 Primary ICP: "The Spiritual Explorer"

| Attribute | Details |
|---|---|
| **Demographics** | Female 75%, Age 18–45 (Gen Z + Millennials) |
| **Geography** | US, UK, Canada, Australia, EU |
| **Psychographics** | "Spiritual but not religious" (SBNR), interested in astrology, mindfulness, self-care |
| **Pain Points** | Anxiety, decision fatigue, seeking control in uncertain times |
| **Buying Triggers** | Life transitions, emotional distress, curiosity about "energy" |

### 2.2 Audience Overlap Validation

- **75%** of astrology/metaphysics consumers purchase crystals or ritual products after consultations
- **#CrystalHealing** (30B+ views) and **#Astrology** (50B+ views) audiences overlap 60–70%
- Crystal market growing 10–15% CAGR, driven by Gen Z "aesthetic spirituality"

---

## 3. Product Architecture

### 3.1 System Overview

```
┌─────────────────────────────────────────────────────────┐
│                    User (Browser)                       │
│  ┌───────────────────────────────────────────────────┐  │
│  │  Shopify Storefront (Overlay Architecture)        │  │
│  │  ┌──────────────┐  ┌──────────────────────────┐   │  │
│  │  │  Homepage:   │  │  Collection/Product Pages│   │  │
│  │  │  AI Chat UI  │  │  (SEO-optimized, native) │   │  │
│  │  │  (Agent      │  │                          │   │  │
│  │  │   First)     │  │                          │   │  │
│  │  └──────┬───────┘  └─────────────┬────────────┘   │  │
│  └─────────┼────────────────────────┼────────────────┘  │
└────────────┼────────────────────────┼───────────────────┘
             │                        │
      API    │                        │  Shopify Native
      Calls  │                        │  Routing
             ▼                        ▼
┌────────────────────────┐   ┌────────────────────────┐
│   Dify (Agent Brain)   │   │   Shopify Backend      │
│                        │   │                        │
│  - System Prompt       │   │  - Product Catalog     │
│  - RAG Knowledge Base  │   │  - Cart & Checkout     │
│  - Tool: Shopify API   │   │  - Order Management    │
│  - Workflow: Bazi/     │   │  - Inventory           │
│    Energy Matching     │   │  - SEO & Sitemaps      │
└────────────────────────┘   └────────────────────────┘
```

### 3.2 Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Frontend** | Shopify OS 2.0 Theme + Custom Section | SEO-optimized storefront, product pages, cart |
| **AI Agent UI** | Custom React/Vanilla JS Chat Widget | Full-screen chat homepage, in-chat product cards |
| **Agent Engine** | Dify (Self-Hosted or Cloud) | LLM orchestration, RAG, tool calling, workflow |
| **LLM** | Claude 3.5 Sonnet (primary) | High-quality empathetic dialogue, cross-cultural reasoning |
| **E-commerce API** | Shopify Storefront API + Ajax API | Product search, cart management, checkout |
| **Knowledge Base** | Dify RAG (Vector DB) | Crystal properties, metaphysics rules, healing guides |
| **Hosting** | Shopify (storefront) + Docker/Cloud (Dify) | Production-ready infrastructure |

---

## 4. User Experience (UX)

### 4.1 Landing Page (Agent First)

**URL:** `/` (Homepage)

**Layout:**
- Full-screen immersive chat interface (no traditional hero/banner)
- AI initiates conversation with a welcoming, personalized opening message
- 3–4 **Quick Start Buttons** for users who don't want to type:
  - "I'm feeling anxious/stressed"
  - "I want to attract wealth/abundance"
  - "I need help with relationships/love"
  - "Just curious — read my energy"
- Top-right navigation: "Shop All" (links to native Shopify collection page)
- Subtle trust signal at bottom: "Powered by AI Energy Matching | 12,000+ Crystals Matched"

### 4.2 Conversation Flow

1. **Onboarding (2–3 turns):**
   - AI asks for birth date (optional, for Bazi/Astrology) + current emotional state
   - Generates a personal "Energy Blueprint" summary
2. **Diagnosis (3–5 turns):**
   - AI deep-dives into the user's concerns using psychological + metaphysical framing
   - Builds trust through accurate "cold reading" and empathetic responses
3. **Recommendation (Conversion Point):**
   - AI recommends 1–3 crystals as "energy prescriptions"
   - **Product Cards** render directly in the chat bubble:
     - Product image, name, price, "Add to Cart" button
     - Personalized reason: *"This Amethyst bracelet matches your need for calm focus."*
4. **Post-Purchase:**
   - AI provides care instructions (cleansing, intention-setting)
   - Offers email signup for weekly "Energy Forecasts"

### 4.3 Product Pages (SEO)

- Standard Shopify product pages for all SKUs
- Rich with SEO-optimized descriptions, reviews, and structured data
- Accessible via "Shop All" nav or direct Google search

### 4.4 Collection Pages (SEO)

- Browse by: Intention (Wealth, Love, Calm), Element (Fire, Water, etc.), Stone Type
- Fully indexable by Google, maintaining Shopify's native SEO advantages

---

## 5. Catalog Strategy

### 5.1 MVP Catalog: 50–70 SKUs

| Dimension | Coverage | SKU Count |
|---|---|---|
| **Five Elements (Bazi)** | Wood, Fire, Earth, Metal, Water (2–3 stones each) | ~15 |
| **Seven Chakras** | Root to Crown | ~7 |
| **Intentions** | Wealth, Love, Career, Anxiety, Protection, Clarity | ~20 |
| **Zodiac** | 12 Birthstones (can overlap with above) | ~12 |
| **Product Forms** | Bracelets, necklaces, raw stones, manifestation kits | (form variants) |

### 5.2 Product Tagging Schema

Every product in Shopify must be tagged for AI retrieval:

```
element:water | element:fire | element:earth | element:metal | element:wood
chakra:root | chakra:sacral | chakra:solar | chakra:heart | chakra:throat | chakra:third | chakra:crown
intention:wealth | intention:love | intention:career | intention:calm | intention:protection
stone:amethyst | stone:obsidian | stone:rosequartz | stone:citrine ...
price_tier:entry | price_tier:mid | price_tier:premium
```

---

## 6. AI Agent Design (Dify)

### 6.1 System Prompt Architecture

- **Role:** "You are Numen, an AI energy guide and crystal curator. You blend Eastern metaphysical wisdom (Bazi, Five Elements) with Western spiritual psychology (Chakras, Manifestation) to help users find the crystal that matches their current energy state."
- **Tone:** Empathetic, wise, modern, never preachy or fortune-telling
- **Guardrails:**
  - Never make medical claims
  - Include "for entertainment/wellness purposes only" disclaimer
  - Always tie recommendations back to product catalog via tool calls

### 6.2 Tools (Dify Tool Definitions)

| Tool | Function | API |
|---|---|---|
| `search_crystals` | Query Shopify products by tags/intention | Shopify Storefront API (GraphQL) |
| `get_product_details` | Fetch full product info for card rendering | Shopify Storefront API |
| `generate_energy_report` | (Future) Generate PDF energy blueprint | Custom endpoint |

### 6.3 Knowledge Base (RAG)

- Crystal properties guide (500+ entries: stone name, properties, frequencies, healing uses)
- Five Elements / Bazi interpretation guide
- Chakra system reference
- Psychological framing templates (anxiety → crystal mapping)

---

## 7. Technical Implementation Plan

### Phase 1: Foundation (Week 1–2)

- [ ] Set up Shopify store, add 50–70 products with proper tags
- [ ] Deploy Dify locally via Docker
- [ ] Configure Dify Agent: System Prompt, RAG knowledge base upload
- [ ] Build `search_crystals` tool connecting Dify to Shopify API

### Phase 2: Frontend (Week 3–4)

- [ ] Create custom Shopify homepage section (full-screen chat UI)
- [ ] Implement Dify API integration in Shopify theme
- [ ] Build in-chat Product Card component (image, price, add-to-cart)
- [ ] Style chat interface (fonts, colors, animations)

### Phase 3: Testing & Refinement (Week 5)

- [ ] End-to-end flow testing: chat → recommendation → add to cart → checkout
- [ ] Prompt tuning: improve recommendation accuracy and tone
- [ ] Mobile responsiveness testing
- [ ] Performance optimization (chat load time, API response latency)

### Phase 4: Launch & Growth (Week 6+)

- [ ] Deploy Dify to production (Cloud or VPS)
- [ ] Set up analytics (Google Analytics, Meta Pixel, TikTok Pixel)
- [ ] Launch TikTok/IG ad campaigns
- [ ] Monitor conversion rate, AOV, chat engagement metrics

---

## 8. Success Metrics

| Metric | Target | Notes |
|---|---|---|
| **Chat Engagement Rate** | > 60% | Users who send ≥3 messages |
| **Conversion Rate (Chat Users)** | > 8% | Industry avg: 2–4% |
| **Average Order Value (AOV)** | $49–$79 | Driven by AI bundling |
| **Email Capture Rate** | > 25% | Post-chat energy forecast signup |
| **Return Customer Rate** | > 20% | Weekly energy forecast → repeat purchase |

---

## 9. Risks & Mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| **Ad platform policy blocks** (Meta/Google occult policies) | High | Position as "wellness/self-discovery," avoid "fortune telling" language |
| **AI hallucination** (wrong crystal recommendations) | Medium | RAG-enforced grounding, tool-based product retrieval only |
| **Low trust in AI recommendations** | Medium | Human-curated product data, customer reviews, transparent sourcing |
| **Payment gateway flags** (Stripe/PayPal occult category) | Low | Use "wellness products" / "jewelry" as billing descriptors |
| **Shopify API rate limits** | Low | Implement caching for product search results |

---

## 10. Open Questions

- [ ] Domain name: `askcrystal.com` vs `askcrystal.ai` vs alternate?
- [ ] Dify deployment: Self-hosted (Docker) or Cloud for production?
- [ ] Initial product sourcing: 1688/Donghai suppliers or US-based wholesaler?
- [ ] Compliance: "For entertainment purposes" disclaimer placement?
- [ ] Multi-language support: English only for MVP, or plan for CN/JP/KR?

---

*This PRD is a living document. Update as we iterate through development and market testing.*
