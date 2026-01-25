window.addEventListener("load", () => {
  if (!window.Tesseract) {
    console.error("❌ Tesseract not loaded");
  } else {
    console.log("✅ Tesseract loaded");
  }
});

async function handleImageUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  const input = document.getElementById("newsInput");
  input.value = "🧠 Initializing OCR...";

  try {
    const worker = await Tesseract.createWorker({
      logger: m => {
        if (m.status === "recognizing text") {
          input.value = `🧠 OCR ${Math.floor(m.progress * 100)}%`;
        }
      }
    });

    await worker.loadLanguage("eng");
    await worker.initialize("eng");

    const { data } = await worker.recognize(file);
    await worker.terminate();

    const text = data.text.trim();
    input.value = text || "❌ No readable text found.";

  } catch (err) {
    console.error(err);
    input.value = "❌ OCR failed. Try a clearer image.";
  }
}

function sendMessage() {
  const input = document.getElementById("newsInput");
  if (!input.value.trim()) return;
  alert("Text sent for analysis:\n\n" + input.value);
}

function clearChat() {
  document.getElementById("chatArea").innerHTML = "";
}
