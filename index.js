import { route } from "./routes.js";
import { loadConfig } from "./utils/configLoader.js";
import { getToken } from "./utils/localstorage.js";

await loadConfig();
if (!getToken()) {
  route("login");
} else {
  route("home");
}
