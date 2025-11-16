import { motion, AnimatePresence } from "framer-motion";

interface Vector {
  x: number;
  y: number;
}

interface VectorHandleProps {
  vector: Vector;
  color: string;
  label: string;
  isDragging: boolean;
  isHovering: boolean;
  onDragStart: () => void;
  onDragEnd: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  isSnapping?: boolean;
  filterId: string;
}

/**
 * Enhanced draggable vector handle with premium interactions
 *
 * Features:
 * - Larger glow halo
 * - Elastic scaling with spring physics
 * - Snap pulse animation when preset is applied
 * - Smooth cursor transitions (grab/grabbing)
 */
export const VectorHandle = ({
  vector,
  color,
  label,
  isDragging,
  isHovering,
  onDragStart,
  onDragEnd,
  onMouseEnter,
  onMouseLeave,
  isSnapping = false,
  filterId
}: VectorHandleProps) => {
  return (
    <g>
      {/* Glow halo (larger) */}
      <motion.circle
        cx={vector.x}
        cy={10 - vector.y}
        r={isHovering || isDragging ? "0.52" : "0.4"}
        fill={`${color}/0.3`}
        filter={`url(#${filterId})`}
        animate={{
          cx: vector.x,
          cy: 10 - vector.y,
          scale: isDragging ? 1.1 : 1
        }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      />

      {/* Snap pulse effect */}
      <AnimatePresence>
        {isSnapping && (
          <motion.circle
            cx={vector.x}
            cy={10 - vector.y}
            r="0.3"
            fill="hsl(var(--accent))"
            initial={{ opacity: 0.8, r: 0.3 }}
            animate={{ opacity: 0, r: 0.8 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        )}
      </AnimatePresence>

      {/* Main handle (40px equivalent in SVG units) */}
      <motion.circle
        cx={vector.x}
        cy={10 - vector.y}
        r="0.4"
        fill={color}
        className={isDragging ? "cursor-grabbing" : "cursor-grab"}
        filter={`url(#${filterId})`}
        onMouseDown={onDragStart}
        onMouseUp={onDragEnd}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        animate={{
          cx: vector.x,
          cy: 10 - vector.y,
          scale: isHovering ? 2 : isDragging ? 1.1 : 1
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 25
        }}
        whileHover={{ scale: 2 }}
      />

      {/* Label badge */}
      <motion.text
        x={vector.x}
        y={10 - vector.y}
        textAnchor="middle"
        dominantBaseline="middle"
        className="text-[0.35px] font-bold pointer-events-none"
        fill="white"
        animate={{
          x: vector.x,
          y: 10 - vector.y
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 25
        }}
      >
        {label}
      </motion.text>
    </g>
  );
};
