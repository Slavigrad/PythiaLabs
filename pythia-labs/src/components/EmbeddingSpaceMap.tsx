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
    x: 32,
    y: 46,
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
    x: 67,
    y: 36,
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
    x: 72,
    y: 56,
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
    x: 47,
    y: 66,
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
        Your query <span className="font-mono text-primary">"{queryText}"</span> was converted
        into a <span className="font-semibold">{embeddingDimension}-dimensional</span> vector
        (the large central bubble).
        <br /><br />
        These {resultCount} candidates are the <span className="font-semibold text-foreground">closest to your query</span> in
        embedding space using <span className="font-semibold">cosine distance</span>.
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

/**
 * ==============================================================================
 * EMBEDDING SPACE MAP - UX BEHAVIOR GUIDE
 * ==============================================================================
 *
 * This visualization makes semantic similarity "drunk-proof" by using clear visual hierarchy.
 *
 * VISUAL HIERARCHY (from most to least important):
 * ---------------------------------------------------
 * 1. **Query Bubble (Center)**: Large central bubble with REDUCED glow (~35% less than before)
 *    - Purpose: Represents the user's search query in embedding space
 *    - Visual: Big size, moderate glow, labeled "Query: [text]"
 *    - Never receives a rank badge
 *
 * 2. **Top 3 Results**: Bubbles with numeric badges (1, 2, 3)
 *    - Purpose: The 3 nearest neighbors to the query
 *    - Visual: Rank badges (teal pills) at top-right of bubble
 *    - Connected to query with thin cyan lines
 *    - Badge color: neutral teal (NOT role colors) to avoid confusion
 *
 * 3. **Other Candidates**: All remaining visible bubbles
 *    - Purpose: Show broader landscape of talent
 *    - Visual: Normal size, glow based on distance
 *    - No rank badges, no connector lines
 *
 * BIDIRECTIONAL HOVER SYNC (Map ↔ Sidebar):
 * ---------------------------------------------------
 * When hovering ANY of these:
 *   - A bubble on the map
 *   - Its corresponding sidebar card
 *   - The connector line
 *
 * ALL of these highlight simultaneously:
 *   ✓ The bubble scales up and glows
 *   ✓ The sidebar card gets teal ring and background
 *   ✓ The connector line becomes brighter
 *   ✓ All non-top-3 bubbles dim to 20% opacity
 *
 * DIMMING LOGIC:
 * ---------------------------------------------------
 * - When NO hover: All bubbles at 100% opacity
 * - When hovering ANY top-3 bubble or sidebar card:
 *   - Focused bubble: 100% opacity, scaled 1.8x
 *   - Other top-3 bubbles: 100% opacity (normal)
 *   - Non-top-3 bubbles: 20% opacity (dimmed)
 *
 * COLOR MEANINGS (kept separate for clarity):
 * ---------------------------------------------------
 * - **Role Colors** (React, Python, Java, etc.): Bubble fill and glow
 * - **Rank Badge Color** (Teal): Independent of role, purely for ranking
 * - **Glow Intensity**: Represents semantic distance (closer = brighter)
 *
 * HOW USERS SHOULD READ THIS:
 * ---------------------------------------------------
 * 1. Big central bubble = your search query
 * 2. Numbered bubbles (1, 2, 3) = top matches
 * 3. Lines = relationship between query and results
 * 4. Color = role type
 * 5. Glow + distance = semantic similarity
 *
 * EXAMPLE WALKTHROUGH ("Java developers in Zurich"):
 * ---------------------------------------------------
 * 1. Large glowing bubble in center labeled "Query: Java developers in Zurich"
 * 2. Three bubbles nearby with badges "1", "2", "3" (Julia R., Emma K., Marco T.)
 * 3. Thin cyan lines connecting query to these 3 bubbles
 * 4. Hover Julia R.'s bubble → her sidebar card highlights, line brightens, others dim
 * 5. Hover Emma K.'s sidebar card → her bubble scales up, line brightens, others dim
 * ==============================================================================
 */

// How to Read Info Card Component - Drunk-proof numbered steps
const HowToReadCard = () => {
  return (
    <motion.div
      className="info-card"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.0, duration: 0.4 }}
    >
      <h4 className="text-base font-semibold mb-3 text-accent flex items-center gap-2">
        <span>💡</span> How to read this visualization
      </h4>
      <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
        <p>
          <span className="font-bold text-foreground">1. Big central bubble</span> = your search query
        </p>
        <p>
          <span className="font-bold text-foreground">2. Numbered bubbles (1, 2, 3)</span> = the top 3 matches to your query
        </p>
        <p>
          <span className="font-bold text-foreground">3. Lines connecting them</span> = showing the relationship between query and results
        </p>
        <p>
          <span className="font-bold text-foreground">4. Bubble color</span> = role type (React, Python, Java, etc.)
        </p>
        <p>
          <span className="font-bold text-foreground">5. Glow intensity + distance</span> = how semantically close the candidate is in embedding space
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
  // Track which sidebar card is being hovered (by rank index 0-2, or null)
  const [hoveredSidebarRank, setHoveredSidebarRank] = useState<number | null>(null);
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

            {/* Legend Caption - Crystal clear explanation */}
            <div className="mt-6 pt-6 border-t border-glass-border/30">
              <h4 className="text-sm font-bold text-foreground mb-3">How to read the map:</h4>
              <div className="space-y-2 text-sm text-muted-foreground leading-relaxed">
                <p>
                  <span className="font-semibold text-foreground">Large central bubble</span> = your search query
                </p>
                <p>
                  <span className="font-semibold text-foreground">Numbered bubbles (1, 2, 3)</span> = top matches
                </p>
                <p>
                  <span className="font-semibold text-foreground">Bubble color</span> = role type
                </p>
                <p>
                  <span className="font-semibold text-foreground">Brighter glow + closer distance</span> = more semantically similar
                </p>
              </div>
            </div>
          </motion.div>

          {/* Map Canvas - Middle Column */}
          <motion.div
            className="lg:col-span-6 glass-card p-12 relative h-[800px] overflow-hidden flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {/* Fixed Tooltip Area at Top Center - Always reserves space */}
            <div className="mx-auto mb-4 px-6 py-4 rounded-xl bg-background/80 backdrop-blur-md border border-accent/30 shadow-lg min-h-[100px] flex items-center justify-center"
              style={{
                boxShadow: hoveredBubble
                  ? '0 0 20px hsl(var(--glow-cyan) / 0.3), 0 4px 12px rgba(0,0,0,0.4)'
                  : '0 0 10px hsl(var(--glow-cyan) / 0.1), 0 2px 8px rgba(0,0,0,0.2)'
              }}
            >
              <AnimatePresence mode="wait">
                {hoveredBubble ? (() => {
                  // Find the hovered bubble data
                  const hoveredData = syntheticData.find(b => b.id === hoveredBubble);
                  if (!hoveredData) return null;

                  // Calculate distance for display
                  const distance = calculateDistance(
                    queryBubble.x,
                    queryBubble.y,
                    hoveredData.x,
                    hoveredData.y
                  );

                  return (
                    <motion.div
                      key={hoveredBubble}
                      className="flex flex-col items-center gap-1 w-full"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                    >
                      <h4 className="text-lg font-bold text-foreground">
                        {hoveredData.name}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {hoveredData.role}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {hoveredData.location}
                      </p>
                      <p className="text-xs text-accent font-mono mt-1">
                        Distance: {distance.toFixed(2)}
                      </p>
                    </motion.div>
                  );
                })() : (
                  <motion.p
                    key="placeholder"
                    className="text-sm text-muted-foreground/50 italic"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    Hover over a candidate bubble to see details
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            <svg
              className="w-full h-full relative"
              viewBox="0 0 100 100"
              style={{
                filter: transition.phase === 'blurOut' ? 'blur(8px)' : 'blur(0px)',
                opacity: transition.phase === 'blurOut' ? 0.4 : 1,
                transition: 'filter 0.3s ease-out, opacity 0.3s ease-out'
              }}
            >
              {/* Connector lines from query to top 3 neighbors - highlight on map or sidebar hover */}
              <AnimatePresence>
                {nearestNeighbors.map((neighbor, idx) => {
                  const midpoint = {
                    x: (queryBubble.x + neighbor.x) / 2,
                    y: (queryBubble.y + neighbor.y) / 2
                  };
                  const lineId = `line-${neighbor.id}`;
                  // Line is highlighted if: hovering the line itself, hovering the bubble, or hovering the sidebar card
                  const isHovered = hoveredLine === lineId ||
                                   hoveredBubble === neighbor.id ||
                                   hoveredSidebarRank === idx;

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
                          opacity: isStageActive('lines') ? (isHovered ? 1 : 0.5) : 0
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

              {/* Candidate bubbles with bidirectional hover sync (map ↔ sidebar) */}
              {visibleNodes.map((bubble, idx) => {
                const isNearest = nearestIds.has(bubble.id);
                const neighborRank = nearestNeighbors.findIndex(n => n.id === bubble.id);
                // Bubble is highlighted if: directly hovered OR its sidebar card is hovered
                const isHovered = hoveredBubble === bubble.id ||
                                 (isNearest && hoveredSidebarRank === neighborRank);
                // Dim non-top-3 bubbles when ANY top-3 bubble or sidebar card is being hovered
                const anyTop3Hovered = hoveredBubble !== null && nearestIds.has(hoveredBubble) ||
                                      hoveredSidebarRank !== null;
                const shouldFade = anyTop3Hovered && !isHovered && !nearestIds.has(bubble.id);
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
                        opacity: isStageActive('nodes') ? (shouldFade ? 0.2 : 1) : 0,
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
                  </g>
                );
              })}

              {/* Enhanced Query Bubble - De-emphasized to avoid confusion with ranked results */}
              <g>
                {/* Outer pulsating glow - reduced intensity by ~35% to clarify this is the query, not a result */}
                <motion.circle
                  cx={queryBubble.x}
                  cy={queryBubble.y}
                  r="7"
                  fill="hsl(var(--glow-cyan))"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: isStageActive('query') ? [0.12, 0.3, 0.12] : 0,
                    scale: isStageActive('query') ? 1 : 0
                  }}
                  transition={{
                    opacity: { duration: 1.5, repeat: Infinity },
                    scale: { delay: 1.8, type: "spring", stiffness: 100 }
                  }}
                />

                {/* Middle glow ring - reduced opacity */}
                <motion.circle
                  cx={queryBubble.x}
                  cy={queryBubble.y}
                  r="4.9"
                  fill="hsl(var(--accent))"
                  opacity="0.25"
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

            {/* Map Caption - Explicit explanation */}
            <motion.div
              className="mt-4 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.0, duration: 0.4 }}
            >
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">Large central bubble</span> = your search query as an embedding.{' '}
                <span className="font-semibold text-foreground">Numbered bubbles around it</span> = the top 3 matching candidates.
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
            {/* Nearest Neighbors list with bidirectional hover sync */}
            <div className="space-y-4">
              {nearestNeighbors.map((neighbor, idx) => {
                // Card is highlighted if: its bubble is hovered OR the card itself is hovered
                const isHovered = hoveredBubble === neighbor.id || hoveredSidebarRank === idx;
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
                    onMouseEnter={() => {
                      setHoveredBubble(neighbor.id);
                      setHoveredSidebarRank(idx);
                    }}
                    onMouseLeave={() => {
                      setHoveredBubble(null);
                      setHoveredSidebarRank(null);
                    }}
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
