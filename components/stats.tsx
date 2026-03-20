"use client";

import { Mountain, TrendingUp, MapPin } from "lucide-react";
import {
  type Mountain as MountainData,
  getHighestMountain,
} from "@/lib/mountains";

interface StatsProps {
  filteredCount: number;
  totalCount: number;
}

export default function Stats({ filteredCount, totalCount }: StatsProps) {
  const highest = getHighestMountain();

  return (
    <div className="absolute top-4 left-1/2 -translate-x-1/2 lg:left-4 lg:translate-x-0 z-[1000] flex gap-3">
      <div className="bg-card/95 backdrop-blur-sm border border-border rounded-lg px-4 py-2 shadow-lg flex items-center gap-3">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-primary" />
          <div>
            <div className="text-xs text-muted-foreground">Showing</div>
            <div className="text-sm font-semibold">
              {filteredCount}{" "}
              <span className="text-muted-foreground font-normal">
                / {totalCount}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden sm:flex bg-card/95 backdrop-blur-sm border border-border rounded-lg px-4 py-2 shadow-lg items-center gap-3">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-accent" />
          <div>
            <div className="text-xs text-muted-foreground">Highest Peak</div>
            <div className="text-sm font-semibold">
              {highest.name}{" "}
              <span className="text-muted-foreground font-normal">
                {highest.height.toLocaleString()}m
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
