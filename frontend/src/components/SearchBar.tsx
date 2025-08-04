"use client";

import { SetStateAction, useState } from "react";

export default function SearchBar(props: {
  value: string;
  setValue: (value: SetStateAction<string>) => void;
  onInput: (query: string) => void;
  onFocus: (query: string) => void;
  onEnter: () => void;
}) {
  const { value, setValue, onInput, onFocus, onEnter } = props;

  // const [inputValue, setInputValue] = useState("");

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
      className="bg-gray-100 shadow-md outline-none w-full px-4 py-3 rounded-lg"
      placeholder="Ort eingeben..."
      type="text"
      value={value}
      onFocus={() => onFocus(value)}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
    />
  );
}
