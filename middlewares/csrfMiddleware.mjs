import { doubleCsrf } from "csrf-csrf";
import { doubleCsrfOptions } from "#config/doubleCsrfOptions.mjs";

export const { invalidCsrfTokenError, generateCsrfToken, doubleCsrfProtection } = doubleCsrf(doubleCsrfOptions);
