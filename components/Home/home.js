import { addCSS } from "../../utils/utils.js";
import { bindElement, useState } from "../../dataManager.js";
import { chat } from "../../api/aiApi.js";
import { clearStorage } from "../../utils/localstorage.js";
import { route } from "../../routes.js";

const messages = [];

export async function loadHomeComponent(mountId = "app") {
  addCSS("./components/home/home.css");
  const response = await fetch("./components/home/home.html");
  const html = await response.text();
  document.getElementById(mountId).innerHTML = html;

  const [getMessages, setMessages, subscribeMessages] = useState(messages);
  const [getMessage, setMessage, subscribeMessage] = useState("");

  const messagesView = document.getElementById("messages");

  const messageInputEle = document.getElementById("message-input");

  bindElement(messageInputEle, getMessage, setMessage, subscribeMessage);

  messageInputEle.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  });

  const render = () => {
    messagesView.innerHTML =
      "<h1 style='text-align: center'>Start Talking with <br> The Overqualified Intern!</h1>";

    getMessages().forEach((message) => {
      const div = document.createElement("div");
      div.classList.add("message-box");
      if (message.role === "user") div.classList.add("message-right");
      else div.classList.add("message-left");

      div.innerHTML = `<p class="role">${message.role}</p>
                        <p class="content">${message.content}</p>`;
      messagesView.appendChild(div);
    });
  };

  document.getElementById("send-btn").addEventListener("click", async () => {
    sendMessage();
  });

  document.getElementById("logout-btn").addEventListener("click", () => {
    clearStorage();
    route("login");
  });

  subscribeMessages(() => render());

  render();

  async function sendMessage() {
    if (getMessage() === null || getMessage().trim() === "")
      addMessage(getMessage().trim());

    const userMessage = getMessage().trim();
    addMessage(userMessage);

    // for now saving history on both sides and sending only one message each time
    try {
      const result = await chat(userMessage);
      // console.log(result);
      addMessage(result.content, result.role);
      setMessage("");
    } catch (err) {
      alert(
        "Error while sending message to agent " +
          (err.message || "Unknown error")
      );
    }
  }

  function addMessage(message, role = "user") {
    const presentMessage = { role: role, content: message };
    const newMessages = getMessages().concat(presentMessage);
    setMessages(newMessages);
    scrollToBottom();
  }

  function scrollToBottom() {
    const chatBox = document.getElementById("messages");
    chatBox.scrollTop = chatBox.scrollHeight;
  }
}
