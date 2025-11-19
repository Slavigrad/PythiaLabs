import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Zap, Brain, Binary } from "lucide-react";
import { useEffect, useState } from "react";

type PipelineStage = 'idle' | 'query-input' | 'transforming' | 'embedding' | 'vector-output' | 'complete';

export const EmbeddingPipelineVisualization = ({ isPlaying }: { isPlaying: boolean }) => {
  const [stage, setStage] = useState<PipelineStage>('idle');
  const [displayedQuery, setDisplayedQuery] = useState("");
  const [displayedVector, setDisplayedVector] = useState<number[]>([]);

  const query = "Senior React developer";

  // Realistic embedding vector (first 12 dimensions of a 1024-dimensional vector)
  const fullVector = [
    0.019974178, 0.008444585, -0.022033796, 0.015234891,
    -0.031245678, 0.042156789, -0.008912345, 0.025678901,
    0.033456789, -0.019876543, 0.011234567, -0.028901234
  ];

  useEffect(() => {
    if (!isPlaying) {
      setStage('idle');
      setDisplayedQuery("");
      setDisplayedVector([]);
      return;
    }

    const runPipeline = async () => {
      // Stage 1: Query Input with typewriter effect (slower for dramatic effect)
      setStage('query-input');
      for (let i = 0; i <= query.length; i++) {
        setDisplayedQuery(query.slice(0, i));
        await new Promise(resolve => setTimeout(resolve, 80));
      }

      // Hold on the query so people can read it
      await new Promise(resolve => setTimeout(resolve, 1200));

      // Stage 2: Transforming (particles flowing)
      setStage('transforming');
      await new Promise(resolve => setTimeout(resolve, 2500));

      // Stage 3: Embedding model processing (the brain thinking)
      setStage('embedding');
      await new Promise(resolve => setTimeout(resolve, 3500));

      // Stage 4: Vector output with cascading numbers (slower reveal)
      setStage('vector-output');
      for (let i = 0; i <= fullVector.length; i++) {
        setDisplayedVector(fullVector.slice(0, i));
        await new Promise(resolve => setTimeout(resolve, 200));
      }

      // Hold on the vector output so people can see the numbers
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Stage 5: Complete - and STAY HERE so they can appreciate it!
      setStage('complete');
      // NO auto-close! Let them savor the masterpiece
    };

    runPipeline();
  }, [isPlaying]);

  if (!isPlaying && stage === 'idle') {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="glass-card p-8 mb-8"
    >
      <div className="space-y-8">
        {/* Query Input Stage */}
        <AnimatePresence mode="wait">
          {(stage === 'query-input' || stage === 'transforming' || stage === 'embedding' || stage === 'vector-output' || stage === 'complete') && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-3"
            >
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Sparkles className="w-4 h-4 text-primary" />
                <span>Input Query</span>
              </div>

              <motion.div
                className="glass-card p-6 bg-primary/5 border-primary/30"
                animate={stage === 'query-input' ? {
                  boxShadow: [
                    '0 0 20px rgba(6, 182, 212, 0.3)',
                    '0 0 40px rgba(6, 182, 212, 0.5)',
                    '0 0 20px rgba(6, 182, 212, 0.3)',
                  ]
                } : {}}
                transition={{ duration: 2, repeat: stage === 'query-input' ? Infinity : 0 }}
              >
                <div className="font-mono text-2xl text-primary font-semibold">
                  "{displayedQuery}"
                  {stage === 'query-input' && (
                    <motion.span
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                      className="ml-1"
                    >
                      |
                    </motion.span>
                  )}
                </div>
                {stage !== 'query-input' && displayedQuery && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-xs text-muted-foreground mt-2"
                  >
                    Natural language text
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Transformation Flow */}
        <AnimatePresence>
          {stage === 'transforming' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center py-4"
            >
              <div className="relative">
                {/* Flowing particles */}
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-primary to-accent"
                    initial={{
                      x: -20,
                      y: 0,
                      opacity: 0
                    }}
                    animate={{
                      x: [0, 50, 100],
                      y: [0, Math.sin(i) * 30, 0],
                      opacity: [0, 1, 0]
                    }}
                    transition={{
                      duration: 1.5,
                      delay: i * 0.1,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                ))}
                <Zap className="w-8 h-8 text-accent relative z-10" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Embedding Model Stage */}
        <AnimatePresence>
          {(stage === 'embedding' || stage === 'vector-output' || stage === 'complete') && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-3"
            >
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Brain className="w-4 h-4 text-secondary" />
                <span>Embedding Model</span>
              </div>

              <motion.div
                className="glass-card p-6 bg-secondary/5 border-secondary/30 relative overflow-hidden"
                animate={stage === 'embedding' ? {
                  boxShadow: [
                    '0 0 20px rgba(147, 51, 234, 0.3)',
                    '0 0 40px rgba(147, 51, 234, 0.5)',
                    '0 0 20px rgba(147, 51, 234, 0.3)',
                  ]
                } : {}}
                transition={{ duration: 2, repeat: stage === 'embedding' ? Infinity : 0 }}
              >
                {/* Neural network visualization */}
                <div className="absolute inset-0 opacity-20">
                  {stage === 'embedding' && (
                    <>
                      {[...Array(8)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-secondary to-transparent"
                          initial={{ scaleX: 0, opacity: 0 }}
                          animate={{
                            scaleX: [0, 1, 0],
                            opacity: [0, 1, 0]
                          }}
                          transition={{
                            duration: 1.5,
                            delay: i * 0.2,
                            repeat: Infinity,
                          }}
                          style={{ top: `${20 + i * 10}%` }}
                        />
                      ))}
                    </>
                  )}
                </div>

                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-3">
                    <motion.div
                      animate={stage === 'embedding' ? {
                        rotate: 360,
                      } : {}}
                      transition={{ duration: 2, repeat: stage === 'embedding' ? Infinity : 0, ease: "linear" }}
                    >
                      <Brain className="w-8 h-8 text-secondary" />
                    </motion.div>
                    <div>
                      <div className="font-semibold text-secondary text-lg">E5-Large-Instruct</div>
                      <div className="text-xs text-muted-foreground">Multilingual embedding model</div>
                    </div>
                  </div>

                  <div className="flex gap-2 items-center">
                    <span className="glass-card px-3 py-1 text-xs font-mono bg-secondary/20 text-secondary">
                      1024 dimensions
                    </span>
                    <span className="glass-card px-3 py-1 text-xs font-mono bg-accent/20 text-accent">
                      f16 precision
                    </span>
                    {stage === 'embedding' && (
                      <motion.span
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="glass-card px-3 py-1 text-xs font-mono bg-primary/20 text-primary"
                      >
                        ⚡ Processing...
                      </motion.span>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Vector Output Stage */}
        <AnimatePresence>
          {(stage === 'vector-output' || stage === 'complete') && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-3"
            >
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Binary className="w-4 h-4 text-accent" />
                <span>Vector Embedding Output</span>
              </div>

              <motion.div
                className="glass-card p-6 bg-accent/5 border-accent/30 font-mono text-sm overflow-hidden"
              >
                <div className="text-accent/70 mb-2">
                  <span className="text-muted-foreground">// 1024-dimensional vector (showing first 12)</span>
                </div>

                <div className="text-accent">
                  <span className="text-accent/70">[</span>
                  <div className="pl-4 space-y-1">
                    {displayedVector.map((num, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                      >
                        <motion.span
                          animate={{
                            textShadow: [
                              '0 0 0px rgba(34, 211, 238, 0)',
                              '0 0 10px rgba(34, 211, 238, 0.5)',
                              '0 0 0px rgba(34, 211, 238, 0)',
                            ]
                          }}
                          transition={{ duration: 2, delay: i * 0.1 }}
                          className="text-accent font-semibold"
                        >
                          {num.toFixed(9)}
                        </motion.span>
                        <span className="text-accent/50">,</span>
                      </motion.div>
                    ))}
                    {displayedVector.length === fullVector.length && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-accent/50"
                      >
                        ... {/* + 1012 more dimensions */}
                      </motion.div>
                    )}
                  </div>
                  <span className="text-accent/70">]</span>
                </div>

                {stage === 'complete' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mt-4 pt-4 border-t border-accent/20 text-xs text-muted-foreground"
                  >
                    ✨ Each number captures semantic meaning in high-dimensional space
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Complete message */}
        <AnimatePresence>
          {stage === 'complete' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-4"
            >
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 glass-card px-6 py-3 bg-gradient-to-r from-primary/20 via-accent/20 to-secondary/20"
              >
                <Sparkles className="w-5 h-5 text-primary" />
                <span className="font-semibold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                  Text → Vector Transformation Complete!
                </span>
                <Sparkles className="w-5 h-5 text-secondary" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
