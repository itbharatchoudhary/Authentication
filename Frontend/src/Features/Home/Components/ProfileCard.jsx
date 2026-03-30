import React from "react";
import { useProfile } from "../Hooks/useProfile";

const ProfileCard = () => {
  const { profile, loading } = useProfile();

  if (loading) return <p className="text-center">Loading profile...</p>;
  if (!profile) return <p className="text-center">Profile not found</p>;

  return (
    <div className="w-full bg-[var(--color-card)] shadow-lg  overflow-hidden transition-[var(--transition-normal)]">
      {/* Cover Photo */}
      <div className="relative w-full h-64 md:h-72 lg:h-80">
        <img
          src={profile.coverPhoto}
          alt="Cover"
          className="w-full theme-image h-full object-cover brightness-75"
        />
        {/* Avatar */}
        <div
          className="absolute -bottom-16 left-8 w-36 h-36 md:w-40 md:h-40 rounded-full border-4 shadow-md"
          style={{ borderColor: "var(--color-border)" }}
        >
          <img
            src={profile.avatar}
            alt={profile.name}
            className="w-full h-full rounded-full shadow-lg object-cover"
          />
        </div>
      </div>

      {/* User Info */}
      <div className="pt-20 px-8 pb-8 md:px-12 flex flex-col md:flex-row md:items-start md:justify-between gap-6">
        {/* Left Column: Name, Bio, Role */}
        <div className="flex-1 text-center md:text-left">
          <h2
            className="text-3xl font-bold"
            style={{ color: "var(--color-text)" }}
          >
            {profile.name}
          </h2>
          <p
            className="text-sm mt-1"
            style={{ color: "var(--color-text-secondary)" }}
          >
            @{profile.username}

          </p>

          <div
            className="mt-2 flex flex-wrap items-center gap-2 text-sm"
            style={{ color: "var(--color-text-secondary)" }}
          >
            {profile.role && <span className="font-medium">{profile.role}</span>}
            {profile.company && <span>• {profile.company}</span>}
            {profile.location && <span>• {profile.location}</span>}
          </div>

          {profile.bio && (
             <p className="mt-4 text-sm leading-relaxed max-w-xl" style={{ color: "var(--color-text-secondary)" }}>
              {profile.bio}
            </p>
          )}
        </div>

        <div className="flex flex-col items-center md:items-end gap-3">

          {/* Social Links */}

          {profile.socialLinks && (
            <div className="flex flex-col gap-3 text-sm font-medium">
              {profile.socialLinks.linkedin && (
                <a
                  href={profile.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:opacity-80 transition-[var(--transition-fast)]"
                  style={{ color: "var(--color-primary)" }}
                >
                  <i className="fab fa-linkedin text-xl"></i>
                  LinkedIn
                </a>
              )}
              {profile.socialLinks.github && (
                <a
                  href={profile.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:opacity-80 transition-[var(--transition-fast)]"
                  style={{ color: "var(--color-text)" }}
                >
                  <i className="fab fa-github text-xl"></i>
                  GitHub
                </a>
              )}
              {profile.socialLinks.twitter && (
                <a
                  href={profile.socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:opacity-80 transition-[var(--transition-fast)]"
                  style={{ color: "var(--color-accent)" }}
                >
                  <i className="fab fa-twitter text-xl"></i>
                  Twitter
                </a>
              )}

              {/* Logout Button */}
              <button
                onClick={() => console.log("Logout clicked")}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 hover:scale-[1.03] active:scale-[0.97]"
                style={{
                  borderColor: "var(--color-border)",
                  color: "var(--color-text-secondary)",
                  background: "transparent",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255,0,0,0.08)";
                  e.currentTarget.style.color = "var(--color-danger)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "var(--color-text-secondary)";
                }}
              >
                <i className="fas fa-sign-out-alt"></i>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
