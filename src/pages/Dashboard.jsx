function Dashboard() {
  const metrics = [
    { label: "Active Bookings", value: "1,284", trend: "+8.4%" },
    { label: "Pending Leads", value: "326", trend: "+3.1%" },
    { label: "Total Revenue", value: "₹48.2L", trend: "+11.9%" },
    { label: "Support Tickets", value: "42", trend: "-2.3%" },
  ];

  return (
    <section className="space-y-6">
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
        <p className="mt-1 text-sm text-gray-600">
          Track booking performance and monitor operations across your travel
          desk.
        </p>
      </div> 
    </section>
  );
}

export default Dashboard;
