import { NotFoundError } from "#errors/indexError.mjs";
import { getAllUsers, getUserById } from "#models/userModel.mjs";
import { adminUserIdValidator } from "#validators/adminUserValidator.mjs";

export const getUsers = async (_, res) => {
  const users = await getAllUsers();

  if (!users) {
    throw new NotFoundError("No users found");
  }

  return res.status(200).json(users);
};

export const getUser = async (req, res) => {
  const { id: userId } = await adminUserIdValidator.validate(req.params);

  const user = await getUserById(userId);

  if (!user) {
    throw new NotFoundError("User not found");
  }

  return res.status(200).json(user);
};
