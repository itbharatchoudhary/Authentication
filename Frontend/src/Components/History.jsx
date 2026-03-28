import { useState } from "react";
import MessageCard from "./MessageCard";

const dummyMessages = [
  {
    user: {
      name: "Bharat Sharma",
      avatar: "https://i.pravatar.cc/150?img=3",
      handle: "@bharatsharma",
      verified: true,
    },
    message: "This platform helped me understand authentication flow 🚀",
    time: "2h ago",
    likes: 12,
  },
  {
    user: {
      name: "Anjali Verma",
      avatar: "https://i.pravatar.cc/150?img=5",
      handle: "@anjaliverma",
      verified: false,
    },
    message: "Learning React hooks made my life easier! 💻",
    time: "5h ago",
    likes: 7,
  },
  {
    user: {
      name: "Rohit Singh",
      avatar: "https://i.pravatar.cc/150?img=6",
      handle: "@rohit_s",
      verified: true,
    },
    message: "Authentication is now simple and secure 🔐",
    time: "1d ago",
    likes: 15,
  },
  {
    user: {
      name: "Priya Sharma",
      avatar: "https://i.pravatar.cc/150?img=7",
      handle: "@priyasharma",
      verified: false,
    },
    message: "UI/UX designing is fun when using Tailwind CSS ✨",
    time: "2d ago",
    likes: 5,
  },
  {
    user: {
      name: "Vikram Rathore",
      avatar: "https://i.pravatar.cc/150?img=8",
      handle: "@vikram_r",
      verified: true,
    },
    message: "Sockets and real-time updates are amazing! ⚡",
    time: "3d ago",
    likes: 20,
  },
  // Add more messages if needed
];

const History = () => {
  const [visibleCount, setVisibleCount] = useState(3);

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 3); // Show 3 more messages on click
  };

  return (
    <div className="max-w-[1300px] mx-auto  p-6 bg-[var(--color-card)] ">
      {/* Section Title */}
      <h2 className="text-2xl font-bold mb-6 text-[var(--color-text)]">
        History
      </h2>

      {/* Messages Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {dummyMessages.slice(0, visibleCount).map((msg, idx) => (
          <MessageCard key={idx} {...msg} />
        ))}
      </div>

      {/* Show More Button */}
      {visibleCount < dummyMessages.length && (
        <div className="flex justify-center mt-6">
          <button
            onClick={handleShowMore}
            className="px-6 py-2 rounded-lg bg-[var(--color-primary)] text-white font-semibold hover:bg-[var(--color-primary-hover)] transition"
          >
            Show More
          </button>
        </div>
      )}
    </div>
  );
};

export default History;