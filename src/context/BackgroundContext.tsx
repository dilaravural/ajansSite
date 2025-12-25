"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface PageBackground {
  id: string;
  title: string;
  image: string;
}

interface BackgroundContextType {
  backgrounds: PageBackground[];
  setBackgrounds: (backgrounds: PageBackground[]) => void;
  getBackground: (pageId: string) => string;
  updateBackground: (pageId: string, image: string) => void;
}

const defaultBackgrounds: PageBackground[] = [
  { id: "hakkimizda", title: "Hakkımızda", image: "" },
  { id: "hizmetler", title: "Hizmetler", image: "" },
  { id: "portfolyo", title: "Portföy", image: "" },
  { id: "iletisim", title: "İletişim", image: "" },
];

const BackgroundContext = createContext<BackgroundContextType | undefined>(undefined);

export function BackgroundProvider({ children }: { children: ReactNode }) {
  const [backgrounds, setBackgroundsState] = useState<PageBackground[]>(defaultBackgrounds);
  const [isLoaded, setIsLoaded] = useState(false);

  // localStorage'dan yükle
  useEffect(() => {
    const saved = localStorage.getItem("pageBackgrounds");
    if (saved) {
      try {
        setBackgroundsState(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse backgrounds from localStorage");
      }
    }
    setIsLoaded(true);
  }, []);

  // localStorage'a kaydet
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("pageBackgrounds", JSON.stringify(backgrounds));
    }
  }, [backgrounds, isLoaded]);

  const setBackgrounds = (newBackgrounds: PageBackground[]) => {
    setBackgroundsState(newBackgrounds);
  };

  const getBackground = (pageId: string): string => {
    const page = backgrounds.find((bg) => bg.id === pageId);
    return page?.image || "";
  };

  const updateBackground = (pageId: string, image: string) => {
    setBackgroundsState((prev) =>
      prev.map((bg) => (bg.id === pageId ? { ...bg, image } : bg))
    );
  };

  return (
    <BackgroundContext.Provider
      value={{ backgrounds, setBackgrounds, getBackground, updateBackground }}
    >
      {children}
    </BackgroundContext.Provider>
  );
}

export function useBackgrounds() {
  const context = useContext(BackgroundContext);
  if (context === undefined) {
    throw new Error("useBackgrounds must be used within a BackgroundProvider");
  }
  return context;
}
