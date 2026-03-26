function Topbar() {
  const notifications = [
    { icon: "🔔", label: "Alerts", count: 3 },
    { icon: "💬", label: "Messages", count: 2 },
    { icon: "📄", label: "Documents", count: 1 },
  ];

  
  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-end border-b border-gray-200 bg-white px-6 shadow-sm">
      <div className="flex items-center gap-3">
        {notifications.map((item) => (
          <button
            key={item.label}
            type="button"
            className="relative rounded-md border border-gray-200 p-2 hover:bg-gray-50"
            aria-label={item.label}
          >
            <span>{item.icon}</span>
            {item.count > 0 && (
              <span className="absolute -right-1.5 -top-1.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-semibold leading-none text-white">
                {item.count > 99 ? "99+" : item.count}
              </span>
            )}
          </button>
        ))}
        <div className="ml-2 flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5">
          <div className="h-7 w-7 rounded-full bg-blue-400" />
          <span className="text-sm font-medium text-gray-700">
            Pendela Roshitha
          </span>
        </div>
      </div>
    </header>
  );
}

export default Topbar;
