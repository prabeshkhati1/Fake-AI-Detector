// Open file picker
function openImagePicker() {
  document.getElementById("imageInput").click();
}

// Handle image upload + OCR
async function handleImageUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  const input = document.getElementById("newsInput");
  input.value = "⏳ Extracting text from image...";

  try {
    const result = await Tesseract.recognize(
      file,
      "eng",
      {
        logger: m => console.log(m) // progress in console
      }
    );

    const text = result.data.text.trim();

    if (!text) {
      input.value = "❌ No readable text found in image.";
      return;
    }

    // Show OCR text to user
    input.value = text;

  } catch (err) {
    console.error(err);
    input.value = "❌ OCR failed. Try a clearer image.";
  }
}

// Fake AI response (placeholder)
function sendMessage() {
  const text = document.getElementById("newsInput").value.trim();
  if (!text) return;

  alert(
    "AI Prediction (demo)\n\n" +
    "Text received successfully.\n" +
    "Connect your trained ML model here."
  );
}
