import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

const sections = [
  {
    title: "MENU",
    items: [
      { label: "Dashboard", to: "/", icon: "🏠" },
      { label: "Leads", to: "/leads", icon: "⏷", badge: "30434" },
      { label: "Itenaries", to: "/itenaries", icon: "📍" },
      { label: "Google Reviews", to: "/google-reviews", icon: "☁" },
      { label: "Vouchers", to: "/vouchers", icon: "📄" },
      { label: "Accounts", to: "/accounts", icon: "▦" },
      { label: "Reports", to: "/reports", icon: "▤" },
      { label: "Customer Supports", to: "/customer-supports", icon: "🎧" },
    ],
  },
  {
    title: "USER CONTROL",
    items: [
      { label: "User Control", to: "/user-control", icon: "👤" },
      { label: "User Settings", to: "/user-settings", icon: "⚙" },
      { label: "Master Settings", to: "/master-settings", icon: "🛠" },
      { label: "HRM", to: "/hrm", icon: "🏢" },
      { label: "Assets Management", to: "/assets-management", icon: "🧳" },
    ],
  },
  {
    title: "PARTICIPANTS",
    items: [
      { label: "Participants", to: "/participants", icon: "👥" },
      { label: "Itinery Customers", to: "/itinery-customers", icon: "🧭" },
      { label: "Partners", to: "/partners", icon: "🤝" },
      { label: "Suppliers", to: "/suppliers", icon: "🏬" },
    ],
  },
  {
    title: "MISSILINEOUS",
    items: [{ label: "Missilineous", to: "/missilineous", icon: "⋯" }],
  },
];

function Sidebar({ collapsed, onToggle }) {
  const { pathname } = useLocation();
  const [leadsOpen, setLeadsOpen] = useState(pathname.startsWith("/leads"));

  const handleLeadsClick = () => {
    setLeadsOpen((prev) => !prev);
  };

  return (
    <aside
      className={`fixed left-0 top-0 z-30 h-screen border-r border-gray-200 bg-white text-gray-700 transition-all duration-200 ${
        collapsed ? "w-[92px]" : "w-[260px]"
      }`}
    >
      <div className="flex h-16 items-center justify-between border-b border-gray-200 px-4">
        {!collapsed && (
          <h1 className="text-3xl font-extrabold lowercase tracking-tight text-emerald-500">
            gogaga
          </h1>
        )}
        <button
          type="button"
          onClick={onToggle}
          className="rounded-md p-2 text-gray-600 hover:bg-gray-100"
          aria-label="Toggle sidebar"
        >
          <span className="block h-0.5 w-4 bg-current" />
          <span className="mt-1 block h-0.5 w-4 bg-current" />
          <span className="mt-1 block h-0.5 w-4 bg-current" />
        </button>
      </div>

      <nav className="h-[calc(100vh-64px)] space-y-5 overflow-y-auto px-3 py-4">
        {sections.map((section) => (
          <div key={section.title}>
            {!collapsed && (
              <p className="px-2 pb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-gray-400">
                {section.title}
              </p>
            )}

            <div className="space-y-1">
              {section.items.map((item) => {
                if (item.label === "Leads") {
                  const isLeadsRoute = pathname.startsWith("/leads");

                  return (
                    <div key={item.label}>
                      <button
                        type="button"
                        onClick={handleLeadsClick}
                        className={`flex w-full items-center rounded-lg px-3 py-2.5 text-sm transition-all duration-200 ${
                          isLeadsRoute
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                        }`}
                      >
                        <span className="mr-3 w-4 text-center text-sm">
                          {item.icon}
                        </span>
                        {!collapsed && (
                          <>
                            <span>{item.label}</span>
                            <span
                              className={`ml-auto text-xs text-gray-500 transition-transform ${leadsOpen ? "rotate-180" : ""}`}
                            >
                              ▾
                            </span>
                          </>
                        )}
                      </button>

                      {!collapsed && leadsOpen && (
                        <NavLink
                          to="/leads"
                          className={({ isActive }) =>
                            `ml-8 mt-1 flex items-center rounded-lg px-3 py-2 text-sm transition-all duration-200 ${
                              isActive
                                ? "bg-emerald-50 font-semibold text-emerald-600"
                                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                            }`
                          }
                        >
                          <span>Leads</span>
                          {item.badge && (
                            <span className="ml-auto rounded-full bg-emerald-100 px-2 py-0.5 text-[11px] font-semibold text-emerald-600">
                              {item.badge}
                            </span>
                          )}
                        </NavLink>
                      )}
                    </div>
                  );
                }

                return (
                  <NavLink
                    key={item.label}
                    to={item.to}
                    end={item.to === "/"}
                    className={({ isActive }) =>
                      `flex items-center rounded-lg px-3 py-2.5 text-sm transition-all duration-200 ${
                        isActive
                          ? "bg-gray-100 text-gray-900"
                          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                      }`
                    }
                  >
                    <span className="mr-3 w-4 text-center text-sm">
                      {item.icon}
                    </span>
                    {!collapsed && (
                      <>
                        <span>{item.label}</span>
                        {item.badge && (
                          <span className="ml-auto rounded-full bg-emerald-100 px-2 py-0.5 text-[11px] font-semibold text-emerald-600">
                            {item.badge}
                          </span>
                        )}
                      </>
                    )}
                  </NavLink>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
