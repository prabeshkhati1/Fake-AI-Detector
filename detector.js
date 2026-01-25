// Check OCR library
window.addEventListener("load", () => {
  if (typeof Tesseract === "undefined") {
    console.error("❌ Tesseract failed to load");
  } else {
    console.log("✅ Tesseract loaded");
  }
});

// OCR handler (NO WORKER)
async function handleImageUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  const input = document.getElementById("newsInput");
  input.value = "🧠 Extracting text from image...";

  try {
    const result = await Tesseract.recognize(
      file,
      "eng",
      {
        logger: m => {
          if (m.status === "recognizing text") {
            input.value = `🧠 OCR in progress... ${Math.floor(m.progress * 100)}%`;
          }
        }
      }
    );

    const text = result.data.text.trim();
    input.value = text || "❌ No readable text found in image.";

  } catch (err) {
    console.error("OCR ERROR:", err);
    input.value = "❌ OCR failed. Try a clearer image.";
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
