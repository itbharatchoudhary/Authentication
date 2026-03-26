import React, { useEffect, useState } from "react";

const EntryPage = () => {
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

      {/* CONTENT */}
      <div
        className={`flex flex-col justify-center items-start min-h-screen px-6 md:px-10 max-w-2xl transition-all duration-1000 ease-out ${
          show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <h1 className="text-4xl md:text-6xl font-serif leading-tight">
          Modern Authentication Made Effortless
        </h1>

        <p className="text-gray-400 mt-4 max-w-md">
          Secure every identity, protect every interaction. Authentication built
          with precision, trust, and modern engineering.
        </p>

        {/* BUTTONS */}
       <div className="flex gap-4 mt-8 ml-210">
          <button className="px-4 py-2 rounded-full bg-gray-400/50 text-black hover:bg-white/90 transform hover:scale-105 transition duration-300">
            Get Started
          </button>

          <button className="px-4 py-2 rounded-full bg-white text-black hover:bg-gray-200 transform hover:scale-105 transition duration-300">
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default EntryPage;
