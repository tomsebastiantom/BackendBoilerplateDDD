
import { authConfig } from "./auth";

const isProduction = process.env.NEXA_IS_PRODUCTION === "true";

export {
  isProduction,
  authConfig
}