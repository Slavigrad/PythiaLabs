import { useState } from "react";
import { Database, Sparkles, TrendingUp, Cpu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { EmbeddingPipelineVisualization } from "./EmbeddingPipelineVisualization";

export const HowPythiaWorks = () => {
  const [playingPipeline, setPlayingPipeline] = useState(false);
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const steps = [
    {
      icon: Sparkles,
      title: "Text → Embedding",
      description: "Your search query is transformed into a 1024-dimensional vector using the E5 multilingual model. Each dimension captures semantic meaning.",
      detail: "Model processes 'Senior React developer' into mathematical representation",
      color: "primary",
    },
    {
      icon: Database,
      title: "Embedding → pgvector",
      description: "The embedding is stored in PostgreSQL with the pgvector extension, enabling lightning-fast vector similarity search at scale.",
      detail: "PostgreSQL handles millions of talent vectors efficiently",
      color: "accent",
    },
    {
      icon: TrendingUp,
      title: "pgvector → Semantic Ranking",
      description: "Cosine distance (<->) measures vector similarity (0-2 range). This is converted to a similarity score (0-1 range) where 1 means perfect match. Results are ranked automatically.",
      detail: "Similarity score formula: (1 - distance/2) → 1 is most similar",
      color: "secondary",
    },
    {
      icon: Cpu,
      title: "Model: E5-Large-Instruct",
      description: "jeffh/intfloat-multilingual-e5-large-instruct:f16 - A state-of-the-art embedding model running fully local.",
      detail: "1024 dimensions • Multilingual • Instruction-tuned",
      color: "primary",
    },
  ];

  const playPipeline = async () => {
    setPlayingPipeline(true);
    for (let i = 0; i < steps.length; i++) {
      setActiveStep(i);
      await new Promise(resolve => setTimeout(resolve, 1500));
    }
    setActiveStep(null);
    setPlayingPipeline(false);
  };

  return (
    <section className="relative py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          className="glass-card p-8 mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
            How Pythia Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
            A journey from text to semantic understanding, powered by state-of-the-art embeddings and vector databases.
          </p>
          
          <motion.button
            onClick={playPipeline}
            disabled={playingPipeline}
            className="glass-card px-6 py-3 rounded-xl font-semibold bg-gradient-to-r from-primary to-accent text-primary-foreground hover:shadow-lg hover:shadow-primary/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: playingPipeline ? 1 : 1.05 }}
            whileTap={{ scale: playingPipeline ? 1 : 0.95 }}
          >
            {playingPipeline ? "Playing Pipeline..." : "▶ Play the Pipeline"}
          </motion.button>
        </motion.div>

        {/* Visual Pipeline Representation */}
        <AnimatePresence>
          {playingPipeline && (
            <EmbeddingPipelineVisualization isPlaying={playingPipeline} />
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isActive = activeStep === idx;
            
            return (
              <motion.div
                key={idx}
                className={`glass-card p-8 glass-card-hover ${isActive ? 'ring-2 ring-primary shadow-lg shadow-primary/50' : ''}`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.6,
                  delay: idx * 0.15,
                  ease: "easeOut"
                }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-start gap-4">
                  <motion.div
                    className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      step.color === "primary"
                        ? "bg-primary/20"
                        : step.color === "accent"
                        ? "bg-accent/20"
                        : "bg-secondary/20"
                    }`}
                    animate={isActive ? {
                      scale: [1, 1.2, 1],
                      rotate: [0, 10, -10, 0]
                    } : {}}
                    transition={{ duration: 1 }}
                  >
                    <motion.div
                      animate={isActive ? {
                        rotate: 360
                      } : {}}
                      transition={{ duration: 1, ease: "easeInOut" }}
                    >
                      <Icon
                        className={`w-7 h-7 ${
                          step.color === "primary"
                            ? "text-primary"
                            : step.color === "accent"
                            ? "text-accent"
                            : "text-secondary"
                        }`}
                      />
                    </motion.div>
                  </motion.div>
                  <div className="flex-1">
                    <motion.h3 
                      className="text-xl font-semibold mb-2 text-foreground"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.15 + 0.2 }}
                    >
                      {idx + 1}. {step.title}
                    </motion.h3>
                    <motion.p 
                      className="text-sm text-muted-foreground mb-3 leading-relaxed"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.15 + 0.3 }}
                    >
                      {step.description}
                    </motion.p>
                    <motion.div 
                      className="glass-card p-3 bg-muted/30"
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.15 + 0.4 }}
                    >
                      <AnimatePresence mode="wait">
                        {isActive ? (
                          <motion.p
                            key="active"
                            className="text-xs text-foreground/80 font-mono"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                          >
                            {step.detail.split('').map((char, i) => (
                              <motion.span
                                key={i}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: i * 0.02 }}
                              >
                                {char}
                              </motion.span>
                            ))}
                          </motion.p>
                        ) : (
                          <motion.p
                            key="inactive"
                            className="text-xs text-foreground/80 font-mono"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                          >
                            💡 {step.detail}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </div>
                </div>

                {/* Pipeline flow indicator */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      className="mt-4 h-1 bg-gradient-to-r from-primary via-accent to-secondary rounded-full"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      exit={{ scaleX: 0 }}
                      transition={{ duration: 1.5 }}
                      style={{ transformOrigin: "left" }}
                    />
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        <motion.div 
          className="mt-12 glass-card p-8 text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <h3 className="text-2xl font-bold mb-4 text-foreground">Educational Demo Only</h3>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            This is a conceptual demonstration using synthetic, anonymous IT-HR scenarios. 
            All data is completely fictional and used for visualization purposes only. 
            The real Pythia platform processes actual talent profiles with full privacy and security.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
