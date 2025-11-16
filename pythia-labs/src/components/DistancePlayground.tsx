import { useState } from "react";
import { motion } from "framer-motion";
import { AngleMarkers } from "./distance/AngleMarkers";
import { CosineRangeLegend } from "./distance/CosineRangeLegend";
import { PresetCard } from "./distance/PresetCard";
import { DistanceArc } from "./distance/DistanceArc";
import { VectorHandle } from "./distance/VectorHandle";
import { useMetricTransition } from "@/hooks/useMetricTransition";
import { useVectorSnap } from "@/hooks/useVectorSnap";
import { useSemanticColor } from "@/hooks/useSemanticColor";

type DistanceType = "cosine" | "euclidean" | "dot";

interface Vector {
  x: number;
  y: number;
}

const calculateCosine = (v1: Vector, v2: Vector) => {
  const dot = v1.x * v2.x + v1.y * v2.y;
  const mag1 = Math.sqrt(v1.x * v1.x + v1.y * v1.y);
  const mag2 = Math.sqrt(v2.x * v2.x + v2.y * v2.y);
  const similarity = dot / (mag1 * mag2);
  return (1 - similarity).toFixed(3);
};

const calculateEuclidean = (v1: Vector, v2: Vector) => {
  return Math.sqrt(Math.pow(v2.x - v1.x, 2) + Math.pow(v2.y - v1.y, 2)).toFixed(3);
};

const calculateDotProduct = (v1: Vector, v2: Vector) => {
  return (v1.x * v2.x + v1.y * v2.y).toFixed(3);
};

const presets = [
  {
    name: "Highly Similar",
    description: "~15° angle",
    diagram: "similar" as const,
    v1: { x: 3, y: 4 },
    v2: { x: 3.5, y: 4.2 }
  },
  {
    name: "Opposite",
    description: "~160° angle",
    diagram: "opposite" as const,
    v1: { x: 1, y: 4 },
    v2: { x: 4, y: 1 }
  },
  {
    name: "Identical",
    description: "0° angle",
    diagram: "identical" as const,
    v1: { x: 3, y: 3 },
    v2: { x: 3.1, y: 3.1 }
  },
  {
    name: "Random",
    description: "~75° angle",
    diagram: "random" as const,
    v1: { x: 2, y: 3.5 },
    v2: { x: 4, y: 2 }
  },
];

export const DistancePlayground = () => {
  const [distanceType, setDistanceType] = useState<DistanceType>("cosine");
  const [vector1, setVector1] = useState<Vector>({ x: 3, y: 4 });
  const [vector2, setVector2] = useState<Vector>({ x: 4, y: 3 });
  const [dragging, setDragging] = useState<"v1" | "v2" | null>(null);
  const [hovering, setHovering] = useState<"v1" | "v2" | null>(null);

  // Phase 3: Premium Polish & Interactions
  const metricTransition = useMetricTransition(distanceType);
  const { isSnapping, snapTarget, triggerSnap } = useVectorSnap();
  const semanticColor = useSemanticColor(vector1, vector2);

  const getValue = () => {
    switch (distanceType) {
      case "cosine": return calculateCosine(vector1, vector2);
      case "euclidean": return calculateEuclidean(vector1, vector2);
      case "dot": return calculateDotProduct(vector1, vector2);
    }
  };

  const getExplanation = () => {
    switch (distanceType) {
      case "cosine": return "Cosine measures angle between vectors - perfect for semantic similarity.";
      case "euclidean": return "Euclidean measures straight-line distance - can be misleading for CVs.";
      case "dot": return "Dot product combines angle and magnitude - used in some ranking systems.";
    }
  };

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!dragging) return;
    const svg = e.currentTarget;
    const rect = svg.getBoundingClientRect();
    const x = Math.max(0.5, Math.min(9.5, ((e.clientX - rect.left) / rect.width) * 10));
    const y = Math.max(0.5, Math.min(9.5, (1 - (e.clientY - rect.top) / rect.height) * 10));
    if (dragging === "v1") setVector1({ x, y });
    else setVector2({ x, y });
  };

  return (
    <section className="relative py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div className="glass-card p-8 mb-8 text-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent" style={{ fontSize: '52px' }}>Distance Playground</h2>
          <p className="text-xl text-muted-foreground" style={{ fontSize: '22px' }}>Drag vectors to explore distance metrics</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div className="glass-card p-8" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <div className="mb-4 flex items-center justify-center gap-3">
              <span className="text-lg font-semibold text-muted-foreground">Vector</span>
              <span className="px-3 py-1 rounded-full bg-primary/20 text-primary font-bold border border-primary/30">A</span>
              <span className="text-lg font-semibold text-muted-foreground">vs</span>
              <span className="px-3 py-1 rounded-full bg-accent/20 text-accent font-bold border border-accent/30">B</span>
            </div>
            <svg width="100%" height="500" viewBox="0 0 10 10" className="bg-background/30 rounded-2xl shadow-inner" onMouseMove={handleMouseMove} onMouseUp={() => setDragging(null)} onMouseLeave={() => setDragging(null)}>
              <defs>
                <filter id="glow-cyan" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="0.15" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
                <filter id="glow-purple" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="0.15" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>

              {/* Angle Markers - Radial reference grid */}
              <AngleMarkers />

              {/* Distance Arc - Only visible in Euclidean mode */}
              <DistanceArc
                v1={vector1}
                v2={vector2}
                visible={distanceType === "euclidean"}
              />

              {/* Vector A Line */}
              <motion.line
                x1="0" y1="10"
                x2={vector1.x} y2={10 - vector1.y}
                stroke="hsl(var(--primary))"
                strokeWidth="0.08"
                filter="url(#glow-cyan)"
                animate={{ x2: vector1.x, y2: 10 - vector1.y }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              />

              {/* Vector A Handle */}
              <VectorHandle
                vector={vector1}
                color="hsl(var(--primary))"
                label="A"
                isDragging={dragging === "v1"}
                isHovering={hovering === "v1"}
                onDragStart={() => setDragging("v1")}
                onDragEnd={() => setDragging(null)}
                onMouseEnter={() => setHovering("v1")}
                onMouseLeave={() => setHovering(null)}
                isSnapping={isSnapping && (snapTarget === "v1" || snapTarget === "both")}
                filterId="glow-cyan"
              />

              {/* Vector B Line */}
              <motion.line
                x1="0" y1="10"
                x2={vector2.x} y2={10 - vector2.y}
                stroke="hsl(var(--accent))"
                strokeWidth="0.08"
                filter="url(#glow-purple)"
                animate={{ x2: vector2.x, y2: 10 - vector2.y }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              />

              {/* Vector B Handle */}
              <VectorHandle
                vector={vector2}
                color="hsl(var(--accent))"
                label="B"
                isDragging={dragging === "v2"}
                isHovering={hovering === "v2"}
                onDragStart={() => setDragging("v2")}
                onDragEnd={() => setDragging(null)}
                onMouseEnter={() => setHovering("v2")}
                onMouseLeave={() => setHovering(null)}
                isSnapping={isSnapping && (snapTarget === "v2" || snapTarget === "both")}
                filterId="glow-purple"
              />
            </svg>
          </motion.div>

          <motion.div className="space-y-6" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <div className="glass-card p-6">
              <div className="flex gap-3">
                {(["cosine", "euclidean", "dot"] as DistanceType[]).map((type) => {
                  const descriptions = {
                    cosine: "Recommended for semantic meaning",
                    euclidean: "Sensitive to magnitude",
                    dot: "Dense inner-product scoring"
                  };
                  return (
                    <motion.button
                      key={type}
                      onClick={() => setDistanceType(type)}
                      className={`flex-1 py-2 px-4 rounded-lg text-lg font-semibold flex flex-col items-center ${
                        distanceType === type ? "bg-primary text-primary-foreground" : "bg-muted/30"
                      }`}
                      style={{ fontSize: '19px' }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <span>{type.charAt(0).toUpperCase() + type.slice(1)}</span>
                      <span className="metric-tab-description text-[10px] mt-1 font-normal">
                        {descriptions[type]}
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            </div>
            <div className="glass-card p-6" style={{ backgroundColor: metricTransition.backgroundTint }}>
              <motion.div
                className="font-bold text-primary mb-4"
                style={{
                  fontSize: '64px',
                  filter: metricTransition.phase === 'blurOut' ? 'blur(6px)' : 'blur(0px)',
                  opacity: metricTransition.phase === 'blurOut' ? 0.6 : 1
                }}
                key={getValue()}
                initial={{ scale: 0.8 }}
                animate={{
                  scale: metricTransition.phase === 'morph' ? [0.95, 1.1, 1] : 1
                }}
                transition={{
                  duration: metricTransition.phase === 'morph' ? 0.4 : 0.3,
                  ease: "easeOut"
                }}
              >
                {getValue()}
              </motion.div>
              <p className="text-lg text-muted-foreground" style={{ fontSize: '18px' }}>{getExplanation()}</p>

              {/* Cosine Range Legend - only show for cosine distance */}
              {distanceType === "cosine" && (
                <div className="mt-4">
                  <CosineRangeLegend currentValue={parseFloat(getValue())} />
                </div>
              )}
            </div>
            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold mb-4 text-muted-foreground">Presets</h3>
              <div className="grid grid-cols-2 gap-3">
                {presets.map((preset) => (
                  <PresetCard
                    key={preset.name}
                    name={preset.name}
                    description={preset.description}
                    diagram={preset.diagram}
                    onSelect={() => {
                      // Trigger snap animation
                      triggerSnap("both");
                      // Set vectors with slight delay for snap effect
                      setTimeout(() => {
                        setVector1(preset.v1);
                        setVector2(preset.v2);
                      }, 100);
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
