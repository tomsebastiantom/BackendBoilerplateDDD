
import { authConfig } from "./auth";

const isProduction = process.env.IS_PRODUCTION === "true";

export {
  isProduction,
  authConfig
}