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

const ProfileCardDark = () => {
  return (
    <div className="max-w-full mx-auto bg-[var(--color-card)] shadow-xl overflow-hidden ">
      {/* Cover Photo */}
      <div className="relative h-60">
        <img
          src={user.coverPhoto}
          alt="Cover"
          className="w-full h-full object-cover brightness-75"
        />
        {/* Avatar */}
        <div className="w-32 h-32 rounded-full border-4 border-gray-900 absolute -bottom-16 left-8">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-32 h-32 rounded-full border-4 border-gray-900 shadow-lg"
          />
        </div>
      </div>

      {/* User Info */}
      <div className="pt-10 px-6 pb-6 text-center">
        <h2 className="text-2xl font-bold text-white">{user.name}</h2>
        <p className="text-gray-400">@{user.username}</p>

        {/* Role / Company / Location */}
        <div className="mt-3 flex justify-center flex-wrap gap-2 text-gray-300 text-sm">
          {user.role && <span className="font-medium">{user.role}</span>}
          {user.company && <span>• {user.company}</span>}
          {user.location && <span>• {user.location}</span>}
        </div>

        {/* Bio */}
        {user.bio && (
          <p className="mt-4 text-gray-200 text-sm leading-relaxed">
            {user.bio}
          </p>
        )}

        

        {/* Social Links */}
        {user.socialLinks && (
          <div className="">
            {user.socialLinks.linkedin && (
              <a
                href={user.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-400 transform hover:scale-110 transition"
              >
                <i className="fab fa-linkedin"></i>
              </a>
            )}
            {user.socialLinks.github && (
              <a
                href={user.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-200 hover:text-white transform hover:scale-110 transition"
              >
                <i className="fab fa-github"></i>
              </a>
            )}
            {user.socialLinks.twitter && (
              <a
                href={user.socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 transform hover:scale-110 transition"
              >
                <i className="fab fa-twitter"></i>
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileCardDark;