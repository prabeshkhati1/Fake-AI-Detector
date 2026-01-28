function handleImageUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  const input = document.getElementById("newsInput");
  input.value = "⏳ Extracting text from image...";

  Tesseract.recognize(
    file,
    "eng",
    {
      logger: m => console.log(m)
    }
  ).then(({ data }) => {
    const text = data.text.trim();
    input.value = text || "❌ No readable text found.";
  }).catch(err => {
    console.error(err);
    input.value = "❌ OCR failed.";
  });
}

async function sendMessage() {
  const input = document.getElementById("newsInput");
  const text = input.value.trim();
  if (!text) return;

  const chatArea = document.getElementById("chatArea");

  // Show loading message
  chatArea.innerHTML += `
    <div class="message user">${text}</div>
    <div class="message bot">⏳ Analyzing news...</div>
  `;

  // 🔽 AUTO-SCROLL (added)
  chatArea.scrollTop = chatArea.scrollHeight;

  try {
    const response = await fetch("https://fake-news-backend-w7p0.onrender.com/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ text })
    });

    const data = await response.json();

    // Remove loading message
    chatArea.lastElementChild.remove();

    // Handle short input case
    if (data.result === "Input too short for reliable prediction") {
      chatArea.innerHTML
