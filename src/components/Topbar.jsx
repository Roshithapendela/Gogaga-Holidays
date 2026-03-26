function Topbar() {
  const actions = [
    {
      id: "widgets",
      label: "Widgets",
      badge: 0,
      className: "border-gray-200 bg-white text-gray-500 hover:bg-gray-50",
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
        </svg>
      ),
    },
    {
      id: "filter",
      label: "Filter",
      badge: 2,
      className:
        "border-green-500 bg-green-50 text-green-600 hover:bg-green-100",
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M3 5h18l-7 8v5l-4 2v-7L3 5Z" />
        </svg>
      ),
    },
    {
      id: "location",
      label: "Location",
      badge: 8,
      className:
        "border-purple-200 bg-purple-50 text-purple-600 hover:bg-purple-100",
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M12 22s7-5.5 7-12a7 7 0 1 0-14 0c0 6.5 7 12 7 12Z" />
          <circle cx="12" cy="10" r="2.5" />
        </svg>
      ),
    },
    {
      id: "bell",
      label: "Notifications",
      badge: 15,
      className: "border-red-200 bg-red-50 text-red-600 hover:bg-red-100",
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M15 17H5l1.4-1.4A2 2 0 0 0 7 14.2V11a5 5 0 0 1 10 0v3.2a2 2 0 0 0 .6 1.4L19 17h-4" />
          <path d="M11 20a2 2 0 0 0 4 0" />
        </svg>
      ),
    },
  ];

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-end border-b border-gray-200 bg-white px-6 shadow-sm">
      <div className="flex items-center gap-3">
        {actions.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`relative rounded-md border p-2 transition-colors duration-150 ${item.className}`}
            aria-label={item.label}
          >
            <span className="inline-flex items-center justify-center">
              {item.icon}
            </span>
            {item.badge > 0 && (
              <span className="absolute -right-1.5 -top-1.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-white px-1 text-[10px] font-semibold leading-none text-gray-700 shadow-sm ring-1 ring-gray-200">
                {item.badge > 99 ? "99+" : item.badge}
              </span>
            )}
          </button>
        ))}
        <div className="ml-2 flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5">
          <div className="h-8 w-8 shrink-0 overflow-hidden rounded-full ring-1 ring-gray-200">
            <img
              src="/profile.png"
              alt="Profile"
              className="h-full w-full object-cover object-center"
            />
          </div>
          <span className="text-sm font-medium text-gray-700">
            Pendela Roshitha
          </span>
        </div>
      </div>
    </header>
  );
}

export default Topbar;
