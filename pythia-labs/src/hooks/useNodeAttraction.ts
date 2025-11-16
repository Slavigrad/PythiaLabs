import { useMemo, useEffect, useState } from 'react';

interface TalentBubble {
  id: string;
  x: number;
  y: number;
  [key: string]: any;
}

interface AttractionConfig {
  selectedNode: TalentBubble | null;
  neighbors: TalentBubble[];
  attractionStrength?: number;
  enabled: boolean;
}

export const useNodeAttraction = ({
  selectedNode,
  neighbors,
  attractionStrength = 15,
  enabled
}: AttractionConfig) => {
  const [attractedPositions, setAttractedPositions] = useState<Map<string, { x: number; y: number }>>(new Map());

  useEffect(() => {
    if (!enabled || !selectedNode) {
      setAttractedPositions(new Map());
      return;
    }

    const newPositions = new Map();
    neighbors.forEach(neighbor => {
      const dx = selectedNode.x - neighbor.x;
      const dy = selectedNode.y - neighbor.y;

      // Normalize and apply attraction (pull 15% toward selected node)
      const pullFactor = 0.15;
      newPositions.set(neighbor.id, {
        x: neighbor.x + (dx * pullFactor),
        y: neighbor.y + (dy * pullFactor)
      });
    });

    setAttractedPositions(newPositions);
  }, [selectedNode, neighbors, enabled, attractionStrength]);

  return attractedPositions;
};
