function sendMessage() {
  const input = document.getElementById("newsInput");
  const chat = document.getElementById("chatArea");

  const text = input.value.trim();
  if (!text) return;

  // User message bubble
  const userMsg = document.createElement("div");
  userMsg.className = "chat user";
  userMsg.innerText = text;
  chat.appendChild(userMsg);

  // Fake AI response (placeholder)
  const aiMsg = document.createElement("div");
  aiMsg.className = "chat ai";
  aiMsg.innerText =
    "🧠 AI Analysis:\nThis news appears to be REAL with high confidence.\n\n(ML model integration pending)";
  
  setTimeout(() => {
    chat.appendChild(aiMsg);
    chat.scrollTop = chat.scrollHeight;
  }, 600);

  input.value = "";
}

function clearChat() {
  document.getElementById("chatArea").innerHTML = "";
}
function openFile() {
  document.getElementById("imageInput").click();
}

document.getElementById("imageInput").addEventListener("change", function () {
  if (this.files.length > 0) {
    const fileName = this.files[0].name;

    const chat = document.getElementById("chatArea");
    const imgMsg = document.createElement("div");
    imgMsg.className = "chat user";
    imgMsg.innerText = `📎 Image uploaded: ${fileName}`;

    chat.appendChild(imgMsg);
    chat.scrollTop = chat.scrollHeight;
  }
});
