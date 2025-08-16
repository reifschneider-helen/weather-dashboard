import WeatherWidget from "@/components/WeatherWidget";
import Widget from "@/models/widget.model";

type Props = {
  widgets: Widget[];
  isLoading: boolean;
  onDelete: (id: string) => void;
};

export default function Dahboard({ widgets, isLoading, onDelete }: Props) {
  return (
    <div className="flex flex-wrap gap-4 justify-center w-full">
      {isLoading ? (
        <div
          className="text-gray-600 dark:text-gray-400 text-lg mt-8"
          aria-live="polite"
        >
          Wird geladen...
        </div>
      ) : (
        widgets.map((widget: Widget) => (
          <WeatherWidget key={widget.id} widget={widget} onDelete={onDelete} />
        ))
      )}
    </div>
  );
}
