import { ACCOUNT_STATUS } from "#constants/accountStatusConstant.mjs";
import { NotFoundError } from "#errors/indexError.mjs";
import { getAllUsers, getUserById, updateUserById } from "#models/userModel.mjs";
import { adminUpdateUserValidator, adminUserIdValidator } from "#validators/adminUserValidator.mjs";

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

export const updateUser = async (req, res) => {
  const { id: userId } = await adminUserIdValidator.validate(req.params);

  const payload = await adminUpdateUserValidator.validate(req.body, {
    meta: { userId: userId },
  });
  const updatedUser = await updateUserById(userId, payload);

  if (!updatedUser) {
    throw new NotFoundError("User not found");
  }

  return res.status(200).json(updatedUser);
};

export const deleteUser = async (req, res) => {
  const { id: userId } = await adminUserIdValidator.validate(req.params);

  const payload = {
    account_status_id: ACCOUNT_STATUS.deactivated,
    deleted_at: new Date(),
  };
  const updatedUser = await updateUserById(userId, payload);

  if (!updatedUser) {
    throw new NotFoundError("User not found");
  }

  return res.status(200).json({
    message: "The account has been deactivated successfully",
  });
};
