import React from "react";

const Home = () => {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-6"
      style={{ backgroundColor: "var(--color-bg)", color: "var(--color-text)" }}
    >
      <div
        className="max-w-3xl text-center p-10"
        style={{
          backgroundColor: "var(--color-card)",
          borderRadius: "var(--radius-lg)",
          boxShadow: "var(--shadow-md)",
        }}
      >
        {/* Heading */}
        <h1 className="text-4xl font-bold mb-6">
          Secure Authentication System
        </h1>

        {/* Paragraph (30 words) */}
        <p
          className="text-lg leading-relaxed"
          style={{ color: "var(--color-text-secondary)" }}
        >
          This platform provides secure manual authentication with login and registration, along with seamless Google authentication integration, ensuring reliable user access, enhanced security, and a smooth, modern user experience.
        </p>

      </div>
    </div>
  );
};

export default Home;
