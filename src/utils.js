import geoWithin from "@turf/boolean-within";
import { point } from "@turf/helpers";
import getDistance from "@turf/distance";
import getCentroid from "@turf/centroid";

export const pointWithin = (currentPoint, targetArea) => {
  const pt = point(currentPoint.coordinates);
  const isWithin = geoWithin(pt, targetArea);
  const centroid = getCentroid(targetArea);
  const distance = getDistance(pt, centroid, { units: "kilometers" });
  return { isWithin, distance };
};
