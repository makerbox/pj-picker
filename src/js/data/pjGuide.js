export const PJ_GUIDE = [
  {
    id: "very-cold",
    minTemp: -50,
    maxTemp: 8,
    rangeLabel: "under 8°C",
    title: "Thermal layered sleep setup",
    description: "Best for genuinely cold bedrooms or sharp overnight drops.",
    layers: [
      "Thermal singlet or bodysuit",
      "Brushed cotton or fleece footed pyjamas",
      "Warm 3.5 TOG sleep sack if your toddler uses one"
    ],
    note: "Check the room temperature before adding every layer so your toddler does not overheat."
  },
  {
    id: "cold",
    minTemp: 8,
    maxTemp: 12,
    rangeLabel: "8°C to 12°C",
    title: "Cosy winter pyjamas",
    description: "A warm option for cold nights where a single cotton layer may feel too light.",
    layers: [
      "Long-sleeve pyjamas or a footed onesie",
      "Optional singlet underneath",
      "2.5 TOG to 3.5 TOG sleep sack"
    ],
    note: "If the room is heated overnight, the lighter end of this option is usually enough."
  },
  {
    id: "cool",
    minTemp: 12,
    maxTemp: 16,
    rangeLabel: "12°C to 16°C",
    title: "Warm cotton layer",
    description: "A good middle ground for cool evenings and mild winter bedrooms.",
    layers: [
      "Long-sleeve cotton pyjamas",
      "Footless romper or leggings if legs run cold",
      "2.5 TOG sleep sack"
    ],
    note: "Ideal when the overnight forecast is cool but not icy."
  },
  {
    id: "mild",
    minTemp: 16,
    maxTemp: 20,
    rangeLabel: "16°C to 20°C",
    title: "Classic all-season pyjamas",
    description: "A balanced pick for mild nights that do not need heavy layering.",
    layers: [
      "Long-sleeve cotton pyjamas or a footless onesie",
      "Light singlet if your toddler usually sleeps cool",
      "1.0 TOG to 2.5 TOG sleep sack"
    ],
    note: "This is the safest starting point when the forecast is steady and mild."
  },
  {
    id: "warm",
    minTemp: 20,
    maxTemp: 24,
    rangeLabel: "20°C to 24°C",
    title: "Lightweight summer pyjamas",
    description: "A breezy setup for warm nights where full-length layers may be too much.",
    layers: [
      "Short-sleeve pyjamas or a light bodysuit",
      "Breathable cotton shorts or romper",
      "0.5 TOG sleep sack if needed"
    ],
    note: "Choose loose natural fibres and skip extra layers if the room stays warm."
  },
  {
    id: "hot",
    minTemp: 24,
    maxTemp: 60,
    rangeLabel: "24°C and above",
    title: "Minimal sleep layers",
    description: "Use the lightest setup possible when the overnight forecast stays hot.",
    layers: [
      "Sleeveless bodysuit or nappy only if appropriate",
      "Very light muslin sleep sack only if your toddler still needs one",
      "Keep airflow moving and the room shaded where possible"
    ],
    note: "Heat safety matters more than matching a fixed outfit plan. Re-check your toddler before bed."
  }
];

export function getRecommendationsForRange(minTemp, maxTemp) {
  return PJ_GUIDE.filter(
    (entry) => entry.minTemp <= maxTemp && entry.maxTemp >= minTemp
  );
}
