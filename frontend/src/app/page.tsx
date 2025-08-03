"use client";

import { useState, useEffect } from "react";
import WeatherWidget from "@/components/WeatherWidget";
import Heading from "@/components/Heading";
import SearchBar from "@/components/SearchBar";
import CityDropdown from "@/components/CityDropdown";
import { getWidgets, createWidget, deleteWidget } from "@/services/widgetApi";
import { getCitySuggestions } from "@/services/geocodingApi";
import WidgetInterface from "@/models/widget.model";
import GeodataInterface from "@/models/geodata.model";

export default function Home() {
  const [widgets, setWidgets] = useState<WidgetInterface[]>([]);
  const [citySuggestions, setCitySuggestions] = useState<GeodataInterface[]>(
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getWidgets();
        setWidgets(result);
      } catch (error) {
        console.error("Failed to get widgets: ", error);
      }
    };
    fetchData();
  }, []);

  const handleSearch = async (query: string): Promise<void> => {
    try {
      const suggestions = await getCitySuggestions(query);
      setCitySuggestions(suggestions);
    } catch (error) {
      console.error("Failed to fetch city suggestions: ", error);
    }
  };

  const handleSelectCity = async (
    location: GeodataInterface
  ): Promise<void> => {
    // if (
    //   widgets.some(
    //     (widget) =>
    //       widget.location.toLocaleLowerCase() === location.toLowerCase()
    //   )
    // ) {
    //   return;
    // }
    const city = {
      name: location.name,
      latitude: location.latitude,
      longitude: location.longitude,
      country: location.country,
      region: location.region,
    };

    try {
      const result = await createWidget(city);
      setWidgets((prev) => [...prev, result]);
      setCitySuggestions([]);
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
        <div className="relative w-96 mx-auto">
          <SearchBar onSearch={handleSearch} />
          <CityDropdown
            suggestions={citySuggestions}
            onSelect={handleSelectCity}
          />
        </div>
        <div className="flex flex-wrap gap-4 justify-center w-full">
          {widgets.map((widget: WidgetInterface) => (
            <WeatherWidget
              key={widget.id}
              widget={widget}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </main>
      <footer></footer>
    </div>
  );
}
