document.addEventListener("DOMContentLoaded", function () {
  const sidebar = document.getElementById("sidebar");
  const desktopArrow = document.getElementById("desktopArrow");
  const menuBtn = document.getElementById("sidebarToggle");

  /*desktop sidebar toggle*/
  if (sidebar && desktopArrow) {
    desktopArrow.addEventListener("click", function () {
      sidebar.classList.toggle("closed");
      desktopArrow.textContent = sidebar.classList.contains("closed") ? "►" : "◄";
    });
  }

  /*mobile sidebar toggle*/
  if (sidebar && menuBtn) {
    menuBtn.addEventListener("click", function () {
      sidebar.classList.toggle("show");
      menuBtn.textContent = sidebar.classList.contains("show") ? "▲ Menu" : "▼ Menu";
    });
  }

  /*browse page system*/
  const title = document.getElementById("browseTitle");
  const grid = document.getElementById("browseGrid");

  if (title && grid) {
    const params = new URLSearchParams(window.location.search);
    const tag = params.get("tag") || "all";

    const games = {
      horror: [
        { title: "Outlast", img: "outlast.png", desc: "Investigate a terrifying asylum." },
        { title: "Resident Evil Village", img: "re8.png", desc: "Survive the horrors of a cursed village." },
        { title: "Phasmophobia", img: "phasmophobia.png", desc: "Co-op ghost hunting horror." },
        { title: "Dead by Daylight", img: "deadbydaylight.png", desc: "Multiplayer survival horror." },
        { title: "Amnesia", img: "amnesia.png", desc: "Classic psychological horror." },
        { title: "Poppy Playtime", img: "poppyplaytime.png", desc: "Explore a haunted toy factory." },
        { title: "Mortuary Assistant", img: "mortuaryassistant.png", desc: "Embalm bodies while demons stalk you." },
        { title: "Devour", img: "devour.png", desc: "Escape possessed cultists." },
        { title: "Five Nights at Freddy's", img: "fnaf.png", desc: "Survive animatronic horrors." }
      ],

      multiplayer: [
        { title: "Minecraft", img: "minecraft.png", desc: "Build and survive together." },
        { title: "Call of Duty Warzone", img: "codmw.png", desc: "Fast-paced online shooter." },
        { title: "Fortnite", img: "fortnite.png", desc: "Battle royale with building." },
        { title: "Apex Legends", img: "apex.png", desc: "Team-based battle royale." },
        { title: "Among Us", img: "amongus.png", desc: "Find the impostor before it is too late." },
        { title: "Dead by Daylight", img: "deadbydaylight.png", desc: "Escape killers with friends." },
        { title: "Phasmophobia", img: "phasmophobia.png", desc: "Ghost hunting with a team." },
        { title: "Rocket League", img: "rocketleague.png", desc: "Soccer with rocket-powered cars." },
        { title: "Overwatch 2", img: "overwatch2.png", desc: "Hero-based multiplayer shooter." }
      ],

      visual: [
        { title: "Doki Doki Literature Club", img: "ddlc.png", desc: "A visual novel that turns dark quickly." },
        { title: "Steins Gate", img: "steinsgate.png", desc: "A time travel science fiction visual novel." },
        { title: "Clannad", img: "clannad.png", desc: "An emotional and story-driven visual novel." },
        { title: "Phoenix Wright", img: "phoenixwright.png", desc: "Solve cases in this courtroom visual novel." },
        { title: "VA-11 Hall-A", img: "va11halla.png", desc: "A cyberpunk bartender story." },
        { title: "Saya no Uta", img: "saya.png", desc: "A dark horror visual novel." },
        { title: "Zero Escape", img: "zeroescape.png", desc: "A puzzle thriller visual novel series." },
        { title: "AI Somnium Files", img: "ai.png", desc: "A detective mystery visual novel." },
        { title: "Katawa Shoujo", img: "katawa.png", desc: "A romance visual novel with branching paths." }
      ],

      simulation: [
        { title: "Microsoft Flight Simulator", img: "flightsim.png", desc: "A realistic flight simulation experience." },
        { title: "Cities Skylines", img: "cities.png", desc: "Build and manage your own city." },
        { title: "Euro Truck Simulator 2", img: "ets2.png", desc: "Drive across Europe delivering cargo." },
        { title: "The Sims 4", img: "sims4.png", desc: "Control lives in a life simulation sandbox." },
        { title: "Planet Zoo", img: "planetzoo.png", desc: "Create and manage your own zoo." },
        { title: "House Flipper", img: "houseflipper.png", desc: "Buy, renovate, and sell houses." },
        { title: "Farming Simulator", img: "farmingsim.png", desc: "Run your own farm." },
        { title: "PowerWash Simulator", img: "powerwash.png", desc: "Relax by cleaning everything." },
        { title: "Kerbal Space Program", img: "kerbal.png", desc: "Build rockets and explore space." }
      ],

      roguelike: [
        { title: "Rogue Lineage", img: "roguelineage.png", desc: "Hardcore permadeath RPG with roguelike elements." },
        { title: "Hades", img: "hades.png", desc: "Fight your way out of the underworld." },
        { title: "Dead Cells", img: "deadcells.png", desc: "Fast roguelike action platformer." },
        { title: "Slay the Spire", img: "slaythespire.png", desc: "Deckbuilding roguelike adventure." },
        { title: "The Binding of Isaac", img: "bindingofisaac.png", desc: "Dark dungeon-crawling roguelike." },
        { title: "Risk of Rain 2", img: "riskofrain2.png", desc: "Chaotic 3D roguelike shooter." },
        { title: "Enter the Gungeon", img: "gungeon.png", desc: "Bullet hell roguelike shooter." },
        { title: "Rogue Legacy", img: "roguelegacy.png", desc: "A generational roguelike platformer." },
        { title: "Spelunky", img: "spelunky.png", desc: "A challenging cave-exploration roguelike." }
      ],

      indie: [
        { title: "Hollow Knight", img: "hollowknight.png", desc: "A beautiful indie metroidvania adventure." },
        { title: "Celeste", img: "celeste.png", desc: "A precise platformer about climbing a mountain." },
        { title: "Undertale", img: "undertale.png", desc: "A unique indie RPG with memorable choices." },
        { title: "Stardew Valley", img: "stardew.png", desc: "A relaxing farming and life simulator." },
        { title: "Cuphead", img: "cuphead.png", desc: "A run-and-gun game with cartoon art." },
        { title: "Dead Cells", img: "deadcells.png", desc: "Fast indie roguelike combat." },
        { title: "Hades", img: "hades.png", desc: "An award-winning indie roguelike." },
        { title: "Terraria", img: "terraria.png", desc: "A 2D sandbox adventure." },
        { title: "Katana Zero", img: "katanazero.png", desc: "A stylish fast-paced indie action game." }
      ],

      singleplayer: [
        { title: "God of War", img: "godofwar.png", desc: "Kratos journeys through Norse mythology." },
        { title: "The Witcher 3", img: "witcher3.png", desc: "A massive singleplayer fantasy RPG." },
        { title: "Red Dead Redemption 2", img: "rdr2.png", desc: "A cinematic western story." },
        { title: "Cyberpunk 2077", img: "cyberpunk.png", desc: "A futuristic open-world RPG." },
        { title: "Skyrim", img: "skyrim.png", desc: "A legendary fantasy adventure." },
        { title: "Elden Ring", img: "eldenring.png", desc: "A vast open-world action RPG." },
        { title: "Horizon Zero Dawn", img: "horizon.png", desc: "Fight robotic creatures in a ruined world." },
        { title: "Spider-Man", img: "spiderman.png", desc: "Swing through New York as Spider-Man." },
        { title: "Uncharted 4", img: "uncharted.png", desc: "A cinematic treasure-hunting adventure." }
      ],

      rpg: [
        { title: "Rogue Lineage", img: "roguelineage.png", desc: "A hardcore fantasy RPG with permadeath." },
        { title: "Elden Ring", img: "eldenring.png", desc: "A massive open-world fantasy RPG." },
        { title: "Skyrim", img: "skyrim.png", desc: "A legendary dragon-slaying RPG." },
        { title: "The Witcher 3", img: "witcher3.png", desc: "A monster-hunting RPG adventure." },
        { title: "Baldurs Gate 3", img: "baldursgate3.png", desc: "A massive roleplaying adventure." },
        { title: "Final Fantasy XV", img: "ffxv.png", desc: "A fantasy roadtrip RPG." },
        { title: "Monster Hunter World", img: "monsterhunter.png", desc: "Hunt giant monsters in a rich world." },
        { title: "Minecraft", img: "minecraft.png", desc: "Explore, survive, and create your own path." },
        { title: "Undertale", img: "undertale.png", desc: "A unique story-driven RPG." }
      ],

      fps: [
        { title: "Call of Duty Modern Warfare", img: "codmw.png", desc: "A modern military first-person shooter." },
        { title: "Call of Duty Warzone", img: "codmw.png", desc: "A large-scale battle royale FPS." },
        { title: "Doom Eternal", img: "doom.png", desc: "A fast and brutal demon-slaying shooter." },
        { title: "Counter Strike 2", img: "cs2.png", desc: "A competitive tactical FPS." },
        { title: "Valorant", img: "valorant.png", desc: "A tactical hero-based FPS." },
        { title: "Overwatch 2", img: "overwatch2.png", desc: "A team-based hero shooter." },
        { title: "Halo Infinite", img: "halo.png", desc: "A sci-fi FPS adventure." },
        { title: "Rainbow Six Siege", img: "r6siege.png", desc: "A strategic team-based shooter." },
        { title: "Apex Legends", img: "apex.png", desc: "A battle royale FPS with heroes." }
      ],

      "3d": [
        { title: "Minecraft", img: "minecraft.png", desc: "A 3D sandbox survival game." },
        { title: "Grand Theft Auto V", img: "gta5.png", desc: "An open-world 3D crime sandbox." },
        { title: "Elden Ring", img: "eldenring.png", desc: "A vast 3D fantasy world." },
        { title: "Skyrim", img: "skyrim.png", desc: "A classic 3D fantasy adventure." },
        { title: "The Witcher 3", img: "witcher3.png", desc: "A massive 3D RPG world." },
        { title: "God of War", img: "godofwar.png", desc: "A cinematic 3D action adventure." },
        { title: "Red Dead Redemption 2", img: "rdr2.png", desc: "A western open-world 3D game." },
        { title: "Cyberpunk 2077", img: "cyberpunk.png", desc: "A futuristic 3D city adventure." },
        { title: "Zelda Breath of the Wild", img: "zelda.png", desc: "An open-world fantasy journey." }
      ],

      "2d": [
        { title: "Hollow Knight", img: "hollowknight.png", desc: "A stunning 2D metroidvania." },
        { title: "Celeste", img: "celeste.png", desc: "A precise and emotional platformer." },
        { title: "Dead Cells", img: "deadcells.png", desc: "A 2D action roguelike." },
        { title: "Undertale", img: "undertale.png", desc: "A memorable 2D RPG." },
        { title: "Terraria", img: "terraria.png", desc: "A 2D sandbox exploration game." },
        { title: "Stardew Valley", img: "stardew.png", desc: "A cozy 2D farming game." },
        { title: "Rogue Legacy", img: "roguelegacy.png", desc: "A 2D roguelike platformer." },
        { title: "Cuphead", img: "cuphead.png", desc: "A 2D cartoon action game." },
        { title: "Katana Zero", img: "katanazero.png", desc: "A stylish 2D action platformer." }
      ]

    };

    function loadGames(list) {
      grid.innerHTML = "";

      list.forEach(function (game) {
        const card = document.createElement("div");
        card.className = "browseBox";

        card.innerHTML =
          '<a href="#">' +
          '<img src="../../images/' + game.img + '" alt="' + game.title + '">' +
          '</a>' +
          '<h3>' + game.title + '</h3>' +
          '<p>' + game.desc + '</p>';

        grid.appendChild(card);
      });
    }

    if (tag === "all") {
      title.textContent = "BROWSE GAMES";
      loadGames(games.rpg);
    } else if (games[tag]) {
      title.textContent = tag.toUpperCase();
      loadGames(games[tag]);
    } else {
      title.textContent = "BROWSE GAMES";
      loadGames(games.horror);
    }
  }
});

fetch("../../jsopn")
.then(response => response.json())
.then(games => {

const grid = document.getElementById("browseGrid");

if(!grid) return;

grid.innerHTML = "";

games.forEach(game => {

grid.innerHTML += `
<div class="browseBox">

<img src="../../images/${game.img_name}">

<h3>${game.title}</h3>

<p><strong>Developer:</strong> ${game.developer}</p>

<p>${game.description}</p>

<p>${game.price}</p>

</div>
`;

});

});