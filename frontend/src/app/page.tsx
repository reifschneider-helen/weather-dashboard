"use client";

import { useState, useEffect } from "react";
import WeatherWidget from "@/components/WeatherWidget";
import Heading from "@/components/Heading";
import SearchBar from "@/components/SearchBar";
import { getWidgets, createWidget, deleteWidget } from "@/services/widgetApi";
import WidgetInterface from "@/models/widget.model";

export default function Home() {
  const [widgets, setWidgets] = useState<WidgetInterface[]>([]);
  useEffect(() => {
    async function fetchWidgets() {
      const result = await getWidgets();
      setWidgets(result);
    }
    try {
      fetchWidgets();
    } catch (error) {
      console.error("Failed to get widgets: ", error);
    }
  }, []);

  const handleSearch = async (city: string): Promise<void> => {
    try {
      const result = await createWidget(city);
      setWidgets((prev) => [...prev, result]);
      console.log(result, "widget created");
    } catch (error) {
      console.error("Failed to create widget: ", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteWidget(id);
      setWidgets((prev) => prev.filter((widget) => widget.id !== id));
    } catch (error) {
      console.error("Failed to delete widget: ", error);
    }
  };

  return (
    <div className="font-sans flex flex-col items-center gap-8 h-full min-h-screen">
      <header className="mt-4">
        <Heading title="Wetter Dashboard" />
      </header>
      <main className="flex flex-col flex-1 gap-[32px] row-start-2 items-center sm:items-start">
        <SearchBar onSearch={handleSearch} />
        {widgets.map((widget: WidgetInterface) => (
          <WeatherWidget
            key={widget.id}
            widget={widget}
            onDelete={handleDelete}
          />
        ))}
      </main>
      <footer></footer>
    </div>
  );
}
