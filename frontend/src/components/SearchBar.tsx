"use client";

import { useState } from "react";

export default function SearchBar(props: { onSearch: (city: string) => void }) {
  const [inputValue, setInputValue] = useState("");

  const handleClick = () => {
    if (inputValue.trim() !== "") {
      props.onSearch(inputValue);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (inputValue.trim() !== "" && e.key === "Enter") {
      props.onSearch(inputValue);
    }
  };

  return (
    <div className="bg-gray-100 shadow-md rounded-lg flex items-center gap-2">
      <input
        className="outline-none min-w-md px-4 py-3 rounded-lg"
        placeholder="Type to search..."
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button
        className="hover:bg-blue-200 px-4 py-3 rounded-lg"
        onClick={handleClick}
      >
        Search
      </button>
    </div>
  );
}
