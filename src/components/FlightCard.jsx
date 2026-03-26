import { formatINR } from "../utils/formatters";

function FlightCard({
  flight,
  selected,
  onSelect,
  selectedFare = "Publish",
  onFareChange,
}) {
  const showSeatsFillingFast = flight.tags?.includes("Express");

  const fareOptions = [
    {
      label: "Publish",
      amount: flight.price,
      tone: "bg-cyan-100 text-cyan-800",
    },
    {
      label: "Flexi",
      amount: Math.round(flight.price * 1.04),
      tone: "bg-fuchsia-100 text-fuchsia-800",
    },
    {
      label: "XpressBiz",
      amount: Math.round(flight.price * 2.19),
      tone: "bg-purple-100 text-purple-800",
    },
  ];

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onSelect(flight)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onSelect(flight);
        }
      }}
      className={`w-full overflow-hidden rounded-lg border text-left transition-all duration-150 ${
        selected ? "border-gray-400 bg-gray-100" : "border-gray-200 bg-white"
      }`}
    >
      <div
        className={`px-3 py-2 text-gray-900 ${selected ? "bg-gray-100" : "bg-white"}`}
      >
        <div className="grid grid-cols-[1.2fr_1.8fr] items-center gap-2">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 bg-white">
              {flight.logo ? (
                <img
                  src={flight.logo}
                  alt={`${flight.airline} logo`}
                  className="h-6 w-6 object-contain"
                />
              ) : (
                <span className="text-xs font-bold text-gray-800">
                  {flight.airline.slice(0, 2).toUpperCase()}
                </span>
              )}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-gray-800">
                {flight.airline}
              </p>
              <p className="text-[11px] text-gray-500">{flight.flightNumber}</p>
            </div>
          </div>

          <div className="grid grid-cols-[auto_1fr_auto] items-center gap-3 text-right">
            <div className="text-left">
              <p className="text-xl leading-none font-bold text-gray-800">
                {flight.departureTime}
              </p>
              <p className="text-[11px] text-gray-500">{flight.from}</p>
            </div>

            <div className="min-w-[120px] text-center">
              <p className="text-xs text-gray-500">{flight.duration}</p>
              <div className="my-0.5 h-px w-full bg-gray-200" />
              {showSeatsFillingFast && (
                <p className="text-[10px] text-rose-500">Seats filling fast</p>
              )}
            </div>

            <div>
              <p className="text-xl leading-none font-bold text-gray-800">
                {flight.arrivalTime}
              </p>
              <p className="text-[11px] text-gray-500">{flight.to}</p>
            </div>
          </div>
        </div>

        <div className="mt-2 border-t border-gray-100 pt-2">
          <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
            {fareOptions.map((option) => (
              <div
                key={`${flight.id}-${option.label}`}
                className="flex items-center gap-1.5 px-0.5 py-0.5"
                onClick={(event) => {
                  event.stopPropagation();
                  onFareChange?.(option.label);
                }}
              >
                <input
                  type="checkbox"
                  checked={selectedFare === option.label}
                  onChange={() => onFareChange?.(option.label)}
                  onClick={(event) => event.stopPropagation()}
                  className="h-3 w-3 cursor-pointer rounded border-gray-400 text-gray-700"
                />
                <span className="text-xs leading-none font-medium tabular-nums text-gray-800">
                  {formatINR(option.amount)}
                </span>
                <span
                  className={`rounded px-1.5 py-0.5 text-[9px] font-semibold ${option.tone}`}
                >
                  {option.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-2 border-t border-gray-100 pt-2 text-[10px] text-gray-600">
          <div className="flex flex-wrap items-center gap-2">
            <span>👜 Hand Baggage - 7 Kg</span>
            <span className="text-gray-400">|</span>
            <span>🧳 Check-In Baggage</span>
            <span className="text-gray-400">|</span>
            <span>{flight.refundable ? "Refundable" : "Non-refundable"}</span>
            <span className="text-gray-400">|</span>
            <span className="underline">Rules</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FlightCard;
