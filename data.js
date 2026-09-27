/* =========================================================
   PORTFOLIO CONTENT — edit everything here.
   Links marked "PLACEHOLDER" should be replaced with real ones.
   ========================================================= */
window.PORTFOLIO = {
  name: "MD Zahid",
  initials: "MZ",
  role: "Data Analyst · Applied AI",
  location: "Kolkata, India",
  timezone: "Asia/Kolkata",
  status: "Open to Data Analytics & AI roles",

  headline: {
    lead: "I turn messy data into",
    emphasis: "clear decisions",
    tail: "and ideas into working AI tools.",
  },
  intro:
    "Computer Science Engineering graduate working where data analytics meets applied AI. I build dashboards, models and LLM-powered tools that answer real business questions.",

  links: {
    email: "mdzeansari12@gmail.com",                     // PLACEHOLDER
    github: "https://github.com/zahid0511",                 // PLACEHOLDER
    linkedin: "https://www.linkedin.com/in/md-zahid-eqbal/",      // PLACEHOLDER
    resume: "Resume.html",                                // replace with a PDF path, e.g. "assets/MD_Zahid_Resume.pdf"
  },

  about: {
    pull:
      "What interests me most is how AI changes the way a business works: which decisions it speeds up, which ones it improves, and which ones still need a person.",
    paragraphs: [
      "I started in computer science because I liked systems. I stayed because of data: the moment a pile of rows turns into a pattern someone can act on. Since then I've focused on one question: how do you take AI out of the demo and put it to work on a real problem?",
      "My work sits between analysis and engineering. I clean and model data with SQL and Python, communicate it through Power BI, and increasingly use machine learning and large language models to automate the parts of analysis that used to take hours.",
    ],
    principles: [
      { k: "01", t: "Question first", d: "Start with the decision someone needs to make, not the dataset." },
      { k: "02", t: "Useful over impressive", d: "A simple model people trust beats a complex one nobody uses." },
      { k: "03", t: "Ship and measure", d: "Build it, put it in front of people, and learn from what happens." },
    ],
  },

  skills: [
    { name: "Python", cat: "Analysis", tools: ["Pandas", "NumPy", "Matplotlib", "Scikit-learn"], d: "My main tool for cleaning data, exploratory analysis, automation and building ML pipelines.", used: ["AI Sales Data Analyzer", "AI vs. Real Image Classification"] },
    { name: "SQL", cat: "Analysis", tools: ["MySQL", "PostgreSQL", "Joins & CTEs", "Window functions"], d: "Writing queries that reshape raw transactions into metrics: cohorts, segments, funnels and KPIs.", used: ["E-Commerce Order & Customer Analysis", "Hotel Business Management Database"] },
    { name: "Power BI", cat: "Visualisation", tools: ["DAX", "Power Query", "Data modelling"], d: "Interactive dashboards that let stakeholders explore the numbers themselves.", used: ["E-Commerce Order & Customer Analysis"] },
    { name: "Excel", cat: "Visualisation", tools: ["Pivot tables", "XLOOKUP", "Power Pivot", "Charts"], d: "Quick analysis, reconciliation and reporting, still the common language of most businesses.", used: ["E-Commerce Order & Customer Analysis"] },
    { name: "Data Analytics", cat: "Analysis", tools: ["EDA", "Statistics", "KPI design", "Storytelling"], d: "The full cycle from question to cleaning, analysis and insight, told in a way people can act on.", used: ["AI Sales Data Analyzer", "E-Commerce Order & Customer Analysis"] },
    { name: "Machine Learning", cat: "AI", tools: ["Scikit-learn", "TensorFlow", "Keras", "CNNs"], d: "Supervised models for classification and prediction, with careful evaluation and honest baselines.", used: ["AI vs. Real Image Classification"] },
    { name: "Generative AI", cat: "AI", tools: ["Prompt design", "RAG basics", "Streamlit"], d: "Using generative models to automate summaries, reports and exploratory analysis.", used: ["AI Sales Data Analyzer"] },
    { name: "LLMs", cat: "AI", tools: ["OpenAI API", "Gemini API", "LangChain"], d: "Connecting language models to structured data so non-technical users can ask questions in plain English.", used: ["AI Sales Data Analyzer"] },
  ],

  projects: [
    {
      id: "sales",
      title: "AI Sales Data Analyzer",
      kind: "AI",
      year: "2025",
      glyph: "bars",
      summary: "Upload a sales file and ask questions in plain English. The tool calculates KPIs, spots trends and writes a short narrative summary.",
      problem: "Small teams sit on sales spreadsheets but lack the time or SQL skills to get answers from them quickly.",
      approach: [
        "Automated cleaning and schema detection for uploaded CSV/Excel files with Pandas.",
        "Computed core KPIs (revenue, growth, top products, regional split) and generated charts on the fly.",
        "Connected an LLM to the cleaned data so users can ask plain-English questions and get grounded answers.",
        "Wrapped it all in a simple Streamlit interface anyone can use.",
      ],
      outcome: "Cuts routine sales reporting from a manual, spreadsheet-heavy task down to a few questions.",
      stack: ["Python", "Pandas", "LLM API", "Streamlit", "Matplotlib"],
      github: "https://github.com/zahid0511/AI_sales_data_analyzer",   // PLACEHOLDER
      demo: "",                                                      // optional live link
      image: "",                                                     // optional screenshot path
    },
    {
      id: "images",
      title: "AI vs. Real Image Classification",
      kind: "AI",
      year: "2025",
      glyph: "grid",
      summary: "A deep learning classifier that tells AI-generated images apart from real photographs.",
      problem: "Synthetic images are increasingly hard to spot by eye, which creates real risks for trust and misinformation.",
      approach: [
        "Trained on a labelled dataset of real and AI-generated images (e.g. CIFAKE).",
        "Built a CNN baseline, then compared it against transfer learning with a pretrained backbone.",
        "Used augmentation, early stopping and a held-out test set to avoid overfitting.",
        "Evaluated with a confusion matrix, precision/recall and error analysis on misclassified samples.",
      ],
      outcome: "A reproducible pipeline with clear evaluation that shows which visual cues the model relies on.",
      stack: ["Python", "TensorFlow", "Keras", "CNN", "Transfer learning"],
      github: "https://github.com/zahid0511/AI-VS-REAL", // PLACEHOLDER
      demo: "",
      image: "",
    },
    {
      id: "ecom",
      title: "E-Commerce Order & Customer Analysis",
      kind: "Analytics",
      year: "2024",
      glyph: "scatter",
      summary: "End-to-end analysis of orders, customers and delivery performance, delivered as an interactive Power BI dashboard.",
      problem: "An online store needed to understand who its best customers were, why orders were delayed, and where revenue came from.",
      approach: [
        "Modelled order, customer, product and payment tables and joined them in SQL.",
        "Segmented customers with RFM (recency, frequency, monetary) analysis.",
        "Analysed delivery times, cancellations and regional revenue patterns.",
        "Built an Excel dashboard with drill-downs for leadership and operations.",
      ],
      outcome: "Showed which customer segments and regions deserved attention, with a dashboard the team can refresh themselves.",
      stack: ["SQL", "Power BI", "DAX", "Excel"],
      github: "https://github.com/zahid0511/E-Commerce-order-and-customer-analysis", // PLACEHOLDER
      demo: "",
      image: "",
    },
    {
      id: "hotel",
      title: "Hotel Business Management Database",
      kind: "Database",
      year: "2024",
      glyph: "table",
      summary: "A normalised relational database for hotel operations: rooms, bookings, guests, staff and billing.",
      problem: "Hotel operations spread across spreadsheets lead to double bookings, billing errors and no reliable reporting.",
      approach: [
        "Designed the ER model and normalised the schema to 3NF.",
        "Implemented it in MySQL with constraints, indexes and referential integrity.",
        "Wrote stored procedures and triggers for bookings, check-ins and invoicing.",
        "Created reporting queries for occupancy, revenue per room and guest history.",
      ],
      outcome: "A single, consistent source of truth for daily operations and management reporting.",
      stack: ["MySQL", "ER modelling", "Normalisation", "Stored procedures"],
      github: "https://github.com/zahid0511/Hotel_business_management_database", // PLACEHOLDER
      demo: "",
      image: "",
    },
  ],

  timeline: [
    {
      type: "Training",
      period: "2025",
      title: "Data Analysis with Generative AI",
      org: "COE Kolkata",
      d: "Hands-on program covering the modern analytics workflow, from Python, SQL and Power BI to using generative AI to speed up analysis, reporting and insight generation.",
      tags: ["Python", "SQL", "Power BI", "Generative AI"],
    },
    {
      type: "Education",
      period: "2021 — 2025",                        // PLACEHOLDER years
      title: "B.Tech, Computer Science Engineering",
      org: "University Name, Kolkata",             // PLACEHOLDER
      d: "Foundations in data structures, algorithms, DBMS, operating systems and machine learning. Academic projects focused on data analysis and applied AI.",
      tags: ["DBMS", "Machine Learning", "Algorithms"],
    },
  ],
};
