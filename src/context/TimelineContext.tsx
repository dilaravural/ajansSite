"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface TimelineItem {
  id: string;
  year: string;
  title: string;
  description: string;
}

interface TimelineContextType {
  timeline: TimelineItem[];
  setTimeline: (timeline: TimelineItem[]) => void;
  addTimelineItem: (item: Omit<TimelineItem, "id">) => void;
  updateTimelineItem: (id: string, item: Omit<TimelineItem, "id">) => void;
  deleteTimelineItem: (id: string) => void;
}

const defaultTimeline: TimelineItem[] = [
  {
    id: "1",
    year: "2019",
    title: "Kuruluş",
    description: "Enki Media, dijital medya alanında hizmet vermek üzere kuruldu.",
  },
  {
    id: "2",
    year: "2020",
    title: "İlk Büyük Projeler",
    description: "Ulusal markalara video prodüksiyon hizmeti vermeye başladık.",
  },
  {
    id: "3",
    year: "2021",
    title: "Ekip Genişlemesi",
    description: "Sosyal medya yönetimi ve reklam hizmetlerini portföyümüze ekledik.",
  },
  {
    id: "4",
    year: "2022",
    title: "Ödüller",
    description: "Sektörde yaptığımız başarılı işlerle çeşitli ödüller aldık.",
  },
  {
    id: "5",
    year: "2023",
    title: "Büyüme",
    description: "Müşteri portföyümüzü genişlettik, yeni teknolojilere yatırım yaptık.",
  },
  {
    id: "6",
    year: "2024",
    title: "Yeni Dönem",
    description: "Daha büyük hedeflerle yolumuza devam ediyoruz.",
  },
];

const TimelineContext = createContext<TimelineContextType | undefined>(undefined);

export function TimelineProvider({ children }: { children: ReactNode }) {
  const [timeline, setTimelineState] = useState<TimelineItem[]>(defaultTimeline);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("timeline");
    if (saved) {
      try {
        setTimelineState(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse timeline from localStorage");
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("timeline", JSON.stringify(timeline));
    }
  }, [timeline, isLoaded]);

  const setTimeline = (newTimeline: TimelineItem[]) => {
    setTimelineState(newTimeline);
  };

  const addTimelineItem = (item: Omit<TimelineItem, "id">) => {
    const newItem: TimelineItem = {
      ...item,
      id: Date.now().toString(),
    };
    setTimelineState((prev) => [...prev, newItem]);
  };

  const updateTimelineItem = (id: string, item: Omit<TimelineItem, "id">) => {
    setTimelineState((prev) =>
      prev.map((t) => (t.id === id ? { ...item, id } : t))
    );
  };

  const deleteTimelineItem = (id: string) => {
    setTimelineState((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <TimelineContext.Provider
      value={{ timeline, setTimeline, addTimelineItem, updateTimelineItem, deleteTimelineItem }}
    >
      {children}
    </TimelineContext.Provider>
  );
}

export function useTimeline() {
  const context = useContext(TimelineContext);
  if (context === undefined) {
    throw new Error("useTimeline must be used within a TimelineProvider");
  }
  return context;
}
