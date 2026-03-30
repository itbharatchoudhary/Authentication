import { useState } from "react";
import MessageCard from "../Components/MessageCard";
import { useMessages } from "../Hooks/UseMessages";

const HomePage = ({ toggleTheme, dark }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const { messages, addMessage, toggleLike, loading } = useMessages();

  const handlePost = () => {
    if (!message.trim()) return alert("Message cannot be empty");
    addMessage(message);
    setMessage("");
    setOpen(false);
  };

  if (loading) return <p>Loading messages...</p>;

  return (
    <div className="w-full" style={{ background: "var(--color-bg)" }}>
      {/* Hero Section */}

      <div className="relative w-full h-screen overflow-hidden">
        {/* Background Image */}

        <div
          className="absolute theme-image inset-0 bg-cover bg-center m-10 rounded-4xl mt-20"
          style={{
            backgroundImage: "url('Background.jpg')",
          }}
        >
          <div className="absolute inset-0"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <h1
            className="text-4xl md:text-6xl font-bold mb-4"
            style={{ color: "var(--color-text)" }}
          >
            Secure Authentication System
          </h1>

          <p
            className="text-lg md:text-xl max-w-xl mb-6"
            style={{ color: "var(--color-text-secondary)" }}
          >
            Build, manage and interact with users securely. Share your thoughts
            and messages seamlessly.
          </p>

          <button
            onClick={() => setOpen(true)}
            className="px-6 py-3 rounded-full text-lg transition-all duration-300"
            style={{
              background: "var(--color-primary)",
              color: "#fff",
            }}
          >
            Create Message
          </button>
        </div>

        {/* Modal */}
        {open && (
          <div className="absolute inset-0 flex items-center justify-center backdrop-blur-md z-20">
            <div
              className="relative overflow-hidden w-[90%] max-w-md p-6 rounded-2xl"
              style={{
                background: "var(--color-card)",
                border: "1px solid var(--color-border)",
                boxShadow: "var(--shadow-lg)",
                color: "var(--color-text)",
              }}
            >
              {/* Glow Effect */}
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-green-400/20 rounded-full blur-2xl"></div>

              <div className="relative z-10">
                <h2 className="text-2xl font-semibold mb-4">
                  Write Your Message
                </h2>

                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Enter your message..."
                  className="w-full h-32 p-3 rounded-lg outline-none"
                  style={{
                    background: "var(--color-surface)",
                    color: "var(--color-text)",
                    border: "1px solid var(--color-border)",
                  }}
                />

                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => setOpen(false)}
                    className="px-4 py-2 rounded-lg transition"
                    style={{
                      background: "var(--color-surface)",
                      color: "var(--color-text)",
                    }}
                  >
                    Cancel
                  </button>

                  <button
                    onClick={handlePost}
                    className="px-4 py-2 rounded-lg transition"
                    style={{
                      background: "var(--color-primary)",
                      color: "#fff",
                    }}
                  >
                    Post
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* User Opinions Section */}

      <div
        className="px-3 md:px-12 py-12"
        style={{ background: "var(--color-surface)" }}
      >
        {/* Heading */}

        <div className="text-center mb-12">
          <h2
            className="text-3xl md:text-4xl font-bold"
            style={{ color: "var(--color-text)" }}
          >
            User Opinions on Authentication
          </h2>
          <p className="mt-3" style={{ color: "var(--color-text-secondary)" }}>
            See what developers are saying about authentication systems
          </p>
        </div>

        {/* Cards Grid */}
        {/* Messages */}
        {loading ? (
          <p className="text-center">Loading messages...</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 place-items-center">
            {messages.map((msg) => (
              <MessageCard key={msg._id} {...msg} toggleLike={toggleLike} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
