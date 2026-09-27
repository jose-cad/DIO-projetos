// Relógio ao vivo, só para provar que o JS carregou de dentro do container
const clockEl = document.getElementById("clock");
function tick() {
  const now = new Date();
  clockEl.textContent = now.toLocaleTimeString("pt-BR");
}
tick();
setInterval(tick, 1000);

// Alternância de tema claro/escuro
const toggleBtn = document.getElementById("theme-toggle");
const root = document.documentElement;

function applyTheme(theme) {
  root.setAttribute("data-theme", theme);
  toggleBtn.textContent = theme === "light" ? "🌙" : "☀️";
}

const saved = localStorage.getItem("theme") || "dark";
applyTheme(saved);

toggleBtn.addEventListener("click", () => {
  const current = root.getAttribute("data-theme") === "light" ? "dark" : "light";
  localStorage.setItem("theme", current);
  applyTheme(current);
});
