import { motion, AnimatePresence } from "framer-motion";

interface Vector {
  x: number;
  y: number;
}

interface DistanceArcProps {
  v1: Vector;
  v2: Vector;
  visible: boolean;
}

/**
 * Visual arc showing the Euclidean distance between two vectors
 * Only visible when Euclidean metric is selected
 */
export const DistanceArc = ({ v1, v2, visible }: DistanceArcProps) => {
  if (!visible) return null;

  const midX = (v1.x + v2.x) / 2;
  const midY = (v1.y + v2.y) / 2;

  return (
    <AnimatePresence>
      {visible && (
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Distance line connecting the two vectors */}
          <motion.line
            x1={v1.x}
            y1={10 - v1.y}
            x2={v2.x}
            y2={10 - v2.y}
            stroke="hsl(var(--accent))"
            strokeWidth="0.06"
            strokeDasharray="0.2 0.1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            exit={{ pathLength: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          />

          {/* Distance label */}
          <motion.text
            x={midX}
            y={10 - midY - 0.3}
            textAnchor="middle"
            className="text-[0.35px] fill-accent font-mono"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.4 }}
          >
            distance
          </motion.text>
        </motion.g>
      )}
    </AnimatePresence>
  );
};
