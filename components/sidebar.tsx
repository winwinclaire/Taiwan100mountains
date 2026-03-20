"use client";

import { useState, useMemo } from "react";
import { Search, Mountain, ChevronDown, ChevronUp, X } from "lucide-react";
import {
  type Mountain as MountainData,
  type MountainType,
  MOUNTAIN_TYPES,
  MOUNTAIN_TYPE_COLORS,
  MOUNTAIN_TYPE_LABELS,
  getMountainStats,
} from "@/lib/mountains";
import { cn } from "@/lib/utils";

interface SidebarProps {
  mountains: MountainData[];
  selectedTypes: MountainType[];
  onTypeToggle: (type: MountainType) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedMountain: MountainData | null;
  onMountainSelect: (mountain: MountainData | null) => void;
  sortBy: "id" | "height" | "name";
  onSortChange: (sort: "id" | "height" | "name") => void;
  isOpen: boolean;
  onToggle: () => void;
}

export default function Sidebar({
  mountains,
  selectedTypes,
  onTypeToggle,
  searchQuery,
  onSearchChange,
  selectedMountain,
  onMountainSelect,
  sortBy,
  onSortChange,
  isOpen,
  onToggle,
}: SidebarProps) {
  const stats = useMemo(() => getMountainStats(), []);

  const sortedMountains = useMemo(() => {
    const filtered = [...mountains];
    switch (sortBy) {
      case "height":
        return filtered.sort((a, b) => b.height - a.height);
      case "name":
        return filtered.sort((a, b) => a.name.localeCompare(b.name, "zh-TW"));
      default:
        return filtered.sort((a, b) => a.id.localeCompare(b.id));
    }
  }, [mountains, sortBy]);

  return (
    <>
      {/* Mobile toggle button */}
      <button
        onClick={onToggle}
        className={cn(
          "lg:hidden fixed top-4 left-4 z-[1000] bg-card border border-border rounded-lg p-2 shadow-lg",
          isOpen && "left-[calc(100%-56px)]"
        )}
      >
        {isOpen ? <X className="w-5 h-5" /> : <Mountain className="w-5 h-5" />}
      </button>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:relative inset-y-0 left-0 z-[999] w-full sm:w-80 lg:w-80 bg-card border-r border-border flex flex-col transition-transform duration-300",
          !isOpen && "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-2 mb-1">
            <Mountain className="w-5 h-5 text-primary" />
            <h1 className="text-lg font-semibold">Taiwan 100 Mountains</h1>
          </div>
          <p className="text-sm text-muted-foreground">
            Showing {mountains.length} of 100 mountains
          </p>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-border">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search mountains..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full bg-input border border-border rounded-lg py-2 pl-9 pr-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </div>

        {/* Filter by Type */}
        <div className="p-4 border-b border-border">
          <h2 className="text-sm font-medium mb-3">Filter by Type</h2>
          <div className="space-y-2">
            {MOUNTAIN_TYPES.map((type) => (
              <label
                key={type}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={selectedTypes.includes(type)}
                  onChange={() => onTypeToggle(type)}
                  className="sr-only"
                />
                <span
                  className={cn(
                    "w-5 h-5 rounded border-2 flex items-center justify-center transition-colors",
                    selectedTypes.includes(type)
                      ? "border-transparent"
                      : "border-border"
                  )}
                  style={{
                    backgroundColor: selectedTypes.includes(type)
                      ? MOUNTAIN_TYPE_COLORS[type]
                      : "transparent",
                  }}
                >
                  {selectedTypes.includes(type) && (
                    <svg
                      className="w-3 h-3 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </span>
                <span className="flex-1 text-sm">{type}</span>
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: MOUNTAIN_TYPE_COLORS[type] }}
                />
                <span className="text-xs text-muted-foreground w-6 text-right">
                  {stats[type]}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Sort */}
        <div className="p-4 border-b border-border">
          <h2 className="text-sm font-medium mb-3">Sort by</h2>
          <div className="flex gap-2">
            {(["id", "height", "name"] as const).map((sort) => (
              <button
                key={sort}
                onClick={() => onSortChange(sort)}
                className={cn(
                  "flex-1 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors",
                  sortBy === sort
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-muted"
                )}
              >
                {sort === "id" ? "ID" : sort === "height" ? "Height" : "Name"}
              </button>
            ))}
          </div>
        </div>

        {/* Mountain List */}
        <div className="flex-1 overflow-y-auto">
          <div className="divide-y divide-border">
            {sortedMountains.map((mountain) => (
              <button
                key={mountain.id}
                onClick={() => {
                  onMountainSelect(mountain);
                  if (window.innerWidth < 1024) {
                    onToggle();
                  }
                }}
                className={cn(
                  "w-full px-4 py-3 text-left transition-colors hover:bg-secondary/50",
                  selectedMountain?.id === mountain.id && "bg-secondary"
                )}
              >
                <div className="flex items-start gap-3">
                  <span
                    className="w-3 h-3 rounded-full mt-1 flex-shrink-0"
                    style={{
                      backgroundColor: MOUNTAIN_TYPE_COLORS[mountain.type],
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xs text-muted-foreground">
                        #{mountain.id}
                      </span>
                      <span className="font-medium truncate">
                        {mountain.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-sm text-muted-foreground">
                        {mountain.height.toLocaleString()}m
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {mountain.type}
                      </span>
                    </div>
                  </div>
                  {sortBy === "height" && (
                    <span className="text-xs text-muted-foreground">
                      {mountain.height >= 3000
                        ? "3K+"
                        : mountain.height >= 2000
                          ? "2K+"
                          : mountain.height >= 1000
                            ? "1K+"
                            : "<1K"}
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
}
