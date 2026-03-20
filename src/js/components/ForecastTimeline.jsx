import { formatHourLabel, formatTemperature } from "../utils/format.js";

export default function ForecastTimeline({ forecast, isLoading }) {
  if (isLoading) {
    return null;
  }

  const hours = forecast?.primaryNight?.hours ?? [];

  if (hours.length === 0) {
    return null;
  }

  return (
    <section className="forecast-strip">
      <div className="forecast-strip__items">
        {hours.slice(0, 8).map((hour) => (
          <article className="forecast-pill" key={hour.time}>
            <p>{formatHourLabel(hour.time)}</p>
            <strong>{formatTemperature(hour.apparentTemperature)}</strong>
            <span>Actual {formatTemperature(hour.temperature)}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
