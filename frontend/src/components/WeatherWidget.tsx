import CloseIcon from "@/icons/close.svg";
import LocationIcon from "@/icons/location.svg";
import RainIcon from "@/icons/rain.svg";
import SnowIcon from "@/icons/snow.svg";
import WindIcon from "@/icons/wind.svg";
import HumidityIcon from "@/icons/humidity.svg";
import Widget from "@/models/widget.model";

export default function WeatherWidget(props: {
  widget: Widget;
  onDelete: (id: string) => void;
}) {
  const { widget, onDelete } = props;
  return (
    <div className="bg-gradient-to-br from-blue-500 to-sky-700 text-white dark:from-gray-900 dark:via-blue-900 dark:to-gray-800 dark:text-gray-100  relative p-6 max-2xs:p-4 rounded-lg shadow-md min-w-77 min-h-50 max-2xs:w-full max-2xs:min-w-0">
      <div className="flex flex-col justify-between h-full max-2xs:justify-around">
        <div className="flex items-center mr-6">
          <div className="flex items-center">
            <LocationIcon
              aria-hidden="true"
              className="size-6 mr-2 self-start"
            />
            <span
              className="mr-4 text-xl max-w-47 max-2xs:max-w-40 break-words leading-none"
              aria-label={`Ort: ${widget.location.name}${
                widget.location.region ? `, ${widget.location.region}` : ""
              }${
                widget.location.country ? `, ${widget.location.country}` : ""
              }`}
            >
              {widget.location.name}
              <div className="text-sm leading-none mt-1.5">
                {widget.location.region && <p>{widget.location.region}</p>}
                <p>{widget.location.country}</p>
              </div>
            </span>
          </div>
        </div>
        <div className="flex justify-between ml-8 mt-6 max-2xs:mt-5">
          <p
            className="text-7xl max-xs:text-6xl max-3xs:text-5xl"
            aria-label={`Temperatur: ${widget.weather.temperature} Grad Celsius`}
          >
            {widget.weather.temperature}°
          </p>
          <div className="max-3xs:text-sm">
            {!!widget.weather.rain && (
              <p
                className="flex items-center gap-0.5"
                aria-label={`Regen: ${widget.weather.rain} Millimeter`}
              >
                <RainIcon aria-hidden="true" className="size-4" />
                {widget.weather.rain}
              </p>
            )}
            {!!widget.weather.snowfall && (
              <p
                className="flex items-center gap-0.5"
                aria-label={`Schnee: ${widget.weather.snowfall} Millimeter`}
              >
                <SnowIcon aria-hidden="true" className="size-4" />
                {widget.weather.snowfall} mm
              </p>
            )}
            <p
              className="flex items-center gap-0.5"
              aria-label={`Windgeschwindigkeit: ${widget.weather.windSpeed} Kilometer pro Stunde`}
            >
              <WindIcon aria-hidden="true" className="size-4" />
              {widget.weather.windSpeed} km/h
            </p>
            <p
              className="flex items-center gap-0.5"
              aria-label={`Feuchtigkeit: ${widget.weather.humidity} Prozent`}
            >
              <HumidityIcon aria-hidden="true" className="size-4" />
              {widget.weather.humidity}%
            </p>
          </div>
        </div>
      </div>

      <button
        className="absolute top-4 right-3 hover:bg-blue-200/20 p-2 rounded-full cursor-pointer"
        aria-label={`Widget für ${widget.location.name} löschen`}
        onClick={() => onDelete(widget.id)}
      >
        <CloseIcon aria-hidden="true" className="size-6" />
      </button>
    </div>
  );
}
