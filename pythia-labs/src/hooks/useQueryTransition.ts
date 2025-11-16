import { useState, useEffect } from 'react';

type TransitionPhase = 'idle' | 'blurOut' | 'move' | 'blurIn';

interface TransitionState {
  phase: TransitionPhase;
  progress: number;
}

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const useQueryTransition = (queryIndex: number) => {
  const [transition, setTransition] = useState<TransitionState>({
    phase: 'idle',
    progress: 0
  });
  const [prevQueryIndex, setPrevQueryIndex] = useState(queryIndex);

  useEffect(() => {
    if (queryIndex === prevQueryIndex) {
      return;
    }

    const runTransition = async () => {
      // Blur out (0-0.3s)
      setTransition({ phase: 'blurOut', progress: 0 });
      await wait(300);

      // Move (0.3-0.9s)
      setTransition({ phase: 'move', progress: 0 });
      await wait(600);

      // Blur in (0.9-1.3s)
      setTransition({ phase: 'blurIn', progress: 0 });
      await wait(400);

      // Complete
      setTransition({ phase: 'idle', progress: 1 });
      setPrevQueryIndex(queryIndex);
    };

    runTransition();
  }, [queryIndex, prevQueryIndex]);

  return transition;
};
