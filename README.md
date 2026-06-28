# 2026 Summer Study Hub

Personal learning dashboard + project portfolio for the 2026 summer intensive study (Python · SQL · ML · DA · AI Engineering).

**Live**: https://sth00619.github.io/2026-Summer-Study

## Features

### Dashboard
- **학습 히트맵** — 최근 12주 일별 학습 시간 시각화
- **세션 로깅** — 날짜 선택 + 토픽 + 시간 + 메모 기록
- **스킬별 누적 시간 바** — 7개 영역(Python, SQL, ML, Tools, Career, Project, Other)
- **최근 학습 기록** — 토글로 펼침/접힘, 개별 삭제 가능
- **Hero 카운터** — Project Library / 누적 시간 / 일지 / Streak

### Project Library (NEW)
**37개의 검증된 프로젝트**가 8개 카테고리로 정리되어 있습니다:
- 💹 **금융 (Finance / Stocks)** — 6개
- 🚇 **교통 (Transportation)** — 5개
- 🗺️ **관광 (Tourism)** — 4개
- 📊 **DA · BI · Dashboard** — 5개
- 📈 **Growth Marketing** — 4개
- 🤖 **ML · Data Science** — 5개
- 🧠 **AI Engineering** — 5개
- 🛠️ **MCP · Tools** — 3개

카드를 클릭하면 슬라이드 모달이 열려서:
- 프로젝트 상세 설명
- "왜 이 프로젝트가 중요한가" (포트폴리오 관점)
- 기술 스택 · 데이터셋 · 핵심 스킬
- **단계별 구현 가이드** (각 프로젝트당 5-7단계)
- 참고 자료 링크
- 적합한 직무 (Data Scientist, AI Engineer 등)
- 출처 (어느 채팅/이미지에서 도출됐는지)
- "내 프로젝트로 추가" 버튼으로 Kanban에 한번에 등록

### My Projects (Kanban)
- 3컬럼 Kanban: **To do / In progress / Done**
- 각 카드 클릭 → 편집 모달 (제목, 카테고리, 상태, 시작일/목표일/완료일, GitHub URL, Demo URL, 메모)
- Library에서 추가 시 기술 스택·난이도·설명이 자동 복사
- 상태 변경 시 시작일/완료일 자동 입력
- 커스텀 프로젝트 직접 추가 가능
- 삭제는 confirm 후 가능

### Resources
- 56개 이미지에서 추출한 **38개 학습 리소스**
- 5개 필터: SQL / Python / ML / Tools / Career
- 출처 추적 (예: "Chat 1 · Img 11")

### Learning Journal
- 날짜 + 제목 + 본문 + 태그(TIL/Breakthrough/Struggle/Idea/Review)
- 연결 프로젝트 메모 가능
- 태그별 필터링
- 모든 날짜는 "2026년 6월 28일" 형태로 표시

### Quick Links
- 5개 카테고리 (학습/도구/레포/아티클/영상)
- 클릭 → 새 탭, 호버 시 삭제 가능

## Stack
- 순수 HTML / CSS / JS (빌드 없음)
- localStorage로 모든 상태 유지
- GitHub Pages 배포 (GitHub Actions)
- 외부 의존성 0 (Google Fonts만 사용)

## 파일 구조
```
.
├── index.html            # 메인 페이지 (6개 섹션 + 모달)
├── styles.css            # 다크 테마 + 모달/라이브러리 카드 스타일
├── app.js                # 전체 앱 로직 (세션/프로젝트/일지/링크)
├── data.js               # 학습 리소스 38개 + 기본 링크
├── projects-library.js   # Project Library 37개 (가장 큰 콘텐츠 파일)
├── .github/workflows/
│   └── deploy.yml        # GitHub Pages 자동 배포
└── README.md
```

## 데이터 출처
모든 프로젝트는 다음 출처에서 교차 검증:
- **Chat 1 (20 images)** — @chrisoh.zip 5개 ML 프로젝트, AI 엔지니어링 15개 아이디어
- **Chat 2 (20 images)** — Top 25 ML Projects, 35 Coding Projects, Microsoft 6-month roadmap
- **Chat 3 (16 images)** — 5개 GitHub 학습 레포, Codeit Sprint 프로젝트, markitdown
- **추가 큐레이션** — 사용자 관심사(금융·주식·교통·관광)와 한국 채용 시장 트렌드 반영

## 사용법
1. 학습 시간 기록 → Dashboard에서 날짜·토픽·시간 입력
2. 진행할 프로젝트 선택 → Project Library에서 카드 클릭 → 상세 확인 → "내 프로젝트로 추가"
3. My Projects에서 카드 클릭 → 진행 상태 업데이트, GitHub URL 추가
4. 학습 내용 정리 → Journal에 일지 작성

## 다음 작업
가시성·CSS·동적 화면 구성·색감 등 시각 디자인은 다음 단계에서 보강 예정.

---
Built for learning · 2026
