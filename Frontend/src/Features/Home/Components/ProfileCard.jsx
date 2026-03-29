import React from "react";

const user = {
  name: "Bharat Sharma",
  username: "bharat_dev",
  bio: "Full Stack Developer | MERN | Learning everyday 🚀",
  avatar: "https://i.pravatar.cc/150?img=3",
  coverPhoto:
    "https://i.pinimg.com/736x/c0/23/f1/c023f1bdf21774e226391b23e6312333.jpg",
  role: "Full Stack Developer",
  company: "Freelance / Startup",
  location: "India",
  socialLinks: {
    linkedin: "https://linkedin.com/in/bharat_dev",
    github: "https://github.com/bharat_dev",
    twitter: "https://twitter.com/bharat_dev",
  },
  callToAction: {
    label: "Book a Free UX Audit",
    link: "#",
  },
};

const ProfileCard = () => {
  return (
    <div className="w-full bg-[var(--color-card)] shadow-lg  overflow-hidden transition-[var(--transition-normal)]">
      {/* Cover Photo */}
      <div className="relative w-full h-64 md:h-72 lg:h-80">
        <img
          src={user.coverPhoto}
          alt="Cover"
          className="w-full theme-image h-full object-cover brightness-75"
        />
        {/* Avatar */}
        <div
          className="absolute -bottom-16 left-8 w-36 h-36 md:w-40 md:h-40 rounded-full border-4 shadow-md"
          style={{ borderColor: "var(--color-border)" }}
        >
          <img
            src={user.avatar}
            alt={user.name}
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
            {user.name}
          </h2>
          <p
            className="text-sm mt-1"
            style={{ color: "var(--color-text-secondary)" }}
          >
            @{user.username}
          </p>

          <div
            className="mt-2 flex flex-wrap items-center gap-2 text-sm"
            style={{ color: "var(--color-text-secondary)" }}
          >
            {user.role && <span className="font-medium">{user.role}</span>}
            {user.company && <span>• {user.company}</span>}
            {user.location && <span>• {user.location}</span>}
          </div>

          {user.bio && (
            <p
              className="mt-4 text-sm leading-relaxed max-w-xl"
              style={{ color: "var(--color-text-secondary)" }}
            >
              {user.bio}
            </p>
          )}
        </div>

        <div className="flex flex-col items-center md:items-end gap-3">
          {/* Social Links */}
          {user.socialLinks && (
            <div className="flex flex-col gap-3 text-sm font-medium">
              {user.socialLinks.linkedin && (
                <a
                  href={user.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:opacity-80 transition-[var(--transition-fast)]"
                  style={{ color: "var(--color-primary)" }}
                >
                  <i className="fab fa-linkedin text-xl"></i>
                  LinkedIn
                </a>
              )}
              {user.socialLinks.github && (
                <a
                  href={user.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:opacity-80 transition-[var(--transition-fast)]"
                  style={{ color: "var(--color-text)" }}
                >
                  <i className="fab fa-github text-xl"></i>
                  GitHub
                </a>
              )}
              {user.socialLinks.twitter && (
                <a
                  href={user.socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:opacity-80 transition-[var(--transition-fast)]"
                  style={{ color: "var(--color-accent)" }}
                >
                  <i className="fab fa-twitter text-xl"></i>
                  Twitter
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
