import { doubleCsrf } from "csrf-csrf";
import { doubleCsrfConfig } from "#config/doubleCsrfConfig.mjs";

export const { invalidCsrfTokenError, generateCsrfToken, doubleCsrfProtection } = doubleCsrf(doubleCsrfConfig);
