export const serializeUser = (user) => {
  if (!user) {
    return null;
  }

  const safeFields = ["id", "firstname", "lastname", "email"];
  const result = {};

  for (const field of safeFields) {
    if (user[field] !== undefined) {
      result[field] = user[field];
    }
  }

  return result;
};

export const serializeAdminUser = (user) => {
  if (!user) {
    return null;
  }

  const result = serializeUser(user);
  const adminFields = ["account_status_id", "role_id", "created_at", "updated_at", "deleted_at"];

  for (const field of adminFields) {
    if (user[field] !== undefined) {
      result[field] = user[field];
    }
  }

  return result;
};
