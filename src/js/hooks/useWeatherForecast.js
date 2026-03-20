import { useCallback, useEffect, useRef, useState } from "react";
import { fetchForecast } from "../services/weatherApi.js";

const REFRESH_INTERVAL_MS = 15 * 60 * 1000;

export default function useWeatherForecast(place) {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);
  const abortRef = useRef(null);

  const loadForecast = useCallback(
    async ({ background = false } = {}) => {
      abortRef.current?.abort();

      const controller = new AbortController();
      abortRef.current = controller;

      if (background) {
        setIsRefreshing(true);
      } else {
        setIsLoading(true);
      }

      try {
        const nextForecast = await fetchForecast(place, controller.signal);
        setData(nextForecast);
        setError("");
        setLastUpdated(new Date());
      } catch (issue) {
        if (issue.name !== "AbortError") {
          setError(issue.message);
        }
      } finally {
        setIsLoading(false);
        setIsRefreshing(false);
      }
    },
    [place]
  );

  useEffect(() => {
    loadForecast();

    const intervalId = window.setInterval(() => {
      loadForecast({ background: true });
    }, REFRESH_INTERVAL_MS);

    return () => {
      window.clearInterval(intervalId);
      abortRef.current?.abort();
    };
  }, [loadForecast]);

  return {
    data,
    error,
    isLoading,
    isRefreshing,
    lastUpdated,
    refreshForecast: () => loadForecast({ background: true })
  };
}
