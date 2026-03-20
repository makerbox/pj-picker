export function addDays(dateString, days) {
  const date = new Date(`${dateString}T00:00:00Z`);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

export function splitLocalStamp(stamp) {
  const [date, time] = stamp.split("T");
  return {
    date,
    hour: Number(time.slice(0, 2))
  };
}
