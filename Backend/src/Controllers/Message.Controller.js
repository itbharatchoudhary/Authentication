import Message from "../Models/Message.model";

// Create a new message
export const createMessage = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message)
      return res.status(400).json({
        message: "Message cannot be empty",
      });

    const newMessage = await Message.create({
      message,
      user: req.user._id,
    });

    const populated = await newMessage.populate("user", "name avatar username");

    res.status(201).json(populated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Get all messages (latest first)
export const getAllMessages = async (req, res) => {
  try {
    const messages = await Message.find()
      .populate("user", "name avatar username")
      .sort({ createdAt: -1 });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Get messages of logged-in user
export const getMyMessages = async (req, res) => {
  try {
    const messages = await Message.find({ user: req.user._id })
      .populate("user", "name avatar username")
      .sort({ createdAt: -1 });

    res.json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Like / Unlike a message
