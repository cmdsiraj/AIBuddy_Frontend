let CONFIG = {};

const basePath = window.location.pathname.replace(/\/[^/]*$/, '/');
export async function loadConfig(path = `${basePath}config.json`) {
  const response = await fetch(path);
  if (!response.ok) throw new Error("Failed to load config");
  CONFIG = await response.json();
}

export function getConfig(key, defaultValue = null) {
  return CONFIG.hasOwnProperty(key) ? CONFIG[key] : defaultValue;
}
