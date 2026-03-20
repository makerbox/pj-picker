import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import RecommendationPanel from "./RecommendationPanel.jsx";

describe("RecommendationPanel", () => {
  it("renders multiple PJ options for the active night", () => {
    render(
      <RecommendationPanel
        isLoading={false}
        error=""
        forecast={{
          place: { name: "Sydney" },
          primaryNight: {
            label: "Tonight",
            minApparentTemp: 14,
            maxApparentTemp: 20,
            recommendations: [
              {
                id: "cool",
                title: "Warm cotton layer",
                rangeLabel: "12°C to 16°C",
                description: "First option",
                layers: ["Layer one"],
                note: "Check the room"
              },
              {
                id: "mild",
                title: "Classic all-season pyjamas",
                rangeLabel: "16°C to 20°C",
                description: "Second option",
                layers: ["Layer two"],
                note: "Adjust as needed"
              }
            ]
          }
        }}
      />
    );

    expect(screen.getByText("Warm cotton layer")).toBeInTheDocument();
    expect(screen.getByText("Classic all-season pyjamas")).toBeInTheDocument();
    expect(screen.getByText(/Multiple options appear/i)).toBeInTheDocument();
  });
});
