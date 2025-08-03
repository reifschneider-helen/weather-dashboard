import CloseIcon from "@/icons/closeIcon.svg";
import LocationIcon from "@/icons/locationIcon.svg";
import Widget from "@/models/widget.model";

export default function WeatherWidget(props: {
  widget: Widget;
  onDelete: (id: string) => void;
}) {
  const { widget, onDelete } = props;
  return (
    <div className="bg-blue-500 text-white p-4 rounded-lg shadow-md w-fit">
      <div className="flex items-center">
        <div className="flex items-center">
          <LocationIcon className="w-6 h-6 mr-2" />
          <p className="mr-4 text-xl">
            {widget.location.name}
            {widget.location.region && `, ${widget.location.region}`}
            {widget.location.country}
          </p>
        </div>

        <button
          className="hover:bg-blue-200/20 p-2 rounded-full"
          onClick={() => onDelete(widget.id)}
        >
          <CloseIcon alt="Close" className="w-4 h-4" />
        </button>
      </div>

      <p>{widget.weather.temperature}°C</p>
      <p>{widget.weather.humidity}%</p>
      <p>{widget.weather.rain} mm</p>
      <p>{widget.weather.snowfall} mm</p>
      <p>{widget.weather.windSpeed} km/h</p>
    </div>
  );
}
