import { useEffect, useMemo, useRef, useState } from "react";

function Filters({
  destination,
  setDestination,
  onDestinationSearch,
  tripDate,
  setTripDate,
  returnDate,
  setReturnDate,
  passengers,
  setPassengers,
  hotelStar,
  setHotelStar,
  addLunch,
  setAddLunch,
  addDinner,
  setAddDinner,
}) {
  const [openPassengerMenu, setOpenPassengerMenu] = useState(false);
  const passengerRef = useRef(null);

  const totalChildren = useMemo(
    () =>
      passengers.children6to12 +
      passengers.children3to6 +
      passengers.children0to3,
    [passengers],
  );

  const passengerSummary = useMemo(() => {
    const adultsLabel = `${passengers.adults} Adult${passengers.adults > 1 ? "s" : ""}`;
    const childrenLabel = `${totalChildren} Children`;
    return `${adultsLabel}, ${childrenLabel}`;
  }, [passengers.adults, totalChildren]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        passengerRef.current &&
        !passengerRef.current.contains(event.target)
      ) {
        setOpenPassengerMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const updatePassenger = (key, delta, minValue = 0) => {
    setPassengers((prev) => ({
      ...prev,
      [key]: Math.max(minValue, prev[key] + delta),
    }));
  };

  const passengerRows = [
    {
      key: "adults",
      title: "Adults",
      subtitle: "Age 12 years and above",
      minValue: 1,
    },
    {
      key: "children6to12",
      title: "Children",
      subtitle: "Age 6 years - 12 years",
      minValue: 0,
    },
    {
      key: "children3to6",
      title: "",
      subtitle: "Age 3 years - 6 years",
      minValue: 0,
    },
    {
      key: "children0to3",
      title: "",
      subtitle: "Age 0 years - 3 years",
      minValue: 0,
    },
  ];

  const handleDestinationKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      onDestinationSearch();
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-[2fr_1fr_1fr_1fr_auto]">
        <label className="rounded-md border border-gray-300 bg-white p-2">
          <span className="block text-[11px] text-gray-500">Destination</span>
          <input
            value={destination}
            onChange={(event) => setDestination(event.target.value)}
            onKeyDown={handleDestinationKeyDown}
            type="text"
            placeholder="City"
            className="mt-1 w-full border-none p-0 text-sm font-medium text-gray-800 outline-none"
          />
        </label>

        <label className="rounded-md border border-gray-300 bg-white p-2">
          <span className="block text-[11px] text-gray-500">
            Trip start date
          </span>
          <input
            value={tripDate}
            onChange={(event) => setTripDate(event.target.value)}
            type="date"
            className="mt-1 w-full border-none p-0 text-sm font-medium text-gray-800 outline-none"
          />
        </label>

        <label className="rounded-md border border-gray-300 bg-white p-2">
          <span className="block text-[11px] text-gray-500">Return date</span>
          <input
            value={returnDate}
            onChange={(event) => setReturnDate(event.target.value)}
            type="date"
            className="mt-1 w-full border-none p-0 text-sm font-medium text-gray-800 outline-none"
          />
        </label>

        <div
          ref={passengerRef}
          className="relative rounded-md border border-gray-300 bg-white p-2"
        >
          <span className="block text-[11px] text-gray-500">
            No. of Passengers
          </span>
          <button
            type="button"
            onClick={() => setOpenPassengerMenu((prev) => !prev)}
            className="mt-1 w-full text-left text-sm font-medium text-gray-800 outline-none"
          >
            {passengerSummary}
          </button>

          {openPassengerMenu && (
            <div className="absolute right-0 top-[calc(100%+8px)] z-50 w-[320px] max-w-[92vw] rounded-lg border border-gray-200 bg-white shadow-lg">
              <div className="p-3">
                {passengerRows.map((row, index) => (
                  <div
                    key={row.key}
                    className={
                      index > 0 ? "border-t border-gray-200 pt-3" : "pb-3"
                    }
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        {row.title && (
                          <p className="text-base leading-none font-semibold text-gray-800">
                            {row.title}
                          </p>
                        )}
                        <p className="mt-1 text-xs leading-normal text-gray-500">
                          {row.subtitle}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            updatePassenger(row.key, -1, row.minValue)
                          }
                          className="h-8 w-8 rounded-full border border-gray-400 text-base text-gray-800"
                        >
                          -
                        </button>
                        <span className="w-5 text-center text-sm font-semibold text-gray-900">
                          {passengers[row.key]}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            updatePassenger(row.key, 1, row.minValue)
                          }
                          className="h-8 w-8 rounded-full border border-gray-400 text-base text-gray-800"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 px-3 py-2 text-[11px] text-gray-500">
                To find a trip that fits your entire group at the best prices,
                we need to know your child's age.
              </div>

              <div className="border-t border-gray-200 px-3 py-2 text-center text-[11px] text-gray-500">
                Didn't match your requirement?{" "}
                <span className="font-semibold text-black underline">
                  Customize
                </span>
              </div>
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={onDestinationSearch}
          className="rounded-md bg-black px-4 text-lg text-white transition-all duration-200 hover:bg-gray-800"
        >
          ⌕
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-4 text-sm">
        <div className="flex items-center gap-2">
          <span className="font-medium text-gray-700">Hotel Standard</span>
          {[3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setHotelStar(star)}
              className={`rounded border px-2 py-0.5 text-xs font-medium transition-all duration-200 ${
                hotelStar === star
                  ? "border-black bg-black text-white"
                  : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              {star}⭐
            </button>
          ))}
        </div>

        <label className="flex items-center gap-2 text-sm text-gray-700">
          <input
            type="checkbox"
            checked={addLunch}
            onChange={(event) => setAddLunch(event.target.checked)}
            className="h-4 w-4"
          />
          Add Lunch
        </label>

        <label className="flex items-center gap-2 text-sm text-gray-700">
          <input
            type="checkbox"
            checked={addDinner}
            onChange={(event) => setAddDinner(event.target.checked)}
            className="h-4 w-4"
          />
          Add Dinner
        </label>
      </div>
    </div>
  );
}

export default Filters;
