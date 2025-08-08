export function showLoader() {
  document.getElementById("app-loader")?.classList.remove("hidden");
}
export function hideLoader() {
  document.getElementById("app-loader")?.classList.add("hidden");
}
