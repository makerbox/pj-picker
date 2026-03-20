export function formatTemperature(value) {
  return `${Math.round(value)}°C`;
}

export function formatHourLabel(stamp) {
  const [, time] = stamp.split("T");
  const hour = Number(time.slice(0, 2));
  const suffix = hour >= 12 ? "pm" : "am";
  const normalizedHour = hour % 12 || 12;
  return `${normalizedHour}${suffix}`;
}

export function formatLastUpdated(lastUpdated) {
  if (!lastUpdated) {
    return "Awaiting first update";
  }

  return `Updated ${lastUpdated.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit"
  })}`;
}
