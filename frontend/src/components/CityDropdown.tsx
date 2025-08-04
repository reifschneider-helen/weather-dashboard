import { useRef } from "react";
import GeodataInterface from "@/models/geodata.model";

export default function CityDropdown(props: {
  suggestions: GeodataInterface[];
  onSelect: (city: GeodataInterface) => void;
}) {
  const { suggestions, onSelect } = props;
  const firstBtnRef = useRef<HTMLButtonElement>(null);

  if (suggestions.length === 0) return null;

  return (
    <ul className="absolute left-0 right-0 bg-white rounded-lg shadow p-2 mt-1 z-10 w-full">
      {suggestions.map((city, idx) => (
        <li key={city.name + city.latitude + city.longitude} role="listbox">
          <button
            ref={idx === 0 ? firstBtnRef : null}
            tabIndex={0}
            role="option"
            className="w-full text-left p-2 hover:bg-blue-100 rounded cursor-pointer"
            onClick={() => {
              onSelect(city);
            }}
          >
            {city.name}
            {city.region && `, ${city.region}`}
            {city.country && `, ${city.country}`}
          </button>
        </li>
      ))}
    </ul>
  );
}
