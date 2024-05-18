import { prefLocation } from "./prefLocation";

export const prefArray: (keyof typeof prefLocation)[] = Object.keys(
  prefLocation
).map((locationKey) => locationKey as keyof typeof prefLocation);
