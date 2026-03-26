function Tabs({
  activeHolidayTab,
  setActiveHolidayTab,
  packageMode,
  setPackageMode,
}) {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => setActiveHolidayTab("indian")}
          className={`w-full rounded-md px-4 py-2 text-sm font-semibold transition-all duration-200 sm:w-auto ${
            activeHolidayTab === "indian"
              ? "bg-black text-white"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
        >
          Indian Holidays
        </button>
        <button
          type="button"
          onClick={() => setActiveHolidayTab("international")}
          className={`w-full rounded-md px-4 py-2 text-sm font-semibold transition-all duration-200 sm:w-auto ${
            activeHolidayTab === "international"
              ? "bg-black text-white"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
        >
          International Holidays
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => setPackageMode("with-flights")}
          className={`w-full rounded-md px-4 py-2 text-sm font-medium transition-all duration-200 sm:w-auto ${
            packageMode === "with-flights"
              ? "bg-gray-900 text-white"
              : "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
          }`}
        >
          Package with Flights
        </button>
        <button
          type="button"
          onClick={() => setPackageMode("without-flights")}
          className={`w-full rounded-md px-4 py-2 text-sm font-medium transition-all duration-200 sm:w-auto ${
            packageMode === "without-flights"
              ? "bg-gray-900 text-white"
              : "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
          }`}
        >
          Package without Flights
        </button>
      </div>
    </div>
  );
}

export default Tabs;
