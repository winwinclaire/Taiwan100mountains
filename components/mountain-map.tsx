"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from "react-leaflet";
import { Mountain, HikingRecord, getTypeColor } from "@/lib/mountains";
import { getRecordsByMountain } from "@/lib/records-store";
import { format } from "date-fns";
import { zhTW } from "date-fns/locale";
import { CheckCircle, Plus } from "lucide-react";
import "leaflet/dist/leaflet.css";

interface MountainMapProps {
  mountains: Mountain[];
  records: HikingRecord[];
  onAddRecord: (mountain: Mountain) => void;
  selectedMountainId?: string | null;
}

function MapUpdater({ selectedMountainId, mountains }: { selectedMountainId?: string | null; mountains: Mountain[] }) {
  const map = useMap();
  
  useEffect(() => {
    if (selectedMountainId) {
      const mountain = mountains.find(m => m.id === selectedMountainId);
      if (mountain) {
        map.setView([mountain.lat, mountain.lng], 12);
      }
    }
  }, [selectedMountainId, mountains, map]);
  
  return null;
}

export default function MountainMap({ mountains, records, onAddRecord, selectedMountainId }: MountainMapProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-secondary">
        <p className="text-muted-foreground">載入地圖中...</p>
      </div>
    );
  }

  const recordedMountainIds = new Set(records.map((r) => r.mountainId));

  return (
    <MapContainer
      center={[23.7, 120.95]}
      zoom={8}
      className="h-full w-full"
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
      />
      <MapUpdater selectedMountainId={selectedMountainId} mountains={mountains} />
      {mountains.map((mountain) => {
        const isRecorded = recordedMountainIds.has(mountain.id);
        const mountainRecords = getRecordsByMountain(mountain.id);
        const latestRecord = mountainRecords.length > 0 
          ? mountainRecords.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0]
          : null;

        return (
          <CircleMarker
            key={mountain.id}
            center={[mountain.lat, mountain.lng]}
            radius={isRecorded ? 10 : 6}
            fillColor={getTypeColor(mountain.type)}
            color={isRecorded ? "#ffffff" : "#ffffff"}
            weight={isRecorded ? 3 : 1}
            opacity={1}
            fillOpacity={0.8}
          >
            <Popup>
              <div className="mountain-popup min-w-[200px]">
                <h3 className="text-base font-semibold text-foreground">
                  {mountain.id} {mountain.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  高度: {mountain.height}m
                </p>
                <p className="text-sm text-muted-foreground">
                  類型: {mountain.type}
                </p>
                
                {isRecorded && latestRecord && (
                  <div className="mt-3 p-2 bg-green-50 rounded-md border border-green-200">
                    <div className="flex items-center gap-1 text-green-700 text-sm font-medium">
                      <CheckCircle className="h-4 w-4" />
                      已登頂
                    </div>
                    <p className="text-xs text-green-600 mt-1">
                      最近: {format(new Date(latestRecord.date), "yyyy/MM/dd", { locale: zhTW })}
                    </p>
                    {latestRecord.notes && (
                      <p className="text-xs text-green-600 mt-1 line-clamp-2">
                        {latestRecord.notes}
                      </p>
                    )}
                  </div>
                )}
                
                <button
                  onClick={() => onAddRecord(mountain)}
                  className="mt-3 w-full flex items-center justify-center gap-1 px-3 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-md hover:bg-primary/90 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  新增紀錄
                </button>
              </div>
            </Popup>
          </CircleMarker>
        );
      })}
    </MapContainer>
  );
}
