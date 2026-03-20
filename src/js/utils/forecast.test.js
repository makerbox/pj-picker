import { describe, expect, it } from "vitest";
import {
  buildForecastModel,
  getNightStartDate,
  isNightHour
} from "./forecast.js";

describe("forecast helpers", () => {
  it("uses the previous date for after-midnight night windows", () => {
    expect(getNightStartDate("2026-03-21T02:00")).toBe("2026-03-20");
  });

  it("detects hours that belong to the overnight window", () => {
    expect(isNightHour("2026-03-20T19:00", "2026-03-20")).toBe(true);
    expect(isNightHour("2026-03-21T04:00", "2026-03-20")).toBe(true);
    expect(isNightHour("2026-03-21T09:00", "2026-03-20")).toBe(false);
  });

  it("builds multiple recommendation options when the forecast spans boundaries", () => {
    const payload = {
      timezone: "Australia/Sydney",
      current: {
        time: "2026-03-20T17:00",
        temperature_2m: 21,
        apparent_temperature: 20
      },
      hourly: {
        time: [
          "2026-03-20T18:00",
          "2026-03-20T21:00",
          "2026-03-21T00:00",
          "2026-03-21T03:00",
          "2026-03-21T06:00"
        ],
        temperature_2m: [20, 19, 17, 16, 15],
        apparent_temperature: [20, 18, 17, 15, 14]
      }
    };

    const forecast = buildForecastModel(payload, {
      name: "Sydney",
      latitude: -33.86,
      longitude: 151.2
    });

    expect(forecast.primaryNight.recommendations).toHaveLength(3);
    expect(forecast.primaryNight.recommendations.map((item) => item.id)).toEqual(
      expect.arrayContaining(["cool", "mild", "warm"])
    );
  });
});
