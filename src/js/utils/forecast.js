import { getRecommendationsForRange } from "../data/pjGuide.js";
import { addDays, splitLocalStamp } from "./date.js";

export function buildLocationOption(result) {
  const adminParts = [result.admin1, result.country].filter(Boolean);

  return {
    id: `${result.id}`,
    name: result.name,
    regionLabel: adminParts.join(", "),
    latitude: result.latitude,
    longitude: result.longitude
  };
}

export function getNightStartDate(currentStamp) {
  const { date, hour } = splitLocalStamp(currentStamp);
  return hour < 7 ? addDays(date, -1) : date;
}

export function isNightHour(stamp, startDate) {
  const { date, hour } = splitLocalStamp(stamp);
  const endDate = addDays(startDate, 1);

  return (
    (date === startDate && hour >= 18) ||
    (date === endDate && hour < 7)
  );
}

export function buildNight(hours, startDate, label) {
  const nightlyHours = hours.filter((hour) => isNightHour(hour.time, startDate));

  if (nightlyHours.length === 0) {
    return null;
  }

  const apparentTemperatures = nightlyHours.map((hour) => hour.apparentTemperature);
  const minApparentTemp = Math.min(...apparentTemperatures);
  const maxApparentTemp = Math.max(...apparentTemperatures);

  return {
    label,
    startDate,
    minApparentTemp,
    maxApparentTemp,
    hours: nightlyHours,
    recommendations: getRecommendationsForRange(minApparentTemp, maxApparentTemp)
  };
}

export function buildForecastModel(payload, place) {
  const times = payload.hourly?.time ?? [];
  const temperatures = payload.hourly?.temperature_2m ?? [];
  const apparentTemperatures = payload.hourly?.apparent_temperature ?? [];
  const currentStamp = payload.current?.time ?? times[0];

  const hours = times.map((time, index) => ({
    time,
    temperature: temperatures[index],
    apparentTemperature: apparentTemperatures[index]
  }));

  const firstNightDate = getNightStartDate(currentStamp);
  const primaryNight = buildNight(hours, firstNightDate, "Tonight");
  const nextNight = buildNight(hours, addDays(firstNightDate, 1), "Tomorrow night");

  return {
    place,
    timezone: payload.timezone,
    fetchedAt: currentStamp,
    current: payload.current,
    primaryNight,
    nextNight,
    hours
  };
}
