import React from "react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="w-full bg-[var(--color-surface)] border-t border-[var(--color-border)] shadow-[var(--shadow-sm)] px-6 md:px-10 py-8 ">
      
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">

        {/* BRAND */}
        <p
          className="text-sm font-medium tracking-widest text-[var(--color-text-secondary)] cursor-pointer hover:text-[var(--color-text)] transition-[var(--transition-fast)]"
          onClick={() => navigate("/")}
        >
          THEGAMEUNTOLD
        </p>

        {/* LINKS */}
        <div className="flex flex-wrap gap-4 text-[var(--color-text-secondary)] text-sm">
          <p
            className="cursor-pointer hover:text-[var(--color-text)] transition-[var(--transition-fast)]"
            onClick={() => navigate("/about")}
          >
            About
          </p>
          <p
            className="cursor-pointer hover:text-[var(--color-text)] transition-[var(--transition-fast)]"
            onClick={() => navigate("/contact")}
          >
            Contact
          </p>
          <p
            className="cursor-pointer hover:text-[var(--color-text)] transition-[var(--transition-fast)]"
            onClick={() => navigate("/privacy")}
          >
            Privacy Policy
          </p>
          <p
            className="cursor-pointer hover:text-[var(--color-text)] transition-[var(--transition-fast)]"
            onClick={() => navigate("/terms")}
          >
            Terms of Service
          </p>
        </div>

        {/* SOCIAL MEDIA */}
        <div className="flex gap-4 text-[var(--color-text-secondary)] text-lg">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#1877f2] transition-[var(--transition-fast)]"
          >
            <i className="ri-facebook-fill"></i>
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#1da1f2] transition-[var(--transition-fast)]"
          >
            <i className="ri-twitter-fill"></i>
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#e1306c] transition-[var(--transition-fast)]"
          >
            <i className="ri-instagram-line"></i>
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#0a66c2] transition-[var(--transition-fast)]"
          >
            <i className="ri-linkedin-fill"></i>
          </a>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="mt-8 text-xs text-[var(--color-text-secondary)] text-center">
        © {new Date().getFullYear()} THEGAMEUNTOLD. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;