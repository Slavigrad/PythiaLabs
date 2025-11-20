import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Database, Zap, Activity, HardDrive, Search } from "lucide-react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Cylinder, Float, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

interface VectorRow {
  id: string;
  values: number[];
  position: [number, number, number];
  isHighlighted: boolean;
  similarity?: number;
}

interface MeteorVector {
  id: string;
  startPos: [number, number, number];
  targetPos: [number, number, number];
  progress: number;
}

// 3D Database Cylinder Component
const DatabaseCylinder = ({
  isActive,
  vectorRows,
  showQuery
}: {
  isActive: boolean;
  vectorRows: VectorRow[];
  showQuery: boolean;
}) => {
  const cylinderRef = useRef<THREE.Mesh>(null);
  const extensionRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (cylinderRef.current) {
      cylinderRef.current.rotation.y += 0.005;
    }
    if (extensionRef.current) {
      extensionRef.current.rotation.y -= 0.003;
      // Pulsing effect
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.05;
      extensionRef.current.scale.set(scale, 1, scale);
    }
  });

  return (
    <group>
      {/* Main Database Cylinder */}
      <mesh ref={cylinderRef}>
        <Cylinder args={[2, 2, 4, 32]}>
          <meshStandardMaterial
            color="#1e293b"
            transparent
            opacity={0.7}
            metalness={0.8}
            roughness={0.2}
          />
        </Cylinder>
      </mesh>

      {/* Database rings/layers */}
      {[...Array(8)].map((_, i) => (
        <mesh key={i} position={[0, -1.5 + i * 0.5, 0]}>
          <Cylinder args={[2.05, 2.05, 0.05, 32]}>
            <meshStandardMaterial
              color="#00d4ff"
              transparent
              opacity={0.2}
              emissive="#00d4ff"
              emissiveIntensity={isActive ? 0.3 : 0.1}
            />
          </Cylinder>
        </mesh>
      ))}

      {/* pgvector Extension Layer (outer glow) */}
      <mesh ref={extensionRef}>
        <Cylinder args={[2.3, 2.3, 4.5, 32]}>
          <meshStandardMaterial
            color="#00d4ff"
            transparent
            opacity={0.15}
            emissive="#00d4ff"
            emissiveIntensity={isActive ? 0.8 : 0.3}
            wireframe
          />
        </Cylinder>
      </mesh>

      {/* Vector rows inside database */}
      {vectorRows.map((row, idx) => (
        <Float key={row.id} speed={1} rotationIntensity={0} floatIntensity={0.1}>
          <mesh position={row.position}>
            <boxGeometry args={[3, 0.1, 0.1]} />
            <meshStandardMaterial
              color={row.isHighlighted ? "#a855f7" : "#22d3ee"}
              transparent
              opacity={row.isHighlighted ? 0.9 : 0.4}
              emissive={row.isHighlighted ? "#a855f7" : "#22d3ee"}
              emissiveIntensity={row.isHighlighted ? 1.5 : 0.3}
            />
          </mesh>

          {/* Similarity indicator sphere */}
          {row.isHighlighted && row.similarity && (
            <mesh position={[row.position[0] + 1.8, row.position[1], row.position[2]]}>
              <sphereGeometry args={[0.15, 16, 16]} />
              <meshStandardMaterial
                color="#a855f7"
                emissive="#a855f7"
                emissiveIntensity={1.5}
              />
            </mesh>
          )}
        </Float>
      ))}

      {/* Query vector (when searching) */}
      {showQuery && (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
          <mesh position={[0, 3, 0]}>
            <sphereGeometry args={[0.3, 32, 32]} />
            <meshStandardMaterial
              color="#fbbf24"
              emissive="#fbbf24"
              emissiveIntensity={2}
            />
          </mesh>
        </Float>
      )}

      {/* PostgreSQL logo text */}
      <Float speed={1} rotationIntensity={0.2} floatIntensity={0.3}>
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshStandardMaterial
            color="#336791"
            emissive="#336791"
            emissiveIntensity={0.5}
            transparent
            opacity={0.6}
          />
        </mesh>
      </Float>
    </group>
  );
};

// Meteor particle component
const MeteorParticle = ({
  startPos,
  endPos,
  delay
}: {
  startPos: [number, number, number];
  endPos: [number, number, number];
  delay: number;
}) => {
  return (
    <motion.div
      className="absolute w-2 h-2 rounded-full bg-accent"
      style={{
        left: `${startPos[0]}%`,
        top: `${startPos[1]}%`,
        boxShadow: "0 0 15px #22d3ee, 0 0 30px #22d3ee",
      }}
      initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
      animate={{
        x: `${endPos[0] - startPos[0]}%`,
        y: `${endPos[1] - startPos[1]}%`,
        opacity: [0, 1, 1, 0],
        scale: [0, 1.5, 1, 0],
      }}
      transition={{
        duration: 1.5,
        delay: delay,
        ease: "easeOut",
      }}
    />
  );
};

interface VectorVaultProps {
  onClose: () => void;
}

export const VectorVault = ({ onClose }: VectorVaultProps) => {
  const [stage, setStage] = useState<"idle" | "inserting" | "stored" | "querying" | "results">("idle");
  const [vectorCount, setVectorCount] = useState(0);
  const [querySpeed, setQuerySpeed] = useState(0);
  const [meteors, setMeteors] = useState<MeteorParticle[]>([]);
  const [vectorRows, setVectorRows] = useState<VectorRow[]>([]);
  const [showQuery, setShowQuery] = useState(false);
  const [indexType, setIndexType] = useState("");

  // Generate initial vector rows
  useEffect(() => {
    const rows: VectorRow[] = [];
    for (let i = 0; i < 12; i++) {
      rows.push({
        id: `vector-${i}`,
        values: Array.from({ length: 1024 }, () => Math.random() * 2 - 1),
        position: [
          (Math.random() - 0.5) * 3,
          -1.5 + (i / 12) * 3,
          (Math.random() - 0.5) * 3
        ],
        isHighlighted: false,
      });
    }
    setVectorRows(rows);
  }, []);

  // Animation sequence
  const startSequence = async () => {
    setStage("idle");
    setVectorCount(0);
    setQuerySpeed(0);
    setIndexType("");
    setShowQuery(false);

    // Reset all highlights
    setVectorRows(prev => prev.map(row => ({ ...row, isHighlighted: false, similarity: undefined })));

    // Stage 1: Inserting vectors
    await new Promise(resolve => setTimeout(resolve, 500));
    setStage("inserting");

    // Generate meteors
    const newMeteors: any[] = [];
    for (let i = 0; i < 20; i++) {
      newMeteors.push({
        id: `meteor-${i}`,
        startPos: [Math.random() * 100, -10, 0],
        endPos: [50 + (Math.random() - 0.5) * 20, 50, 0],
        delay: i * 0.1,
      });
    }
    setMeteors(newMeteors as any);

    // Count up vectors
    for (let i = 0; i <= 1247392; i += 50000) {
      setVectorCount(Math.min(i, 1247392));
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    // Stage 2: Stored
    await new Promise(resolve => setTimeout(resolve, 800));
    setStage("stored");
    setIndexType("IVFFlat");

    // Stage 3: Querying
    await new Promise(resolve => setTimeout(resolve, 1500));
    setStage("querying");
    setShowQuery(true);

    // Simulate query speed
    for (let i = 0; i <= 3; i += 0.1) {
      setQuerySpeed(parseFloat(Math.min(i, 3).toFixed(3)));
      await new Promise(resolve => setTimeout(resolve, 50));
    }

    // Stage 4: Results - highlight similar vectors
    await new Promise(resolve => setTimeout(resolve, 500));
    setStage("results");

    // Highlight top 5 similar vectors with similarity scores
    const similarities = [0.94, 0.89, 0.85, 0.79, 0.73];
    for (let i = 0; i < 5; i++) {
      await new Promise(resolve => setTimeout(resolve, 200));
      setVectorRows(prev => {
        const updated = [...prev];
        if (updated[i]) {
          updated[i] = {
            ...updated[i],
            isHighlighted: true,
            similarity: similarities[i],
          };
        }
        return updated;
      });
    }
  };

  // Auto-start on mount
  useEffect(() => {
    startSequence();
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
        className="relative w-full max-w-7xl h-[90vh] glass-card overflow-hidden"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 25 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-10 glass-card p-3 rounded-xl hover:bg-accent/20 transition-all group"
        >
          <X className="w-6 h-6 text-muted-foreground group-hover:text-accent transition-colors" />
        </button>

        {/* Header */}
        <div className="relative z-10 p-8 border-b border-accent/20">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
              <Database className="w-6 h-6 text-accent" />
            </div>
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-accent via-primary to-secondary bg-clip-text text-transparent">
                The Vector Vault
              </h2>
              <p className="text-sm text-muted-foreground">PostgreSQL + pgvector: Lightning-fast semantic search at scale</p>
            </div>
          </div>

          {/* Control button */}
          <motion.button
            onClick={startSequence}
            disabled={stage !== "results"}
            className="glass-card px-6 py-3 rounded-xl bg-gradient-to-r from-accent to-primary text-primary-foreground font-semibold hover:shadow-lg hover:shadow-accent/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            whileHover={{ scale: stage === "results" ? 1.05 : 1 }}
            whileTap={{ scale: stage === "results" ? 0.95 : 1 }}
          >
            <Database className="w-5 h-5" />
            {stage === "results" ? "Replay Storage & Query" : "Running..."}
          </motion.button>
        </div>

        {/* Main visualization area */}
        <div className="relative h-full">
          {/* Meteor particles overlay */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <AnimatePresence>
              {stage === "inserting" &&
                meteors.map((meteor: any) => (
                  <MeteorParticle
                    key={meteor.id}
                    startPos={meteor.startPos}
                    endPos={meteor.endPos}
                    delay={meteor.delay}
                  />
                ))}
            </AnimatePresence>
          </div>

          <div className="grid grid-cols-2 gap-6 p-6 h-full">
            {/* Left: 3D Database Visualization */}
            <div className="glass-card p-6 relative overflow-hidden">
              <h3 className="text-lg font-semibold mb-3 text-accent flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                PostgreSQL with pgvector Extension
              </h3>
              <div className="absolute inset-6 top-16">
                <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
                  <ambientLight intensity={0.5} />
                  <pointLight position={[10, 10, 10]} intensity={1} />
                  <pointLight position={[-10, -10, -10]} intensity={0.5} />
                  <DatabaseCylinder
                    isActive={stage !== "idle"}
                    vectorRows={vectorRows}
                    showQuery={showQuery}
                  />
                  <OrbitControls enableZoom={true} autoRotate={false} />
                </Canvas>

                {/* Similarity scores overlay */}
                {stage === "results" && (
                  <div className="absolute top-6 right-6 glass-card p-4 space-y-2">
                    <h4 className="text-xs font-semibold text-secondary mb-2">Top Matches</h4>
                    {vectorRows
                      .filter(r => r.isHighlighted)
                      .sort((a, b) => (b.similarity || 0) - (a.similarity || 0))
                      .map((row, idx) => (
                        <motion.div
                          key={row.id}
                          className="flex items-center gap-2 text-xs"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.2 }}
                        >
                          <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                          <span className="text-muted-foreground">Match {idx + 1}:</span>
                          <span className="font-bold text-secondary">
                            {((row.similarity || 0) * 100).toFixed(0)}%
                          </span>
                        </motion.div>
                      ))}
                  </div>
                )}
              </div>

              {/* Stage indicator */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={stage}
                  className="absolute bottom-6 left-6 right-6 glass-card p-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <p className="text-sm font-semibold text-accent">
                    {stage === "idle" && "⏳ Initializing..."}
                    {stage === "inserting" && "📥 Inserting vectors into database..."}
                    {stage === "stored" && "✅ Vectors stored and indexed!"}
                    {stage === "querying" && "🔍 Processing semantic search query..."}
                    {stage === "results" && "✨ Results ranked by similarity!"}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right: Performance Dashboard */}
            <div className="space-y-6">
              {/* Metrics Cards */}
              <div className="grid grid-cols-2 gap-4">
                {/* Vector Count */}
                <motion.div
                  className="glass-card p-6"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <HardDrive className="w-5 h-5 text-primary" />
                    <h4 className="text-sm font-semibold text-muted-foreground">Vectors Stored</h4>
                  </div>
                  <motion.p
                    className="text-3xl font-bold text-primary"
                    key={vectorCount}
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                  >
                    {vectorCount.toLocaleString()}
                  </motion.p>
                  <p className="text-xs text-muted-foreground mt-1">1024-dimensional vectors</p>
                </motion.div>

                {/* Query Speed */}
                <motion.div
                  className="glass-card p-6"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <Zap className="w-5 h-5 text-accent" />
                    <h4 className="text-sm font-semibold text-muted-foreground">Query Speed</h4>
                  </div>
                  <motion.p
                    className="text-3xl font-bold text-accent"
                    key={querySpeed}
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                  >
                    {querySpeed.toFixed(3)}ms
                  </motion.p>
                  <p className="text-xs text-muted-foreground mt-1">Cosine distance search</p>
                </motion.div>

                {/* Index Type */}
                <motion.div
                  className="glass-card p-6"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <Activity className="w-5 h-5 text-secondary" />
                    <h4 className="text-sm font-semibold text-muted-foreground">Index Type</h4>
                  </div>
                  <p className="text-2xl font-bold text-secondary">
                    {indexType || "—"}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">Optimized for cosine distance</p>
                </motion.div>

                {/* Results Found */}
                <motion.div
                  className="glass-card p-6"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <Search className="w-5 h-5 text-primary" />
                    <h4 className="text-sm font-semibold text-muted-foreground">Results Found</h4>
                  </div>
                  <p className="text-3xl font-bold text-primary">
                    {stage === "results" ? vectorRows.filter(r => r.isHighlighted).length : 0}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">Most similar matches</p>
                </motion.div>
              </div>

              {/* Technical Details */}
              <div className="glass-card p-6">
                <h4 className="text-lg font-semibold mb-4 text-foreground">How It Works</h4>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <motion.div
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: stage === "inserting" || stage === "stored" || stage === "querying" || stage === "results" ? 1 : 0.3, x: 0 }}
                    transition={{ delay: 1 }}
                  >
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-primary">1</span>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Vector Insertion</p>
                      <p>Embeddings stored as PostgreSQL native type with pgvector</p>
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: stage === "stored" || stage === "querying" || stage === "results" ? 1 : 0.3, x: 0 }}
                    transition={{ delay: 2 }}
                  >
                    <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-accent">2</span>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Index Building</p>
                      <p>IVFFlat index created for approximate nearest neighbor search</p>
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: stage === "querying" || stage === "results" ? 1 : 0.3, x: 0 }}
                    transition={{ delay: 3 }}
                  >
                    <div className="w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-secondary">3</span>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Query Execution</p>
                      <p>Cosine distance operator {'<->'} finds nearest vectors in milliseconds</p>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* SQL Query Preview */}
              <AnimatePresence>
                {(stage === "querying" || stage === "results") && (
                  <motion.div
                    className="glass-card p-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <h4 className="text-sm font-semibold mb-3 text-accent flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                      SQL Query in Action
                    </h4>
                    <pre className="text-xs font-mono text-foreground/80 bg-background/50 p-4 rounded-lg overflow-x-auto">
{`SELECT
  id,
  profile_data,
  embedding <-> '[...]'::vector
    AS distance
FROM talent_profiles
ORDER BY distance
LIMIT 5;`}
                    </pre>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
