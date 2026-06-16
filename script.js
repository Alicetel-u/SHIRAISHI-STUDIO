const form = document.querySelector("#contactForm");

form?.addEventListener("submit", (event) => {
  event.preventDefault();

  const workType = document.querySelector("#workType")?.value ?? "制作の相談";
  const message = document.querySelector("#message")?.value.trim() ?? "";
  const subject = `制作の相談: ${workType}`;
  const body = [
    "以下の内容で相談したいです。",
    "",
    `相談したいこと: ${workType}`,
    "",
    "メモ:",
    message || "ここに相談内容を入力してください。",
    "",
    "名前:",
    "希望の連絡方法:",
    "希望納期:",
  ].join("\n");

  window.location.href = `mailto:freelance@example.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});
