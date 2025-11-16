import { useState, useEffect } from 'react';

interface IntroStage {
  name: string;
  delay: number;
  duration: number;
}

const INTRO_STAGES: IntroStage[] = [
  { name: 'canvas', delay: 0, duration: 600 },
  { name: 'nodes', delay: 400, duration: 1600 },
  { name: 'query', delay: 1800, duration: 800 },
  { name: 'lines', delay: 2200, duration: 800 },
  { name: 'sidebar', delay: 2600, duration: 600 }
];

export const useIntroSequence = () => {
  const [currentStage, setCurrentStage] = useState<string>('canvas');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const timers = INTRO_STAGES.map(stage => {
      return setTimeout(() => {
        setCurrentStage(stage.name);
      }, stage.delay);
    });

    const completeTimer = setTimeout(() => {
      setIsComplete(true);
    }, 3200);

    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(completeTimer);
    };
  }, []);

  const isStageActive = (stageName: string) => {
    const currentIndex = INTRO_STAGES.findIndex(s => s.name === currentStage);
    const stageIndex = INTRO_STAGES.findIndex(s => s.name === stageName);
    return stageIndex <= currentIndex;
  };

  return {
    currentStage,
    isComplete,
    isStageActive
  };
};
