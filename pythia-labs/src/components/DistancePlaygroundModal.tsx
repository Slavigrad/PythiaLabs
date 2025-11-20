import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, TrendingUp, Calculator, Users, Sparkles } from "lucide-react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Cone, Cylinder } from "@react-three/drei";
import * as THREE from "three";

interface Candidate {
  id: string;
  name: string;
  role: string;
  distance: number;
  similarity: number;
}

// 3D Vector Arrow Component
const VectorArrow = ({
  position,
  direction,
  color,
  label
}: {
  position: [number, number, number];
  direction: [number, number, number];
  color: string;
  label: string;
}) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  const length = Math.sqrt(direction[0] ** 2 + direction[1] ** 2 + direction[2] ** 2);
  const dir = new THREE.Vector3(...direction).normalize();
  const quaternion = new THREE.Quaternion();
  quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);

  return (
    <group ref={groupRef} position={position}>
      <group quaternion={quaternion}>
        {/* Arrow shaft */}
        <Cylinder args={[0.05, 0.05, length * 0.8, 16]} position={[0, length * 0.4, 0]}>
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.5}
          />
        </Cylinder>

        {/* Arrow head */}
        <Cone args={[0.15, 0.4, 16]} position={[0, length * 0.8 + 0.2, 0]}>
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.8}
          />
        </Cone>
      </group>

      {/* Glow sphere at origin */}
      <mesh>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={1}
        />
      </mesh>
    </group>
  );
};

// Angle Arc Component
const AngleArc = ({
  angle,
  radius = 1
}: {
  angle: number;
  radius?: number;
}) => {
  const arcRef = useRef<THREE.Line>(null);

  useEffect(() => {
    if (arcRef.current) {
      const points: THREE.Vector3[] = [];
      const segments = 50;
      for (let i = 0; i <= segments; i++) {
        const theta = (i / segments) * angle;
        points.push(
          new THREE.Vector3(
            Math.sin(theta) * radius,
            Math.cos(theta) * radius,
            0
          )
        );
      }
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      arcRef.current.geometry = geometry;
    }
  }, [angle, radius]);

  return (
    <line ref={arcRef}>
      <bufferGeometry />
      <lineBasicMaterial color="#fbbf24" linewidth={2} />
    </line>
  );
};

interface DistancePlaygroundModalProps {
  onClose: () => void;
}

export const DistancePlaygroundModal = ({ onClose }: DistancePlaygroundModalProps) => {
  const [distance, setDistance] = useState(0.5);
  const [similarity, setSimilarity] = useState(0.75);
  const [angle, setAngle] = useState(45);
  const [isAnimating, setIsAnimating] = useState(false);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [showFormula, setShowFormula] = useState(false);

  // Initial candidate data
  const baseCandidates = [
    { id: "1", name: "Alex Chen", role: "Senior React Developer" },
    { id: "2", name: "Maria Garcia", role: "Full-Stack Engineer" },
    { id: "3", name: "James Wilson", role: "Frontend Specialist" },
    { id: "4", name: "Priya Sharma", role: "JavaScript Developer" },
    { id: "5", name: "Tom Anderson", role: "UI Engineer" },
  ];

  // Calculate similarity from distance
  useEffect(() => {
    const sim = Math.max(0, Math.min(1, 1 - distance / 2));
    setSimilarity(sim);

    // Calculate angle (0-180 degrees based on distance)
    // Cosine distance 0 = angle 0, distance 2 = angle 180
    const calculatedAngle = (distance / 2) * 180;
    setAngle(calculatedAngle);

    // Update candidates with varying distances around the selected distance
    const updatedCandidates = baseCandidates.map((candidate, idx) => {
      const candidateDistance = Math.max(0, Math.min(2, distance + (Math.random() - 0.5) * 0.4));
      const candidateSimilarity = Math.max(0, Math.min(1, 1 - candidateDistance / 2));
      return {
        ...candidate,
        distance: candidateDistance,
        similarity: candidateSimilarity,
      };
    });

    // Sort by similarity (highest first)
    updatedCandidates.sort((a, b) => b.similarity - a.similarity);
    setCandidates(updatedCandidates);
  }, [distance]);

  // Auto-demo sequence
  useEffect(() => {
    const runDemo = async () => {
      setShowFormula(true);
      await new Promise(resolve => setTimeout(resolve, 500));

      // Animate through different distances
      setIsAnimating(true);
      const distances = [0.2, 0.8, 1.4, 0.5];

      for (const dist of distances) {
        setDistance(dist);
        await new Promise(resolve => setTimeout(resolve, 1500));
      }

      setIsAnimating(false);
    };

    runDemo();
  }, []);

  // Calculate vector positions based on angle
  const vector1Direction: [number, number, number] = [0, 2, 0];
  const vector2Direction: [number, number, number] = [
    Math.sin((angle * Math.PI) / 180) * 2,
    Math.cos((angle * Math.PI) / 180) * 2,
    0,
  ];

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative w-full max-w-7xl h-[90vh] glass-card overflow-y-auto"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 25 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-50 glass-card p-3 rounded-xl hover:bg-secondary/20 transition-all group pointer-events-auto"
        >
          <X className="w-6 h-6 text-muted-foreground group-hover:text-secondary transition-colors" />
        </button>

        {/* Header */}
        <div className="relative z-10 p-8 border-b border-secondary/20">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-secondary" />
            </div>
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-secondary via-primary to-accent bg-clip-text text-transparent">
                The Distance Playground
              </h2>
              <p className="text-sm text-muted-foreground">
                Interactive cosine distance & similarity calculator
              </p>
            </div>
          </div>

          {/* Main slider control */}
          <div className="glass-card p-6 space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-foreground">
                Cosine Distance
              </label>
              <motion.span
                className="text-2xl font-bold text-secondary"
                key={distance}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
              >
                {distance.toFixed(3)}
              </motion.span>
            </div>

            <input
              type="range"
              min="0"
              max="2"
              step="0.01"
              value={distance}
              onChange={(e) => setDistance(parseFloat(e.target.value))}
              disabled={isAnimating}
              className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
              style={{
                background: `linear-gradient(to right, hsl(var(--secondary)) 0%, hsl(var(--secondary)) ${(distance / 2) * 100}%, hsl(var(--muted)) ${(distance / 2) * 100}%, hsl(var(--muted)) 100%)`,
              }}
            />

            <div className="flex justify-between text-xs text-muted-foreground">
              <span>0 (Perfect Match)</span>
              <span>1 (Orthogonal)</span>
              <span>2 (Opposite)</span>
            </div>
          </div>
        </div>

        {/* Main content area */}
        <div className="relative h-full p-6">
          <div className="grid grid-cols-2 gap-6 h-full">
            {/* Left: 3D Vector Visualization */}
            <div className="space-y-4">
              <div className="glass-card p-6 h-[calc(100%-8rem)]">
                <h3 className="text-lg font-semibold mb-3 text-secondary flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                  Vector Space Geometry
                </h3>
                <div className="relative h-[calc(100%-3rem)]">
                  <Canvas camera={{ position: [4, 2, 4], fov: 50 }}>
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} intensity={1} />
                    <pointLight position={[-10, -10, -10]} intensity={0.5} />

                    {/* Vector 1 (Query) */}
                    <VectorArrow
                      position={[0, 0, 0]}
                      direction={vector1Direction}
                      color="#fbbf24"
                      label="Query"
                    />

                    {/* Vector 2 (Result) */}
                    <VectorArrow
                      position={[0, 0, 0]}
                      direction={vector2Direction}
                      color="#a855f7"
                      label="Result"
                    />

                    {/* Angle arc */}
                    <AngleArc angle={(angle * Math.PI) / 180} radius={1.2} />

                    {/* Origin sphere */}
                    <mesh>
                      <sphereGeometry args={[0.08, 16, 16]} />
                      <meshStandardMaterial
                        color="#00d4ff"
                        emissive="#00d4ff"
                        emissiveIntensity={1}
                      />
                    </mesh>

                    <OrbitControls enableZoom={true} />
                  </Canvas>

                  {/* Legend */}
                  <div className="absolute bottom-4 left-4 right-4 glass-card p-3 space-y-2">
                    <div className="flex items-center gap-2 text-xs">
                      <div className="w-3 h-3 rounded-full bg-[#fbbf24]" />
                      <span className="text-muted-foreground">Query Vector</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <div className="w-3 h-3 rounded-full bg-[#a855f7]" />
                      <span className="text-muted-foreground">Result Vector</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <div className="w-3 h-3 rounded-full bg-[#fbbf24]" />
                      <span className="text-muted-foreground">Angle: {angle.toFixed(1)}°</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Formula Display */}
              <AnimatePresence>
                {showFormula && (
                  <motion.div
                    className="glass-card p-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <Calculator className="w-5 h-5 text-accent" />
                      <h4 className="text-sm font-semibold text-foreground">Live Calculation</h4>
                    </div>
                    <div className="bg-background/50 p-4 rounded-lg space-y-2 font-mono text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Distance:</span>
                        <motion.span
                          className="text-secondary font-bold"
                          key={`dist-${distance}`}
                          initial={{ scale: 1.2, color: "#a855f7" }}
                          animate={{ scale: 1, color: "#a855f7" }}
                        >
                          {distance.toFixed(3)}
                        </motion.span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Formula:</span>
                        <span className="text-foreground">similarity = 1 - (distance / 2)</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Calculation:</span>
                        <span className="text-foreground">
                          1 - ({distance.toFixed(3)} / 2)
                        </span>
                      </div>
                      <div className="border-t border-primary/20 pt-2 flex items-center justify-between">
                        <span className="text-muted-foreground font-bold">Similarity Score:</span>
                        <motion.span
                          className="text-2xl font-bold text-primary"
                          key={`sim-${similarity}`}
                          initial={{ scale: 1.3 }}
                          animate={{ scale: 1 }}
                        >
                          {similarity.toFixed(3)}
                        </motion.span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Percentage:</span>
                        <motion.span
                          className="text-xl font-bold text-accent"
                          key={`pct-${similarity}`}
                          initial={{ scale: 1.2 }}
                          animate={{ scale: 1 }}
                        >
                          {(similarity * 100).toFixed(1)}%
                        </motion.span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Right: Results Leaderboard */}
            <div className="glass-card p-6 overflow-hidden">
              <div className="flex items-center gap-2 mb-4">
                <Users className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold text-foreground">
                  Ranked Results
                </h3>
              </div>
              <p className="text-sm text-muted-foreground mb-6">
                Candidates automatically ranked by similarity score
              </p>

              <div className="space-y-3 overflow-y-auto h-[calc(100%-6rem)] pr-2 custom-scrollbar">
                <AnimatePresence mode="popLayout">
                  {candidates.map((candidate, idx) => (
                    <motion.div
                      key={candidate.id}
                      layout
                      className="glass-card p-4 hover:bg-secondary/10 transition-all"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{
                        layout: { duration: 0.3 },
                        opacity: { duration: 0.2, delay: idx * 0.05 },
                      }}
                    >
                      <div className="flex items-center gap-4">
                        {/* Rank badge */}
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                            idx === 0
                              ? "bg-primary/20 text-primary"
                              : idx === 1
                              ? "bg-accent/20 text-accent"
                              : idx === 2
                              ? "bg-secondary/20 text-secondary"
                              : "bg-muted/20 text-muted-foreground"
                          }`}
                        >
                          {idx + 1}
                        </div>

                        {/* Candidate info */}
                        <div className="flex-1">
                          <p className="font-semibold text-foreground">{candidate.name}</p>
                          <p className="text-xs text-muted-foreground">{candidate.role}</p>
                        </div>

                        {/* Metrics */}
                        <div className="text-right space-y-1">
                          <motion.p
                            className="text-lg font-bold text-primary"
                            key={`${candidate.id}-sim`}
                            initial={{ scale: 1.2 }}
                            animate={{ scale: 1 }}
                          >
                            {(candidate.similarity * 100).toFixed(0)}%
                          </motion.p>
                          <p className="text-xs text-muted-foreground">
                            d: {candidate.distance.toFixed(3)}
                          </p>
                        </div>

                        {/* Visual bar */}
                        <div className="w-24">
                          <motion.div
                            className="h-2 bg-gradient-to-r from-secondary to-primary rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${candidate.similarity * 100}%` }}
                            transition={{ duration: 0.5 }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Info box */}
              <motion.div
                className="mt-4 glass-card p-4 bg-secondary/10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <div className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-secondary mt-0.5" />
                  <div className="text-xs text-muted-foreground">
                    <p className="font-semibold text-foreground mb-1">How It Works</p>
                    <p>
                      Results are sorted by similarity score (highest first). As you adjust the distance,
                      watch how candidates re-rank in real-time. Lower distance = higher similarity = better match!
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      <style>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: hsl(var(--secondary));
          cursor: pointer;
          box-shadow: 0 0 10px hsl(var(--secondary));
        }

        .slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: hsl(var(--secondary));
          cursor: pointer;
          box-shadow: 0 0 10px hsl(var(--secondary));
          border: none;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(168, 85, 247, 0.3);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(168, 85, 247, 0.5);
        }
      `}</style>
    </motion.div>
  );
};
