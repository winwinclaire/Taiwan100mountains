"use client";

import {
  MOUNTAIN_TYPES,
  MOUNTAIN_TYPE_COLORS,
  MOUNTAIN_TYPE_LABELS,
  type MountainType,
} from "@/lib/mountains";

interface LegendProps {
  selectedTypes: MountainType[];
}

export default function Legend({ selectedTypes }: LegendProps) {
  return (
    <div className="absolute bottom-6 right-6 z-[1000] bg-card/95 backdrop-blur-sm border border-border rounded-lg p-4 shadow-lg">
      <h3 className="text-sm font-semibold mb-3">Legend</h3>
      <div className="space-y-2">
        {MOUNTAIN_TYPES.map((type) => (
          <div
            key={type}
            className={`flex items-center gap-2 transition-opacity ${
              selectedTypes.includes(type) ? "opacity-100" : "opacity-40"
            }`}
          >
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: MOUNTAIN_TYPE_COLORS[type] }}
            />
            <span className="text-sm">{type}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
