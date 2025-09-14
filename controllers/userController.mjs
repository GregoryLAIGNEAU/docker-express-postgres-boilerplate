import { getUserById } from "../models/userModel.mjs";


export const getUser = async (req, res) => {
  const currentUserId = req.user.id;

  const user = await getUserById(currentUserId);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  return res.status(200).json(user);
};
