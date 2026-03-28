import React, { useState, useEffect } from "react";
const profilePic = 'https://ui-avatars.com/api/?name=Sultan+Ansari&background=0284c7&color=fff&size=200';
import { motion, AnimatePresence } from "framer-motion";
import { FaRobot } from "react-icons/fa";
import {
  FiGithub,
  FiLinkedin,
  FiMail,
  FiUser,
  FiCode,
  FiMail as FiContact,
  FiBook,
  FiBriefcase,
  FiMessageSquare,
  FiShoppingCart,
  FiDownload,
  FiCpu,
  FiGlobe,
  FiDatabase,
  FiCloud,
  FiSun,
  FiMoon,
  FiInfo,
  FiTerminal,
  FiLayers,
  FiServer
} from "react-icons/fi";

const Portfolio = () => {
  const [activeTab, setActiveTab] = useState("about");
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [activeSystem, setActiveSystem] = useState("core");
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [codeSnippets, setCodeSnippets] = useState([]);

  // Initialize code snippets - Changed to programming focused
  useEffect(() => {
    const snippets = [
      { id: 1, text: "function Component()", x: 10, y: 20, speed: 0.5 },
      { id: 2, text: "const dev = true", x: 85, y: 40, speed: 0.7 },
      { id: 3, text: "console.log('code')", x: 25, y: 70, speed: 0.4 },
      { id: 4, text: "async function fetch()", x: 70, y: 85, speed: 0.6 },
      { id: 5, text: "export default App", x: 45, y: 60, speed: 0.3 },
      { id: 6, text: "npm start", x: 15, y: 90, speed: 0.8 },
      { id: 7, text: "<div className='' />", x: 80, y: 15, speed: 0.5 },
      { id: 8, text: "const [state] = useState()", x: 60, y: 30, speed: 0.6 },
    ];
    setCodeSnippets(snippets);
  }, []);

  const socialLinks = {
    github: "https://github.com/ansarisultan",
    linkedin: "https://www.linkedin.com/in/SultanSAnsari",
    email: "mailto:Sultansalauddinansari490@gmail.com",
    resume: "https://drive.google.com/file/d/1XMK3p1IdSHIQSAX-iSLHdbr_x5MEbo8-/view?usp=drive_link",
  };

  const skillSystems = {
    core: [
      { name: "HTML5", level: 98, color: "bg-gradient-to-r from-orange-500 to-orange-600", icon: "</>" },
      { name: "CSS3", level: 95, color: "bg-gradient-to-r from-blue-400 to-blue-500", icon: "#" },
      { name: "JavaScript", level: 85, color: "bg-gradient-to-r from-yellow-400 to-yellow-500", icon: "{}" },
      { name: "React.js", level: 85, color: "bg-gradient-to-r from-blue-500 to-cyan-400", icon: "⚛" },
    ],
    styling: [
      { name: "Tailwind CSS", level: 95, color: "bg-gradient-to-r from-cyan-500 to-teal-400", icon: "🌀" },
      { name: "Figma", level: 75, color: "bg-gradient-to-r from-purple-500 to-pink-400", icon: "🎨" },
    ],
    backend: [
      { name: "Node.js", level: 75, color: "bg-gradient-to-r from-green-500 to-emerald-400", icon: "⬢" },
      { name: "Express.js", level: 70, color: "bg-gradient-to-r from-gray-400 to-gray-500", icon: "🚀" },
      { name: "MongoDB", level: 65, color: "bg-gradient-to-r from-emerald-500 to-green-400", icon: "🗄" },
    ],
    languages: [
      { name: "Python", level: 80, color: "bg-gradient-to-r from-yellow-500 to-blue-400", icon: "🐍" },
      { name: "Java", level: 70, color: "bg-gradient-to-r from-red-500 to-orange-400", icon: "☕" },
    ],
    tools: [
      { name: "Git/GitHub", level: 85, color: "bg-gradient-to-r from-gray-500 to-gray-600", icon: "📦" },
      {
        name: "Netlify",
        level: 90,
        color: "bg-gradient-to-r from-blue-400 to-cyan-500",
        icon: "🚀"
      },
      {
        name: "Render",
        level: 85,
        color: "bg-gradient-to-r from-purple-500 to-pink-500",
        icon: "⚙️"
      },

    ],
    "gen-ai": [
      {
        name: "Generative AI",
        level: 80,
        color: "bg-gradient-to-r from-purple-500 to-pink-500",
        icon: "🤖"
      },
      {
        name: "OpenAI API",
        level: 85,
        color: "bg-gradient-to-r from-green-500 to-emerald-500",
        icon: "⚡"
      },
      {
        name: "Prompt Engineering",
        level: 82,
        color: "bg-gradient-to-r from-blue-500 to-cyan-500",
        icon: "💬"
      },
      {
        name: "AI Image Generation",
        level: 75,
        color: "bg-gradient-to-r from-indigo-500 to-purple-500",
        icon: "🎨"
      },
      {
        name: "LangChain",
        level: 70,
        color: "bg-gradient-to-r from-yellow-500 to-orange-500",
        icon: "⛓️"
      },
      {
        name: "Vector Databases",
        level: 65,
        color: "bg-gradient-to-r from-gray-600 to-gray-800",
        icon: "🗃️"
      },
    ],

    "cybersecurity": [
      {
        name: "Network Security",
        level: 75,
        color: "bg-gradient-to-r from-red-500 to-pink-500",
        icon: "🛡️"
      },

      {
        name: "Cryptography",
        level: 68,
        color: "bg-gradient-to-r from-yellow-600 to-amber-500",
        icon: "🔐"
      },

      {
        name: "Security Protocols",
        level: 72,
        color: "bg-gradient-to-r from-green-600 to-teal-500",
        icon: "🔒"
      },
      {
        name: "Risk Assessment",
        level: 65,
        color: "bg-gradient-to-r from-orange-500 to-red-600",
        icon: "📊"
      },
    ],

    "cloud-tools": [
      {
        name: "Google Cloud Fundamentals",
        level: 75,
        color: "bg-gradient-to-r from-orange-500 to-yellow-500",
        icon: "☁️"
      },



    ],

  };

  const aboutSultan = {
    passion: "Transforming ideas into intelligent, scalable experiences through Funclexa—where modern web development meets AI-driven innovation.",
    philosophy: "Every line of code is a building block, every Funclexa project a step toward meaningful, user-centric digital solutions.",

    specialties: [
      "Full-Stack MERN Development",
      "AI-Integrated Web Applications",
      "Modern UI/UX with React & Tailwind",
      "Scalable & Clean Code Architecture",
      "Real-Time Systems (Socket.IO)",
      "Gen AI"
    ],

    vision: "Building the next generation of intelligent web applications through Funclexa—where clean architecture, AI, and beautiful design work in harmony.",
    funFacts: [
      "Started coding at the age of 12 and never looked back",
      "Thinks in components and designs in systems",
      "Can spend hours perfecting a single UI interaction",
      "Believes real learning happens while building real projects"
    ]

  };

  const ongoingProjects = [
    {
      name: "Flexa Advanced Virtual  Assistant",
      description: "Flexa Advanced Virtual  Assistant",
      longDescription: "Flexa is an advanced virtual assistant designed to deliver intelligent, natural, and context-aware interactions across web applications. Powered by large language models, Flexa supports voice and text conversations, multilingual understanding, and real-time task automation. It can answer complex queries, assist users with workflows, integrate with web services, and adapt responses based on context and user intent. Built with a scalable, modular architecture, Flexa combines AI reasoning, automation logic, and seamless UI integration to create a responsive, human-like assistant suitable for real-world applications and modern digital ecosystems.",
      demoLink: "https://flexaai-funclexa.vercel.app/", // Add demo link
      githubLink: "https://github.com/ansarisultan/FLexa", // Add GitHub link
      tech: ["React.js", "LLM", "OpenAI API", "NLP", "CSS"],
      icon: <FaRobot className="text-2xl" />,
      status: "Active Development",
      progress: 95,
    },
    {
      name: "LexaChat AI",
      status: "Active Development",
      description:
        "An intelligent AI-powered virtual assistant designed for developers, learners, and productivity-focused users.",
      longDescription:
        "LexaChat AI is a flagship project under the FuncLexa ecosystem. It features a fast, responsive, and futuristic chat interface focused on clarity, speed, and real-world usability. Built with modern frontend architecture, it demonstrates scalable UI design, clean component structure, and seamless API-based AI integration.",
      demoLink: "https://lexachat-funclexa.vercel.app",
      githubLink: "https://github.com/ansarisultan/lexachat",
      progress: 80,
      icon: <FiCpu className="text-3xl" />,
      tech: [
        "React",
        "Vite",
        "Tailwind CSS",
        "JavaScript",
        "API Integration",
        "AI Assistant"
      ]
    }
    ,
    {
      name: "FuncLexa web  Chat Platform",
      description: "Real-time encrypted messaging",
      longDescription: "Enterprise-grade real-time messaging platform with end-to-end encryption using AES-256. Features include group video calls with WebRTC, message encryption with user-owned keys, AI-powered content moderation, sentiment analysis for conversations, and cross-platform synchronization. Includes admin dashboard for user management and analytics.",
      demoLink: "https://funcwebchat.netlify.app", // Add demo link
      githubLink: "https://github.com/ansarisultan/", // Add GitHub link
      tech: ["React", "WebSockets", "Firebase", "NLP", "Socket.io"],
      icon: <FiMessageSquare className="text-2xl" />,
      status: "Beta Testing",
      progress: 50,
    },
  ];

  const education = [
    {
      institution: "Presidency University Bangalore",
      degree: "B.Tech in Computer Science",
      year: "2024 - 2028",
      description: "Specializing in Web Development and Software Engineering",
      courses: [
        "Data Structures & Algorithms",
        "Database Management Systems",
        "Web Development",
        "Operating Systems",
        "Computer Networks"
      ]
    }
  ];

  const internships = [
    {
      company: "Edunet IBM Virtual Internship Program",
      position: "Web Developer Intern",
      duration: "1 month",
      responsibilities: [
        "Learned frontend fundamentals using HTML, CSS, and JavaScript during the Edunet Foundation internship.",
        "Designed and developed a responsive personal blog website from scratch.",
        "Optimized performance and accessibility"
      ],
      skillsGained: ["Modern Web Development", "UI/UX Implementation", "API Integration", "Problem Solving"]
    }
  ];

  const tabVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.2
      }
    },
  };

  // Floating code snippets component
  const FloatingCodeSnippets = () => (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {codeSnippets.map((snippet) => (
        <motion.div
          key={snippet.id}
          className="absolute text-xs font-mono text-cyan-400/20 dark:text-cyan-400/10"
          style={{
            left: `${snippet.x}%`,
            top: `${snippet.y}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 3 + snippet.speed,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {snippet.text}
        </motion.div>
      ))}
    </div>
  );

  return (
    <div className={`min-h-screen overflow-hidden transition-colors duration-500 ${isDarkMode
      ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white'
      : 'bg-gradient-to-br from-cyan-50 via-blue-50 to-gray-100 text-gray-900'
      } p-6`}>
      {/* Floating Code Snippets */}
      <FloatingCodeSnippets />

      {/* Header with Theme Toggle */}
      <motion.header
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, type: "spring" }}
        className="mb-8 relative z-10"
      >
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className={`text-4xl font-bold bg-gradient-to-r ${isDarkMode
              ? 'from-blue-400 to-cyan-300'
              : 'from-blue-600 to-cyan-500'
              } bg-clip-text text-transparent`}>
              <span className="flex items-center gap-2">
                <FiCode className={isDarkMode ? "text-cyan-400" : "text-blue-500"} />
                Sultan Salauddin Ansari
              </span>
            </h1>
            <p className={`mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Full-Stack Developer | Modern Web Specialist
            </p>
          </div>

          {/* Theme Toggle Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`p-3 rounded-full ${isDarkMode
              ? 'bg-gray-800 hover:bg-gray-700'
              : 'bg-white hover:bg-gray-100 shadow-md'
              } transition-colors`}
          >
            {isDarkMode ? (
              <FiSun className="text-yellow-400" size={20} />
            ) : (
              <FiMoon className="text-blue-600" size={20} />
            )}
          </motion.button>
        </div>

        {/* Futuristic Navigation */}
        <div className="flex flex-wrap gap-3 mt-6">
          {[
            { id: "about", label: "About Me", icon: <FiInfo /> },
            { id: "portfolio", label: "Developer Profile", icon: <FiUser /> },
            { id: "projects", label: "My Projects", icon: <FiCode /> },
            { id: "contact", label: "Contact", icon: <FiContact /> }
          ].map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-5 py-3 rounded-lg flex items-center gap-2 transition-all ${activeTab === tab.id
                ? isDarkMode
                  ? "bg-gradient-to-r from-blue-600 to-cyan-500 shadow-lg shadow-cyan-500/20"
                  : "bg-gradient-to-r from-blue-500 to-cyan-400 shadow-lg shadow-blue-500/20 text-white"
                : isDarkMode
                  ? "bg-gray-800 hover:bg-gray-700"
                  : "bg-white hover:bg-gray-100 shadow-sm"
                }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
              {activeTab === tab.id && (
                <div className={`ml-2 w-2 h-2 rounded-full animate-pulse ${isDarkMode ? "bg-cyan-300" : "bg-blue-400"
                  }`}></div>
              )}
            </motion.button>
          ))}
        </div>
      </motion.header>

      <AnimatePresence mode="wait">
        {/* About Sultan Tab */}
        {activeTab === "about" && (
          <motion.div
            key="about"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={tabVariants}
            className="space-y-8 relative z-10"
          >
            {/* Hero Section */}
            <div className={`p-8 rounded-2xl backdrop-blur-sm border ${isDarkMode
              ? 'bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-gray-700/50'
              : 'bg-gradient-to-br from-white/80 to-blue-50/80 border-blue-200/50'
              }`}>
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="relative">
                  <img
                    src={profilePic}
                    alt="Sultan Salauddin Ansari"
                    className="w-48 h-48 rounded-full object-cover border-4 border-transparent bg-gradient-to-r from-blue-500 to-cyan-400 p-0.5"
                  />
                  <div className={`absolute -inset-4 border-2 rounded-full animate-spin-slow ${isDarkMode ? 'border-cyan-500/30' : 'border-blue-400/30'
                    }`}></div>
                </div>
                <div className="flex-1">
                  <h2 className={`text-4xl font-bold mb-4 ${isDarkMode ? 'text-cyan-300' : 'text-blue-600'
                    }`}>
                    The Mind Behind The FuncLexa
                  </h2>
                  <div className={`p-6 rounded-xl ${isDarkMode ? 'bg-gray-900/50 border-gray-700' : 'bg-white/50 border-blue-100'
                    } border`}>
                    <p className="text-lg leading-relaxed mb-4">
                      <span className={`font-semibold ${isDarkMode ? 'text-cyan-400' : 'text-blue-500'}`}>
                        "Hello World!" I'm Sultan
                      </span>{" "}
                      — a builder by mindset and a technologist by passion, who started coding at the age of 12 and never stopped learning.
                      I don't just write code; I design systems, build intelligent products, and turn ideas into real-world solutions.
                      Through projects like <span className="font-semibold">Funclexa</span>, I explore the intersection of full-stack development,
                      AI, and real-time technology—constantly pushing boundaries, refining my craft, and building with purpose.
                    </p>

                    <p className="leading-relaxed">
                      Through <span className="font-semibold">Funclexa</span>, my flagship project ecosystem, I build and experiment with
                      real-world applications ranging from AI-powered assistants and real-time web apps to full-stack MERN platforms.
                      Each Funclexa project is crafted with a focus on performance, intelligence, and user experience—where clean design
                      meets scalable architecture, and ideas evolve into impactful digital solutions.
                    </p>

                  </div>
                </div>
              </div>
            </div>

            {/* Passion & Philosophy */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Passion Card */}
              <div className={`p-6 rounded-xl ${isDarkMode
                ? 'bg-gradient-to-br from-blue-900/20 to-cyan-900/20 border-blue-700/30'
                : 'bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200'
                } border backdrop-blur-sm`}>
                <div className="flex items-center gap-3 mb-4">
                  <FiCpu className={isDarkMode ? "text-cyan-400" : "text-blue-500"} size={24} />
                  <h3 className="text-2xl font-bold">Core Passion</h3>
                </div>
                <p className="text-lg italic mb-6">
                  "{aboutSultan.passion}"
                </p>
                <div className="space-y-4">
                  <h4 className={`font-semibold ${isDarkMode ? 'text-cyan-300' : 'text-blue-600'}`}>
                    Specialties:
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {aboutSultan.specialties.map((specialty, index) => (
                      <span key={index} className={`px-4 py-2 rounded-full text-sm font-medium ${isDarkMode
                        ? 'bg-blue-900/50 text-cyan-300 border border-blue-700/50'
                        : 'bg-blue-100 text-blue-700 border border-blue-200'
                        }`}>
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Philosophy Card */}
              <div className={`p-6 rounded-xl ${isDarkMode
                ? 'bg-gradient-to-br from-purple-900/20 to-pink-900/20 border-purple-700/30'
                : 'bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200'
                } border backdrop-blur-sm`}>
                <div className="flex items-center gap-3 mb-4">
                  <FiTerminal className={isDarkMode ? "text-purple-400" : "text-purple-500"} size={24} />
                  <h3 className="text-2xl font-bold">Development Philosophy</h3>
                </div>
                <blockquote className="text-lg italic mb-6">
                  "{aboutSultan.philosophy}"
                </blockquote>
                <div className="space-y-4">
                  <h4 className={`font-semibold ${isDarkMode ? 'text-purple-300' : 'text-purple-600'}`}>
                    Vision:
                  </h4>
                  <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {aboutSultan.vision}
                  </p>
                </div>
              </div>
            </div>

            {/* Fun Facts */}
            <div className={`p-8 rounded-2xl ${isDarkMode
              ? 'bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-gray-700/50'
              : 'bg-gradient-to-br from-white/80 to-gray-50/80 border-gray-200/50'
              } border backdrop-blur-sm`}>
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <FiGlobe className={isDarkMode ? "text-green-400" : "text-green-500"} />
                Fun Facts & Developer Quirks
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {aboutSultan.funFacts.map((fact, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    className={`p-4 rounded-lg text-center ${isDarkMode
                      ? 'bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700'
                      : 'bg-white border-gray-200'
                      } border shadow-sm`}
                  >
                    <div className={`text-2xl mb-2 ${index % 4 === 0 ? 'text-blue-400' :
                      index % 4 === 1 ? 'text-purple-400' :
                        index % 4 === 2 ? 'text-green-400' : 'text-yellow-400'
                      }`}>
                      {['⚡', '🚀', '💡', '🎯'][index % 4]}
                    </div>
                    <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                      {fact}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Code Journey */}
            <div className={`p-8 rounded-2xl backdrop-blur-sm border ${isDarkMode
              ? 'bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-gray-700/50'
              : 'bg-gradient-to-br from-white/80 to-blue-50/80 border-blue-200/50'
              }`}>
              <h3 className={`text-3xl font-bold mb-8 flex items-center gap-3 ${isDarkMode ? 'text-cyan-300' : 'text-blue-600'
                }`}>
                <FiTerminal className={isDarkMode ? "text-cyan-400" : "text-blue-500"} />
                The Code Odyssey: From ADCA to AI
              </h3>

              <div className={`p-6 rounded-xl mb-6 ${isDarkMode ? 'bg-gray-900/30 border-gray-700' : 'bg-white/30 border-blue-100'
                } border`}>
                <p className="leading-relaxed">
                  My name is{" "}
                  <span
                    className={`font-semibold ${isDarkMode ? "text-cyan-300" : "text-blue-600"
                      }`}
                  >
                    Sultan Salauddin Ansari
                  </span>
                  , and my journey with technology began at a very young age. I started exploring
                  computers early on, and by the age of{" "}
                  <span
                    className={`px-2 py-1 rounded-full ${isDarkMode
                      ? "bg-cyan-900/50 text-cyan-300"
                      : "bg-cyan-100 text-cyan-700"
                      }`}
                  >
                    12
                  </span>
                  , I had already started coding. What began as curiosity soon transformed into
                  passion, and that passion eventually became discipline. Over time, this mindset
                  evolved into a strong focus on building real-world applications, crafting clean
                  interfaces, and developing scalable systems through projects like{" "}
                  <span className="font-semibold">Funclexa</span>, where ideas are transformed into
                  intelligent, user-centric digital experiences.
                </p>

              </div>

              {/* Early Years Card */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div className={`p-6 rounded-xl ${isDarkMode
                  ? 'bg-gradient-to-br from-blue-900/20 to-cyan-900/20 border-blue-700/30'
                  : 'bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200'
                  } border backdrop-blur-sm`}>
                  <h4 className={`text-xl font-bold mb-4 flex items-center gap-2 ${isDarkMode ? 'text-blue-300' : 'text-blue-700'
                    }`}>
                    <span className={`px-3 py-1 rounded-full text-sm ${isDarkMode ? 'bg-blue-900/50 text-blue-300' : 'bg-blue-100 text-blue-700'
                      }`}>
                      ADCA Certified
                    </span>
                  </h4>
                  <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                    Even before reaching class 8, I was deeply interested in understanding how systems work. In class 8, I completed{" "}
                    <span className={`font-semibold ${isDarkMode ? 'text-cyan-300' : 'text-blue-500'}`}>
                      ADCA (Advanced Diploma in Computer Applications)
                    </span>, where I gained hands-on experience with MS Office, databases, basic programming, and design tools like CorelDRAW.
                  </p>
                </div>

                <div className={`p-6 rounded-xl ${isDarkMode
                  ? 'bg-gradient-to-br from-purple-900/20 to-pink-900/20 border-purple-700/30'
                  : 'bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200'
                  } border backdrop-blur-sm`}>
                  <h4 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-purple-300' : 'text-purple-700'
                    }`}>
                    Tech Stack Evolution
                  </h4>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {[
                      "C",
                      "Python",
                      "Java",
                      "HTML",
                      "CSS",
                      "JavaScript",
                      "React",
                      "Node.js",
                      "Express",
                      "MongoDB",
                      "Tailwind CSS",
                      "Socket.IO",
                      "REST APIs",
                      "LLMs (Groq, Gemini, OpenAI APIs)",
                      "Prompt Engineering",
                      "AI Integration in Web Apps"
                    ]
                      .map((tech, i) => (
                        <span key={i} className={`px-3 py-1 rounded-lg text-sm ${isDarkMode
                          ? 'bg-gray-800 text-gray-300 border border-gray-700'
                          : 'bg-white text-gray-700 border border-gray-200 shadow-sm'
                          }`}>
                          {tech}
                        </span>
                      ))}
                  </div>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>

                  </p>
                </div>
              </div>

              {/* Funclexa Showcase */}
              <div
                className={`p-8 rounded-2xl mb-8 ${isDarkMode
                  ? "bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700"
                  : "bg-gradient-to-r from-white to-gray-50 border border-gray-200"
                  }`}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div
                    className={`p-3 rounded-lg ${isDarkMode ? "bg-cyan-900/50" : "bg-cyan-100"
                      }`}
                  >
                    <FiCpu
                      className={isDarkMode ? "text-cyan-400" : "text-cyan-600"}
                      size={32}
                    />
                  </div>
                  <div>
                    <h4
                      className={`text-2xl font-bold ${isDarkMode ? "text-cyan-300" : "text-cyan-700"
                        }`}
                    >
                      Funclexa:  AI-Powered Identity
                    </h4>
                    <p
                      className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                    >
                      Flagship ecosystem spanning Full-Stack, AI, LLMs & real-time systems
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <p className={isDarkMode ? "text-gray-300" : "text-gray-700"}>
                    One of the most defining milestones in my journey is{" "}
                    <span
                      className={`font-bold ${isDarkMode ? "text-cyan-400" : "text-cyan-600"
                        }`}
                    >
                      Funclexa
                    </span>
                    , my flagship project ecosystem and personal developer identity. Funclexa
                    represents my evolution across frontend, backend, AI, LLM integration, and
                    real-time architectures—where ideas are transformed into intelligent,
                    scalable products.
                  </p>

                  <div
                    className={`p-4 rounded-lg ${isDarkMode ? "bg-gray-800/50" : "bg-gray-50"
                      }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div
                        className={`w-2 h-2 rounded-full ${isDarkMode ? "bg-green-400 animate-pulse" : "bg-green-500"
                          }`}
                      ></div>
                      <span
                        className={`font-semibold ${isDarkMode ? "text-green-400" : "text-green-600"
                          }`}
                      >
                        FLexa — AI Voice Assistant
                      </span>
                    </div>
                    <p
                      className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                    >
                      LLM-powered conversational intelligence with voice input/output,
                      multilingual support, automation workflows, and real-world usability
                      using modern AI APIs.
                    </p>
                  </div>

                  <p
                    className={`italic ${isDarkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                  >
                    “Funclexa is not just a project—it’s my playground for innovation, my proof
                    of learning, and my vision for building intelligent, user-first digital
                    systems.”
                  </p>
                </div>
              </div>


              {/* Certifications Grid */}
              <div className="mb-8">
                <h4
                  className={`text-2xl font-bold mb-6 ${isDarkMode ? "text-cyan-300" : "text-blue-600"
                    }`}
                >
                  Neural Credentials & Certifications
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    {
                      title: "Oracle Generative AI Professional",
                      issuer: "Oracle",
                      color: isDarkMode
                        ? "from-blue-900/30 to-blue-700/20"
                        : "from-blue-50 to-red-100",
                      textColor: isDarkMode ? "text-blue-300" : "text-red-700",
                    },
                    {
                      title: "Oracle APEX Cloud Developer",
                      issuer: "Oracle",
                      color: isDarkMode
                        ? "from-red-900/30 to-blue-700/20"
                        : "from-blue-50 to-red-100",
                      textColor: isDarkMode ? "text-blue-300" : "text-red-700",
                    },
                    {
                      title: "IBM Cybersecurity Fundamentals ",
                      issuer: "IBM",
                      color: isDarkMode
                        ? "from-blue-900/30 to-blue-700/20"
                        : "from-blue-50 to-blue-100",
                      textColor: isDarkMode ? "text-blue-300" : "text-blue-700",
                    },
                    {
                      title: "Frontend Development eudnet - IBM  (intership)",
                      issuer: "IBM",
                      color: isDarkMode
                        ? "from-blue-900/30 to-green-700/20"
                        : "from-blue-50 to-bllue-100",
                      textColor: isDarkMode ? "text-blue-300" : "text-red-700",
                    },
                  ].map((cert, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-xl bg-gradient-to-br ${cert.color} border ${isDarkMode ? "border-gray-700" : "border-gray-200"
                        }`}
                    >
                      <h5 className={`font-bold mb-2 ${cert.textColor}`}>
                        {cert.title}
                      </h5>
                      <div className="flex justify-between items-center">
                        <span
                          className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"
                            }`}
                        >
                          {cert.issuer}
                        </span>
                        <span
                          className={`px-2 py-1 rounded text-xs ${isDarkMode
                            ? "bg-gray-800 text-gray-300"
                            : "bg-white text-gray-700"
                            }`}
                        >
                          ✓ Verified
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div
                  className={`mt-4 p-4 rounded-lg text-center ${isDarkMode ? "bg-gray-800/50" : "bg-gray-100"
                    }`}
                >
                  <p className={isDarkMode ? "text-gray-300" : "text-gray-700"}>
                    Backed by{" "}
                    <span
                      className={`font-bold ${isDarkMode ? "text-cyan-400" : "text-blue-600"
                        }`}
                    >
                      20+ verified certifications
                    </span>{" "}
                    across AI, Cloud, Cybersecurity, and Full-Stack development from{" "}
                    <span
                      className={`font-semibold ${isDarkMode ? "text-cyan-300" : "text-blue-500"
                        }`}
                    >
                      Google, Microsoft, Oracle,& JOB SIMULATIONS Accenture, TATA, Deloitte, Walmart
                    </span>
                    .
                  </p>
                </div>
              </div>


              {/* Vision Statement */}
              <div className={`p-6 rounded-xl ${isDarkMode
                ? 'bg-gradient-to-r from-cyan-900/20 to-blue-900/20 border-cyan-700/30'
                : 'bg-gradient-to-r from-cyan-50 to-blue-50 border-cyan-200'
                } border`}>
                <h4 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-cyan-300' : 'text-cyan-700'
                  }`}>
                  The Path Forward
                </h4>
                <p className={`text-lg leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Today, as a Computer Science and Engineering student, I view my journey not as a
                  fixed destination but as a constantly evolving path that began when I started
                  coding at the age of <span className="font-semibold">12</span>. From experimenting
                  with code in my early years to earning industry-recognized certifications and
                  building advanced projects like <span className="font-semibold">Funclexa</span>,
                  every stage has strengthened my skills and mindset. I am driven to grow into a
                  highly capable full-stack developer and future AI engineer, focused on creating
                  meaningful, intelligent technology while consistently challenging myself to
                  learn, build, and improve with clarity and purpose.
                </p>

                <div className="flex items-center gap-3 mt-6">
                  <div className={`w-3 h-3 rounded-full ${isDarkMode ? 'bg-cyan-400 animate-pulse' : 'bg-cyan-500'
                    }`}></div>
                  <span className={`text-sm ${isDarkMode ? 'text-cyan-300' : 'text-cyan-600'}`}>
                    Status: Building the future, one line of code at a time
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Portfolio Tab */}
        {activeTab === "portfolio" && (
          <motion.div
            key="portfolio"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={tabVariants}
            className="space-y-8 relative z-10"
          >
            {/* Developer Profile Section */}
            <div className={`p-8 rounded-2xl backdrop-blur-sm border ${isDarkMode
              ? 'bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-gray-700/50'
              : 'bg-gradient-to-br from-white/80 to-blue-50/80 border-blue-200/50'
              }`}>
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="relative">
                  <img
                    src={profilePic}
                    alt="Profile"
                    className="w-40 h-40 rounded-full object-cover border-4 border-transparent bg-gradient-to-r from-blue-500 to-cyan-400 p-0.5"
                  />
                  <div className={`absolute -inset-2 border-2 rounded-full animate-spin-slow ${isDarkMode ? 'border-cyan-500/30' : 'border-blue-400/30'
                    }`}></div>
                </div>
                <div className="flex-1">
                  <h2 className={`text-3xl font-bold mb-4 flex items-center gap-2 ${isDarkMode ? 'text-cyan-300' : 'text-blue-600'
                    }`}>
                    <FiUser className={isDarkMode ? "text-cyan-400" : "text-blue-500"} />
                    Developer Profile
                  </h2>
                  <div className={`p-4 rounded-lg border ${isDarkMode ? 'bg-gray-900/50 border-gray-700' : 'bg-white/50 border-blue-100'
                    }`}>
                    <p className="leading-relaxed mb-3">
                      <span
                        className={`font-semibold ${isDarkMode ? "text-cyan-400" : "text-blue-500"
                          }`}
                      >
                        Hi, I'm Sultan Salauddin Ansari
                      </span>{" "}
                      — a full-stack developer and AI enthusiast focused on building intelligent,
                      scalable web applications with clean architecture and real-world impact.
                    </p>
                    <p className="leading-relaxed">
                      This portfolio represents my evolution as a technologist, featuring flagship
                      projects like <span className="font-semibold">Funclexa</span>, AI-powered
                      systems, real-time applications, and modern interfaces built with React,
                      Tailwind CSS, and production-grade development practices.
                    </p>

                  </div>
                  <motion.a
                    href={socialLinks.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`inline-flex items-center mt-6 px-6 py-3 rounded-lg transition-all shadow-lg ${isDarkMode
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 shadow-blue-500/20'
                      : 'bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 shadow-blue-500/20 text-white'
                      }`}
                  >
                    <FiDownload className="mr-3" />
                    Download Resume
                  </motion.a>
                </div>
              </div>
            </div>

            {/* Skills Matrix */}
            <div className={`p-8 rounded-2xl backdrop-blur-sm border ${isDarkMode
              ? 'bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-gray-700/50'
              : 'bg-gradient-to-br from-white/80 to-blue-50/80 border-blue-200/50'
              }`}>
              <h2 className={`text-3xl font-bold mb-8 flex items-center gap-2 ${isDarkMode ? 'text-cyan-300' : 'text-blue-600'
                }`}>
                <FiDatabase className={isDarkMode ? "text-cyan-400" : "text-blue-500"} />
                Skills Matrix
              </h2>

              {/* Skill System Selection */}
              <div className="flex flex-wrap gap-3 mb-8">
                {Object.keys(skillSystems).map((system) => (
                  <button
                    key={system}
                    onClick={() => setActiveSystem(system)}
                    className={`px-4 py-2 rounded-lg capitalize transition-all ${activeSystem === system
                      ? isDarkMode
                        ? "bg-cyan-600 text-white"
                        : "bg-blue-500 text-white"
                      : isDarkMode
                        ? "bg-gray-800 hover:bg-gray-700"
                        : "bg-white hover:bg-gray-100 shadow-sm"
                      }`}
                  >
                    {system} Skills
                  </button>
                ))}
              </div>

              {/* Skills Visualization */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {skillSystems[activeSystem].map((skill) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`p-4 rounded-xl border ${isDarkMode ? 'bg-gray-900/50 border-gray-700/50' : 'bg-white/50 border-blue-100'
                      }`}
                    onMouseEnter={() => setHoveredSkill(skill.name)}
                    onMouseLeave={() => setHoveredSkill(null)}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{skill.icon}</span>
                        <span className="font-medium">{skill.name}</span>
                      </div>
                      <span className={`font-mono ${isDarkMode ? 'text-cyan-400' : 'text-blue-500'
                        }`}>
                        {hoveredSkill === skill.name ? `${skill.level}%` : "•••"}
                      </span>
                    </div>
                    <div className={`w-full rounded-full h-3 overflow-hidden ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'
                      }`}>
                      <motion.div
                        className={`${skill.color} h-3 rounded-full`}
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                      />
                    </div>
                    <div className="flex justify-between mt-2 text-sm">
                      <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                        Proficiency
                      </span>
                      <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                        Mastery
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Education & Internship Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Education */}
              <div className={`p-8 rounded-2xl backdrop-blur-sm border ${isDarkMode
                ? 'bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-gray-700/50'
                : 'bg-gradient-to-br from-white/80 to-blue-50/80 border-blue-200/50'
                }`}>
                <h2 className={`text-2xl font-bold mb-6 flex items-center gap-2 ${isDarkMode ? 'text-cyan-300' : 'text-blue-600'
                  }`}>
                  <FiBook className={isDarkMode ? "text-cyan-400" : "text-blue-500"} />
                  Education
                </h2>
                {education.map((edu, index) => (
                  <div key={index} className="space-y-4">
                    <div>
                      <h3 className={`text-xl font-semibold bg-gradient-to-r ${isDarkMode ? 'from-blue-400 to-cyan-300' : 'from-blue-600 to-cyan-500'
                        } bg-clip-text text-transparent`}>
                        {edu.institution}
                      </h3>
                      <div className="flex items-center mt-2">
                        <span className={`px-3 py-1 rounded-full text-sm ${isDarkMode
                          ? 'bg-blue-500/20 text-blue-300'
                          : 'bg-blue-100 text-blue-700'
                          }`}>
                          {edu.degree}
                        </span>
                        <span className={`mx-3 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>|</span>
                        <span className={isDarkMode ? 'text-cyan-400' : 'text-blue-500'}>
                          {edu.year}
                        </span>
                      </div>
                    </div>
                    <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                      {edu.description}
                    </p>
                    <div>
                      <h4 className={`font-medium mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                        Key Courses:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {edu.courses.map((course, i) => (
                          <span key={i} className={`px-3 py-1 rounded-lg text-sm border ${isDarkMode
                            ? 'bg-gray-800 border-gray-700'
                            : 'bg-white border-gray-200'
                            }`}>
                            {course}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Internship */}
              <div className={`p-8 rounded-2xl backdrop-blur-sm border ${isDarkMode
                ? 'bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-gray-700/50'
                : 'bg-gradient-to-br from-white/80 to-purple-50/80 border-purple-200/50'
                }`}>
                <h2 className={`text-2xl font-bold mb-6 flex items-center gap-2 ${isDarkMode ? 'text-cyan-300' : 'text-purple-600'
                  }`}>
                  <FiBriefcase className={isDarkMode ? "text-cyan-400" : "text-purple-500"} />
                  Internship
                </h2>
                {internships.map((internship, index) => (
                  <div key={index} className="space-y-4">
                    <div>
                      <h3 className="text-xl font-semibold">{internship.company}</h3>
                      <div className="flex items-center mt-2">
                        <span className={`px-3 py-1 rounded-full text-sm ${isDarkMode
                          ? 'bg-purple-500/20 text-purple-300'
                          : 'bg-purple-100 text-purple-700'
                          }`}>
                          {internship.position}
                        </span>
                        <span className={`mx-3 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>|</span>
                        <span className={isDarkMode ? 'text-cyan-400' : 'text-purple-500'}>
                          {internship.duration}
                        </span>
                      </div>
                    </div>
                    <div>
                      <h4 className={`font-medium mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                        Responsibilities:
                      </h4>
                      <ul className="space-y-2">
                        {internship.responsibilities.map((item, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <div className={`w-2 h-2 rounded-full mt-2 ${isDarkMode ? 'bg-cyan-400' : 'bg-blue-400'
                              }`}></div>
                            <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className={`font-medium mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                        Skills Gained:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {internship.skillsGained.map((skill, i) => (
                          <span key={i} className={`px-3 py-1 rounded-lg text-sm border ${isDarkMode
                            ? 'bg-gradient-to-r from-gray-800 to-gray-900 border-gray-700'
                            : 'bg-gradient-to-r from-gray-50 to-white border-gray-200'
                            }`}>
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Projects Tab */}
        {activeTab === "projects" && (
          <motion.div
            key="projects"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={tabVariants}
            className="space-y-8"
          >
            <div className={`p-8 rounded-2xl backdrop-blur-sm border ${isDarkMode
              ? 'bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-gray-700/50'
              : 'bg-gradient-to-br from-white/80 to-blue-50/80 border-blue-200/50'
              }`}>
              <h2 className={`text-3xl font-bold mb-8 flex items-center gap-2 ${isDarkMode ? 'text-cyan-300' : 'text-blue-600'
                }`}>
                <FiGlobe className={isDarkMode ? "text-cyan-400" : "text-blue-500"} />
                FuncLexa Projects
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {ongoingProjects.map((project, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className={`p-6 rounded-xl border transition-all group ${isDarkMode
                      ? 'bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700/50 hover:border-cyan-500/30'
                      : 'bg-gradient-to-br from-white to-gray-50 border-gray-200 hover:border-blue-500/30'
                      }`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`group-hover:scale-110 transition-transform ${isDarkMode ? 'text-cyan-400' : 'text-blue-500'
                          }`}>
                          {project.icon}
                        </div>
                        <div>
                          <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            {project.name}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            <div className={`w-2 h-2 rounded-full animate-pulse ${isDarkMode ? 'bg-cyan-400' : 'bg-blue-500'
                              }`}></div>
                            <span className={`text-sm ${isDarkMode ? 'text-cyan-400' : 'text-blue-500'}`}>
                              {project.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {project.description}
                    </p>

                    {/* Demo and GitHub Links */}
                    <div className="flex gap-4 mb-6">
                      {project.demoLink && (
                        <a
                          href={project.demoLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${isDarkMode
                            ? 'bg-cyan-600 hover:bg-cyan-700 text-white'
                            : 'bg-blue-500 hover:bg-blue-600 text-white'
                            }`}
                        >
                          <FiGlobe className="text-lg" />
                          Live Demo
                        </a>
                      )}
                      {project.githubLink && (
                        <a
                          href={project.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${isDarkMode
                            ? 'bg-gray-800 hover:bg-gray-700 text-gray-300'
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                            }`}
                        >
                          <FiGithub className="text-lg" />
                          View Code
                        </a>
                      )}
                    </div>

                    {/* Long Description */}
                    <div className="mb-6">
                      <h4 className={`font-semibold mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Project Details:
                      </h4>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} leading-relaxed`}>
                        {project.longDescription}
                      </p>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-6">
                      <div className={`flex justify-between text-sm mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                        <span>Development Progress</span>
                        <span>{project.progress}%</span>
                      </div>
                      <div className={`w-full rounded-full h-2 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'
                        }`}>
                        <div
                          className={`h-2 rounded-full bg-gradient-to-r ${isDarkMode ? 'from-cyan-500 to-blue-500' : 'from-blue-500 to-cyan-400'
                            }`}
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech, i) => (
                        <span key={i} className={`px-3 py-1 rounded-lg text-sm border ${isDarkMode
                          ? 'bg-gray-800/50 border-gray-700 text-gray-300'
                          : 'bg-white border-gray-200 text-gray-700'
                          }`}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
        {/* Contact Tab */}
        {activeTab === "contact" && (
          <motion.div
            key="contact"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={tabVariants}
            className="max-w-lg mx-auto"
          >
            <div className={`p-8 rounded-2xl backdrop-blur-sm border ${isDarkMode
              ? 'bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-gray-700/50'
              : 'bg-gradient-to-br from-white/80 to-blue-50/80 border-blue-200/50'
              }`}>
              <h2 className={`text-3xl font-bold mb-6 flex items-center gap-2 ${isDarkMode ? 'text-cyan-300' : 'text-blue-600'
                }`}>
                <FiCloud className={isDarkMode ? "text-cyan-400" : "text-blue-500"} />
                Get In Touch
              </h2>
              <form className="space-y-6">
                <div>
                  <label className={`block mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>Your Name</label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    className={`w-full p-4 rounded-lg focus:outline-none focus:ring-2 transition ${isDarkMode
                      ? 'bg-gray-900/50 border border-gray-700 focus:border-cyan-500 focus:ring-cyan-500/20'
                      : 'bg-white border border-gray-300 focus:border-blue-500 focus:ring-blue-500/20'
                      }`}
                  />
                </div>
                <div>
                  <label className={`block mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>Email Address</label>
                  <input
                    type="email"
                    placeholder="your.email@example.com"
                    className={`w-full p-4 rounded-lg focus:outline-none focus:ring-2 transition ${isDarkMode
                      ? 'bg-gray-900/50 border border-gray-700 focus:border-cyan-500 focus:ring-cyan-500/20'
                      : 'bg-white border border-gray-300 focus:border-blue-500 focus:ring-blue-500/20'
                      }`}
                  />
                </div>
                <div>
                  <label className={`block mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>Your Message</label>
                  <textarea
                    rows="4"
                    placeholder="Type your message here..."
                    className={`w-full p-4 rounded-lg focus:outline-none focus:ring-2 transition resize-none ${isDarkMode
                      ? 'bg-gray-900/50 border border-gray-700 focus:border-cyan-500 focus:ring-cyan-500/20'
                      : 'bg-white border border-gray-300 focus:border-blue-500 focus:ring-blue-500/20'
                      }`}
                  ></textarea>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-4 rounded-lg font-medium transition-all shadow-lg ${isDarkMode
                    ? 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 shadow-cyan-500/20'
                    : 'bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 shadow-blue-500/20 text-white'
                    }`}
                >
                  <a href="mailto:Sultansalauddinansari490@gmail.com" className="block">
                    Send Message
                  </a>
                </motion.button>
              </form>
            </div>
          </motion.div>
        )}

      </AnimatePresence>

      {/* Footer */}
      <footer className={`mt-12 pt-8 border-t relative z-10 ${isDarkMode ? 'border-gray-700/50' : 'border-gray-300/50'
        }`}>
        <div className="flex justify-center gap-8 mb-6">
          {[
            { icon: <FiGithub size={24} />, link: socialLinks.github, label: "GitHub" },
            { icon: <FiLinkedin size={24} />, link: socialLinks.linkedin, label: "LinkedIn" },
            { icon: <FiMail size={24} />, link: socialLinks.email, label: "Email" }
          ].map((social, index) => (
            <motion.a
              key={index}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -3 }}
              className="group relative"
            >
              <div className={`transition-all duration-300 ${isDarkMode
                ? 'text-gray-400 group-hover:text-cyan-400'
                : 'text-gray-600 group-hover:text-blue-500'
                }`}>
                {social.icon}
              </div>
              <div className={`absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-xs whitespace-nowrap ${isDarkMode ? 'text-cyan-400' : 'text-blue-500'
                }`}>
                {social.label}
              </div>
            </motion.a>
          ))}
        </div>
        <div className="text-center">
          <p className={`mb-2 ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>
            Built with React & Tailwind CSS
          </p>
          <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
            © {new Date().getFullYear()} Sultan Salauddin Ansari. All rights reserved.
          </p>
          <div className="flex items-center justify-center gap-2 mt-4 text-sm">
            <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${isDarkMode ? 'bg-cyan-400' : 'bg-blue-500'
              }`}></div>
            <span className={isDarkMode ? 'text-gray-600' : 'text-gray-500'}>
              System Status: ONLINE
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;