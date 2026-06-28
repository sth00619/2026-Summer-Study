# 2026 Summer Study Hub

A personal learning dashboard and portfolio site built for my 2026 summer intensive study plan.

**Live site:** [sth00619.github.io/2026-Summer-Study](https://sth00619.github.io/2026-Summer-Study)

## What this is

An all-in-one study management platform that tracks my progress across Python, SQL, Machine Learning, and career preparation. Built as a static site deployed via GitHub Actions — no backend required.

## Features

- **Dashboard** — Study heatmap (last 90 days), session logger, skill progress bars with animated fills
- **Resources** — 38 curated resources from courses, repos, Kaggle notebooks, and project ideas, filterable by field
- **Projects** — Kanban board (To do → In progress → Done) to track portfolio builds
- **Learning Journal** — Tagged entries (TIL, Breakthrough, Struggle, Idea, Review) with timestamps
- **Quick Links** — Bookmark manager for study sites, tools, repos, articles, and videos
- **Dynamic UI** — Particle background, hover animations, scroll reveals, animated counters, toast notifications

## Tech stack

- Vanilla HTML/CSS/JS (no frameworks)
- CSS animations and transitions for all interactions
- Canvas API for particle background
- localStorage for persistent state
- GitHub Actions for auto-deploy to GitHub Pages

## File structure

```
.
├── .github/workflows/deploy.yml   # GitHub Actions — auto deploy on push
├── index.html                     # Main page
├── styles.css                     # All styles, animations, responsive
├── data.js                        # Resource data (38 items from 56 images)
├── app.js                         # Application logic, state management
└── README.md
```

## Deploy

Push to `main` → GitHub Actions builds and deploys to Pages automatically.

To set up:
1. Go to repo Settings → Pages → Source: **GitHub Actions**
2. Push any commit to `main`
3. Site is live at `https://sth00619.github.io/2026-Summer-Study`

## Study areas

| Field | Resources | Focus |
|-------|-----------|-------|
| Python | 7 resources | CS50P, 30-Days-Of-Python, DS Handbook |
| SQL | 6 resources | Mosh tutorial, LeetCode, Text-to-SQL project |
| ML / DS | 14 resources | Microsoft ML course, Kaggle projects, RAG pipeline |
| Tools | 6 resources | markitdown, Claude Code, build-your-own-X |
| Career | 5 resources | Interview prep, STAR stories, Azure certs |
