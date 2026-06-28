// ===== PROJECT LIBRARY — 37 detailed projects =====
// Categories: finance, transport, tourism, da-bi, growth, ml, ai-eng, mcp-tools
// Cross-verified from 56 images across 3 chats + curated additions for Korean DA/DS/Growth roles

const PROJECT_CATEGORIES = {
  finance: { label: "금융 · Finance / Stocks", color: "#0984e3", icon: "💹" },
  transport: { label: "교통 · Transportation", color: "#00b894", icon: "🚇" },
  tourism: { label: "관광 · Tourism", color: "#fd79a8", icon: "🗺️" },
  "da-bi": { label: "DA · BI · Dashboard", color: "#fdcb6e", icon: "📊" },
  growth: { label: "Growth Marketing", color: "#e17055", icon: "📈" },
  ml: { label: "ML · Data Science", color: "#6c5ce7", icon: "🤖" },
  "ai-eng": { label: "AI Engineering", color: "#a29bfe", icon: "🧠" },
  "mcp-tools": { label: "MCP · Tools", color: "#74b9ff", icon: "🛠️" },
};

const PROJECT_LIBRARY = [
  // ============================================================
  // FINANCE · STOCKS (6)
  // ============================================================
  {
    id: "fin_001",
    title: "Korean Stock Market LSTM Prediction",
    category: "finance",
    difficulty: "Intermediate",
    estimatedHours: 40,
    shortDesc: "KOSPI/KOSDAQ 종목 가격을 LSTM과 기술지표로 예측하는 시계열 딥러닝 프로젝트",
    longDesc: "Samsung Electronics, SK Hynix 등 KOSPI 200 주요 종목의 일봉 데이터에 RSI, MACD, Bollinger Bands 같은 기술 지표를 결합해 LSTM 모델로 다음날 주가를 예측합니다. 시계열 데이터 처리, walk-forward validation, financial domain knowledge를 종합적으로 보여줄 수 있어 국내 증권사·핀테크 데이터 직군에 강력한 어필 포인트가 됩니다.",
    whyItMatters: "한국 금융권 채용 시 실제 KRX 데이터를 다뤘다는 것 자체가 큰 차별점이 됩니다. 단순 Kaggle 데이터셋 프로젝트와 차원이 다르게 평가받습니다.",
    techStack: ["Python", "TensorFlow", "pandas", "FinanceDataReader", "TA-Lib", "Streamlit"],
    datasets: ["FinanceDataReader (한국 주식 무료)", "Yahoo Finance (yfinance)", "한국거래소 KRX 정보데이터시스템"],
    skills: ["시계열 분석", "LSTM/GRU", "Feature Engineering", "기술적 지표", "Walk-forward validation"],
    steps: [
      { title: "데이터 수집", desc: "FinanceDataReader로 KOSPI 200 종목 5년치 일봉 데이터 수집" },
      { title: "Feature engineering", desc: "TA-Lib으로 RSI, MACD, MA20/50, Bollinger Bands 지표 생성" },
      { title: "시퀀스 데이터 생성", desc: "60일 lookback window → 다음날 종가 예측 구조" },
      { title: "모델 설계", desc: "2-3층 stacked LSTM (64-128 units) + Dropout 0.2" },
      { title: "Walk-forward 검증", desc: "시계열에서는 random split 절대 금지. 시간 순서로 train/val/test 분리" },
      { title: "평가", desc: "RMSE, MAE, Directional Accuracy (등락 방향 정확도)" },
      { title: "Streamlit 대시보드", desc: "종목 선택 → 예측 차트 + 신뢰구간 시각화" }
    ],
    resources: [
      { title: "FinanceDataReader", url: "https://github.com/FinanceData/FinanceDataReader" },
      { title: "Kaggle Stock LSTM Tutorial", url: "https://www.kaggle.com/code/faressayah/stock-market-analysis-prediction-using-lstm" }
    ],
    forRole: ["Data Scientist", "ML Engineer", "퀀트 분석가", "핀테크 엔지니어"],
    warning: "실제 트레이딩에는 거래비용·슬리피지·체제변화 등 훨씬 많은 요인이 필요합니다. 학습용 프로젝트로 명시하세요.",
    sourceFromChats: "Chat 1 · Img 14 (News Sentiment + Stock Returns 확장)"
  },
  {
    id: "fin_002",
    title: "Modern Portfolio Theory 포트폴리오 최적화",
    category: "finance",
    difficulty: "Intermediate",
    estimatedHours: 25,
    shortDesc: "Markowitz 효율적 투자선과 Sharpe Ratio 최대화로 최적 포트폴리오 구성",
    longDesc: "Harry Markowitz의 노벨상 수상 이론을 직접 구현합니다. 여러 종목의 수익률 공분산 행렬을 계산하고, 효율적 투자선(Efficient Frontier) 위에서 Sharpe Ratio를 최대화하는 자산 배분을 찾습니다. 자산운용·리스크 관리 직군 면접에서 자주 묻는 주제.",
    whyItMatters: "포트폴리오 이론은 금융 데이터 직군의 기본기. 직접 구현해본 경험이 있으면 면접에서 큰 무기가 됩니다.",
    techStack: ["Python", "numpy", "scipy.optimize", "pandas", "matplotlib", "PyPortfolioOpt"],
    datasets: ["FinanceDataReader (KOSPI 200)", "Yahoo Finance (S&P 500)"],
    skills: ["포트폴리오 이론", "최적화 (Optimization)", "리스크 분석", "Monte Carlo 시뮬레이션"],
    steps: [
      { title: "종목 선정 & 수익률 계산", desc: "10-20개 종목 일별 수익률 계산" },
      { title: "공분산 행렬", desc: "수익률 간 공분산/상관관계 매트릭스 구성" },
      { title: "Monte Carlo 시뮬레이션", desc: "10,000개 random portfolio 생성해 risk-return plot" },
      { title: "Efficient Frontier 도출", desc: "scipy.optimize로 동일 수익률 대비 최소 분산 포트폴리오 계산" },
      { title: "Sharpe Ratio 최적화", desc: "무위험 수익률(국고채 3년) 기준 Sharpe 최대화 가중치 도출" },
      { title: "Backtest", desc: "최적 포트폴리오의 과거 5년 성과 vs KOSPI 비교" }
    ],
    resources: [
      { title: "PyPortfolioOpt 문서", url: "https://pyportfolioopt.readthedocs.io/" }
    ],
    forRole: ["Quant Analyst", "Asset Management", "Financial Data Scientist"],
    sourceFromChats: "추가 (금융 직무 필수 주제)"
  },
  {
    id: "fin_003",
    title: "News Sentiment → 주식 수익률 상관관계",
    category: "finance",
    difficulty: "Advanced",
    estimatedHours: 50,
    shortDesc: "뉴스 헤드라인 감성 분석과 다음날 주가 수익률의 상관관계 분석",
    longDesc: "네이버 뉴스/매일경제/한국경제 등에서 종목별 뉴스를 크롤링하고, KoBERT나 KLUE-RoBERTa로 감성 점수를 매긴 뒤 다음날 주가 수익률과의 상관관계를 분석합니다. NLP + 금융 + 시계열 분석이 모두 들어가는 종합 프로젝트.",
    whyItMatters: "Cross-domain 프로젝트는 면접관 인상에 가장 오래 남습니다. NLP와 금융을 동시에 다룰 수 있다는 시그널.",
    techStack: ["Python", "BeautifulSoup/Scrapy", "KoBERT", "transformers", "pandas", "scipy.stats"],
    datasets: ["네이버 금융 뉴스", "Naver Open API", "FinanceDataReader (주가)"],
    skills: ["웹 크롤링", "한국어 NLP", "Sentiment Analysis", "통계적 검정", "시계열 정합"],
    steps: [
      { title: "뉴스 수집", desc: "10개 종목 1년치 뉴스 크롤링 (robots.txt 준수)" },
      { title: "한국어 감성 분석", desc: "KLUE-RoBERTa pretrained 모델로 긍정/부정/중립 분류" },
      { title: "일별 감성 점수 집계", desc: "종목 × 날짜별 평균 감성 점수 계산" },
      { title: "주가 데이터 정합", desc: "다음날 수익률과 join (lag 1일)" },
      { title: "상관관계 분석", desc: "Pearson/Spearman 상관계수 + t-test" },
      { title: "이벤트 스터디", desc: "감성 급변일 전후 5일 abnormal return 분석" }
    ],
    resources: [
      { title: "KLUE Korean NLP", url: "https://github.com/KLUE-benchmark/KLUE" }
    ],
    forRole: ["Data Scientist", "AI Engineer", "Financial NLP Researcher"],
    sourceFromChats: "Chat 1 · Img 14 (직접 언급된 프로젝트)"
  },
  {
    id: "fin_004",
    title: "신용 점수 모델 (Credit Scoring)",
    category: "finance",
    difficulty: "Intermediate",
    estimatedHours: 30,
    shortDesc: "대출 신청자의 채무불이행 가능성을 예측하는 ML 신용평가 모델",
    longDesc: "Kaggle Home Credit Default Risk 또는 LendingClub 데이터셋을 사용해 XGBoost/LightGBM으로 신용 등급을 예측합니다. SHAP를 활용한 모델 해석성(Explainability)이 핵심 — 금융 규제상 \"왜 거절했는지\" 설명할 수 있어야 합니다.",
    whyItMatters: "은행·핀테크에서 가장 흔한 ML use case. 모델 성능뿐만 아니라 해석 가능성을 강조하는 게 차별점.",
    techStack: ["Python", "XGBoost", "LightGBM", "SHAP", "scikit-learn", "imbalanced-learn"],
    datasets: ["Kaggle Home Credit Default Risk", "LendingClub Loan Data"],
    skills: ["분류 모델", "Imbalanced data 처리", "SHAP 해석성", "Feature engineering", "Threshold tuning"],
    steps: [
      { title: "EDA & 결측치 처리", desc: "고객 인구통계/소득/대출 이력 변수 분석" },
      { title: "Class imbalance 대응", desc: "SMOTE 또는 class_weight 적용" },
      { title: "Gradient Boosting 모델", desc: "XGBoost + LightGBM 앙상블" },
      { title: "임계값 최적화", desc: "Precision/Recall trade-off, KS statistic 활용" },
      { title: "SHAP 해석", desc: "글로벌·로컬 feature importance, force plot" },
      { title: "리포트 작성", desc: "Confusion matrix, ROC-AUC, Gini coefficient 정리" }
    ],
    resources: [
      { title: "Kaggle Home Credit", url: "https://www.kaggle.com/c/home-credit-default-risk" }
    ],
    forRole: ["Risk Analyst", "Fintech Data Scientist", "Credit Modeler"],
    sourceFromChats: "추가 (금융 직무 핵심 use case)"
  },
  {
    id: "fin_005",
    title: "암호화폐 트레이딩 봇 + 감성 분석",
    category: "finance",
    difficulty: "Advanced",
    estimatedHours: 60,
    shortDesc: "Upbit/Binance API로 가격 데이터 수집, Twitter/Reddit 감성과 결합한 트레이딩 시그널 생성",
    longDesc: "실시간 암호화폐 가격과 소셜미디어 감성 데이터를 결합해 매매 시그널을 생성하는 봇을 구축합니다. Paper trading(가상 매매)으로 백테스트하고 Streamlit 대시보드로 시각화합니다.",
    whyItMatters: "실시간 데이터 파이프라인 + API 연동 + ML + 시각화의 풀스택 데이터 프로젝트. 핀테크/암호화폐 거래소 채용에 강력.",
    techStack: ["Python", "ccxt", "Upbit API", "PRAW (Reddit)", "BERT", "FastAPI", "Streamlit"],
    datasets: ["Upbit/Binance API (실시간)", "Reddit r/cryptocurrency", "CoinGecko API"],
    skills: ["실시간 데이터 처리", "API 연동", "Sentiment + Price 결합", "Backtesting", "Risk management"],
    steps: [
      { title: "Exchange API 연동", desc: "ccxt 라이브러리로 거래소 통합 인터페이스 구성" },
      { title: "실시간 가격 수집", desc: "WebSocket으로 1분봉 캔들 수집, SQLite 저장" },
      { title: "소셜 감성 수집", desc: "Reddit/Twitter API로 코인 언급 감성 분석" },
      { title: "시그널 생성", desc: "기술지표 + 감성 점수 조합 룰 정의" },
      { title: "Paper trading", desc: "실거래 없이 시뮬레이션 매매 로직 테스트" },
      { title: "Backtest", desc: "과거 1년 데이터로 수익률/MDD/Sharpe 분석" },
      { title: "대시보드", desc: "Streamlit으로 실시간 포지션·수익률 시각화" }
    ],
    resources: [
      { title: "ccxt library", url: "https://github.com/ccxt/ccxt" }
    ],
    forRole: ["Crypto Trader", "Fintech Engineer", "Quant Developer"],
    warning: "절대 실제 자금으로 운용하지 마세요. 학습 목적임을 README에 명시하세요.",
    sourceFromChats: "추가 (현대 금융 직무 트렌드)"
  },
  {
    id: "fin_006",
    title: "Algorithmic Trading Strategy Backtester",
    category: "finance",
    difficulty: "Intermediate",
    estimatedHours: 35,
    shortDesc: "Mean reversion, Momentum 등 주요 트레이딩 전략을 백테스트하는 프레임워크 구축",
    longDesc: "주요 알고리즘 트레이딩 전략(이동평균 교차, 평균회귀, 모멘텀, 페어 트레이딩)을 모듈화해 백테스트할 수 있는 프레임워크를 만듭니다. Sharpe Ratio, Max Drawdown, Win Rate 등 표준 지표로 평가.",
    whyItMatters: "프레임워크형 프로젝트는 OOP 설계 능력을 보여줍니다. 단순 노트북 분석과 차원이 다른 시그널.",
    techStack: ["Python", "backtrader 또는 vectorbt", "pandas", "matplotlib", "FinanceDataReader"],
    datasets: ["FinanceDataReader (한국 주식)", "Yahoo Finance"],
    skills: ["OOP 설계", "Backtest framework", "Performance metrics", "Strategy comparison"],
    steps: [
      { title: "Base Strategy 클래스 설계", desc: "abstract method로 buy/sell signal 추상화" },
      { title: "4가지 전략 구현", desc: "MA Cross, Mean Reversion, Momentum, Pairs Trading" },
      { title: "Backtest 엔진", desc: "거래비용/슬리피지 포함된 시뮬레이션 로직" },
      { title: "성과 지표", desc: "Total Return, Sharpe, Sortino, Calmar, MDD, Win Rate" },
      { title: "비교 리포트", desc: "전략별 성과 비교 시각화 + Jupyter Notebook 리포트" }
    ],
    resources: [
      { title: "backtrader docs", url: "https://www.backtrader.com/" },
      { title: "vectorbt", url: "https://github.com/polakowo/vectorbt" }
    ],
    forRole: ["Quant Developer", "Algo Trader", "Financial Engineer"],
    sourceFromChats: "추가 (금융 엔지니어링)"
  },

  // ============================================================
  // TRANSPORTATION (5)
  // ============================================================
  {
    id: "tr_001",
    title: "서울 지하철 지연 예측",
    category: "transport",
    difficulty: "Intermediate",
    estimatedHours: 35,
    shortDesc: "서울 열린데이터광장 지하철 운행 데이터로 노선별 지연 패턴 예측",
    longDesc: "서울 지하철 1-9호선의 시간대별·요일별 지연 패턴을 분석하고 ML로 지연 발생 가능성을 예측합니다. 날씨 데이터(기상청 API)와 결합하면 더 풍부한 분석이 가능합니다. 서울시·SR·코레일 등 공공 데이터 직군 지원 시 강력한 어필.",
    whyItMatters: "한국 공공/교통 데이터를 활용한 프로젝트는 한국 채용에서 매우 강력합니다. 단순 Kaggle보다 임팩트가 큽니다.",
    techStack: ["Python", "pandas", "scikit-learn", "XGBoost", "기상청 API", "Folium (지도)"],
    datasets: ["서울 열린데이터광장 - 지하철 운행 정보", "기상청 단기예보 API", "공공데이터포털"],
    skills: ["공공데이터 활용", "Geospatial 분석", "분류·회귀 모델", "API 통합"],
    steps: [
      { title: "데이터 수집", desc: "서울 열린데이터광장에서 지하철 운행 데이터 다운로드" },
      { title: "EDA", desc: "노선별·역별·시간대별 지연 분포 분석" },
      { title: "날씨 데이터 통합", desc: "기상청 API로 강수·기온·미세먼지 데이터 join" },
      { title: "Feature engineering", desc: "요일, 시간대, 휴일, 출퇴근 시간 변수 생성" },
      { title: "분류 모델", desc: "지연 발생 여부 예측 (XGBoost binary classification)" },
      { title: "지도 시각화", desc: "Folium으로 노선별 지연 hotspot 지도 표현" }
    ],
    resources: [
      { title: "서울 열린데이터광장", url: "https://data.seoul.go.kr/" },
      { title: "기상청 API 허브", url: "https://apihub.kma.go.kr/" }
    ],
    forRole: ["Data Analyst", "Public Sector DS", "Transportation Analytics"],
    sourceFromChats: "Chat 1 · Img 13 (Transit Delay Prediction 한국화)"
  },
  {
    id: "tr_002",
    title: "서울 따릉이 수요 예측 & 재배치 최적화",
    category: "transport",
    difficulty: "Intermediate",
    estimatedHours: 40,
    shortDesc: "따릉이 대여소별 수요를 예측하고 자전거 재배치 최적 경로 제안",
    longDesc: "서울시 따릉이(공공자전거) 대여 데이터로 대여소별·시간대별 수요를 예측하고, 수요 불균형 문제를 해결하기 위한 재배치 전략을 수립합니다. 시간 + 공간 데이터를 다루는 종합 프로젝트.",
    whyItMatters: "공공 서비스 운영 최적화는 데이터 분석가의 핵심 use case. 비즈니스 임팩트를 명확히 보여줄 수 있습니다.",
    techStack: ["Python", "pandas", "scikit-learn", "Prophet", "Folium", "OR-Tools (최적화)"],
    datasets: ["서울 열린데이터광장 - 따릉이 대여이력", "기상청 API"],
    skills: ["시계열 예측", "Geospatial 분석", "최적화", "비즈니스 인사이트"],
    steps: [
      { title: "대여 이력 수집", desc: "1년치 따릉이 대여 데이터 (수억 건) 처리" },
      { title: "대여소 클러스터링", desc: "위치 기반 K-means로 권역 분류" },
      { title: "수요 예측", desc: "Prophet으로 대여소별 1시간 후 수요 예측" },
      { title: "공급-수요 갭 분석", desc: "예측 수요 vs 현재 자전거 수량" },
      { title: "재배치 최적화", desc: "OR-Tools VRP로 트럭 재배치 경로 산출" },
      { title: "대시보드", desc: "실시간 수요/공급/추천 경로 시각화" }
    ],
    resources: [
      { title: "Prophet docs", url: "https://facebook.github.io/prophet/" },
      { title: "OR-Tools VRP", url: "https://developers.google.com/optimization/routing/vrp" }
    ],
    forRole: ["Data Analyst", "Operations Research", "Urban Planner"],
    sourceFromChats: "추가 (서울 공공데이터 활용)"
  },
  {
    id: "tr_003",
    title: "택시/Uber 수요 예측",
    category: "transport",
    difficulty: "Intermediate",
    estimatedHours: 30,
    shortDesc: "지역×시간대별 택시 호출 수요를 예측해 기사 배치 최적화",
    longDesc: "NYC Taxi 데이터셋 또는 서울 택시 데이터로 지역별·시간대별 호출 수요를 예측합니다. H3 hexagon grid로 공간을 분할하고, 시계열 + 공간 ML을 결합합니다.",
    whyItMatters: "카카오모빌리티·티맵·우버 류 모빌리티 회사 채용에 직접적으로 어필되는 프로젝트.",
    techStack: ["Python", "pandas", "H3 (Uber)", "LightGBM", "Plotly"],
    datasets: ["NYC Taxi & Limousine Commission Data", "서울시 택시 운행 데이터"],
    skills: ["Geospatial ML", "H3 grid system", "수요 예측"],
    steps: [
      { title: "데이터 수집", desc: "NYC TLC 또는 서울시 택시 운행 raw 데이터" },
      { title: "H3 grid 생성", desc: "Uber H3로 지역을 hexagon으로 분할" },
      { title: "Feature engineering", desc: "시간대, 요일, 날씨, 이벤트, 휴일 변수" },
      { title: "수요 예측 모델", desc: "LightGBM으로 grid×hour별 호출 수 예측" },
      { title: "Hotspot 시각화", desc: "Plotly로 시간에 따른 수요 hotspot 애니메이션" }
    ],
    resources: [
      { title: "H3 by Uber", url: "https://h3geo.org/" },
      { title: "NYC TLC Data", url: "https://www.nyc.gov/site/tlc/about/tlc-trip-record-data.page" }
    ],
    forRole: ["Mobility Data Scientist", "Operations Analyst"],
    sourceFromChats: "추가 (모빌리티 직군)"
  },
  {
    id: "tr_004",
    title: "항공편 지연 예측",
    category: "transport",
    difficulty: "Beginner",
    estimatedHours: 20,
    shortDesc: "출발 공항·항공사·시간대·기상 정보로 항공편 지연 여부 예측",
    longDesc: "미국 BTS Flight Data로 항공편 지연을 예측하는 클래식한 분류 문제. 초보자가 ML 파이프라인 전체를 경험하기 좋은 프로젝트.",
    whyItMatters: "데이터 분석 입문자가 첫 ML 프로젝트로 가장 권장되는 주제 중 하나. 깔끔하게 마무리하면 좋은 기반이 됩니다.",
    techStack: ["Python", "pandas", "scikit-learn", "matplotlib"],
    datasets: ["BTS (US Bureau of Transportation Statistics)", "Kaggle Flight Delay"],
    skills: ["EDA", "Binary classification", "Feature engineering 기초"],
    steps: [
      { title: "데이터 다운로드 & 클리닝", desc: "결측치 처리, 데이터 타입 정리" },
      { title: "EDA", desc: "항공사·공항·요일별 지연율 시각화" },
      { title: "Feature engineering", desc: "출발시간 binning, 항공사 encoding" },
      { title: "모델 학습", desc: "Logistic Regression vs Random Forest 비교" },
      { title: "평가 & 리포트", desc: "Confusion matrix, ROC curve, classification report" }
    ],
    resources: [
      { title: "Kaggle Flight Delays", url: "https://www.kaggle.com/datasets/usdot/flight-delays" }
    ],
    forRole: ["Data Analyst Junior", "DS Beginner"],
    sourceFromChats: "추가 (입문 프로젝트)"
  },
  {
    id: "tr_005",
    title: "서울 대중교통 흐름 Tableau 대시보드",
    category: "transport",
    difficulty: "Beginner",
    estimatedHours: 25,
    shortDesc: "서울시 대중교통 데이터를 Tableau로 분석한 인터랙티브 대시보드",
    longDesc: "서울 열린데이터광장 데이터로 지하철·버스 승하차 흐름을 Tableau로 시각화합니다. 시간대별 hotspot, 환승 패턴, 노선별 혼잡도를 인터랙티브하게 탐색할 수 있는 대시보드를 만듭니다. Tableau Public에 publish해서 포트폴리오 링크로 공유.",
    whyItMatters: "Tableau Public 링크는 GitHub README와 별개로 강력한 포트폴리오 자산. 데이터 분석가 직무에 직접적으로 어필.",
    techStack: ["Tableau Public", "SQL", "Python (전처리)"],
    datasets: ["서울 열린데이터광장 - 지하철 승하차", "서울시 버스 승하차"],
    skills: ["Tableau", "데이터 시각화", "Storytelling", "Calculated Fields"],
    steps: [
      { title: "데이터 전처리", desc: "Python으로 CSV 정리, Tableau 최적화 형태로 변환" },
      { title: "지도 시각화", desc: "역사별 위경도로 hotspot 지도 작성" },
      { title: "시간대별 필터", desc: "시간 슬라이더로 동적 변화 표현" },
      { title: "환승 흐름 Sankey", desc: "환승역 간 인원 흐름 Sankey diagram" },
      { title: "대시보드 통합", desc: "스토리텔링 구조로 인사이트 정리" },
      { title: "Tableau Public 게시", desc: "공개 URL로 포트폴리오에 첨부" }
    ],
    resources: [
      { title: "Tableau Public", url: "https://public.tableau.com/" }
    ],
    forRole: ["Data Analyst", "BI Analyst", "비즈니스 분석가"],
    sourceFromChats: "Chat 3 · Codeit Sprint Step 1 + 사용자 관심사"
  },

  // ============================================================
  // TOURISM (4)
  // ============================================================
  {
    id: "to_001",
    title: "한국관광 데이터 분석 & 추천 시스템",
    category: "tourism",
    difficulty: "Intermediate",
    estimatedHours: 40,
    shortDesc: "한국관광공사 TourAPI로 외국인 방문 패턴 분석 + 개인화 관광지 추천",
    longDesc: "한국관광공사 TourAPI 4.0의 관광지 정보, 방문객 통계 데이터를 활용해 외국인 방문 트렌드를 분석하고, 사용자의 선호도에 맞는 관광지를 추천하는 시스템을 구축합니다. 한국관광공사·문체부·지자체 채용에 매우 강력한 어필.",
    whyItMatters: "TourAPI는 한국관광 산업의 표준 데이터 소스. 이걸 다뤘다는 것 자체가 관광 산업 채용에 큰 차별점.",
    techStack: ["Python", "TourAPI", "pandas", "scikit-learn", "Folium", "Streamlit"],
    datasets: ["한국관광공사 TourAPI 4.0", "공공데이터포털 관광 데이터"],
    skills: ["공공 API 활용", "추천 시스템", "Geospatial 분석"],
    steps: [
      { title: "TourAPI 키 발급", desc: "공공데이터포털 회원가입 후 API 신청" },
      { title: "관광지 정보 수집", desc: "전국 관광지 메타데이터 + 위치 + 카테고리 수집" },
      { title: "방문 통계 분석", desc: "국적별·지역별·계절별 방문 패턴 EDA" },
      { title: "Content-based 추천", desc: "TF-IDF + Cosine similarity로 유사 관광지 추천" },
      { title: "지도 인터페이스", desc: "Folium으로 추천 결과 지도 표시" },
      { title: "Streamlit 앱", desc: "사용자 선호 입력 → 추천 결과 출력" }
    ],
    resources: [
      { title: "TourAPI 4.0", url: "https://api.visitkorea.or.kr/" },
      { title: "공공데이터포털", url: "https://www.data.go.kr/" }
    ],
    forRole: ["Tourism Data Analyst", "Recommender System Engineer"],
    sourceFromChats: "추가 (사용자 관심사: 관광)"
  },
  {
    id: "to_002",
    title: "호텔 리뷰 감성 분석",
    category: "tourism",
    difficulty: "Intermediate",
    estimatedHours: 30,
    shortDesc: "Booking.com/Yelp 호텔 리뷰로 만족도 요인 분석 + 별점 예측",
    longDesc: "Kaggle Hotel Review 데이터셋으로 리뷰 텍스트에서 핵심 만족/불만 요인을 추출(Aspect-Based Sentiment Analysis)하고, BERT로 별점을 예측합니다. 호텔 운영 인사이트를 비즈니스 리포트 형태로 정리.",
    whyItMatters: "Aspect-Based Sentiment는 단순 감성 분석보다 한 단계 위. 비즈니스 임팩트를 명확히 보여줄 수 있습니다.",
    techStack: ["Python", "transformers", "BERT", "spaCy", "wordcloud", "Plotly"],
    datasets: ["Kaggle Hotel Reviews (Booking.com)", "Yelp Open Dataset"],
    skills: ["NLP", "BERT fine-tuning", "Aspect-based sentiment", "비즈니스 리포팅"],
    steps: [
      { title: "데이터 수집 & 클리닝", desc: "리뷰 텍스트 전처리, 언어 필터링" },
      { title: "Aspect 추출", desc: "위치/가격/청결도/직원 등 측면별 키워드 추출" },
      { title: "측면별 감성 분류", desc: "각 측면에 대한 긍/부정 분류" },
      { title: "별점 예측 모델", desc: "BERT fine-tuning으로 1-5점 예측" },
      { title: "호텔별 비교", desc: "Top 10 호텔의 측면별 강점/약점 시각화" },
      { title: "비즈니스 리포트", desc: "운영자 관점 개선 제안서 작성" }
    ],
    resources: [
      { title: "Kaggle Hotel Reviews", url: "https://www.kaggle.com/datasets/jiashenliu/515k-hotel-reviews-data-in-europe" }
    ],
    forRole: ["NLP Data Scientist", "Customer Experience Analyst"],
    sourceFromChats: "추가 (사용자 관심사: 관광)"
  },
  {
    id: "to_003",
    title: "Airbnb 가격 예측 & 인사이트",
    category: "tourism",
    difficulty: "Beginner",
    estimatedHours: 25,
    shortDesc: "Inside Airbnb 데이터로 도시별 숙소 가격 예측 + 가격 영향 요인 분석",
    longDesc: "Inside Airbnb의 서울/제주/뉴욕 데이터로 숙소 특성(위치, 침실 수, 호스트 등급, 리뷰 점수)을 활용해 적정 가격을 예측합니다. 호스트 관점의 가격 책정 가이드까지 제공.",
    whyItMatters: "회귀 모델 + 비즈니스 인사이트 도출의 정석 프로젝트. 데이터 분석가 입문에 완벽.",
    techStack: ["Python", "pandas", "scikit-learn", "XGBoost", "SHAP", "matplotlib"],
    datasets: ["Inside Airbnb (insideairbnb.com)"],
    skills: ["회귀 모델", "EDA", "Feature engineering", "SHAP 해석"],
    steps: [
      { title: "데이터 다운로드", desc: "Inside Airbnb에서 서울+제주 데이터 수집" },
      { title: "EDA", desc: "지역·숙소 타입·가격 분포 시각화" },
      { title: "Feature engineering", desc: "위치 기반 동네 클러스터, 편의시설 개수 등" },
      { title: "회귀 모델", desc: "Linear → Random Forest → XGBoost 단계적 비교" },
      { title: "SHAP 해석", desc: "가격에 영향을 주는 top 10 요인 분석" },
      { title: "호스트 가이드", desc: "지역별 적정 가격 + 가격 인상 전략 리포트" }
    ],
    resources: [
      { title: "Inside Airbnb", url: "http://insideairbnb.com/get-the-data/" }
    ],
    forRole: ["Data Analyst Junior", "Pricing Analyst"],
    sourceFromChats: "추가 (관광/숙박 분야)"
  },
  {
    id: "to_004",
    title: "Post-COVID 관광 수요 회복 분석",
    category: "tourism",
    difficulty: "Intermediate",
    estimatedHours: 35,
    shortDesc: "코로나 전후 관광 트렌드 변화와 회복 패턴을 시계열 분석으로 도출",
    longDesc: "한국관광공사·UN WTO 데이터로 코로나 이전(2017-2019) vs 회복기(2022-2024) 외국인 방문 패턴 변화를 분석합니다. 국적별·지역별 회복률, 변화한 선호 패턴을 정리해 정책 인사이트 제안.",
    whyItMatters: "시의성 높은 주제 + 정책 인사이트는 공공·관광 직군에 매력적. 면접에서 \"왜 이 주제를 골랐나요\"에 좋은 답 가능.",
    techStack: ["Python", "pandas", "Prophet", "Plotly", "Tableau"],
    datasets: ["한국관광공사 출입국 통계", "UN World Tourism Organization"],
    skills: ["시계열 분석", "Change point detection", "정책 인사이트"],
    steps: [
      { title: "데이터 수집", desc: "2017-2024년 월별 입국자 통계 수집" },
      { title: "Change point detection", desc: "ruptures 라이브러리로 구조 변화 시점 탐지" },
      { title: "국적별 회복률 분석", desc: "TOP 10 국가별 회복 속도 비교" },
      { title: "Prophet 예측", desc: "2025-2026 입국자 수 예측" },
      { title: "Tableau 대시보드", desc: "인터랙티브 시각화로 결과 정리" }
    ],
    resources: [
      { title: "한국관광 데이터랩", url: "https://datalab.visitkorea.or.kr/" }
    ],
    forRole: ["Policy Analyst", "Tourism Data Scientist"],
    sourceFromChats: "추가 (사용자 관심사 + 시의성)"
  },

  // ============================================================
  // DA · BI · DASHBOARD (5)
  // ============================================================
  {
    id: "da_001",
    title: "E-commerce 매출 Tableau 대시보드",
    category: "da-bi",
    difficulty: "Beginner",
    estimatedHours: 20,
    shortDesc: "Olist 브라질 이커머스 데이터로 매출/고객/배송 종합 BI 대시보드",
    longDesc: "Kaggle Olist 데이터셋으로 매출 트렌드, 카테고리별 성과, 지역별 분포, 배송 만족도를 종합한 다중 시트 Tableau 대시보드를 구축합니다. 데이터 분석가 포트폴리오의 정석.",
    whyItMatters: "BI/대시보드 직무의 정석 프로젝트. Tableau Public 링크가 면접관 첫인상을 좌우합니다.",
    techStack: ["Tableau Public", "SQL", "Python (전처리)"],
    datasets: ["Kaggle Olist Brazilian E-commerce"],
    skills: ["Tableau", "BI 설계", "KPI 정의", "Dashboard storytelling"],
    steps: [
      { title: "데이터 모델링", desc: "9개 테이블 join 구조 설계, Star Schema 적용" },
      { title: "KPI 정의", desc: "GMV, AOV, 재구매율, NPS proxy 등 핵심 지표" },
      { title: "Overview 시트", desc: "전체 KPI 카드 + 시계열 매출 차트" },
      { title: "카테고리 분석 시트", desc: "Treemap, Top N 필터" },
      { title: "지역 분석 시트", desc: "브라질 지도 + 주별 매출 hotspot" },
      { title: "배송 분석 시트", desc: "배송 소요 시간 vs 리뷰 점수" }
    ],
    resources: [
      { title: "Kaggle Olist", url: "https://www.kaggle.com/datasets/olistbr/brazilian-ecommerce" }
    ],
    forRole: ["Data Analyst", "BI Analyst"],
    sourceFromChats: "Chat 3 · Codeit Sprint Step 1 확장"
  },
  {
    id: "da_002",
    title: "RFM 고객 세그멘테이션",
    category: "da-bi",
    difficulty: "Beginner",
    estimatedHours: 18,
    shortDesc: "Recency-Frequency-Monetary 분석으로 고객 등급 분류 + 마케팅 전략 도출",
    longDesc: "RFM은 이커머스 분석의 표준 방법론. UK Online Retail 데이터로 고객을 Champion/Loyal/At-risk/Lost 등 8-11개 세그먼트로 분류하고, 각 세그먼트별 맞춤 마케팅 전략을 제안합니다.",
    whyItMatters: "마케팅 분석가·CRM 직군 면접에서 RFM은 거의 100% 등장하는 주제. 직접 구현 경험이 큰 차이를 만듭니다.",
    techStack: ["Python", "pandas", "matplotlib", "seaborn", "scikit-learn"],
    datasets: ["UCI Online Retail Dataset"],
    skills: ["RFM 분석", "고객 세그멘테이션", "마케팅 분석"],
    steps: [
      { title: "데이터 클리닝", desc: "환불·결측·이상치 처리" },
      { title: "RFM 점수 계산", desc: "각 차원별 1-5점 구간 할당" },
      { title: "세그먼트 정의", desc: "Champions, Loyal, At-risk 등 11개 세그먼트" },
      { title: "세그먼트 시각화", desc: "Treemap + Scatter로 분포 표현" },
      { title: "마케팅 전략 제안", desc: "세그먼트별 액션 플랜 리포트" }
    ],
    resources: [
      { title: "UCI Online Retail", url: "https://archive.ics.uci.edu/ml/datasets/online+retail" }
    ],
    forRole: ["Marketing Analyst", "CRM Specialist", "Data Analyst"],
    sourceFromChats: "추가 (마케팅 직군 필수)"
  },
  {
    id: "da_003",
    title: "A/B 테스트 분석 프레임워크",
    category: "da-bi",
    difficulty: "Intermediate",
    estimatedHours: 25,
    shortDesc: "A/B 테스트 설계부터 통계 검정·결과 해석까지 일관된 분석 프레임워크",
    longDesc: "표본 크기 계산, t-test/chi-square 검정, Bayesian A/B testing, Sequential testing 까지 포함한 분석 프레임워크를 구축합니다. 함수 모듈화 + Jupyter notebook 템플릿 + 실전 사례 분석.",
    whyItMatters: "데이터 분석가 면접 핵심 주제. \"A/B 테스트 결과 어떻게 해석하나요\"에 답할 수 있어야 합니다.",
    techStack: ["Python", "scipy.stats", "statsmodels", "PyMC (Bayesian)", "matplotlib"],
    datasets: ["Kaggle A/B test datasets", "자체 시뮬레이션"],
    skills: ["통계 검정", "Hypothesis testing", "Power analysis", "Bayesian inference"],
    steps: [
      { title: "Power analysis 함수", desc: "효과 크기·유의수준에 따른 표본 크기 계산" },
      { title: "Frequentist 검정", desc: "t-test, chi-square, Mann-Whitney U" },
      { title: "Multiple testing 보정", desc: "Bonferroni, Benjamini-Hochberg" },
      { title: "Bayesian A/B test", desc: "PyMC로 conversion rate posterior 분포" },
      { title: "Sequential testing", desc: "조기 종료 가능한 SPRT 구현" },
      { title: "실전 사례 분석", desc: "공개 A/B test 데이터로 end-to-end 분석" }
    ],
    resources: [
      { title: "Trustworthy Online Controlled Experiments (책)", url: "" }
    ],
    forRole: ["Data Analyst", "Growth Analyst", "Product Analyst"],
    sourceFromChats: "추가 (Product/Growth 분석)"
  },
  {
    id: "da_004",
    title: "마케팅 퍼널 & 코호트 분석",
    category: "da-bi",
    difficulty: "Beginner",
    estimatedHours: 22,
    shortDesc: "방문→가입→구매→재구매 퍼널 분석 + 월별 코호트 리텐션 분석",
    longDesc: "SaaS 또는 이커머스 가상 데이터로 마케팅 퍼널의 각 단계별 conversion rate를 분석하고, 월별 가입 코호트의 리텐션 곡선을 시각화합니다. Growth/Product 분석가의 필수 스킬.",
    whyItMatters: "Growth Marketing·Product Analyst 면접 단골 주제. 코호트 분석을 그릴 수 있느냐가 합격 여부를 가릅니다.",
    techStack: ["Python", "pandas", "Plotly", "SQL"],
    datasets: ["Kaggle Mobile Game Cohort", "자체 생성 (SaaS 모델)"],
    skills: ["퍼널 분석", "코호트 분석", "Retention modeling", "Growth metrics"],
    steps: [
      { title: "이벤트 데이터 모델링", desc: "user_id, event_type, timestamp 스키마" },
      { title: "퍼널 정의 & 분석", desc: "단계별 drop-off rate 계산" },
      { title: "코호트 매트릭스", desc: "월별 코호트 × N개월 후 리텐션" },
      { title: "리텐션 곡선 시각화", desc: "Plotly heatmap + curve 플롯" },
      { title: "Power user 정의", desc: "L7/L28 활성 사용자 정의" },
      { title: "리포트", desc: "개선 가능 단계 + 액션 아이템" }
    ],
    resources: [
      { title: "Amplitude Cohort Analysis Guide", url: "https://amplitude.com/blog/cohort-analysis" }
    ],
    forRole: ["Growth Analyst", "Product Analyst", "Data Analyst"],
    sourceFromChats: "추가 (Growth 직군 필수)"
  },
  {
    id: "da_005",
    title: "HR Analytics Tableau 대시보드",
    category: "da-bi",
    difficulty: "Beginner",
    estimatedHours: 22,
    shortDesc: "직원 이직률·인사 데이터 분석 대시보드 + 이직 예측 모델",
    longDesc: "IBM HR Analytics Employee Attrition 데이터셋으로 부서별·직급별 이직률을 분석하고, ML로 이직 가능성을 예측합니다. Tableau 대시보드 + Python 모델을 결합.",
    whyItMatters: "HR Tech·People Analytics 분야 직군은 적지만 경쟁이 덜해 진입하기 좋습니다.",
    techStack: ["Tableau", "Python", "scikit-learn", "SQL"],
    datasets: ["IBM HR Analytics Employee Attrition (Kaggle)"],
    skills: ["HR 도메인", "Tableau", "이직 예측 모델"],
    steps: [
      { title: "EDA", desc: "부서·직급·근속·연봉별 이직률 패턴" },
      { title: "Tableau 대시보드", desc: "필터 + drill-down 가능한 인터랙티브 대시보드" },
      { title: "이직 예측 모델", desc: "Random Forest + Feature importance" },
      { title: "위험군 식별", desc: "이직 가능성 상위 10% 직원 프로파일링" },
      { title: "리포트", desc: "HR 부서 의사결정용 보고서" }
    ],
    resources: [
      { title: "Kaggle IBM HR Analytics", url: "https://www.kaggle.com/datasets/pavansubhasht/ibm-hr-analytics-attrition-dataset" }
    ],
    forRole: ["People Analytics", "HR Data Analyst"],
    sourceFromChats: "Chat 3 · Codeit Sprint Step 2 확장"
  },

  // ============================================================
  // GROWTH MARKETING (4)
  // ============================================================
  {
    id: "gr_001",
    title: "Customer Lifetime Value (CLV) 예측",
    category: "growth",
    difficulty: "Intermediate",
    estimatedHours: 30,
    shortDesc: "BG/NBD + Gamma-Gamma 모델로 고객 생애가치 예측",
    longDesc: "lifetimes 라이브러리로 확률적 CLV 모델(BG/NBD + Gamma-Gamma)을 구축합니다. 향후 12개월 예상 매출 기준으로 고객을 등급화하고 마케팅 예산 배분 전략을 도출.",
    whyItMatters: "CLV는 Growth Marketing의 핵심 KPI. 단순 매출 분석에서 한 단계 더 들어간 시그널을 줍니다.",
    techStack: ["Python", "lifetimes", "pandas", "matplotlib"],
    datasets: ["UCI Online Retail", "Kaggle CDNOW"],
    skills: ["확률적 모델", "CLV 예측", "마케팅 분석"],
    steps: [
      { title: "RFM summary 생성", desc: "고객별 recency/frequency/monetary 집계" },
      { title: "BG/NBD 모델", desc: "고객 잔존+구매 빈도 예측 모델 적합" },
      { title: "Gamma-Gamma 모델", desc: "예상 거래 금액 모델링 (구매 빈도와 독립 가정)" },
      { title: "12개월 CLV 예측", desc: "고객별 향후 12개월 가치 산출" },
      { title: "등급화 & 시각화", desc: "Top 10% / 20% / 50% 고객 프로파일링" }
    ],
    resources: [
      { title: "lifetimes docs", url: "https://lifetimes.readthedocs.io/" }
    ],
    forRole: ["Growth Marketer", "CRM Analyst", "Data Scientist"],
    sourceFromChats: "추가 (Growth 핵심 KPI)"
  },
  {
    id: "gr_002",
    title: "고객 이탈(Churn) 예측 & 리텐션 전략",
    category: "growth",
    difficulty: "Intermediate",
    estimatedHours: 28,
    shortDesc: "Telco Churn 데이터로 이탈 예측 + 리텐션 액션 매핑",
    longDesc: "Telco Customer Churn 데이터셋으로 이탈 가능성을 예측하고, SHAP로 각 고객별 이탈 사유를 분석합니다. 이탈 사유별 리텐션 전략을 매핑해 비즈니스 임팩트를 명확히 보여줍니다.",
    whyItMatters: "Chat 1·2에서 가장 많이 언급된 프로젝트. 거의 모든 Growth/CRM 채용에서 보고 싶어하는 주제.",
    techStack: ["Python", "scikit-learn", "XGBoost", "SHAP", "imbalanced-learn"],
    datasets: ["Kaggle Telco Customer Churn", "IBM Telco"],
    skills: ["분류 모델", "SHAP 해석", "Business action mapping"],
    steps: [
      { title: "EDA & 클리닝", desc: "결측 처리, 변수 분포 분석" },
      { title: "Imbalanced data 처리", desc: "SMOTE 또는 class_weight" },
      { title: "모델 학습", desc: "Logistic, RF, XGBoost 비교" },
      { title: "SHAP 분석", desc: "글로벌·로컬 feature importance" },
      { title: "리텐션 전략 매핑", desc: "이탈 사유별 마케팅 캠페인 매칭" },
      { title: "ROI 추정", desc: "리텐션 시도의 예상 ROI 계산" }
    ],
    resources: [
      { title: "Kaggle Telco Churn", url: "https://www.kaggle.com/datasets/blastchar/telco-customer-churn" }
    ],
    forRole: ["Growth Analyst", "CRM Marketer", "Data Scientist"],
    sourceFromChats: "Chat 1 · Img 10 · Chat 2 · Img 14 (가장 많이 언급)"
  },
  {
    id: "gr_003",
    title: "Multi-touch Attribution Modeling",
    category: "growth",
    difficulty: "Advanced",
    estimatedHours: 35,
    shortDesc: "퍼포먼스 마케팅 각 채널의 기여도를 정량 분석",
    longDesc: "유저 conversion path 데이터로 Last-click, First-click, Linear, Time-decay, Shapley value, Markov chain 등 다양한 attribution 모델을 비교 구현합니다. 페이드 마케팅 예산 최적화의 핵심.",
    whyItMatters: "퍼포먼스 마케팅·디지털 광고 직군의 깊은 시그널. 단순 마지막 클릭 모델을 넘어선 분석 능력 보여줄 수 있음.",
    techStack: ["Python", "pandas", "ChannelAttribution (R)", "shap"],
    datasets: ["Criteo Attribution Modeling", "자체 생성"],
    skills: ["Attribution modeling", "Shapley value", "Markov chain"],
    steps: [
      { title: "Conversion path 데이터 구조화", desc: "user_id × channel × timestamp 시퀀스" },
      { title: "Rule-based 모델", desc: "Last/First/Linear/Time-decay 구현" },
      { title: "Shapley value", desc: "각 채널의 marginal contribution 계산" },
      { title: "Markov chain", desc: "Transition matrix + removal effect" },
      { title: "비교 분석", desc: "모델별 채널 기여도 차이 시각화" },
      { title: "예산 재배분 시뮬레이션", desc: "기여도 기반 예산 reallocation 효과 추정" }
    ],
    resources: [
      { title: "Markov Attribution paper", url: "" }
    ],
    forRole: ["Performance Marketer", "Growth Data Scientist"],
    sourceFromChats: "추가 (Growth 고급 주제)"
  },
  {
    id: "gr_004",
    title: "이메일 캠페인 ROI 분석",
    category: "growth",
    difficulty: "Beginner",
    estimatedHours: 18,
    shortDesc: "이메일 마케팅 캠페인의 open/click/conversion + ROI 분석",
    longDesc: "이메일 캠페인 데이터로 발송 시간·subject line·세그먼트별 성과를 분석합니다. A/B 테스트 결과 해석 + 다음 캠페인 최적화 제안.",
    whyItMatters: "이메일·CRM 마케팅 직군에서 가장 흔한 분석. 기본기 검증용으로 좋은 주제.",
    techStack: ["Python", "pandas", "scipy", "Plotly"],
    datasets: ["Kaggle Email Marketing Campaign", "자체 시뮬레이션"],
    skills: ["퍼널 분석", "A/B 테스트 해석", "ROI 계산"],
    steps: [
      { title: "EDA", desc: "캠페인별 open/click/conversion rate" },
      { title: "세그먼트 분석", desc: "고객군별 반응률 차이" },
      { title: "Subject line 분석", desc: "텍스트 길이·키워드별 open rate" },
      { title: "발송 시간 분석", desc: "요일·시간별 최적 발송 시점" },
      { title: "ROI 계산", desc: "캠페인별 ROI + 다음 캠페인 추천" }
    ],
    resources: [],
    forRole: ["CRM Analyst", "Email Marketer", "Junior DA"],
    sourceFromChats: "추가 (마케팅 입문)"
  },

  // ============================================================
  // ML · DATA SCIENCE (5)
  // ============================================================
  {
    id: "ml_001",
    title: "Spotify 음악 장르 분류 & 클러스터링",
    category: "ml",
    difficulty: "Beginner",
    estimatedHours: 20,
    shortDesc: "Spotify API audio features로 장르 분류 + 음악 클러스터링",
    longDesc: "Spotify Tracks Dataset(125 장르)에서 audio feature(danceability, energy, valence 등)로 장르를 분류하고, K-means/UMAP으로 음악 클러스터를 시각화합니다. 입문자 EDA + ML 정석.",
    whyItMatters: "재미있는 도메인 + 클린한 데이터 + 명확한 결과물. 포트폴리오 첫 ML 프로젝트로 추천.",
    techStack: ["Python", "pandas", "scikit-learn", "UMAP", "Plotly"],
    datasets: ["Kaggle Spotify Tracks Dataset (125 genres)"],
    skills: ["EDA", "Multi-class classification", "Clustering", "Dimensionality reduction"],
    steps: [
      { title: "데이터 탐색", desc: "장르별 feature 분포 시각화" },
      { title: "전처리", desc: "Categorical encoding, scaling" },
      { title: "분류 모델", desc: "Random Forest로 장르 multi-class 예측" },
      { title: "Clustering", desc: "K-means + Elbow method" },
      { title: "UMAP 시각화", desc: "2D 임베딩 + 인터랙티브 Plotly" },
      { title: "추천 시스템 demo", desc: "유사 곡 추천 간단 구현" }
    ],
    resources: [
      { title: "Spotify Tracks Dataset", url: "https://www.kaggle.com/datasets/maharshipandya/-spotify-tracks-dataset" }
    ],
    forRole: ["Junior DS", "DA"],
    sourceFromChats: "Chat 1 · Img 11"
  },
  {
    id: "ml_002",
    title: "House Price Prediction (Kaggle Top 10%)",
    category: "ml",
    difficulty: "Intermediate",
    estimatedHours: 35,
    shortDesc: "Kaggle Ames Housing 데이터로 회귀 모델링 + 상위 10% 목표",
    longDesc: "Kaggle House Prices 대회의 클래식한 회귀 문제. Feature engineering이 핵심 — 80개 변수를 어떻게 가공하느냐에 따라 결과가 크게 갈립니다. Stacking ensemble까지 가서 leaderboard 상위 10%를 목표.",
    whyItMatters: "Kaggle 순위는 객관적 시그널. \"Top 10%\" 같은 구체적 결과가 있으면 신뢰도 급상승.",
    techStack: ["Python", "XGBoost", "LightGBM", "scikit-learn", "Optuna"],
    datasets: ["Kaggle House Prices (Ames Housing)"],
    skills: ["Feature engineering", "회귀 모델", "Stacking ensemble", "Hyperparameter tuning"],
    steps: [
      { title: "EDA + outlier 처리", desc: "Sale price log transform, outlier 제거" },
      { title: "결측 처리", desc: "도메인 지식 기반 imputation" },
      { title: "Feature engineering", desc: "Total SF, Age 등 derived features" },
      { title: "모델 학습", desc: "XGBoost + LightGBM + CatBoost" },
      { title: "Optuna 튜닝", desc: "Bayesian optimization" },
      { title: "Stacking ensemble", desc: "Level 1 모델 + Ridge meta learner" },
      { title: "Kaggle submit", desc: "리더보드 순위 README에 명시" }
    ],
    resources: [
      { title: "Kaggle House Prices", url: "https://www.kaggle.com/c/house-prices-advanced-regression-techniques" }
    ],
    forRole: ["Data Scientist", "ML Engineer"],
    sourceFromChats: "Chat 2 · Img 13"
  },
  {
    id: "ml_003",
    title: "Credit Card Fraud Detection",
    category: "ml",
    difficulty: "Intermediate",
    estimatedHours: 25,
    shortDesc: "극도로 imbalanced한 사기 탐지 데이터에서 ML 모델 구축",
    longDesc: "Kaggle Credit Card Fraud 데이터(284k 거래 중 사기 0.17%)로 imbalanced classification을 다룹니다. Anomaly detection vs Supervised 접근 비교, Precision-Recall trade-off 분석.",
    whyItMatters: "금융 보안·핀테크 채용에 매우 적합. Imbalanced data 처리 능력은 면접 단골 주제.",
    techStack: ["Python", "imbalanced-learn", "XGBoost", "Isolation Forest", "SHAP"],
    datasets: ["Kaggle Credit Card Fraud Detection"],
    skills: ["Imbalanced classification", "Anomaly detection", "PR curve 해석"],
    steps: [
      { title: "EDA", desc: "Class distribution, feature scaling 분석" },
      { title: "Baseline 모델", desc: "Logistic Regression naive 학습" },
      { title: "Resampling 비교", desc: "SMOTE, ADASYN, Random Undersampling" },
      { title: "Anomaly detection", desc: "Isolation Forest, One-Class SVM" },
      { title: "최종 모델", desc: "XGBoost + class_weight + threshold tuning" },
      { title: "평가", desc: "PR-AUC, F1, Cohen's Kappa" }
    ],
    resources: [
      { title: "Kaggle Fraud Dataset", url: "https://www.kaggle.com/datasets/mlg-ulb/creditcardfraud" }
    ],
    forRole: ["Fraud Analyst", "Security Data Scientist"],
    sourceFromChats: "Chat 1 · Img 9 (Transaction Fraud Detection)"
  },
  {
    id: "ml_004",
    title: "Time Series Forecasting 종합",
    category: "ml",
    difficulty: "Intermediate",
    estimatedHours: 30,
    shortDesc: "ARIMA · Prophet · LSTM · XGBoost 시계열 모델 비교",
    longDesc: "동일 데이터셋(소매 매출 또는 전력 수요)에 4가지 시계열 모델을 적용해 성능을 비교합니다. 각 모델의 가정·강점·약점을 정리한 비교 리포트가 핵심 결과물.",
    whyItMatters: "시계열은 거의 모든 비즈니스 문제에 등장. 4가지 접근법을 모두 다뤘다는 경험은 큰 차별점.",
    techStack: ["Python", "statsmodels", "Prophet", "TensorFlow", "XGBoost"],
    datasets: ["Kaggle Store Sales", "M5 Forecasting", "전력거래소 KPX"],
    skills: ["ARIMA", "Prophet", "LSTM", "Walk-forward validation"],
    steps: [
      { title: "EDA + decomposition", desc: "Trend, seasonality, residual 분해" },
      { title: "ARIMA/SARIMA", desc: "ACF/PACF 기반 파라미터 선택" },
      { title: "Prophet", desc: "Holiday, changepoint 설정" },
      { title: "LSTM", desc: "Sequence 학습, multi-step forecasting" },
      { title: "XGBoost + lag features", desc: "Tabular 방식 시계열 모델" },
      { title: "비교 리포트", desc: "MAPE, RMSE 비교 + 강약점 표" }
    ],
    resources: [
      { title: "Prophet Quick Start", url: "https://facebook.github.io/prophet/docs/quick_start.html" }
    ],
    forRole: ["Data Scientist", "Forecasting Analyst"],
    sourceFromChats: "Chat 1 · Img 12 (Time Series Trend Prediction)"
  },
  {
    id: "ml_005",
    title: "Image Classification 전이학습",
    category: "ml",
    difficulty: "Intermediate",
    estimatedHours: 25,
    shortDesc: "ResNet/EfficientNet 전이학습으로 이미지 분류 + Grad-CAM 시각화",
    longDesc: "Custom 이미지 데이터셋(음식, 의류, 동물 등)에 pretrained CNN 모델을 fine-tune하고 Grad-CAM으로 모델이 어디를 보는지 시각화합니다. 컴퓨터 비전 입문 정석.",
    whyItMatters: "딥러닝 채용 시 Vision은 가장 흔한 도메인. 전이학습 경험은 거의 필수.",
    techStack: ["Python", "PyTorch", "torchvision", "Grad-CAM", "Albumentations"],
    datasets: ["Food-101", "Stanford Dogs", "자체 수집 데이터"],
    skills: ["Transfer learning", "CNN", "Image augmentation", "Model interpretability"],
    steps: [
      { title: "데이터 준비", desc: "DataLoader + augmentation pipeline" },
      { title: "Pretrained model", desc: "ResNet50/EfficientNet-B0 로드" },
      { title: "Fine-tuning", desc: "마지막 레이어 교체 + 학습률 스케줄링" },
      { title: "평가", desc: "Confusion matrix + class별 성능" },
      { title: "Grad-CAM 시각화", desc: "모델 attention map 추출" },
      { title: "Streamlit 데모", desc: "이미지 업로드 → 예측 + Grad-CAM 표시" }
    ],
    resources: [
      { title: "PyTorch Transfer Learning", url: "https://pytorch.org/tutorials/beginner/transfer_learning_tutorial.html" }
    ],
    forRole: ["Computer Vision Engineer", "Deep Learning Engineer"],
    sourceFromChats: "추가 (CV 입문)"
  },

  // ============================================================
  // AI ENGINEERING (5)
  // ============================================================
  {
    id: "ai_001",
    title: "RAG Pipeline with Hybrid Search",
    category: "ai-eng",
    difficulty: "Advanced",
    estimatedHours: 50,
    shortDesc: "Vector + Keyword 하이브리드 검색 기반 RAG 시스템 구축",
    longDesc: "LangChain + Pinecone/Weaviate + BM25 keyword search를 결합한 hybrid RAG 시스템. 한국어 문서 처리, re-ranking, evaluation (RAGAS)까지 포함하는 production-grade 구현. AI Engineer 채용에 가장 강력한 시그널.",
    whyItMatters: "Chat 1 Img 16, Chat 2 Img 3에서 모두 \"AI Eng 채용 최강 프로젝트\"로 언급. 사실상 필수.",
    techStack: ["Python", "LangChain", "Pinecone", "OpenAI/Claude API", "FastAPI", "Streamlit"],
    datasets: ["자체 수집 PDF/문서 (회사 보고서, 논문 등)"],
    skills: ["RAG architecture", "Vector DB", "Hybrid search", "Evaluation"],
    steps: [
      { title: "문서 ingestion pipeline", desc: "PDF→Text→Chunk (한국어 KoSentenceBERT)" },
      { title: "Vector DB 구축", desc: "Pinecone or Weaviate에 임베딩 저장" },
      { title: "Hybrid retrieval", desc: "Dense (vector) + Sparse (BM25) 결합" },
      { title: "Re-ranking", desc: "Cross-encoder로 top-k 재정렬" },
      { title: "LLM 답변 생성", desc: "Claude/GPT-4 + citation" },
      { title: "Evaluation (RAGAS)", desc: "Faithfulness, Context relevance 측정" },
      { title: "FastAPI + Streamlit UI", desc: "Production-ready 인터페이스" }
    ],
    resources: [
      { title: "LangChain RAG", url: "https://python.langchain.com/docs/use_cases/question_answering/" },
      { title: "RAGAS evaluation", url: "https://github.com/explodinggradients/ragas" }
    ],
    forRole: ["AI Engineer", "LLM Engineer", "MLE"],
    sourceFromChats: "Chat 1 · Img 16, Chat 2 · Img 3 (최고 priority)"
  },
  {
    id: "ai_002",
    title: "LLM Fine-tuning with LoRA/PEFT",
    category: "ai-eng",
    difficulty: "Advanced",
    estimatedHours: 45,
    shortDesc: "LoRA로 오픈소스 LLM(Llama/Qwen)을 한국어 도메인에 fine-tune",
    longDesc: "Llama 3 또는 Qwen2를 LoRA/QLoRA로 한국어 도메인(법률·의료·금융)에 fine-tune합니다. HuggingFace PEFT 사용, Colab Pro/GPU 클라우드에서 학습.",
    whyItMatters: "LLM fine-tuning 경험은 AI Engineer 채용에서 매우 희소한 시그널. \"내가 직접 학습시켜봤다\"가 강력합니다.",
    techStack: ["Python", "transformers", "PEFT", "bitsandbytes", "Hugging Face", "wandb"],
    datasets: ["KLUE", "KoBEST", "도메인별 자체 수집"],
    skills: ["LoRA/QLoRA", "Quantization", "LLM training", "Evaluation"],
    steps: [
      { title: "Base model 선택", desc: "Llama 3 8B 또는 Qwen2 7B" },
      { title: "데이터셋 준비", desc: "Instruction tuning 형식으로 변환" },
      { title: "QLoRA 학습", desc: "4bit quantization + LoRA rank=16" },
      { title: "학습 모니터링", desc: "wandb로 loss 추적" },
      { title: "평가", desc: "Domain-specific 벤치마크 + LLM-as-a-judge" },
      { title: "Hugging Face Hub 업로드", desc: "공개 모델로 push" }
    ],
    resources: [
      { title: "HuggingFace PEFT", url: "https://huggingface.co/docs/peft/" }
    ],
    forRole: ["AI Engineer", "ML Researcher"],
    sourceFromChats: "Chat 1 · Img 17"
  },
  {
    id: "ai_003",
    title: "Multi-Agent Orchestration System",
    category: "ai-eng",
    difficulty: "Advanced",
    estimatedHours: 55,
    shortDesc: "여러 LLM 에이전트가 협업하는 복잡한 태스크 자동화 시스템",
    longDesc: "LangGraph 또는 CrewAI로 여러 agent(Researcher, Writer, Critic, Editor)가 협업해 보고서를 작성하는 시스템을 구축합니다. Tool use, memory, error handling까지 포함.",
    whyItMatters: "Multi-agent는 LLM 분야 최신 트렌드. 직접 구현해본 경험은 면접 차별화 포인트.",
    techStack: ["Python", "LangGraph", "CrewAI", "Claude/GPT-4 API", "Tools/Functions"],
    datasets: ["없음 (시스템 구축 프로젝트)"],
    skills: ["Agent design", "Tool use", "Orchestration", "State management"],
    steps: [
      { title: "Agent 역할 정의", desc: "Researcher, Writer, Critic, Editor 각 책임" },
      { title: "Tool 구축", desc: "Web search, calculator, file I/O 등" },
      { title: "Graph 설계 (LangGraph)", desc: "State machine으로 에이전트 협업 흐름" },
      { title: "Memory 추가", desc: "Conversation history + long-term memory" },
      { title: "Error handling", desc: "Retry, fallback 로직" },
      { title: "데모 케이스", desc: "\"AI 시장 동향 보고서 작성\" 등 end-to-end 예시" }
    ],
    resources: [
      { title: "LangGraph", url: "https://github.com/langchain-ai/langgraph" },
      { title: "CrewAI", url: "https://github.com/joaomdmoura/crewAI" }
    ],
    forRole: ["AI Engineer", "Senior MLE"],
    sourceFromChats: "Chat 1 · Img 18, Chat 2 · Img 3"
  },
  {
    id: "ai_004",
    title: "Text-to-SQL 자연어 인터페이스",
    category: "ai-eng",
    difficulty: "Advanced",
    estimatedHours: 40,
    shortDesc: "자연어 질문을 SQL 쿼리로 변환하는 LLM 기반 시스템",
    longDesc: "사용자가 자연어로 \"지난달 매출 상위 10개 상품\" 같은 질문을 입력하면, LLM이 데이터베이스 스키마를 이해하고 SQL 쿼리를 생성·실행해 결과를 자연어로 답변합니다. Spider/BIRD 벤치마크로 평가.",
    whyItMatters: "Chat 1·2 모두에서 \"AI Eng 핵심 프로젝트\"로 강조됨. 비즈니스 임팩트가 직관적이라 면접관에게 잘 전달됩니다.",
    techStack: ["Python", "LangChain", "Claude/GPT-4", "SQLite/PostgreSQL", "Streamlit"],
    datasets: ["Spider benchmark", "BIRD-SQL", "자체 DB 스키마"],
    skills: ["LLM prompt engineering", "Schema understanding", "SQL", "Evaluation"],
    steps: [
      { title: "DB 스키마 설정", desc: "샘플 DB (이커머스·HR 등) 구성" },
      { title: "Schema linking", desc: "질문에서 관련 테이블/컬럼 식별" },
      { title: "SQL 생성", desc: "Few-shot prompting + chain-of-thought" },
      { title: "쿼리 검증", desc: "Syntax check + dry-run" },
      { title: "결과 자연어화", desc: "쿼리 결과를 자연어 답변으로 변환" },
      { title: "평가", desc: "Spider 정확도 측정 (Exact Match, Execution Acc)" }
    ],
    resources: [
      { title: "Spider Benchmark", url: "https://yale-lily.github.io/spider" }
    ],
    forRole: ["AI Engineer", "Data Platform Engineer"],
    sourceFromChats: "Chat 1 · Img 18, Chat 2 · Img 3"
  },
  {
    id: "ai_005",
    title: "LLM Evaluation Pipeline",
    category: "ai-eng",
    difficulty: "Intermediate",
    estimatedHours: 30,
    shortDesc: "여러 LLM 모델을 동일 태스크로 평가하는 자동화 파이프라인",
    longDesc: "Claude, GPT-4, Llama, Qwen 등 여러 모델을 동일한 평가셋에 적용해 성능을 비교하는 파이프라인. 자동 채점, LLM-as-a-judge, cost/latency 분석 포함.",
    whyItMatters: "LLM Eval은 점점 중요해지는 영역. 모델 선택 의사결정에 도움이 되는 실용적 프로젝트.",
    techStack: ["Python", "promptfoo", "LangChain", "여러 LLM API"],
    datasets: ["MMLU", "HellaSwag", "자체 평가셋"],
    skills: ["LLM evaluation", "Prompt engineering", "Statistical comparison"],
    steps: [
      { title: "평가셋 구축", desc: "도메인별 50-100개 질문 + 정답" },
      { title: "Multi-model adapter", desc: "여러 API 통합 인터페이스" },
      { title: "Automated scoring", desc: "Exact match + LLM-as-a-judge" },
      { title: "Cost/Latency tracking", desc: "모델별 비용·응답 시간" },
      { title: "비교 리포트", desc: "정확도 + 비용 trade-off 시각화" }
    ],
    resources: [
      { title: "promptfoo", url: "https://github.com/promptfoo/promptfoo" }
    ],
    forRole: ["AI Engineer", "MLOps Engineer"],
    sourceFromChats: "Chat 2 · Img 3 (LLM eval 언급)"
  },

  // ============================================================
  // MCP · TOOLS (3)
  // ============================================================
  {
    id: "mcp_001",
    title: "Custom MCP Server 구축",
    category: "mcp-tools",
    difficulty: "Intermediate",
    estimatedHours: 25,
    shortDesc: "Claude/Cursor에서 사용 가능한 커스텀 MCP 서버 개발 + 배포",
    longDesc: "Anthropic의 Model Context Protocol(MCP)로 custom tool을 제공하는 서버를 구축합니다. 예시: 개인 노트 검색, GitHub 이슈 관리, 데이터베이스 쿼리 등. 직접 구축한 MCP는 매우 희소한 시그널.",
    whyItMatters: "MCP는 2024-2025년 가장 핫한 주제. 직접 만든 MCP 서버는 강력한 차별화.",
    techStack: ["Python/TypeScript", "MCP SDK", "FastAPI"],
    datasets: ["자체 구축"],
    skills: ["MCP protocol", "Tool design", "API 설계"],
    steps: [
      { title: "MCP SDK 설치 & Hello World", desc: "공식 Python/TS SDK로 기본 서버" },
      { title: "Tool 정의", desc: "list_notes, search_notes, create_note 등" },
      { title: "Resource 정의", desc: "노트 데이터를 resource로 노출" },
      { title: "Prompt 템플릿", desc: "재사용 가능한 prompt 등록" },
      { title: "Claude Desktop 연동", desc: "config 파일에 등록 & 테스트" },
      { title: "GitHub 배포 + 문서화", desc: "다른 개발자가 쓸 수 있게 README" }
    ],
    resources: [
      { title: "MCP 공식 문서", url: "https://modelcontextprotocol.io/" },
      { title: "MCP Servers (Anthropic)", url: "https://github.com/modelcontextprotocol/servers" }
    ],
    forRole: ["AI Engineer", "DevTools Engineer"],
    sourceFromChats: "Chat 2 · Img 5, 8, 9 (Claude/MCP 도구 다수 언급)"
  },
  {
    id: "mcp_002",
    title: "Playwright MCP 웹 자동화 프로젝트",
    category: "mcp-tools",
    difficulty: "Intermediate",
    estimatedHours: 20,
    shortDesc: "Playwright MCP로 Claude가 직접 브라우저를 조작하는 자동화 시스템",
    longDesc: "Anthropic의 Playwright MCP를 활용해 Claude가 직접 웹사이트를 탐색·데이터 수집·폼 작성을 자동화합니다. 예시 use case: 매일 뉴스 요약, 가격 모니터링, 자동 리포팅.",
    whyItMatters: "최신 AI agent 트렌드. \"Claude가 직접 브라우저를 움직였다\" 시연이 임팩트가 큽니다.",
    techStack: ["Playwright MCP", "Claude API", "Python"],
    datasets: ["실시간 웹"],
    skills: ["Browser automation", "AI agents", "Web scraping"],
    steps: [
      { title: "Playwright MCP 설치", desc: "Anthropic 공식 가이드 따라 설정" },
      { title: "Use case 정의", desc: "예: 매일 IT 뉴스 5개 요약" },
      { title: "Workflow 설계", desc: "탐색 → 추출 → 요약 → 저장" },
      { title: "에러 핸들링", desc: "페이지 로딩 실패, captcha 등 대응" },
      { title: "스케줄링", desc: "cron으로 매일 자동 실행" },
      { title: "결과 노션/Slack 전송", desc: "API로 결과 자동 발행" }
    ],
    resources: [
      { title: "Playwright MCP", url: "https://github.com/microsoft/playwright-mcp" }
    ],
    forRole: ["AI Engineer", "Automation Engineer"],
    sourceFromChats: "Chat 2 · Img 9"
  },
  {
    id: "mcp_003",
    title: "Document Processing Pipeline (markitdown)",
    category: "mcp-tools",
    difficulty: "Beginner",
    estimatedHours: 15,
    shortDesc: "Microsoft markitdown 기반 PDF/Office → Markdown 변환 + RAG 통합",
    longDesc: "Microsoft markitdown (125k stars)을 활용해 PDF, Word, PPT 등 문서를 Markdown으로 변환하는 파이프라인을 구축합니다. 변환된 문서를 RAG에 통합하는 미니 프로젝트.",
    whyItMatters: "markitdown은 Chat 3에서 강력 추천된 도구. 입문자가 빠르게 도구 활용 능력 보여줄 수 있음.",
    techStack: ["Python", "markitdown", "LangChain", "FastAPI"],
    datasets: ["임의 PDF/문서"],
    skills: ["Document parsing", "Tool integration", "API 구축"],
    steps: [
      { title: "markitdown 설치 & 테스트", desc: "다양한 형식 변환 검증" },
      { title: "Pipeline 구축", desc: "Folder watch → 자동 변환" },
      { title: "API 래퍼", desc: "FastAPI로 변환 endpoint 제공" },
      { title: "RAG 통합", desc: "변환된 MD를 vector DB에 자동 ingest" },
      { title: "데모", desc: "PDF 업로드 → 질의응답 demo" }
    ],
    resources: [
      { title: "Microsoft markitdown", url: "https://github.com/microsoft/markitdown" }
    ],
    forRole: ["Junior AI Engineer", "Data Engineer"],
    sourceFromChats: "Chat 3 · Img 6"
  },
];
