import Message from "../Models/Message.model.js";

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
      user: req.user.sub,
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

    res.status(200).json({ success: true, messages });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Get messages of logged-in user
export const getMyMessages = async (req, res) => {
  try {
    const messages = await Message.find({ user: req.user.sub })
      .populate("user", "name avatar username")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, messages });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Like / Unlike a message
export const toggleLike = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);

    if (!message)
      return res.status(404).json({
        message: "Message not found",
      });

    const userId = req.user.sub;
    const isLiked = message.likes.includes(userId);

    if (isLiked) {
      message.likes.pull(userId);
    } else {
      message.likes.push(userId);
    }

    await message.save();

    res.status(200).json({ success: true, likes: message.likes.length });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
