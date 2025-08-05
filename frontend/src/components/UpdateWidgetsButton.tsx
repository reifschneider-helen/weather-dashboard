import RefreshIcon from "@/icons/refresh.svg";

export default function UpdateWidgetsButton(props: {
  loading: boolean;
  onClick: () => void;
}) {
  const { loading, onClick } = props;
  return (
    <button
      aria-label="Wetterdaten aktualisieren"
      aria-hidden="true"
      className={`size-6 ${loading ? "animate-spin" : ""}`}
      onClick={onClick}
    >
      <RefreshIcon />
    </button>
  );
}
