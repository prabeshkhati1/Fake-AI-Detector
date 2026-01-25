function checkNews() {
  const text = document.getElementById("newsText").value;

  if (text.length < 20) {
    document.getElementById("result").innerText =
      "⚠️ Please enter more text.";
    return;
  }

  document.getElementById("result").innerText =
    "🧠 AI Prediction: Connect ML model here";
}
