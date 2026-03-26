function Dashboard() {
  const metrics = [
    { label: "Active Bookings", value: "1,284", trend: "+8.4%" },
    { label: "Pending Leads", value: "326", trend: "+3.1%" },
    { label: "Total Revenue", value: "₹48.2L", trend: "+11.9%" },
    { label: "Support Tickets", value: "42", trend: "-2.3%" },
  ];

  return (
    <section className="dashboard-sky relative -m-4 min-h-[calc(100vh-64px)] overflow-hidden p-4 md:-m-6 md:p-6">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-sky-100/50 to-white/90" />

      <div className="dashboard-cloud cloud-a" />
      <div className="dashboard-cloud cloud-b" />
      <div className="dashboard-cloud cloud-c hidden sm:block" />

      <div className="dashboard-plane plane-1" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M2.5 12.5 21 4.5a.8.8 0 0 1 1.07 1L14 11l5.25 1.45a.8.8 0 0 1 .02 1.54L14 15.5l8.07 5.43a.8.8 0 0 1-1.07 1L2.5 13.5a.53.53 0 0 1 0-1z" />
        </svg>
      </div>
      <div
        className="dashboard-plane plane-2 hidden sm:block"
        aria-hidden="true"
      >
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M2.5 12.5 21 4.5a.8.8 0 0 1 1.07 1L14 11l5.25 1.45a.8.8 0 0 1 .02 1.54L14 15.5l8.07 5.43a.8.8 0 0 1-1.07 1L2.5 13.5a.53.53 0 0 1 0-1z" />
        </svg>
      </div>

      <div className="relative z-10 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
        <p className="mt-1 text-sm text-gray-600">
          Track booking performance and monitor operations across your travel
          desk.
        </p>
      </div>

      <style>{`
        .dashboard-cloud {
          position: absolute;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.75);
          opacity: 0.18;
          filter: blur(8px);
          z-index: 1;
          animation: cloud-move 34s linear infinite;
        }

        .cloud-a {
          top: 12px;
          left: -180px;
          width: 180px;
          height: 56px;
          animation-duration: 38s;
        }

        .cloud-b {
          top: 72px;
          left: -280px;
          width: 230px;
          height: 64px;
          animation-duration: 52s;
          opacity: 0.14;
        }

        .cloud-c {
          top: 30px;
          left: -360px;
          width: 150px;
          height: 52px;
          animation-duration: 62s;
          opacity: 0.12;
        }

        .dashboard-plane {
          position: absolute;
          z-index: 3;
          color: rgba(51, 65, 85, 0.75);
          pointer-events: none;
          will-change: transform, opacity;
        }

        .dashboard-plane svg {
          width: 28px;
          height: 28px;
          display: block;
          filter: drop-shadow(0 1px 2px rgba(51, 65, 85, 0.2));
        }

        .plane-1 {
          top: 220px;
          left: -120px;
          animation: plane-fly 12s linear infinite;
        }

        .plane-2 {
          top: 290px;
          left: -180px;
          opacity: 0.62;
          animation: plane-land 16s linear infinite;
        }

        @keyframes cloud-move {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(calc(100vw + 520px));
          }
        }

        @keyframes plane-fly {
          from {
            transform: translate(-120px, 38px) rotate(10deg);
            opacity: 0;
          }
          15% {
            opacity: 0.72;
          }
          40% {
            transform: translate(35vw, 26px) rotate(3deg);
          }
          70% {
            transform: translate(70vw, 8px) rotate(-6deg);
          }
          90% {
            opacity: 0.72;
          }
          to {
            transform: translate(calc(100vw + 120px), -10px) rotate(-9deg);
            opacity: 0;
          }
        }

        @keyframes plane-land {
          0% {
            transform: translate(-180px, -18px) rotate(-10deg) scaleX(-1);
            opacity: 0;
          }
          12% {
            opacity: 0.62;
          }
          45% {
            transform: translate(38vw, 6px) rotate(-3deg) scaleX(-1);
          }
          72% {
            transform: translate(72vw, 26px) rotate(4deg) scaleX(-1);
          }
          90% {
            opacity: 0.62;
          }
          100% {
            transform: translate(calc(100vw + 180px), 42px) rotate(8deg) scaleX(-1);
            opacity: 0;
          }
        }

        @media (max-width: 640px) {
          .plane-1 {
            animation-duration: 13s;
            top: 180px;
          }

          .plane-2 {
            top: 240px;
          }

          .dashboard-plane svg {
            width: 20px;
            height: 20px;
          }
        }
      `}</style>
    </section>
  );
}

export default Dashboard;
