import { NotFoundError } from "#errors/indexError.mjs";
import { getAllUsers } from "#models/userModel.mjs";

export const getUsers = async (_, res) => {
  const users = await getAllUsers();

  if (!users) {
    throw new NotFoundError("No users found");
  }

  return res.status(200).json(users);
};
