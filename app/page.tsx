"use client";

import { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import Sidebar from "@/components/sidebar";
import Legend from "@/components/legend";
import Stats from "@/components/stats";
import {
  mountains as allMountains,
  type Mountain,
  type MountainType,
  MOUNTAIN_TYPES,
} from "@/lib/mountains";

const MountainMap = dynamic(() => import("@/components/mountain-map"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full flex items-center justify-center bg-card">
      <div className="text-muted-foreground">Loading map...</div>
    </div>
  ),
});

export default function Home() {
  const [selectedTypes, setSelectedTypes] =
    useState<MountainType[]>(MOUNTAIN_TYPES);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMountain, setSelectedMountain] = useState<Mountain | null>(
    null
  );
  const [sortBy, setSortBy] = useState<"id" | "height" | "name">("id");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const filteredMountains = useMemo(() => {
    return allMountains.filter((mountain) => {
      const matchesType = selectedTypes.includes(mountain.type);
      const matchesSearch =
        searchQuery === "" ||
        mountain.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mountain.id.includes(searchQuery);
      return matchesType && matchesSearch;
    });
  }, [selectedTypes, searchQuery]);

  const handleTypeToggle = (type: MountainType) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  return (
    <main className="h-screen flex overflow-hidden">
      <Sidebar
        mountains={filteredMountains}
        selectedTypes={selectedTypes}
        onTypeToggle={handleTypeToggle}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedMountain={selectedMountain}
        onMountainSelect={setSelectedMountain}
        sortBy={sortBy}
        onSortChange={setSortBy}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />
      <div className="flex-1 relative">
        <MountainMap
          mountains={filteredMountains}
          selectedMountain={selectedMountain}
          onMountainSelect={setSelectedMountain}
        />
        <Stats
          filteredCount={filteredMountains.length}
          totalCount={allMountains.length}
        />
        <Legend selectedTypes={selectedTypes} />
      </div>
    </main>
  );
}
