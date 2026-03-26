import React, { useEffect, useState } from "react";

const AuthLayout = ({ children }) => {
  const [time, setTime] = useState(new Date());
  const [show, setShow] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setShow(true);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#0b0f14] text-white overflow-hidden">
      {/* GRID */}
      <div
        className="absolute inset-0 
        bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),
            linear-gradient(45deg,rgba(255,255,255,0.05)_1px,transparent_1px)]
        bg-[size:40px_40px]"
      />

      {/* GRADIENT */}
      <div
        className="absolute inset-0 bg-gradient-to-t 
        from-[#0b0f14] via-[#0b0f14]/80 to-transparent"
      />

      {/* NAV */}
      <div className="absolute top-0 left-0 w-full flex justify-between items-center px-6 md:px-10 py-4 z-20">
        <p className="text-sm text-gray-400">THEGAMEUNTOLD</p>

        <h6 className="text-sm text-gray-400 tracking-wide">
          {time
            .toLocaleString("en-IN", {
              weekday: "short",
              day: "2-digit",
              month: "short",
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })
            .replace(",", "")}
        </h6>
      </div>

      {/* PAGE CONTENT */}
      <div
        className={`relative z-10 transition-all duration-700 ease-out transform ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
      >
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
