window.addEventListener("load", () => {
  if (typeof Tesseract === "undefined") {
    console.error("❌ Tesseract failed to load");
  } else {
    console.log("✅ Tesseract loaded");
  }
});


// Handle image upload + OCR
async function handleImageUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  const input = document.getElementById("newsInput");
  input.value = "⏳ Extracting text from image...";

  try {
  const worker = Tesseract.createWorker({
    logger: m => {
      if (m.status === "recognizing text") {
        input.value = `🧠 OCR in progress... ${Math.floor(m.progress * 100)}%`;
      }
    }
  });

  await worker.loadLanguage("eng");
  await worker.initialize("eng");

  const { data } = await worker.recognize(file);
  const text = data.text.trim();

  await worker.terminate();

  if (!text) {
    input.value = "❌ No readable text found in image.";
    return;
  }

  input.value = text;

  // Optional auto-send
  // sendMessage();

} catch (err) {
  console.error(err);
  input.value = "❌ OCR failed. Try a clearer image.";
}
