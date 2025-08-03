import Weather from "@/models/weather.model";
import Location from "./location.model";

export default interface Widget {
  location: Location;
  id: string;
  createdAt: string;
  weather: Weather;
}
