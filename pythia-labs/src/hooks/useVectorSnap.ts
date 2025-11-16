import { useState } from 'react';

interface Vector {
  x: number;
  y: number;
}

interface SnapState {
  isSnapping: boolean;
  snapTarget: "v1" | "v2" | "both" | null;
}

export const useVectorSnap = (
  onSnapComplete?: () => void
) => {
  const [snapState, setSnapState] = useState<SnapState>({
    isSnapping: false,
    snapTarget: null
  });

  const triggerSnap = (target: "v1" | "v2" | "both") => {
    setSnapState({ isSnapping: true, snapTarget: target });

    // Snap animation duration (0.6s)
    setTimeout(() => {
      setSnapState({ isSnapping: false, snapTarget: null });
      onSnapComplete?.();
    }, 600);
  };

  return {
    ...snapState,
    triggerSnap
  };
};
