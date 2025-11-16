import { motion } from "framer-motion";

interface PresetCardProps {
  name: string;
  description: string;
  diagram: "similar" | "opposite" | "identical" | "random";
  onSelect: () => void;
  isActive?: boolean;
}

export const PresetCard = ({
  name,
  description,
  diagram,
  onSelect,
  isActive = false
}: PresetCardProps) => {
  return (
    <motion.button
      onClick={onSelect}
      className={`preset-card ${isActive ? 'preset-card-active' : ''}`}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Diagram visual */}
      <div className="preset-diagram mb-3">
        <PresetDiagram type={diagram} />
      </div>

      {/* Label */}
      <h4 className="text-base font-semibold mb-1">{name}</h4>

      {/* Description */}
      <p className="text-xs text-muted-foreground">{description}</p>
    </motion.button>
  );
};

// Diagram component
const PresetDiagram = ({ type }: { type: string }) => {
  switch (type) {
    case "similar":
      return (
        <svg viewBox="0 0 24 24" className="w-12 h-12 mx-auto">
          <motion.path
            d="M 4 12 L 16 10"
            stroke="hsl(var(--primary))"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5 }}
          />
          <motion.path
            d="M 4 12 L 18 12"
            stroke="hsl(var(--accent))"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          />
        </svg>
      );

    case "opposite":
      return (
        <svg viewBox="0 0 24 24" className="w-12 h-12 mx-auto">
          <motion.path
            d="M 4 12 L 16 4"
            stroke="hsl(var(--primary))"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
          />
          <motion.path
            d="M 4 12 L 16 20"
            stroke="hsl(var(--accent))"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.1 }}
          />
        </svg>
      );

    case "identical":
      return (
        <svg viewBox="0 0 24 24" className="w-12 h-12 mx-auto">
          <motion.path
            d="M 4 12 L 20 12"
            stroke="hsl(var(--primary))"
            strokeWidth="3"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
          />
          <motion.circle
            cx="20"
            cy="12"
            r="3"
            fill="hsl(var(--accent))"
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </svg>
      );

    case "random":
      return (
        <svg viewBox="0 0 24 24" className="w-12 h-12 mx-auto">
          <text
            x="12"
            y="16"
            textAnchor="middle"
            fontSize="20"
            fill="hsl(var(--accent))"
            fontWeight="bold"
          >
            ?
          </text>
        </svg>
      );

    default:
      return null;
  }
};
