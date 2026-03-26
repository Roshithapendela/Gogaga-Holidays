import { formatINR } from "../utils/formatters";

function FlightCard({ flight, selected, onSelect }) {
  const connectionType = flight.duration.includes("1h") ? "Direct" : "1 Stop";

  return (
    <button
      type="button"
      onClick={() => onSelect(flight)}
      className={`w-full overflow-hidden rounded-xl border bg-white text-left shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg ${
        selected ? "border-blue-500 ring-2 ring-blue-100" : "border-gray-200"
      }`}
    >
      <div className="bg-gradient-to-r from-blue-700 to-indigo-700 p-3 text-white">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-xs font-bold text-white">
              {flight.airline.slice(0, 2).toUpperCase()}
            </span>
            <div>
              <p className="text-sm font-semibold">{flight.airline}</p>
              <p className="text-[11px] text-blue-100">{flight.flightNumber}</p>
            </div>
          </div>
          <p className="text-lg font-extrabold">{formatINR(flight.price)}</p>
        </div>
      </div>

      <div className="p-4">
        <div className="grid grid-cols-3 items-center text-center text-sm">
          <div>
            <p className="text-lg font-bold text-gray-900">
              {flight.departureTime}
            </p>
            <p className="text-xs text-gray-500">{flight.from}</p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <p className="text-xs font-medium text-gray-500">
              {flight.duration}
            </p>
            <span className="my-0.5 text-base leading-none text-gray-500">
              →
            </span>
            <p className="text-[11px] text-gray-400">{connectionType}</p>
          </div>
          <div>
            <p className="text-lg font-bold text-gray-900">
              {flight.arrivalTime}
            </p>
            <p className="text-xs text-gray-500">{flight.to}</p>
          </div>
        </div>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {flight.tags.map((tag) => (
            <span
              key={`${flight.id}-${tag}`}
              className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-[10px] font-semibold text-indigo-700"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-gray-100 pt-3 text-[11px] text-gray-600">
          <span>🧳 {flight.baggage}</span>
          <span>{flight.refundable ? "Refundable" : "Non-refundable"}</span>
          <span className="underline">Rules</span>
        </div>
      </div>
    </button>
  );
}

export default FlightCard;
