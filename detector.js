// Check OCR library
window.addEventListener("load", () => {
  if (typeof Tesseract === "undefined") {
    console.error("❌ Tesseract failed to load");
  } else {
    console.log("✅ Tesseract loaded");
  }
});

// OCR handler
async function handleImageUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  const input = document.getElementById("newsInput");
  input.value = "🧠 Initializing OCR...";

  try {
    const worker = await Tesseract.createWorker({
      logger: m => {
        if (m.status === "recognizing text") {
          input.value = `🧠 OCR in progress... ${Math.floor(m.progress * 100)}%`;
        }
      }
    });

    // ✅ REQUIRED in v5
    await worker.load();
    await worker.loadLanguage("eng");
    await worker.initialize("eng");

    const { data } = await worker.recognize(file);
    await worker.terminate();

    const text = data.text.trim();
    input.value = text || "❌ No readable text found.";

  } catch (err) {
    console.error("OCR ERROR:", err);
    input.value = "❌ OCR failed. See console.";
  }
}

// Send message (placeholder)
function sendMessage() {
  const input = document.getElementById("newsInput");
  if (!input.value.trim()) return;

  alert("Text sent for analysis:\n\n" + input.value);
}

// Clear chat
function clearChat() {
  document.getElementById("chatArea").innerHTML = "";
}
