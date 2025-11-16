import { motion } from "framer-motion";

type RoleType = 'react' | 'python' | 'ml' | 'cloud' | 'java' | 'devops';

interface LegendItem {
  role: RoleType;
  color: string;
  label: string;
  icon: string;
  enabled: boolean;
}

interface LegendPanelProps {
  items: LegendItem[];
  onFilterToggle: (role: RoleType) => void;
  position?: 'top-left' | 'top-right';
  compact?: boolean;
}

export const LegendPanel = ({
  items,
  onFilterToggle,
  position = 'top-left',
  compact = false
}: LegendPanelProps) => {
  return (
    <motion.div
      className="legend-panel"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 2.0, duration: 0.4 }}
    >
      <h4 className="text-base font-semibold mb-4 text-foreground">Role Types</h4>
      <div className="space-y-3">
        {items.map(item => (
          <div key={item.role} className="flex items-center gap-3">
            <div
              className="w-4 h-4 rounded-full transition-opacity"
              style={{
                backgroundColor: `hsl(var(${item.color}))`,
                opacity: item.enabled ? 1 : 0.3
              }}
            />
            <span className={`text-sm flex-1 transition-opacity ${item.enabled ? 'text-foreground' : 'text-muted-foreground'}`}>
              {item.label}
            </span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={item.enabled}
                onChange={() => onFilterToggle(item.role)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-muted/30 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary/60"></div>
            </label>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-glass-border/30">
        <button
          onClick={() => {
            items.forEach(item => onFilterToggle(item.role));
          }}
          className="text-sm text-accent hover:text-primary transition-colors"
        >
          Toggle All
        </button>
      </div>
    </motion.div>
  );
};
