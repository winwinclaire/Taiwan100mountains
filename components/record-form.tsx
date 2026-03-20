"use client";

import { useState } from "react";
import { Mountain } from "@/lib/mountains";
import { X, Mountain as MountainIcon, Calendar, FileText } from "lucide-react";
import { format } from "date-fns";

interface RecordFormProps {
  mountain: Mountain;
  onSubmit: (data: { date: string; notes: string }) => void;
  onClose: () => void;
}

export default function RecordForm({ mountain, onSubmit, onClose }: RecordFormProps) {
  const [date, setDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [notes, setNotes] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ date, notes });
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/50">
      <div className="bg-card w-full max-w-md rounded-lg shadow-xl">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-lg font-semibold text-card-foreground">新增登山紀錄</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-md hover:bg-secondary transition-colors"
          >
            <X className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-4">
          <div className="mb-4 p-3 bg-secondary rounded-lg">
            <div className="flex items-center gap-2 text-foreground">
              <MountainIcon className="h-5 w-5 text-primary" />
              <span className="font-medium">{mountain.id} {mountain.name}</span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              {mountain.height}m - {mountain.type}
            </p>
          </div>
          
          <div className="mb-4">
            <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              登頂日期
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          
          <div className="mb-6">
            <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
              <FileText className="h-4 w-4 text-muted-foreground" />
              說明 / 心得
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="記錄你的登山心得、天氣狀況、同行夥伴..."
              rows={4}
              className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
            />
          </div>
          
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-border rounded-md text-foreground hover:bg-secondary transition-colors"
            >
              取消
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors font-medium"
            >
              儲存紀錄
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
