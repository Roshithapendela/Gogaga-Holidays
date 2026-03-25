import { formatINR } from "../utils/formatters";

function FlightCard({ flight, selected, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(flight)}
      className={`w-full rounded-xl border bg-white p-4 text-left shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg ${
        selected ? "border-blue-500" : "border-gray-200"
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-orange-100 text-xs font-bold text-orange-700">
              {flight.airline.slice(0, 2).toUpperCase()}
            </span>
            <div>
              <p className="text-sm font-semibold text-gray-800">
                {flight.airline}
              </p>
              <p className="text-[11px] text-gray-500">{flight.flightNumber}</p>
            </div>
          </div>
        </div>
        <p className="text-lg font-bold text-blue-700">
          {formatINR(flight.price)}
        </p>
      </div>

      <div className="mt-4 grid grid-cols-3 items-center text-center text-sm">
        <div>
          <p className="text-lg font-bold text-gray-900">
            {flight.departureTime}
          </p>
          <p className="text-xs text-gray-500">{flight.from}</p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="text-xs font-medium text-gray-500">{flight.duration}</p>
          <span className="my-0.5 text-base leading-none text-gray-500">→</span>
          <p className="text-[11px] text-gray-400">Direct</p>
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
            className="rounded bg-indigo-50 px-2 py-0.5 text-[10px] font-semibold text-indigo-700"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-gray-100 pt-3 text-[11px] text-gray-600">
        <span>{flight.baggage}</span>
        <span>{flight.refundable ? "Refundable" : "Non-refundable"}</span>
        <span>Rules</span>
      </div>
    </button>
  );
}

export default FlightCard;
