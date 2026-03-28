import { useState } from "react";
import MessageCard from "../Components/MessageCard";

const HomePage = ({ toggleTheme, dark }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([
    {
      id: 1,
      user: {
        name: "Bharat Sharma",
        avatar: "https://i.pravatar.cc/150?img=3",
        handle: "@bharatsharma",
      },
      message: "Authentication is the backbone of any secure application 🔐",
      time: "2h ago",
      likes: 12,
    },
    {
      id: 2,
      user: {
        name: "Ravi Verma",
        avatar: "https://i.pravatar.cc/150?img=5",
        handle: "@raviverma",
      },
      message: "JWT made things so much easier to manage sessions 🚀",
      time: "5h ago",
      likes: 8,
    },
  ]);

  const handlePost = () => {
    if (!message.trim()) return alert("Message cannot be empty");

    const newMessage = {
      id: Date.now(),
      user: {
        name: "You",
        avatar: "https://i.pravatar.cc/150",
        handle: "@you",
      },
      message,
      time: "Just now",
      likes: 0,
    };

    setMessages((prev) => [newMessage, ...prev]);

    setMessage("");
    setOpen(false);
  };

  return (
    <div className="w-full" style={{ background: "var(--color-bg)" }}>
      {/* Section Of introduction And input */}

      <div className="relative w-full h-screen overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center m-10 rounded-4xl mt-20"
          style={{
            backgroundImage: "url('Background.jpg')",
          }}
        >
          {/*Background.jpg */}
          {/* Overlay */}
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
            onMouseEnter={(e) =>
              (e.target.style.background = "var(--color-primary-hover)")
            }
            onMouseLeave={(e) =>
              (e.target.style.background = "var(--color-primary)")
            }
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
                    onMouseEnter={(e) =>
                      (e.target.style.background = "var(--color-primary-hover)")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.background = "var(--color-primary)")
                    }
                  >
                    Post
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Section of User opinion */}

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
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 place-items-center">
          {messages.map((msg) => (
            <MessageCard key={msg.id} {...msg} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
