import { render, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import useWeatherForecast from "./useWeatherForecast.js";

const fetchForecastMock = vi.fn();
const PLACE = {
  name: "Sydney",
  latitude: -33.8688,
  longitude: 151.2093
};

vi.mock("../services/weatherApi.js", () => ({
  fetchForecast: (...args) => fetchForecastMock(...args)
}));

function HookHarness() {
  useWeatherForecast(PLACE);
  return <div>hook mounted</div>;
}

afterEach(() => {
  vi.restoreAllMocks();
});

describe("useWeatherForecast", () => {
  it("starts an initial fetch and schedules background refreshes", async () => {
    const setIntervalSpy = vi.spyOn(window, "setInterval");

    fetchForecastMock.mockResolvedValue({
      primaryNight: { minApparentTemp: 18, recommendations: [] }
    });

    render(<HookHarness />);

    await waitFor(() => {
      expect(fetchForecastMock).toHaveBeenCalledWith(PLACE, expect.any(AbortSignal));
    });

    expect(setIntervalSpy).toHaveBeenCalledWith(expect.any(Function), 15 * 60 * 1000);
  });
});
