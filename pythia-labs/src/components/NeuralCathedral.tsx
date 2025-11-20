import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Cpu, Globe, Layers, Zap, Brain } from "lucide-react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere } from "@react-three/drei";
import * as THREE from "three";

interface LanguageExample {
  lang: string;
  flag: string;
  text: string;
  embedding: number[];
  color: string;
}

// 3D Dimension Galaxy Component
const DimensionGalaxy = ({
  activeLanguage,
  showDimensions
}: {
  activeLanguage: string | null;
  showDimensions: boolean;
}) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  // Create 1024 dimension points in a galaxy-like formation
  const dimensions = Array.from({ length: 1024 }).map((_, i) => {
    const phi = Math.acos(-1 + (2 * i) / 1024);
    const theta = Math.sqrt(1024 * Math.PI) * phi;
    const radius = 3 + Math.random() * 2;

    return {
      id: i,
      position: [
        radius * Math.cos(theta) * Math.sin(phi),
        radius * Math.sin(theta) * Math.sin(phi),
        radius * Math.cos(phi),
      ] as [number, number, number],
      color: i % 3 === 0 ? "#00d4ff" : i % 3 === 1 ? "#a855f7" : "#22d3ee",
      size: 0.02 + Math.random() * 0.03,
    };
  });

  return (
    <group ref={groupRef}>
      {dimensions.map((dim) => (
        <Sphere key={dim.id} args={[dim.size, 8, 8]} position={dim.position}>
          <meshStandardMaterial
            color={dim.color}
            emissive={dim.color}
            emissiveIntensity={showDimensions ? 1.5 : 0.3}
            transparent
            opacity={showDimensions ? 1 : 0.5}
          />
        </Sphere>
      ))}

      {/* Central core */}
      <Sphere args={[0.5, 32, 32]}>
        <meshStandardMaterial
          color="#fbbf24"
          emissive="#fbbf24"
          emissiveIntensity={2}
          wireframe
        />
      </Sphere>
    </group>
  );
};

// Neural Network Layer Component
const NeuralLayer = ({
  position,
  neurons,
  isActive,
  color
}: {
  position: [number, number, number];
  neurons: number;
  isActive: boolean;
  color: string;
}) => {
  const spacing = 0.3;
  const offset = ((neurons - 1) * spacing) / 2;

  return (
    <group position={position}>
      {Array.from({ length: neurons }).map((_, i) => (
        <Sphere
          key={i}
          args={[0.1, 16, 16]}
          position={[0, i * spacing - offset, 0]}
        >
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={isActive ? 2 : 0.3}
          />
        </Sphere>
      ))}
    </group>
  );
};

interface NeuralCathedralProps {
  onClose: () => void;
}

export const NeuralCathedral = ({ onClose }: NeuralCathedralProps) => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>("en");
  const [showDimensions, setShowDimensions] = useState(false);
  const [activeLayers, setActiveLayers] = useState<number[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const languages: LanguageExample[] = [
    {
      lang: "en",
      flag: "🇺🇸",
      text: "Senior Developer",
      embedding: [0.23, -0.45, 0.67, 0.12, -0.34, 0.56, 0.89, -0.23],
      color: "#00d4ff",
    },
    {
      lang: "fr",
      flag: "🇫🇷",
      text: "Développeur Senior",
      embedding: [0.24, -0.44, 0.68, 0.13, -0.33, 0.57, 0.88, -0.24],
      color: "#00d4ff",
    },
    {
      lang: "de",
      flag: "🇩🇪",
      text: "Senior Entwickler",
      embedding: [0.23, -0.46, 0.66, 0.12, -0.35, 0.55, 0.90, -0.22],
      color: "#00d4ff",
    },
    {
      lang: "es",
      flag: "🇪🇸",
      text: "Desarrollador Senior",
      embedding: [0.22, -0.45, 0.67, 0.11, -0.34, 0.58, 0.89, -0.23],
      color: "#00d4ff",
    },
    {
      lang: "ja",
      flag: "🇯🇵",
      text: "シニア開発者",
      embedding: [0.25, -0.43, 0.69, 0.14, -0.32, 0.56, 0.87, -0.25],
      color: "#00d4ff",
    },
    {
      lang: "zh",
      flag: "🇨🇳",
      text: "高级开发者",
      embedding: [0.24, -0.44, 0.68, 0.13, -0.33, 0.57, 0.88, -0.24],
      color: "#00d4ff",
    },
  ];

  const modelSpecs = [
    { label: "Parameters", value: "335M", icon: Brain },
    { label: "Dimensions", value: "1024", icon: Layers },
    { label: "Context Length", value: "512 tokens", icon: Zap },
    { label: "Languages", value: "100+", icon: Globe },
  ];

  // Process language change with neural network animation
  const processLanguage = async (lang: string) => {
    if (isProcessing) return;

    setSelectedLanguage(lang);
    setIsProcessing(true);
    setShowDimensions(false);
    setActiveLayers([]);

    // Simulate neural network processing
    await new Promise(resolve => setTimeout(resolve, 300));

    // Light up layers sequentially
    for (let i = 0; i < 4; i++) {
      setActiveLayers(prev => [...prev, i]);
      await new Promise(resolve => setTimeout(resolve, 200));
    }

    // Show dimensions
    setShowDimensions(true);
    await new Promise(resolve => setTimeout(resolve, 500));

    setIsProcessing(false);
  };

  // Auto-cycle through languages
  useEffect(() => {
    const cycle = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      for (let i = 0; i < languages.length; i++) {
        await processLanguage(languages[i].lang);
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    };

    cycle();
  }, []);

  const currentLanguage = languages.find(l => l.lang === selectedLanguage) || languages[0];
  const similarity = 0.98; // High similarity across languages for same concept

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
              <Cpu className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                The Neural Cathedral
              </h2>
              <p className="text-sm text-muted-foreground">
                E5-Large-Instruct: 1024-dimensional multilingual embeddings
              </p>
            </div>
          </div>

          {/* Model Info */}
          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-foreground">
                jeffh/intfloat-multilingual-e5-large-instruct:f16
              </h3>
              <motion.div
                className="px-3 py-1 glass-card bg-primary/20 rounded-full"
                animate={{ scale: isProcessing ? [1, 1.1, 1] : 1 }}
                transition={{ duration: 0.5, repeat: isProcessing ? Infinity : 0 }}
              >
                <span className="text-xs font-semibold text-primary">
                  {isProcessing ? "Processing..." : "Ready"}
                </span>
              </motion.div>
            </div>

            <div className="grid grid-cols-4 gap-4">
              {modelSpecs.map((spec, idx) => {
                const Icon = spec.icon;
                return (
                  <motion.div
                    key={spec.label}
                    className="glass-card p-4 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <Icon className="w-5 h-5 text-primary mx-auto mb-2" />
                    <p className="text-xs text-muted-foreground mb-1">{spec.label}</p>
                    <p className="text-lg font-bold text-foreground">{spec.value}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="relative h-full p-6">
          <div className="grid grid-cols-2 gap-6 h-full">
            {/* Left: 3D Visualization */}
            <div className="space-y-4">
              {/* Dimension Galaxy */}
              <div className="glass-card p-6 h-[calc(50%-0.5rem)]">
                <h3 className="text-lg font-semibold mb-3 text-primary flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  1024-Dimensional Space
                </h3>
                <div className="relative h-[calc(100%-3rem)]">
                  <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
                    <ambientLight intensity={0.3} />
                    <pointLight position={[10, 10, 10]} intensity={1} />
                    <DimensionGalaxy
                      activeLanguage={selectedLanguage}
                      showDimensions={showDimensions}
                    />
                    <OrbitControls enableZoom={true} autoRotate autoRotateSpeed={0.5} />
                  </Canvas>

                  {/* Dimension counter */}
                  <AnimatePresence>
                    {showDimensions && (
                      <motion.div
                        className="absolute bottom-4 left-4 glass-card px-4 py-2"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                      >
                        <p className="text-xs text-muted-foreground">
                          Dimensions: <span className="text-primary font-bold">1024</span>
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Neural Network Layers */}
              <div className="glass-card p-6 h-[calc(50%-0.5rem)]">
                <h3 className="text-lg font-semibold mb-3 text-accent flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                  Neural Architecture
                </h3>
                <div className="relative h-[calc(100%-3rem)]">
                  <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
                    <ambientLight intensity={0.5} />
                    <pointLight position={[5, 5, 5]} intensity={1} />

                    {/* Input Layer */}
                    <NeuralLayer
                      position={[-6, 0, 0]}
                      neurons={8}
                      isActive={activeLayers.includes(0)}
                      color="#00d4ff"
                    />

                    {/* Hidden Layer 1 */}
                    <NeuralLayer
                      position={[-2, 0, 0]}
                      neurons={12}
                      isActive={activeLayers.includes(1)}
                      color="#22d3ee"
                    />

                    {/* Hidden Layer 2 */}
                    <NeuralLayer
                      position={[2, 0, 0]}
                      neurons={12}
                      isActive={activeLayers.includes(2)}
                      color="#a855f7"
                    />

                    {/* Output Layer */}
                    <NeuralLayer
                      position={[6, 0, 0]}
                      neurons={8}
                      isActive={activeLayers.includes(3)}
                      color="#fbbf24"
                    />

                    <OrbitControls enableZoom={false} />
                  </Canvas>

                  {/* Layer labels */}
                  <div className="absolute bottom-4 left-0 right-0 flex justify-between px-8 text-xs">
                    <span className={`${activeLayers.includes(0) ? "text-primary" : "text-muted-foreground"}`}>
                      Input
                    </span>
                    <span className={`${activeLayers.includes(1) ? "text-accent" : "text-muted-foreground"}`}>
                      Encoder
                    </span>
                    <span className={`${activeLayers.includes(2) ? "text-secondary" : "text-muted-foreground"}`}>
                      Transformer
                    </span>
                    <span className={`${activeLayers.includes(3) ? "text-[#fbbf24]" : "text-muted-foreground"}`}>
                      Embedding
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Multilingual Demo */}
            <div className="glass-card p-6 overflow-hidden">
              <div className="flex items-center gap-2 mb-4">
                <Globe className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold text-foreground">
                  Multilingual Semantic Understanding
                </h3>
              </div>
              <p className="text-sm text-muted-foreground mb-6">
                Same concept, different languages → Nearly identical embeddings
              </p>

              {/* Language selector */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                {languages.map((lang) => (
                  <motion.button
                    key={lang.lang}
                    onClick={() => processLanguage(lang.lang)}
                    disabled={isProcessing}
                    className={`glass-card p-4 text-center transition-all ${
                      selectedLanguage === lang.lang
                        ? "ring-2 ring-primary bg-primary/10"
                        : "hover:bg-primary/5"
                    }`}
                    whileHover={{ scale: isProcessing ? 1 : 1.05 }}
                    whileTap={{ scale: isProcessing ? 1 : 0.95 }}
                  >
                    <p className="text-2xl mb-1">{lang.flag}</p>
                    <p className="text-xs font-semibold text-foreground">
                      {lang.text}
                    </p>
                  </motion.button>
                ))}
              </div>

              {/* Current embedding display */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedLanguage}
                  className="glass-card p-6 bg-primary/5 mb-4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-3xl">{currentLanguage.flag}</span>
                      <div>
                        <p className="text-sm font-semibold text-foreground">
                          {currentLanguage.text}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Language: {currentLanguage.lang.toUpperCase()}
                        </p>
                      </div>
                    </div>
                    <motion.div
                      className="px-3 py-1 glass-card bg-accent/20 rounded-full"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      <span className="text-xs font-bold text-accent">
                        {(similarity * 100).toFixed(1)}% similar
                      </span>
                    </motion.div>
                  </div>

                  <div className="bg-background/50 p-4 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-2">
                      Embedding Vector (first 8 of 1024 dimensions):
                    </p>
                    <div className="grid grid-cols-8 gap-2 font-mono text-xs">
                      {currentLanguage.embedding.map((val, idx) => (
                        <motion.div
                          key={idx}
                          className="glass-card px-2 py-1 text-center"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.05 }}
                        >
                          <span
                            className="font-semibold"
                            style={{
                              color: val > 0 ? "#00d4ff" : "#a855f7",
                            }}
                          >
                            {val.toFixed(2)}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Comparison visualization */}
              <div className="glass-card p-6">
                <h4 className="text-sm font-semibold text-foreground mb-4">
                  Cross-Lingual Similarity
                </h4>

                <div className="space-y-3">
                  {languages.map((lang, idx) => {
                    const langSimilarity = 0.96 + Math.random() * 0.04;
                    return (
                      <motion.div
                        key={lang.lang}
                        className="flex items-center gap-3"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                      >
                        <span className="text-lg">{lang.flag}</span>
                        <div className="flex-1">
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-muted-foreground">
                              {lang.text}
                            </span>
                            <span className="text-primary font-bold">
                              {(langSimilarity * 100).toFixed(1)}%
                            </span>
                          </div>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <motion.div
                              className="h-full bg-gradient-to-r from-primary to-accent"
                              initial={{ width: 0 }}
                              animate={{ width: `${langSimilarity * 100}%` }}
                              transition={{ duration: 0.5, delay: idx * 0.1 }}
                            />
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Info */}
              <motion.div
                className="mt-4 glass-card p-4 bg-secondary/10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <div className="flex items-start gap-3">
                  <Brain className="w-5 h-5 text-secondary mt-0.5" />
                  <div className="text-xs text-muted-foreground">
                    <p className="font-semibold text-foreground mb-1">
                      Semantic Alignment Across Languages
                    </p>
                    <p>
                      The model learns to map semantically equivalent concepts to nearby points in
                      vector space, regardless of language. This enables cross-lingual search and
                      understanding without translation.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
