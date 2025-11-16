import { useMemo } from 'react';

interface Vector {
  x: number;
  y: number;
}

/**
 * Calculate semantic color based on the angle between two vectors
 *
 * Color mapping:
 * - 0-30°: Teal (identical)
 * - 30-60°: Cyan (very similar)
 * - 60-90°: Blue-cyan (similar)
 * - 90-120°: Neutral blue (somewhat related)
 * - 120-150°: Purple (different)
 * - 150-180°: Magenta (opposite)
 */
export const useSemanticColor = (v1: Vector, v2: Vector) => {
  return useMemo(() => {
    const angle = calculateAngle(v1, v2);
    return getSemanticColorFromAngle(angle);
  }, [v1, v2]);
};

const calculateAngle = (v1: Vector, v2: Vector): number => {
  const dot = v1.x * v2.x + v1.y * v2.y;
  const mag1 = Math.sqrt(v1.x * v1.x + v1.y * v1.y);
  const mag2 = Math.sqrt(v2.x * v2.x + v2.y * v2.y);
  const cosAngle = Math.max(-1, Math.min(1, dot / (mag1 * mag2))); // Clamp to [-1, 1]
  return (Math.acos(cosAngle) * 180) / Math.PI;
};

const getSemanticColorFromAngle = (angle: number): string => {
  // 0-30°: Teal (identical)
  if (angle <= 30) return 'hsl(180, 100%, 65%)';
  // 30-60°: Cyan (very similar)
  if (angle <= 60) return 'hsl(190, 95%, 55%)';
  // 60-90°: Blue-cyan (similar)
  if (angle <= 90) return 'hsl(200, 80%, 50%)';
  // 90-120°: Neutral blue (somewhat related)
  if (angle <= 120) return 'hsl(220, 70%, 50%)';
  // 120-150°: Purple (different)
  if (angle <= 150) return 'hsl(280, 70%, 55%)';
  // 150-180°: Magenta (opposite)
  return 'hsl(320, 80%, 60%)';
};
