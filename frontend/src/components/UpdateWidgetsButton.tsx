import RefreshIcon from "@/icons/refresh.svg";

export default function UpdateWidgetsButton(props: {
  loading: boolean;
  onClick: () => void;
}) {
  const { loading, onClick } = props;
  return (
    <button
      type="button"
      title="Alle Wetterdaten aktualisieren"
      aria-label={
        loading ? "Aktualisierung läuft" : "Wetterdaten aktualisieren"
      }
      className={`flex items-center justify-center size-10 rounded-full bg-white dark:bg-gray-800 shadow
        ${
          loading
            ? "animate-spin opacity-60 cursor-not-allowed"
            : "hover:bg-blue-100 dark:hover:bg-blue-900 cursor-pointer transition-colors"
        }`}
      onClick={onClick}
    >
      <RefreshIcon
        className="size-6 text-blue-600 dark:text-blue-300"
        aria-hidden="true"
        focusable="false"
      />
    </button>
  );
}
