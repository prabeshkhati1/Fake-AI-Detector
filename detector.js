// Open file picker when icon is clicked
function openImagePicker() {
  document.getElementById("imageInput").click();
}

// Handle image upload + OCR
async function handleImageUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  const input = document.getElementById("newsInput");
  input.value = "🔍 Extracting text from image...";

  try {
    const { data } = await Tesseract.recognize(
      file,
      "eng",
      {
        logger: m => console.log(m) // OCR progress
      }
    );

    const extractedText = data.text.trim();

    if (!extractedText) {
      input.value = "⚠ No readable text found in image.";
      return;
    }

    // Show OCR result to user
    input.value = extractedText;

  } catch (err) {
    console.error(err);
    input.value = "❌ OCR failed. Try another image.";
  }
}

// Fake AI response (placeholder for ML model)
function sendMessage() {
  const input = document.getElementById("newsInput");
  const text = input.value.trim();

  if (!text) return;

  alert(
    "AI Prediction (demo):\n\n" +
    "Text received successfully.\n" +
    "Connect your trained ML model here."
  );
}
