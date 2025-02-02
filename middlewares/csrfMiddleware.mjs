import { doubleCsrf } from "csrf-csrf";
import doubleCsrfOptions from "../config/doubleCsrfOptions.mjs";

const { generateToken, doubleCsrfProtection } = doubleCsrf(doubleCsrfOptions);

export { generateToken, doubleCsrfProtection };
