import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useIntroSequence } from "@/hooks/useIntroSequence";
import { useQueryTransition } from "@/hooks/useQueryTransition";
import { useNodeAttraction } from "@/hooks/useNodeAttraction";
import { DistanceTooltip } from "@/components/DistanceTooltip";

type RoleType = 'react' | 'python' | 'ml' | 'cloud' | 'java' | 'devops';

interface TalentBubble {
  id: string;
  name: string;
  role: string;
  location: string;
  x: number;
  y: number;
  type: "candidate" | "query";
  roleType?: RoleType;
  skillSet?: string[];
  availability?: boolean;
  cosineDistance?: number;
}

const syntheticData: TalentBubble[] = [
  {
    id: "1",
    name: "Ana S.",
    role: "React Developer",
    roleType: "react",
    location: "Madrid",
    x: 25,
    y: 30,
    skillSet: ["React", "TypeScript", "Next.js"],
    availability: true,
    type: "candidate"
  },
  {
    id: "2",
    name: "Luis M.",
    role: "Senior Python Engineer",
    roleType: "python",
    location: "Barcelona",
    x: 30,
    y: 45,
    skillSet: ["Python", "Django", "FastAPI", "PostgreSQL"],
    availability: true,
    type: "candidate"
  },
  {
    id: "3",
    name: "Julia R.",
    role: "Java Developer",
    roleType: "java",
    location: "Zurich",
    x: 65,
    y: 35,
    skillSet: ["Java", "Spring Boot", "Microservices"],
    availability: false,
    type: "candidate"
  },
  {
    id: "4",
    name: "Marco T.",
    role: "ML Engineer",
    roleType: "ml",
    location: "Berlin",
    x: 70,
    y: 55,
    skillSet: ["Python", "TensorFlow", "PyTorch", "MLOps"],
    availability: true,
    type: "candidate"
  },
  {
    id: "5",
    name: "Sara V.",
    role: "AWS Cloud Engineer",
    roleType: "cloud",
    location: "Lisbon",
    x: 45,
    y: 65,
    skillSet: ["AWS", "Terraform", "Kubernetes", "Docker"],
    availability: true,
    type: "candidate"
  },
  {
    id: "6",
    name: "Carlos P.",
    role: "React Developer",
    roleType: "react",
    location: "Valencia",
    x: 22,
    y: 38,
    skillSet: ["React", "Redux", "GraphQL"],
    availability: true,
    type: "candidate"
  },
  {
    id: "7",
    name: "Emma K.",
    role: "DevOps Engineer",
    roleType: "devops",
    location: "Munich",
    x: 55,
    y: 48,
    skillSet: ["GitLab CI", "Jenkins", "Docker", "Ansible"],
    availability: false,
    type: "candidate"
  },
  {
    id: "8",
    name: "Thomas W.",
    role: "Frontend Angular Dev",
    roleType: "react",
    location: "Vienna",
    x: 40,
    y: 25,
    skillSet: ["Angular", "TypeScript", "RxJS"],
    availability: true,
    type: "candidate"
  },
];

const queries = [
  { label: "Senior Python developers with 5+ years", x: 30, y: 45 },
  { label: "React developers in Spain", x: 23, y: 34 },
  { label: "Java developers in Zurich", x: 65, y: 35 },
  { label: "ML engineers available now", x: 70, y: 55 },
  { label: "AWS Cloud engineers", x: 45, y: 65 },
];

// Helper function to get role color
const getRoleColor = (roleType: RoleType | undefined): string => {
  if (!roleType) return '--primary';
  const colorMap: Record<RoleType, string> = {
    'react': '--role-react',
    'python': '--role-python',
    'ml': '--role-ml',
    'cloud': '--role-cloud',
    'java': '--role-java',
    'devops': '--role-devops'
  };
  return colorMap[roleType] || '--primary';
};

// Helper to calculate glow intensity based on distance
interface GlowLevel {
  distance: number;
  intensity: number;
  radius: number;
}

const GLOW_LEVELS: GlowLevel[] = [
  { distance: 15, intensity: 1.0, radius: 5.6 },
  { distance: 25, intensity: 0.6, radius: 4.2 },
  { distance: 35, intensity: 0.3, radius: 3.5 },
  { distance: Infinity, intensity: 0.1, radius: 2.8 }
];

const getGlowLevel = (distance: number): GlowLevel => {
  return GLOW_LEVELS.find(l => distance <= l.distance) || GLOW_LEVELS[GLOW_LEVELS.length - 1];
};

// ExplanationCard Component
interface ExplanationCardProps {
  queryText: string;
  resultCount: number;
  averageDistance: number;
  embeddingDimension?: number;
}

const ExplanationCard = ({
  queryText,
  resultCount,
  averageDistance,
  embeddingDimension = 1024
}: ExplanationCardProps) => {
  return (
    <motion.div
      className="explanation-card"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.4 }}
    >
      <h4 className="text-base font-semibold mb-3 text-accent">
        Why these {resultCount} results?
      </h4>
      <p className="text-sm text-muted-foreground leading-relaxed">
        These candidates are closest to your query
        <span className="font-mono text-primary"> "{queryText}" </span>
        in the <span className="font-semibold">{embeddingDimension}-dimensional</span> embedding
        space using <span className="font-semibold">cosine distance</span>.
        <br /><br />
        Closer positions = more semantically similar skills and experience.
      </p>
      <div className="mt-3 pt-3 border-t border-glass-border/30">
        <span className="text-sm text-muted-foreground">
          Avg. distance: <span className="font-mono text-accent">{averageDistance.toFixed(3)}</span>
        </span>
      </div>
    </motion.div>
  );
};

// How to Read Info Card Component
const HowToReadCard = () => {
  return (
    <motion.div
      className="info-card"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.0, duration: 0.4 }}
    >
      <h4 className="text-base font-semibold mb-3 text-accent flex items-center gap-2">
        <span>💡</span> How to read this view
      </h4>
      <div className="space-y-2 text-sm text-muted-foreground leading-relaxed">
        <p>
          <span className="font-semibold text-foreground">Your search query</span> is converted into an embedding vector and plotted as the large glowing bubble in the center.
        </p>
        <p>
          <span className="font-semibold text-foreground">Closer bubbles</span> represent candidates with more semantically similar skills and experience based on cosine distance in vector space.
        </p>
      </div>
    </motion.div>
  );
};

export const EmbeddingSpaceMap = () => {
  const [selectedQuery, setSelectedQuery] = useState(0);
  const [hoveredBubble, setHoveredBubble] = useState<string | null>(null);
  const [selectedNode, setSelectedNode] = useState<TalentBubble | null>(null);
  const [hoveredLine, setHoveredLine] = useState<string | null>(null);
  const [enabledRoles, setEnabledRoles] = useState<Set<RoleType>>(
    new Set(['react', 'python', 'ml', 'cloud', 'java', 'devops'])
  );

  // Animation hooks
  const { isStageActive } = useIntroSequence();
  const transition = useQueryTransition(selectedQuery);

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

  const averageDistance = useMemo(() => {
    const dist = nearestNeighbors.map(n => n.distance);
    return dist.reduce((a, b) => a + b, 0) / dist.length;
  }, [nearestNeighbors]);

  // Legend items for role filters
  const legendItems = [
    { role: 'react' as RoleType, color: '--role-react', label: 'React', icon: '⚛️', enabled: enabledRoles.has('react') },
    { role: 'python' as RoleType, color: '--role-python', label: 'Python', icon: '🐍', enabled: enabledRoles.has('python') },
    { role: 'ml' as RoleType, color: '--role-ml', label: 'ML/AI', icon: '🤖', enabled: enabledRoles.has('ml') },
    { role: 'cloud' as RoleType, color: '--role-cloud', label: 'Cloud', icon: '☁️', enabled: enabledRoles.has('cloud') },
    { role: 'java' as RoleType, color: '--role-java', label: 'Java', icon: '☕', enabled: enabledRoles.has('java') },
    { role: 'devops' as RoleType, color: '--role-devops', label: 'DevOps', icon: '⚙️', enabled: enabledRoles.has('devops') }
  ];

  // Filter toggle handler
  const handleFilterToggle = (role: RoleType) => {
    setEnabledRoles(prev => {
      const newSet = new Set(prev);
      if (newSet.has(role)) {
        newSet.delete(role);
      } else {
        newSet.add(role);
      }
      return newSet;
    });
  };

  // Filter visible nodes based on enabled roles
  const visibleNodes = useMemo(() => {
    return syntheticData.filter(node => node.roleType && enabledRoles.has(node.roleType));
  }, [enabledRoles]);

  // Use node attraction hook
  const attractedPositions = useNodeAttraction({
    selectedNode,
    neighbors: nearestNeighbors,
    enabled: selectedNode !== null
  });

  return (
    <section className="relative py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="glass-card p-10 mb-10 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
            Embedding Space Map – IT Talent Universe
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            A live semantic universe where IT talent positions reveal similarity. Closer = more semantically related.
          </p>

          <select
            value={selectedQuery}
            onChange={(e) => setSelectedQuery(Number(e.target.value))}
            className="glass-card px-6 py-3 text-base rounded-lg text-foreground bg-background/50 border border-glass-border focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {queries.map((q, idx) => (
              <option key={idx} value={idx}>
                {q.label}
              </option>
            ))}
          </select>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Legend Panel - Left Column */}
          <motion.div
            className="lg:col-span-3 glass-card p-6 h-fit sticky top-20"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-xl font-semibold mb-6 text-foreground">Role Types</h3>
            <div className="space-y-4">
              {legendItems.map(item => (
                <div key={item.role} className="flex items-center gap-3">
                  <div
                    className="w-5 h-5 rounded-full transition-opacity flex-shrink-0"
                    style={{
                      backgroundColor: `hsl(var(${item.color}))`,
                      opacity: item.enabled ? 1 : 0.3,
                      boxShadow: item.enabled ? `0 0 12px hsl(var(${item.color}) / 0.5)` : 'none'
                    }}
                  />
                  <span className={`text-base flex-1 transition-opacity ${item.enabled ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
                    {item.icon} {item.label}
                  </span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={item.enabled}
                      onChange={() => handleFilterToggle(item.role)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-muted/30 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary/60"></div>
                  </label>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-6 border-t border-glass-border/30">
              <button
                onClick={() => {
                  legendItems.forEach(item => {
                    if (item.enabled !== enabledRoles.has(item.role)) {
                      handleFilterToggle(item.role);
                    }
                  });
                }}
                className="text-sm text-accent hover:text-primary transition-colors font-medium"
              >
                Toggle All
              </button>
            </div>

            {/* Legend Caption */}
            <div className="mt-6 pt-6 border-t border-glass-border/30">
              <p className="text-sm text-muted-foreground leading-relaxed">
                <span className="font-semibold text-foreground">Numbered bubbles (1, 2, 3)</span> are the top matches.
                <br /><br />
                <span className="font-semibold text-foreground">Brighter glow</span> = closer semantic distance to your query.
              </p>
            </div>
          </motion.div>

          {/* Map Canvas - Middle Column */}
          <motion.div
            className="lg:col-span-6 glass-card p-12 relative h-[800px] overflow-hidden flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <svg
              className="w-full h-full relative"
              viewBox="0 0 100 100"
              style={{
                filter: transition.phase === 'blurOut' ? 'blur(8px)' : 'blur(0px)',
                opacity: transition.phase === 'blurOut' ? 0.4 : 1,
                transition: 'filter 0.3s ease-out, opacity 0.3s ease-out'
              }}
            >
              <AnimatePresence>
                {nearestNeighbors.map((neighbor, idx) => {
                  const midpoint = {
                    x: (queryBubble.x + neighbor.x) / 2,
                    y: (queryBubble.y + neighbor.y) / 2
                  };
                  const lineId = `line-${neighbor.id}`;
                  const isHovered = hoveredLine === lineId;

                  return (
                    <g key={neighbor.id}>
                      <motion.line
                        x1={queryBubble.x}
                        y1={queryBubble.y}
                        x2={neighbor.x}
                        y2={neighbor.y}
                        stroke="hsl(var(--glow-cyan))"
                        strokeWidth={isHovered ? "0.8" : "0.4"}
                        strokeDasharray="1 1"
                        className="cursor-pointer"
                        onMouseEnter={() => setHoveredLine(lineId)}
                        onMouseLeave={() => setHoveredLine(null)}
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{
                          pathLength: isStageActive('lines') ? 1 : 0,
                          opacity: isStageActive('lines') ? (isHovered ? 1 : 0.6) : 0
                        }}
                        exit={{ pathLength: 0, opacity: 0 }}
                        transition={{
                          duration: 0.8,
                          delay: 2.2 + idx * 0.15,
                          ease: "easeOut",
                          opacity: { duration: 0.2 }
                        }}
                      />
                      <DistanceTooltip
                        distance={neighbor.distance}
                        position={midpoint}
                        visible={isHovered}
                      />
                    </g>
                  );
                })}
              </AnimatePresence>

              {visibleNodes.map((bubble, idx) => {
                const isNearest = nearestIds.has(bubble.id);
                const neighborRank = nearestNeighbors.findIndex(n => n.id === bubble.id);
                const isHovered = hoveredBubble === bubble.id;
                const shouldFade = hoveredBubble && !isHovered && !nearestIds.has(bubble.id);
                const isSelected = selectedNode?.id === bubble.id;

                const distance = calculateDistance(queryBubble.x, queryBubble.y, bubble.x, bubble.y);
                const glowLevel = getGlowLevel(distance);
                const roleColor = getRoleColor(bubble.roleType);

                // Get attracted position if node is a nearest neighbor and there's a selection
                const attractedPos = attractedPositions.get(bubble.id);
                const displayX = attractedPos?.x || bubble.x;
                const displayY = attractedPos?.y || bubble.y;

                return (
                  <g key={bubble.id}>
                    {/* Distance-based glow halo */}
                    <motion.circle
                      cx={displayX}
                      cy={displayY}
                      r={glowLevel.radius}
                      fill={`hsl(var(${roleColor}))`}
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: isStageActive('nodes') ? [
                          glowLevel.intensity * 0.2,
                          glowLevel.intensity * 0.5,
                          glowLevel.intensity * 0.2
                        ] : 0,
                        cx: displayX,
                        cy: displayY
                      }}
                      transition={{
                        opacity: { duration: 2, repeat: Infinity },
                        delay: 0.4 + idx * 0.1,
                        cx: { type: "spring", stiffness: 200, damping: 20 },
                        cy: { type: "spring", stiffness: 200, damping: 20 }
                      }}
                    />

                    {/* Main node with role color */}
                    <motion.circle
                      cx={displayX}
                      cy={displayY}
                      r="2.8"
                      fill={`hsl(var(${roleColor}) / 0.3)`}
                      stroke={`hsl(var(${roleColor}))`}
                      strokeWidth={isSelected ? "0.7" : "0.4"}
                      className="cursor-pointer"
                      onMouseEnter={() => setHoveredBubble(bubble.id)}
                      onMouseLeave={() => setHoveredBubble(null)}
                      onClick={() => setSelectedNode(selectedNode?.id === bubble.id ? null : bubble)}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{
                        scale: isStageActive('nodes') ? (isHovered || isSelected ? 1.8 : 1) : 0,
                        opacity: isStageActive('nodes') ? (shouldFade ? 0.25 : 1) : 0,
                        y: isStageActive('nodes') ? [displayY, displayY - 0.5, displayY] : displayY,
                        cx: displayX,
                        cy: displayY
                      }}
                      transition={{
                        scale: {
                          duration: isStageActive('nodes') ? 0.3 : 0.5,
                          delay: 0.4 + idx * 0.1,
                          type: "spring",
                          stiffness: 150,
                          damping: 12
                        },
                        opacity: { duration: 0.4, delay: 0.4 + idx * 0.1 },
                        y: {
                          duration: 3 + idx * 0.3,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 0.4 + idx * 0.1
                        },
                        cx: { type: "spring", stiffness: 200, damping: 20 },
                        cy: { type: "spring", stiffness: 200, damping: 20 }
                      }}
                      whileHover={{ scale: 2 }}
                    />

                    {/* Numeric badge for top 3 neighbors */}
                    {isNearest && neighborRank >= 0 && (
                      <g>
                        {/* Badge background circle */}
                        <motion.circle
                          cx={displayX + 4}
                          cy={displayY - 4}
                          r="2.2"
                          fill="hsl(var(--accent))"
                          stroke="hsl(var(--background))"
                          strokeWidth="0.4"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 2.8 + neighborRank * 0.1, type: "spring", stiffness: 200 }}
                        />
                        {/* Badge number */}
                        <motion.text
                          x={displayX + 4}
                          y={displayY - 3.2}
                          textAnchor="middle"
                          className="text-[2px] font-bold fill-background"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 2.9 + neighborRank * 0.1 }}
                        >
                          {neighborRank + 1}
                        </motion.text>
                      </g>
                    )}

                    <AnimatePresence>
                      {isHovered && (
                        <motion.g
                          initial={{ opacity: 0, y: 2 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 2 }}
                          transition={{ duration: 0.2 }}
                        >
                          <rect
                            x={bubble.x - 11}
                            y={bubble.y - 13}
                            width="22"
                            height="10"
                            rx="1.2"
                            fill="hsl(var(--background))"
                            stroke="hsl(var(--glass-border))"
                            strokeWidth="0.3"
                            opacity="0.95"
                            filter="drop-shadow(0 0 2px hsl(var(--glow-cyan)))"
                          />
                          <text
                            x={bubble.x}
                            y={bubble.y - 9.5}
                            textAnchor="middle"
                            className="text-[2px] font-semibold fill-foreground"
                          >
                            {bubble.name}
                          </text>
                          <text
                            x={bubble.x}
                            y={bubble.y - 7}
                            textAnchor="middle"
                            className="text-[1.5px] fill-muted-foreground"
                          >
                            {bubble.role}
                          </text>
                          <text
                            x={bubble.x}
                            y={bubble.y - 5}
                            textAnchor="middle"
                            className="text-[1.4px] fill-muted-foreground"
                          >
                            {bubble.location}
                          </text>
                        </motion.g>
                      )}
                    </AnimatePresence>
                  </g>
                );
              })}

              {/* Enhanced Query Bubble */}
              <g>
                {/* Outer pulsating glow */}
                <motion.circle
                  cx={queryBubble.x}
                  cy={queryBubble.y}
                  r="7"
                  fill="hsl(var(--glow-cyan))"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: isStageActive('query') ? [0.2, 0.5, 0.2] : 0,
                    scale: isStageActive('query') ? 1 : 0
                  }}
                  transition={{
                    opacity: { duration: 1.5, repeat: Infinity },
                    scale: { delay: 1.8, type: "spring", stiffness: 100 }
                  }}
                />

                {/* Middle glow ring */}
                <motion.circle
                  cx={queryBubble.x}
                  cy={queryBubble.y}
                  r="4.9"
                  fill="hsl(var(--accent))"
                  opacity="0.4"
                  initial={{ scale: 0 }}
                  animate={{ scale: isStageActive('query') ? 1 : 0 }}
                  transition={{ delay: 1.9, type: "spring", stiffness: 120 }}
                />

                {/* Core node */}
                <motion.circle
                  cx={queryBubble.x}
                  cy={queryBubble.y}
                  r="3.5"
                  fill="hsl(var(--accent))"
                  stroke="hsl(var(--glow-cyan))"
                  strokeWidth="0.6"
                  initial={{ scale: 0 }}
                  animate={{ scale: isStageActive('query') ? 1 : 0 }}
                  transition={{ delay: 2.0, type: "spring", stiffness: 200, damping: 15 }}
                />

                {/* Query label above bubble */}
                <motion.text
                  x={queryBubble.x}
                  y={queryBubble.y - 10}
                  textAnchor="middle"
                  className="text-[2px] font-bold fill-accent"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isStageActive('query') ? 1 : 0 }}
                  transition={{ delay: 2.4 }}
                >
                  Query: "{queries[selectedQuery].label}"
                </motion.text>
              </g>
            </svg>

            {/* Map Caption */}
            <motion.div
              className="mt-4 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.0, duration: 0.4 }}
            >
              <p className="text-sm text-muted-foreground">
                The large glowing bubble is your search query as an embedding in vector space.
              </p>
            </motion.div>
          </motion.div>

          {/* Nearest Neighbors - Right Column */}
          <motion.div
            className="lg:col-span-3 glass-card p-8 sticky-sidebar"
            initial={{ opacity: 0, x: 100, filter: "blur(10px)" }}
            animate={{
              opacity: isStageActive('sidebar') ? 1 : 0,
              x: isStageActive('sidebar') ? 0 : 100,
              filter: isStageActive('sidebar') ? "blur(0px)" : "blur(10px)"
            }}
            transition={{
              delay: 2.6,
              duration: 0.6,
              ease: [0.4, 0, 0.2, 1]
            }}
          >
            <h3 className="text-2xl font-semibold mb-6 text-foreground">
              Nearest Neighbors
            </h3>
            <div className="space-y-4">
              {nearestNeighbors.map((neighbor, idx) => {
                const isHovered = hoveredBubble === neighbor.id;
                return (
                  <motion.div
                    key={neighbor.id}
                    className={`p-5 rounded-lg transition-all cursor-pointer ${
                      isHovered
                        ? 'bg-accent/20 ring-2 ring-accent shadow-lg'
                        : 'bg-muted/30 hover:bg-muted/50'
                    }`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + idx * 0.1 }}
                    onMouseEnter={() => setHoveredBubble(neighbor.id)}
                    onMouseLeave={() => setHoveredBubble(null)}
                  >
                    <div className="flex items-start gap-3">
                      {/* Rank Badge */}
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent flex items-center justify-center">
                        <span className="text-background font-bold text-base">{idx + 1}</span>
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-foreground text-base">
                          {neighbor.name}
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">{neighbor.role}</div>
                        <div className="text-sm text-muted-foreground">{neighbor.location}</div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <ExplanationCard
              queryText={queries[selectedQuery].label}
              resultCount={nearestNeighbors.length}
              averageDistance={averageDistance}
            />

            <HowToReadCard />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
