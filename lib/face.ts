import { Landmarks } from "react-native-vision-camera-face-detector";

export const REQUIRED_FACE_LANDMARK_KEYS: (keyof Landmarks)[] = [
  "LEFT_EYE",
  "RIGHT_EYE",
  "NOSE_BASE",
  "MOUTH_LEFT",
  "MOUTH_RIGHT",
  "MOUTH_BOTTOM",
];

export const extractDescriptorFromLandmarks = (
  landmarks: Landmarks
): number[][] => {
  return normalizePoints(landmarks, REQUIRED_FACE_LANDMARK_KEYS);
};

/**
 * Checks if the provided landmarks object is valid.
 *
 * A landmarks object is considered valid if it is defined and contains all
 * the required keys specified in `REQUIRED_KEYS`. Each key must map to a point
 * object with numeric `x` and `y` properties.
 *
 * @param landmarks - The landmarks object to validate, or `undefined`.
 * @returns `true` if the landmarks object is valid, otherwise `false`.
 */
export function isValidLandmarks(landmarks: Landmarks | undefined): boolean {
  if (!landmarks) return false;
  return REQUIRED_FACE_LANDMARK_KEYS.every((key) => {
    const point = landmarks[key];
    return (
      point !== undefined &&
      typeof point.x === "number" &&
      typeof point.y === "number"
    );
  });
}

/**
 * Serializes a Landmarks object to JSON string for storage
 */
export function serializeLandmarks(landmarks: Landmarks): string {
  return JSON.stringify(landmarks);
}

/**
 * Deserializes JSON string to Landmarks object (with optional safety check)
 */
export function deserializeLandmarks(json: string): Landmarks | null {
  try {
    const parsed = JSON.parse(json);
    if (isValidLandmarks(parsed)) {
      return parsed as Landmarks;
    } else {
      console.warn("Invalid landmarks object during deserialization.");
      return null;
    }
  } catch (err) {
    console.error("Failed to deserialize landmarks:", err);
    return null;
  }
}

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

/**
 * Averages the Normalized Points
 * @param descriptors number[][][]
 * @returns number[][]
 */
function averageNormalizedPoints(descriptors: number[][][]): number[][] {
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

function compareNormalizedPoints(a: number[][], b: number[][]): number {
  if (a.length !== b.length) throw new Error("Landmark length mismatch");

  const distances = a.map(([ax, ay], i) => {
    const [bx, by] = b[i];
    return Math.sqrt((ax - bx) ** 2 + (ay - by) ** 2);
  });

  const avgDistance =
    distances.reduce((sum, d) => sum + d, 0) / distances.length;

  // Convert to similarity (1 = perfect match, 0 = worst)
  const similarity = Math.exp(-avgDistance * 5); // You can tune this scale
  return similarity;
}

/**
 * Authenticates a face by comparing stored facial landmarks with a buffer of current landmarks.
 *
 * @param stored - The stored facial landmarks to compare against.
 * @param currentBuffer - An array of current facial landmarks to compare with the stored landmarks.
 * @param threshold - The similarity threshold required for authentication to pass. Defaults to 0.85.
 * @returns A boolean indicating whether the similarity score meets or exceeds the threshold.
 *
 * The function normalizes the facial landmarks for both stored and current data, computes similarity
 * scores for each set of current landmarks, and averages these scores. If the average similarity score
 * meets or exceeds the threshold, the function returns `true`, otherwise `false`.
 *
 * Logs:
 * - Individual similarity scores for each comparison in the buffer.
 * - The final averaged similarity score.
 */
export const authenticateFace = (
  storedDescriptor: number[][], // Already normalized
  currentBuffer: Landmarks[],
  threshold: number = 0.85
): boolean => {
  const normalizedDescriptors = currentBuffer.map((current) =>
    normalizePoints(current, REQUIRED_FACE_LANDMARK_KEYS)
  );

  const avgCurrent = averageNormalizedPoints(normalizedDescriptors);
  const similarity = compareNormalizedPoints(storedDescriptor, avgCurrent);

  console.log("Similarity Score (averaged buffer):", similarity.toFixed(4));
  return similarity >= threshold;
};
