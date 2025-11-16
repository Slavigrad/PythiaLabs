import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TalentBubble {
  id: string;
  name: string;
  role: string;
  location: string;
  x: number;
  y: number;
  type: "candidate" | "query";
}

const syntheticData: TalentBubble[] = [
  { id: "1", name: "Ana S.", role: "React Developer", location: "Madrid", x: 25, y: 30, type: "candidate" },
  { id: "2", name: "Luis M.", role: "Senior Python Engineer", location: "Barcelona", x: 30, y: 45, type: "candidate" },
  { id: "3", name: "Julia R.", role: "Java Developer", location: "Zurich", x: 65, y: 35, type: "candidate" },
  { id: "4", name: "Marco T.", role: "ML Engineer", location: "Berlin", x: 70, y: 55, type: "candidate" },
  { id: "5", name: "Sara V.", role: "AWS Cloud Engineer", location: "Lisbon", x: 45, y: 65, type: "candidate" },
  { id: "6", name: "Carlos P.", role: "React Developer", location: "Valencia", x: 22, y: 38, type: "candidate" },
  { id: "7", name: "Emma K.", role: "DevOps Engineer", location: "Munich", x: 55, y: 48, type: "candidate" },
  { id: "8", name: "Thomas W.", role: "Frontend Angular Dev", location: "Vienna", x: 40, y: 25, type: "candidate" },
];

const queries = [
  { label: "Senior Python developers with 5+ years", x: 30, y: 45 },
  { label: "React developers in Spain", x: 23, y: 34 },
  { label: "Java developers in Zurich", x: 65, y: 35 },
  { label: "ML engineers available now", x: 70, y: 55 },
  { label: "AWS Cloud engineers", x: 45, y: 65 },
];

export const EmbeddingSpaceMap = () => {
  const [selectedQuery, setSelectedQuery] = useState(0);
  const [hoveredBubble, setHoveredBubble] = useState<string | null>(null);

  const queryBubble: TalentBubble = {
    id: "query",
    name: "Query",
    role: queries[selectedQuery].label,
    location: "",
    x: queries[selectedQuery].x,
    y: queries[selectedQuery].y,
    type: "query",
  };

  const calculateDistance = (x1: number, y1: number, x2: number, y2: number) => {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  };

  const distances = syntheticData.map((bubble) => ({
    ...bubble,
    distance: calculateDistance(queryBubble.x, queryBubble.y, bubble.x, bubble.y),
  }));

  const nearestNeighbors = distances.sort((a, b) => a.distance - b.distance).slice(0, 3);
  const nearestIds = new Set(nearestNeighbors.map(n => n.id));

  return (
    <section className="relative py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="glass-card p-8 mb-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
            Embedding Space Map – IT Talent Universe
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
            A live semantic universe where IT talent positions reveal similarity. Closer = more semantically related.
          </p>
          
          <select
            value={selectedQuery}
            onChange={(e) => setSelectedQuery(Number(e.target.value))}
            className="glass-card px-4 py-2 rounded-lg text-foreground bg-background/50 border border-glass-border focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {queries.map((q, idx) => (
              <option key={idx} value={idx}>
                {q.label}
              </option>
            ))}
          </select>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div 
            className="lg:col-span-2 glass-card p-8 relative h-[600px] overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <svg className="w-full h-full relative" viewBox="0 0 100 100">
              <AnimatePresence>
                {nearestNeighbors.map((neighbor) => (
                  <motion.line
                    key={neighbor.id}
                    x1={queryBubble.x}
                    y1={queryBubble.y}
                    x2={neighbor.x}
                    y2={neighbor.y}
                    stroke="hsl(var(--glow-cyan))"
                    strokeWidth="0.3"
                    strokeDasharray="1 1"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.6 }}
                    exit={{ pathLength: 0, opacity: 0 }}
                    transition={{ duration: 0.8 }}
                  />
                ))}
              </AnimatePresence>

              {syntheticData.map((bubble, idx) => {
                const isNearest = nearestIds.has(bubble.id);
                const isHovered = hoveredBubble === bubble.id;
                const shouldFade = hoveredBubble && !isHovered && !nearestIds.has(bubble.id);

                return (
                  <g key={bubble.id}>
                    {isNearest && (
                      <motion.circle
                        cx={bubble.x}
                        cy={bubble.y}
                        r="3.5"
                        fill="hsl(var(--glow-cyan))"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0.2, 0.5, 0.2] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}
                    
                    <motion.circle
                      cx={bubble.x}
                      cy={bubble.y}
                      r="2"
                      fill="hsl(var(--primary) / 0.3)"
                      stroke="hsl(var(--primary))"
                      strokeWidth="0.3"
                      className="cursor-pointer"
                      onMouseEnter={() => setHoveredBubble(bubble.id)}
                      onMouseLeave={() => setHoveredBubble(null)}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ 
                        scale: isHovered ? 1.8 : 1,
                        opacity: shouldFade ? 0.4 : 1,
                        y: [bubble.y, bubble.y - 0.5, bubble.y]
                      }}
                      transition={{ 
                        scale: { duration: 0.3 },
                        opacity: { duration: 0.3 },
                        y: { duration: 3 + idx * 0.3, repeat: Infinity, ease: "easeInOut" },
                        delay: idx * 0.1 
                      }}
                      whileHover={{ scale: 2 }}
                    />

                    <AnimatePresence>
                      {isHovered && (
                        <motion.g
                          initial={{ opacity: 0, y: 2 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 2 }}
                          transition={{ duration: 0.2 }}
                        >
                          <rect
                            x={bubble.x - 8}
                            y={bubble.y - 10}
                            width="16"
                            height="7"
                            rx="1"
                            fill="hsl(var(--background))"
                            stroke="hsl(var(--glass-border))"
                            strokeWidth="0.2"
                            opacity="0.95"
                          />
                          <text
                            x={bubble.x}
                            y={bubble.y - 7.5}
                            textAnchor="middle"
                            className="text-[1.2px] font-semibold fill-foreground"
                          >
                            {bubble.name}
                          </text>
                          <text
                            x={bubble.x}
                            y={bubble.y - 5.5}
                            textAnchor="middle"
                            className="text-[0.9px] fill-muted-foreground"
                          >
                            {bubble.role}
                          </text>
                          <text
                            x={bubble.x}
                            y={bubble.y - 4}
                            textAnchor="middle"
                            className="text-[0.8px] fill-muted-foreground"
                          >
                            {bubble.location}
                          </text>
                        </motion.g>
                      )}
                    </AnimatePresence>
                  </g>
                );
              })}

              <motion.circle
                cx={queryBubble.x}
                cy={queryBubble.y}
                r="4"
                fill="hsl(var(--glow-cyan))"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.2, 0.5, 0.2] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <motion.circle
                cx={queryBubble.x}
                cy={queryBubble.y}
                r="2.5"
                fill="hsl(var(--accent))"
                stroke="hsl(var(--glow-cyan))"
                strokeWidth="0.4"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
              />
            </svg>
          </motion.div>

          <motion.div 
            className="glass-card p-6"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-xl font-semibold mb-4 text-foreground">
              Nearest Neighbors
            </h3>
            <div className="space-y-3">
              {nearestNeighbors.map((neighbor, idx) => (
                <motion.div
                  key={neighbor.id}
                  className="p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + idx * 0.1 }}
                >
                  <div className="font-medium text-foreground text-sm">
                    {neighbor.name} - {neighbor.role}
                  </div>
                  <div className="text-xs text-muted-foreground">{neighbor.location}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
