import { useState } from "react";
import MessageCard from "./MessageCard";
import { useMessages } from "../Hooks/UseMessages";

const History = () => {
  const [visibleCount, setVisibleCount] = useState(3);
  const { messages, loading, toggleLike } = useMessages();

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  if (loading) return <p className="text-center">Loading history...</p>;

  return (
    <div className="max-w-[1300px] mx-auto  p-6 bg-[var(--color-card)] ">
      {/* Section Title */}

      <h2 className="text-2xl font-bold mb-6 text-[var(--color-text)]">
        History
      </h2>

      {/* Messages Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {messages.slice(0, visibleCount).map((msg) => (
          <MessageCard key={msg._id} {...msg} toggleLike={toggleLike} />
        ))}
      </div>

      {/* Show More Button */}
      {visibleCount < messages.length && (
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
