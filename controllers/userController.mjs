import { getUserById, updateUserById } from "../models/userModel.mjs";
import { updateUserValidator } from "../validators/userValidator.mjs";

export const getUser = async (req, res) => {
  const currentUserId = req.user.id;

  const user = await getUserById(currentUserId);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  return res.status(200).json(user);
};

export const updateUser = async (req, res) => {
  const currentUserId = req.user.id;

  const payload = await updateUserValidator.validate(req.body);
  const updatedUser = await updateUserById(currentUserId, payload);

  if (!updatedUser) {
    return res.status(404).json({ message: "User not found" });
  }

  return res.status(200).json(updatedUser);
};
