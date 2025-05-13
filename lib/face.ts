import { Landmarks } from "react-native-vision-camera-face-detector";

// Average multiple landmark-based descriptors
export function averageNormalizedPoints(descriptors: number[][][]): number[][] {
  const length = descriptors[0].length;
  const dim = descriptors[0][0].length;

  const sum = Array.from({ length }, () => new Array(dim).fill(0));

  for (const desc of descriptors) {
    for (let i = 0; i < length; i++) {
      for (let j = 0; j < dim; j++) {
        sum[i][j] += desc[i][j];
      }
    }
  }

  return sum.map((point) => point.map((v) => v / descriptors.length));
}

type Point = {
  x: number;
  y: number;
};

function normalizePoints(
  landmarks: Landmarks,
  keys: (keyof Landmarks)[]
): number[][] {
  const points = keys.map((key) => {
    const { x, y } = landmarks[key];
    return [x, y];
  });

  // Centering
  const meanX = points.reduce((sum, [x]) => sum + x, 0) / points.length;
  const meanY = points.reduce((sum, [, y]) => sum + y, 0) / points.length;
  const centered = points.map(([x, y]) => [x - meanX, y - meanY]);

  // Scaling
  const scale = Math.sqrt(
    centered.reduce((sum, [x, y]) => sum + x * x + y * y, 0)
  );
  return centered.map(([x, y]) => [x / scale, y / scale]);
}

function compareNormalizedPoints(a: number[][], b: number[][]): number {
  if (a.length !== b.length) throw new Error("Landmark length mismatch");

  const distances = a.map(([ax, ay], i) => {
    const [bx, by] = b[i];
    return Math.sqrt((ax - bx) ** 2 + (ay - by) ** 2);
  });

  const avgDistance =
    distances.reduce((sum, d) => sum + d, 0) / distances.length;

  // Convert to similarity (1 = perfect match, 0 = worst)
  const similarity = Math.exp(-avgDistance * 5.5); // You can tune this scale
  return similarity;
}

export const authenticateFace = (
  stored: Landmarks,
  currentBuffer: Landmarks[],
  threshold: number = 0.85
): boolean => {
  const keys: (keyof Landmarks)[] = [
    "LEFT_EYE",
    "RIGHT_EYE",
    "NOSE_BASE",
    "MOUTH_LEFT",
    "MOUTH_RIGHT",
    "MOUTH_BOTTOM",
  ];
  const similarityList: number[] = [];
  currentBuffer.forEach((current) => {
    const normStored = normalizePoints(stored, keys);
    const normCurrent = normalizePoints(current, keys);
    similarityList.push(compareNormalizedPoints(normStored, normCurrent));
  });

  const similarity =
    similarityList.reduce((sum, value) => sum + value, 0) /
    currentBuffer.length;
  console.log("Similarity       : ", JSON.stringify(similarityList));
  console.log("Similarity Score : ", similarity.toFixed(4));
  return similarity >= threshold;
};

export const extractDescriptorFromLandmarks = (
  landmarks: Landmarks
): number[][] => {
  const keys: (keyof Landmarks)[] = [
    "LEFT_EYE",
    "RIGHT_EYE",
    "NOSE_BASE",
    "MOUTH_LEFT",
    "MOUTH_RIGHT",
    "MOUTH_BOTTOM",
  ];
  return normalizePoints(landmarks, keys);
};
