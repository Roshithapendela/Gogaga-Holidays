import { useMemo, useState } from "react";
import Tabs from "../components/Tabs";
import Filters from "../components/Filters";
import FlightCard from "../components/FlightCard";
import { flights } from "../data/flights";
import { formatINR } from "../utils/formatters";

const airportToCity = {
  HYD: "hyderabad",
  GOI: "goa",
  DEL: "delhi",
  BOM: "mumbai",
  COK: "kochi",
  AMD: "ahmedabad",
  BLR: "bengaluru",
  MAA: "chennai",
  CCU: "kolkata",
  PNQ: "pune",
  SIN: "singapore",
  DXB: "dubai",
  DOH: "doha",
  FRA: "frankfurt",
  LHR: "london",
  BKK: "bangkok",
  KUL: "kuala lumpur",
  IST: "istanbul",
  HKG: "hong kong",
};

function Leads() {
  const fareMultipliers = {
    Publish: 1,
    Flexi: 1.04,
    XpressBiz: 2.19,
  };

  const getFareAmount = (basePrice, fareLabel) => {
    const multiplier = fareMultipliers[fareLabel] ?? 1;
    return Math.round((basePrice ?? 0) * multiplier);
  };

  const [isLoading, setIsLoading] = useState(false);
  const initialIndianFlights = flights.filter(
    (flight) => flight.type === "indian",
  );

  const [activeHolidayTab, setActiveHolidayTab] = useState("indian");
  const [packageMode, setPackageMode] = useState("with-flights");
  const [destinationInput, setDestinationInput] = useState("");
  const [destinationQuery, setDestinationQuery] = useState("");
  const [tripDate, setTripDate] = useState("2026-03-12");
  const [returnDate, setReturnDate] = useState("2026-03-17");
  const [passengers, setPassengers] = useState({
    adults: 2,
    children6to12: 0,
    children3to6: 0,
    children0to3: 0,
  });
  const [hotelStar, setHotelStar] = useState(5);
  const [addLunch, setAddLunch] = useState(true);
  const [addDinner, setAddDinner] = useState(false);
  const [selectedOutboundId, setSelectedOutboundId] = useState(
    initialIndianFlights[0]?.id ?? null,
  );
  const [selectedReturnId, setSelectedReturnId] = useState(
    (
      initialIndianFlights[5] ??
      initialIndianFlights[1] ??
      initialIndianFlights[0]
    )?.id ?? null,
  );
  const [fareSelections, setFareSelections] = useState({});

  const setLoadingPulse = () => {
    setIsLoading(true);
    window.setTimeout(() => setIsLoading(false), 350);
  };

  const filteredFlights = useMemo(() => {
    const search = destinationQuery.trim().toLowerCase();

    return flights
      .filter((flight) => flight.type === activeHolidayTab)
      .filter((flight) => {
        if (!search) return true;

        const fromCity = airportToCity[flight.from] ?? "";
        const toCity = airportToCity[flight.to] ?? "";

        return (
          flight.from.toLowerCase().includes(search) ||
          flight.to.toLowerCase().includes(search) ||
          fromCity.includes(search) ||
          toCity.includes(search) ||
          flight.airline.toLowerCase().includes(search)
        );
      });
  }, [activeHolidayTab, destinationQuery]);

  const outboundFlights = filteredFlights.slice(0, 5);
  const returnFlights = filteredFlights.slice(5, 10);

  const selectedOutbound =
    outboundFlights.find((flight) => flight.id === selectedOutboundId) ??
    outboundFlights[0] ??
    null;
  const selectedReturn =
    returnFlights.find((flight) => flight.id === selectedReturnId) ??
    returnFlights[0] ??
    null;

  const handleHolidayTabChange = (tab) => {
    const tabFlights = flights.filter((flight) => flight.type === tab);

    setActiveHolidayTab(tab);
    setSelectedOutboundId(tabFlights[0]?.id ?? null);
    setSelectedReturnId(
      (tabFlights[5] ?? tabFlights[1] ?? tabFlights[0])?.id ?? null,
    );
    setLoadingPulse();
  };

  const handleDestinationSearch = () => {
    setDestinationQuery(destinationInput);
    setLoadingPulse();
  };

  const handlePackageModeChange = (mode) => {
    setPackageMode(mode);
    setLoadingPulse();
  };

  const outboundFareType = selectedOutbound
    ? (fareSelections[selectedOutbound.id] ?? "Publish")
    : "Publish";
  const returnFareType = selectedReturn
    ? (fareSelections[selectedReturn.id] ?? "Publish")
    : "Publish";

  const outboundPrice = selectedOutbound
    ? getFareAmount(selectedOutbound.price, outboundFareType)
    : 0;
  const returnPrice = selectedReturn
    ? getFareAmount(selectedReturn.price, returnFareType)
    : 0;
  const totalFare = outboundPrice + returnPrice;

  const toTitleCase = (value) =>
    value
      .split(" ")
      .filter(Boolean)
      .map((part) => part[0].toUpperCase() + part.slice(1))
      .join(" ");

  const getCityByAirportCode = (code) => {
    const city = airportToCity[code] ?? code?.toLowerCase() ?? "";
    return toTitleCase(city);
  };

  const userDestinationDisplay = destinationQuery.trim()
    ? toTitleCase(destinationQuery.trim())
    : "";

  const fromRouteStart = selectedOutbound
    ? `${getCityByAirportCode(selectedOutbound.from)} (${selectedOutbound.from})`
    : "-";
  const fromRouteEnd = selectedOutbound
    ? userDestinationDisplay ||
      `${getCityByAirportCode(selectedOutbound.to)} (${selectedOutbound.to})`
    : "-";
  const toRouteStart = selectedReturn
    ? userDestinationDisplay ||
      `${getCityByAirportCode(selectedReturn.from)} (${selectedReturn.from})`
    : "-";
  const toRouteEnd = selectedReturn
    ? `${getCityByAirportCode(selectedReturn.to)} (${selectedReturn.to})`
    : "-";

  const formatDisplayDate = (dateValue) => {
    if (!dateValue) return "-";

    const date = dateValue instanceof Date ? dateValue : new Date(dateValue);
    if (Number.isNaN(date.getTime())) return "-";

    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const selectedSummary = useMemo(() => {
    if (!selectedOutbound || !selectedReturn) return "";

    return `${selectedOutbound.airline} (${selectedOutbound.flightNumber}) + ${selectedReturn.airline} (${selectedReturn.flightNumber})`;
  }, [selectedOutbound, selectedReturn]);

  const skeletonCards = Array.from({ length: 3 }).map((_, index) => (
    <div
      key={index}
      className="animate-pulse rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
    >
      <div className="h-3 w-32 rounded bg-gray-200" />
      <div className="mt-3 h-5 w-40 rounded bg-gray-200" />
      <div className="mt-4 grid grid-cols-3 gap-3">
        <div className="h-10 rounded bg-gray-100" />
        <div className="h-10 rounded bg-gray-100" />
        <div className="h-10 rounded bg-gray-100" />
      </div>
      <div className="mt-4 h-3 w-full rounded bg-gray-100" />
    </div>
  ));

  return (
    <section className="rounded-xl border border-gray-200 bg-gray-50 p-5 shadow-sm">
      <Tabs
        activeHolidayTab={activeHolidayTab}
        setActiveHolidayTab={handleHolidayTabChange}
        packageMode={packageMode}
        setPackageMode={handlePackageModeChange}
      />

      <div className="mt-5">
        <Filters
          destination={destinationInput}
          setDestination={setDestinationInput}
          onDestinationSearch={handleDestinationSearch}
          tripDate={tripDate}
          setTripDate={setTripDate}
          returnDate={returnDate}
          setReturnDate={setReturnDate}
          passengers={passengers}
          setPassengers={setPassengers}
          hotelStar={hotelStar}
          setHotelStar={setHotelStar}
          addLunch={addLunch}
          setAddLunch={setAddLunch}
          addDinner={addDinner}
          setAddDinner={setAddDinner}
        />
      </div>

      {destinationQuery.trim() && filteredFlights.length === 0 && (
        <div className="mt-4 rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          No flights found for "{destinationQuery}".
        </div>
      )}

      {packageMode === "without-flights" && (
        <div className="mt-5 rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm">
          <h3 className="text-xl font-semibold text-gray-800">
            Package without Flights
          </h3>
          <p className="mt-2 text-sm text-gray-600">
            Flights are excluded for this package mode. Switch back to "Package
            with Flights" to view fares.
          </p>
        </div>
      )}

      {packageMode === "with-flights" && filteredFlights.length > 0 && (
        <div className="mt-5 overflow-hidden rounded-xl border border-blue-900 bg-white">
          <div className="grid grid-cols-1 gap-2 border-b border-blue-200 bg-white px-4 py-3 text-sm text-gray-700 lg:grid-cols-[1fr_auto_1fr]">
            <div className="rounded-md border border-gray-200 px-3 py-2">
              <p className="text-[11px] text-gray-500">From</p>
              <p className="text-sm font-semibold text-gray-900">
                {fromRouteStart} → {fromRouteEnd}
              </p>
              <p className="text-[11px] text-gray-500">
                Departure Date: {formatDisplayDate(tripDate)}
              </p>
            </div>

            <div className="hidden items-center justify-center text-gray-400 lg:flex">
              ⇄
            </div>

            <div className="rounded-md border border-gray-200 px-3 py-2">
              <p className="text-[11px] text-gray-500">To</p>
              <p className="text-sm font-semibold text-gray-900">
                {toRouteStart} → {toRouteEnd}
              </p>
              <p className="text-[11px] text-gray-500">
                Return Date: {formatDisplayDate(returnDate)}
              </p>
            </div>
          </div>

          <div className="sticky top-16 z-10 grid grid-cols-1 bg-blue-900 px-4 py-3 text-white lg:grid-cols-[1fr_1fr_auto]">
            <div>
              <p className="text-xs text-blue-100">Departure</p>
              <p className="text-sm font-semibold">
                {selectedOutbound?.airline ?? "Airline"}
              </p>
              <p className="text-xl font-bold">{formatINR(outboundPrice)}</p>
            </div>
            <div>
              <p className="text-xs text-blue-100">Return</p>
              <p className="text-sm font-semibold">
                {selectedReturn?.airline ?? "Airline"}
              </p>
              <p className="text-xl font-bold">{formatINR(returnPrice)}</p>
            </div>
            <div className="self-end text-right">
              <p className="text-xs text-blue-100">Total Round fare</p>
              <p className="text-2xl font-extrabold">{formatINR(totalFare)}</p>
            </div>
          </div>

          <div className="border-b border-gray-200 bg-slate-50 px-4 py-2 text-xs text-slate-700">
            Selected:{" "}
            {selectedSummary || "Choose one departure and one return flight"}
          </div>

          <div className="grid grid-cols-1 gap-4 bg-gray-100 p-4 xl:grid-cols-2">
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-gray-700">
                Outbound: {selectedOutbound?.from ?? "-"}
              </h3>

              <div className="max-h-[560px] space-y-3 overflow-y-auto pr-1">
                {isLoading
                  ? skeletonCards
                  : outboundFlights.map((flight) => (
                      <FlightCard
                        key={`out-${flight.id}`}
                        flight={flight}
                        selected={selectedOutbound?.id === flight.id}
                        onSelect={(item) => setSelectedOutboundId(item.id)}
                        selectedFare={fareSelections[flight.id] ?? "Publish"}
                        onFareChange={(fareLabel) =>
                          setFareSelections((prev) => ({
                            ...prev,
                            [flight.id]: fareLabel,
                          }))
                        }
                      />
                    ))}
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-gray-700">
                Return: {selectedReturn?.to ?? "-"}
              </h3>

              <div className="max-h-[560px] space-y-3 overflow-y-auto pr-1">
                {isLoading
                  ? skeletonCards
                  : returnFlights.map((flight) => (
                      <FlightCard
                        key={`ret-${flight.id}`}
                        flight={flight}
                        selected={selectedReturn?.id === flight.id}
                        onSelect={(item) => setSelectedReturnId(item.id)}
                        selectedFare={fareSelections[flight.id] ?? "Publish"}
                        onFareChange={(fareLabel) =>
                          setFareSelections((prev) => ({
                            ...prev,
                            [flight.id]: fareLabel,
                          }))
                        }
                      />
                    ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Leads;
