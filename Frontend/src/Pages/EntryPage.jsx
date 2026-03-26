import React, { useEffect, useState } from "react";
import AuthLayout from "../Components/AuthLayout";

const EntryPage = () => {
  return (
    <AuthLayout>
      <div className="flex flex-col justify-center items-start min-h-screen px-7 md:px-10 max-w-2xl transition-all duration-1000 ease-out">
        {/* CONTENT */}
        <div className="flex flex-col justify-center items-start min-h-screen px-7 md:px-10 max-w-2xl transition-all duration-1000 ease-out">
          <h1 className="text-4xl md:text-6xl font-serif leading-tight">
            <span className="block">Modern Authentication,</span>
            <span className="block">Made Effortless</span>
          </h1>

          <p className="text-gray-400 mt-4 max-w-md">
            Secure every identity, protect every interaction. Authentication
            built with precision, trust, and modern engineering.
          </p>
        </div>
      </div>

      {/* BUTTONS */}
      <div className="absolute bottom-10 right-10 flex gap-4 transition-all duration-1000">
        <button className="px-2 py-1 rounded-full bg-gray-400/50 text-black hover:bg-white/90 transform hover:scale-105 transition duration-300">
          Get Started
        </button>

        <button className="px-4 py-2 rounded-full bg-white text-black hover:bg-gray-200 transform hover:scale-105 transition duration-300">
          Login
        </button>
      </div>
    </AuthLayout>
  );
};

export default EntryPage;
