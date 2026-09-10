let isBusy = false;

function setBusy(state) {
  isBusy = state;
  const sendBtn = document.querySelector(".send-btn");
  if (sendBtn) sendBtn.disabled = state;
}

function createMessage(role, text) {
  const div = document.createElement("div");
  div.className = "message " + role;
  div.textContent = text;
  return div;
}

function buildResultMessage(result, confidence) {
  const div = document.createElement("div");
  div.className = "message bot";

  const resultLabel = document.createElement("strong");
  resultLabel.textContent = "Result:";

  const confidenceLabel = document.createElement("strong");
  confidenceLabel.textContent = "Confidence:";

  div.append(
    "🧠 ", resultLabel, " " + String(result),
    document.createElement("br"),
    "📊 ", confidenceLabel, " " + String(confidence) + "%"
  );

  return div;
}

function handleImageUpload(event) {
  const file = event.target.files[0];
  event.target.value = ""; // reset so re-selecting the same file still fires change

  if (!file) return;
  if (isBusy) return;

  const input = document.getElementById("newsInput");
  input.value = "⏳ Extracting text from image...";
  setBusy(true);

  Tesseract.recognize(
    file,
    "eng",
    {
      logger: m => {
        console.log(m);
        if (m.status && typeof m.progress === "number") {
          const percent = Math.round(m.progress * 100);
          input.value = `⏳ ${m.status} (${percent}%)`;
        }
      }
    }
  )
    .then(({ data }) => {
      const text = data.text.trim();
      input.value = text || "❌ No readable text found.";
    })
    .catch(err => {
      console.error(err);
      input.value = "❌ OCR failed.";
    })
    .finally(() => {
      setBusy(false);
    });
}

async function sendMessage() {
  if (isBusy) return;

  const input = document.getElementById("newsInput");
  const text = input.value.trim();
  if (!text) return;

  const chatArea = document.getElementById("chatArea");

  const userMsg = createMessage("user", text);
  const analyzingMsg = createMessage("bot", "⏳ Analyzing news...");
  chatArea.append(userMsg, analyzingMsg);

  input.value = "";
  setBusy(true);

  try {
    const response = await fetch(
      "https://fake-news-backend-w7p0.onrender.com/predict",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ text })
      }
    );

    const data = await response.json();

    analyzingMsg.remove();

    if (data.result === "Input too short for reliable prediction") {
      chatArea.append(createMessage("bot", "⚠️ Please enter a longer news article (at least 20–30 words)."));
      return;
    }

    chatArea.append(buildResultMessage(data.result, data.confidence));

  } catch (error) {
    console.error(error);
    analyzingMsg.remove();
    chatArea.append(createMessage("bot", "❌ Backend not reachable. Is the server running?"));
  } finally {
    setBusy(false);
  }
}

function clearChat() {
  document.getElementById("chatArea").innerHTML = "";
}
