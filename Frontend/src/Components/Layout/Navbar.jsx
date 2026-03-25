import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../../app/store.js";
import { ROUTES } from "../../utils/constants.js";
import { initials } from "../../utils/formatters.js";
import api from "../../services/axios.js";
import Button from "../ui/Button.jsx";
import Modal from "../ui/Modal.jsx";

const NavItem = ({ to, label }) => {
  const loc = useLocation();
  const active = loc.pathname === to;
  return (
    <Link
      to={to}
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: "0.72rem",
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: active ? "var(--cyan)" : "var(--muted)",
        borderBottom: active
          ? "1px solid var(--cyan)"
          : "1px solid transparent",
        paddingBottom: "1px",
        transition: "color var(--t)",
      }}
      onMouseEnter={(e) => {
        if (!active) e.target.style.color = "var(--paper)";
      }}
      onMouseLeave={(e) => {
        if (!active) e.target.style.color = "var(--muted)";
      }}
    >
      {label}
    </Link>
  );
};

export default function Navbar() {
  const navigate = useNavigate();
  const { user, isAuth, logout } = useAuthStore();
  const [menu, setMenu] = useState(false);
  const [logoutModal, setModal] = useState(false);

  const doLogout = async () => {
    try {
      await api.post("/auth/logout", {
        refreshToken: localStorage.getItem("tgu_rt"),
      });
    } catch {}
    logout();
    navigate(ROUTES.LANDING);
  };

  return (
    <>
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 200,
          background: "rgba(12,12,15,0.92)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid var(--border)",
          padding: "0 2.5rem",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            height: 60,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <Link
            to={isAuth ? ROUTES.HOME : ROUTES.LANDING}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.78rem",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "var(--cyan)",
            }}
          >
            TGU
          </Link>

          {/* Nav */}
          {isAuth && (
            <nav style={{ display: "flex", gap: "2rem" }}>
              <NavItem to={ROUTES.HOME} label="Home" />
              <NavItem to={ROUTES.PROFILE} label="Profile" />
            </nav>
          )}

          {/* Right */}
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            {isAuth && user ? (
              <div style={{ position: "relative" }}>
                <button
                  onClick={() => setMenu(!menu)}
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: "50%",
                    background: "var(--cyan-dim)",
                    border: "1px solid var(--border-cyan)",
                    color: "var(--cyan)",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.75rem",
                    fontWeight: 500,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                  }}
                >
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    initials(user.name)
                  )}
                </button>
                {menu && (
                  <div
                    style={{
                      position: "absolute",
                      top: "calc(100% + 8px)",
                      right: 0,
                      background: "var(--ink-2)",
                      border: "1px solid var(--border)",
                      borderRadius: "var(--r-lg)",
                      padding: "0.4rem",
                      minWidth: 180,
                      boxShadow: "0 12px 40px rgba(0,0,0,0.6)",
                      animation: "fadeUp 0.15s ease",
                    }}
                  >
                    <div
                      style={{
                        padding: "0.6rem 0.9rem 0.5rem",
                        borderBottom: "1px solid var(--border)",
                        marginBottom: "0.3rem",
                      }}
                    >
                      <p
                        style={{
                          fontSize: "0.85rem",
                          fontWeight: 600,
                          color: "var(--paper)",
                        }}
                      >
                        {user.name}
                      </p>
                      <p
                        style={{
                          fontSize: "0.72rem",
                          color: "var(--muted)",
                          fontFamily: "var(--font-mono)",
                        }}
                      >
                        {user.email}
                      </p>
                    </div>
                    {[{ l: "Profile", to: ROUTES.PROFILE }].map(({ l, to }) => (
                      <button
                        key={l}
                        onClick={() => {
                          navigate(to);
                          setMenu(false);
                        }}
                        style={{
                          display: "block",
                          width: "100%",
                          textAlign: "left",
                          padding: "0.55rem 0.9rem",
                          fontSize: "0.82rem",
                          color: "var(--muted)",
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          borderRadius: "var(--r)",
                          fontFamily: "var(--font-body)",
                          transition: "all var(--t)",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = "var(--ink-3)";
                          e.currentTarget.style.color = "var(--paper)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "none";
                          e.currentTarget.style.color = "var(--muted)";
                        }}
                      >
                        {l}
                      </button>
                    ))}
                    <button
                      onClick={() => {
                        setMenu(false);
                        setModal(true);
                      }}
                      style={{
                        display: "block",
                        width: "100%",
                        textAlign: "left",
                        padding: "0.55rem 0.9rem",
                        fontSize: "0.82rem",
                        color: "var(--red)",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        borderRadius: "var(--r)",
                        fontFamily: "var(--font-body)",
                        transition: "background var(--t)",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background =
                          "rgba(255,79,79,0.08)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "none";
                      }}
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate(ROUTES.LOGIN)}
                >
                  Sign In
                </Button>
                <Button size="sm" onClick={() => navigate(ROUTES.REGISTER)}>
                  Join
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>

      <Modal
        open={logoutModal}
        onClose={() => setModal(false)}
        title="Sign out?"
        footer={
          <>
            <Button variant="ghost" size="sm" onClick={() => setModal(false)}>
              Cancel
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={() => {
                setModal(false);
                doLogout();
              }}
            >
              Sign Out
            </Button>
          </>
        }
      >
        You'll need to sign in again to access your account.
      </Modal>
    </>
  );
}
