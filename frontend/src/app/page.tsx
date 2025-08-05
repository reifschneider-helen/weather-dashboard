"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { debounce } from "lodash";
import WeatherWidget from "@/components/WeatherWidget";
import Heading from "@/components/Heading";
import SearchBar from "@/components/SearchBar";
import CityDropdown from "@/components/CityDropdown";
import UpdateWidgetsButton from "@/components/UpdateWidgetsButton";
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
  const [isRefreshing, setIsRefreshing] = useState(false);

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

  const handleRefreshAll = async () => {
    console.log("button clicked");
    setIsRefreshing(true);
    await fetchData();
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsRefreshing(false);
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

  const debouncedFetchCitySuggestions = useMemo(
    () => debounce(fetchCitySuggestions, 1000),
    []
  );

  const handleInput = (query: string): void => {
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

  const updateOrAddWidget = (
    prev: WidgetInterface[],
    newWidget: WidgetInterface
  ) => {
    const index = prev.findIndex(
      (widget) =>
        widget.location.name === newWidget.location.name &&
        widget.location.latitude === newWidget.location.latitude &&
        widget.location.longitude === newWidget.location.longitude
    );
    if (index !== -1) {
      console.log("existiert schon");
      const updated = [...prev];
      updated[index] = newWidget;
      return updated;
    } else {
      console.log("new");
      return [...prev, newWidget];
    }
  };

  const handleSelectCity = async (
    location: GeodataInterface
  ): Promise<void> => {
    try {
      const result = await createWidget(location);

      setWidgets((prev) => updateOrAddWidget(prev, result));

      setCitySuggestions([]);
      setInputValue("");
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
            onInput={debouncedFetchCitySuggestions}
            onFocus={debouncedFetchCitySuggestions}
            onEnter={handleEnter}
          />
          <CityDropdown
            suggestions={citySuggestions}
            onSelect={handleSelectCity}
          />
        </div>
        <UpdateWidgetsButton
          onClick={handleRefreshAll}
          loading={isRefreshing}
        />
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
      <footer className="text-gray-800 dark:text-gray-400">
        © Elena Reifschneider 2025
      </footer>
    </div>
  );
}
