import Weather from "@/models/weather.model";

export default interface Widget {
  location: string;
  id: string;
  createdAt: string;
  weather: Weather;
}
