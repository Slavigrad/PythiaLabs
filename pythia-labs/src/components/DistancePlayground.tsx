import { useState } from "react";
import { motion } from "framer-motion";

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
  { name: "Highly Similar", v1: { x: 3, y: 4 }, v2: { x: 3.5, y: 4.2 } },
  { name: "Opposite", v1: { x: 1, y: 4 }, v2: { x: 4, y: 1 } },
  { name: "Identical", v1: { x: 3, y: 3 }, v2: { x: 3.1, y: 3.1 } },
  { name: "Random", v1: { x: 2, y: 3.5 }, v2: { x: 4, y: 2 } },
];

export const DistancePlayground = () => {
  const [distanceType, setDistanceType] = useState<DistanceType>("cosine");
  const [vector1, setVector1] = useState<Vector>({ x: 3, y: 4 });
  const [vector2, setVector2] = useState<Vector>({ x: 4, y: 3 });
  const [dragging, setDragging] = useState<"v1" | "v2" | null>(null);

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
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">Distance Playground</h2>
          <p className="text-lg text-muted-foreground">Drag vectors to explore distance metrics</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div className="glass-card p-8" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <svg width="100%" height="400" viewBox="0 0 10 10" className="bg-background/30 rounded-lg" onMouseMove={handleMouseMove} onMouseUp={() => setDragging(null)} onMouseLeave={() => setDragging(null)}>
              <motion.line x1="0" y1="10" x2={vector1.x} y2={10 - vector1.y} stroke="hsl(var(--primary))" strokeWidth="0.08" animate={{ x2: vector1.x, y2: 10 - vector1.y }} transition={{ type: "spring" }} />
              <motion.circle cx={vector1.x} cy={10 - vector1.y} r="0.25" fill="hsl(var(--primary))" className="cursor-grab" onMouseDown={() => setDragging("v1")} whileHover={{ scale: 1.5 }} />
              <motion.line x1="0" y1="10" x2={vector2.x} y2={10 - vector2.y} stroke="hsl(var(--accent))" strokeWidth="0.08" animate={{ x2: vector2.x, y2: 10 - vector2.y }} transition={{ type: "spring" }} />
              <motion.circle cx={vector2.x} cy={10 - vector2.y} r="0.25" fill="hsl(var(--accent))" className="cursor-grab" onMouseDown={() => setDragging("v2")} whileHover={{ scale: 1.5 }} />
            </svg>
          </motion.div>

          <motion.div className="space-y-6" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <div className="glass-card p-6">
              <div className="flex gap-3">
                {(["cosine", "euclidean", "dot"] as DistanceType[]).map((type) => (
                  <motion.button key={type} onClick={() => setDistanceType(type)} className={`flex-1 py-2 px-4 rounded-lg ${distanceType === type ? "bg-primary text-primary-foreground" : "bg-muted/30"}`} whileHover={{ scale: 1.05 }}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </motion.button>
                ))}
              </div>
            </div>
            <div className="glass-card p-6">
              <motion.div className="text-5xl font-bold text-primary mb-4" key={getValue()} initial={{ scale: 0.8 }} animate={{ scale: 1 }}>{getValue()}</motion.div>
              <p className="text-sm text-muted-foreground">{getExplanation()}</p>
            </div>
            <div className="glass-card p-6">
              <div className="grid grid-cols-2 gap-2">
                {presets.map((preset) => (
                  <motion.button key={preset.name} onClick={() => { setVector1(preset.v1); setVector2(preset.v2); }} className="py-2 px-3 text-sm rounded-lg bg-muted/30 hover:bg-primary/20" whileHover={{ scale: 1.05 }}>{preset.name}</motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
