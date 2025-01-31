import { doubleCsrf } from "csrf-csrf";

const csrfProtection = doubleCsrf({
  getSecret: () => process.env.CSRF_SECRET,
  cookieMode: false,
  size: 64,
});

export default csrfProtection;
