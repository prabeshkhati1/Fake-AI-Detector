/* ======================================================
   Fake News Detector – OCR Logic (Tesseract.js v5)
   ====================================================== */

/* Check OCR library after page load */
window.addEventListener("load", () => {
  if (typeof Tesseract === "undefined") {
    console.error("❌ Tesseract failed to load");
    alert("OCR library failed to load. Please refresh the page.");
  } else {
    console.log("✅ Tesseract loaded");
  }
});

/* ======================================================
   OCR HANDLER
   ====================================================== */
async function handleImageUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  const input = document.getElementById("newsInput");
  if (!input) {
    console.error("❌ newsInput not found in DOM");
    return;
  }

  input.value = "🧠 Initializing OCR...";

  let worker;

  try {
    // Create OCR worker (v5 requires await)
    worker = await Tesseract.createWorker({
      logger: m => {
        if (m.status === "recognizing text" && m.progress != null) {
          input.value = `🧠 OCR in progress... ${Math.round(m.progress * 100)}%`;
        }
      }
    });

    // REQUIRED sequence in v5
    await worker.load();
    await worker.loadLanguage("eng");
    await worker.initialize("eng");

    // Run OCR
    const result = await worker.recognize(file);
    const text = result.data.text.trim();

    if (!text) {
      input.value = "❌ No readable text found in image.";
    } else {
      input.value = text;
    }

  } catch (err) {
    console.error("❌ OCR ERROR:", err);
    input.value = "❌ OCR failed. Please try a clearer image.";
  } finally {
    // Always terminate worker if created
    if (worker) {
      await worker.terminate();
    }
  }
}

/* ======================================================
   SEND MESSAGE (PLACEHOLDER FOR ML MODEL)
   ====================================================== */
function sendMessage() {
  const input = document.getElementById("newsInput");
  if (!input || !input.value.trim()) return;

  alert(
    "Text sent for analysis:\n\n" +
    input.value
  );
}

/* ======================================================
   CLEAR CHAT
   ====================================================== */
function clearChat() {
  const chat = document.getElementById("chatArea");
  if (chat) chat.innerHTML = "";
}
