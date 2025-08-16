import { useRef } from "react";
import Geodata from "@/models/geodata.model";
import Widget from "@/models/widget.model";

const alreadyExists = (city: Geodata, widgets: Widget[]) => {
  return widgets.some(
    (widget) =>
      widget.location.name === city.name &&
      widget.location.latitude === city.latitude &&
      widget.location.longitude === city.longitude
  );
};

type Props = {
  suggestions: Geodata[];
  widgets: Widget[];
  onSelect: (city: Geodata) => void;
};

export default function CityDropdown({
  suggestions,
  widgets,
  onSelect,
}: Props) {
  const firstBtnRef = useRef<HTMLButtonElement>(null);

  if (suggestions.length === 0) return null;

  return (
    <ul className="absolute left-0 right-0 bg-white dark:bg-gray-800 rounded-lg shadow p-2 mt-1 z-10 w-full">
      {suggestions.map((city, idx) => {
        const exists = alreadyExists(city, widgets);
        return (
          <li key={city.name + city.latitude + city.longitude} role="listbox">
            <button
              aria-disabled={exists}
              ref={idx === 0 ? firstBtnRef : null}
              tabIndex={0}
              role="option"
              className={`text-left p-2 rounded-lg text-black dark:text-gray-100
                 ${
                   exists
                     ? "opacity-50 cursor-not-allowed"
                     : "cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900"
                 }`}
              onClick={() => {
                if (!exists) onSelect(city);
              }}
            >
              {city.name}
              {city.region && `, ${city.region}`}
              {city.country && `, ${city.country}`}
              {exists && (
                <span
                  className="ml-2 text-xs text-black dark:text-gray-100"
                  aria-live="polite"
                >
                  (bereits hinzugefügt)
                </span>
              )}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
