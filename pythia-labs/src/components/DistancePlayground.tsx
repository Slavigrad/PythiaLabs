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

interface Candidate {
  name: string;
  role: string;
  skills: string[];
  experience: string;
  vector: Vector;
}

// Real IT talent candidates with their skill vectors
const candidates: Candidate[] = [
  {
    name: "Julia R.",
    role: "Senior Java Developer",
    skills: ["Java", "Spring Boot", "Microservices", "AWS"],
    experience: "8 years in enterprise backend systems",
    vector: { x: 3, y: 4 }
  },
  {
    name: "Emma K.",
    role: "Senior DevOps Engineer",
    skills: ["Kubernetes", "Docker", "Jenkins", "AWS", "Terraform"],
    experience: "6 years in infrastructure automation",
    vector: { x: 3.5, y: 4.2 }
  },
  {
    name: "Marco T.",
    role: "React Frontend Developer",
    skills: ["React", "TypeScript", "Next.js", "CSS"],
    experience: "4 years in modern frontend",
    vector: { x: 1, y: 4 }
  },
  {
    name: "Sara V.",
    role: "Full-Stack Developer",
    skills: ["Node.js", "React", "MongoDB", "AWS"],
    experience: "5 years in startup environments",
    vector: { x: 2, y: 3.5 }
  },
  {
    name: "Thomas W.",
    role: "Machine Learning Engineer",
    skills: ["Python", "TensorFlow", "PyTorch", "MLOps"],
    experience: "7 years in AI/ML systems",
    vector: { x: 4, y: 1 }
  },
  {
    name: "Ana S.",
    role: "Python Backend Developer",
    skills: ["Python", "Django", "PostgreSQL", "Redis"],
    experience: "5 years in data-heavy applications",
    vector: { x: 3.8, y: 1.2 }
  }
];

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

interface Preset {
  name: string;
  description: string;
  diagram: "similar" | "opposite" | "identical" | "random";
  candidate1: Candidate;
  candidate2: Candidate;
  hrExplanation: string;
}

const presets: Preset[] = [
  {
    name: "Very Similar Profiles",
    description: "Julia R. vs Emma K.",
    diagram: "similar" as const,
    candidate1: candidates[0], // Julia R. - Java Developer
    candidate2: candidates[1], // Emma K. - DevOps Engineer
    hrExplanation: "Both are senior backend/infrastructure engineers with cloud experience (AWS). Their embeddings are very close because they share similar technical depth and enterprise skillsets. Small cosine distance (~0.03) means high semantic similarity - perfect for roles requiring backend expertise."
  },
  {
    name: "Opposite Skillsets",
    description: "Marco T. vs Thomas W.",
    diagram: "opposite" as const,
    candidate1: candidates[2], // Marco T. - React Frontend
    candidate2: candidates[4], // Thomas W. - ML Engineer
    hrExplanation: "A frontend React developer vs a Machine Learning engineer - completely different career paths. Large cosine distance (~0.85) reflects minimal skill overlap. This shows how embeddings capture career specialization - you wouldn't recommend Marco for an ML role, and vice versa."
  },
  {
    name: "Python Specialists",
    description: "Thomas W. vs Ana S.",
    diagram: "identical" as const,
    candidate1: candidates[4], // Thomas W. - ML Engineer
    candidate2: candidates[5], // Ana S. - Python Backend
    hrExplanation: "Both are Python specialists but with different applications (ML vs web backend). Very small distance (~0.15) shows they're semantically close due to shared Python expertise, even though their domains differ. Great for 'Python developer' searches where either could be a strong match."
  },
  {
    name: "Full-Stack Hybrid",
    description: "Sara V. vs Marco T.",
    diagram: "random" as const,
    candidate1: candidates[3], // Sara V. - Full-Stack
    candidate2: candidates[2], // Marco T. - React Frontend
    hrExplanation: "A full-stack developer compared to a frontend specialist. Medium distance (~0.35) reflects partial overlap - Sara has React skills but also backend experience. This helps identify 'close enough' matches when you need flexibility in hiring."
  },
];

// Explanation Card Component for HR context
const CandidateComparisonCard = ({
  candidate1,
  candidate2,
  distance,
  distanceType,
  hrExplanation
}: {
  candidate1: Candidate;
  candidate2: Candidate;
  distance: string;
  distanceType: DistanceType;
  hrExplanation?: string;
}) => {
  const getDistanceInterpretation = () => {
    if (distanceType !== "cosine") return null;
    const dist = parseFloat(distance);
    if (dist < 0.2) return "Very similar skillsets - strong semantic match";
    if (dist < 0.4) return "Moderately similar - some overlap in expertise";
    if (dist < 0.7) return "Different but related - might share some skills";
    return "Very different career paths - minimal overlap";
  };

  return (
    <div className="glass-card p-6 mb-6">
      <h4 className="text-lg font-semibold mb-4 text-accent">Comparing Two Candidates</h4>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-primary/10 p-4 rounded-lg border border-primary/30">
          <div className="font-bold text-primary mb-2">{candidate1.name}</div>
          <div className="text-sm text-muted-foreground mb-2">{candidate1.role}</div>
          <div className="text-xs text-muted-foreground">
            {candidate1.skills.slice(0, 3).join(", ")}
          </div>
        </div>

        <div className="bg-accent/10 p-4 rounded-lg border border-accent/30">
          <div className="font-bold text-accent mb-2">{candidate2.name}</div>
          <div className="text-sm text-muted-foreground mb-2">{candidate2.role}</div>
          <div className="text-xs text-muted-foreground">
            {candidate2.skills.slice(0, 3).join(", ")}
          </div>
        </div>
      </div>

      {distanceType === "cosine" && (
        <div className="bg-background/50 p-4 rounded-lg border border-glass-border/30">
          <div className="text-sm text-muted-foreground mb-2">
            <span className="font-semibold text-foreground">Semantic Distance:</span> {distance}
          </div>
          <div className="text-sm text-accent font-medium mb-3">
            {getDistanceInterpretation()}
          </div>
          {hrExplanation && (
            <div className="text-sm text-muted-foreground leading-relaxed pt-3 border-t border-glass-border/20">
              {hrExplanation}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export const DistancePlayground = () => {
  const [distanceType, setDistanceType] = useState<DistanceType>("cosine");
  const [vector1, setVector1] = useState<Vector>(candidates[0].vector);
  const [vector2, setVector2] = useState<Vector>(candidates[1].vector);
  const [candidate1, setCandidate1] = useState<Candidate>(candidates[0]);
  const [candidate2, setCandidate2] = useState<Candidate>(candidates[1]);
  const [selectedPreset, setSelectedPreset] = useState<Preset | null>(presets[0]);
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
      case "cosine": return "Measures how similar two candidate skill profiles are by comparing the 'angle' between their skill vectors. Lower distance = more similar careers. This is what Pythia uses for talent matching.";
      case "euclidean": return "Measures straight-line distance in space. Can be misleading for comparing CVs because it treats all dimensions equally. A candidate with 5 years vs 10 years experience might show large distance even if skills match.";
      case "dot": return "Combines both similarity and 'strength' of profiles. Used in some ranking systems to boost candidates with more comprehensive skillsets. Higher is better.";
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
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent" style={{ fontSize: '52px' }}>Distance Playground – Compare IT Talent</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto" style={{ fontSize: '22px' }}>
            See how Pythia compares two real candidates like Julia R. (Java Developer) and Emma K. (DevOps Engineer).
            Distance reveals how similar their skills really are.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div className="glass-card p-8" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <div className="mb-4 flex items-center justify-center gap-3 flex-wrap">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-primary/20 text-primary font-bold border border-primary/30 text-sm">
                  {candidate1.name}
                </span>
                <span className="text-xs text-muted-foreground">{candidate1.role}</span>
              </div>
              <span className="text-lg font-semibold text-muted-foreground">vs</span>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-accent/20 text-accent font-bold border border-accent/30 text-sm">
                  {candidate2.name}
                </span>
                <span className="text-xs text-muted-foreground">{candidate2.role}</span>
              </div>
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

              {/* Vector 1 Handle - Candidate 1 */}
              <VectorHandle
                vector={vector1}
                color="hsl(var(--primary))"
                label={candidate1.name.split(' ')[0].charAt(0) + candidate1.name.split(' ')[1].charAt(0)}
                isDragging={dragging === "v1"}
                isHovering={hovering === "v1"}
                onDragStart={() => setDragging("v1")}
                onDragEnd={() => setDragging(null)}
                onMouseEnter={() => setHovering("v1")}
                onMouseLeave={() => setHovering(null)}
                isSnapping={isSnapping && (snapTarget === "v1" || snapTarget === "both")}
                filterId="glow-cyan"
              />

              {/* Vector 2 Line - Candidate 2 */}
              <motion.line
                x1="0" y1="10"
                x2={vector2.x} y2={10 - vector2.y}
                stroke="hsl(var(--accent))"
                strokeWidth="0.08"
                filter="url(#glow-purple)"
                animate={{ x2: vector2.x, y2: 10 - vector2.y }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              />

              {/* Vector 2 Handle - Candidate 2 */}
              <VectorHandle
                vector={vector2}
                color="hsl(var(--accent))"
                label={candidate2.name.split(' ')[0].charAt(0) + candidate2.name.split(' ')[1].charAt(0)}
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
            {/* Candidate Comparison Card */}
            <CandidateComparisonCard
              candidate1={candidate1}
              candidate2={candidate2}
              distance={getValue()}
              distanceType={distanceType}
              hrExplanation={selectedPreset?.hrExplanation}
            />

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
              <h3 className="text-lg font-semibold mb-4 text-muted-foreground">Example Comparisons</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Click a comparison below to see real examples of how different candidates compare in embedding space.
              </p>
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
                      setSelectedPreset(preset);
                      setCandidate1(preset.candidate1);
                      setCandidate2(preset.candidate2);
                      // Set vectors with slight delay for snap effect
                      setTimeout(() => {
                        setVector1(preset.candidate1.vector);
                        setVector2(preset.candidate2.vector);
                      }, 100);
                    }}
                  />
                ))}
              </div>
            </div>

            {/* How to Read Guide for HR */}
            <div className="glass-card p-6 bg-accent/5">
              <h3 className="text-lg font-semibold mb-4 text-accent flex items-center gap-2">
                <span>💡</span> Understanding Distance Metrics for HR
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                <div>
                  <span className="font-bold text-foreground">Why Julia R. and Emma K. are close:</span>
                  <p className="mt-1">
                    Julia (Java/Spring Boot) and Emma (DevOps/Kubernetes) both work in backend/infrastructure with AWS.
                    Their embedding vectors point in similar directions because they share enterprise-level technical thinking,
                    even though their exact tools differ. <span className="text-accent font-medium">Cosine distance ~0.03</span> = very similar.
                  </p>
                </div>
                <div>
                  <span className="font-bold text-foreground">Why Marco T. is far from Thomas W.:</span>
                  <p className="mt-1">
                    Marco (React frontend) and Thomas (ML/AI) have completely different career trajectories.
                    Their vectors point in opposite directions in embedding space. <span className="text-accent font-medium">Cosine distance ~0.85</span> =
                    very different skillsets. You wouldn't recommend Marco for a machine learning role.
                  </p>
                </div>
                <div>
                  <span className="font-bold text-foreground">What this means for talent search:</span>
                  <p className="mt-1">
                    When you search for "Senior backend engineer with cloud experience," Pythia converts this into a vector
                    and finds candidates whose vectors are <span className="font-semibold">close in cosine distance</span>.
                    This captures semantic meaning - it knows Julia R. and Emma K. are both strong matches, even if their
                    job titles differ.
                  </p>
                </div>
                <div className="pt-3 border-t border-glass-border/30 bg-background/30 p-3 rounded-lg">
                  <span className="font-bold text-primary">Key Takeaway:</span>
                  <p className="mt-1 text-foreground">
                    Small distance = similar careers and skills. Large distance = different specializations.
                    Pythia uses cosine distance (the recommended metric) to find the best talent matches automatically.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
