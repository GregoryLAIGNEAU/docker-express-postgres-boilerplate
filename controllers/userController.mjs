import { ACCOUNT_STATUS } from "#constants/accountStatusConstant.mjs";
import { NotFoundError } from "#errors/indexError.mjs";
import { getUserById, updateUserById } from "#models/userModel.mjs";
import { serializeUser } from "#serialiazers/userSerializer.mjs";
import { clearAuthCookies } from "#services/authService.mjs";
import { updateUserValidator } from "#validators/userValidator.mjs";

export const getUser = async (req, res) => {
  const currentUserId = req.user.id;

  const user = await getUserById(currentUserId);

  if (!user) {
    throw new NotFoundError("User not found");
  }

  const serializedUser = serializeUser(user);

  return res.status(200).json(serializedUser);
};

export const updateUser = async (req, res) => {
  const currentUserId = req.user.id;

  const payload = await updateUserValidator.validate(req.body, {
    meta: { userId: currentUserId },
  });

  const updatedUser = await updateUserById(currentUserId, payload);

  if (!updatedUser) {
    throw new NotFoundError("User not found");
  }

  const serializedUpdatedUser = serializeUser(updatedUser);

  return res.status(200).json(serializedUpdatedUser);
};

export const deleteUser = async (req, res) => {
  const currentUserId = req.user.id;

  const payload = {
    account_status_id: ACCOUNT_STATUS.deactivated,
    deleted_at: new Date(),
  };

  const updatedUser = await updateUserById(currentUserId, payload);

  if (!updatedUser) {
    throw new NotFoundError("User not found");
  }

  clearAuthCookies(res);

  return res.status(200).json({
    message: "Your account has been deactivated successfully",
  });
};
