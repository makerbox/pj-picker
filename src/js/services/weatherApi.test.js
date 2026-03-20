import { afterEach, describe, expect, it, vi } from "vitest";
import { fetchForecast, searchLocations } from "./weatherApi.js";

afterEach(() => {
  vi.restoreAllMocks();
});

describe("weather api service", () => {
  it("maps location results into app-friendly options", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          results: [
            {
              id: 2147714,
              name: "Sydney",
              admin1: "New South Wales",
              country: "Australia",
              latitude: -33.8688,
              longitude: 151.2093
            }
          ]
        })
      })
    );

    const results = await searchLocations("Sydney");
    expect(results[0]).toMatchObject({
      id: "2147714",
      name: "Sydney",
      regionLabel: "New South Wales, Australia"
    });
  });

  it("normalizes forecast payloads into recommendation-ready data", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          timezone: "Australia/Sydney",
          current: {
            time: "2026-03-20T17:00",
            temperature_2m: 22,
            apparent_temperature: 21
          },
          hourly: {
            time: [
              "2026-03-20T18:00",
              "2026-03-20T21:00",
              "2026-03-21T00:00",
              "2026-03-21T03:00",
              "2026-03-21T06:00"
            ],
            temperature_2m: [22, 20, 19, 18, 17],
            apparent_temperature: [21, 20, 18, 17, 16]
          }
        })
      })
    );

    const forecast = await fetchForecast(
      {
        name: "Sydney",
        latitude: -33.8688,
        longitude: 151.2093
      },
      undefined
    );

    expect(forecast.primaryNight.label).toBe("Tonight");
    expect(forecast.primaryNight.recommendations.length).toBeGreaterThan(0);
  });
});
