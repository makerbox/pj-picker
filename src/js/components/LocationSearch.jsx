export default function LocationSearch({
  query,
  setQuery,
  onSubmit,
  results,
  onSelectPlace,
  isSearching,
  searchError,
  selectedPlace
}) {
  return (
    <div className="search-panel">
      <form className="search-panel__form" onSubmit={onSubmit}>
        <label className="search-panel__label" htmlFor="location-search">
          Location
        </label>
        <div className="search-panel__controls">
          <input
            id="location-search"
            className="search-panel__input"
            type="search"
            placeholder="Search for a location"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <button className="search-panel__button" type="submit">
            {isSearching ? "Searching..." : "Find forecast"}
          </button>
        </div>
      </form>

      <p className="search-panel__selection">
        Showing forecasts for <strong>{selectedPlace.name}</strong>
      </p>

      {searchError ? <p className="search-panel__error">{searchError}</p> : null}

      {results.length > 0 ? (
        <ul className="search-panel__results" aria-label="Location results">
          {results.map((place) => (
            <li key={place.id}>
              <button
                className="search-panel__result"
                type="button"
                onClick={() => onSelectPlace(place)}
              >
                <span>{place.name}</span>
                <span>{place.regionLabel}</span>
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
