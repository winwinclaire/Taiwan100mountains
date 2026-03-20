"use client";

import { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import { mountains, Mountain, HikingRecord } from "@/lib/mountains";
import { getRecords, saveRecord, deleteRecord } from "@/lib/records-store";
import RecordForm from "@/components/record-form";
import RecordsList from "@/components/records-list";
import MapLegend from "@/components/map-legend";
import { Mountain as MountainIcon, List, Map as MapIcon, X } from "lucide-react";

const MountainMap = dynamic(() => import("@/components/mountain-map"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full flex items-center justify-center bg-secondary">
      <p className="text-muted-foreground">載入地圖中...</p>
    </div>
  ),
});

export default function Home() {
  const [records, setRecords] = useState<HikingRecord[]>([]);
  const [selectedMountain, setSelectedMountain] = useState<Mountain | null>(null);
  const [showRecordsList, setShowRecordsList] = useState(false);
  const [selectedMountainId, setSelectedMountainId] = useState<string | null>(null);

  useEffect(() => {
    setRecords(getRecords());
  }, []);

  const handleAddRecord = useCallback((mountain: Mountain) => {
    setSelectedMountain(mountain);
  }, []);

  const handleSubmitRecord = useCallback(
    (data: { date: string; notes: string }) => {
      if (!selectedMountain) return;
      const newRecord = saveRecord({
        mountainId: selectedMountain.id,
        date: data.date,
        notes: data.notes,
      });
      setRecords((prev) => [...prev, newRecord]);
      setSelectedMountain(null);
    },
    [selectedMountain]
  );

  const handleDeleteRecord = useCallback((id: string) => {
    deleteRecord(id);
    setRecords((prev) => prev.filter((r) => r.id !== id));
  }, []);

  const handleSelectMountain = useCallback((mountainId: string) => {
    setSelectedMountainId(mountainId);
    setShowRecordsList(false);
  }, []);

  const completedMountainIds = new Set(records.map((r) => r.mountainId));

  return (
    <main className="h-screen w-screen flex flex-col overflow-hidden">
      {/* Header */}
      <header className="flex-shrink-0 bg-card border-b border-border px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <MountainIcon className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground">台灣百名山</h1>
              <p className="text-xs text-muted-foreground">Taiwan Marvelous 100</p>
            </div>
          </div>
          
          <button
            onClick={() => setShowRecordsList(!showRecordsList)}
            className="flex items-center gap-2 px-3 py-2 bg-secondary hover:bg-secondary/80 rounded-lg transition-colors"
          >
            {showRecordsList ? (
              <>
                <MapIcon className="h-4 w-4" />
                <span className="text-sm font-medium">地圖</span>
              </>
            ) : (
              <>
                <List className="h-4 w-4" />
                <span className="text-sm font-medium">紀錄</span>
                {records.length > 0 && (
                  <span className="ml-1 px-1.5 py-0.5 bg-primary text-primary-foreground text-xs rounded-full">
                    {records.length}
                  </span>
                )}
              </>
            )}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 relative overflow-hidden">
        {/* Map */}
        <div className="absolute inset-0">
          <MountainMap
            mountains={mountains}
            records={records}
            onAddRecord={handleAddRecord}
            selectedMountainId={selectedMountainId}
          />
        </div>

        {/* Legend - Desktop */}
        <div className="absolute bottom-4 right-4 z-[400] hidden md:block">
          <MapLegend
            totalMountains={mountains.length}
            completedCount={completedMountainIds.size}
          />
        </div>

        {/* Legend - Mobile (mini version) */}
        <div className="absolute bottom-4 left-4 z-[400] md:hidden">
          <div className="bg-card/95 backdrop-blur-sm rounded-lg shadow-lg px-3 py-2 border border-border">
            <p className="text-sm font-medium text-foreground">
              完成: <span className="text-primary">{completedMountainIds.size}</span> / {mountains.length}
            </p>
          </div>
        </div>

        {/* Records Sidebar */}
        <div
          className={`absolute top-0 right-0 h-full w-full md:w-96 bg-card border-l border-border z-[500] transform transition-transform duration-300 ${
            showRecordsList ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between p-4 border-b border-border">
            <h2 className="font-semibold text-foreground">登山紀錄</h2>
            <button
              onClick={() => setShowRecordsList(false)}
              className="p-1 rounded-md hover:bg-secondary transition-colors md:hidden"
            >
              <X className="h-5 w-5 text-muted-foreground" />
            </button>
          </div>
          <div className="overflow-y-auto h-[calc(100%-57px)]">
            <RecordsList
              records={records}
              mountains={mountains}
              onDelete={handleDeleteRecord}
              onSelectMountain={handleSelectMountain}
            />
          </div>
        </div>
      </div>

      {/* Record Form Modal */}
      {selectedMountain && (
        <RecordForm
          mountain={selectedMountain}
          onSubmit={handleSubmitRecord}
          onClose={() => setSelectedMountain(null)}
        />
      )}
    </main>
  );
}
