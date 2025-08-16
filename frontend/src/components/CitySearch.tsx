import { SetStateAction } from "react";
import SearchBar from "./SearchBar";
import CityDropdown from "./CityDropdown";
import UpdateWidgetsButton from "./UpdateWidgetsButton";
import Geodata from "@/models/geodata.model";
import Widget from "@/models/widget.model";

type Props = {
  inputValue: string;
  setInputValue: (val: SetStateAction<string>) => void;
  citySuggestions: Geodata[];
  widgets: Widget[];
  onInput: (query: string) => void;
  onFocus: (query: string) => void;
  onEnter: () => void;
  onSelect: (city: Geodata) => void;
  searchContainerRef: React.RefObject<HTMLDivElement | null>;
  handleEscape: (e: React.KeyboardEvent<HTMLDivElement>) => void;
  isRefreshing: boolean;
  handleRefreshAll: () => void;
};
export default function CitySearch({
  inputValue,
  setInputValue,
  citySuggestions,
  widgets,
  onInput,
  onFocus,
  onEnter,
  onSelect,
  searchContainerRef,
  handleEscape,
  isRefreshing,
  handleRefreshAll,
}: Props) {
  return (
    <div
      ref={searchContainerRef}
      onKeyDown={(e) => handleEscape(e)}
      className="flex justify-center w-full"
    >
      <div className="flex gap-4 items-center justify-center w-96 max-2xs:w-full">
        <div className="relative flex-1">
          <SearchBar
            value={inputValue}
            setValue={setInputValue}
            onInput={onInput}
            onFocus={onFocus}
            onEnter={onEnter}
          />
          <CityDropdown
            suggestions={citySuggestions}
            widgets={widgets}
            onSelect={onSelect}
          />
        </div>
        <UpdateWidgetsButton
          onClick={handleRefreshAll}
          loading={isRefreshing}
        />
      </div>
    </div>
  );
}
