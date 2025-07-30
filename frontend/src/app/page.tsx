import WeatherWidget from "@/components/WeatherWidget";
import Heading from "@/components/Heading";

export default function Home() {
  return (
    <div className="font-sans flex flex-col items-center gap-8 h-full min-h-screen">
      <header className="mt-4">
        <Heading title="Wetter Dashboard" />
      </header>
      <main className="flex flex-col flex-1 gap-[32px] row-start-2 items-center sm:items-start">
        <WeatherWidget city="Berlin" temperature={20} humidity={50} />
      </main>
      <footer></footer>
    </div>
  );
}
