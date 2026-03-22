document.addEventListener("DOMContentLoaded", function () {
  const sidebar = document.getElementById("sidebar");
  const desktopArrow = document.getElementById("desktopArrow");
  const menuBtn = document.getElementById("sidebarToggle");

  /* Sidebar */

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

  /* Browse */

  const title = document.getElementById("browseTitle");
  const grid = document.getElementById("browseGrid");

  if (title && grid) {
    const params = new URLSearchParams(window.location.search);
    const tag = params.get("tag") || "all";

    fetch("https://xyutheascended.github.io/csce242-spring2026/project/part1/homepage/json/games.json")
      .then(response => response.json())
      .then(allGames => {

        grid.innerHTML = "";

        let filtered;


        if (tag === "all") {
          filtered = allGames.filter(g => g.genre === "rpg");
          title.textContent = "BROWSE GAMES";
        } else {
          filtered = allGames.filter(g => g.genre === tag);
          title.textContent = tag.toUpperCase();
        }

        filtered.forEach(game => {
          const card = document.createElement("div");
          card.className = "browseBox";

          card.innerHTML = `
            <a href="${game.link}" target="_blank">
              <img src="../../images/${game.img_name}" alt="${game.title}">
            </a>
            <h3>${game.title}</h3>
            <p>${game.description}</p>
          `;

          grid.appendChild(card);
        });

      })
      .catch(error => {
        console.error("JSON LOAD ERROR:", error);
      });
  }

});