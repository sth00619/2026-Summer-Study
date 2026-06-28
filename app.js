// ===== STUDY HUB — Main App =====
// All state stored in localStorage for persistence across sessions

(function () {
  "use strict";

  // ===== STATE =====
  const STATE_KEY = "studyhub_state";

  function loadState() {
    try {
      const raw = localStorage.getItem(STATE_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) { /* ignore */ }
    return null;
  }

  function saveState(state) {
    localStorage.setItem(STATE_KEY, JSON.stringify(state));
  }

  let state = loadState() || {
    sessions: [],       // { id, topic, hours, note, date }
    journal: [],        // { id, title, body, tag, date }
    links: [...DEFAULT_LINKS],
    projects: [...DEFAULT_PROJECTS],
    streak: 0,
    lastStudyDate: null,
  };

  // ===== PARTICLES =====
  function initParticles() {
    const canvas = document.getElementById("particles");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let w, h, particles = [];

    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.5 + 0.5,
        dx: (Math.random() - 0.5) * 0.3,
        dy: (Math.random() - 0.5) * 0.3,
        o: Math.random() * 0.5 + 0.1,
      });
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);
      particles.forEach((p) => {
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(108,92,231,${p.o})`;
        ctx.fill();
      });

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(108,92,231,${0.06 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(draw);
    }
    draw();
  }

  // ===== NAVIGATION =====
  function initNav() {
    const links = document.querySelectorAll(".nav-link");
    const toggle = document.getElementById("navToggle");
    const navLinks = document.getElementById("navLinks");

    links.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const section = link.dataset.section;
        links.forEach((l) => l.classList.remove("active"));
        link.classList.add("active");

        document.querySelectorAll(".section").forEach((s) => (s.style.display = "none"));
        const target = document.getElementById(section);
        if (target) target.style.display = "block";

        navLinks.classList.remove("open");
        window.scrollTo({ top: target.offsetTop - 80, behavior: "smooth" });
      });
    });

    toggle.addEventListener("click", () => {
      navLinks.classList.toggle("open");
    });
  }

  // ===== HERO STATS (Animated counter) =====
  function animateCounter(el, target) {
    let current = 0;
    const step = Math.max(1, Math.ceil(target / 40));
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = current;
    }, 30);
  }

  function updateHeroStats() {
    const totalHours = state.sessions.reduce((s, x) => s + x.hours, 0);
    animateCounter(document.getElementById("statResources"), RESOURCES.length);
    animateCounter(document.getElementById("statHours"), Math.round(totalHours));
    animateCounter(document.getElementById("statEntries"), state.journal.length);
    animateCounter(document.getElementById("statStreak"), state.streak);
  }

  // ===== HEATMAP =====
  function renderHeatmap() {
    const container = document.getElementById("heatmap");
    if (!container) return;
    container.innerHTML = "";

    const today = new Date();
    const cells = 90; // last 90 days

    for (let i = cells - 1; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().slice(0, 10);

      const dayHours = state.sessions
        .filter((s) => s.date === dateStr)
        .reduce((sum, s) => sum + s.hours, 0);

      let level = 0;
      if (dayHours >= 4) level = 4;
      else if (dayHours >= 3) level = 3;
      else if (dayHours >= 2) level = 2;
      else if (dayHours > 0) level = 1;

      const cell = document.createElement("div");
      cell.className = `hm-cell hm-${level}`;
      cell.title = `${dateStr}: ${dayHours}h`;
      container.appendChild(cell);
    }
  }

  // ===== SKILL BARS =====
  function renderSkillBars() {
    const container = document.getElementById("skillBars");
    if (!container) return;
    container.innerHTML = "";

    const skills = [
      { key: "python", label: "Python", color: "#00b894" },
      { key: "sql", label: "SQL", color: "#0984e3" },
      { key: "ml", label: "ML / DS", color: "#6c5ce7" },
      { key: "tools", label: "Tools", color: "#fdcb6e" },
      { key: "career", label: "Career", color: "#e17055" },
    ];

    const maxHours = Math.max(1, ...skills.map((s) => {
      return state.sessions.filter((x) => x.topic === s.key).reduce((sum, x) => sum + x.hours, 0);
    }));

    skills.forEach((skill) => {
      const hours = state.sessions.filter((x) => x.topic === skill.key).reduce((sum, x) => sum + x.hours, 0);
      const pct = Math.min(100, (hours / Math.max(maxHours, 1)) * 100);

      const row = document.createElement("div");
      row.className = "skill-row";
      row.innerHTML = `
        <span class="skill-label">${skill.label}</span>
        <div class="skill-track">
          <div class="skill-fill" style="background:${skill.color};" data-width="${pct}%"></div>
        </div>
        <span class="skill-hours">${hours}h</span>
      `;
      container.appendChild(row);

      // Animate bar after render
      requestAnimationFrame(() => {
        const fill = row.querySelector(".skill-fill");
        fill.style.width = pct + "%";
      });
    });
  }

  // ===== LOG SESSION =====
  window.logSession = function () {
    const topic = document.getElementById("logTopic").value;
    const hours = parseFloat(document.getElementById("logHours").value);
    const note = document.getElementById("logNote").value.trim();

    if (!topic || !hours || hours <= 0) {
      showToast("Please select a topic and enter hours");
      return;
    }

    const today = new Date().toISOString().slice(0, 10);

    state.sessions.push({
      id: "s" + Date.now(),
      topic,
      hours,
      note,
      date: today,
    });

    // Update streak
    if (state.lastStudyDate !== today) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yStr = yesterday.toISOString().slice(0, 10);

      if (state.lastStudyDate === yStr) {
        state.streak++;
      } else {
        state.streak = 1;
      }
      state.lastStudyDate = today;
    }

    saveState(state);
    document.getElementById("logTopic").value = "";
    document.getElementById("logHours").value = "";
    document.getElementById("logNote").value = "";

    renderHeatmap();
    renderSkillBars();
    updateHeroStats();
    showToast(`Logged ${hours}h of ${topic}`);
  };

  // ===== RESOURCES =====
  function renderResources(filter = "all") {
    const grid = document.getElementById("resourceGrid");
    if (!grid) return;
    grid.innerHTML = "";

    const filtered = filter === "all" ? RESOURCES : RESOURCES.filter((r) => r.field === filter);

    filtered.forEach((r, i) => {
      const card = document.createElement("div");
      card.className = "resource-card reveal";
      card.style.animationDelay = `${i * 0.05}s`;
      card.innerHTML = `
        <span class="resource-tag tag-${r.field}">${r.field.toUpperCase()} · ${r.type}</span>
        <div class="resource-name">${r.name}</div>
        <div class="resource-desc">${r.desc}</div>
        ${r.link ? `<a href="${r.link}" target="_blank" rel="noopener" class="resource-link">${new URL(r.link).hostname}</a>` : ""}
        <div class="resource-source">${r.src}</div>
      `;
      grid.appendChild(card);

      // Intersection observer for reveal
      requestAnimationFrame(() => card.classList.add("visible"));
    });
  }

  function initFilters() {
    document.querySelectorAll(".filter-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        renderResources(btn.dataset.filter);
      });
    });
  }

  // ===== PROJECTS (Kanban) =====
  function renderProjects() {
    const todo = document.getElementById("boardTodo");
    const progress = document.getElementById("boardProgress");
    const done = document.getElementById("boardDone");
    if (!todo || !progress || !done) return;

    todo.innerHTML = "";
    progress.innerHTML = "";
    done.innerHTML = "";

    state.projects.forEach((p) => {
      const item = document.createElement("div");
      item.className = "board-item";

      const nextStatus = p.status === "todo" ? "progress" : p.status === "progress" ? "done" : null;
      const prevStatus = p.status === "done" ? "progress" : p.status === "progress" ? "todo" : null;

      item.innerHTML = `
        <span>
          <span class="resource-tag tag-${p.field}" style="font-size:9px;margin-right:4px;">${p.field}</span>
          ${p.name}
        </span>
        <span class="board-item-actions">
          ${prevStatus ? `<button class="btn-ghost btn-sm" onclick="moveProject('${p.id}','${prevStatus}')" title="Move back">←</button>` : ""}
          ${nextStatus ? `<button class="btn-ghost btn-sm" onclick="moveProject('${p.id}','${nextStatus}')" title="Move forward">→</button>` : ""}
          <button class="btn-ghost btn-sm" onclick="deleteProject('${p.id}')" title="Delete">×</button>
        </span>
      `;

      if (p.status === "todo") todo.appendChild(item);
      else if (p.status === "progress") progress.appendChild(item);
      else done.appendChild(item);
    });
  }

  window.addProject = function () {
    const name = document.getElementById("projName").value.trim();
    const field = document.getElementById("projField").value;
    if (!name) { showToast("Enter a project name"); return; }

    state.projects.push({ id: "p" + Date.now(), name, field, status: "todo" });
    saveState(state);
    document.getElementById("projName").value = "";
    renderProjects();
    showToast(`Added: ${name}`);
  };

  window.moveProject = function (id, newStatus) {
    const p = state.projects.find((x) => x.id === id);
    if (p) {
      p.status = newStatus;
      saveState(state);
      renderProjects();
    }
  };

  window.deleteProject = function (id) {
    state.projects = state.projects.filter((x) => x.id !== id);
    saveState(state);
    renderProjects();
  };

  // ===== JOURNAL =====
  function renderJournal() {
    const container = document.getElementById("journalEntries");
    if (!container) return;
    container.innerHTML = "";

    const sorted = [...state.journal].sort((a, b) => b.date.localeCompare(a.date));

    sorted.forEach((entry, i) => {
      const div = document.createElement("div");
      div.className = "journal-entry";
      div.style.animationDelay = `${i * 0.08}s`;
      div.innerHTML = `
        <div class="journal-entry-header">
          <span class="journal-entry-title">${entry.title}</span>
          <span class="journal-entry-date">${formatDate(entry.date)}</span>
        </div>
        <div class="journal-entry-body">${escapeHtml(entry.body)}</div>
        <span class="journal-tag tag-${entry.tag}">${entry.tag.toUpperCase()}</span>
        <button class="btn-ghost btn-sm" style="float:right;" onclick="deleteJournal('${entry.id}')">Delete</button>
      `;
      container.appendChild(div);
    });
  }

  window.addJournalEntry = function () {
    const title = document.getElementById("journalTitle").value.trim();
    const body = document.getElementById("journalBody").value.trim();
    const tag = document.getElementById("journalTag").value;

    if (!title || !body) { showToast("Fill in title and body"); return; }

    state.journal.push({
      id: "j" + Date.now(),
      title,
      body,
      tag,
      date: new Date().toISOString(),
    });
    saveState(state);
    document.getElementById("journalTitle").value = "";
    document.getElementById("journalBody").value = "";
    renderJournal();
    updateHeroStats();
    showToast("Journal entry saved");
  };

  window.deleteJournal = function (id) {
    state.journal = state.journal.filter((x) => x.id !== id);
    saveState(state);
    renderJournal();
    updateHeroStats();
  };

  // ===== LINKS =====
  function renderLinks() {
    const grid = document.getElementById("linkGrid");
    if (!grid) return;
    grid.innerHTML = "";

    const iconMap = {
      study: { icon: "📚", cls: "link-icon-study" },
      tool: { icon: "🛠", cls: "link-icon-tool" },
      repo: { icon: "📂", cls: "link-icon-repo" },
      article: { icon: "📄", cls: "link-icon-article" },
      video: { icon: "🎬", cls: "link-icon-video" },
    };

    state.links.forEach((link) => {
      const info = iconMap[link.cat] || iconMap.study;
      const div = document.createElement("div");
      div.className = "link-item";
      div.onclick = (e) => {
        if (!e.target.classList.contains("link-delete")) {
          window.open(link.url, "_blank");
        }
      };
      div.innerHTML = `
        <div class="link-icon ${info.cls}">${info.icon}</div>
        <div class="link-info">
          <div class="link-title">${escapeHtml(link.title)}</div>
          <div class="link-url">${link.url}</div>
        </div>
        <button class="link-delete" onclick="event.stopPropagation();deleteLink('${link.id}')">×</button>
      `;
      grid.appendChild(div);
    });
  }

  window.addLink = function () {
    const title = document.getElementById("linkTitle").value.trim();
    const url = document.getElementById("linkUrl").value.trim();
    const cat = document.getElementById("linkCat").value;
    if (!title || !url) { showToast("Fill in label and URL"); return; }

    state.links.push({ id: "l" + Date.now(), title, url, cat });
    saveState(state);
    document.getElementById("linkTitle").value = "";
    document.getElementById("linkUrl").value = "";
    renderLinks();
    showToast("Link saved");
  };

  window.deleteLink = function (id) {
    state.links = state.links.filter((x) => x.id !== id);
    saveState(state);
    renderLinks();
  };

  // ===== UTILS =====
  function showToast(msg) {
    const existing = document.querySelector(".toast");
    if (existing) existing.remove();
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = msg;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2500);
  }

  function formatDate(iso) {
    const d = new Date(iso);
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  }

  function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  // ===== SCROLL REVEAL =====
  function initScrollReveal() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
  }

  // ===== INIT =====
  function init() {
    initParticles();
    initNav();
    updateHeroStats();
    renderHeatmap();
    renderSkillBars();
    renderResources();
    initFilters();
    renderProjects();
    renderJournal();
    renderLinks();

    setTimeout(initScrollReveal, 500);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
