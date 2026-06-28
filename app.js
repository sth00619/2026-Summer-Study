// ===== STUDY HUB — Application Logic =====
// Sections: state, utils, particles, nav, dashboard (heatmap/skills/sessions),
// library (filter+render+detail modal), projects (kanban+edit modal),
// resources, journal, links, init.

// =========================================================================
// STATE — localStorage persistence
// =========================================================================
const STORAGE = {
  sessions: "sh_sessions",   // [{id, date, topic, hours, note}]
  projects: "sh_projects",   // user's projects (Kanban). See schema below
  journal:  "sh_journal",    // [{id, date, title, body, tag, linkProject}]
  links:    "sh_links",      // [{id, title, url, cat}]
};
// User project schema:
// {
//   id, title, category, status: "todo"|"progress"|"done",
//   started_date, target_date, completed_date,  // ISO YYYY-MM-DD or null
//   github_url, demo_url, notes,
//   sourceLibraryId,  // if added from library
//   shortDesc, techStack, difficulty            // copied from library
// }

const load = (k, d) => {
  try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; }
};
const save = (k, v) => localStorage.setItem(k, JSON.stringify(v));

let sessions = load(STORAGE.sessions, []);
let projects = load(STORAGE.projects, []);
let journal  = load(STORAGE.journal, []);
let links    = load(STORAGE.links, DEFAULT_LINKS);

// First-time setup: seed default 4 projects if user has none
if (projects.length === 0) {
  projects = DEFAULT_PROJECTS.map(p => ({
    id: p.id,
    title: p.name,
    category: p.field === "ml" ? "ml" : p.field === "sql" ? "da-bi" : p.field === "python" ? "ml" : "ml",
    status: p.status,
    started_date: null,
    target_date: null,
    completed_date: null,
    github_url: "",
    demo_url: "",
    notes: "",
    shortDesc: "",
    techStack: [],
    difficulty: "Beginner",
  }));
  save(STORAGE.projects, projects);
}

// Current filter state
let libCatFilter = "all";
let libDiffFilter = "all";
let resourceFilter = "all";
let journalFilter = "all";

// =========================================================================
// UTILITIES
// =========================================================================
function uid(prefix = "x") {
  return prefix + "_" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}
function toast(msg) {
  const old = document.querySelector(".toast");
  if (old) old.remove();
  const t = document.createElement("div");
  t.className = "toast";
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 2500);
}
function todayISO() {
  return new Date().toISOString().slice(0, 10);
}
function formatDateKR(iso) {
  // "2026-06-28" -> "2026년 6월 28일"
  if (!iso) return "";
  const [y, m, d] = iso.split("-").map(Number);
  return `${y}년 ${m}월 ${d}일`;
}
function formatDateShort(iso) {
  // "2026-06-28" -> "06.28"
  if (!iso) return "";
  return iso.slice(5).replace("-", ".");
}
function escapeHtml(s) {
  if (s == null) return "";
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// =========================================================================
// PARTICLE BACKGROUND
// =========================================================================
function initParticles() {
  const canvas = document.getElementById("particles");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let particles = [];
  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    particles = [];
    const count = Math.min(50, Math.floor((canvas.width * canvas.height) / 25000));
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.5 + 0.5,
      });
    }
  }
  resize();
  window.addEventListener("resize", resize);
  function tick() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(108, 92, 231, 0.4)";
      ctx.fill();
    });
    requestAnimationFrame(tick);
  }
  tick();
}

// =========================================================================
// NAV
// =========================================================================
function initNav() {
  const toggle = document.getElementById("navToggle");
  const linksEl = document.getElementById("navLinks");
  if (toggle) {
    toggle.addEventListener("click", () => linksEl.classList.toggle("open"));
  }
  document.querySelectorAll(".nav-link").forEach(a => {
    a.addEventListener("click", e => {
      e.preventDefault();
      const target = a.dataset.section;
      showSection(target);
      document.querySelectorAll(".nav-link").forEach(x => x.classList.remove("active"));
      a.classList.add("active");
      linksEl.classList.remove("open");
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });
}
function showSection(id) {
  document.querySelectorAll(".section").forEach(s => {
    s.style.display = s.id === id ? "block" : "none";
  });
}

// =========================================================================
// DASHBOARD — Hero counters
// =========================================================================
function animateCounter(el, target, dur = 1200) {
  if (!el) return;
  const start = Date.now();
  const startVal = 0;
  function step() {
    const elapsed = Date.now() - start;
    const t = Math.min(elapsed / dur, 1);
    const eased = 1 - Math.pow(1 - t, 3);
    el.textContent = Math.round(startVal + (target - startVal) * eased);
    if (t < 1) requestAnimationFrame(step);
  }
  step();
}
function updateHeroStats() {
  const totalHours = sessions.reduce((sum, s) => sum + Number(s.hours || 0), 0);
  animateCounter(document.getElementById("statProjects"), PROJECT_LIBRARY.length);
  animateCounter(document.getElementById("statHours"), Math.round(totalHours));
  animateCounter(document.getElementById("statEntries"), journal.length);
  animateCounter(document.getElementById("statStreak"), calcStreak());
}
function calcStreak() {
  if (sessions.length === 0) return 0;
  const dates = [...new Set(sessions.map(s => s.date))].sort().reverse();
  let streak = 0;
  let cursor = new Date(todayISO());
  for (const d of dates) {
    const isoCursor = cursor.toISOString().slice(0, 10);
    if (d === isoCursor) {
      streak++;
      cursor.setDate(cursor.getDate() - 1);
    } else if (d < isoCursor) {
      break;
    }
  }
  return streak;
}

// =========================================================================
// HEATMAP
// =========================================================================
function renderHeatmap() {
  const el = document.getElementById("heatmap");
  if (!el) return;
  const days = 84; // 12 weeks
  const end = new Date();
  end.setHours(0, 0, 0, 0);
  const cells = [];
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(end);
    d.setDate(d.getDate() - i);
    const iso = d.toISOString().slice(0, 10);
    const hours = sessions.filter(s => s.date === iso).reduce((sum, s) => sum + Number(s.hours || 0), 0);
    let level = 0;
    if (hours >= 4) level = 4;
    else if (hours >= 3) level = 3;
    else if (hours >= 2) level = 2;
    else if (hours >= 1) level = 1;
    cells.push(`<div class="hm-cell hm-${level}" title="${formatDateKR(iso)} · ${hours}h"></div>`);
  }
  el.innerHTML = cells.join("");
  const rangeEl = document.getElementById("heatmapRange");
  if (rangeEl) {
    const startIso = new Date(end);
    startIso.setDate(startIso.getDate() - (days - 1));
    rangeEl.textContent = `${formatDateKR(startIso.toISOString().slice(0, 10))} — ${formatDateKR(end.toISOString().slice(0, 10))}`;
  }
}

// =========================================================================
// SKILL BARS
// =========================================================================
function renderSkillBars() {
  const el = document.getElementById("skillBars");
  if (!el) return;
  const TOPICS = {
    python:  { label: "Python",   color: "#00b894" },
    sql:     { label: "SQL",      color: "#0984e3" },
    ml:      { label: "ML / DS",  color: "#6c5ce7" },
    tools:   { label: "Tools",    color: "#fdcb6e" },
    career:  { label: "Career",   color: "#e17055" },
    project: { label: "Project",  color: "#fd79a8" },
    other:   { label: "Other",    color: "#a29bfe" },
  };
  const totals = {};
  sessions.forEach(s => {
    if (!s.topic) return;
    totals[s.topic] = (totals[s.topic] || 0) + Number(s.hours || 0);
  });
  const maxHours = Math.max(...Object.values(totals), 10);
  el.innerHTML = Object.entries(TOPICS).map(([key, info]) => {
    const h = totals[key] || 0;
    const pct = (h / maxHours) * 100;
    return `
      <div class="skill-row">
        <span class="skill-label">${info.label}</span>
        <div class="skill-track"><div class="skill-fill" style="width:0%;background:${info.color}"></div></div>
        <span class="skill-hours">${h}h</span>
      </div>`;
  }).join("");
  // animate
  setTimeout(() => {
    el.querySelectorAll(".skill-fill").forEach((bar, i) => {
      const topic = Object.keys(TOPICS)[i];
      const h = totals[topic] || 0;
      const pct = (h / maxHours) * 100;
      bar.style.width = pct + "%";
    });
  }, 100);
}

// =========================================================================
// SESSION LOGGING
// =========================================================================
function logSession() {
  const dateEl = document.getElementById("logDate");
  const topicEl = document.getElementById("logTopic");
  const hoursEl = document.getElementById("logHours");
  const noteEl = document.getElementById("logNote");
  const date = dateEl.value || todayISO();
  const topic = topicEl.value;
  const hours = parseFloat(hoursEl.value);
  if (!topic) { toast("토픽을 선택하세요"); return; }
  if (!hours || hours <= 0) { toast("학습 시간을 입력하세요"); return; }
  sessions.push({
    id: uid("s"),
    date,
    topic,
    hours,
    note: (noteEl.value || "").trim(),
  });
  save(STORAGE.sessions, sessions);
  dateEl.value = "";
  topicEl.value = "";
  hoursEl.value = "";
  noteEl.value = "";
  toast(`기록됨 · ${formatDateKR(date)} · ${hours}h`);
  renderHeatmap();
  renderSkillBars();
  renderRecentSessions();
  updateHeroStats();
}

function toggleRecentSessions() {
  const el = document.getElementById("recentSessions");
  const btn = document.getElementById("recentToggle");
  if (!el) return;
  if (el.style.display === "none") {
    el.style.display = "block";
    btn.textContent = "접기";
    renderRecentSessions();
  } else {
    el.style.display = "none";
    btn.textContent = "펼치기";
  }
}
function renderRecentSessions() {
  const el = document.getElementById("recentSessions");
  if (!el || el.style.display === "none") return;
  const TOPIC_LABELS = {
    python: "Python", sql: "SQL", ml: "ML/DS", tools: "Tools",
    career: "Career", project: "Project", other: "Other"
  };
  const list = [...sessions].sort((a, b) => b.date.localeCompare(a.date) || b.id.localeCompare(a.id)).slice(0, 20);
  if (list.length === 0) {
    el.innerHTML = `<p style="color:var(--text-muted);font-size:13px;">아직 학습 기록이 없습니다.</p>`;
    return;
  }
  el.innerHTML = list.map(s => `
    <div class="recent-item">
      <span class="recent-date">${formatDateKR(s.date)}</span>
      <span class="recent-topic">${TOPIC_LABELS[s.topic] || s.topic}</span>
      <span style="flex:1;color:var(--text-dim);font-size:12px;margin-left:12px;">${escapeHtml(s.note || "")}</span>
      <span class="recent-hours">${s.hours}h</span>
      <button class="btn-ghost btn-sm" onclick="deleteSession('${s.id}')" title="삭제">✕</button>
    </div>
  `).join("");
}
function deleteSession(id) {
  if (!confirm("이 기록을 삭제하시겠습니까?")) return;
  sessions = sessions.filter(s => s.id !== id);
  save(STORAGE.sessions, sessions);
  renderHeatmap();
  renderSkillBars();
  renderRecentSessions();
  updateHeroStats();
  toast("삭제됨");
}

// =========================================================================
// PROJECT LIBRARY — Render grid + filters
// =========================================================================
function renderProjectLibrary() {
  const el = document.getElementById("libraryGrid");
  if (!el) return;
  const filtered = PROJECT_LIBRARY.filter(p => {
    if (libCatFilter !== "all" && p.category !== libCatFilter) return false;
    if (libDiffFilter !== "all" && p.difficulty !== libDiffFilter) return false;
    return true;
  });
  if (filtered.length === 0) {
    el.innerHTML = `<p style="grid-column:1/-1;color:var(--text-muted);text-align:center;padding:2rem;">조건에 맞는 프로젝트가 없습니다.</p>`;
    return;
  }
  el.innerHTML = filtered.map(p => {
    const cat = PROJECT_CATEGORIES[p.category];
    return `
      <div class="lib-card" style="--lib-color:${cat.color}" onclick="showProjectDetail('${p.id}')">
        <div class="lib-card-header">
          <span class="lib-cat-badge">${cat.icon} ${cat.label.split(" · ")[0]}</span>
          <span class="lib-diff diff-${p.difficulty}">${p.difficulty}</span>
        </div>
        <h3 class="lib-title">${escapeHtml(p.title)}</h3>
        <p class="lib-desc">${escapeHtml(p.shortDesc)}</p>
        <div class="lib-meta">
          <span class="lib-meta-item">⏱ ${p.estimatedHours}h</span>
          <span class="lib-meta-item">🔧 ${p.techStack.length} tools</span>
          <span class="lib-meta-item">📚 ${p.steps.length} steps</span>
        </div>
      </div>
    `;
  }).join("");
}

function initLibraryFilters() {
  document.querySelectorAll("[data-filter]").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("[data-filter]").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      libCatFilter = btn.dataset.filter;
      renderProjectLibrary();
    });
  });
  document.querySelectorAll("[data-diff]").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("[data-diff]").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      libDiffFilter = btn.dataset.diff;
      renderProjectLibrary();
    });
  });
}

// =========================================================================
// PROJECT DETAIL MODAL — from library
// =========================================================================
function showProjectDetail(libId) {
  const p = PROJECT_LIBRARY.find(x => x.id === libId);
  if (!p) return;
  const cat = PROJECT_CATEGORIES[p.category];
  const alreadyAdded = projects.some(up => up.sourceLibraryId === libId);

  const html = `
    <div class="detail-header">
      <h2 class="detail-title">${escapeHtml(p.title)}</h2>
      <div class="detail-badges">
        <span class="lib-cat-badge">${cat.icon} ${escapeHtml(cat.label)}</span>
        <span class="lib-diff diff-${p.difficulty}">${p.difficulty}</span>
        <span class="lib-cat-badge">⏱ 예상 ${p.estimatedHours}시간</span>
      </div>
    </div>

    <div class="detail-section">
      <h4>프로젝트 설명</h4>
      <p>${escapeHtml(p.longDesc)}</p>
    </div>

    <div class="detail-section highlight">
      <h4>왜 이 프로젝트가 중요한가?</h4>
      <p>${escapeHtml(p.whyItMatters)}</p>
    </div>

    <div class="detail-section">
      <h4>기술 스택</h4>
      <div class="tag-list">
        ${p.techStack.map(t => `<span class="tag-item">${escapeHtml(t)}</span>`).join("")}
      </div>
    </div>

    <div class="detail-section">
      <h4>데이터셋</h4>
      <ul class="resource-list">
        ${p.datasets.map(d => `<li>· ${escapeHtml(d)}</li>`).join("")}
      </ul>
    </div>

    <div class="detail-section">
      <h4>핵심 스킬</h4>
      <div class="tag-list">
        ${p.skills.map(s => `<span class="tag-item">${escapeHtml(s)}</span>`).join("")}
      </div>
    </div>

    <div class="detail-section">
      <h4>구현 단계 (${p.steps.length}단계)</h4>
      <div class="step-list">
        ${p.steps.map(s => `
          <div class="step-item">
            <div class="step-title">${escapeHtml(s.title)}</div>
            <div class="step-desc">${escapeHtml(s.desc)}</div>
          </div>
        `).join("")}
      </div>
    </div>

    ${p.resources && p.resources.length ? `
      <div class="detail-section">
        <h4>참고 자료</h4>
        <ul class="resource-list">
          ${p.resources.map(r => r.url
            ? `<li>· <a href="${escapeHtml(r.url)}" target="_blank" rel="noopener">${escapeHtml(r.title)}</a></li>`
            : `<li>· ${escapeHtml(r.title)}</li>`
          ).join("")}
        </ul>
      </div>
    ` : ""}

    <div class="detail-section">
      <h4>적합한 직무</h4>
      <div class="tag-list">
        ${p.forRole.map(r => `<span class="tag-item">${escapeHtml(r)}</span>`).join("")}
      </div>
    </div>

    ${p.warning ? `
      <div class="detail-section">
        <div class="warning-box">⚠ ${escapeHtml(p.warning)}</div>
      </div>
    ` : ""}

    ${p.sourceFromChats ? `
      <div class="detail-section">
        <h4>출처</h4>
        <p style="font-size:12px;color:var(--text-muted);font-family:var(--mono);">${escapeHtml(p.sourceFromChats)}</p>
      </div>
    ` : ""}

    <div class="detail-actions">
      ${alreadyAdded
        ? `<button class="btn" disabled>이미 추가됨</button>`
        : `<button class="btn btn-primary" onclick="addProjectFromLibrary('${p.id}')">내 프로젝트로 추가</button>`}
      <button class="btn" onclick="closeModal()">닫기</button>
    </div>
  `;
  document.getElementById("modalContent").innerHTML = html;
  openModal();
}

// =========================================================================
// MODAL — open / close
// =========================================================================
function openModal() {
  document.getElementById("modalBackdrop").classList.add("open");
  document.body.style.overflow = "hidden";
}
function closeModal() {
  document.getElementById("modalBackdrop").classList.remove("open");
  document.body.style.overflow = "";
}
function closeModalOnBackdrop(event) {
  if (event.target.id === "modalBackdrop") closeModal();
}
document.addEventListener("keydown", e => {
  if (e.key === "Escape") closeModal();
});

// =========================================================================
// MY PROJECTS — add from library, custom, render
// =========================================================================
function addProjectFromLibrary(libId) {
  const p = PROJECT_LIBRARY.find(x => x.id === libId);
  if (!p) return;
  if (projects.some(up => up.sourceLibraryId === libId)) {
    toast("이미 추가된 프로젝트입니다");
    return;
  }
  projects.push({
    id: uid("p"),
    title: p.title,
    category: p.category,
    status: "todo",
    started_date: null,
    target_date: null,
    completed_date: null,
    github_url: "",
    demo_url: "",
    notes: "",
    sourceLibraryId: p.id,
    shortDesc: p.shortDesc,
    techStack: p.techStack,
    difficulty: p.difficulty,
  });
  save(STORAGE.projects, projects);
  renderProjects();
  toast(`'${p.title}' 추가됨`);
  closeModal();
}

function addCustomProject() {
  const nameEl = document.getElementById("projName");
  const fieldEl = document.getElementById("projField");
  const title = nameEl.value.trim();
  if (!title) { toast("프로젝트 이름을 입력하세요"); return; }
  projects.push({
    id: uid("p"),
    title,
    category: fieldEl.value,
    status: "todo",
    started_date: null,
    target_date: null,
    completed_date: null,
    github_url: "",
    demo_url: "",
    notes: "",
    sourceLibraryId: null,
    shortDesc: "",
    techStack: [],
    difficulty: "Beginner",
  });
  save(STORAGE.projects, projects);
  nameEl.value = "";
  renderProjects();
  toast("프로젝트 추가됨");
}

function renderProjects() {
  const cols = { todo: [], progress: [], done: [] };
  projects.forEach(p => {
    if (cols[p.status]) cols[p.status].push(p);
  });
  ["todo", "progress", "done"].forEach(status => {
    const target = document.getElementById("board" + status.charAt(0).toUpperCase() + status.slice(1));
    const countEl = document.getElementById("count" + status.charAt(0).toUpperCase() + status.slice(1));
    if (countEl) countEl.textContent = cols[status].length;
    if (!target) return;
    if (cols[status].length === 0) {
      target.innerHTML = `<p style="color:var(--text-muted);font-size:12px;padding:8px 4px;">비어 있음</p>`;
      return;
    }
    target.innerHTML = cols[status].map(p => {
      const cat = PROJECT_CATEGORIES[p.category] || PROJECT_CATEGORIES.ml;
      const dateInfo = p.status === "done" && p.completed_date
        ? `완료: ${formatDateKR(p.completed_date)}`
        : p.status === "progress" && p.started_date
        ? `시작: ${formatDateKR(p.started_date)}`
        : p.target_date
        ? `목표: ${formatDateKR(p.target_date)}`
        : "";
      return `
        <div class="board-item" onclick="showProjectEdit('${p.id}')">
          <div class="board-item-title">${escapeHtml(p.title)}</div>
          <div class="board-item-meta">
            <span class="board-item-tag" style="color:${cat.color}">${cat.icon} ${cat.label.split(" · ")[0]}</span>
            <span style="font-size:10px;color:var(--text-muted);">${dateInfo}</span>
          </div>
        </div>
      `;
    }).join("");
  });
}

// =========================================================================
// PROJECT EDIT MODAL
// =========================================================================
function showProjectEdit(projectId) {
  const p = projects.find(x => x.id === projectId);
  if (!p) return;
  const html = `
    <div class="detail-header">
      <h2 class="detail-title">프로젝트 편집</h2>
      ${p.sourceLibraryId ? `
        <p style="font-size:12px;color:var(--text-muted);margin-top:4px;">
          Library 출처:
          <a href="#" onclick="event.preventDefault();showProjectDetail('${p.sourceLibraryId}')">${escapeHtml(p.shortDesc || "원본 보기")}</a>
        </p>
      ` : ""}
    </div>

    <div class="edit-form">
      <div class="edit-row">
        <span class="edit-label">제목</span>
        <input type="text" class="input" id="edit_title" value="${escapeHtml(p.title)}" />
      </div>
      <div class="edit-row">
        <span class="edit-label">카테고리</span>
        <select class="input" id="edit_category">
          ${Object.entries(PROJECT_CATEGORIES).map(([k, v]) =>
            `<option value="${k}" ${p.category === k ? "selected" : ""}>${v.icon} ${v.label}</option>`
          ).join("")}
        </select>
      </div>
      <div class="edit-row">
        <span class="edit-label">상태</span>
        <select class="input" id="edit_status">
          <option value="todo" ${p.status === "todo" ? "selected" : ""}>To do (예정)</option>
          <option value="progress" ${p.status === "progress" ? "selected" : ""}>In progress (진행 중)</option>
          <option value="done" ${p.status === "done" ? "selected" : ""}>Done (완료)</option>
        </select>
      </div>
      <div class="edit-row">
        <span class="edit-label">시작일</span>
        <input type="date" class="input" id="edit_started" value="${p.started_date || ""}" />
      </div>
      <div class="edit-row">
        <span class="edit-label">목표일</span>
        <input type="date" class="input" id="edit_target" value="${p.target_date || ""}" />
      </div>
      <div class="edit-row">
        <span class="edit-label">완료일</span>
        <input type="date" class="input" id="edit_completed" value="${p.completed_date || ""}" />
      </div>
      <div class="edit-row">
        <span class="edit-label">GitHub URL</span>
        <input type="url" class="input" id="edit_github" placeholder="https://github.com/..." value="${escapeHtml(p.github_url || "")}" />
      </div>
      <div class="edit-row">
        <span class="edit-label">Demo URL</span>
        <input type="url" class="input" id="edit_demo" placeholder="배포 URL 또는 노트북 링크" value="${escapeHtml(p.demo_url || "")}" />
      </div>
      <div class="edit-row full">
        <span class="edit-label">메모 / 진행 노트</span>
        <textarea class="input textarea" id="edit_notes" placeholder="배운 점, 진행 상황, 다음 할 일 등 자유롭게">${escapeHtml(p.notes || "")}</textarea>
      </div>

      ${p.techStack && p.techStack.length ? `
        <div class="detail-section" style="margin:0;">
          <h4>기술 스택 (라이브러리 출처)</h4>
          <div class="tag-list">
            ${p.techStack.map(t => `<span class="tag-item">${escapeHtml(t)}</span>`).join("")}
          </div>
        </div>
      ` : ""}
    </div>

    <div class="detail-actions">
      <button class="btn btn-primary" onclick="saveProjectEdit('${p.id}')">저장</button>
      <button class="btn" onclick="closeModal()">취소</button>
      <button class="btn btn-danger" onclick="deleteProject('${p.id}')" style="margin-left:auto;">삭제</button>
    </div>
  `;
  document.getElementById("modalContent").innerHTML = html;
  openModal();
}

function saveProjectEdit(projectId) {
  const p = projects.find(x => x.id === projectId);
  if (!p) return;
  const newStatus = document.getElementById("edit_status").value;
  const newCompleted = document.getElementById("edit_completed").value || null;
  // Auto-set completed_date when moving to Done if blank
  let finalCompleted = newCompleted;
  if (newStatus === "done" && !newCompleted && p.status !== "done") {
    finalCompleted = todayISO();
  }
  // Auto-set started_date when moving to In progress if blank
  let finalStarted = document.getElementById("edit_started").value || null;
  if (newStatus === "progress" && !finalStarted && p.status === "todo") {
    finalStarted = todayISO();
  }
  Object.assign(p, {
    title: document.getElementById("edit_title").value.trim() || p.title,
    category: document.getElementById("edit_category").value,
    status: newStatus,
    started_date: finalStarted,
    target_date: document.getElementById("edit_target").value || null,
    completed_date: finalCompleted,
    github_url: document.getElementById("edit_github").value.trim(),
    demo_url: document.getElementById("edit_demo").value.trim(),
    notes: document.getElementById("edit_notes").value.trim(),
  });
  save(STORAGE.projects, projects);
  renderProjects();
  closeModal();
  toast("저장됨");
}

function deleteProject(projectId) {
  if (!confirm("이 프로젝트를 삭제하시겠습니까? 이 동작은 되돌릴 수 없습니다.")) return;
  projects = projects.filter(x => x.id !== projectId);
  save(STORAGE.projects, projects);
  renderProjects();
  closeModal();
  toast("삭제됨");
}

// =========================================================================
// RESOURCES
// =========================================================================
function renderResources() {
  const el = document.getElementById("resourceGrid");
  if (!el) return;
  const filtered = resourceFilter === "all"
    ? RESOURCES
    : RESOURCES.filter(r => r.field === resourceFilter);
  el.innerHTML = filtered.map(r => `
    <div class="resource-card">
      <span class="resource-tag tag-${r.field}">${r.type}</span>
      <h3 class="resource-name">${escapeHtml(r.name)}</h3>
      <p class="resource-desc">${escapeHtml(r.desc)}</p>
      ${r.link ? `<a href="${escapeHtml(r.link)}" target="_blank" rel="noopener" class="resource-link">${escapeHtml(r.link)}</a>` : ""}
      <p class="resource-source">${escapeHtml(r.src || "")}</p>
    </div>
  `).join("");
}
function initResourceFilters() {
  document.querySelectorAll("[data-resource-filter]").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("[data-resource-filter]").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      resourceFilter = btn.dataset.resourceFilter;
      renderResources();
    });
  });
}

// =========================================================================
// JOURNAL
// =========================================================================
function addJournalEntry() {
  const dateEl = document.getElementById("journalDate");
  const titleEl = document.getElementById("journalTitle");
  const bodyEl = document.getElementById("journalBody");
  const tagEl = document.getElementById("journalTag");
  const linkEl = document.getElementById("journalLinkProject");
  const title = titleEl.value.trim();
  const body = bodyEl.value.trim();
  if (!title) { toast("제목을 입력하세요"); return; }
  if (!body) { toast("내용을 입력하세요"); return; }
  journal.push({
    id: uid("j"),
    date: dateEl.value || todayISO(),
    title,
    body,
    tag: tagEl.value,
    linkProject: (linkEl.value || "").trim(),
  });
  save(STORAGE.journal, journal);
  dateEl.value = "";
  titleEl.value = "";
  bodyEl.value = "";
  linkEl.value = "";
  renderJournal();
  updateHeroStats();
  toast("일지 저장됨");
}
function deleteJournal(id) {
  if (!confirm("이 일지를 삭제하시겠습니까?")) return;
  journal = journal.filter(j => j.id !== id);
  save(STORAGE.journal, journal);
  renderJournal();
  updateHeroStats();
  toast("삭제됨");
}
function renderJournal() {
  const el = document.getElementById("journalEntries");
  if (!el) return;
  const TAGS = {
    til: "TIL", breakthrough: "Breakthrough", struggle: "Struggle",
    idea: "Idea", review: "Review"
  };
  const filtered = journalFilter === "all"
    ? journal
    : journal.filter(j => j.tag === journalFilter);
  const sorted = [...filtered].sort((a, b) => b.date.localeCompare(a.date) || b.id.localeCompare(a.id));
  if (sorted.length === 0) {
    el.innerHTML = `<p style="color:var(--text-muted);text-align:center;padding:2rem;">일지가 없습니다.</p>`;
    return;
  }
  el.innerHTML = sorted.map(j => `
    <div class="journal-entry">
      <div class="journal-entry-header">
        <h4 class="journal-entry-title">${escapeHtml(j.title)}</h4>
        <span class="journal-entry-date">${formatDateKR(j.date)}</span>
      </div>
      <div class="journal-entry-body">${escapeHtml(j.body)}</div>
      <div class="journal-meta-row">
        <span class="journal-tag tag-${j.tag}">${TAGS[j.tag] || j.tag}</span>
        ${j.linkProject ? `<span class="journal-project-link">🔗 ${escapeHtml(j.linkProject)}</span>` : ""}
        <button class="btn-ghost btn-sm" style="margin-left:auto;" onclick="deleteJournal('${j.id}')">삭제</button>
      </div>
    </div>
  `).join("");
}
function initJournalFilters() {
  document.querySelectorAll("[data-journal-filter]").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("[data-journal-filter]").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      journalFilter = btn.dataset.journalFilter;
      renderJournal();
    });
  });
}

// =========================================================================
// LINKS
// =========================================================================
function addLink() {
  const titleEl = document.getElementById("linkTitle");
  const urlEl = document.getElementById("linkUrl");
  const catEl = document.getElementById("linkCat");
  const title = titleEl.value.trim();
  const url = urlEl.value.trim();
  if (!title || !url) { toast("제목과 URL을 모두 입력하세요"); return; }
  links.push({ id: uid("l"), title, url, cat: catEl.value });
  save(STORAGE.links, links);
  titleEl.value = "";
  urlEl.value = "";
  renderLinks();
  toast("링크 저장됨");
}
function deleteLink(id) {
  links = links.filter(l => l.id !== id);
  save(STORAGE.links, links);
  renderLinks();
}
function renderLinks() {
  const el = document.getElementById("linkGrid");
  if (!el) return;
  const ICONS = { study: "📚", tool: "🔧", repo: "📦", article: "📰", video: "▶" };
  el.innerHTML = links.map(l => `
    <div class="link-item" onclick="window.open('${escapeHtml(l.url)}', '_blank')">
      <div class="link-icon link-icon-${l.cat}">${ICONS[l.cat] || "🔗"}</div>
      <div class="link-info">
        <div class="link-title">${escapeHtml(l.title)}</div>
        <div class="link-url">${escapeHtml(l.url)}</div>
      </div>
      <button class="link-delete" onclick="event.stopPropagation();deleteLink('${l.id}')" title="삭제">✕</button>
    </div>
  `).join("");
}

// =========================================================================
// INIT
// =========================================================================
function init() {
  initParticles();
  initNav();
  showSection("dashboard");

  // Set today's date as default for date inputs
  const today = todayISO();
  const logDate = document.getElementById("logDate");
  const journalDate = document.getElementById("journalDate");
  if (logDate) logDate.value = today;
  if (journalDate) journalDate.value = today;

  renderHeatmap();
  renderSkillBars();
  renderProjectLibrary();
  initLibraryFilters();
  renderProjects();
  renderResources();
  initResourceFilters();
  renderJournal();
  initJournalFilters();
  renderLinks();
  updateHeroStats();
}

document.addEventListener("DOMContentLoaded", init);
