import { doubleCsrf } from "csrf-csrf";
import doubleCsrfOptions from "../config/doubleCsrfOptions.mjs";

const { invalidCsrfTokenError, generateCsrfToken, doubleCsrfProtection } = doubleCsrf(doubleCsrfOptions);

export { invalidCsrfTokenError, generateCsrfToken, doubleCsrfProtection };
