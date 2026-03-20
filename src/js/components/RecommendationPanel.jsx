import { formatTemperature } from "../utils/format.js";

function LoadingState() {
  return (
    <section className="night-card night-card--loading">
      <p>Loading tonight&apos;s forecast and sleepwear guide...</p>
    </section>
  );
}

function EmptyState() {
  return (
    <section className="night-card">
      <p>No forecast is available yet.</p>
    </section>
  );
}

export default function RecommendationPanel({ forecast, isLoading, error }) {
  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return (
      <section className="night-card night-card--error">
        <p>{error}</p>
      </section>
    );
  }

  if (!forecast?.primaryNight) {
    return <EmptyState />;
  }

  const { primaryNight } = forecast;

  return (
    <section className="night-card">
      <div className="night-card__header">
        <div>
          <h2>{primaryNight.label}</h2>
        </div>
        <div className="night-card__range">
          <span>{formatTemperature(primaryNight.minApparentTemp)}</span>
          <span>{formatTemperature(primaryNight.maxApparentTemp)}</span>
        </div>
      </div>

      <p className="night-card__summary">
        Expect an overnight apparent temperature range of{" "}
        <strong>{formatTemperature(primaryNight.minApparentTemp)}</strong> to{" "}
        <strong>{formatTemperature(primaryNight.maxApparentTemp)}</strong> in{" "}
        {forecast.place.name}. Multiple options appear when the forecast sits on
        a temperature boundary.
      </p>

      <div className="recommendation-grid">
        {primaryNight.recommendations.map((recommendation) => (
          <article className="recommendation-card" key={recommendation.id}>
            <p className="recommendation-card__tag">
              Best for {recommendation.rangeLabel}
            </p>
            <h3>{recommendation.title}</h3>
            <p>{recommendation.description}</p>
            <ul className="recommendation-card__list">
              {recommendation.layers.map((layer) => (
                <li key={layer}>{layer}</li>
              ))}
            </ul>
            <p className="recommendation-card__note">{recommendation.note}</p>
          </article>
        ))}
      </div>

      <p className="night-card__disclaimer">
        This guide is informational only. Check your child, room temperature,
        and sleep-sack guidance before settling on a final outfit.
      </p>
    </section>
  );
}
