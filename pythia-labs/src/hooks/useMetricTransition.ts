import { useState, useEffect } from 'react';

type DistanceType = 'cosine' | 'euclidean' | 'dot';

interface MetricTransitionState {
  isTransitioning: boolean;
  phase: 'idle' | 'blurOut' | 'morph' | 'blurIn';
  backgroundTint: string;
}

export const useMetricTransition = (distanceType: DistanceType) => {
  const [state, setState] = useState<MetricTransitionState>({
    isTransitioning: false,
    phase: 'idle',
    backgroundTint: 'transparent'
  });

  useEffect(() => {
    const transition = async () => {
      // Stage 1: Blur out (0-0.2s)
      setState({ isTransitioning: true, phase: 'blurOut', backgroundTint: state.backgroundTint });
      await wait(200);

      // Stage 2: Morph with background tint (0.2-0.6s)
      setState({ isTransitioning: true, phase: 'morph', backgroundTint: getBackgroundTint(distanceType) });
      await wait(400);

      // Stage 3: Blur in (0.6-0.8s)
      setState({ isTransitioning: true, phase: 'blurIn', backgroundTint: getBackgroundTint(distanceType) });
      await wait(200);

      // Stage 4: Complete
      setState({ isTransitioning: false, phase: 'idle', backgroundTint: getBackgroundTint(distanceType) });
    };

    transition();
  }, [distanceType]);

  return state;
};

const getBackgroundTint = (type: DistanceType): string => {
  switch (type) {
    case 'cosine': return 'hsl(180 100% 65% / 0.03)';
    case 'euclidean': return 'hsl(260 60% 60% / 0.03)';
    case 'dot': return 'hsl(190 95% 55% / 0.03)';
  }
};

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
