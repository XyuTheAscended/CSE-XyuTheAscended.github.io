document.addEventListener("DOMContentLoaded", function () {
  const sidebar = document.getElementById("sidebar");
  const desktopArrow = document.getElementById("desktopArrow");
  const menuBtn = document.getElementById("sidebarToggle");

  if (!sidebar) return;

  function isMobile() {
    return window.innerWidth <= 767;
  }

  function updateButtons() {
    /*desktop arrow*/
    if (desktopArrow) {
      desktopArrow.textContent = sidebar.classList.contains("closed") ? "►" : "◄";
    }

    /*mobile menu text*/
    if (menuBtn) {
      menuBtn.textContent = sidebar.classList.contains("show") ? "▲ Menu" : "▼ Menu";
    }
  }

  /*desktop sidebar toggle*/
  if (desktopArrow) {
    desktopArrow.addEventListener("click", function () {
      if (isMobile()) return; /*dont use arrow on mobile*/
      sidebar.classList.toggle("closed");
      updateButtons();
    });
  }

  /*mobile sidebar toggle*/
  if (menuBtn) {
    menuBtn.addEventListener("click", function () {
      if (!isMobile()) return; /*dont use menu button on desktop*/
      sidebar.classList.toggle("show");
      updateButtons();
    });
  }

  /*reset states when switching sizes*/
  window.addEventListener("resize", function () {
    if (isMobile()) {
      sidebar.classList.remove("closed"); /*desktop state off*/
    } else {
      sidebar.classList.remove("show");   /*mobile state off*/
    }
    updateButtons();
  });

  updateButtons();
});

fetch("https://xyutheascended.github.io/csce242-spring2026/project/part1/homepage/json/games.json")
  .then(res => res.json())
  .then(data => {

    const container = document.getElementById("gameslayout");
    if (!container) return;

    const featured = ["Among Us", "God of War", "Rogue Lineage"];

    const filtered = data.games.filter(game =>
      featured.includes(game.title)
    );

    container.innerHTML = "";

    filtered.forEach(game => {
      container.innerHTML += `
        <div class="gamebox">
          <a href="${game.link}" target="_blank">
            <img src="https://xyutheascended.github.io/csce242-spring2026/project/part1/homepage/images/${game.image}" alt="${game.title}">
          </a>
          <h3>${game.title}</h3>
          <p>${game.description}</p>
        </div>
      `;
    });

  });