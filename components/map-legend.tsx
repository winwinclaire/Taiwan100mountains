"use client";

import { getTypeColor, Mountain } from "@/lib/mountains";

const types: Mountain["type"][] = ["百岳", "小百岳", "中級山", "高山", "郊山"];

interface MapLegendProps {
  totalMountains: number;
  completedCount: number;
}

export default function MapLegend({ totalMountains, completedCount }: MapLegendProps) {
  return (
    <div className="bg-card/95 backdrop-blur-sm rounded-lg shadow-lg p-4 border border-border">
      <h3 className="font-semibold text-foreground mb-3">圖例</h3>
      <div className="space-y-2">
        {types.map((type) => (
          <div key={type} className="flex items-center gap-2">
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: getTypeColor(type) }}
            />
            <span className="text-sm text-foreground">{type}</span>
          </div>
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">完成進度</span>
          <span className="font-semibold text-primary">
            {completedCount} / {totalMountains}
          </span>
        </div>
        <div className="mt-2 h-2 bg-secondary rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-500"
            style={{ width: `${(completedCount / totalMountains) * 100}%` }}
          />
        </div>
        <p className="text-xs text-muted-foreground mt-1 text-right">
          {((completedCount / totalMountains) * 100).toFixed(1)}%
        </p>
      </div>
    </div>
  );
}
