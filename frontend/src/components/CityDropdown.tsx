import GeodataInterface from "@/models/geodata.model";

export default function CityDropdown(props: {
  suggestions: GeodataInterface[];
  onSelect: (city: GeodataInterface) => void;
}) {
  const { suggestions, onSelect } = props;
  if (suggestions.length === 0) return null;

  return (
    <ul className="absolute left-0 right-0 bg-white rounded-lg shadow p-2 mt-1 z-10 w-full">
      {suggestions.map((city) => (
        <li key={city.name + city.latitude + city.longitude}>
          <button
            className="w-full text-left p-2 hover:bg-blue-100 rounded"
            onClick={() => onSelect(city)}
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
