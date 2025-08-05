"use client";

import { useState, useEffect, useRef } from "react";
import { debounce } from "lodash";
import WeatherWidget from "@/components/WeatherWidget";
import Heading from "@/components/Heading";
import SearchBar from "@/components/SearchBar";
import CityDropdown from "@/components/CityDropdown";
import UpdateWidgetsButton from "@/components/UpdateWidgetsButton";
import { getWidgets, createWidget, deleteWidget } from "@/services/widgetApi";
import { getCitySuggestions } from "@/services/geocodingApi";
import Widget from "@/models/widget.model";
import Geodata from "@/models/geodata.model";

export default function Home() {
  const [widgets, setWidgets] = useState<Widget[]>([]);
  const [citySuggestions, setCitySuggestions] = useState<Geodata[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    setIsLoading(true);
    (async () => {
      await fetchData();
      setIsLoading(false);
    })();
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      if (debouncedFetchCitySuggestions.current) {
        debouncedFetchCitySuggestions.current.cancel();
      }
    };
  }, []);

  const debouncedFetchCitySuggestions = useRef(
    debounce((query: string) => {
      fetchCitySuggestions(query);
    }, 600)
  );

  const mergeWidgetsPreserveOrder = (prev: Widget[], updated: Widget[]) => {
    if (prev.length === 0) return updated;
    return prev.map((widget) => {
      const found = updated.find(
        (w) =>
          w.location.name === widget.location.name &&
          w.location.latitude === widget.location.latitude &&
          w.location.longitude === widget.location.longitude
      );
      return found ? found : widget;
    });
  };

  const fetchData = async () => {
    try {
      const result = await getWidgets();
      setWidgets((prev) => mergeWidgetsPreserveOrder(prev, result));
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

  const handleClickOutside = (event: MouseEvent) => {
    if (
      searchContainerRef.current &&
      !searchContainerRef.current.contains(event.target as Node)
    ) {
      setCitySuggestions([]);
    }
  };

  const handleRefreshAll = async () => {
    setIsRefreshing(true);
    await fetchData();
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsRefreshing(false);
  };

  const handleInput = (query: string) => {
    debouncedFetchCitySuggestions.current(query);
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

  const handleSelectCity = async (location: Geodata): Promise<void> => {
    try {
      const result = await createWidget(location);

      setWidgets((prev) => [...prev, result]);
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
      <main className="flex flex-col flex-1 gap-[32px] row-start-2 items-center">
        <div
          ref={searchContainerRef}
          onKeyDown={(e) => handleEscape(e)}
          className="relative w-full max-w-xs sm:max-w-[400px] mx-auto px-2"
        >
          <div className="relative">
            <SearchBar
              value={inputValue}
              setValue={setInputValue}
              onInput={handleInput}
              onFocus={handleInput}
              onEnter={handleEnter}
            />
            <CityDropdown
              suggestions={citySuggestions}
              widgets={widgets}
              onSelect={handleSelectCity}
            />
            <div className="absolute right-[-48px] top-1">
              <UpdateWidgetsButton
                onClick={handleRefreshAll}
                loading={isRefreshing}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-4 justify-center w-full">
          {isLoading ? (
            <div className="text-gray-500 text-lg mt-8" aria-live="polite">
              Wird geladen...
            </div>
          ) : (
            widgets.map((widget: Widget) => (
              <WeatherWidget
                key={widget.id}
                widget={widget}
                onDelete={handleDelete}
              />
            ))
          )}
        </div>
      </main>
      <footer className="text-gray-800 dark:text-gray-400">
        © Elena Reifschneider 2025
      </footer>
    </div>
  );
}
