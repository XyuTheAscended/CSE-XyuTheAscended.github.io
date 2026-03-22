document.addEventListener("DOMContentLoaded", function () {

  const sidebar = document.getElementById("sidebar");
  const desktopArrow = document.getElementById("desktopArrow");
  const menuBtn = document.getElementById("sidebarToggle");

  /* sidebar toggles */
  if (sidebar && desktopArrow) {
    desktopArrow.addEventListener("click", function () {
      sidebar.classList.toggle("closed");
      desktopArrow.textContent = sidebar.classList.contains("closed") ? "►" : "◄";
    });
  }

  if (sidebar && menuBtn) {
    menuBtn.addEventListener("click", function () {
      sidebar.classList.toggle("show");
      menuBtn.textContent = sidebar.classList.contains("show") ? "▲ Menu" : "▼ Menu";
    });
  }

  const title = document.getElementById("browseTitle");
  const grid = document.getElementById("browseGrid");

  if (!title || !grid) return;

  const params = new URLSearchParams(window.location.search);
  const tag = params.get("tag") || "all";

  let gamesData = [];

  fetch("https://xyutheascended.github.io/csce242-spring2026/project/part1/homepage/json/games.json")
    .then(res => {
      if (!res.ok) throw new Error("JSON NOT FOUND");
      return res.json();
    })
    .then(data => {
      console.log("JSON LOADED:", data);
      gamesData = data.games;
      runPage();
    })
    .catch(err => console.error("FETCH ERROR:", err));

  function runPage() {

    if (!gamesData.length) return;

    if (tag === "all") {
      title.textContent = "BROWSE GAMES";
      loadGames(gamesData.slice(0, 9)); // default page
      return;
    }

    const filtered = gamesData.filter(game =>
      game.tags && game.tags.includes(tag)
    );

    title.textContent = tag.toUpperCase();
    loadGames(filtered);
  }

  function loadGames(list) {

    grid.innerHTML = "";

    if (!list.length) {
      grid.innerHTML = "<p>No games found.</p>";
      return;
    }

    list.forEach(game => {

      const card = document.createElement("div");
      card.className = "browseBox";

      card.innerHTML = `
        <a href="${game.link || "link"}" target="_blank">
          <img src="https://xyutheascended.github.io/csce242-spring2026/project/part1/homepage/images/${game.image}">
        </a>
        <h3>${game.title}</h3>
        <p>${game.description}</p>
      `;

      grid.appendChild(card);
    });
  }

});