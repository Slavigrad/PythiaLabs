import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Wand2 } from "lucide-react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Float, Sphere } from "@react-three/drei";

interface Token {
  id: string;
  text: string;
  x: number;
  color: string;
}

interface Particle {
  id: string;
  x: number;
  y: number;
  targetY: number;
  delay: number;
}

// 3D Embedding Cube Component
const EmbeddingCube = ({ isAnimating }: { isAnimating: boolean }) => {
  return (
    <group>
      {/* Central glowing core */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <Sphere args={[0.3, 32, 32]}>
          <meshStandardMaterial
            color="#00d4ff"
            emissive="#00d4ff"
            emissiveIntensity={0.5}
            wireframe
          />
        </Sphere>
      </Float>

      {/* Embedding dimension points (sample of 1024) */}
      {Array.from({ length: 64 }).map((_, i) => {
        const theta = (i / 64) * Math.PI * 2;
        const phi = Math.acos(2 * (i / 64) - 1);
        const radius = 2;
        const x = radius * Math.sin(phi) * Math.cos(theta);
        const y = radius * Math.sin(phi) * Math.sin(theta);
        const z = radius * Math.cos(phi);

        return (
          <Float
            key={i}
            speed={1 + Math.random()}
            rotationIntensity={0.2}
            floatIntensity={0.3}
          >
            <Sphere args={[0.05, 16, 16]} position={[x, y, z]}>
              <meshStandardMaterial
                color={i % 3 === 0 ? "#00d4ff" : i % 3 === 1 ? "#a855f7" : "#22d3ee"}
                emissive={i % 3 === 0 ? "#00d4ff" : i % 3 === 1 ? "#a855f7" : "#22d3ee"}
                emissiveIntensity={isAnimating ? 1 : 0.3}
              />
            </Sphere>
          </Float>
        );
      })}
    </group>
  );
};

interface TransformationChamberProps {
  onClose: () => void;
}

export const TransformationChamber = ({ onClose }: TransformationChamberProps) => {
  const [inputText, setInputText] = useState("Senior React Developer");
  const [isTransforming, setIsTransforming] = useState(false);
  const [stage, setStage] = useState<"idle" | "tokenizing" | "streaming" | "embedding">("idle");
  const [tokens, setTokens] = useState<Token[]>([]);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [matrixValues, setMatrixValues] = useState<number[]>([]);
  const [visibleDimensions, setVisibleDimensions] = useState(0);

  // Tokenize text into visual tokens
  const tokenizeText = (text: string) => {
    const words = text.split(" ");
    return words.map((word, idx) => ({
      id: `token-${idx}`,
      text: word,
      x: (idx - words.length / 2) * 120,
      color: idx % 3 === 0 ? "#00d4ff" : idx % 3 === 1 ? "#a855f7" : "#22d3ee",
    }));
  };

  // Generate random embedding values
  const generateEmbedding = () => {
    return Array.from({ length: 1024 }, () => (Math.random() * 2 - 1).toFixed(3));
  };

  // Transform animation sequence
  const startTransformation = async () => {
    if (isTransforming) return;

    setIsTransforming(true);
    setStage("idle");
    setTokens([]);
    setParticles([]);
    setMatrixValues([]);
    setVisibleDimensions(0);

    // Stage 1: Tokenization
    await new Promise(resolve => setTimeout(resolve, 300));
    setStage("tokenizing");
    const newTokens = tokenizeText(inputText);
    setTokens(newTokens);

    // Stage 2: Particle streaming
    await new Promise(resolve => setTimeout(resolve, 1500));
    setStage("streaming");

    const newParticles: Particle[] = [];
    newTokens.forEach((token, tokenIdx) => {
      for (let i = 0; i < 30; i++) {
        newParticles.push({
          id: `particle-${tokenIdx}-${i}`,
          x: token.x + (Math.random() - 0.5) * 60,
          y: 0,
          targetY: 400 + Math.random() * 100,
          delay: tokenIdx * 200 + i * 50,
        });
      }
    });
    setParticles(newParticles);

    // Stage 3: Embedding matrix
    await new Promise(resolve => setTimeout(resolve, 2000));
    setStage("embedding");
    const embedding = generateEmbedding();
    setMatrixValues(embedding);

    // Cascade reveal dimensions
    for (let i = 0; i <= 64; i++) {
      setVisibleDimensions(i);
      await new Promise(resolve => setTimeout(resolve, 30));
    }

    setIsTransforming(false);
  };

  // Auto-start on mount
  useEffect(() => {
    startTransformation();
  }, []);

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
          className="absolute top-6 right-6 z-50 glass-card p-3 rounded-xl hover:bg-primary/20 transition-all group pointer-events-auto"
        >
          <X className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
        </button>

        {/* Header */}
        <div className="relative z-10 p-8 border-b border-primary/20">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                The Transformation Chamber
              </h2>
              <p className="text-sm text-muted-foreground">Watch text become a 1024-dimensional vector in real-time</p>
            </div>
          </div>

          {/* Interactive input */}
          <div className="flex gap-3">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Enter any text..."
              className="flex-1 glass-card px-6 py-3 rounded-xl bg-background/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              disabled={isTransforming}
            />
            <motion.button
              onClick={startTransformation}
              disabled={isTransforming || !inputText.trim()}
              className="glass-card px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold hover:shadow-lg hover:shadow-primary/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              whileHover={{ scale: isTransforming ? 1 : 1.05 }}
              whileTap={{ scale: isTransforming ? 1 : 0.95 }}
            >
              <Wand2 className="w-5 h-5" />
              {isTransforming ? "Transforming..." : "Transform"}
            </motion.button>
          </div>
        </div>

        {/* Transformation visualization area */}
        <div className="relative h-full overflow-visible">
          {/* Tokenization stage */}
          <div className="absolute top-20 left-0 right-0 h-32 flex items-center justify-center">
            <AnimatePresence>
              {stage !== "idle" && (
                <div className="relative w-full h-full flex items-center justify-center">
                  {tokens.map((token, idx) => (
                    <motion.div
                      key={token.id}
                      className="absolute px-4 py-2 glass-card rounded-lg font-mono text-sm font-semibold"
                      style={{
                        color: token.color,
                        textShadow: `0 0 20px ${token.color}`,
                      }}
                      initial={{ opacity: 0, y: -50, x: 0, scale: 0 }}
                      animate={{
                        opacity: stage === "tokenizing" ? 1 : stage === "streaming" ? 0.3 : 0,
                        y: 0,
                        x: token.x,
                        scale: stage === "tokenizing" ? [0, 1.2, 1] : 1,
                      }}
                      transition={{
                        duration: 0.6,
                        delay: idx * 0.1,
                        scale: { duration: 0.8 },
                      }}
                    >
                      {token.text}
                    </motion.div>
                  ))}
                </div>
              )}
            </AnimatePresence>
          </div>

          {/* Particle streaming */}
          <div className="absolute inset-0 pointer-events-none">
            <AnimatePresence>
              {stage === "streaming" &&
                particles.map((particle) => (
                  <motion.div
                    key={particle.id}
                    className="absolute w-1 h-1 rounded-full bg-primary"
                    style={{
                      left: `calc(50% + ${particle.x}px)`,
                      boxShadow: "0 0 10px currentColor",
                    }}
                    initial={{ y: 100, opacity: 0 }}
                    animate={{
                      y: particle.targetY,
                      opacity: [0, 1, 1, 0],
                    }}
                    transition={{
                      duration: 2,
                      delay: particle.delay / 1000,
                      ease: "easeInOut",
                    }}
                  />
                ))}
            </AnimatePresence>
          </div>

          {/* Bottom section: Matrix and 3D Cube */}
          <div className="absolute bottom-0 left-0 right-0 h-[55%] grid grid-cols-2 gap-6 p-6">
            {/* Matrix cascade */}
            <div className="glass-card p-6 overflow-hidden relative">
              <h3 className="text-lg font-semibold mb-3 text-primary flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                1024-Dimensional Embedding Vector
              </h3>
              <div className="grid grid-cols-8 gap-1 text-[10px] font-mono overflow-auto h-[calc(100%-3rem)] pr-2 custom-scrollbar">
                <AnimatePresence>
                  {stage === "embedding" &&
                    matrixValues.slice(0, visibleDimensions * 16).map((value, idx) => (
                      <motion.div
                        key={idx}
                        className="glass-card px-2 py-1 text-center"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{
                          color:
                            parseFloat(value) > 0.5
                              ? "#00d4ff"
                              : parseFloat(value) < -0.5
                              ? "#a855f7"
                              : "#22d3ee",
                          textShadow: "0 0 10px currentColor",
                        }}
                        transition={{
                          duration: 0.3,
                          delay: (idx % 16) * 0.02,
                        }}
                      >
                        {value}
                      </motion.div>
                    ))}
                </AnimatePresence>
              </div>

              {/* Dimension counter */}
              <AnimatePresence>
                {stage === "embedding" && (
                  <motion.div
                    className="absolute bottom-6 right-6 glass-card px-4 py-2 rounded-lg"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <p className="text-xs text-muted-foreground">
                      Dimensions: <span className="text-primary font-bold">{visibleDimensions * 16}</span> / 1024
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 3D Embedding Space */}
            <div className="glass-card p-6 relative overflow-hidden">
              <h3 className="text-lg font-semibold mb-3 text-secondary flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                Embedding Space (3D Projection)
              </h3>
              <div className="absolute inset-6 top-16">
                <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
                  <ambientLight intensity={0.5} />
                  <pointLight position={[10, 10, 10]} intensity={1} />
                  <EmbeddingCube isAnimating={stage === "embedding"} />
                  <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} />
                </Canvas>
              </div>

              {/* Legend */}
              <div className="absolute bottom-6 left-6 right-6 glass-card p-3 space-y-1">
                <p className="text-[10px] text-muted-foreground flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary" style={{ boxShadow: "0 0 8px #00d4ff" }} />
                  Semantic meaning (e.g., "Senior")
                </p>
                <p className="text-[10px] text-muted-foreground flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-secondary" style={{ boxShadow: "0 0 8px #a855f7" }} />
                  Technical context (e.g., "React")
                </p>
                <p className="text-[10px] text-muted-foreground flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-accent" style={{ boxShadow: "0 0 8px #22d3ee" }} />
                  Role dimension (e.g., "Developer")
                </p>
              </div>
            </div>
          </div>

          {/* Stage indicator */}
          <AnimatePresence>
            {stage !== "idle" && (
              <motion.div
                className="absolute top-1/3 left-1/2 -translate-x-1/2 glass-card px-6 py-3 rounded-full"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <p className="text-sm font-semibold text-primary">
                  {stage === "tokenizing" && "🔤 Tokenizing..."}
                  {stage === "streaming" && "✨ Extracting features..."}
                  {stage === "embedding" && "🧠 Generating embedding..."}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(0, 212, 255, 0.3);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 212, 255, 0.5);
        }
      `}</style>
    </motion.div>
  );
};
