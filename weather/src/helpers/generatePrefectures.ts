import { prefLocation } from "../constants/prefLocation";

export const generatePrefectures = (): (keyof typeof prefLocation)[] =>
  Object.keys(prefLocation).map(
    (locationKey) => locationKey as keyof typeof prefLocation
  );
