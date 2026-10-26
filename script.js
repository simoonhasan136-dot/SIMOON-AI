const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const toolsGrid = document.getElementById("toolsGrid");
const toolCards = [...document.querySelectorAll(".tool-card")];
const filterButtons = document.querySelectorAll(".filter-btn");
const quickTags = document.querySelectorAll(".tag");
const toolCount = document.getElementById("toolCount");
const emptyMessage = document.getElementById("emptyMessage");
const resetButton = document.getElementById("resetButton");
const themeToggle = document.getElementById("themeToggle");

let activeCategory = "All";

function filterTools() {
  const query = searchInput.value.trim().toLowerCase();
  let visibleCount = 0;

  toolCards.forEach((card) => {
    const name = card.dataset.name.toLowerCase();
    const category = card.dataset.category.toLowerCase();
    const description = card.querySelector("p").textContent.toLowerCase();
    const matchesSearch = name.includes(query) || category.includes(query) || description.includes(query);
    const matchesCategory = activeCategory === "All" || card.dataset.category === activeCategory;
    const isVisible = matchesSearch && matchesCategory;

    card.hidden = !isVisible;
    if (isVisible) visibleCount++;
  });

  toolCount.textContent = `${String(visibleCount).padStart(2, "0")} ${visibleCount === 1 ? "TOOL" : "TOOLS"}`;
  emptyMessage.hidden = visibleCount !== 0;
  toolsGrid.hidden = visibleCount === 0;
}

function setCategory(category) {
  activeCategory = category;
  filterButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.category === category);
  });
  filterTools();
}

filterButtons.forEach((button) => button.addEventListener("click", () => setCategory(button.dataset.category)));

quickTags.forEach((tag) => {
  tag.addEventListener("click", () => {
    searchInput.value = "";
    setCategory(tag.dataset.category);
    document.getElementById("tools").scrollIntoView({ behavior: "smooth" });
  });
});

searchInput.addEventListener("input", filterTools);
searchButton.addEventListener("click", () => {
  filterTools();
  document.getElementById("tools").scrollIntoView({ behavior: "smooth" });
});
searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    filterTools();
    document.getElementById("tools").scrollIntoView({ behavior: "smooth" });
  }
});
resetButton.addEventListener("click", () => {
  searchInput.value = "";
  setCategory("All");
});

themeToggle.addEventListener("click", () => {
  const isLight = document.body.classList.toggle("light-theme");
  themeToggle.textContent = isLight ? "🌙" : "☀️";
  localStorage.setItem("simoonAITheme", isLight ? "light" : "dark");
});

if (localStorage.getItem("simoonAITheme") === "light") {
  document.body.classList.add("light-theme");
  themeToggle.textContent = "🌙";
}

document.getElementById("year").textContent = new Date().getFullYear();
filterTools();
