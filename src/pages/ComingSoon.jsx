import { useLocation } from "react-router-dom";

function ComingSoon() {
  const { pathname } = useLocation();
  const sectionName =
    pathname === "/"
      ? "Dashboard"
      : pathname
          .replace(/^\//, "")
          .split("/")
          .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
          .join(" ");

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
      <h2 className="text-2xl font-bold text-gray-800">
        {sectionName} - Coming Soon...
      </h2>
      <p className="mt-2 text-sm text-gray-600">
        This module is under development and will be available in an upcoming
        release.
      </p>
    </section>
  );
}

export default ComingSoon;
