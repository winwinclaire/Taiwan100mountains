"use client";

import { HikingRecord, Mountain, getTypeColor } from "@/lib/mountains";
import { format } from "date-fns";
import { zhTW } from "date-fns/locale";
import { Trash2, MapPin, Calendar, Mountain as MountainIcon } from "lucide-react";

interface RecordsListProps {
  records: HikingRecord[];
  mountains: Mountain[];
  onDelete: (id: string) => void;
  onSelectMountain: (mountainId: string) => void;
}

export default function RecordsList({ records, mountains, onDelete, onSelectMountain }: RecordsListProps) {
  const mountainMap = new Map(mountains.map((m) => [m.id, m]));
  
  const sortedRecords = [...records].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  if (records.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-6">
        <MountainIcon className="h-12 w-12 text-muted-foreground mb-3" />
        <p className="text-muted-foreground">尚無登山紀錄</p>
        <p className="text-sm text-muted-foreground mt-1">
          點擊地圖上的山峰來新增紀錄
        </p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-border">
      {sortedRecords.map((record) => {
        const mountain = mountainMap.get(record.mountainId);
        if (!mountain) return null;
        
        return (
          <div key={record.id} className="p-4 hover:bg-secondary/50 transition-colors">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <button
                  onClick={() => onSelectMountain(record.mountainId)}
                  className="flex items-center gap-2 text-left group"
                >
                  <div
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: getTypeColor(mountain.type) }}
                  />
                  <span className="font-medium text-foreground group-hover:text-primary transition-colors truncate">
                    {mountain.id} {mountain.name}
                  </span>
                </button>
                
                <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    {format(new Date(record.date), "yyyy/MM/dd (EEEE)", { locale: zhTW })}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" />
                    {mountain.height}m
                  </span>
                </div>
                
                {record.notes && (
                  <p className="mt-2 text-sm text-foreground line-clamp-2">
                    {record.notes}
                  </p>
                )}
              </div>
              
              <button
                onClick={() => onDelete(record.id)}
                className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-md transition-colors flex-shrink-0"
                title="刪除紀錄"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
