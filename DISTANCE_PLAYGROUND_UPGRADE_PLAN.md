# Distance Playground - Premium Upgrade Plan

**Project**: PythiaLabs - Pythia Vector Lab
**Component**: DistancePlayground.tsx
**Version**: 2.0 - Premium Product Level
**Date**: 2025-11-16
**Status**: Ready for Implementation ✅

---

## Executive Summary

Transforming the Distance Playground from "polished" to **"premium product-level exceptional"** through 12 strategic enhancements focused on **readability**, **visual clarity**, **educational value**, and **interactive delight**.

### Current State
- ✅ Interactive vector dragging functional
- ✅ Three distance metrics (cosine, euclidean, dot)
- ✅ Preset configurations available
- ✅ Real-time distance calculation
- ✅ Glassmorphic design system in place

### Target State
- ✨ **40-50% larger** vectors and handles for premium visibility
- ✨ **Apple Health-style** large typography (64px distance numbers)
- ✨ **Visual preset cards** with diagrams (not just text buttons)
- ✨ **Radial angle markers** for understanding cosine semantics
- ✨ **Semantic color transitions** (teal → magenta as angle changes)
- ✨ **Smooth metric animations** with background color shifts
- ✨ **Educational legend** for cosine value ranges
- ✨ **Pulsing snap animations** when applying presets
- ✨ **20-25% larger canvas** with enhanced glassmorphism
- ✨ **Vector identity labels** (A vs B visualization)

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
9. [Implementation Workflow](#implementation-workflow)

---

## Upgrade Features Overview

### Top 12 High-Impact Improvements

#### ✅ 1. Enlarge Vectors for Premium Visibility
**Problem**: Vector tips (18px) and lines (2px) are too small
**Solution**: Increase all visual elements by 40-50%
- Vector tip circles → **32-40px** (from ~18px)
- Vector lines → **4px stroke** (from 2px)
- Glow halos → **+30% radius increase**
- Hover state → **2x scale** (smooth spring animation)

**Impact**: Vectors become the hero element, immediately understandable

---

#### ✅ 2. Make Drag Handles MUCH Larger
**Problem**: Users miss the tiny drag targets
**Solution**: Increase handle size dramatically
- Handle diameter → **40px full size** (from 25px)
- Hover state → **48px with glow pulse**
- Drag state → **Elastic scaling** with spring physics
- Cursor change → `cursor: grab` → `cursor: grabbing`

**Impact**: Premium interaction feel, no more "hunt for the handle"

---

#### ✅ 3. Typography Enlargement (Apple Health Style)
**Problem**: Current text is readable but not impactful
**Solution**: Scale up all typography for clarity
- Title → **48-52px** (from 36px)
- Subtitle → **20-23px** (from 18px)
- Metric tabs → **18-20px** (from 16px)
- **Distance number → 64px** (from 48px) - the star of the show
- Description text → **18px** (from 14px)
- Preset cards → **16-18px**

**Impact**: Matches Embedding Map premium feel, manager-friendly

---

#### ✅ 4. Add Vector Identity Visualization
**Problem**: Users don't know what these vectors represent
**Solution**: Add clear visual labels
- Small header above canvas: **"Vector A vs Vector B"**
- Color-coded badges next to vectors:
  - Vector A → Cyan badge with label
  - Vector B → Purple badge with label
- Optional: Show vector coordinates on hover

**Impact**: Immediate context for comparison

---

#### ✅ 5. Add Radial Angle Markers (Critical for Understanding)
**Problem**: No reference for what angles mean semantically
**Solution**: Add faint radial grid with angle markers
- **0° (identical)** → Faint arc marker
- **45° (similar)** → Subtle reference line
- **90° (orthogonal)** → Visual marker
- **180° (opposite)** → Arc indicator
- Glassy, subtle design (opacity: 0.15)

**Impact**: HUGE educational boost - users see semantic meaning visually

---

#### ✅ 6. Visual Preset Cards (Not Just Buttons)
**Problem**: Current presets are text-only buttons
**Solution**: Transform into **visual explanation cards**
- Each card shows small diagram of vector configuration
- **Highly Similar**: Two arrows nearly overlapping (0-30°)
- **Opposite**: Arrows pointing 180° apart
- **Identical**: Perfect overlap with shimmer
- **Random**: Question mark icon with varied angles

**Impact**: Managers LOVE these visual cues - instant understanding

---

#### ✅ 7. Smooth Metric Switching Animations
**Problem**: Instant metric changes feel jarring
**Solution**: Multi-stage transition sequence
- **Stage 1**: Brief blur-out (0.2s)
- **Stage 2**: Number morphs with scale (0.4s)
- **Stage 3**: Background tone shifts subtly
  - Cosine → Cyan tint
  - Euclidean → Purple tint
  - Dot Product → Teal tint
- **Stage 4**: Distance arc draws for Euclidean (visual line between points)

**Impact**: Magical, premium feel - like switching watch faces

---

#### ✅ 8. Add Micro-Feedback Text Under Each Metric
**Problem**: Users don't know when to use each metric
**Solution**: Add 4-6 word descriptions under tabs
- **Cosine**: "Recommended for semantic meaning"
- **Euclidean**: "Sensitive to magnitude"
- **Dot**: "Dense inner-product scoring"

**Impact**: Educational clarity matching "Why these results?" panel

---

#### ✅ 9. Increase Spacing Between Panels
**Problem**: Layout feels cramped
**Solution**: Apply breathing room
- Panel-to-panel margin → **48-60px** (from 24px)
- Padding inside cards → **24-32px** (from 16-20px)
- Grid gap → **24px** (from 16px)

**Impact**: Matches Embedding Map's premium layout

---

#### ✅ 10. Add Tiny Cosine Legend (Semantic Spectrum)
**Problem**: Non-technical users don't know what "0.234" means
**Solution**: Educational mini-table under distance number
```
| Range         | Meaning          |
|---------------|------------------|
| 0.0 – 0.2     | almost identical |
| 0.2 – 0.4     | similar          |
| 0.4 – 0.7     | somewhat related |
| 0.7 – 1.0     | unrelated        |
```

**Impact**: Bridges technical metrics to human understanding

---

#### ✅ 11. Make Canvas 20-25% Bigger
**Problem**: Vectors feel cramped in space
**Solution**: Enlarge visualization area
- Canvas height → **500px** (from 400px)
- Viewbox scaling → Maintain 10x10 units
- Border radius → **16px** (from 12px) matching Embedding Map
- Glass inner-shadow → Enhanced depth effect

**Impact**: Vectors have room to breathe, premium feel

---

#### ✅ 12. Add Pulsing Halo on Preset Snap
**Problem**: Preset application has no visual feedback
**Solution**: Animated confirmation on snap
- When preset clicked → Quick cyan pulse (0.6s) around both handles
- Handles snap with spring animation (elastic ease)
- Brief trail effect as vectors move to position
- Subtle haptic feel (if on mobile)

**Impact**: Delightful interaction confirmation

---

## React Component Architecture

### Component Hierarchy (Enhanced)

```
DistancePlayground (Container)
├── PlaygroundHeader
│   ├── Title & Subtitle
│   └── VectorIdentityBadges (NEW - "Vector A vs B")
│
├── PlaygroundCanvas (Left Side)
│   ├── SVGContainer (20% larger)
│   │   ├── AngleMarkers[] (NEW - Radial reference grid)
│   │   ├── DistanceArc (NEW - For Euclidean mode)
│   │   ├── VectorLine (Enhanced - thicker, glowing)
│   │   │   ├── Vector A line
│   │   │   └── Vector B line
│   │   ├── VectorHandle (Enhanced - 40px, elastic drag)
│   │   │   ├── Handle A (cyan)
│   │   │   └── Handle B (purple)
│   │   └── VectorLabels (NEW - "A" and "B" badges)
│   │
│   └── CanvasLegend (NEW - Angle meanings overlay)
│
└── ControlPanel (Right Side)
    ├── MetricSelector (Enhanced)
    │   ├── MetricTab[] (with micro-descriptions)
    │   └── MetricFeedback (NEW - educational hints)
    │
    ├── DistanceDisplay (Enhanced)
    │   ├── LargeNumber (64px, animated morph)
    │   ├── Explanation (18px)
    │   └── CosineRangeLegend (NEW - semantic table)
    │
    └── PresetCards (Redesigned)
        ├── PresetCard[] (visual diagrams)
        │   ├── IconDiagram (NEW - vector visualization)
        │   ├── Label
        │   └── Description (NEW - angle info)
        └── PulseEffect (on selection)
```

---

### New Component Specifications

#### 1. `VectorIdentityBadges.tsx`

**Purpose**: Show what's being compared (A vs B)

```typescript
interface VectorIdentityBadgesProps {
  vectorAColor: string;
  vectorBColor: string;
  showCoordinates?: boolean;
  vectorA?: Vector;
  vectorB?: Vector;
}

export const VectorIdentityBadges: React.FC<VectorIdentityBadgesProps> = ({
  vectorAColor,
  vectorBColor,
  showCoordinates = false,
  vectorA,
  vectorB
}) => {
  return (
    <motion.div
      className="flex items-center justify-center gap-4 mb-4"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="flex items-center gap-2">
        <div
          className="w-4 h-4 rounded-full glow-ring"
          style={{ backgroundColor: `hsl(var(${vectorAColor}))` }}
        />
        <span className="text-lg font-semibold">Vector A</span>
        {showCoordinates && vectorA && (
          <span className="text-xs text-muted-foreground font-mono">
            ({vectorA.x.toFixed(1)}, {vectorA.y.toFixed(1)})
          </span>
        )}
      </div>

      <span className="text-muted-foreground text-xl">vs</span>

      <div className="flex items-center gap-2">
        <div
          className="w-4 h-4 rounded-full glow-ring"
          style={{ backgroundColor: `hsl(var(${vectorBColor}))` }}
        />
        <span className="text-lg font-semibold">Vector B</span>
        {showCoordinates && vectorB && (
          <span className="text-xs text-muted-foreground font-mono">
            ({vectorB.x.toFixed(1)}, {vectorB.y.toFixed(1)})
          </span>
        )}
      </div>
    </motion.div>
  );
};
```

---

#### 2. `AngleMarkers.tsx`

**Purpose**: Radial reference grid for semantic understanding

```typescript
interface AngleMarkersProps {
  centerX?: number;
  centerY?: number;
  radius?: number;
  showLabels?: boolean;
}

const ANGLE_REFERENCES = [
  { angle: 0, label: "0° (identical)", color: "--accent" },
  { angle: 45, label: "45° (similar)", color: "--primary" },
  { angle: 90, label: "90° (orthogonal)", color: "--secondary" },
  { angle: 135, label: "135°", color: "--muted" },
  { angle: 180, label: "180° (opposite)", color: "--destructive" }
];

export const AngleMarkers: React.FC<AngleMarkersProps> = ({
  centerX = 0,
  centerY = 10,
  radius = 8,
  showLabels = true
}) => {
  return (
    <g className="angle-markers" opacity="0.15">
      {ANGLE_REFERENCES.map(({ angle, label, color }) => {
        const radians = (angle * Math.PI) / 180;
        const x = centerX + radius * Math.cos(radians);
        const y = centerY - radius * Math.sin(radians);

        return (
          <motion.g
            key={angle}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.15 }}
            transition={{ delay: 0.4 + angle / 360 }}
          >
            {/* Reference line */}
            <line
              x1={centerX}
              y1={centerY}
              x2={x}
              y2={y}
              stroke={`hsl(var(${color}))`}
              strokeWidth="0.02"
              strokeDasharray="0.1 0.1"
            />

            {/* Optional label */}
            {showLabels && angle % 45 === 0 && (
              <text
                x={x + 0.3}
                y={y}
                className="text-[0.4px] fill-muted-foreground"
                fontSize="0.4"
              >
                {angle}°
              </text>
            )}
          </motion.g>
        );
      })}

      {/* Center point */}
      <circle
        cx={centerX}
        cy={centerY}
        r="0.08"
        fill="hsl(var(--muted-foreground))"
        opacity="0.3"
      />
    </g>
  );
};
```

---

#### 3. `VectorHandle.tsx`

**Purpose**: Enhanced draggable handle with premium interactions

```typescript
interface VectorHandleProps {
  vector: Vector;
  color: string;
  label: string;
  isDragging: boolean;
  onDragStart: () => void;
  onDragEnd: () => void;
  isSnapping?: boolean;
}

export const VectorHandle: React.FC<VectorHandleProps> = ({
  vector,
  color,
  label,
  isDragging,
  onDragStart,
  onDragEnd,
  isSnapping = false
}) => {
  return (
    <g>
      {/* Glow halo (larger) */}
      <motion.circle
        cx={vector.x}
        cy={10 - vector.y}
        r="0.5"
        fill={`hsl(var(${color}))`}
        animate={{
          opacity: isDragging ? [0.3, 0.6, 0.3] : 0.2,
          r: isDragging ? 0.6 : 0.5
        }}
        transition={{
          opacity: { duration: 1, repeat: Infinity },
          r: { duration: 0.3 }
        }}
      />

      {/* Snap pulse effect */}
      <AnimatePresence>
        {isSnapping && (
          <motion.circle
            cx={vector.x}
            cy={10 - vector.y}
            r="0.3"
            fill="hsl(var(--accent))"
            initial={{ opacity: 0.8, r: 0.3 }}
            animate={{ opacity: 0, r: 0.8 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        )}
      </AnimatePresence>

      {/* Main handle (40px equivalent) */}
      <motion.circle
        cx={vector.x}
        cy={10 - vector.y}
        r="0.35"
        fill={`hsl(var(${color}))`}
        className="cursor-grab"
        onMouseDown={onDragStart}
        initial={{ scale: 0 }}
        animate={{
          scale: 1,
          r: isDragging ? 0.4 : 0.35
        }}
        whileHover={{ scale: 1.3, r: 0.42 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20
        }}
      />

      {/* Label badge */}
      <motion.text
        x={vector.x}
        y={10 - vector.y}
        textAnchor="middle"
        dominantBaseline="middle"
        className="text-[0.35px] font-bold pointer-events-none"
        fill="white"
      >
        {label}
      </motion.text>
    </g>
  );
};
```

---

#### 4. `PresetCard.tsx`

**Purpose**: Visual preset cards with diagrams

```typescript
interface PresetCardProps {
  name: string;
  description: string;
  diagram: "similar" | "opposite" | "identical" | "random";
  onSelect: () => void;
  isActive?: boolean;
}

export const PresetCard: React.FC<PresetCardProps> = ({
  name,
  description,
  diagram,
  onSelect,
  isActive = false
}) => {
  return (
    <motion.button
      onClick={onSelect}
      className={`preset-card ${isActive ? 'preset-card-active' : ''}`}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Diagram visual */}
      <div className="preset-diagram mb-3">
        <PresetDiagram type={diagram} />
      </div>

      {/* Label */}
      <h4 className="text-base font-semibold mb-1">{name}</h4>

      {/* Description */}
      <p className="text-xs text-muted-foreground">{description}</p>
    </motion.button>
  );
};

// Diagram component
const PresetDiagram: React.FC<{ type: string }> = ({ type }) => {
  switch (type) {
    case "similar":
      return (
        <svg viewBox="0 0 24 24" className="w-12 h-12 mx-auto">
          <motion.path
            d="M 4 12 L 16 10"
            stroke="hsl(var(--primary))"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5 }}
          />
          <motion.path
            d="M 4 12 L 18 12"
            stroke="hsl(var(--accent))"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          />
        </svg>
      );

    case "opposite":
      return (
        <svg viewBox="0 0 24 24" className="w-12 h-12 mx-auto">
          <motion.path
            d="M 4 12 L 16 4"
            stroke="hsl(var(--primary))"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
          />
          <motion.path
            d="M 4 12 L 16 20"
            stroke="hsl(var(--accent))"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.1 }}
          />
        </svg>
      );

    case "identical":
      return (
        <svg viewBox="0 0 24 24" className="w-12 h-12 mx-auto">
          <motion.path
            d="M 4 12 L 20 12"
            stroke="hsl(var(--primary))"
            strokeWidth="3"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
          />
          <motion.circle
            cx="20"
            cy="12"
            r="3"
            fill="hsl(var(--accent))"
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </svg>
      );

    case "random":
      return (
        <svg viewBox="0 0 24 24" className="w-12 h-12 mx-auto">
          <text
            x="12"
            y="16"
            textAnchor="middle"
            fontSize="20"
            fill="hsl(var(--accent))"
          >
            ?
          </text>
        </svg>
      );
  }
};
```

---

#### 5. `CosineRangeLegend.tsx`

**Purpose**: Educational table for semantic ranges

```typescript
interface CosineRangeLegendProps {
  currentValue?: number;
  compact?: boolean;
}

const COSINE_RANGES = [
  { min: 0.0, max: 0.2, label: "Almost Identical", color: "--accent" },
  { min: 0.2, max: 0.4, label: "Similar", color: "--primary" },
  { min: 0.4, max: 0.7, label: "Somewhat Related", color: "--secondary" },
  { min: 0.7, max: 1.0, label: "Unrelated", color: "--muted" }
];

export const CosineRangeLegend: React.FC<CosineRangeLegendProps> = ({
  currentValue,
  compact = false
}) => {
  const getCurrentRange = () => {
    if (currentValue === undefined) return null;
    return COSINE_RANGES.find(
      range => currentValue >= range.min && currentValue <= range.max
    );
  };

  const activeRange = getCurrentRange();

  return (
    <motion.div
      className="cosine-legend"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <h5 className="text-xs font-semibold text-muted-foreground mb-2">
        Cosine Distance Ranges
      </h5>
      <div className="space-y-1">
        {COSINE_RANGES.map((range) => (
          <motion.div
            key={range.label}
            className={`cosine-range-row ${
              activeRange?.label === range.label ? 'active' : ''
            }`}
            whileHover={{ x: 2 }}
          >
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: `hsl(var(${range.color}))` }}
                />
                <span className="font-mono">
                  {range.min.toFixed(1)} – {range.max.toFixed(1)}
                </span>
              </div>
              <span className="text-muted-foreground">{range.label}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
```

---

#### 6. `DistanceArc.tsx`

**Purpose**: Visual arc showing Euclidean distance

```typescript
interface DistanceArcProps {
  v1: Vector;
  v2: Vector;
  visible: boolean;
}

export const DistanceArc: React.FC<DistanceArcProps> = ({
  v1,
  v2,
  visible
}) => {
  if (!visible) return null;

  const midX = (v1.x + v2.x) / 2;
  const midY = (v1.y + v2.y) / 2;

  return (
    <motion.g
      initial={{ opacity: 0 }}
      animate={{ opacity: visible ? 0.6 : 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Distance line */}
      <motion.line
        x1={v1.x}
        y1={10 - v1.y}
        x2={v2.x}
        y2={10 - v2.y}
        stroke="hsl(var(--accent))"
        strokeWidth="0.06"
        strokeDasharray="0.2 0.1"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      />

      {/* Distance label */}
      <motion.text
        x={midX}
        y={10 - midY - 0.3}
        textAnchor="middle"
        className="text-[0.35px] fill-accent font-mono"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ delay: 0.4 }}
      >
        distance
      </motion.text>
    </motion.g>
  );
};
```

---

## State Management Architecture

### Enhanced State Model

```typescript
// Enhanced Vector interface
interface Vector {
  x: number;
  y: number;
}

// Distance type
type DistanceType = "cosine" | "euclidean" | "dot";

// Preset configuration with enhanced metadata
interface PresetConfig {
  name: string;
  description: string;
  diagram: "similar" | "opposite" | "identical" | "random";
  v1: Vector;
  v2: Vector;
  angleInfo?: string; // e.g., "~30° angle"
}

// UI Interaction State
interface PlaygroundState {
  // Vectors
  vector1: Vector;
  vector2: Vector;
  dragging: "v1" | "v2" | null;

  // Metric selection
  distanceType: DistanceType;
  isMetricTransitioning: boolean;

  // Preset interaction
  activePreset: string | null;
  isSnapping: boolean;
  snapTarget: "v1" | "v2" | "both" | null;

  // Visual state
  showAngleMarkers: boolean;
  showCoordinates: boolean;
  showCosineRanges: boolean;

  // Animation control
  introComplete: boolean;
}
```

---

### Enhanced Presets Configuration

```typescript
const ENHANCED_PRESETS: PresetConfig[] = [
  {
    name: "Highly Similar",
    description: "~15° angle",
    diagram: "similar",
    v1: { x: 3, y: 4 },
    v2: { x: 3.5, y: 4.2 },
    angleInfo: "Vectors point almost the same direction"
  },
  {
    name: "Opposite",
    description: "~160° angle",
    diagram: "opposite",
    v1: { x: 1, y: 4 },
    v2: { x: 4, y: 1 },
    angleInfo: "Vectors point away from each other"
  },
  {
    name: "Identical",
    description: "0° angle",
    diagram: "identical",
    v1: { x: 3, y: 3 },
    v2: { x: 3.1, y: 3.1 },
    angleInfo: "Perfect overlap - same direction"
  },
  {
    name: "Random",
    description: "~75° angle",
    diagram: "random",
    v1: { x: 2, y: 3.5 },
    v2: { x: 4, y: 2 },
    angleInfo: "Moderate angle difference"
  }
];
```

---

### Custom Hooks

#### 1. `useMetricTransition.ts`

**Purpose**: Smooth transitions when switching metrics

```typescript
import { useState, useEffect } from 'react';

interface MetricTransitionState {
  isTransitioning: boolean;
  phase: 'idle' | 'blurOut' | 'morph' | 'blurIn';
  backgroundTint: string;
}

export const useMetricTransition = (distanceType: DistanceType) => {
  const [state, setState] = useState<MetricTransitionState>({
    isTransitioning: false,
    phase: 'idle',
    backgroundTint: 'transparent'
  });

  useEffect(() => {
    const transition = async () => {
      setState({ isTransitioning: true, phase: 'blurOut', backgroundTint: state.backgroundTint });
      await wait(200);

      setState({ isTransitioning: true, phase: 'morph', backgroundTint: getBackgroundTint(distanceType) });
      await wait(400);

      setState({ isTransitioning: true, phase: 'blurIn', backgroundTint: getBackgroundTint(distanceType) });
      await wait(200);

      setState({ isTransitioning: false, phase: 'idle', backgroundTint: getBackgroundTint(distanceType) });
    };

    transition();
  }, [distanceType]);

  return state;
};

const getBackgroundTint = (type: DistanceType): string => {
  switch (type) {
    case 'cosine': return 'hsl(var(--accent) / 0.03)';
    case 'euclidean': return 'hsl(var(--secondary) / 0.03)';
    case 'dot': return 'hsl(var(--primary) / 0.03)';
  }
};

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
```

---

#### 2. `useVectorSnap.ts`

**Purpose**: Animated snap to preset positions

```typescript
import { useState, useEffect } from 'react';
import { Vector } from '../types';

interface SnapState {
  isSnapping: boolean;
  snapTarget: "v1" | "v2" | "both" | null;
}

export const useVectorSnap = (
  targetV1: Vector,
  targetV2: Vector,
  onSnapComplete?: () => void
) => {
  const [snapState, setSnapState] = useState<SnapState>({
    isSnapping: false,
    snapTarget: null
  });

  const triggerSnap = (target: "v1" | "v2" | "both") => {
    setSnapState({ isSnapping: true, snapTarget: target });

    // Snap animation duration
    setTimeout(() => {
      setSnapState({ isSnapping: false, snapTarget: null });
      onSnapComplete?.();
    }, 600);
  };

  return {
    ...snapState,
    triggerSnap
  };
};
```

---

#### 3. `useSemanticColor.ts`

**Purpose**: Calculate color based on angle for semantic visualization

```typescript
import { useMemo } from 'react';
import { Vector } from '../types';

export const useSemanticColor = (v1: Vector, v2: Vector) => {
  return useMemo(() => {
    const angle = calculateAngle(v1, v2);

    // 0° (identical) → Teal-blue
    // 90° (orthogonal) → Neutral cyan
    // 180° (opposite) → Magenta

    if (angle <= 30) {
      return 'hsl(180, 100%, 65%)'; // Bright teal
    } else if (angle <= 60) {
      return 'hsl(190, 95%, 55%)'; // Cyan
    } else if (angle <= 120) {
      return 'hsl(200, 80%, 50%)'; // Blue-cyan
    } else if (angle <= 150) {
      return 'hsl(280, 70%, 55%)'; // Purple
    } else {
      return 'hsl(320, 80%, 60%)'; // Magenta
    }
  }, [v1, v2]);
};

const calculateAngle = (v1: Vector, v2: Vector): number => {
  const dot = v1.x * v2.x + v1.y * v2.y;
  const mag1 = Math.sqrt(v1.x * v1.x + v1.y * v1.y);
  const mag2 = Math.sqrt(v2.x * v2.x + v2.y * v2.y);
  const cosAngle = dot / (mag1 * mag2);
  return (Math.acos(cosAngle) * 180) / Math.PI;
};
```

---

## Animations Specification

### 1. Intro Animation Sequence

**Trigger**: Component mount
**Duration**: 2.0s
**Orchestration**: Sequential with overlapping stages

```typescript
// Stage 1: Canvas fade-in (0-0.5s)
const canvasAnimation = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5, ease: "easeOut" }
};

// Stage 2: Vector lines draw (0.3-0.8s)
const vectorLineAnimation = (index: number) => ({
  initial: { pathLength: 0, opacity: 0 },
  animate: { pathLength: 1, opacity: 1 },
  transition: {
    delay: 0.3 + index * 0.2,
    duration: 0.5,
    ease: "easeOut"
  }
});

// Stage 3: Handles appear (0.6-1.2s)
const handleAnimation = (index: number) => ({
  initial: { scale: 0, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  transition: {
    delay: 0.6 + index * 0.3,
    type: "spring",
    stiffness: 200,
    damping: 15
  }
});

// Stage 4: Angle markers fade in (1.0-1.5s)
const angleMarkersAnimation = {
  initial: { opacity: 0 },
  animate: { opacity: 0.15 },
  transition: { delay: 1.0, duration: 0.5 }
};

// Stage 5: Control panel slide in (1.2-1.8s)
const controlPanelAnimation = {
  initial: { x: 50, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  transition: {
    delay: 1.2,
    duration: 0.6,
    ease: [0.4, 0, 0.2, 1]
  }
};
```

---

### 2. Metric Switching Animation

**Trigger**: Metric tab click
**Duration**: 0.8s
**Effect**: Blur out → Morph → Blur in + Background tint

```typescript
const metricTransitionPhases = {
  // Stage 1: Blur out (0-0.2s)
  blurOut: {
    filter: "blur(6px)",
    opacity: 0.6,
    scale: 0.95,
    transition: { duration: 0.2 }
  },

  // Stage 2: Number morph (0.2-0.6s)
  morph: {
    scale: [0.95, 1.1, 1],
    filter: "blur(0px)",
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  },

  // Stage 3: Background tint (0.2-0.6s)
  backgroundShift: (distanceType: DistanceType) => ({
    backgroundColor: getBackgroundTint(distanceType),
    transition: { duration: 0.4 }
  }),

  // Stage 4: Blur in (0.6-0.8s)
  blurIn: {
    opacity: 1,
    transition: { duration: 0.2 }
  }
};

// Euclidean-specific: Draw distance arc
const distanceArcAnimation = {
  initial: { pathLength: 0, opacity: 0 },
  animate: { pathLength: 1, opacity: 0.6 },
  transition: { delay: 0.4, duration: 0.6 }
};
```

---

### 3. Preset Snap Animation

**Trigger**: Preset card click
**Duration**: 0.6s
**Effect**: Pulse + Elastic snap

```typescript
// Pulse effect on both handles
const snapPulseAnimation = {
  initial: { opacity: 0.8, r: 0.3 },
  animate: { opacity: 0, r: 0.8 },
  exit: { opacity: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

// Elastic snap to position
const snapMoveAnimation = (target: Vector) => ({
  x: target.x,
  y: target.y,
  transition: {
    type: "spring",
    stiffness: 180,
    damping: 18,
    mass: 0.8
  }
});

// Trail effect during snap
const trailAnimation = {
  initial: { pathLength: 0, opacity: 0.4 },
  animate: { pathLength: 1, opacity: 0 },
  transition: { duration: 0.5 }
};
```

---

### 4. Handle Drag Interactions

**Trigger**: Mouse down → move → up
**Effect**: Elastic grab, smooth drag, settle animation

```typescript
// Grab state
const handleGrabAnimation = {
  scale: 1.3,
  r: 0.4,
  cursor: 'grabbing',
  transition: {
    type: "spring",
    stiffness: 300,
    damping: 20
  }
};

// Drag state (continuous)
const handleDragAnimation = {
  x: dragPosition.x,
  y: dragPosition.y,
  transition: {
    type: "spring",
    stiffness: 400,
    damping: 30,
    mass: 0.5
  }
};

// Release settle
const handleReleaseAnimation = {
  scale: 1,
  r: 0.35,
  cursor: 'grab',
  transition: {
    type: "spring",
    stiffness: 200,
    damping: 15
  }
};

// Hover state
const handleHoverAnimation = {
  scale: 1.3,
  r: 0.42,
  transition: { duration: 0.2 }
};
```

---

### 5. Distance Number Morph

**Trigger**: Value change (drag or metric switch)
**Duration**: 0.3s
**Effect**: Scale pulse + Number change

```typescript
const numberMorphAnimation = {
  // Scale pulse
  scale: [1, 1.15, 1],

  // Color flash (for significant changes)
  color: [
    'hsl(var(--primary))',
    'hsl(var(--accent))',
    'hsl(var(--primary))'
  ],

  transition: {
    duration: 0.3,
    ease: "easeOut"
  }
};

// Number counter animation (odometer effect)
const counterAnimation = {
  // Implement with separate digit rolling if needed
  transition: {
    duration: 0.4,
    ease: [0.4, 0, 0.2, 1]
  }
};
```

---

### 6. Semantic Color Transition

**Trigger**: Continuous (as vectors move)
**Duration**: 0.4s smooth interpolation
**Effect**: Color shifts based on angle

```typescript
const semanticColorAnimation = (angle: number) => {
  const color = getSemanticColorFromAngle(angle);

  return {
    stroke: color,
    fill: color,
    transition: {
      duration: 0.4,
      ease: "easeInOut"
    }
  };
};

const getSemanticColorFromAngle = (angle: number): string => {
  // 0-30°: Teal (identical)
  if (angle <= 30) return 'hsl(180, 100%, 65%)';
  // 30-60°: Cyan (very similar)
  if (angle <= 60) return 'hsl(190, 95%, 55%)';
  // 60-90°: Blue-cyan (similar)
  if (angle <= 90) return 'hsl(200, 80%, 50%)';
  // 90-120°: Neutral blue (somewhat related)
  if (angle <= 120) return 'hsl(220, 70%, 50%)';
  // 120-150°: Purple (different)
  if (angle <= 150) return 'hsl(280, 70%, 55%)';
  // 150-180°: Magenta (opposite)
  return 'hsl(320, 80%, 60%)';
};
```

---

## CSS Design System Extensions

### New Color Variables

Add to `src/index.css`:

```css
:root {
  /* Existing colors... */

  /* ===== Distance Playground Colors ===== */
  --vector-a: 190 95% 55%;          /* Cyan for Vector A */
  --vector-b: 260 60% 60%;          /* Purple for Vector B */

  /* ===== Semantic Angle Colors ===== */
  --angle-identical: 180 100% 65%;   /* Teal (0-30°) */
  --angle-similar: 190 95% 55%;      /* Cyan (30-60°) */
  --angle-related: 200 80% 50%;      /* Blue-cyan (60-90°) */
  --angle-neutral: 220 70% 50%;      /* Blue (90-120°) */
  --angle-different: 280 70% 55%;    /* Purple (120-150°) */
  --angle-opposite: 320 80% 60%;     /* Magenta (150-180°) */

  /* ===== Metric-Specific Background Tints ===== */
  --metric-cosine-tint: 180 100% 65% / 0.03;
  --metric-euclidean-tint: 260 60% 60% / 0.03;
  --metric-dot-tint: 190 95% 55% / 0.03;

  /* ===== Angle Marker Colors ===== */
  --marker-ref-line: 180 50% 50% / 0.15;
}
```

---

### New Utility Classes

Add to `src/index.css`:

```css
@layer utilities {
  /* ===== Preset Cards ===== */
  .preset-card {
    @apply p-6 rounded-xl;
    @apply border border-glass-border/20;
    @apply bg-glass-bg/30 backdrop-blur-lg;
    @apply transition-all duration-300;
    @apply cursor-pointer;
    @apply text-left;
  }

  .preset-card:hover {
    @apply border-primary/40 bg-glass-bg/50;
    @apply shadow-lg shadow-primary/10;
  }

  .preset-card-active {
    @apply border-accent bg-accent/10;
    @apply shadow-xl shadow-accent/20;
  }

  /* ===== Preset Diagram Container ===== */
  .preset-diagram {
    @apply w-16 h-16 mx-auto;
    @apply bg-background/50 rounded-lg;
    @apply flex items-center justify-center;
    @apply border border-glass-border/10;
  }

  /* ===== Vector Identity Badge ===== */
  .vector-badge {
    @apply inline-flex items-center gap-2;
    @apply px-3 py-1.5 rounded-full;
    @apply bg-glass-bg/50 backdrop-blur-md;
    @apply border border-glass-border/30;
    @apply text-sm font-semibold;
  }

  /* ===== Cosine Range Legend ===== */
  .cosine-legend {
    @apply p-4 rounded-lg;
    @apply bg-glass-bg/30 backdrop-blur-md;
    @apply border border-glass-border/20;
  }

  .cosine-range-row {
    @apply px-2 py-1.5 rounded;
    @apply transition-all duration-200;
  }

  .cosine-range-row:hover {
    @apply bg-glass-bg/40;
  }

  .cosine-range-row.active {
    @apply bg-accent/10 border-l-2 border-accent;
  }

  /* ===== Metric Tab Enhanced ===== */
  .metric-tab {
    @apply flex-1 py-3 px-4 rounded-lg;
    @apply transition-all duration-300;
    @apply relative;
  }

  .metric-tab-inactive {
    @apply bg-muted/20 text-muted-foreground;
  }

  .metric-tab-active {
    @apply bg-primary text-primary-foreground;
    @apply shadow-lg shadow-primary/20;
  }

  .metric-tab-description {
    @apply text-xs text-muted-foreground mt-1;
    @apply opacity-70;
  }

  /* ===== Glow Ring (for handles and badges) ===== */
  .glow-ring {
    box-shadow: 0 0 8px currentColor, 0 0 16px currentColor;
  }

  /* ===== Canvas Enhanced ===== */
  .playground-canvas {
    @apply bg-background/30 rounded-2xl;
    @apply border border-glass-border/20;
    @apply shadow-inner shadow-background/50;
    box-shadow:
      inset 0 2px 8px rgba(0, 0, 0, 0.3),
      0 4px 16px rgba(0, 0, 0, 0.2);
  }

  /* ===== Large Distance Number ===== */
  .distance-number-large {
    @apply text-7xl font-bold;
    @apply bg-gradient-to-br from-primary via-accent to-secondary;
    @apply bg-clip-text text-transparent;
    letter-spacing: -0.02em;
  }

  /* ===== Metric Transition States ===== */
  .metric-blur-out {
    filter: blur(6px);
    opacity: 0.6;
    transform: scale(0.95);
  }

  .metric-blur-in {
    filter: blur(0px);
    opacity: 1;
    transform: scale(1);
  }

  /* ===== Snap Pulse Effect ===== */
  @keyframes snap-pulse {
    0% {
      opacity: 0.8;
      transform: scale(1);
    }
    100% {
      opacity: 0;
      transform: scale(2.5);
    }
  }

  .snap-pulse {
    animation: snap-pulse 0.6s ease-out;
  }
}
```

---

## Implementation Priority

### Phase 1: Foundation & Visibility (Must-Have for MVP)
**Estimated Time**: 3-4 hours
**ROI**: Highest impact on readability

1. **Enlarge Vectors & Handles** ⭐⭐⭐
   - Increase vector line stroke to 4px
   - Increase handle radius to 40px equivalent
   - Add larger glow halos (+30%)
   - **File**: `DistancePlayground.tsx`

2. **Typography Enlargement** ⭐⭐⭐
   - Scale title to 48-52px
   - Scale distance number to 64px
   - Increase all body text to 18px
   - **File**: `DistancePlayground.tsx`

3. **Enlarge Canvas** ⭐⭐⭐
   - Increase height from 400px to 500px
   - Enhance glassmorphic border and shadows
   - Improve spacing
   - **File**: `DistancePlayground.tsx`

4. **Add Vector Identity Badges** ⭐⭐
   - Create `VectorIdentityBadges` component
   - Show "Vector A vs Vector B" header
   - Color-code with cyan and purple
   - **File**: `components/distance/VectorIdentityBadges.tsx`

5. **CSS Variables Setup** ⭐⭐⭐
   - Add semantic angle colors
   - Add metric tint colors
   - Add utility classes
   - **File**: `index.css`

---

### Phase 2: Educational Enhancements (High Impact)
**Estimated Time**: 3-4 hours
**ROI**: Learning clarity

6. **Add Radial Angle Markers** ⭐⭐⭐
   - Create `AngleMarkers` component
   - Draw reference lines at 0°, 45°, 90°, 135°, 180°
   - Subtle glassmorphic styling
   - **File**: `components/distance/AngleMarkers.tsx`

7. **Add Cosine Range Legend** ⭐⭐⭐
   - Create `CosineRangeLegend` component
   - Show 4-tier semantic table
   - Highlight current range
   - **File**: `components/distance/CosineRangeLegend.tsx`

8. **Add Micro-Descriptions to Metrics** ⭐⭐
   - Add educational hints under each metric tab
   - Style with smaller text
   - **File**: `DistancePlayground.tsx`

9. **Create Visual Preset Cards** ⭐⭐⭐
   - Redesign preset buttons as cards
   - Add `PresetCard` and `PresetDiagram` components
   - Include vector diagrams
   - **File**: `components/distance/PresetCard.tsx`

---

### Phase 3: Premium Polish & Interactions (Nice-to-Have)
**Estimated Time**: 3-4 hours
**ROI**: Delight factor

10. **Metric Switching Animations** ⭐⭐
    - Create `useMetricTransition` hook
    - Blur out → morph → blur in sequence
    - Background tint shifts
    - **File**: `hooks/useMetricTransition.ts`

11. **Preset Snap Animations** ⭐⭐
    - Create `useVectorSnap` hook
    - Pulsing halo on snap
    - Elastic spring physics
    - **File**: `hooks/useVectorSnap.ts`

12. **Semantic Color Transitions** ⭐⭐
    - Create `useSemanticColor` hook
    - Dynamic color based on angle
    - Teal → cyan → blue → purple → magenta gradient
    - **File**: `hooks/useSemanticColor.ts`

13. **Distance Arc for Euclidean** ⭐
    - Create `DistanceArc` component
    - Show visual line between vectors
    - Only visible in Euclidean mode
    - **File**: `components/distance/DistanceArc.tsx`

14. **Component Refactoring** ⭐
    - Extract `VectorHandle` component
    - Improve code organization
    - Add TypeScript interfaces
    - **Files**: Multiple component files

---

## File Structure After Implementation

```
pythia-labs/
├── src/
│   ├── components/
│   │   ├── DistancePlayground.tsx           (Main container - refactored)
│   │   │
│   │   ├── distance/
│   │   │   ├── PlaygroundCanvas.tsx         (NEW - SVG wrapper)
│   │   │   ├── PlaygroundHeader.tsx         (NEW - Title + badges)
│   │   │   ├── ControlPanel.tsx             (NEW - Right panel)
│   │   │   ├── VectorIdentityBadges.tsx     (NEW - A vs B labels)
│   │   │   ├── AngleMarkers.tsx             (NEW - Radial grid)
│   │   │   ├── VectorHandle.tsx             (NEW - Enhanced draggable)
│   │   │   ├── DistanceArc.tsx              (NEW - Euclidean visual)
│   │   │   ├── PresetCard.tsx               (NEW - Visual preset cards)
│   │   │   ├── PresetDiagram.tsx            (NEW - Vector diagrams)
│   │   │   ├── CosineRangeLegend.tsx        (NEW - Semantic table)
│   │   │   ├── MetricSelector.tsx           (NEW - Enhanced tabs)
│   │   │   └── types.ts                     (NEW - TypeScript types)
│   │   │
│   │   └── ...other components
│   │
│   ├── hooks/
│   │   ├── useMetricTransition.ts           (NEW - Smooth metric change)
│   │   ├── useVectorSnap.ts                 (NEW - Preset snap animation)
│   │   ├── useSemanticColor.ts              (NEW - Angle-based color)
│   │   └── ...existing hooks
│   │
│   └── index.css                            (UPDATED - New variables)
│
└── DISTANCE_PLAYGROUND_UPGRADE_PLAN.md      (This document)
```

---

## Success Metrics

### Educational Clarity
✅ Users understand angle = semantic relationship
✅ Visual angle markers show 0°, 90°, 180° meanings
✅ Cosine range legend translates numbers to words
✅ Metric descriptions explain use cases

### Visibility & Readability
✅ Vectors 40-50% larger and immediately visible
✅ Handles easy to grab (40px targets)
✅ Distance number prominent (64px)
✅ Spacing improved (breathing room)

### Premium Polish
✅ All animations smooth at 60fps
✅ Metric transitions feel magical
✅ Preset snaps are delightful
✅ Semantic colors enhance understanding

### Interactivity
✅ Drag interactions feel elastic and responsive
✅ Preset cards are visual and clickable
✅ Hover states provide clear feedback
✅ No lag or janky animations

### Accessibility
✅ Large touch targets (40px handles)
✅ High contrast text (4.5:1 ratio)
✅ ARIA labels on interactive elements
✅ Keyboard navigation works

---

## Implementation Workflow

### Phase 1 (Days 1-2)

1. **Setup CSS Variables** (30 min)
   - Add semantic angle colors
   - Add metric tint colors
   - Add utility classes

2. **Enlarge Visual Elements** (1.5 hours)
   - Increase vector stroke width
   - Increase handle size
   - Enlarge glow halos
   - Test responsiveness

3. **Typography Upgrade** (1 hour)
   - Scale all text elements
   - Apply gradient to distance number
   - Adjust spacing

4. **Canvas Enlargement** (45 min)
   - Increase height to 500px
   - Enhance glassmorphic styling
   - Test proportions

5. **Add Vector Badges** (1 hour)
   - Create `VectorIdentityBadges` component
   - Style with glass effect
   - Position above canvas

---

### Phase 2 (Days 3-4)

6. **Create Angle Markers** (2 hours)
   - Build `AngleMarkers` component
   - Calculate reference lines
   - Apply subtle styling
   - Animate entrance

7. **Build Cosine Legend** (1.5 hours)
   - Create `CosineRangeLegend` component
   - Style semantic table
   - Highlight active range
   - Add to control panel

8. **Add Metric Descriptions** (30 min)
   - Add text under each tab
   - Style consistently
   - Test readability

9. **Redesign Preset Cards** (2 hours)
   - Create `PresetCard` component
   - Build `PresetDiagram` with SVG
   - Style as visual cards
   - Test all 4 presets

---

### Phase 3 (Days 5-6)

10. **Metric Transition Animations** (2 hours)
    - Build `useMetricTransition` hook
    - Implement blur effects
    - Add background tints
    - Fine-tune timing

11. **Preset Snap Animations** (1.5 hours)
    - Build `useVectorSnap` hook
    - Add pulse effect
    - Elastic spring physics
    - Test all presets

12. **Semantic Color System** (1.5 hours)
    - Build `useSemanticColor` hook
    - Calculate angle-based colors
    - Apply smooth transitions
    - Test color interpolation

13. **Distance Arc Visual** (1 hour)
    - Create `DistanceArc` component
    - Show only in Euclidean mode
    - Animate draw-in
    - Position label

14. **Component Refactoring** (1 hour)
    - Extract `VectorHandle`
    - Organize file structure
    - Add TypeScript interfaces
    - Documentation

15. **Final Testing** (1 hour)
    - Cross-browser testing
    - Performance profiling
    - Accessibility audit
    - Bug fixes

---

## Testing Strategy

### Visual Testing
- [ ] Vectors 40-50% larger and clearly visible
- [ ] Typography readable at all screen sizes
- [ ] Angle markers subtle but helpful
- [ ] Glassmorphic effects render correctly
- [ ] Colors accessible (WCAG AA)

### Interaction Testing
- [ ] Handles easy to grab (40px targets)
- [ ] Drag smooth with spring physics
- [ ] Metric switching animated smoothly
- [ ] Preset snaps feel elastic
- [ ] Hover states responsive

### Performance Testing
- [ ] 60fps during drag
- [ ] Smooth metric transitions
- [ ] No layout shifts
- [ ] Fast initial render

### Educational Testing
- [ ] Angle markers clarify meanings
- [ ] Cosine legend helpful
- [ ] Preset diagrams intuitive
- [ ] Metric descriptions clear

---

## Next Steps

1. **Review this plan** and provide feedback
2. **Approve phases** to implement (all or subset)
3. **Begin Phase 1** (visibility and enlargement)
4. **Iterate with feedback** after each phase
5. **Deploy and test** with real users

---

## Appendix

### Angle Reference Table

| Angle | Cosine Distance | Semantic Meaning | Color |
|-------|----------------|------------------|-------|
| 0° | 0.000 | Identical | Teal |
| 30° | 0.134 | Almost identical | Cyan |
| 45° | 0.293 | Very similar | Cyan |
| 60° | 0.500 | Similar | Blue-cyan |
| 90° | 1.000 | Orthogonal | Blue |
| 120° | 1.500 | Somewhat related | Purple |
| 150° | 1.866 | Different | Purple |
| 180° | 2.000 | Opposite | Magenta |

### Typography Scale

| Element | Current | Target | Scale Factor |
|---------|---------|--------|--------------|
| Title | 36px | 48-52px | 1.4x |
| Subtitle | 18px | 20-23px | 1.25x |
| Metric tabs | 16px | 18-20px | 1.2x |
| Distance number | 48px | **64px** | 1.33x |
| Description | 14px | 18px | 1.3x |
| Preset labels | 14px | 16-18px | 1.2x |

### Animation Timing Reference

| Animation | Duration | Delay | Easing |
|-----------|----------|-------|--------|
| Canvas fade-in | 0.5s | 0s | easeOut |
| Vector lines | 0.5s | 0.3s + idx*0.2 | easeOut |
| Handles appear | 0.5s | 0.6s + idx*0.3 | spring |
| Angle markers | 0.5s | 1.0s | linear |
| Control panel | 0.6s | 1.2s | cubic-bezier |
| Metric transition | 0.8s | 0s | multi-stage |
| Preset snap | 0.6s | 0s | spring |
| Handle drag | continuous | 0s | spring |
| Number morph | 0.3s | 0s | easeOut |

---

**Plan Version**: 1.0
**Last Updated**: 2025-11-16
**Status**: Ready for Implementation ✅
**Estimated Total Time**: 9-12 hours (all phases)

---

## Questions or Feedback?

This plan matches the premium quality of your Embedding Map upgrade. Ready to bring the Distance Playground to the same exceptional level!

**Ready to start?** Let's make it beautiful! 🚀
