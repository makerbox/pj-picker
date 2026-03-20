import {
  buildForecastModel,
  buildLocationOption
} from "../utils/forecast.js";

const FORECAST_ENDPOINT = "https://api.open-meteo.com/v1/forecast";
const GEOCODE_ENDPOINT = "https://geocoding-api.open-meteo.com/v1/search";

async function fetchJson(url, signal) {
  const response = await fetch(url, { signal });

  if (!response.ok) {
    throw new Error("Weather service is unavailable right now. Please try again.");
  }

  return response.json();
}

export async function searchLocations(query, signal) {
  const url = new URL(GEOCODE_ENDPOINT);
  url.searchParams.set("name", query);
  url.searchParams.set("count", "5");
  url.searchParams.set("language", "en");
  url.searchParams.set("format", "json");

  const payload = await fetchJson(url, signal);
  return (payload.results ?? []).map(buildLocationOption);
}

export async function fetchForecast(place, signal) {
  const url = new URL(FORECAST_ENDPOINT);
  url.searchParams.set("latitude", String(place.latitude));
  url.searchParams.set("longitude", String(place.longitude));
  url.searchParams.set("hourly", "temperature_2m,apparent_temperature");
  url.searchParams.set("current", "temperature_2m,apparent_temperature");
  url.searchParams.set("forecast_days", "3");
  url.searchParams.set("timezone", "auto");

  const payload = await fetchJson(url, signal);
  return buildForecastModel(payload, place);
}
