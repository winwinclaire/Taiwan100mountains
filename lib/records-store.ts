"use client";

import { HikingRecord } from "./mountains";

const STORAGE_KEY = "hiking-records";

export function getRecords(): HikingRecord[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function saveRecord(record: Omit<HikingRecord, "id" | "createdAt">): HikingRecord {
  const records = getRecords();
  const newRecord: HikingRecord = {
    ...record,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  records.push(newRecord);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
  return newRecord;
}

export function deleteRecord(id: string): void {
  const records = getRecords().filter((r) => r.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
}

export function updateRecord(
  id: string,
  data: Partial<Pick<HikingRecord, "date" | "notes">>
): HikingRecord | null {
  const records = getRecords();
  const index = records.findIndex((r) => r.id === id);
  if (index === -1) return null;
  
  records[index] = { ...records[index], ...data };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
  return records[index];
}

export function getRecordsByMountain(mountainId: string): HikingRecord[] {
  return getRecords().filter((r) => r.mountainId === mountainId);
}
