import { useState } from "react";
import { Heart, MoreHorizontal, Bookmark, Share2 } from "lucide-react";

const MessageCard = ({
  user = {
    name: "Bharat Sharma",
    avatar: "https://i.pravatar.cc/150?img=3",
    handle: "@bharatsharma",
    verified: true,
  },
  message = "This platform helped me understand authentication flow in a simple way 🚀",
  time = "2h ago",
  likes = 12,
}) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);
  const [saved, setSaved] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLike = () => {
    setLiked((prev) => !prev);
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
  };

  return (
    <div className="relative max-w-[420px] bg-[var(--color-card)] border border-[var(--color-border)] rounded-[var(--radius-lg)] p-6 shadow-[var(--shadow-md)] hover:translate-y-[-2px] hover:shadow-[var(--shadow-lg)] transition-all duration-300">
      {/* Header */}
      <div className="flex items-center justify-between mb-4.5">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-11 h-11 rounded-full object-cover border-2 border-[var(--color-primary)]/40"
            />
          </div>

          <div className="flex flex-col gap-[2px]">
            <span className="font-[Sora] text-[14px] font-semibold text-[var(--color-text)] leading-none">
              {user.name}
            </span>
            <span className="text-[12px] text-[var(--color-text-secondary)]">
              {user.handle}
            </span>
          </div>
        </div>

        {/* Menu */}
        <div className="relative">
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="p-1.5 rounded-lg text-[var(--color-text-secondary)] hover:bg-[var(--color-surface)] hover:text-[var(--color-text)] transition"
          >
            <MoreHorizontal size={18} />
          </button>

          {menuOpen && (
            <div className="absolute top-full mt-1.5 right-0 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-1 min-w-[140px] shadow-[var(--shadow-md)] z-10 animate-fadeIn">
              {["Report post", "Mute user", "Copy link"].map((item) => (
                <div
                  key={item}
                  onClick={() => setMenuOpen(false)}
                  className="px-2.5 py-2 text-[13px] text-[var(--color-text-secondary)] hover:bg-[var(--color-bg)] hover:text-[var(--color-text)] rounded-lg cursor-pointer"
                >
                  {item}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Message */}
      <p className="text-[14.5px] text-[var(--color-text)] leading-[1.7] mb-5">
        {message}
      </p>

      {/* Divider */}
      <div className="h-px bg-[var(--color-border)] mb-4" />

      {/* Footer */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* Like */}
          <button
            onClick={handleLike}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-[13px] transition ${
              liked
                ? "text-[var(--color-danger)] bg-[var(--color-danger)]/20"
                : "text-[var(--color-text-secondary)] hover:text-[var(--color-danger)] hover:bg-[var(--color-danger)]/20"
            }`}
          >
            <Heart
              size={16}
              fill={liked ? "currentColor" : "none"}
              className={liked ? "animate-[heartPop_0.35s_ease]" : ""}
            />
            <span>{likeCount}</span>
          </button>

          {/* Save */}
          <button
            onClick={() => setSaved((s) => !s)}
            className={`p-1.5 rounded-full ${
              saved
                ? "text-[var(--color-accent)] bg-[var(--color-accent)]/20"
                : "text-[var(--color-text-secondary)] hover:bg-[var(--color-surface)] hover:text-[var(--color-text)]"
            }`}
          >
            <Bookmark size={16} fill={saved ? "currentColor" : "none"} />
          </button>

          {/* Share */}
          <button className="p-1.5 rounded-full text-[var(--color-text-secondary)] hover:bg-[var(--color-surface)] hover:text-[var(--color-text)]">
            <Share2 size={16} />
          </button>
        </div>

        <span className="text-[12px] text-[var(--color-text-secondary)]">
          {time}
        </span>
      </div>
    </div>
  );
};

export default MessageCard;
