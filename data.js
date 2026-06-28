// ===== RESOURCE DATA — merged from 56 images across 3 chats =====
const RESOURCES = [
  // === SQL ===
  { id: 1, field: "sql", type: "Video", name: "MySQL Tutorial — Programming with Mosh", desc: "3-hour YouTube course, 14M+ views. Best single video to get SQL fundamentals.", link: "https://www.youtube.com/watch?v=7S_tz1z_5bA", src: "Chat 1 · Img 4" },
  { id: 2, field: "sql", type: "Reference", name: "W3Schools MySQL Docs", desc: "Quick syntax reference for SELECT, JOIN, GROUP BY, window functions.", link: "https://www.w3schools.com/mysql/", src: "Chat 1 · Img 3" },
  { id: 3, field: "sql", type: "Practice", name: "OneCompiler — SQL Sandbox", desc: "Run SQL in-browser. No setup. Good for quick practice.", link: "https://onecompiler.com/mysql", src: "Chat 1 · Img 1" },
  { id: 4, field: "sql", type: "Practice", name: "LeetCode SQL — 50 Easy + 50 Medium", desc: "Interview prep target. Window functions, GROUP BY aggregations.", link: "https://leetcode.com/problemset/database/", src: "Chat 3 · Roadmap" },
  { id: 5, field: "sql", type: "Project", name: "Text-to-SQL AI Project", desc: "Build an NLP→SQL query converter. Top-tier AI engineering portfolio piece.", link: "", src: "Chat 1 · Img 18 / Chat 2 · Img 3" },
  { id: 6, field: "sql", type: "Project", name: "Log & HR Data SQL Analysis", desc: "Codeit Sprint style: analyze employee/log data, export insights. Clean GitHub project.", link: "", src: "Chat 3 · Codeit Sprint Step 1, 4" },

  // === PYTHON ===
  { id: 7, field: "python", type: "Course", name: "Microsoft Python — 44-part Series", desc: "Free Microsoft Learn. Beginner-friendly, structured. Great first course.", link: "https://learn.microsoft.com/en-us/shows/intro-to-python-development/", src: "Chat 1 · Img 5" },
  { id: 8, field: "python", type: "Course", name: "CS50P — Harvard Python (edX)", desc: "Functions, OOP, file I/O, testing. Free to audit. Excellent fundamentals.", link: "https://cs50.harvard.edu/python/", src: "Chat 1 · Img 19" },
  { id: 9, field: "python", type: "Repo", name: "30-Days-Of-Python", desc: "Structured 30-day path. Daily lessons + exercises. Build daily study habit.", link: "https://github.com/Asabeneh/30-Days-Of-Python", src: "Chat 3 · Img 1" },
  { id: 10, field: "python", type: "Book", name: "Python Data Science Handbook (Free)", desc: "Jake VanderPlas. Covers NumPy, Pandas, Matplotlib, Scikit-learn.", link: "https://github.com/jakevdp/PythonDataScienceHandbook", src: "Chat 2 · Img 6–7" },
  { id: 11, field: "python", type: "Repo", name: "project-based-learning", desc: "Build real apps: scrapers, games, APIs. Multi-language, Python-heavy.", link: "https://github.com/practical-tutorials/project-based-learning", src: "Chat 3 · Img 2" },
  { id: 12, field: "python", type: "Roadmap", name: "Virgilio Data Science Roadmap", desc: "Open-source DS path: Python, stats, ML, tools in order.", link: "https://virgili0.github.io/Virgilio/", src: "Chat 2 · Img 20" },
  { id: 13, field: "python", type: "Course", name: "mlcourse.ai", desc: "Open ML course with Kaggle competitions. Theory + hands-on Python ML.", link: "https://mlcourse.ai/", src: "Chat 1 · Img 6" },

  // === ML / DS ===
  { id: 14, field: "ml", type: "Curriculum", name: "ML-for-Beginners — Microsoft", desc: "12 weeks, 26 lessons. Scikit-learn, quizzes. Free university-level course.", link: "https://github.com/microsoft/ML-For-Beginners", src: "Chat 3 · Img 4" },
  { id: 15, field: "ml", type: "Repo", name: "500 AI/ML/DL Projects with Code", desc: "500+ ideas: AI, ML, DL, CV, NLP. Use as your project picker.", link: "https://github.com/ashishpatel26/500-AI-Machine-learning-Deep-learning-Computer-vision-NLP-Projects-with-code", src: "Chat 3 · Img 5" },
  { id: 16, field: "ml", type: "Kaggle", name: "Customer Churn Prediction", desc: "EDA → preprocessing → Logistic Regression → ROC-AUC. Great first ML project.", link: "https://www.kaggle.com/", src: "Chat 1 · Img 12 / Chat 2 · Img 14" },
  { id: 17, field: "ml", type: "Kaggle", name: "House Price Prediction", desc: "TensorFlow Decision Forests. 14,281 votes. Classic regression problem.", link: "https://www.kaggle.com/", src: "Chat 2 · Img 13" },
  { id: 18, field: "ml", type: "Project List", name: "Top 25 ML Projects (Beginner→Capstone)", desc: "Tiered list from @she_explores_data. Pick 1 from each tier.", link: "", src: "Chat 2 · Img 15" },
  { id: 19, field: "ml", type: "Project", name: "Spotify Music Analysis", desc: "Audio features by genre/popularity. Pandas + Seaborn + clustering.", link: "", src: "Chat 1 · Img 11" },
  { id: 20, field: "ml", type: "Project", name: "Transaction Fraud Detection", desc: "Imbalanced classification. SMOTE, XGBoost, precision-recall tradeoff.", link: "", src: "Chat 1 · Img 9" },
  { id: 21, field: "ml", type: "Project", name: "Time Series Forecasting", desc: "Stock/weather prediction with LSTM or Prophet. Strong portfolio signal.", link: "", src: "Chat 1 · Img 10" },
  { id: 22, field: "ml", type: "Project", name: "Transit Delay Prediction", desc: "Predict delays using real transit data. Regression + feature engineering.", link: "", src: "Chat 1 · Img 10" },
  { id: 23, field: "ml", type: "Project", name: "News Sentiment + Stock Returns", desc: "NLP sentiment analysis linked to financial data. Cross-domain project.", link: "", src: "Chat 1 · Img 14" },
  { id: 24, field: "ml", type: "Advanced", name: "RAG Pipeline with Hybrid Search", desc: "Vector DB + keyword search + LLM. End-to-end GenAI system.", link: "", src: "Chat 1 · Img 16 / Chat 2 · Img 3" },
  { id: 25, field: "ml", type: "Advanced", name: "Fine-tuning Pipeline with LoRA", desc: "LLM fine-tuning on custom data using LoRA/PEFT. MLE differentiator.", link: "", src: "Chat 1 · Img 17" },
  { id: 26, field: "ml", type: "Advanced", name: "Agent Orchestration System", desc: "Multi-agent AI system with tool use. Cutting-edge AI eng project.", link: "", src: "Chat 1 · Img 18" },
  { id: 27, field: "ml", type: "Roadmap", name: "6-Month DS Roadmap (Microsoft)", desc: "Month 1-6: Python→SQL→ML→DL→Cloud→Interview. Full career plan.", link: "", src: "Chat 2 · Img 19" },

  // === TOOLS ===
  { id: 28, field: "tools", type: "Tool", name: "Microsoft markitdown", desc: "PDF/Word/PPT → Markdown converter. 125k stars. LangChain integration.", link: "https://github.com/microsoft/markitdown", src: "Chat 3 · Img 6" },
  { id: 29, field: "tools", type: "Repo", name: "build-your-own-X (500k+ stars)", desc: "Re-create real tech: databases, Docker, AI models, games.", link: "https://github.com/codecrafters-io/build-your-own-x", src: "Chat 3 · Img 3" },
  { id: 30, field: "tools", type: "Claude", name: "Claude Code — 5 Core Skills", desc: "MCP builder, Playwright, frontend design, code review, refactoring.", link: "", src: "Chat 2 · Img 5, 8" },
  { id: 31, field: "tools", type: "Claude", name: "Playwright MCP — Browser Automation", desc: "Anthropic plugin. 179k+ installs. Automate browser tasks via Claude.", link: "", src: "Chat 2 · Img 9" },
  { id: 32, field: "tools", type: "Claude", name: "tasteskill.dev + impeccable", desc: "Design quality skills for Claude. Improve AI output aesthetics.", link: "https://tasteskill.dev", src: "Chat 2 · Img 16–17" },
  { id: 33, field: "tools", type: "Cert", name: "Claude Certified Architect (Free)", desc: "Free AI certification from Anthropic. Add to LinkedIn/resume.", link: "", src: "Chat 2 · Img 2" },

  // === CAREER ===
  { id: 34, field: "career", type: "Interview", name: "DS Interview Loop — 5 Rounds", desc: "Resume → Phone → Take-home → Coding loop → ML design → Behavioral.", link: "", src: "Chat 3 · Interview map" },
  { id: 35, field: "career", type: "Projects", name: "35 Coding Projects to Get Hired", desc: "DS, ML, AI Eng, Cybersecurity. Top: RAG, Text-to-SQL, LLM eval.", link: "", src: "Chat 2 · Img 3" },
  { id: 36, field: "career", type: "Path", name: "Undergrad → Data Science Pathway", desc: "Portfolio, internships, networking, first job timeline.", link: "", src: "Chat 1 · Img 15" },
  { id: 37, field: "career", type: "Cert", name: "AZ-900 + DP-100 (Azure)", desc: "AZ-900 free (cloud fundamentals). DP-100 for Azure DS Associate.", link: "https://learn.microsoft.com", src: "Chat 3 · Roadmap Month 4" },
  { id: 38, field: "career", type: "Behavioral", name: "10 STAR Stories — MS Leadership", desc: "Growth Mindset, Customer Obsession, D&I. Covers most behavioral rounds.", link: "", src: "Chat 3 · Interview section" },
];

// Default bookmarks
const DEFAULT_LINKS = [
  { id: "l1", title: "LeetCode", url: "https://leetcode.com", cat: "study" },
  { id: "l2", title: "Kaggle", url: "https://www.kaggle.com", cat: "study" },
  { id: "l3", title: "GitHub Profile", url: "https://github.com/sth00619", cat: "repo" },
  { id: "l4", title: "Microsoft Learn", url: "https://learn.microsoft.com", cat: "study" },
  { id: "l5", title: "mlcourse.ai", url: "https://mlcourse.ai", cat: "study" },
];

// Default projects
const DEFAULT_PROJECTS = [
  { id: "p1", name: "Customer Churn Prediction", field: "ml", status: "todo" },
  { id: "p2", name: "SQL Log Analysis", field: "sql", status: "todo" },
  { id: "p3", name: "30-Days-Of-Python", field: "python", status: "todo" },
  { id: "p4", name: "RAG Pipeline", field: "ml", status: "todo" },
];
