// =================================================================
// THE SONG FILES — app logic
// Sections: state · utils · nav · home (profile, featured, evidence,
//   education, experience, contact) · dashboard · library · projects ·
//   modal · resources · journal · links · init
// =================================================================

// ---------- STATE ----------
const STORAGE = {
  sessions:   "sh_sessions",
  projects:   "sh_projects",
  journal:    "sh_journal",
  links:      "sh_links",
  profile:    "sh_profile",
  education:  "sh_education",
  experience: "sh_experience",
};

const load = (k, d) => {
  try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; }
};
const save = (k, v) => localStorage.setItem(k, JSON.stringify(v));

let sessions   = load(STORAGE.sessions, []);
let projects   = load(STORAGE.projects, []);
let journal    = load(STORAGE.journal, []);
let links      = load(STORAGE.links, DEFAULT_LINKS);
let profile    = load(STORAGE.profile, DEFAULT_PROFILE);
let education  = load(STORAGE.education, DEFAULT_EDUCATION);
let experience = load(STORAGE.experience, DEFAULT_EXPERIENCE);

// First-run: seed legacy default projects
if (projects.length === 0) {
  projects = DEFAULT_PROJECTS.map(p => ({
    id: p.id,
    title: p.name,
    category: p.field === "ml" ? "ml" : p.field === "sql" ? "da-bi" : "ml",
    status: p.status,
    featured: false,
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
// Migration: ensure every project has `featured`
projects.forEach(p => { if (p.featured === undefined) p.featured = false; });
save(STORAGE.projects, projects);

// Filter state
let libCatFilter   = "all";
let libDiffFilter  = "all";
let resourceFilter = "all";
let journalFilter  = "all";

// ---------- UTILS ----------
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
function todayISO() { return new Date().toISOString().slice(0, 10); }
function formatDateKR(iso) {
  if (!iso) return "";
  const [y, m, d] = iso.split("-").map(Number);
  return `${y}. ${String(m).padStart(2, "0")}. ${String(d).padStart(2, "0")}`;
}
function formatDateLong(iso) {
  if (!iso) return "";
  const [y, m, d] = iso.split("-").map(Number);
  return `${y}년 ${m}월 ${d}일`;
}
function escapeHtml(s) {
  if (s == null) return "";
  return String(s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
function padNum(n, w = 3) { return String(n).padStart(w, "0"); }

// ---------- NAV ----------
function initNav() {
  const toggle = document.getElementById("navToggle");
  const linksEl = document.getElementById("navLinks");
  if (toggle) toggle.addEventListener("click", () => linksEl.classList.toggle("open"));
  document.querySelectorAll(".nav-link").forEach(a => {
    a.addEventListener("click", e => {
      e.preventDefault();
      navigateTo(a.dataset.section);
      linksEl.classList.remove("open");
    });
  });
}
function navigateTo(id) {
  document.querySelectorAll(".section").forEach(s => {
    if (s.id === id) s.removeAttribute("hidden");
    else s.setAttribute("hidden", "");
  });
  document.querySelectorAll(".nav-link").forEach(a => {
    a.classList.toggle("active", a.dataset.section === id);
  });
  window.scrollTo({ top: 0, behavior: "smooth" });
}
function goHome(e) {
  if (e) e.preventDefault();
  navigateTo("home");
}

// =================================================================
// HOME — render profile, featured cases, evidence, education, contact
// =================================================================
function renderHome() {
  renderProfileHeader();
  renderFeatured();
  renderEvidence();
  renderEducation();
  renderExperience();
  renderContact();
  renderHomeStats();
}

function renderProfileHeader() {
  const today = new Date();
  document.getElementById("fileDate").textContent =
    `Last Updated · ${today.getFullYear()}.${String(today.getMonth()+1).padStart(2,"0")}.${String(today.getDate()).padStart(2,"0")}`;

  document.getElementById("profileName").textContent       = profile.name || "—";
  document.getElementById("profileNameKr").textContent     = profile.korean_name || "";
  document.getElementById("profileTitle").textContent      = profile.title || "";
  document.getElementById("profileTitleKr").textContent    = profile.title_kr || "";
  document.getElementById("profileStatus").textContent     = profile.status_label || "";
  document.getElementById("profileLocation").textContent   = profile.location || "—";
  document.getElementById("profileLanguages").textContent  = (profile.languages || []).join(" · ");

  const dot = document.getElementById("statusDot");
  dot.className = "status-dot" + (profile.status === "exploring" ? " exploring" : profile.status === "closed" ? " closed" : "");

  // Summary
  const summary = document.getElementById("caseSummary");
  summary.innerHTML = `
    ${profile.summary_kr ? `<p class="kr">${escapeHtml(profile.summary_kr)}</p>` : ""}
    ${profile.summary_en ? `<p class="en">${escapeHtml(profile.summary_en)}</p>` : ""}
  `;

  // Focus areas
  const focus = document.getElementById("focusAreas");
  focus.innerHTML = (profile.focus_areas || []).map(a =>
    `<span class="focus-chip">${escapeHtml(a.label)}</span>`
  ).join("");
}

function renderHomeStats() {
  const totalHours = sessions.reduce((s, x) => s + Number(x.hours || 0), 0);
  document.getElementById("qaLibCount").textContent     = padNum(PROJECT_LIBRARY.length, 2);
  document.getElementById("qaProjCount").textContent    = padNum(projects.length, 2);
  document.getElementById("qaHoursCount").textContent   = padNum(Math.round(totalHours), 2);
  document.getElementById("qaJournalCount").textContent = padNum(journal.length, 2);
}

function renderFeatured() {
  const el = document.getElementById("featuredGrid");
  if (!el) return;
  const featured = projects.filter(p => p.featured).slice(0, 4);
  if (featured.length === 0) {
    el.innerHTML = `<div class="empty-featured">
      Featured cases not yet pinned. Active Cases 섹션에서 각 카드의 ★ 별표를 눌러 Home에 노출할 프로젝트를 선택하세요.
    </div>`;
    return;
  }
  el.innerHTML = featured.map((p, i) => {
    const cat = PROJECT_CATEGORIES[p.category] || PROJECT_CATEGORIES.ml;
    const stampClass = p.status === "done" ? "stamp-shipped" : p.status === "progress" ? "stamp-progress" : "stamp-todo";
    const stampText = p.status === "done" ? "Shipped" : p.status === "progress" ? "In progress" : "Pending";
    return `
      <div class="featured-card" onclick="showProjectEdit('${p.id}')">
        <div class="featured-no">★ Featured · ${padNum(i + 1, 2)} / ${cat.label.split(" · ")[0]}</div>
        <h3 class="featured-title">${escapeHtml(p.title)}</h3>
        ${p.shortDesc ? `<p style="font-size:13px;color:var(--text-dim);line-height:1.6;">${escapeHtml(p.shortDesc)}</p>` : ""}
        <div class="featured-meta">
          <span class="featured-stamp ${stampClass}">${stampText}</span>
          ${p.github_url ? `<a href="${escapeHtml(p.github_url)}" target="_blank" rel="noopener" onclick="event.stopPropagation();" style="font-family:var(--f-mono);font-size:10px;letter-spacing:0.1em;">GitHub →</a>` : ""}
        </div>
      </div>
    `;
  }).join("");
}

function renderEvidence() {
  const el = document.getElementById("evidenceGrid");
  if (!el) return;
  const TOPICS = {
    python:  "Python",
    sql:     "SQL",
    ml:      "ML · DS",
    tools:   "Tools",
    career:  "Career",
    project: "Project",
  };
  const totals = {};
  sessions.forEach(s => {
    if (!s.topic || !TOPICS[s.topic]) return;
    totals[s.topic] = (totals[s.topic] || 0) + Number(s.hours || 0);
  });
  el.innerHTML = Object.entries(TOPICS).map(([key, label]) => `
    <div class="evidence-item">
      <div class="evidence-num">${Math.round(totals[key] || 0)}<span style="font-size:0.5em;color:var(--ink-dim);"> h</span></div>
      <div class="evidence-label">${label}</div>
    </div>
  `).join("");
}

function renderEducation() {
  const el = document.getElementById("educationList");
  if (!el) return;
  if (education.length === 0) {
    el.innerHTML = `<div class="empty-state">학력 정보가 없습니다. 아래 버튼으로 추가하세요.</div>`;
    return;
  }
  el.innerHTML = education.map(e => `
    <div class="timeline-row">
      <div class="timeline-date">${escapeHtml(e.start || "")}${e.end ? " — " + escapeHtml(e.end) : (e.start ? " — present" : "")}</div>
      <div class="timeline-content">
        <div class="timeline-title">${escapeHtml(e.institution || "")}</div>
        <div class="timeline-sub">${escapeHtml(e.degree || "")}${e.field ? " · " + escapeHtml(e.field) : ""}</div>
        ${e.note ? `<div class="timeline-note">${escapeHtml(e.note)}</div>` : ""}
      </div>
      <div class="timeline-actions">
        <button class="btn-ghost btn-sm" onclick="editEducation('${e.id}')">edit</button>
        <button class="btn-ghost btn-sm" onclick="deleteEducation('${e.id}')">×</button>
      </div>
    </div>
  `).join("");
}

function renderExperience() {
  const el = document.getElementById("experienceList");
  if (!el) return;
  if (experience.length === 0) {
    el.innerHTML = `<div class="empty-state">경력 정보가 없습니다. 인턴/프로젝트/공모전 경험을 추가하세요.</div>`;
    return;
  }
  el.innerHTML = experience.map(e => `
    <div class="timeline-row">
      <div class="timeline-date">${escapeHtml(e.start || "")}${e.end ? " — " + escapeHtml(e.end) : (e.start ? " — present" : "")}</div>
      <div class="timeline-content">
        <div class="timeline-title">${escapeHtml(e.company || "")}</div>
        <div class="timeline-sub">${escapeHtml(e.role || "")}</div>
        ${e.summary ? `<div class="timeline-note">${escapeHtml(e.summary)}</div>` : ""}
      </div>
      <div class="timeline-actions">
        <button class="btn-ghost btn-sm" onclick="editExperience('${e.id}')">edit</button>
        <button class="btn-ghost btn-sm" onclick="deleteExperience('${e.id}')">×</button>
      </div>
    </div>
  `).join("");
}

function renderContact() {
  const el = document.getElementById("contactGrid");
  if (!el) return;
  const c = profile.contact || {};
  const rows = [
    { label: "Email",    value: c.email,    type: "mail" },
    { label: "GitHub",   value: c.github,   type: "link" },
    { label: "LinkedIn", value: c.linkedin, type: "link" },
    { label: "Blog",     value: c.blog,     type: "link" },
  ];
  el.innerHTML = rows.map(r => `
    <div class="contact-card">
      <div class="contact-label">${r.label}</div>
      ${r.value
        ? (r.type === "mail"
            ? `<a class="contact-value" href="mailto:${escapeHtml(r.value)}">${escapeHtml(r.value)}</a>`
            : `<a class="contact-value" href="${escapeHtml(r.value)}" target="_blank" rel="noopener">${escapeHtml(r.value)}</a>`)
        : `<div class="contact-empty">— 미입력 —</div>`}
    </div>
  `).join("");
}

// ---------- Profile editing ----------
function editProfile() {
  const html = `
    <div class="detail-header">
      <div class="detail-header-meta">
        <span class="detail-no">FILE No. 000</span>
        <span class="detail-cat-label">Edit Subject</span>
      </div>
      <h2 class="detail-title">프로필 편집</h2>
    </div>
    <div class="edit-form">
      <div class="edit-row"><span class="edit-label">Name (EN)</span>
        <input class="input" id="pf_name" value="${escapeHtml(profile.name || "")}" /></div>
      <div class="edit-row"><span class="edit-label">이름 (KR)</span>
        <input class="input" id="pf_kr" value="${escapeHtml(profile.korean_name || "")}" /></div>
      <div class="edit-row"><span class="edit-label">Title (EN)</span>
        <input class="input" id="pf_title" value="${escapeHtml(profile.title || "")}" /></div>
      <div class="edit-row"><span class="edit-label">직무 (KR)</span>
        <input class="input" id="pf_title_kr" value="${escapeHtml(profile.title_kr || "")}" /></div>
      <div class="edit-row"><span class="edit-label">Status</span>
        <select class="input" id="pf_status">
          <option value="open" ${profile.status === "open" ? "selected" : ""}>Open to opportunities</option>
          <option value="exploring" ${profile.status === "exploring" ? "selected" : ""}>Exploring</option>
          <option value="closed" ${profile.status === "closed" ? "selected" : ""}>Not looking</option>
        </select></div>
      <div class="edit-row"><span class="edit-label">Status Label</span>
        <input class="input" id="pf_status_label" value="${escapeHtml(profile.status_label || "")}" /></div>
      <div class="edit-row"><span class="edit-label">Location</span>
        <input class="input" id="pf_location" value="${escapeHtml(profile.location || "")}" /></div>
      <div class="edit-row"><span class="edit-label">Languages</span>
        <input class="input" id="pf_languages" value="${escapeHtml((profile.languages || []).join(", "))}" placeholder="콤마로 구분" /></div>
      <div class="edit-row full"><span class="edit-label">Summary (KR)</span>
        <textarea class="input textarea" id="pf_summary_kr">${escapeHtml(profile.summary_kr || "")}</textarea></div>
      <div class="edit-row full"><span class="edit-label">Summary (EN)</span>
        <textarea class="input textarea" id="pf_summary_en" style="min-height:90px;">${escapeHtml(profile.summary_en || "")}</textarea></div>
      <div class="edit-row"><span class="edit-label">Email</span>
        <input type="email" class="input" id="pf_email" value="${escapeHtml(profile.contact?.email || "")}" /></div>
      <div class="edit-row"><span class="edit-label">GitHub URL</span>
        <input type="url" class="input" id="pf_github" value="${escapeHtml(profile.contact?.github || "")}" /></div>
      <div class="edit-row"><span class="edit-label">LinkedIn URL</span>
        <input type="url" class="input" id="pf_linkedin" value="${escapeHtml(profile.contact?.linkedin || "")}" /></div>
      <div class="edit-row"><span class="edit-label">Blog URL</span>
        <input type="url" class="input" id="pf_blog" value="${escapeHtml(profile.contact?.blog || "")}" /></div>
    </div>
    <div class="detail-actions">
      <button class="btn btn-primary" onclick="saveProfile()">Save</button>
      <button class="btn" onclick="closeModal()">Cancel</button>
    </div>
  `;
  document.getElementById("modalContent").innerHTML = html;
  openModal();
}

function saveProfile() {
  profile = {
    ...profile,
    name: document.getElementById("pf_name").value.trim() || profile.name,
    korean_name: document.getElementById("pf_kr").value.trim(),
    title: document.getElementById("pf_title").value.trim(),
    title_kr: document.getElementById("pf_title_kr").value.trim(),
    status: document.getElementById("pf_status").value,
    status_label: document.getElementById("pf_status_label").value.trim(),
    location: document.getElementById("pf_location").value.trim(),
    languages: document.getElementById("pf_languages").value.split(",").map(s => s.trim()).filter(Boolean),
    summary_kr: document.getElementById("pf_summary_kr").value.trim(),
    summary_en: document.getElementById("pf_summary_en").value.trim(),
    contact: {
      email: document.getElementById("pf_email").value.trim(),
      github: document.getElementById("pf_github").value.trim(),
      linkedin: document.getElementById("pf_linkedin").value.trim(),
      blog: document.getElementById("pf_blog").value.trim(),
    },
  };
  save(STORAGE.profile, profile);
  closeModal();
  renderHome();
  toast("Profile saved");
}

// ---------- Education / Experience ----------
function addEducation() {
  showEducationForm(null);
}
function editEducation(id) {
  showEducationForm(id);
}
function showEducationForm(id) {
  const e = id ? education.find(x => x.id === id) : { id: null, institution: "", degree: "", field: "", start: "", end: "", note: "" };
  if (!e) return;
  const html = `
    <div class="detail-header">
      <div class="detail-header-meta">
        <span class="detail-no">EDU</span>
        <span class="detail-cat-label">${id ? "Edit" : "Add"} education</span>
      </div>
      <h2 class="detail-title">학력 ${id ? "수정" : "추가"}</h2>
    </div>
    <div class="edit-form">
      <div class="edit-row"><span class="edit-label">학교 / 기관</span>
        <input class="input" id="ed_institution" value="${escapeHtml(e.institution)}" placeholder="예: 한양대학교" /></div>
      <div class="edit-row"><span class="edit-label">학위</span>
        <input class="input" id="ed_degree" value="${escapeHtml(e.degree)}" placeholder="예: Bachelor's Degree / 학사" /></div>
      <div class="edit-row"><span class="edit-label">전공</span>
        <input class="input" id="ed_field" value="${escapeHtml(e.field)}" placeholder="예: 산업공학" /></div>
      <div class="edit-row"><span class="edit-label">시작</span>
        <input class="input" id="ed_start" value="${escapeHtml(e.start)}" placeholder="2021.03" /></div>
      <div class="edit-row"><span class="edit-label">종료</span>
        <input class="input" id="ed_end" value="${escapeHtml(e.end)}" placeholder="2025.02 또는 비워두면 'present'" /></div>
      <div class="edit-row full"><span class="edit-label">비고</span>
        <textarea class="input textarea" id="ed_note" style="min-height:80px;">${escapeHtml(e.note)}</textarea></div>
    </div>
    <div class="detail-actions">
      <button class="btn btn-primary" onclick="saveEducation('${id || ""}')">Save</button>
      <button class="btn" onclick="closeModal()">Cancel</button>
    </div>
  `;
  document.getElementById("modalContent").innerHTML = html;
  openModal();
}
function saveEducation(id) {
  const payload = {
    institution: document.getElementById("ed_institution").value.trim(),
    degree: document.getElementById("ed_degree").value.trim(),
    field: document.getElementById("ed_field").value.trim(),
    start: document.getElementById("ed_start").value.trim(),
    end: document.getElementById("ed_end").value.trim(),
    note: document.getElementById("ed_note").value.trim(),
  };
  if (!payload.institution) { toast("학교명을 입력하세요"); return; }
  if (id) {
    const e = education.find(x => x.id === id);
    Object.assign(e, payload);
  } else {
    education.push({ id: uid("ed"), ...payload });
  }
  save(STORAGE.education, education);
  closeModal();
  renderEducation();
  toast(id ? "Education updated" : "Education added");
}
function deleteEducation(id) {
  if (!confirm("이 학력 정보를 삭제하시겠습니까?")) return;
  education = education.filter(e => e.id !== id);
  save(STORAGE.education, education);
  renderEducation();
}

function addExperience() { showExperienceForm(null); }
function editExperience(id) { showExperienceForm(id); }
function showExperienceForm(id) {
  const e = id ? experience.find(x => x.id === id) : { id: null, company: "", role: "", start: "", end: "", summary: "" };
  if (!e) return;
  const html = `
    <div class="detail-header">
      <div class="detail-header-meta">
        <span class="detail-no">EXP</span>
        <span class="detail-cat-label">${id ? "Edit" : "Add"} experience</span>
      </div>
      <h2 class="detail-title">경력 ${id ? "수정" : "추가"}</h2>
    </div>
    <div class="edit-form">
      <div class="edit-row"><span class="edit-label">회사 / 조직</span>
        <input class="input" id="ex_company" value="${escapeHtml(e.company)}" placeholder="예: 카카오모빌리티" /></div>
      <div class="edit-row"><span class="edit-label">직무</span>
        <input class="input" id="ex_role" value="${escapeHtml(e.role)}" placeholder="예: 데이터 분석 인턴" /></div>
      <div class="edit-row"><span class="edit-label">시작</span>
        <input class="input" id="ex_start" value="${escapeHtml(e.start)}" placeholder="2025.06" /></div>
      <div class="edit-row"><span class="edit-label">종료</span>
        <input class="input" id="ex_end" value="${escapeHtml(e.end)}" placeholder="2025.08 또는 비우면 'present'" /></div>
      <div class="edit-row full"><span class="edit-label">요약</span>
        <textarea class="input textarea" id="ex_summary" style="min-height:80px;">${escapeHtml(e.summary)}</textarea></div>
    </div>
    <div class="detail-actions">
      <button class="btn btn-primary" onclick="saveExperience('${id || ""}')">Save</button>
      <button class="btn" onclick="closeModal()">Cancel</button>
    </div>
  `;
  document.getElementById("modalContent").innerHTML = html;
  openModal();
}
function saveExperience(id) {
  const payload = {
    company: document.getElementById("ex_company").value.trim(),
    role: document.getElementById("ex_role").value.trim(),
    start: document.getElementById("ex_start").value.trim(),
    end: document.getElementById("ex_end").value.trim(),
    summary: document.getElementById("ex_summary").value.trim(),
  };
  if (!payload.company) { toast("회사명을 입력하세요"); return; }
  if (id) {
    const e = experience.find(x => x.id === id);
    Object.assign(e, payload);
  } else {
    experience.push({ id: uid("ex"), ...payload });
  }
  save(STORAGE.experience, experience);
  closeModal();
  renderExperience();
  toast(id ? "Experience updated" : "Experience added");
}
function deleteExperience(id) {
  if (!confirm("이 경력 정보를 삭제하시겠습니까?")) return;
  experience = experience.filter(e => e.id !== id);
  save(STORAGE.experience, experience);
  renderExperience();
}

// =================================================================
// DASHBOARD — heatmap, skill bars, session log
// =================================================================
function renderHeatmap() {
  const el = document.getElementById("heatmap");
  if (!el) return;
  const days = 84;
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
    rangeEl.textContent = `${formatDateKR(startIso.toISOString().slice(0,10))} — ${formatDateKR(end.toISOString().slice(0,10))}`;
  }
}

function renderSkillBars() {
  const el = document.getElementById("skillBars");
  if (!el) return;
  const TOPICS = {
    python:  "Python",
    sql:     "SQL",
    ml:      "ML / DS",
    tools:   "Tools",
    career:  "Career",
    project: "Project",
    other:   "Other",
  };
  const totals = {};
  sessions.forEach(s => { if (!s.topic) return; totals[s.topic] = (totals[s.topic] || 0) + Number(s.hours || 0); });
  const maxHours = Math.max(...Object.values(totals), 10);
  el.innerHTML = Object.entries(TOPICS).map(([key, label]) => {
    const h = totals[key] || 0;
    const pct = (h / maxHours) * 100;
    return `
      <div class="skill-row">
        <span class="skill-label">${label}</span>
        <div class="skill-track"><div class="skill-fill" data-w="${pct}" style="width:0%;"></div></div>
        <span class="skill-hours">${h}h</span>
      </div>`;
  }).join("");
  setTimeout(() => {
    el.querySelectorAll(".skill-fill").forEach(bar => bar.style.width = bar.dataset.w + "%");
  }, 80);
}

function logSession() {
  const dateEl = document.getElementById("logDate");
  const topicEl = document.getElementById("logTopic");
  const hoursEl = document.getElementById("logHours");
  const noteEl = document.getElementById("logNote");
  const date = dateEl.value || todayISO();
  const topic = topicEl.value;
  const hours = parseFloat(hoursEl.value);
  if (!topic) { toast("Pick a topic"); return; }
  if (!hours || hours <= 0) { toast("Enter hours"); return; }
  sessions.push({ id: uid("s"), date, topic, hours, note: (noteEl.value || "").trim() });
  save(STORAGE.sessions, sessions);
  topicEl.value = ""; hoursEl.value = ""; noteEl.value = "";
  toast(`Logged · ${formatDateKR(date)} · ${hours}h`);
  renderHeatmap();
  renderSkillBars();
  renderRecentSessions();
  renderEvidence();
  renderHomeStats();
}

function toggleRecentSessions() {
  const el = document.getElementById("recentSessions");
  const btn = document.getElementById("recentToggle");
  if (!el) return;
  if (el.style.display === "none") {
    el.style.display = "block";
    btn.textContent = "[ collapse ]";
    renderRecentSessions();
  } else {
    el.style.display = "none";
    btn.textContent = "[ expand ]";
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
    el.innerHTML = `<p class="empty-state">No sessions logged yet.</p>`;
    return;
  }
  el.innerHTML = list.map(s => `
    <div class="recent-item">
      <span class="recent-date">${formatDateLong(s.date)}</span>
      <span class="recent-topic">${TOPIC_LABELS[s.topic] || s.topic}</span>
      <span class="recent-note">${escapeHtml(s.note || "—")}</span>
      <span class="recent-hours">${s.hours}h</span>
      <button class="btn-ghost btn-sm" onclick="deleteSession('${s.id}')">×</button>
    </div>
  `).join("");
}
function deleteSession(id) {
  if (!confirm("Delete this session?")) return;
  sessions = sessions.filter(s => s.id !== id);
  save(STORAGE.sessions, sessions);
  renderHeatmap();
  renderSkillBars();
  renderRecentSessions();
  renderEvidence();
  renderHomeStats();
  toast("Deleted");
}

// =================================================================
// PROJECT LIBRARY
// =================================================================
function renderProjectLibrary() {
  const el = document.getElementById("libraryGrid");
  if (!el) return;
  const filtered = PROJECT_LIBRARY.filter(p => {
    if (libCatFilter !== "all" && p.category !== libCatFilter) return false;
    if (libDiffFilter !== "all" && p.difficulty !== libDiffFilter) return false;
    return true;
  });
  if (filtered.length === 0) {
    el.innerHTML = `<p class="empty-state" style="grid-column:1/-1;padding:3rem;text-align:center;">No cases match these filters.</p>`;
    return;
  }
  el.innerHTML = filtered.map((p, idx) => {
    const cat = PROJECT_CATEGORIES[p.category];
    const libIndex = PROJECT_LIBRARY.indexOf(p) + 1;
    return `
      <div class="lib-card" onclick="showProjectDetail('${p.id}')">
        <div class="lib-card-no">
          <span>FILE No. ${padNum(libIndex)}</span>
          <span class="lib-card-cat">${escapeHtml(cat.label.split(" · ")[0])}</span>
        </div>
        <h3 class="lib-title">${escapeHtml(p.title)}</h3>
        <p class="lib-desc">${escapeHtml(p.shortDesc)}</p>
        <div class="lib-meta">
          <span class="lib-meta-item">${p.estimatedHours}h</span>
          <span class="lib-meta-item">${p.techStack.length} tools</span>
          <span class="lib-meta-item">${p.steps.length} steps</span>
          <span class="lib-diff diff-${p.difficulty}" style="margin-left:auto;">${p.difficulty}</span>
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

// =================================================================
// PROJECT DETAIL MODAL (from library)
// =================================================================
function showProjectDetail(libId) {
  const p = PROJECT_LIBRARY.find(x => x.id === libId);
  if (!p) return;
  const cat = PROJECT_CATEGORIES[p.category];
  const libIndex = PROJECT_LIBRARY.indexOf(p) + 1;
  const already = projects.some(up => up.sourceLibraryId === libId);

  const html = `
    <div class="detail-header">
      <div class="detail-header-meta">
        <span class="detail-no">FILE No. ${padNum(libIndex)}</span>
        <span class="detail-cat-label">${escapeHtml(cat.label)}</span>
      </div>
      <h2 class="detail-title">${escapeHtml(p.title)}</h2>
      <div class="detail-badges">
        <span class="lib-diff diff-${p.difficulty}">${p.difficulty}</span>
        <span class="lib-diff" style="color:var(--ink-dim);border-color:var(--ink-faint-2);">Est. ${p.estimatedHours}h</span>
      </div>
    </div>

    <div class="detail-section"><h4>Case overview · 개요</h4>
      <p>${escapeHtml(p.longDesc)}</p></div>

    <div class="detail-section highlight"><h4>Why it matters</h4>
      <p>${escapeHtml(p.whyItMatters)}</p></div>

    <div class="detail-section"><h4>Tech stack</h4>
      <div class="tag-list">${p.techStack.map(t => `<span class="tag-item">${escapeHtml(t)}</span>`).join("")}</div></div>

    <div class="detail-section"><h4>Datasets</h4>
      <ul class="resource-list">${p.datasets.map(d => `<li>${escapeHtml(d)}</li>`).join("")}</ul></div>

    <div class="detail-section"><h4>Core skills</h4>
      <div class="tag-list">${p.skills.map(s => `<span class="tag-item">${escapeHtml(s)}</span>`).join("")}</div></div>

    <div class="detail-section"><h4>Implementation · ${p.steps.length} steps</h4>
      <div class="step-list">
        ${p.steps.map(s => `
          <div class="step-item">
            <div class="step-title">${escapeHtml(s.title)}</div>
            <div class="step-desc">${escapeHtml(s.desc)}</div>
          </div>`).join("")}
      </div></div>

    ${p.resources?.length ? `
      <div class="detail-section"><h4>References</h4>
        <ul class="resource-list">
          ${p.resources.map(r => r.url
            ? `<li><a href="${escapeHtml(r.url)}" target="_blank" rel="noopener">${escapeHtml(r.title)}</a></li>`
            : `<li>${escapeHtml(r.title)}</li>`).join("")}
        </ul></div>` : ""}

    <div class="detail-section"><h4>Fits role · 직무</h4>
      <div class="tag-list">${p.forRole.map(r => `<span class="tag-item">${escapeHtml(r)}</span>`).join("")}</div></div>

    ${p.warning ? `<div class="detail-section"><div class="warning-box">${escapeHtml(p.warning)}</div></div>` : ""}

    ${p.sourceFromChats ? `
      <div class="detail-section"><h4>Source</h4>
        <p style="font-family:var(--f-mono);font-size:11px;color:var(--text-mute);letter-spacing:0.05em;">${escapeHtml(p.sourceFromChats)}</p>
      </div>` : ""}

    <div class="detail-actions">
      ${already
        ? `<button class="btn" disabled>Already in active cases</button>`
        : `<button class="btn btn-primary" onclick="addProjectFromLibrary('${p.id}')">Add to my cases</button>`}
      <button class="btn" onclick="closeModal()">Close</button>
    </div>
  `;
  document.getElementById("modalContent").innerHTML = html;
  openModal();
}

// =================================================================
// MODAL helpers
// =================================================================
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
document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });

// =================================================================
// MY PROJECTS — add, render, edit, feature toggle
// =================================================================
function addProjectFromLibrary(libId) {
  const p = PROJECT_LIBRARY.find(x => x.id === libId);
  if (!p) return;
  if (projects.some(up => up.sourceLibraryId === libId)) {
    toast("Already added");
    return;
  }
  projects.push({
    id: uid("p"),
    title: p.title,
    category: p.category,
    status: "todo",
    featured: false,
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
  renderHome();
  toast(`'${p.title}' added`);
  closeModal();
}

function addCustomProject() {
  const nameEl = document.getElementById("projName");
  const fieldEl = document.getElementById("projField");
  const title = nameEl.value.trim();
  if (!title) { toast("Enter a project name"); return; }
  projects.push({
    id: uid("p"),
    title,
    category: fieldEl.value,
    status: "todo",
    featured: false,
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
  renderHomeStats();
  toast("Added");
}

function renderProjects() {
  const cols = { todo: [], progress: [], done: [] };
  projects.forEach(p => { if (cols[p.status]) cols[p.status].push(p); });
  let projectIndex = 0;
  ["todo", "progress", "done"].forEach(status => {
    const target = document.getElementById("board" + status.charAt(0).toUpperCase() + status.slice(1));
    const countEl = document.getElementById("count" + status.charAt(0).toUpperCase() + status.slice(1));
    if (countEl) countEl.textContent = padNum(cols[status].length, 2);
    if (!target) return;
    if (cols[status].length === 0) {
      target.innerHTML = `<p class="empty-state">Empty</p>`;
      return;
    }
    target.innerHTML = cols[status].map(p => {
      projectIndex++;
      const cat = PROJECT_CATEGORIES[p.category] || PROJECT_CATEGORIES.ml;
      const dateInfo = p.status === "done" && p.completed_date
        ? `done ${formatDateKR(p.completed_date)}`
        : p.status === "progress" && p.started_date
        ? `started ${formatDateKR(p.started_date)}`
        : p.target_date
        ? `due ${formatDateKR(p.target_date)}`
        : "—";
      const idx = projects.indexOf(p) + 1;
      const starIcon = p.featured ? "★" : "☆";
      return `
        <div class="board-item" onclick="showProjectEdit('${p.id}')">
          <span class="board-item-featured" onclick="event.stopPropagation();toggleFeatured('${p.id}')" title="${p.featured ? "Unfeature" : "Feature on Home"}">${starIcon}</span>
          <div class="board-item-no">CASE ${padNum(idx)}</div>
          <div class="board-item-title">${escapeHtml(p.title)}</div>
          <div class="board-item-meta">
            <span class="board-item-tag">${escapeHtml(cat.label.split(" · ")[0])}</span>
            <span class="board-item-date">${dateInfo}</span>
          </div>
        </div>`;
    }).join("");
  });
}

function toggleFeatured(projectId) {
  const p = projects.find(x => x.id === projectId);
  if (!p) return;
  if (!p.featured) {
    const cur = projects.filter(x => x.featured).length;
    if (cur >= 4) { toast("Max 4 featured cases"); return; }
  }
  p.featured = !p.featured;
  save(STORAGE.projects, projects);
  renderProjects();
  renderFeatured();
  toast(p.featured ? "Pinned to Home" : "Unpinned");
}

function showProjectEdit(projectId) {
  const p = projects.find(x => x.id === projectId);
  if (!p) return;
  const idx = projects.indexOf(p) + 1;
  const html = `
    <div class="detail-header">
      <div class="detail-header-meta">
        <span class="detail-no">CASE No. ${padNum(idx)}</span>
        <span class="detail-cat-label">${p.featured ? "★ Featured · Edit case" : "Edit case"}</span>
      </div>
      <h2 class="detail-title">${escapeHtml(p.title)}</h2>
      ${p.sourceLibraryId ? `<p style="font-family:var(--f-mono);font-size:11px;color:var(--text-mute);letter-spacing:0.05em;margin-top:6px;">Source: <a href="#" onclick="event.preventDefault();showProjectDetail('${p.sourceLibraryId}')">Library file</a></p>` : ""}
    </div>

    <div class="edit-form">
      <div class="edit-row"><span class="edit-label">Title</span>
        <input class="input" id="edit_title" value="${escapeHtml(p.title)}" /></div>
      <div class="edit-row"><span class="edit-label">Category</span>
        <select class="input" id="edit_category">
          ${Object.entries(PROJECT_CATEGORIES).map(([k, v]) =>
            `<option value="${k}" ${p.category === k ? "selected" : ""}>${escapeHtml(v.label)}</option>`).join("")}
        </select></div>
      <div class="edit-row"><span class="edit-label">Status</span>
        <select class="input" id="edit_status">
          <option value="todo" ${p.status === "todo" ? "selected" : ""}>Pending</option>
          <option value="progress" ${p.status === "progress" ? "selected" : ""}>In progress</option>
          <option value="done" ${p.status === "done" ? "selected" : ""}>Shipped</option>
        </select></div>
      <div class="edit-row"><span class="edit-label">Started</span>
        <input type="date" class="input" id="edit_started" value="${p.started_date || ""}" /></div>
      <div class="edit-row"><span class="edit-label">Target</span>
        <input type="date" class="input" id="edit_target" value="${p.target_date || ""}" /></div>
      <div class="edit-row"><span class="edit-label">Completed</span>
        <input type="date" class="input" id="edit_completed" value="${p.completed_date || ""}" /></div>
      <div class="edit-row"><span class="edit-label">GitHub URL</span>
        <input type="url" class="input" id="edit_github" placeholder="https://github.com/..." value="${escapeHtml(p.github_url || "")}" /></div>
      <div class="edit-row"><span class="edit-label">Demo URL</span>
        <input type="url" class="input" id="edit_demo" placeholder="배포 URL 또는 노트북 링크" value="${escapeHtml(p.demo_url || "")}" /></div>
      <div class="edit-row"><span class="edit-label">Featured?</span>
        <label style="display:flex;gap:8px;align-items:center;font-family:var(--f-mono);font-size:11px;letter-spacing:0.1em;color:var(--text-dim);">
          <input type="checkbox" id="edit_featured" ${p.featured ? "checked" : ""} style="width:16px;height:16px;cursor:pointer;" />
          Pin this case to Home (max 4)
        </label></div>
      <div class="edit-row full"><span class="edit-label">Notes</span>
        <textarea class="input textarea" id="edit_notes">${escapeHtml(p.notes || "")}</textarea></div>

      ${p.techStack?.length ? `
        <div class="detail-section" style="margin:0;">
          <h4>Tech stack (from library)</h4>
          <div class="tag-list">${p.techStack.map(t => `<span class="tag-item">${escapeHtml(t)}</span>`).join("")}</div>
        </div>` : ""}
    </div>

    <div class="detail-actions">
      <button class="btn btn-primary" onclick="saveProjectEdit('${p.id}')">Save</button>
      <button class="btn" onclick="closeModal()">Cancel</button>
      <button class="btn btn-red" onclick="deleteProject('${p.id}')" style="margin-left:auto;">Delete</button>
    </div>
  `;
  document.getElementById("modalContent").innerHTML = html;
  openModal();
}

function saveProjectEdit(projectId) {
  const p = projects.find(x => x.id === projectId);
  if (!p) return;
  const newStatus = document.getElementById("edit_status").value;
  let finalCompleted = document.getElementById("edit_completed").value || null;
  if (newStatus === "done" && !finalCompleted && p.status !== "done") finalCompleted = todayISO();
  let finalStarted = document.getElementById("edit_started").value || null;
  if (newStatus === "progress" && !finalStarted && p.status === "todo") finalStarted = todayISO();
  const newFeatured = document.getElementById("edit_featured").checked;
  // Enforce featured cap
  if (newFeatured && !p.featured) {
    const cur = projects.filter(x => x.featured).length;
    if (cur >= 4) { toast("Max 4 featured cases"); return; }
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
    featured: newFeatured,
  });
  save(STORAGE.projects, projects);
  renderProjects();
  renderFeatured();
  closeModal();
  toast("Saved");
}

function deleteProject(projectId) {
  if (!confirm("Delete this case? This cannot be undone.")) return;
  projects = projects.filter(x => x.id !== projectId);
  save(STORAGE.projects, projects);
  renderProjects();
  renderFeatured();
  renderHomeStats();
  closeModal();
  toast("Deleted");
}

// =================================================================
// RESOURCES
// =================================================================
function renderResources() {
  const el = document.getElementById("resourceGrid");
  if (!el) return;
  const filtered = resourceFilter === "all" ? RESOURCES : RESOURCES.filter(r => r.field === resourceFilter);
  el.innerHTML = filtered.map(r => `
    <div class="resource-card">
      <span class="resource-tag tag-${r.field}">${escapeHtml(r.type)}</span>
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

// =================================================================
// JOURNAL
// =================================================================
function addJournalEntry() {
  const dateEl = document.getElementById("journalDate");
  const titleEl = document.getElementById("journalTitle");
  const bodyEl = document.getElementById("journalBody");
  const tagEl = document.getElementById("journalTag");
  const linkEl = document.getElementById("journalLinkProject");
  const title = titleEl.value.trim();
  const body = bodyEl.value.trim();
  if (!title) { toast("Title required"); return; }
  if (!body) { toast("Body required"); return; }
  journal.push({
    id: uid("j"),
    date: dateEl.value || todayISO(),
    title, body,
    tag: tagEl.value,
    linkProject: (linkEl.value || "").trim(),
  });
  save(STORAGE.journal, journal);
  titleEl.value = ""; bodyEl.value = ""; linkEl.value = "";
  renderJournal();
  renderHomeStats();
  toast("Entry saved");
}
function deleteJournal(id) {
  if (!confirm("Delete this entry?")) return;
  journal = journal.filter(j => j.id !== id);
  save(STORAGE.journal, journal);
  renderJournal();
  renderHomeStats();
}
function renderJournal() {
  const el = document.getElementById("journalEntries");
  if (!el) return;
  const TAGS = { til: "TIL", breakthrough: "Breakthrough", struggle: "Struggle", idea: "Idea", review: "Review" };
  const filtered = journalFilter === "all" ? journal : journal.filter(j => j.tag === journalFilter);
  const sorted = [...filtered].sort((a, b) => b.date.localeCompare(a.date) || b.id.localeCompare(a.id));
  if (sorted.length === 0) {
    el.innerHTML = `<p class="empty-state" style="text-align:center;padding:3rem;">No entries.</p>`;
    return;
  }
  el.innerHTML = sorted.map(j => `
    <div class="journal-entry">
      <div class="journal-entry-header">
        <h4 class="journal-entry-title">${escapeHtml(j.title)}</h4>
        <span class="journal-entry-date">${formatDateLong(j.date)}</span>
      </div>
      <div class="journal-entry-body">${escapeHtml(j.body)}</div>
      <div class="journal-meta-row">
        <span class="journal-tag tag-${j.tag}">${TAGS[j.tag] || j.tag}</span>
        ${j.linkProject ? `<span class="journal-project-link">→ ${escapeHtml(j.linkProject)}</span>` : ""}
        <button class="btn-ghost btn-sm" style="margin-left:auto;" onclick="deleteJournal('${j.id}')">delete</button>
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

// =================================================================
// LINKS
// =================================================================
function addLink() {
  const titleEl = document.getElementById("linkTitle");
  const urlEl = document.getElementById("linkUrl");
  const catEl = document.getElementById("linkCat");
  const title = titleEl.value.trim();
  const url = urlEl.value.trim();
  if (!title || !url) { toast("Title and URL required"); return; }
  links.push({ id: uid("l"), title, url, cat: catEl.value });
  save(STORAGE.links, links);
  titleEl.value = ""; urlEl.value = "";
  renderLinks();
  toast("Saved");
}
function deleteLink(id) {
  links = links.filter(l => l.id !== id);
  save(STORAGE.links, links);
  renderLinks();
}
function renderLinks() {
  const el = document.getElementById("linkGrid");
  if (!el) return;
  const ICONS = { study: "S", tool: "T", repo: "R", article: "A", video: "V" };
  el.innerHTML = links.map(l => `
    <div class="link-item" onclick="window.open('${escapeHtml(l.url)}', '_blank')">
      <div class="link-icon">${ICONS[l.cat] || "?"}</div>
      <div class="link-info">
        <div class="link-title">${escapeHtml(l.title)}</div>
        <div class="link-url">${escapeHtml(l.url)}</div>
      </div>
      <button class="link-delete" onclick="event.stopPropagation();deleteLink('${l.id}')" title="delete">×</button>
    </div>
  `).join("");
}

// =================================================================
// INIT
// =================================================================
function init() {
  initNav();
  navigateTo("home");
  const today = todayISO();
  const logDate = document.getElementById("logDate");
  const journalDate = document.getElementById("journalDate");
  if (logDate) logDate.value = today;
  if (journalDate) journalDate.value = today;

  renderHome();
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
}

document.addEventListener("DOMContentLoaded", init);
