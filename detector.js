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

function sendMessage() {
  const input = document.getElementById("newsInput");
  if (!input.value.trim()) return;
  alert("Text ready for analysis:\n\n" + input.value);
}

function clearChat() {
  document.getElementById("chatArea").innerHTML = "";
}
