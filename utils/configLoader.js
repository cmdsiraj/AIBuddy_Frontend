let CONFIG = {};

export async function loadConfig(path = "../config.json") {
  const response = await fetch(path);
  if (!response.ok) throw new Error("Failed to load config");
  CONFIG = await response.json();
}

export function getConfig(key, defaultValue = null) {
  return CONFIG.hasOwnProperty(key) ? CONFIG[key] : defaultValue;
}
