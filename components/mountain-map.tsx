"use client";

import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import {
  type Mountain,
  type MountainType,
  MOUNTAIN_TYPE_COLORS,
  MOUNTAIN_TYPE_LABELS,
} from "@/lib/mountains";

interface MountainMapProps {
  mountains: Mountain[];
  selectedMountain: Mountain | null;
  onMountainSelect: (mountain: Mountain | null) => void;
}

function MapController({
  selectedMountain,
}: {
  selectedMountain: Mountain | null;
}) {
  const map = useMap();

  useEffect(() => {
    if (selectedMountain) {
      map.flyTo([selectedMountain.lat, selectedMountain.lng], 12, {
        duration: 1,
      });
    }
  }, [selectedMountain, map]);

  return null;
}

export default function MountainMap({
  mountains,
  selectedMountain,
  onMountainSelect,
}: MountainMapProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-card">
        <div className="text-muted-foreground">Loading map...</div>
      </div>
    );
  }

  return (
    <MapContainer
      center={[23.7, 120.95]}
      zoom={8}
      className="h-full w-full"
      zoomControl={true}
    >
      <TileLayer
        attribution='Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | <a href="https://opentopomap.org">OpenTopoMap</a>'
        url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
        maxZoom={17}
      />
      <MapController selectedMountain={selectedMountain} />
      {mountains.map((mountain) => (
        <CircleMarker
          key={mountain.id}
          center={[mountain.lat, mountain.lng]}
          radius={
            selectedMountain?.id === mountain.id
              ? 10
              : mountain.type === "百岳"
                ? 7
                : 6
          }
          fillColor={MOUNTAIN_TYPE_COLORS[mountain.type]}
          color={selectedMountain?.id === mountain.id ? "#fff" : "#fff"}
          weight={selectedMountain?.id === mountain.id ? 3 : 1}
          opacity={1}
          fillOpacity={selectedMountain?.id === mountain.id ? 1 : 0.8}
          eventHandlers={{
            click: () => onMountainSelect(mountain),
          }}
        >
          <Popup>
            <div className="min-w-[160px]">
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{
                    backgroundColor: MOUNTAIN_TYPE_COLORS[mountain.type],
                  }}
                />
                <span className="font-semibold text-base">{mountain.name}</span>
              </div>
              <div className="space-y-1 text-sm text-muted-foreground">
                <div className="flex justify-between">
                  <span>Elevation:</span>
                  <span className="font-medium text-foreground">
                    {mountain.height.toLocaleString()}m
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Type:</span>
                  <span className="font-medium text-foreground">
                    {mountain.type}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>ID:</span>
                  <span className="font-medium text-foreground">
                    #{mountain.id}
                  </span>
                </div>
              </div>
            </div>
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  );
}
