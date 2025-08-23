import { doubleCsrf } from "csrf-csrf";
import doubleCsrfOptions from "../config/doubleCsrfOptions.mjs";

const { generateCsrfToken, doubleCsrfProtection } = doubleCsrf(doubleCsrfOptions);

export { generateCsrfToken, doubleCsrfProtection };
