import { route } from "../../routes.js";
import { useState, bindElement } from "../../dataManager.js";
import { addCSS } from "../../utils/utils.js";
import { login } from "../../api/authApi.js";

export async function loadLoginComponent(mountId = "app") {
  const [getName, setName, subscribeName] = useState("");
  const [getPassword, setPassword, subscribePassword] = useState("");
  let currentFocusElement = null;

  const cssPath = "./components/login/login.css";
  addCSS(cssPath);

  const response = await fetch("./components/login/login.html");
  const html = await response.text();
  document.getElementById(mountId).innerHTML = html;

  document.getElementById("signup").addEventListener("click", () => {
    route("signup");
  });

  const nameEle = document.getElementById("nameInput");
  const passwordEle = document.getElementById("passwordInput");

  bindElement(nameEle, getName, setName, subscribeName);
  bindElement(passwordEle, getPassword, setPassword, subscribePassword);

  document.getElementById("login-btn").addEventListener("click", async () => {
    const username = getName();
    const password = getPassword();
    try {
      const result = await login({ username, password });
      route("home");
    } catch (err) {
      alert("Login failed: " + (err.message || "Unknown error"));
    }
    // alert(`Logging in with ${username}/${password}`);
  });

  document.querySelectorAll("input").forEach((el) =>
    el.addEventListener("focus", () => {
      currentFocusElement = el.id;
    })
  );

  async function render() {
    if (currentFocusElement) {
      const toFocus = document.getElementById(currentFocusElement);
      if (toFocus) {
        toFocus.focus();
      }
    }
  }

  subscribeName(() => render());
  subscribePassword(() => render());

  render();
}
