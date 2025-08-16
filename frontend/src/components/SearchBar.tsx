import { SetStateAction } from "react";

type Props = {
  value: string;
  setValue: (value: SetStateAction<string>) => void;
  onInput: (query: string) => void;
  onFocus: (query: string) => void;
  onEnter: () => void;
};

export default function SearchBar({
  value,
  setValue,
  onInput,
  onFocus,
  onEnter,
}: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    onInput(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onEnter();
    }
  };

  return (
    <input
      id="weather-location-input"
      className="bg-white dark:bg-gray-800 text-black dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 shadow-md outline-none w-full px-4 py-3 rounded-lg"
      placeholder="Ort eingeben..."
      type="text"
      value={value}
      onFocus={() => onFocus(value)}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
    />
  );
}
