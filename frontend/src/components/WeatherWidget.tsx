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
    <div className="bg-gradient-to-br from-blue-500 to-sky-700 text-white relative p-6 rounded-lg shadow-md w-fit">
      <div className="flex items-center mr-6">
        <div className="flex items-center">
          <LocationIcon
            aria-hidden="true"
            alt="Ort:"
            className="size-6 mr-2 self-start"
          />
          <div
            className="mr-4 text-xl"
            aria-label={`Ort: ${widget.location.name}${
              widget.location.region ? `, ${widget.location.region}` : ""
            }${widget.location.country ? `, ${widget.location.country}` : ""}`}
          >
            {widget.location.name}
            <div className="text-sm leading-none">
              {widget.location.region && <p>{widget.location.region}</p>}
              <p>{widget.location.country}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-5 ml-8 mt-6">
        <span className="sr-only">Temperatur: </span>
        <p className="text-7xl">{widget.weather.temperature}°</p>
        <div>
          <p className="flex items-center gap-0.5">
            <HumidityIcon
              aria-hidden="true"
              aria-label="Feuchtigkeit: "
              className="size-4"
            />
            {widget.weather.humidity}%
          </p>
          {!!widget.weather.rain && (
            <p className="flex items-center gap-0.5">
              <RainIcon
                aria-hidden="true"
                aria-label="Regen: "
                className="size-4"
              />{" "}
              {widget.weather.rain} mm
            </p>
          )}
          {!!widget.weather.snowfall && (
            <p className="flex items-center gap-0.5">
              <SnowIcon
                aria-hidden="true"
                aria-label="Schnee: "
                className="size-4"
              />
              {widget.weather.snowfall} mm
            </p>
          )}
          <p className="flex items-center gap-0.5">
            <WindIcon
              aria-hidden="true"
              aria-label="Windgeschwindigkeit: "
              className="size-4"
            />
            {widget.weather.windSpeed} km/h
          </p>
        </div>
      </div>

      <button
        className="absolute top-4 right-3 hover:bg-blue-200/20 p-2 rounded-full cursor-pointer"
        aria-label="Widget löschen"
        onClick={() => onDelete(widget.id)}
      >
        <CloseIcon aria-hidden="true" alt="X" className="size-6" />
      </button>
    </div>
  );
}
