import * as userService from "../Services/User.service";

// GET /api/users/me
export const getMe = async (req, res, next) => {
  try {
    const user = await userService.findUserById(req.user.sub);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });
    res.status(200).json({ success: true, user });
  } catch (err) {
    next(err);
  }
};

// GET /api/users  (admin only)
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json({ success: true, count: users.length, users });
  } catch (err) {
    next(err);
  }
};

// DELETE /api/users/:id  (admin only)
export const deleteUser = async (req, res, next) => {
  try {
    await userService.deleteUser(req.params.id);
    res.status(200).json({ success: true, message: "User deleted" });
  } catch (err) {
    next(err);
  }
};