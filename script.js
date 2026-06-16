const form = document.querySelector("#contactForm");
const copyUrlButton = document.querySelector("#copyUrlButton");
const copyStatus = document.querySelector("#copyStatus");
const cursorLight = document.querySelector(".cursor-light");
const publicUrl = "https://alicetel-u.github.io/SHIRAISHI-STUDIO/";

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

copyUrlButton?.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(publicUrl);
    if (copyStatus) {
      copyStatus.textContent = "URLをコピーしました。";
    }
  } catch {
    if (copyStatus) {
      copyStatus.textContent = publicUrl;
    }
  }
});

const revealTargets = document.querySelectorAll(
  ".message-layout, .section-heading, .work-card, .check-list p, .price-card, .flow-list li, .share-layout, .contact-layout"
);

revealTargets.forEach((target, index) => {
  target.classList.add("reveal");
  target.style.setProperty("--reveal-index", String(index % 6));
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.16,
    rootMargin: "0px 0px -8% 0px",
  }
);

revealTargets.forEach((target) => revealObserver.observe(target));

document.addEventListener("pointermove", (event) => {
  if (!cursorLight || window.matchMedia("(pointer: coarse)").matches) return;
  document.body.classList.add("has-pointer");
  cursorLight.style.left = `${event.clientX}px`;
  cursorLight.style.top = `${event.clientY}px`;
});

document.querySelectorAll(".work-card").forEach((card) => {
  card.addEventListener("pointermove", (event) => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(900px) rotateX(${y * -5}deg) rotateY(${x * 6}deg) translateY(-6px)`;
  });

  card.addEventListener("pointerleave", () => {
    card.style.transform = "";
  });
});
