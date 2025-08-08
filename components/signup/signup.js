import { useState, bindElement } from "../../dataManager.js";
import { addCSS } from "../../utils/utils.js";
import { route } from "../../routes.js";
import { signup } from "../../api/authApi.js";

export async function loadSignupComponent(mountId = "app") {
  const cssPath = "./components/signup/signup.css";
  addCSS(cssPath);

  const response = await fetch("./components/signup/signup.html");
  const html = await response.text();
  document.getElementById(mountId).innerHTML = html;

  let currentEleFocus = null;

  const [getName, setName, subscribeName] = useState("");
  const [getPass, setPass, subscribePass] = useState("");

  const nameEle = document.getElementById("nameInput");
  const passEle = document.getElementById("passwordInput");

  bindElement(nameEle, getName, setName, subscribeName);
  bindElement(passEle, getPass, setPass, subscribePass);

  document.getElementById("sign-btn").addEventListener("click", async () => {
    const user = {
      username: getName(),
      password: getPass(),
    };
    try {
      const result = await signup(user);
      alert("SignUp Successful. login to continue");
      route("login");
    } catch (err) {
      alert("Login failed: " + (err.message || "Unknown error"));
    }
  });

  document.getElementById("login-btn").addEventListener("click", () => {
    route("login");
  });

  document.querySelectorAll("input").forEach((el) =>
    el.addEventListener("focus", () => {
      currentEleFocus = el.id;
    })
  );

  const render = () => {
    if (currentEleFocus) {
      const toFocus = document.getElementById(currentEleFocus);
      if (toFocus) {
        toFocus.focus();
      }
    }
  };

  subscribeName(() => render());
  subscribePass(() => render());
}
