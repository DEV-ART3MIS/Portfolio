export interface ProjectItem {
  title: string;
  description: string;
  year: string;
  link: string;
  image: string;
}

/** Stacked “Let’s connect” cards (same shape as `ArticleItem` in the UI component) */
export interface PortfolioArticleItem {
  url: string;
  title: string;
  subTitle: string;
  img: string;
}

export interface ExperienceRow {
  company: string;
  role: string;
  period: string;
  location: string;
}

export interface EducationRow {
  institution: string;
  degree: string;
  period: string;
  location: string;
}

/**
 * Featured project screenshots: add files under `public/images/projects/`.
 * URLs start at site root (Vite serves `public/` as `/`). Use .png, .jpg, or .webp — update the `image` string to match your filename.
 */
export const portfolioProjects: ProjectItem[] = [

  {
    title: "CampusBazaar – College Marketplace",
    description:
      "AI-powered college marketplace with Groq fair-price suggestions, Supabase Realtime chat, OAuth, and listings.",
    year: "2025",
    link: "https://github.com/oceanja/campus-bazaar",
    image: "/images/projects/campus-bazaar.png",
  },

  {
    title: "VedaAI — Assessment Creator",
    description:
      "Full-stack app for teachers: AI-generated exam papers with difficulty-tagged questions, answer keys, and PDF export.",
    year: "2026",
    link: "https://github.com/oceanja/vedaai-assessment-creator",
    image: "/images/projects/vedaai-assessment-creator.png",
  },

  {
    title: "Connect – Real-time Chat App",
    description:
      "MERN messaging with Socket.io, typing indicators, read receipts, presence, and persistent history.",
    year: "2025",
    link: "https://github.com/oceanja/chat-app-assignment",
    image: "/images/projects/connect-chat.png",
  },
  {
    title: "Email-Scheduler",
    description:
      "Redis-backed delayed jobs, workers, rate-limiting, Nodemailer SMTP, and delivery tracking.",
    year: "2025",
    link: "https://github.com/oceanja/email-scheduler",
    image: "/images/projects/email-scheduler.png",
  },
  {
    title: "URL Shortener System",
    description:
      "JWT auth, PostgreSQL schema, short links with expiry, analytics, and bcrypt-secured APIs.",
    year: "2024",
    link: "https://github.com/oceanja/url_shortner",
    image: "/images/projects/url-shortener.png",
  },
  {
    title: "StudyMate – AI Productivity App",
    description:
      "Summaries, notes, Supabase auth, and real-time task sync with modular workflows.",
    year: "2024",
    link: "https://github.com/oceanja/StudyMate",
    image: "/images/projects/studymate.png",
  },
  {
    title: "Live Polling System",
    description:
      "Teacher/student personas, Socket.io voting, refresh recovery, and DB-backed aggregation.",
    year: "2024",
    link: "https://github.com/oceanja/live-polling-system",
    image: "/images/projects/live-polling.png",
  },
  {
    title: "QueryBot — AI Voice Assistant",
    description:
      "Whisper speech-to-text, FAQ NLP, Streamlit UI, SQLite, and gTTS voice replies.",
    year: "2024",
    link: "https://github.com/oceanja/Simplotel-AI-Voice-Assistant_Assignment",
    image: "/images/projects/querybot.png",
  },
  {
    title: "Resume & JD Matcher",
    description:
      "Match score from resume vs JD, skill gaps, and improvement suggestions with OpenAI + PDF.js.",
    year: "2024",
    link: "https://github.com/oceanja/RESUME_MATCHER",
    image: "/images/projects/resume-jd-matcher.png",
  },
];

/** Sourced from portfolio-react (Experience.jsx) */
export const portfolioExperiences: ExperienceRow[] = [
  {
    company: "Bluestock Fintech",
    role: "Software Development Intern",
    period: "December 2025 – February 2026",
    location: "India",
  },
  {
    company: "Happieloop Technologies",
    role: "Frontend Developer Intern",
    period: "March 2026 – May 2026",
    location: "India",
  },
];

/** Sourced from portfolio-react (Education.jsx) */
export const portfolioEducation: EducationRow[] = [
  {
    institution: "Sanjivani College Of Engineering",
    degree: "B.Tech in Computer Engineering",
    period: "2022 – 2028",
    location: "Kopargaon",
  },
  {
    institution: "K.B.Rohmare College of Arts, Commerce and Science",
    degree: "Senior Secondary (HSC)",
    period: "2022 – 2024",
    location: "Kopargaon",
  },
  {
    institution: "Shri Sharda English Medium School",
    degree: "Secondary",
    period: "2010 – 2022",
    location: "Kopargaon",
  },
];

/** Sourced from portfolio-react (Contact.jsx) — stacked cards (4 slots) */
export const portfolioConnectArticles: PortfolioArticleItem[] = [
  {
    url: "mailto:Sarwadnyam@gmail.com",
    title: "Email",
    subTitle: "Sarwadnyam@gmail.com — projects, ideas, and collaborations.",
    img: "https://images.unsplash.com/photo-1603791445824-0050bd436b6d?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    url: "https://www.linkedin.com/in/sarwadnya-maile/",
    title: "LinkedIn",
    subTitle: "Professional profile, experience, and networking.",
    img: "https://images.unsplash.com/photo-1611944212129-29977ae1398c?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGlua2VkaW4lMjBpY29ufGVufDB8fDB8fHww",
  },
  {
    url: "https://github.com/DEV-ART3MIS",
    title: "GitHub",
    subTitle: "Repositories, open source, and code.",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT26-3joWhbPHeJUl9Ng6jqS2-IOaQLTIDjww&s",
  },
  {
    url: "https://leetcode.com/u/sarwadnya_051/",
    title: "Leetcode",
    subTitle: "Dive into the problem solving approaches and solutions",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ32IaMkR8b0siALPt0EgagCHxPWqKrEZUFog&s",
  },
];
