# Embedding Space Map Visualization Guide

## Overview

The **Embedding Space Map** is an interactive visualization that demonstrates how semantic search works using vector embeddings. It shows IT talent candidates positioned in a 2D space where **distance represents semantic similarity**.

## Core Concept

When you search for "Senior Python developers with 5+ years", that text is converted into a mathematical vector (an embedding). Each candidate's profile is also an embedding. The visualization shows these vectors as bubbles in space, where:

- **Closer positions** = More semantically similar
- **Distance** = Measured using cosine distance
- **Position** = Represents meaning in compressed form

---

## The Three Visual Layers

### 1. The Query Bubble (Center)
**The large, cyan-glowing bubble in the center**

- Represents your search query converted to an embedding
- Larger than candidate bubbles to stand out
- Has a pulsating glow (reduced intensity to avoid confusion with results)
- Labeled: `Query: "[your search text]"`
- **This is NOT a candidate** - it's your search itself

**Visual Properties:**
- Size: Large (radius 3.5 units)
- Color: Cyan/Accent (teal)
- Glow: Moderate, pulsating
- No rank badge

---

### 2. Candidate Bubbles on the Map
**All 8 candidates appear as colored bubbles**

Each bubble represents one candidate's profile as an embedding.

**Visual Properties:**
- **Color**: Role-based (React = cyan, Python = orange, Java = purple, etc.)
- **Glow**: Distance-based intensity
  - Closer to query = Brighter glow
  - Further away = Dimmer glow
- **Position**: X/Y coordinates in semantic space
- **Size**: Standard radius (2.8 units)

**Top 3 Candidates Get Special Treatment:**
- **Numeric rank badge** (1, 2, 3) at top-right of bubble
- **Connector lines** from query bubble to candidate bubble
- **Listed in right sidebar** with detailed info

**Other 5 Candidates:**
- Still visible on map
- No rank badges
- No connector lines
- Show the broader "landscape" of talent

---

### 3. The Right Sidebar ("Nearest Neighbors")
**Text-based representation of top 3 matches**

For each of the 3 closest candidates, you see:
- **Rank badge** (1, 2, 3)
- **Name** (e.g., "Luis M.")
- **Role** (e.g., "Senior Python Engineer")
- **Location** (e.g., "Barcelona")

**Purpose:**
- Provides readable details for the top matches
- Complements the visual map representation
- Allows for easy scanning of results

---

## The Two Representations Explained

For the **top 3 candidates ONLY**, you see them in TWO places simultaneously:

| Representation | Location | Purpose | What You See |
|----------------|----------|---------|--------------|
| **Visual/Spatial** | Map (center area) | Show WHERE they are in semantic space | Glowing bubble with rank badge (1, 2, 3) and connector line |
| **Textual/Detailed** | Right sidebar | Show WHO they are with details | Card with name, role, location |

**Example Walkthrough:**

Let's say you search for "Senior Python developers with 5+ years"

1. **Query Bubble** appears in center at position (30, 45)
2. **Map shows 8 bubbles** - all candidates in semantic space
3. **Closest 3 candidates** to the query are:
   - Luis M. at (32, 46) - **Rank 1** - Very close!
   - Carlos P. at (22, 38) - **Rank 2**
   - Ana S. at (25, 30) - **Rank 3**
4. **These 3 get:**
   - Rank badges (1, 2, 3) on the map
   - Connector lines from query
   - Sidebar cards on the right
5. **Other 5 candidates** (Julia R., Marco T., Sara V., Emma K., Thomas W.):
   - Visible on map with glows
   - No special markings
   - Show you the full talent landscape

---

## Interactive Features

### Bidirectional Hover Sync

The map and sidebar are **perfectly synchronized**. Hover on one, both highlight.

**Hover over a map bubble:**
- ✅ Bubble scales up (1.8x)
- ✅ Tooltip appears at top center with details
- ✅ Corresponding sidebar card highlights (teal ring + background)
- ✅ Connector line brightens
- ✅ All non-top-3 bubbles fade to 20% opacity

**Hover over a sidebar card:**
- ✅ Same effects as above
- ✅ The bubble on the map scales up and glows
- ✅ You can easily find which bubble corresponds to which card

**Hover over a connector line:**
- ✅ Line brightens
- ✅ Bubble and sidebar card both highlight
- ✅ Shows the connection between query and result

### Fixed Tooltip Area (Top Center)

**NEW:** Tooltips no longer appear next to bubbles.

Instead, there's a **dedicated tooltip area** at the top center of the map:
- **Always reserves space** (no layout jumping)
- Shows when hovering any candidate bubble
- Displays:
  - Name
  - Role
  - Location
  - Distance from query (numeric)
- **Glassmorphic styling** (blur, soft border, teal glow)
- **Smooth fade in/out** transitions

**Why this design?**
- Prevents tooltips from overlapping bubbles
- Doesn't interfere with glows or rank badges
- Keeps the map visually clean
- All details in one predictable location

---

## Visual Hierarchy (Most to Least Important)

1. **Query Bubble** - What you're searching for
2. **Top 3 Rank Badges** - The best matches
3. **Connector Lines** - Relationships between query and results
4. **Glow Intensity** - How semantically close candidates are
5. **Other Candidate Bubbles** - The broader landscape

---

## Color System

### Role Colors (Bubble Fill & Glow)
- **React** 🔵 Cyan - `hsl(190, 95%, 55%)`
- **Python** 🟠 Orange - Custom orange
- **Java** 🟣 Purple - Custom purple
- **ML/AI** 🤖 Magenta - Custom magenta
- **Cloud** ☁️ Sky Blue - Custom blue
- **DevOps** ⚙️ Steel - Custom steel

### Rank Badge Color
- **All rank badges** (1, 2, 3): **Teal/Accent** color
- **Independent of role** - purely for ranking clarity
- Prevents confusion between "role type" and "ranking"

### Glow Meanings
- **Brightness** = Semantic similarity (not just distance)
- Calculated using **glow levels**:
  - Distance ≤ 15: Intensity 1.0 (very bright)
  - Distance ≤ 25: Intensity 0.6 (moderate)
  - Distance ≤ 35: Intensity 0.3 (dim)
  - Distance > 35: Intensity 0.1 (very dim)

---

## How to Read the Visualization (Step-by-Step)

### For First-Time Users

1. **Look at the big central bubble**
   - This is your search query
   - NOT a candidate

2. **Find the numbered bubbles (1, 2, 3)**
   - These are your top matches
   - Numbers indicate ranking (1 = best match)

3. **Notice the lines connecting them**
   - Lines show relationship between query and results
   - Only drawn to top 3

4. **Check the bubble colors**
   - Color = Role type (React, Python, etc.)
   - See legend on the left sidebar

5. **Observe the glow + distance**
   - Brighter glow = More semantically similar
   - Closer position = Better match

6. **Read details in right sidebar**
   - Top 3 candidates listed with full info
   - Hover to sync with map

7. **Explore by hovering**
   - Hover bubbles to see detailed tooltip at top
   - Hover sidebar cards to find them on map
   - Watch the sync animation

---

## Technical Details

### Embedding Dimensions
- Real embeddings: **1024 dimensions**
- Visualization: **Compressed to 2D** for human viewing
- Trade-off: Some information lost, but patterns remain

### Distance Calculation
- **Cosine distance** between vectors
- Formula: `distance = 1 - (A · B) / (||A|| × ||B||)`
- Range: 0 (identical) to 2 (opposite)

### Synthetic Data
The visualization uses **8 synthetic candidates** for demonstration:
1. Ana S. - React Developer (Madrid)
2. Luis M. - Senior Python Engineer (Barcelona)
3. Julia R. - Java Developer (Zurich)
4. Marco T. - ML Engineer (Berlin)
5. Sara V. - AWS Cloud Engineer (Lisbon)
6. Carlos P. - React Developer (Valencia)
7. Emma K. - DevOps Engineer (Munich)
8. Thomas W. - Frontend Angular Dev (Vienna)

### Queries Available
1. "Senior Python developers with 5+ years"
2. "React developers in Spain"
3. "Java developers in Zurich"
4. "ML engineers available now"
5. "AWS Cloud engineers"

---

## Animations & Timing

The visualization uses a **choreographed intro sequence**:

1. **Stage 1 (0-1.8s)**: Query bubble appears
2. **Stage 2 (1.8-2.4s)**: Candidate bubbles fade in
3. **Stage 3 (2.2-2.8s)**: Connector lines draw
4. **Stage 4 (2.6-3.0s)**: Sidebar slides in
5. **Stage 5 (2.8-3.2s)**: Rank badges pop in

**Interaction animations:**
- Hover scale: 300ms spring animation
- Tooltip fade: 200ms ease-out
- Glow pulse: 2s infinite loop

---

## Why This Visualization Matters

### Educational Value
- **Demystifies semantic search** - You can SEE how it works
- **Visualizes abstract concepts** - Embeddings become tangible
- **Shows ranking logic** - Distance = Similarity

### Business Value
- **Talent search accuracy** - Better matching through semantics
- **Transparency** - Candidates can see why they matched
- **Trust building** - Visual proof of AI-driven matching

### UX Principles Applied
- **Clear visual hierarchy** - Most important elements stand out
- **Bidirectional sync** - Map ↔ Sidebar connection
- **No visual overlap** - Tooltips in dedicated area
- **Drunk-proof design** - Numbered steps, obvious flow
- **Progressive disclosure** - Hover for more details

---

## Filtering (Left Sidebar)

You can **toggle role types on/off**:
- Click toggles to show/hide role types
- Filtered candidates disappear from map
- Top 3 recalculated from visible candidates only
- "Toggle All" button for bulk enable/disable

---

## Summary

**The Embedding Space Map shows three things:**

1. **Your search query** as a vector in space (big central bubble)
2. **All candidates** as colored bubbles (position = semantic meaning)
3. **Top 3 matches** highlighted with ranks, lines, and sidebar cards

**Two representations of top candidates:**
- **Map bubble** = WHERE they are in semantic space
- **Sidebar card** = WHO they are with details

**Hover to explore:**
- Map bubble → See tooltip at top + highlight sidebar
- Sidebar card → Scale bubble on map + show connection

**Distance = Similarity:**
- Closer bubbles = Better semantic match
- Glow intensity = Match strength
- Numbers (1, 2, 3) = Ranking

---

## Questions & Answers

**Q: Why are there two bubbles for the same candidate?**
A: There aren't! Each candidate has ONE bubble on the map. The sidebar just shows text details for the top 3. They're synchronized - hover one, both highlight.

**Q: What does the big central bubble represent?**
A: Your search query converted to an embedding. It's NOT a candidate.

**Q: Why do some bubbles have numbers and others don't?**
A: Only the top 3 closest candidates get rank badges (1, 2, 3). Others are still visible to show the landscape.

**Q: What happens when I hover a sidebar card?**
A: The corresponding bubble on the map scales up, glows brighter, and the tooltip appears at the top showing details.

**Q: Why did the tooltip move to the top?**
A: To prevent visual collision with bubbles, glows, and rank badges. The fixed top area keeps all details in one predictable location without layout jumping.

**Q: Can I filter by role type?**
A: Yes! Use the toggles in the left sidebar to show/hide specific roles.

**Q: Is this real data?**
A: No, it's synthetic demonstration data. Real systems would use actual candidate profiles and job postings converted to embeddings.

---

**Built with:** React, Framer Motion, SVG, TypeScript
**Design System:** Glassmorphic dark theme with cyan/purple accents
**Animation Philosophy:** Smooth, spring-based, choreographed intro sequence
