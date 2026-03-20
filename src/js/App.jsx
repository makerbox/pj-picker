import { useEffect, useState, useTransition } from "react";
import LocationSearch from "./components/LocationSearch.jsx";
import RecommendationPanel from "./components/RecommendationPanel.jsx";
import ForecastTimeline from "./components/ForecastTimeline.jsx";
import StatusBanner from "./components/StatusBanner.jsx";
import { DEFAULT_PLACE } from "./data/places.js";
import { searchLocations } from "./services/weatherApi.js";
import useWeatherForecast from "./hooks/useWeatherForecast.js";

export default function App() {
  const [selectedPlace, setSelectedPlace] = useState(DEFAULT_PLACE);
  const [query, setQuery] = useState(DEFAULT_PLACE.name);
  const [results, setResults] = useState([]);
  const [searchError, setSearchError] = useState("");
  const [searching, startSearchTransition] = useTransition();
  const {
    data,
    error,
    isLoading,
    isRefreshing,
    refreshForecast,
    lastUpdated
  } = useWeatherForecast(selectedPlace);

  useEffect(() => {
    setQuery(selectedPlace.name);
  }, [selectedPlace]);

  async function handleSearch(event) {
    event.preventDefault();

    if (!query.trim()) {
      setSearchError("Enter a suburb, city, or town to load a forecast.");
      setResults([]);
      return;
    }

    setSearchError("");

    startSearchTransition(async () => {
      try {
        const locations = await searchLocations(query.trim());
        setResults(locations);

        if (locations.length === 0) {
          setSearchError("No matching locations found. Try a broader search.");
        }
      } catch (searchIssue) {
        setSearchError(searchIssue.message);
        setResults([]);
      }
    });
  }

  function handleSelectPlace(place) {
    setSelectedPlace(place);
    setResults([]);
    setSearchError("");
  }

  return (
    <main className="app-shell">
      <section className="hero">
        <div className="hero__content">
          <h1>PJs</h1>
          <ForecastTimeline forecast={data} isLoading={isLoading} />
          <RecommendationPanel
            forecast={data}
            isLoading={isLoading}
            error={error}
          />
        </div>
      </section>

      <section className="dashboard">
        <div className="utility-row">
          <LocationSearch
            query={query}
            setQuery={setQuery}
            onSubmit={handleSearch}
            results={results}
            onSelectPlace={handleSelectPlace}
            isSearching={searching}
            searchError={searchError}
            selectedPlace={selectedPlace}
          />

          <StatusBanner
            place={selectedPlace}
            isLoading={isLoading}
            isRefreshing={isRefreshing}
            error={error}
            lastUpdated={lastUpdated}
            onRefresh={refreshForecast}
          />
        </div>

      </section>
    </main>
  );
}
