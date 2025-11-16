import { motion, AnimatePresence } from "framer-motion";

interface DistanceTooltipProps {
  distance: number;
  position: { x: number; y: number };
  visible: boolean;
  format?: 'cosine' | 'euclidean' | 'normalized';
}

export const DistanceTooltip = ({
  distance,
  position,
  visible,
  format = 'cosine'
}: DistanceTooltipProps) => {
  if (!visible) return null;

  return (
    <AnimatePresence>
      <motion.g
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.2 }}
      >
        <rect
          x={position.x - 8}
          y={position.y - 3}
          width="16"
          height="5"
          rx="0.5"
          fill="hsl(var(--background))"
          stroke="hsl(var(--accent))"
          strokeWidth="0.2"
          opacity="0.95"
        />
        <text
          x={position.x}
          y={position.y}
          textAnchor="middle"
          className="distance-label"
        >
          {format}: {distance.toFixed(3)}
        </text>
      </motion.g>
    </AnimatePresence>
  );
};
