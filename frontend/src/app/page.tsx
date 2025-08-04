"use client";

import { useState, useEffect, useRef } from "react";
import { debounce } from "lodash";
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
  const [inputValue, setInputValue] = useState("");

  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    fetchData();
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      searchContainerRef.current &&
      !searchContainerRef.current.contains(event.target as Node)
    ) {
      setCitySuggestions([]);
    }
  };

  const fetchData = async () => {
    try {
      const result = await getWidgets();
      setWidgets(result);
    } catch (error) {
      console.error("Failed to get widgets: ", error);
    }
  };

  const fetchCitySuggestions = async (query: string): Promise<void> => {
    if (query.length < 3) {
      setCitySuggestions([]);
      return;
    }
    try {
      const suggestions = await getCitySuggestions(query);
      setCitySuggestions(suggestions);
    } catch (error) {
      console.error("Failed to fetch city suggestions: ", error);
    }
  };

  const debouncedFetchCitySuggestions = debounce((query: string) => {
    fetchCitySuggestions(query);
  }, 300);

  const handleInput = async (query: string): Promise<void> => {
    debouncedFetchCitySuggestions(query);
  };

  const handleEnter = () => {
    if (citySuggestions.length > 0) {
      handleSelectCity(citySuggestions[0]);
    }
  };

  const handleEscape = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") {
      setCitySuggestions([]);
    }
  };

  const handleSelectCity = async (
    location: GeodataInterface
  ): Promise<void> => {
    try {
      const result = await createWidget(location);
      setWidgets((prev) => [...prev, result]);
      setCitySuggestions([]);
      setInputValue("")
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
        <div
          ref={searchContainerRef}
          onKeyDown={(e) => handleEscape(e)}
          className="relative w-96 mx-auto"
        >
          <SearchBar
            value={inputValue}
            setValue={setInputValue}
            onInput={handleInput}
            onFocus={fetchCitySuggestions}
            onEnter={handleEnter}
          />
          <CityDropdown
            suggestions={citySuggestions}
            onSelect={handleSelectCity}
          />
        </div>
        <div className="flex flex-wrap gap-4 justify-center w-full">
          {widgets.map(
            (
              widget: WidgetInterface //add spiner
            ) => (
              <WeatherWidget
                key={widget.id}
                widget={widget}
                onDelete={handleDelete}
              />
            )
          )}
        </div>
      </main>
      <footer></footer>
    </div>
  );
}
