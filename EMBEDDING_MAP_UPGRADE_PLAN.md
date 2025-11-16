# Embedding Space Map - Premium Upgrade Plan

**Project**: PythiaLabs - Pythia Vector Lab
**Component**: EmbeddingSpaceMap.tsx
**Version**: 2.0 - Premium Product Level
**Date**: 2025-11-16
**Status**: Ready for Implementation ✅

---

## Executive Summary

Transforming the Embedding Space Map from "great" to "premium product-level polished" through 12 strategic enhancements focused on **UX clarity**, **visual storytelling**, and **educational value**.

### Current State
- ✅ Hover labels functional (name, role, location)
- ✅ Query bubble visualization present
- ✅ Nearest neighbor lines with animation
- ✅ Basic floating animations
- ✅ Glassmorphic design system in place

### Target State
- ✨ Premium visual storytelling with semantic color coding
- ✨ Magnetic interaction patterns (node attraction)
- ✨ Distance visualization with tooltips
- ✨ Cinematic intro animations
- ✨ Educational explainer cards
- ✨ Advanced filtering and highlighting

---

## Table of Contents

1. [Upgrade Features Overview](#upgrade-features-overview)
2. [React Component Architecture](#react-component-architecture)
3. [State Management Architecture](#state-management-architecture)
4. [Animations Specification](#animations-specification)
5. [CSS Design System Extensions](#css-design-system-extensions)
6. [Implementation Priority](#implementation-priority)
7. [File Structure](#file-structure)
8. [Success Metrics](#success-metrics)

---

## Upgrade Features Overview

### Top 12 High-Impact Improvements

#### ✅ 1. Semantic Color Coding (Clusters)
**Problem**: All points are currently cyan - hard to distinguish role types
**Solution**: Color-code by role clusters
- React developers → Purple (`--role-react`)
- Python developers → Teal (`--role-python`)
- ML engineers → Blue (`--role-ml`)
- Cloud engineers → Green (`--role-cloud`)
- Java developers → Orange (`--role-java`)
- DevOps engineers → Pink (`--role-devops`)

**Impact**: Immediate visual clarity, clusters visible at a glance

---

#### ✅ 2. Make the Points Tell a Story (Enhanced Labels)
**Current**: Labels show on hover ✅ (already implemented)
**Enhancement**: Improve tooltip design and positioning
- Glowing tooltip with better contrast
- Adaptive positioning (avoid SVG edges)
- Role badge with color coding

**Impact**: Better information hierarchy

---

#### ✅ 3. Show the Query as Its Own Glowing Node
**Current**: Query bubble exists ✅ (already implemented)
**Enhancement**: Make it more prominent
- Larger pulsating glow
- Label showing query text
- Visual distinction as "the question"

**Impact**: Non-technical users understand "query is also an embedding"

---

#### ✅ 4. Distance Heat Glow Gradient
**Problem**: No visual indication of proximity strength
**Solution**: Nodes glow based on distance to query
- `distance < 0.15` → Bright cyan glow (radius 4)
- `0.15-0.25` → Medium glow (radius 3)
- `0.25-0.35` → Faint glow (radius 2.5)
- `> 0.35` → Minimal glow (radius 2)

**Impact**: Intuitive proximity visualization

---

#### ✅ 5. "Why These Results?" Explanation Card
**Problem**: No educational context for non-technical users
**Solution**: Small card in sidebar explaining the algorithm

```
### Why these 3?

These candidates are closest to your query in the 1024-dimensional
embedding space using cosine distance. Closer = more semantically similar.
```

**Impact**: Bridges technical concept with business value

---

#### ✅ 6. Smooth Intro Animation (Premium Polish)
**Problem**: Elements appear instantly (no delight)
**Solution**: 3.2s orchestrated sequence
- Canvas fades in (0-0.6s)
- Nodes appear sequentially (0.4-2.0s)
- Query bubble glows (1.8-2.6s)
- Lines draw themselves (2.2-3.0s)
- Sidebar slides in with blur (2.6-3.2s)

**Impact**: "Apple-like" premium feel

---

#### ✅ 7. Animate Node Attraction on Selection
**Problem**: Static visualization doesn't show semantic relationships dynamically
**Solution**: When node selected, neighbors "pull" toward it by 10-20px
- Spring animation (0.8s)
- Settle back to position
- Visual metaphor: "semantic gravity"

**Impact**: Magical explanation of embeddings

---

#### ✅ 8. Cluster Highlighting (Fade Others)
**Problem**: Hard to focus on relevant results
**Solution**: When query selected, fade non-matching nodes to 25% opacity

**Impact**: Immediate relevance focus

---

#### ✅ 9. Micro-transitions on Dropdown Change
**Problem**: Jarring instant updates
**Solution**: Smooth query transition (1.2s)
- Blur out old state (0.3s)
- Move query bubble (0.6s)
- Update connections (0.4s)
- Blur in new state (0.4s)
- Sidebar refreshes smoothly

**Impact**: Premium, smooth UX

---

#### ✅ 10. Distance Line Tooltip
**Problem**: Lines are decorative, not informative
**Solution**: Click/hover on line shows distance
- Small tooltip: `cosine distance: 0.13`
- Educational: makes system measurable

**Impact**: Technical transparency

---

#### ✅ 11. Mini Legend + Filters
**Problem**: No way to explore specific role types
**Solution**: Top-left legend panel
- Color coding guide (🟣 React, 🔵 Python, 🟢 Cloud, etc.)
- Toggle switches to filter by role type
- Toggle availability filter

**Impact**: More interactivity without clutter

---

#### ✅ 12. Sticky Sidebar
**Problem**: Sidebar scrolls away
**Solution**: Fixed position sidebar
- Stays visible during scroll
- Modern, anchored experience

**Impact**: Better information persistence

---

## React Component Architecture

### Component Hierarchy

```
EmbeddingSpaceMap (Container)
├── EmbeddingHeader
│   ├── Title & Description
│   └── QuerySelector (Enhanced Dropdown)
│
├── EmbeddingCanvas (Main Visualization)
│   ├── SVGContainer
│   │   ├── ConnectionLines[]
│   │   │   └── DistanceTooltip (on hover/click)
│   │   ├── TalentNode[] (Candidates)
│   │   │   ├── GlowHalo (distance-based)
│   │   │   └── HoverCard (enhanced)
│   │   └── QueryNode (Pulsating)
│   │
│   └── LegendPanel (Top-left overlay)
│       ├── ColorCoding Guide
│       └── RoleFilters (toggles)
│
└── ResultsSidebar (Right panel)
    ├── NearestNeighbors[]
    ├── ExplanationCard ("Why these results?")
    └── DistanceMetrics
```

---

### New Component Specifications

#### 1. `LegendPanel.tsx`

**Purpose**: Show role type color coding and provide filters

```typescript
interface LegendItem {
  role: RoleType;
  color: string;
  label: string;
  icon: string;
  enabled: boolean;
}

interface LegendPanelProps {
  items: LegendItem[];
  onFilterToggle: (role: RoleType) => void;
  position?: 'top-left' | 'top-right';
  compact?: boolean;
}

export const LegendPanel: React.FC<LegendPanelProps> = ({ ... }) => {
  return (
    <motion.div
      className="legend-panel"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 2.0, duration: 0.4 }}
    >
      <h4 className="text-sm font-semibold mb-3">Role Types</h4>
      {items.map(item => (
        <div key={item.role} className="flex items-center gap-2 mb-2">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: `hsl(var(${item.color}))` }}
          />
          <span className="text-xs">{item.label}</span>
          <input
            type="checkbox"
            checked={item.enabled}
            onChange={() => onFilterToggle(item.role)}
          />
        </div>
      ))}
    </motion.div>
  );
};
```

---

#### 2. `DistanceTooltip.tsx`

**Purpose**: Show distance metrics on line hover/click

```typescript
interface DistanceTooltipProps {
  distance: number;
  position: { x: number; y: number };
  visible: boolean;
  format?: 'cosine' | 'euclidean' | 'normalized';
}

export const DistanceTooltip: React.FC<DistanceTooltipProps> = ({
  distance,
  position,
  visible,
  format = 'cosine'
}) => {
  if (!visible) return null;

  return (
    <motion.g
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.2 }}
    >
      <rect
        x={position.x - 8}
        y={position.y - 3}
        width="16"
        height="5"
        rx="0.5"
        fill="hsl(var(--background))"
        stroke="hsl(var(--accent))"
        strokeWidth="0.2"
        opacity="0.95"
      />
      <text
        x={position.x}
        y={position.y - 0.5}
        textAnchor="middle"
        className="distance-label"
      >
        {format}: {distance.toFixed(3)}
      </text>
    </motion.g>
  );
};
```

---

#### 3. `ExplanationCard.tsx`

**Purpose**: Educational card explaining the algorithm

```typescript
interface ExplanationCardProps {
  queryText: string;
  resultCount: number;
  averageDistance?: number;
  embeddingDimension?: number;
}

export const ExplanationCard: React.FC<ExplanationCardProps> = ({
  queryText,
  resultCount,
  averageDistance,
  embeddingDimension = 1024
}) => {
  return (
    <motion.div
      className="explanation-card"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 3.0, duration: 0.4 }}
    >
      <h4 className="text-sm font-semibold mb-2 text-accent">
        Why these {resultCount} results?
      </h4>
      <p className="text-xs text-muted-foreground leading-relaxed">
        These candidates are closest to your query
        <span className="font-mono text-primary"> "{queryText}" </span>
        in the <span className="font-semibold">{embeddingDimension}-dimensional</span> embedding
        space using <span className="font-semibold">cosine distance</span>.
        <br/><br/>
        Closer positions = more semantically similar skills and experience.
      </p>
      {averageDistance && (
        <div className="mt-2 pt-2 border-t border-glass-border/30">
          <span className="text-xs text-muted-foreground">
            Avg. distance: <span className="font-mono text-accent">{averageDistance.toFixed(3)}</span>
          </span>
        </div>
      )}
    </motion.div>
  );
};
```

---

#### 4. `TalentNode.tsx`

**Purpose**: Individual candidate node with glow and hover effects

```typescript
interface TalentNodeProps {
  bubble: TalentBubble;
  distanceToQuery: number;
  isNearest: boolean;
  isHovered: boolean;
  shouldFade: boolean;
  index: number;
  onHover: (id: string | null) => void;
  onClick?: (id: string) => void;
}

export const TalentNode: React.FC<TalentNodeProps> = ({
  bubble,
  distanceToQuery,
  isNearest,
  isHovered,
  shouldFade,
  index,
  onHover,
  onClick
}) => {
  const glowIntensity = getGlowIntensity(distanceToQuery);
  const roleColor = getRoleColor(bubble.roleType);

  return (
    <g>
      {/* Distance-based glow halo */}
      <motion.circle
        cx={bubble.x}
        cy={bubble.y}
        r={glowIntensity.radius}
        fill={`hsl(var(${roleColor}))`}
        initial={{ opacity: 0 }}
        animate={{
          opacity: [
            glowIntensity.intensity * 0.2,
            glowIntensity.intensity * 0.5,
            glowIntensity.intensity * 0.2
          ]
        }}
        transition={{ duration: 2, repeat: Infinity }}
      />

      {/* Main node */}
      <motion.circle
        cx={bubble.x}
        cy={bubble.y}
        r="2"
        fill={`hsl(var(${roleColor}) / 0.3)`}
        stroke={`hsl(var(${roleColor}))`}
        strokeWidth="0.3"
        className="cursor-pointer"
        onMouseEnter={() => onHover(bubble.id)}
        onMouseLeave={() => onHover(null)}
        onClick={() => onClick?.(bubble.id)}
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: isHovered ? 1.8 : 1,
          opacity: shouldFade ? 0.25 : 1,
          y: [bubble.y, bubble.y - 0.5, bubble.y]
        }}
        transition={{
          scale: { duration: 0.3 },
          opacity: { duration: 0.4 },
          y: { duration: 3 + index * 0.3, repeat: Infinity, ease: "easeInOut" },
          delay: index * 0.1
        }}
        whileHover={{ scale: 2 }}
      />

      {/* Hover tooltip */}
      <AnimatePresence>
        {isHovered && (
          <NodeTooltip bubble={bubble} />
        )}
      </AnimatePresence>
    </g>
  );
};
```

---

#### 5. `QueryNode.tsx`

**Purpose**: Query bubble with prominent pulsating glow

```typescript
interface QueryNodeProps {
  query: TalentBubble;
  label: string;
  showLabel?: boolean;
}

export const QueryNode: React.FC<QueryNodeProps> = ({
  query,
  label,
  showLabel = true
}) => {
  return (
    <g>
      {/* Outer pulsating glow */}
      <motion.circle
        cx={query.x}
        cy={query.y}
        r="4.5"
        fill="hsl(var(--glow-cyan))"
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: [0.2, 0.5, 0.2],
          scale: 1
        }}
        transition={{
          opacity: { duration: 1.5, repeat: Infinity },
          scale: { delay: 1.8, type: "spring", stiffness: 100 }
        }}
      />

      {/* Middle glow ring */}
      <motion.circle
        cx={query.x}
        cy={query.y}
        r="3.2"
        fill="hsl(var(--accent))"
        opacity="0.4"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.9, type: "spring", stiffness: 120 }}
      />

      {/* Core node */}
      <motion.circle
        cx={query.x}
        cy={query.y}
        r="2.5"
        fill="hsl(var(--accent))"
        stroke="hsl(var(--glow-cyan))"
        strokeWidth="0.4"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2.0, type: "spring", stiffness: 200, damping: 15 }}
      />

      {/* Label (optional) */}
      {showLabel && (
        <motion.text
          x={query.x}
          y={query.y + 6}
          textAnchor="middle"
          className="text-[1px] font-semibold fill-accent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ delay: 2.4 }}
        >
          Query
        </motion.text>
      )}
    </g>
  );
};
```

---

#### 6. `ConnectionLine.tsx`

**Purpose**: Animated connection line with hover tooltip

```typescript
interface ConnectionLineProps {
  from: { x: number; y: number };
  to: { x: number; y: number };
  distance: number;
  index: number;
  onHover?: (hovering: boolean) => void;
}

export const ConnectionLine: React.FC<ConnectionLineProps> = ({
  from,
  to,
  distance,
  index,
  onHover
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const midpoint = {
    x: (from.x + to.x) / 2,
    y: (from.y + to.y) / 2
  };

  return (
    <g>
      <motion.line
        x1={from.x}
        y1={from.y}
        x2={to.x}
        y2={to.y}
        stroke="hsl(var(--glow-cyan))"
        strokeWidth="0.3"
        strokeDasharray="1 1"
        className="cursor-pointer"
        onMouseEnter={() => {
          setShowTooltip(true);
          onHover?.(true);
        }}
        onMouseLeave={() => {
          setShowTooltip(false);
          onHover?.(false);
        }}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.6 }}
        exit={{ pathLength: 0, opacity: 0 }}
        transition={{
          duration: 0.8,
          delay: 2.2 + index * 0.15
        }}
        whileHover={{
          strokeWidth: 0.6,
          opacity: 1
        }}
      />

      <DistanceTooltip
        distance={distance}
        position={midpoint}
        visible={showTooltip}
      />
    </g>
  );
};
```

---

## State Management Architecture

### Core State Model

```typescript
// Enhanced TalentBubble interface
interface TalentBubble {
  id: string;
  name: string;
  role: string;
  location: string;
  x: number;
  y: number;
  type: "candidate" | "query";

  // NEW fields
  roleType: RoleType;           // For color coding
  skillSet: string[];           // For filtering
  availability: boolean;        // For filtering
  cosineDistance?: number;      // Actual embedding distance
}

// Role categorization for color coding
type RoleType =
  | 'react'      // Purple cluster
  | 'python'     // Teal cluster
  | 'ml'         // Blue cluster
  | 'cloud'      // Green cluster
  | 'java'       // Orange cluster
  | 'devops';    // Pink cluster

// UI Interaction State
interface InteractionState {
  // Selection & Hover
  hoveredNodeId: string | null;
  selectedNodeId: string | null;
  hoveredLineId: string | null;

  // Query
  selectedQueryIndex: number;
  isQueryTransitioning: boolean;

  // Filtering
  enabledRoles: Set<RoleType>;
  filterMode: 'all' | 'cluster' | 'custom';
  showOnlyAvailable: boolean;

  // Animation control
  introAnimComplete: boolean;
  attractionAnimActive: boolean;

  // Distance visualization
  showDistanceLabels: boolean;
  distanceFormat: 'normalized' | 'raw';
}

// Animation State
interface AnimationState {
  nodePositions: Map<string, { x: number; y: number }>;
  targetPositions: Map<string, { x: number; y: number }>;
  attractionForce: number; // 0-1 for magnetic effect
}
```

---

### State Hooks Strategy

```typescript
// Main component state
const [interaction, setInteraction] = useState<InteractionState>({
  hoveredNodeId: null,
  selectedNodeId: null,
  hoveredLineId: null,
  selectedQueryIndex: 0,
  isQueryTransitioning: false,
  enabledRoles: new Set(['react', 'python', 'ml', 'cloud', 'java', 'devops']),
  filterMode: 'all',
  showOnlyAvailable: false,
  introAnimComplete: false,
  attractionAnimActive: false,
  showDistanceLabels: false,
  distanceFormat: 'normalized'
});

const [animation, setAnimation] = useState<AnimationState>({
  nodePositions: new Map(),
  targetPositions: new Map(),
  attractionForce: 0
});

// Derived state (computed)
const nearestNeighbors = useMemo(() =>
  computeNearestNeighbors(talents, query, 3),
  [talents, query]
);

const visibleNodes = useMemo(() =>
  filterByRoleType(talents, interaction.enabledRoles),
  [talents, interaction.enabledRoles]
);

const nodeGlowIntensity = useMemo(() =>
  computeDistanceHeatMap(visibleNodes, query),
  [visibleNodes, query]
);

const averageDistance = useMemo(() => {
  const distances = nearestNeighbors.map(n => n.distance);
  return distances.reduce((a, b) => a + b, 0) / distances.length;
}, [nearestNeighbors]);
```

---

### Custom Hooks

#### 1. `useNodeAttraction.ts`

**Purpose**: Calculate attracted positions for magnetic effect

```typescript
import { useMemo, useEffect, useState } from 'react';

interface AttractionConfig {
  selectedNode: TalentBubble | null;
  neighbors: TalentBubble[];
  attractionStrength: number; // pixels
  enabled: boolean;
}

export const useNodeAttraction = ({
  selectedNode,
  neighbors,
  attractionStrength = 15,
  enabled
}: AttractionConfig) => {
  const [attractedPositions, setAttractedPositions] = useState<Map<string, { x: number; y: number }>>(new Map());

  useEffect(() => {
    if (!enabled || !selectedNode) {
      setAttractedPositions(new Map());
      return;
    }

    const newPositions = new Map();
    neighbors.forEach(neighbor => {
      const dx = selectedNode.x - neighbor.x;
      const dy = selectedNode.y - neighbor.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Normalize and apply attraction
      const pullFactor = 0.15; // Pull 15% toward selected node
      newPositions.set(neighbor.id, {
        x: neighbor.x + (dx * pullFactor),
        y: neighbor.y + (dy * pullFactor)
      });
    });

    setAttractedPositions(newPositions);
  }, [selectedNode, neighbors, enabled, attractionStrength]);

  return attractedPositions;
};
```

---

#### 2. `useIntroSequence.ts`

**Purpose**: Orchestrate sequential intro animation

```typescript
import { useState, useEffect } from 'react';

interface IntroStage {
  name: string;
  delay: number;
  duration: number;
}

const INTRO_STAGES: IntroStage[] = [
  { name: 'canvas', delay: 0, duration: 600 },
  { name: 'nodes', delay: 400, duration: 1600 },
  { name: 'query', delay: 1800, duration: 800 },
  { name: 'lines', delay: 2200, duration: 800 },
  { name: 'sidebar', delay: 2600, duration: 600 }
];

export const useIntroSequence = () => {
  const [currentStage, setCurrentStage] = useState<string>('canvas');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const timers = INTRO_STAGES.map(stage => {
      return setTimeout(() => {
        setCurrentStage(stage.name);
      }, stage.delay);
    });

    const completeTimer = setTimeout(() => {
      setIsComplete(true);
    }, 3200);

    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(completeTimer);
    };
  }, []);

  return {
    currentStage,
    isComplete,
    isStageActive: (stageName: string) =>
      INTRO_STAGES.findIndex(s => s.name === stageName) <=
      INTRO_STAGES.findIndex(s => s.name === currentStage)
  };
};
```

---

#### 3. `useQueryTransition.ts`

**Purpose**: Smooth transition between query changes

```typescript
import { useState, useEffect } from 'react';

interface TransitionState {
  phase: 'idle' | 'blurOut' | 'move' | 'blurIn';
  progress: number;
}

export const useQueryTransition = (queryIndex: number) => {
  const [transition, setTransition] = useState<TransitionState>({
    phase: 'idle',
    progress: 0
  });

  useEffect(() => {
    const sequence = async () => {
      // Blur out
      setTransition({ phase: 'blurOut', progress: 0 });
      await wait(300);

      // Move
      setTransition({ phase: 'move', progress: 0 });
      await wait(600);

      // Blur in
      setTransition({ phase: 'blurIn', progress: 0 });
      await wait(400);

      // Complete
      setTransition({ phase: 'idle', progress: 1 });
    };

    if (queryIndex !== undefined) {
      sequence();
    }
  }, [queryIndex]);

  return transition;
};

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
```

---

#### 4. `useDistanceHeatMap.ts`

**Purpose**: Calculate glow intensity based on distance

```typescript
import { useMemo } from 'react';

interface GlowLevel {
  distance: number;
  intensity: number;
  radius: number;
  color: string;
}

const GLOW_LEVELS: GlowLevel[] = [
  { distance: 0.15, intensity: 1.0, radius: 4, color: 'cyan' },
  { distance: 0.25, intensity: 0.6, radius: 3, color: 'cyan' },
  { distance: 0.35, intensity: 0.3, radius: 2.5, color: 'cyan' },
  { distance: Infinity, intensity: 0.1, radius: 2, color: 'cyan' }
];

export const useDistanceHeatMap = (
  nodes: TalentBubble[],
  queryNode: TalentBubble
) => {
  return useMemo(() => {
    const heatMap = new Map<string, GlowLevel>();

    nodes.forEach(node => {
      const distance = calculateDistance(node, queryNode);
      const level = GLOW_LEVELS.find(l => distance <= l.distance) || GLOW_LEVELS[GLOW_LEVELS.length - 1];
      heatMap.set(node.id, level);
    });

    return heatMap;
  }, [nodes, queryNode]);
};

const calculateDistance = (a: TalentBubble, b: TalentBubble) => {
  return Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));
};
```

---

## Animations Specification

### 1. Intro Animation Sequence

**Trigger**: Page load / component mount
**Total Duration**: 3.2s
**Orchestration**: Sequential with overlapping stages

```typescript
// Stage 1: Canvas fade-in (0-0.6s)
const canvasAnimation = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.6, ease: "easeOut" }
};

// Stage 2: Nodes sequential appearance (0.4-2.0s)
const nodeAnimation = (index: number) => ({
  initial: { scale: 0, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  transition: {
    delay: 0.4 + index * 0.1,
    duration: 0.5,
    type: "spring",
    stiffness: 150,
    damping: 12
  }
});

// Stage 3: Query bubble glow (1.8-2.6s)
const queryAnimation = {
  initial: { scale: 0, opacity: 0 },
  animate: {
    scale: 1,
    opacity: [0.2, 0.5, 0.2]
  },
  transition: {
    scale: {
      delay: 1.8,
      duration: 0.8,
      type: "spring",
      stiffness: 100,
      damping: 10
    },
    opacity: {
      delay: 1.8,
      duration: 1.5,
      repeat: Infinity
    }
  }
};

// Stage 4: Connection lines draw (2.2-3.0s)
const lineAnimation = (index: number) => ({
  initial: { pathLength: 0, opacity: 0 },
  animate: { pathLength: 1, opacity: 0.6 },
  transition: {
    delay: 2.2 + index * 0.15,
    duration: 0.8,
    ease: "easeOut"
  }
});

// Stage 5: Sidebar slide-in with blur (2.6-3.2s)
const sidebarAnimation = {
  initial: { x: 100, opacity: 0, filter: "blur(10px)" },
  animate: { x: 0, opacity: 1, filter: "blur(0px)" },
  transition: {
    delay: 2.6,
    duration: 0.6,
    ease: [0.4, 0, 0.2, 1] // Custom cubic-bezier
  }
};
```

---

### 2. Node Attraction Animation

**Trigger**: Node selection
**Duration**: 0.8s
**Effect**: Neighbors pull toward selected node by 10-20px

```typescript
const attractionAnimation = {
  // Phase 1: Pull (0-0.4s)
  pull: {
    x: attractedPosition.x,
    y: attractedPosition.y,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 20,
      mass: 0.5,
      duration: 0.4
    }
  },

  // Phase 2: Settle back (0.4-0.8s)
  settle: {
    x: originalPosition.x,
    y: originalPosition.y,
    transition: {
      delay: 0.4,
      type: "spring",
      stiffness: 150,
      damping: 15,
      duration: 0.4
    }
  }
};

// Calculate attracted position
const calculateAttractedPosition = (
  node: { x: number; y: number },
  target: { x: number; y: number },
  strength: number = 0.15
) => ({
  x: node.x + (target.x - node.x) * strength,
  y: node.y + (target.y - node.y) * strength
});
```

---

### 3. Query Transition Animation

**Trigger**: Dropdown query selection change
**Duration**: 1.2s
**Effect**: Blur out → Move → Blur in + Update connections

```typescript
const queryTransitionPhases = {
  // Stage 1: Blur out (0-0.3s)
  blurOut: {
    filter: "blur(8px)",
    opacity: 0.4,
    transition: { duration: 0.3 }
  },

  // Stage 2: Move query bubble (0.2-0.8s)
  move: {
    x: newQuery.x,
    y: newQuery.y,
    transition: {
      delay: 0.2,
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1] // Smooth ease
    }
  },

  // Stage 3: Update lines (0.6-1.0s)
  updateLines: {
    pathLength: [0, 1],
    opacity: [0, 0.6],
    transition: {
      delay: 0.6,
      duration: 0.4
    }
  },

  // Stage 4: Blur in (0.8-1.2s)
  blurIn: {
    filter: "blur(0px)",
    opacity: 1,
    transition: {
      delay: 0.8,
      duration: 0.4
    }
  },

  // Sidebar refresh (0.9-1.2s)
  sidebarUpdate: {
    opacity: [0, 1],
    x: [20, 0],
    transition: {
      delay: 0.9,
      duration: 0.3
    }
  }
};
```

---

### 4. Distance Heat Glow

**Trigger**: Continuous (based on distance to query)
**Duration**: 2s pulsing cycle
**Effect**: Gradient glow intensity by proximity

```typescript
// Distance thresholds and glow configuration
const glowLevels = {
  close: {
    distance: 0.15,
    intensity: 1.0,
    radius: 4,
    color: "var(--glow-cyan)"
  },
  medium: {
    distance: 0.25,
    intensity: 0.6,
    radius: 3,
    color: "var(--glow-cyan)"
  },
  far: {
    distance: 0.35,
    intensity: 0.3,
    radius: 2.5,
    color: "var(--glow-cyan)"
  },
  veryFar: {
    distance: Infinity,
    intensity: 0.1,
    radius: 2,
    color: "var(--glow-cyan)"
  }
};

// Determine glow level based on distance
const getGlowLevel = (distance: number) => {
  if (distance <= 0.15) return glowLevels.close;
  if (distance <= 0.25) return glowLevels.medium;
  if (distance <= 0.35) return glowLevels.far;
  return glowLevels.veryFar;
};

// Apply to node glow halo
const glowAnimation = (distance: number) => {
  const level = getGlowLevel(distance);

  return {
    r: level.radius,
    fill: `hsl(${level.color})`,
    animate: {
      opacity: [
        level.intensity * 0.2,
        level.intensity * 0.5,
        level.intensity * 0.2
      ]
    },
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };
};
```

---

### 5. Cluster Highlighting

**Trigger**: Query selection
**Duration**: 0.4s
**Effect**: Fade non-matching nodes to 25% opacity

```typescript
const clusterHighlight = {
  // Relevant nodes (nearest neighbors)
  relevant: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  },

  // Irrelevant nodes (all others)
  irrelevant: {
    opacity: 0.25,
    scale: 0.9,
    filter: "blur(1px)",
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  }
};

// Apply based on node relevance
const shouldFade = (nodeId: string, nearestIds: Set<string>) => {
  return !nearestIds.has(nodeId);
};
```

---

### 6. Hover Interactions

```typescript
// Node hover (enhanced from current)
const nodeHoverAnimation = {
  scale: 2,
  transition: {
    duration: 0.3,
    type: "spring",
    stiffness: 300,
    damping: 20
  }
};

// Tooltip slide-in
const tooltipAnimation = {
  initial: { opacity: 0, y: 8, scale: 0.9 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: 8, scale: 0.9 },
  transition: {
    duration: 0.2,
    ease: "easeOut"
  }
};

// Line hover (NEW)
const lineHoverAnimation = {
  strokeWidth: 0.6,  // from 0.3
  opacity: 1,        // from 0.6
  transition: {
    duration: 0.2
  }
};

// Legend panel entrance
const legendAnimation = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  transition: {
    delay: 2.0,
    duration: 0.4
  }
};
```

---

## CSS Design System Extensions

### New Color Variables

Add to `src/index.css` in the `:root` section:

```css
:root {
  /* Existing colors... */

  /* ===== Role Type Colors ===== */
  --role-react: 260 60% 60%;        /* Purple */
  --role-python: 180 70% 55%;       /* Teal */
  --role-ml: 220 80% 60%;           /* Blue */
  --role-cloud: 140 60% 55%;        /* Green */
  --role-java: 25 85% 60%;          /* Orange */
  --role-devops: 320 65% 60%;       /* Pink */

  /* ===== Glow Variations ===== */
  --glow-react: 260 60% 60%;
  --glow-python: 180 70% 55%;
  --glow-ml: 220 80% 60%;
  --glow-cloud: 140 60% 55%;
  --glow-java: 25 85% 60%;
  --glow-devops: 320 65% 60%;

  /* ===== Distance Heat Map ===== */
  --heat-close: 180 100% 65%;       /* Bright cyan */
  --heat-medium: 180 100% 55%;      /* Medium cyan */
  --heat-far: 180 50% 45%;          /* Dim cyan */

  /* ===== Explanation Card ===== */
  --explanation-bg: 240 20% 15%;
  --explanation-border: 180 100% 65%;
}
```

---

### New Utility Classes

Add to `src/index.css` in the `@layer utilities` section:

```css
@layer utilities {
  /* Existing utilities... */

  /* ===== Legend Panel ===== */
  .legend-panel {
    @apply absolute top-4 left-4 p-4 z-10;
    @apply bg-glass-bg/50 backdrop-blur-xl;
    @apply border border-glass-border/30 rounded-xl;
    @apply shadow-2xl;
    min-width: 220px;
  }

  /* ===== Sticky Sidebar ===== */
  .sticky-sidebar {
    @apply sticky top-20;
    max-height: calc(100vh - 100px);
    overflow-y: auto;
    scrollbar-width: thin;
    scrollbar-color: hsl(var(--glass-border)) transparent;
  }

  .sticky-sidebar::-webkit-scrollbar {
    width: 6px;
  }

  .sticky-sidebar::-webkit-scrollbar-track {
    background: transparent;
  }

  .sticky-sidebar::-webkit-scrollbar-thumb {
    background: hsl(var(--glass-border) / 0.3);
    border-radius: 3px;
  }

  /* ===== Distance Label ===== */
  .distance-label {
    @apply font-mono;
    fill: hsl(var(--accent));
    text-shadow: 0 0 3px rgba(0, 255, 255, 0.8);
    font-size: 0.8px;
  }

  /* ===== Explanation Card ===== */
  .explanation-card {
    @apply p-4 mt-4 rounded-lg;
    @apply border-l-4 border-accent;
    background: linear-gradient(
      135deg,
      hsl(var(--explanation-bg) / 0.6),
      hsl(var(--explanation-bg) / 0.3)
    );
    backdrop-filter: blur(20px);
  }

  /* ===== Role Badge ===== */
  .role-badge {
    @apply px-2 py-1 rounded-md text-xs font-semibold;
    @apply inline-flex items-center gap-1;
    backdrop-filter: blur(10px);
  }

  .role-badge-react {
    @apply bg-[hsl(var(--role-react))]/20;
    @apply border border-[hsl(var(--role-react))]/40;
    @apply text-[hsl(var(--role-react))];
  }

  .role-badge-python {
    @apply bg-[hsl(var(--role-python))]/20;
    @apply border border-[hsl(var(--role-python))]/40;
    @apply text-[hsl(var(--role-python))];
  }

  .role-badge-ml {
    @apply bg-[hsl(var(--role-ml))]/20;
    @apply border border-[hsl(var(--role-ml))]/40;
    @apply text-[hsl(var(--role-ml))];
  }

  .role-badge-cloud {
    @apply bg-[hsl(var(--role-cloud))]/20;
    @apply border border-[hsl(var(--role-cloud))]/40;
    @apply text-[hsl(var(--role-cloud))];
  }

  .role-badge-java {
    @apply bg-[hsl(var(--role-java))]/20;
    @apply border border-[hsl(var(--role-java))]/40;
    @apply text-[hsl(var(--role-java))];
  }

  .role-badge-devops {
    @apply bg-[hsl(var(--role-devops))]/20;
    @apply border border-[hsl(var(--role-devops))]/40;
    @apply text-[hsl(var(--role-devops))];
  }

  /* ===== Query Transition Blur Effect ===== */
  .query-blur-transition {
    transition: filter 0.3s ease-out, opacity 0.3s ease-out;
  }

  .query-blur-transition.blurring {
    filter: blur(8px);
    opacity: 0.4;
  }

  /* ===== Glow Ring Animations ===== */
  @keyframes glow-pulse-close {
    0%, 100% { opacity: 0.3; }
    50% { opacity: 0.7; }
  }

  @keyframes glow-pulse-medium {
    0%, 100% { opacity: 0.15; }
    50% { opacity: 0.4; }
  }

  @keyframes glow-pulse-far {
    0%, 100% { opacity: 0.05; }
    50% { opacity: 0.2; }
  }
}
```

---

## Implementation Priority

### Phase 1: Foundation (Must-Have for MVP)
**Estimated Time**: 3-4 hours
**ROI**: Highest impact features

1. **Cluster Color-Coding** ⭐⭐⭐
   - Add `roleType` to data model
   - Create role-to-color mapping
   - Apply colors to nodes and glows
   - **File**: `EmbeddingSpaceMap.tsx`, `index.css`

2. **Distance Heat Glow** ⭐⭐⭐
   - Implement `useDistanceHeatMap` hook
   - Apply gradient glow intensity
   - Pulsing animation by proximity
   - **File**: `hooks/useDistanceHeatMap.ts`, `EmbeddingSpaceMap.tsx`

3. **"Why These Results?" Card** ⭐⭐⭐
   - Create `ExplanationCard` component
   - Add to sidebar below nearest neighbors
   - Calculate average distance
   - **File**: `components/embedding/ExplanationCard.tsx`

4. **Enhanced Query Bubble** ⭐⭐
   - Increase glow prominence
   - Add label option
   - Improve pulsation
   - **File**: `components/embedding/QueryNode.tsx`

5. **CSS Variables Setup** ⭐⭐⭐
   - Add all role colors
   - Add glow variations
   - Add utility classes
   - **File**: `index.css`

---

### Phase 2: Polish (High Impact)
**Estimated Time**: 3-4 hours
**ROI**: Premium feel and smoothness

6. **Intro Animation Sequence** ⭐⭐
   - Create `useIntroSequence` hook
   - Orchestrate 5-stage animation
   - Sequential node appearance
   - **File**: `hooks/useIntroSequence.ts`, `EmbeddingSpaceMap.tsx`

7. **Query Transition Animations** ⭐⭐
   - Create `useQueryTransition` hook
   - Blur out → move → blur in
   - Smooth line updates
   - **File**: `hooks/useQueryTransition.ts`, `components/embedding/QuerySelector.tsx`

8. **Cluster Highlighting** ⭐⭐
   - Fade non-relevant nodes to 25%
   - Smooth 0.4s transition
   - Maintain neighbor focus
   - **File**: `EmbeddingSpaceMap.tsx`

9. **Improved Sidebar** ⭐
   - Add sticky positioning
   - Smooth card transitions
   - Better spacing
   - **File**: `components/embedding/ResultsSidebar.tsx`

---

### Phase 3: Advanced (Nice-to-Have)
**Estimated Time**: 2-4 hours
**ROI**: Delight and interactivity

10. **Node Attraction Animation** ⭐
    - Create `useNodeAttraction` hook
    - Magnetic pull on selection
    - Spring physics
    - **File**: `hooks/useNodeAttraction.ts`

11. **Distance Tooltips on Lines** ⭐
    - Create `DistanceTooltip` component
    - Show on line hover/click
    - Display cosine distance
    - **File**: `components/embedding/DistanceTooltip.tsx`, `components/embedding/ConnectionLine.tsx`

12. **Mini Legend with Filters** ⭐⭐
    - Create `LegendPanel` component
    - Color coding guide
    - Toggle role filters
    - **File**: `components/embedding/LegendPanel.tsx`

13. **Component Refactoring** ⭐
    - Extract `TalentNode` component
    - Extract `ConnectionLine` component
    - Improve code organization
    - **Files**: Multiple component files

---

## File Structure After Implementation

```
pythia-labs/
├── src/
│   ├── components/
│   │   ├── EmbeddingSpaceMap.tsx          (Main container - refactored)
│   │   │
│   │   ├── embedding/
│   │   │   ├── EmbeddingCanvas.tsx        (NEW - SVG visualization wrapper)
│   │   │   ├── EmbeddingHeader.tsx        (NEW - Title + QuerySelector)
│   │   │   ├── ResultsSidebar.tsx         (NEW - Right panel with sticky)
│   │   │   ├── LegendPanel.tsx            (NEW - Color legend + filters)
│   │   │   ├── TalentNode.tsx             (NEW - Individual candidate node)
│   │   │   ├── QueryNode.tsx              (NEW - Query bubble component)
│   │   │   ├── ConnectionLine.tsx         (NEW - Animated distance line)
│   │   │   ├── DistanceTooltip.tsx        (NEW - Hover tooltip for lines)
│   │   │   ├── ExplanationCard.tsx        (NEW - Educational card)
│   │   │   ├── NodeTooltip.tsx            (NEW - Enhanced hover card)
│   │   │   └── types.ts                   (NEW - TypeScript interfaces)
│   │   │
│   │   └── ...other components
│   │
│   ├── hooks/
│   │   ├── useNodeAttraction.ts           (NEW - Magnetic effect)
│   │   ├── useIntroSequence.ts            (NEW - Orchestrated intro)
│   │   ├── useQueryTransition.ts          (NEW - Smooth query change)
│   │   ├── useDistanceHeatMap.ts          (NEW - Glow intensity)
│   │   └── ...existing hooks
│   │
│   └── index.css                          (UPDATED - New color variables)
│
└── EMBEDDING_MAP_UPGRADE_PLAN.md          (This document)
```

---

## Data Model Changes

### Enhanced Synthetic Data

```typescript
// Add to EmbeddingSpaceMap.tsx
const enhancedSyntheticData: TalentBubble[] = [
  {
    id: "1",
    name: "Ana S.",
    role: "React Developer",
    roleType: "react",
    location: "Madrid",
    x: 25,
    y: 30,
    skillSet: ["React", "TypeScript", "Next.js"],
    availability: true,
    type: "candidate"
  },
  {
    id: "2",
    name: "Luis M.",
    role: "Senior Python Engineer",
    roleType: "python",
    location: "Barcelona",
    x: 30,
    y: 45,
    skillSet: ["Python", "Django", "FastAPI", "PostgreSQL"],
    availability: true,
    type: "candidate"
  },
  {
    id: "3",
    name: "Julia R.",
    role: "Java Developer",
    roleType: "java",
    location: "Zurich",
    x: 65,
    y: 35,
    skillSet: ["Java", "Spring Boot", "Microservices"],
    availability: false,
    type: "candidate"
  },
  {
    id: "4",
    name: "Marco T.",
    role: "ML Engineer",
    roleType: "ml",
    location: "Berlin",
    x: 70,
    y: 55,
    skillSet: ["Python", "TensorFlow", "PyTorch", "MLOps"],
    availability: true,
    type: "candidate"
  },
  {
    id: "5",
    name: "Sara V.",
    role: "AWS Cloud Engineer",
    roleType: "cloud",
    location: "Lisbon",
    x: 45,
    y: 65,
    skillSet: ["AWS", "Terraform", "Kubernetes", "Docker"],
    availability: true,
    type: "candidate"
  },
  {
    id: "6",
    name: "Carlos P.",
    role: "React Developer",
    roleType: "react",
    location: "Valencia",
    x: 22,
    y: 38,
    skillSet: ["React", "Redux", "GraphQL"],
    availability: true,
    type: "candidate"
  },
  {
    id: "7",
    name: "Emma K.",
    role: "DevOps Engineer",
    roleType: "devops",
    location: "Munich",
    x: 55,
    y: 48,
    skillSet: ["GitLab CI", "Jenkins", "Docker", "Ansible"],
    availability: false,
    type: "candidate"
  },
  {
    id: "8",
    name: "Thomas W.",
    role: "Frontend Angular Dev",
    roleType: "react", // Treat as frontend (close to React)
    location: "Vienna",
    x: 40,
    y: 25,
    skillSet: ["Angular", "TypeScript", "RxJS"],
    availability: true,
    type: "candidate"
  },
];

// Role color mapping helper
const getRoleColor = (roleType: RoleType): string => {
  const colorMap: Record<RoleType, string> = {
    'react': '--role-react',
    'python': '--role-python',
    'ml': '--role-ml',
    'cloud': '--role-cloud',
    'java': '--role-java',
    'devops': '--role-devops'
  };
  return colorMap[roleType] || '--primary';
};
```

---

## Testing Strategy

### Visual Testing
- [ ] All animations run at 60fps
- [ ] Glassmorphic effects render correctly in Chrome, Firefox, Safari
- [ ] Color contrast meets WCAG AA standards
- [ ] Responsive layout works on mobile (375px), tablet (768px), desktop (1440px)
- [ ] SVG scales properly at different viewports

### Interaction Testing
- [ ] Hover states trigger correctly on all nodes
- [ ] Dropdown transitions are smooth without jank
- [ ] Filter toggles update visualization immediately
- [ ] Distance calculations are accurate
- [ ] Tooltips position correctly and don't overflow SVG bounds
- [ ] Keyboard navigation works (tab through interactive elements)

### Performance Testing
- [ ] Component renders < 100ms on initial load
- [ ] Re-renders on query change < 50ms
- [ ] Animation frame rate stays at 60fps
- [ ] No memory leaks with repeated query changes
- [ ] State updates are batched efficiently
- [ ] SVG DOM node count stays reasonable (< 100 elements)

### Accessibility Testing
- [ ] ARIA labels on interactive elements
- [ ] Keyboard focus visible
- [ ] Screen reader announces state changes
- [ ] Color is not the only means of conveying information
- [ ] Sufficient color contrast (4.5:1 for text)

---

## Success Metrics

After implementation, the component should achieve:

### Educational Clarity
✅ Users understand that "embeddings = points in space"
✅ Visual clustering shows "similar roles group together"
✅ Distance glow communicates "closeness = relevance"
✅ Explanation card bridges technical concept to business value

### Premium Feel
✅ All animations smooth at 60fps
✅ Intro sequence feels "Apple-like"
✅ Transitions are delightful, not jarring
✅ Glassmorphic design is consistent

### Interactivity
✅ Filters work without lag
✅ Hover states are responsive
✅ Selection provides clear feedback
✅ Tooltips are informative and well-positioned

### Performance
✅ No lag with 20+ nodes
✅ Smooth query transitions
✅ Efficient re-renders
✅ No janky animations

### Accessibility
✅ Keyboard navigation works
✅ ARIA labels present
✅ Color contrast sufficient
✅ Focus indicators visible

### Responsiveness
✅ Works on mobile (375px)
✅ Works on tablet (768px)
✅ Works on desktop (1440px+)
✅ Touch interactions work on mobile

---

## Implementation Workflow

### Step-by-Step Process

#### Phase 1 Implementation (Days 1-2)

1. **Setup CSS Variables** (30 min)
   - Add role colors to `index.css`
   - Add utility classes
   - Test color rendering

2. **Enhance Data Model** (30 min)
   - Add `roleType` to interfaces
   - Update synthetic data
   - Create color mapping helper

3. **Implement Color Coding** (1 hour)
   - Apply role colors to nodes
   - Update stroke colors
   - Test visual distinction

4. **Create Distance Heat Map** (1.5 hours)
   - Build `useDistanceHeatMap` hook
   - Apply glow intensity
   - Add pulsing animation
   - Test different distance thresholds

5. **Build Explanation Card** (1 hour)
   - Create `ExplanationCard` component
   - Calculate average distance
   - Add to sidebar
   - Style with glassmorphism

6. **Test Phase 1** (30 min)
   - Visual regression testing
   - Performance profiling
   - Browser compatibility

#### Phase 2 Implementation (Days 3-4)

7. **Create Intro Sequence** (2 hours)
   - Build `useIntroSequence` hook
   - Apply staged animations
   - Fine-tune timing
   - Test orchestration

8. **Implement Query Transitions** (1.5 hours)
   - Build `useQueryTransition` hook
   - Add blur effects
   - Smooth line updates
   - Test all query switches

9. **Add Cluster Highlighting** (1 hour)
   - Implement fade logic
   - Smooth transitions
   - Test with different queries

10. **Refactor Sidebar** (1 hour)
    - Add sticky positioning
    - Improve animations
    - Better spacing

11. **Test Phase 2** (30 min)
    - Animation smoothness
    - Transition quality
    - UX flow

#### Phase 3 Implementation (Days 5-6)

12. **Build Node Attraction** (2 hours)
    - Create `useNodeAttraction` hook
    - Implement spring physics
    - Test magnetic effect
    - Fine-tune timing

13. **Add Line Tooltips** (1.5 hours)
    - Create `DistanceTooltip` component
    - Add hover detection
    - Position tooltips
    - Test on all lines

14. **Build Legend Panel** (2 hours)
    - Create `LegendPanel` component
    - Add filter toggles
    - Implement filter logic
    - Style panel

15. **Component Refactoring** (1.5 hours)
    - Extract `TalentNode`
    - Extract `ConnectionLine`
    - Extract `QueryNode`
    - Organize file structure

16. **Final Testing** (1 hour)
    - End-to-end testing
    - Performance optimization
    - Bug fixes
    - Documentation updates

---

## Next Steps

1. **Review this plan** and provide feedback
2. **Approve phases** to implement (all or subset)
3. **Begin Phase 1** implementation (recommended start)
4. **Iterate with feedback** after each phase
5. **Deploy and monitor** user engagement

---

## Appendix

### Color Palette Reference

| Role Type | Color Name | HSL Value | Hex Approximation |
|-----------|------------|-----------|-------------------|
| React | Purple | `260 60% 60%` | `#8C66FF` |
| Python | Teal | `180 70% 55%` | `#2ABFBF` |
| ML | Blue | `220 80% 60%` | `#4D94FF` |
| Cloud | Green | `140 60% 55%` | `#47D47A` |
| Java | Orange | `25 85% 60%` | `#F09933` |
| DevOps | Pink | `320 65% 60%` | `#E64D9E` |

### Animation Timing Reference

| Animation | Duration | Delay | Easing |
|-----------|----------|-------|--------|
| Canvas fade-in | 0.6s | 0s | easeOut |
| Node appearance | 0.5s | 0.4s + idx*0.1 | spring |
| Query glow | 0.8s | 1.8s | spring |
| Lines draw | 0.8s | 2.2s + idx*0.15 | easeOut |
| Sidebar slide | 0.6s | 2.6s | cubic-bezier |
| Node attraction | 0.8s | 0s | spring |
| Query transition | 1.2s | 0s | multi-stage |
| Cluster fade | 0.4s | 0s | easeOut |
| Heat glow pulse | 2.0s | 0s | easeInOut (loop) |

### Browser Support

| Browser | Version | Status |
|---------|---------|--------|
| Chrome | 90+ | ✅ Full support |
| Firefox | 88+ | ✅ Full support |
| Safari | 14+ | ✅ Full support |
| Edge | 90+ | ✅ Full support |
| Mobile Safari | 14+ | ✅ Full support |
| Mobile Chrome | 90+ | ✅ Full support |

**Note**: `backdrop-filter` (glassmorphism) requires modern browsers. Graceful degradation for older browsers.

---

**Plan Version**: 1.0
**Last Updated**: 2025-11-16
**Status**: Ready for Implementation ✅
**Estimated Total Time**: 8-12 hours (all phases)

---

## Questions or Feedback?

This plan is comprehensive but flexible. If you have questions, need clarification, or want to adjust priorities, please provide feedback before implementation begins.

**Ready to start?** Let's build something premium! 🚀
