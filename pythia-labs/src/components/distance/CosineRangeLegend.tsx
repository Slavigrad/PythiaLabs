import { motion } from "framer-motion";

interface CosineRangeLegendProps {
  currentValue?: number;
  compact?: boolean;
}

const COSINE_RANGES = [
  { min: 0.0, max: 0.2, label: "Almost Identical", color: "--accent" },
  { min: 0.2, max: 0.4, label: "Similar", color: "--primary" },
  { min: 0.4, max: 0.7, label: "Somewhat Related", color: "--secondary" },
  { min: 0.7, max: 1.0, label: "Unrelated", color: "--muted" }
];

export const CosineRangeLegend = ({
  currentValue,
  compact = false
}: CosineRangeLegendProps) => {
  const getCurrentRange = () => {
    if (currentValue === undefined) return null;
    return COSINE_RANGES.find(
      range => currentValue >= range.min && currentValue <= range.max
    );
  };

  const activeRange = getCurrentRange();

  return (
    <motion.div
      className="cosine-legend"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <h5 className="text-xs font-semibold text-muted-foreground mb-2">
        Cosine Distance Ranges
      </h5>
      <div className="space-y-1">
        {COSINE_RANGES.map((range) => (
          <motion.div
            key={range.label}
            className={`cosine-range-row ${
              activeRange?.label === range.label ? 'active' : ''
            }`}
            whileHover={{ x: 2 }}
          >
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: `hsl(var(${range.color}))` }}
                />
                <span className="font-mono">
                  {range.min.toFixed(1)} – {range.max.toFixed(1)}
                </span>
              </div>
              <span className="text-muted-foreground">{range.label}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
