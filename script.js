const tutorials = [
  {
    slug: "install-weapon-ports",
    category: "BO3 Modding",
    title: "How to Install Weapon Ports",
    date: "Sep 6, 2026",
    description: "A step-by-step guide for installing custom weapons into BO3."
  },
  {
    slug: "porting-a-weapon",
    category: "BO3 Modding",
    title: "Porting a Weapon (Beginner)",
    date: "Sep 4, 2026",
    description: "A beginner walkthrough for porting a weapon into BO3."
  },
  {
    slug: "godot-multiplayer",
    category: "Game Development",
    title: "Multiplayer FPS in Godot",
    date: "Sep 1, 2026",
    description: "Getting a basic multiplayer FPS project running in Godot."
  }
];

const posts = [
  {
    slug: "mw2-menu-progress",
    category: "Project Update",
    title: "MW2 Menu HUD — Progress Update",
    date: "Sep 2, 2026",
    description: "The latest progress on the BO3 menu and HUD rework."
  },
  {
    slug: "new-site",
    category: "Update",
    title: "Welcome to the New Site",
    date: "Aug 30, 2026",
    description: "A new home for tutorials, resources, and project updates."
  }
];

const files = [
  {
    slug: "bo3-weapon-port-pack",
    name: "BO3 Weapon Port Pack.zip",
    category: "Weapons",
    size: "12.4 MB",
    version: "1.0"
  },
  {
    slug: "mw2-hud-assets",
    name: "MW2 HUD Assets.zip",
    category: "UI",
    size: "245 MB",
    version: "1.0"
  },
  {
    slug: "config-template",
    name: "Config Template.txt",
    category: "Configs",
    size: "2 KB",
    version: "1.0"
  }
];

const app = document.querySelector("#app");

function arrow() {
  return `<span aria-hidden="true">→</span>`;
}

function contentCard(item, type) {
  return `
    <a class="content-card" href="#/${type}/${item.slug}">
      <div class="section-label">${type === "tutorials" ? "Tutorial" : "Post"}</div>
      <h3>${item.title}</h3>
      <time>${item.date}</time>
      <p>${item.description}</p>
    </a>
  `;
}

function fileRow(file) {
  return `
    <a class="file-row" href="#/files/${file.slug}">
      <span class="icon" aria-hidden="true">↓</span>
      <span>
        <strong>${file.name}</strong>
        <small>${file.category} · ${file.size}</small>
      </span>
      <span aria-hidden="true">↓</span>
    </a>
  `;
}

function home() {
  app.innerHTML = `
    <section class="hero container">
      <div class="hero-copy">
        <div class="eyebrow">Welcome to my website</div>
        <h1>Hi, I'm <span>Devin.</span></h1>
        <p>I make gaming content, modding tutorials, and technical videos. This site is where I share guides, resources, project updates, and files for my community.</p>
        <div class="actions">
          <a class="button primary" href="#">Watch on YouTube ${arrow()}</a>
          <a class="button" href="#/tutorials">View Tutorials ${arrow()}</a>
        </div>
      </div>
      <div class="hero-logo">
        <img src="assets/logo.png" alt="Devin logo">
      </div>
    </section>

    <section class="split container section">
      <div>
        <div class="section-label">About me</div>
        <h2>Who I Am</h2>
        <p>I'm Devin. I make videos about gaming, modding, technology, programming, and whatever I'm currently building or learning.</p>
        <a class="text-link" href="#/about">Learn more about me ${arrow()}</a>
      </div>

      <div class="quick">
        <div class="section-label">Quick links</div>
        <a class="quick-link" href="#"><span class="icon">▶</span><span><strong>YouTube</strong><small>Videos and channel updates</small></span>${arrow()}</a>
        <a class="quick-link" href="#/tutorials"><span class="icon">□</span><span><strong>Tutorials</strong><small>Guides, walkthroughs, and how-tos</small></span>${arrow()}</a>
        <a class="quick-link" href="#/files"><span class="icon">↓</span><span><strong>Files & Resources</strong><small>Downloads and useful project files</small></span>${arrow()}</a>
        <a class="quick-link" href="#/posts"><span class="icon">≡</span><span><strong>Posts</strong><small>Updates, notes, and project progress</small></span>${arrow()}</a>
      </div>
    </section>

    <section class="container section">
      <div class="section-head">
        <div><div class="section-label">Latest</div><h2>Recent Posts</h2></div>
        <a class="text-link" href="#/posts">View all posts ${arrow()}</a>
      </div>
      <div class="cards">
        ${contentCard(tutorials[0], "tutorials")}
        ${contentCard(tutorials[1], "tutorials")}
        ${contentCard(posts[0], "posts")}
      </div>
    </section>

    <section class="container section">
      <div class="section-head">
        <div><div class="section-label">Resources</div><h2>Latest Files</h2></div>
        <a class="text-link" href="#/files">View all files ${arrow()}</a>
      </div>
      <div class="file-list">${files.map(fileRow).join("")}</div>
    </section>
  `;
}

function listing(type) {
  const isTutorials = type === "tutorials";
  const items = isTutorials ? tutorials : posts;
  const title = isTutorials ? "Tutorials" : "Posts";
  const label = isTutorials ? "Guides" : "Updates";
  const description = isTutorials
    ? "Learn how to mod, build, configure, and create."
    : "Project updates, notes, announcements, and other stuff.";

  app.innerHTML = `
    <section class="container page">
      <div class="section-label">${label}</div>
      <h1>${title}</h1>
      <p class="lead">${description}</p>
      <input class="search" id="search" type="search" placeholder="Search ${title.toLowerCase()}..." aria-label="Search ${title}">
      <div class="list-grid" id="results">
        ${items.map(item => contentCard(item, type)).join("")}
      </div>
    </section>
  `;

  document.querySelector("#search").addEventListener("input", e => {
    const q = e.target.value.toLowerCase().trim();
    document.querySelector("#results").innerHTML = items
      .filter(item => `${item.title} ${item.description} ${item.category}`.toLowerCase().includes(q))
      .map(item => contentCard(item, type))
      .join("") || `<p class="lead">No results found.</p>`;
  });
}

function filesPage() {
  app.innerHTML = `
    <section class="container page">
      <div class="section-label">Resources</div>
      <h1>Files</h1>
      <p class="lead">Downloads and resources that go along with my tutorials and projects.</p>
      <div class="file-list" style="margin-top:40px">${files.map(fileRow).join("")}</div>
    </section>
  `;
}

function about() {
  app.innerHTML = `
    <section class="container page article">
      <div class="section-label">About me</div>
      <h1>Who I Am</h1>
      <p class="lead">I'm Devin. I make things, learn things, and make tutorials about them.</p>

      <h2>What I Do</h2>
      <p>My content covers gaming, modding, programming, game development, technology, servers, and whatever projects I happen to be working on.</p>

      <h2>What You'll Find Here</h2>
      <p>This website is the companion to my YouTube channel. Tutorials provide a written reference, posts cover project updates, and the files section contains resources and downloads.</p>
    </section>
  `;
}

function detail(type, slug) {
  const collection = type === "tutorials" ? tutorials : type === "posts" ? posts : files;
  const item = collection.find(x => x.slug === slug);

  if (!item) {
    app.innerHTML = `<section class="container page"><h1>Not found</h1><p class="lead">That page doesn't exist.</p></section>`;
    return;
  }

  if (type === "files") {
    app.innerHTML = `
      <section class="container page article">
        <div class="section-label">${item.category}</div>
        <h1>${item.name}</h1>
        <p class="lead">A resource for one of my projects or tutorials.</p>

        <div class="download-box">
          <div>
            <strong>${item.name}</strong>
            <small>${item.category} · ${item.size} · v${item.version}</small>
          </div>
          <a class="button primary" href="#">Download ↓</a>
        </div>

        <h2>About this file</h2>
        <p>This is placeholder resource content. Replace this description and the download link with the actual resource when you publish the file.</p>
      </section>
    `;
    return;
  }

  app.innerHTML = `
    <article class="container page article">
      <div class="section-label">${item.category}</div>
      <h1>${item.title}</h1>
      <p class="lead">${item.description}</p>

      <h2>Introduction</h2>
      <p>This is placeholder article content. Replace this with your actual tutorial or post when you add the real content.</p>

      <h2>Step 1</h2>
      <p>Explain the first step here. Your final content system can support images, code blocks, lists, and links.</p>

      <h2>Step 2</h2>
      <p>Continue the guide or update here.</p>

      <div class="actions">
        <a class="button primary" href="#">Watch on YouTube ${arrow()}</a>
        <a class="button" href="#/files">View Resources ${arrow()}</a>
      </div>
    </article>
  `;
}

function render() {
  const route = location.hash.replace(/^#/, "") || "/";
  const parts = route.split("/").filter(Boolean);

  if (parts.length === 0) home();
  else if (parts[0] === "about") about();
  else if (parts[0] === "tutorials" && parts[1]) detail("tutorials", parts[1]);
  else if (parts[0] === "tutorials") listing("tutorials");
  else if (parts[0] === "posts" && parts[1]) detail("posts", parts[1]);
  else if (parts[0] === "posts") listing("posts");
  else if (parts[0] === "files" && parts[1]) detail("files", parts[1]);
  else if (parts[0] === "files") filesPage();
  else home();

  document.querySelectorAll(".nav-links a").forEach(link => {
    link.classList.toggle("active", link.getAttribute("href") === `#${route}`);
  });

  window.scrollTo(0, 0);
}

const menuButton = document.querySelector(".menu-button");
const navLinks = document.querySelector(".nav-links");

menuButton.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(open));
});

navLinks.addEventListener("click", () => {
  navLinks.classList.remove("open");
  menuButton.setAttribute("aria-expanded", "false");
});

window.addEventListener("hashchange", render);
render();
