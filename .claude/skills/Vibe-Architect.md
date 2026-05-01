# Project Rules: Vibe-Architect v2.0

## 🛠 Design Manifesto
- **Adaptive Structure:** Use **Bento Grid** for both modes. Ensure cards have 12px border-radius for a modern, approachable feel.
- **Visual Hierarchy:** 
  - **Dark Mode (Abyss):** Focus on "Depth". Use subtle inner shadows and neon borders.
  - **Light Mode (Ivory):** Focus on "Softness". Use high-blur drop shadows (`shadow-xl`) and warm-toned backgrounds instead of harsh pure white.

## 📐 Detailed Color Specs
### [Mode: Abyss - Cyber/Cool]
- **BG:** `#050505`
- **Surface:** `#121212` with `1px solid rgba(255,255,255,0.05)`
- **Typography:** Primary `#EDEDED`, Secondary `#A0A0A0`
- **Vibe:** High contrast, minimal glow, focus on precision.

### [Mode: Ivory - Minimal/Warm]
- **BG:** `#FAF9F6` (Off-white/Cream)
- **Surface:** `#FFFFFF`
- **Border:** `1px solid rgba(0,0,0,0.05)`
- **Typography:** Primary `#1A1A1A`, Secondary `#666666`
- **Vibe:** Soft shadows, warm accents (Amber/Terracotta), emphasis on readability.

## 🤖 Global UI Constraints
- **Grid:** Strict 8px spacing.
- **Font:** Headings in 'Inter', Mono text in 'JetBrains Mono'.
- **Components:** Navigation must resemble Notion's clean sidebar logic regardless of the active color mode.
