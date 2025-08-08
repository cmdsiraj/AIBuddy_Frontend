let CONFIG = {};

const basePath = window.location.pathname.replace(/\/[^/]*$/, "/");
export async function loadConfig(path = `${basePath}config.json`) {
  const response = await fetch(path);
  if (!response.ok) throw new Error("Failed to load config");
  CONFIG = await response.json();
}

export function getConfig(key, defaultValue = null) {
  return CONFIG.hasOwnProperty(key) ? CONFIG[key] : defaultValue;
}

// let CONFIG = {};

// function repoBaseURL() {
//   // e.g. https://cmdsiraj.github.io/AIBuddy_Frontend/
//   const parts = location.pathname.split("/").filter(Boolean);
//   const basePath = parts.length ? `/${parts[0]}/` : "/";
//   return `${location.origin}${basePath}`;
// }

// export async function loadConfig(path) {
//   const url = path || `${repoBaseURL()}config.json`;
//   const res = await fetch(`${url}?v=${Date.now()}`, { cache: "no-store" });
//   if (!res.ok) throw new Error(`Failed to load config from ${url}`);
//   CONFIG = await res.json();
// }

// export function getConfig(key, def = null) {
//   return Object.prototype.hasOwnProperty.call(CONFIG, key) ? CONFIG[key] : def;
// }
