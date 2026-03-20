import { formatLastUpdated } from "../utils/format.js";

export default function StatusBanner({
  place,
  isLoading,
  isRefreshing,
  error,
  lastUpdated,
  onRefresh
}) {
  return (
    <section className="status-banner">
      <div>
        <p className="eyebrow">Live forecast status</p>
        <h2>{place.name}</h2>
        <p className="status-banner__copy">
          {isLoading
            ? "Fetching the latest night-time forecast."
            : error
              ? "Forecast updates are paused until the next successful request."
              : "The app checks for updated forecast data automatically and refreshes the recommendations in place."}
        </p>
      </div>

      <div className="status-banner__actions">
        <p className="status-pill">
          {isRefreshing ? "Refreshing..." : formatLastUpdated(lastUpdated)}
        </p>
        <button className="status-banner__button" type="button" onClick={onRefresh}>
          Refresh now
        </button>
      </div>
    </section>
  );
}
