"use client";

import { useState } from "react";
import WeatherWidget from "@/components/WeatherWidget";
import Heading from "@/components/Heading";
import SearchBar from "@/components/SearchBar";
import { createWidget } from "@/services/widgetApi";

export default function Home() {
  const [cities, setCities] = useState<string[]>([]);
  const apiPort = process.env.NEXT_PUBLIC_API_PORT || 5000;

  // interface Widget {

  // }

  async function fetchWeather(city: string) {
    console.log(apiPort);
    const response = await fetch(`http://localhost:${apiPort}/weather/${city}`);
    return await response.json();
  }

  const handleSearch = async (city: string): Promise<void> => {
    // const cityLower = city.toLowerCase();
    // const citiesLower = cities.map((c) => c.toLowerCase());
    // if (!citiesLower.includes(cityLower)) {
    //   const res = await fetchWeather(city);
    //   console.log(res);
    //   setCities([...cities, city]);
    // }
    try {
      const widget = await createWidget(city);
      console.log("widget created");
    } catch (error) {}
  };

  const handleDelete = (id: string) => {
    setCities(cities.filter((c) => c !== id));
  };

  return (
    <div className="font-sans flex flex-col items-center gap-8 h-full min-h-screen">
      <header className="mt-4">
        <Heading title="Wetter Dashboard" />
      </header>
      <main className="flex flex-col flex-1 gap-[32px] row-start-2 items-center sm:items-start">
        <SearchBar onSearch={handleSearch} />
        {cities.map((city: string) => (
          <WeatherWidget
            key={city}
            id={city}
            city={city}
            temperature={20}
            humidity={50}
            onDelete={handleDelete}
          />
        ))}
        <WeatherWidget
          id="Berlin"
          city="Berlin"
          temperature={20}
          humidity={50}
          onDelete={handleDelete}
        />
      </main>
      <footer></footer>
    </div>
  );
}
