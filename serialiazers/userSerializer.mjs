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
