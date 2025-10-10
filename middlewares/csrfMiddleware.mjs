import { doubleCsrf } from "csrf-csrf";
import { doubleCsrfOptions } from "#config/doubleCsrfConfig.mjs";

export const { invalidCsrfTokenError, generateCsrfToken, doubleCsrfProtection } = doubleCsrf(doubleCsrfOptions);
