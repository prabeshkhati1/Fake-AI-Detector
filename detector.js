function openImagePicker() {
  document.getElementById("imageInput").click();
}

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
        logger: m => console.log(m)
      }
    );

    const text = result.data.text.trim();

    if (!text) {
      input.value = "⚠ No readable text found in image.";
      return;
    }

    // Show OCR result to user
    input.value = text;

  } catch (err) {
    console.error(err);
    input.value = "❌ OCR failed. Try a clearer image.";
  }
}
