import {
  point,
  centroid as getCentroid,
  distance as getDistance,
  booleanWithin as geoWithin
} from "@turf/turf";

export const pointWithin = (currentPoint, targetArea) => {
  const pt = point(currentPoint.coordinates);
  const isWithin = geoWithin(pt, targetArea);
  const centroid = getCentroid(targetArea);
  const distance = getDistance(pt, centroid, { units: "kilometers" });
  return { isWithin, distance };
};

// items[Math.floor(Math.random()*items.length)]

export const getRandomTarget = targets => {
  const target = Math.floor(Math.random() * targets.length);
  return target;
};
