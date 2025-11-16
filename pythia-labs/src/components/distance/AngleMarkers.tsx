import { motion } from "framer-motion";

interface AngleMarkersProps {
  centerX?: number;
  centerY?: number;
  radius?: number;
  showLabels?: boolean;
}

const ANGLE_REFERENCES = [
  { angle: 0, label: "0° (identical)", color: "--accent" },
  { angle: 45, label: "45° (similar)", color: "--primary" },
  { angle: 90, label: "90° (orthogonal)", color: "--secondary" },
  { angle: 135, label: "135°", color: "--muted" },
  { angle: 180, label: "180° (opposite)", color: "--destructive" }
];

export const AngleMarkers = ({
  centerX = 0,
  centerY = 10,
  radius = 8,
  showLabels = true
}: AngleMarkersProps) => {
  return (
    <g className="angle-markers" opacity="0.15">
      {ANGLE_REFERENCES.map(({ angle, label, color }) => {
        const radians = (angle * Math.PI) / 180;
        const x = centerX + radius * Math.cos(radians);
        const y = centerY - radius * Math.sin(radians);

        return (
          <motion.g
            key={angle}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.15 }}
            transition={{ delay: 0.4 + angle / 360 }}
          >
            {/* Reference line */}
            <line
              x1={centerX}
              y1={centerY}
              x2={x}
              y2={y}
              stroke={`hsl(var(${color}))`}
              strokeWidth="0.02"
              strokeDasharray="0.1 0.1"
            />

            {/* Optional label */}
            {showLabels && angle % 45 === 0 && (
              <text
                x={x + 0.3}
                y={y}
                className="text-[0.4px] fill-muted-foreground"
                fontSize="0.4"
              >
                {angle}°
              </text>
            )}
          </motion.g>
        );
      })}

      {/* Center point */}
      <circle
        cx={centerX}
        cy={centerY}
        r="0.08"
        fill="hsl(var(--muted-foreground))"
        opacity="0.3"
      />
    </g>
  );
};
