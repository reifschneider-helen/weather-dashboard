import CloseIcon from "@/icons/closeIcon.svg";
import LocationIcon from "@/icons/locationIcon.svg";

export default function WeatherWidget(props: {
  city: string;
  temperature: number;
  humidity: number;
}) {
  return (
    <div className="bg-blue-500 text-white p-4 rounded-lg shadow-md w-fit">
      <div className="flex items-center">
        <div className="flex items-center">
          <LocationIcon className="w-6 h-6 mr-2" />
          <p className="mr-4 text-xl">{props.city}</p>
        </div>

        <button className="hover:bg-blue-200/20 p-2 rounded-full">
          <CloseIcon alt="Close" className="w-4 h-4" />
        </button>
      </div>

      <p>{props.temperature}°C</p>
      <p>{props.humidity}</p>
    </div>
  );
}
