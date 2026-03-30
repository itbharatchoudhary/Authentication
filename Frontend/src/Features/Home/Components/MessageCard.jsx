import { useState } from "react";
import { Heart, MoreHorizontal, Bookmark, Share2 } from "lucide-react";

const MessageCard = ({
  _id,
  user = {
    name: "Bharat Sharma",
    avatar: "https://i.pravatar.cc/150?img=3",
    handle: "@bharatsharma",
    verified: true,
  },
  message = "This platform helped me understand authentication flow in a simple way 🚀",
  time = "2h ago",
  likes = 12,
  toggleLike,
}) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);
  const [saved, setSaved] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLike = async () => {
  try {
    await toggleLike(_id);
    setLiked((prev) => !prev);
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
  } catch (err) {
    console.error("Like failed", err);
  }
};

  return (
    <div className="relative w-[360px] h-[260px] flex flex-col justify-between bg-[var(--color-card)] border border-[var(--color-border)] rounded-[var(--radius-lg)] p-5 gap-4 shadow-[var(--shadow-md)] hover:translate-y-[-2px] hover:shadow-[var(--shadow-lg)] transition-all duration-300">
      {/* Header */}
      <div className="flex items-center justify-between ">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-10 h-10 rounded-full object-cover border border-[var(--color-border)]"
            />
          </div>

          <div className="flex flex-col gap-[2px]">
            <span className="font-[Sora] text-[15px] font-semibold text-[var(--color-text)] leading-none">
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
      <p className="text-[14.5px] text-[var(--color-text)] leading-[1.7] mb-4 overflow-hidden text-ellipsis line-clamp-4">
        {message}
      </p>

      {/* Divider */}
      <div className="h-px bg-[var(--color-border)] " />

      {/* Footer */}
      <div className="flex items-center justify-between ">
        <div className="flex items-center gap-2">
          {/* Like */}
          <button
            onClick={handleLike}
            className={`flex items-center gap-1 px-3 py-1 rounded-full text-[13px] font-medium transition-all duration-200 ease-out active:scale-95 ${
              liked
                ? "text-[var(--color-danger)] bg-[var(--color-danger)]/20 shadow-sm"
                : "text-[var(--color-text-secondary)] hover:text-[var(--color-danger)] hover:bg-[var(--color-danger)]/20"
            }`}
          >
            <Heart
              size={16}
              fill={liked ? "currentColor" : "none"}
              className={`transition-all duration-300 ${
                liked ? "scale-110 animate-[heartPop_0.35s_ease]" : ""
              }`}
            />
            <span className="transition-all duration-200">{likeCount}</span>
          </button>

          {/* Save */}
          <button
            onClick={() => setSaved((s) => !s)}
            className={`p-1.5 rounded-full transition-all duration-200 ease-out active:scale-95 ${
              saved
                ? "text-[var(--color-accent)] bg-[var(--color-accent)]/20 shadow-sm"
                : "text-[var(--color-text-secondary)] hover:bg-[var(--color-surface)] hover:text-[var(--color-text)]"
            }`}
          >
            <Bookmark
              size={16}
              fill={saved ? "currentColor" : "none"}
              className="transition-all duration-300"
            />
          </button>

          {/* Share */}
          <button className="p-1.5 rounded-full text-[var(--color-text-secondary)] transition-all duration-200 ease-out hover:bg-[var(--color-surface)] hover:text-[var(--color-text)] active:scale-95">
            <Share2
              size={16}
              className="transition-transform duration-200 hover:scale-110"
            />
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
