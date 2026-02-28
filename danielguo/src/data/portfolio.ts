export type DetailItem = {
  title: string
  meta?: string
  details: string
  image?: string | null
  links?: { label: string; url: string }[]
}

export const projectCards = [
  {
    title: 'Performance Contract',
    status: 'In Progress',
    year: '2026 - Present',
    links: [
      { label: 'GitHub Repository (In Progress)', url: 'https://github.com/Tamely/Performance-LLM' }
    ],
    summary: 'This project was developed for my CSC 4700 AI & LLM Development class in collaboration with Performance Contractors and focuses on analyzing slip-and-fall incident data using a Large Language Model. The purpose is to allow personnel on-site to ask the LLM what hazards to look out for based on historical incident patterns and safety reports.',
    details: `For this class project, I am building an LLM-based safety assistant designed specifically around slip-and-fall incident data provided by Performance Contractors. 
    The system analyzes past incident reports and safety documentation so that when a worker or supervisor is physically present at a job site, they can ask the model contextual questions such as what risks are common in that area, during certain shifts, or under particular conditions. 
    Instead of manually reviewing years of reports, the LLM interprets historical safety information and provides clear, practical guidance to help workers stay aware of potential hazards. 
    The overall goal is to reduce incidents by making safety knowledge easily accessible, actionable, and available in real time.`
  },
  {
    title: 'ZL-Audio (Zero Latency Audio)',
    status: 'Starting Soon',
    year: '2026 - Present',
    links: [
      { label: 'GitHub Repository (In Progress)', url: '' }
    ],
    summary: 'This is a personal project that I will be working on to create a low-latency audio processing library for real-time applications.',
    details: `ZL-Audio (Zero Latency Audio) is a real-time translation platform built on a low-latency audio engine that breaks language barriers across any foreign-language media — videos, novels, manga, songs, and more.
    The platform captures and processes audio, text, and images through specialized AI engines including ASR, OCR, and NLP to deliver instant, context-aware translations as captions, overlays, or spoken output.
    Its zero-latency design enables floating subtitles, interactive reading modes, and live talk-back translation for real-time conversations.
    Starting with Chinese-to-English, ZL-Audio is built on a scalable, modular foundation ready for global expansion, LLM-powered context awareness, and personalized learning features — making it suitable for professional audio, streaming, and real-time multilingual communication applications.`
  },
  {
    title: 'GeoData Visualizer',
    status: 'Starting Soon',
    year: '2026 - Present',
    links: [
      { label: 'GitHub Repository (In Progress)', url: '' }
    ],
    summary: 'This project is my class project for CSC 4700, Data Driven Security. A project that visualizes geospatial data in an innovative way.',
    details: `This project is my class project for CSC 4700, Data Driven Security. The goal of this project is to create a geospatial data visualizer that can take in various types of geospatial data and visualize it in an interactive and informative way.
    The project currently just started and I am in the early stages of planning and research. 
    More project specifications and details will be added as the project progresses, but the main focus will be on creating a tool that can help users understand and analyze geospatial data effectively.`
  },
  {
    title: 'Suni The Travel Companion',
    status: 'In Progress',
    year: '2026 - Present',
    links: [
      { label: 'GitHub Repository', url: 'https://github.com/Haze-7/Suni' }
    ],
    summary: 'This project is my class project for CSC 4330, Software System. This is a capstone course where we have to build a software system from scratch. The project is a travel companion app that provides users with personalized travel recommendations, itinerary planning, and real-time updates on their trips.',
    details: `This project is my class project for CSC 4330, Software System. This is a capstone course where we have to build a software system from scratch. 
    Suni is a travel companion app that provides users with personalized travel recommendations, itinerary planning, and real-time updates on their trips.
    Suni will ask a questionaire to the user to determine their travel preferences, and then it will generate personalized recommendations for destinations, activities, and accommodations based on their quiz results.
    The app will also generate a plans based on the weather forecast, and it will have a feature where it give user travel tips.
    The app features a clean UI, real-time updates, and integration with Maps APIs for accurate information.
    As well as a live iterary planner based on the weather forecast as date approaches.
    This project is built using React Native for cross-platform compatibility, and it is a great experience in mobile app development and teamwork.`
  },
  {
    title: 'Texas Holdem Bot',
    status: 'Completed',
    year: 'August 2025 - December 2025',
    links: [
      { label: 'GitHub Repository', url: 'https://github.com/BearGotGit/Ultron-Texas-Hold-Em' }
    ],
    summary: 'This project is a poker bot that uses machine learning to play Texas Holdem at an expert level.',
    details: `This project is a poker bot that uses machine learning to play Texas Holdem at an expert level.
    This was a class project for my CSC 4444, Artificial Intelligence course, where we had to build a bot that could learn and play a game.
    We were in a team of 5, and we built a poker bot because of the complexity and strategic depth of the game.
    The bot was trained using reinforcement learning and neural networks to make optimal decisions in real-time.
    At the end of the course, our bot was played against other bots in a tournament.
    It was built using Python and Pytorch, and it was a great experience in AI development and game theory.`
  },
  {
    title: 'Geaux App',
    status: 'In Progress',
    year: '2025 - Hiatus',
    links: [
      { label: 'GitHub Repository', url: 'https://github.com/Google-Developers-Student-Club-LSU/GeauxApp-Frontend' }
    ],
    summary: 'This project is a mobile app that provides LSU students with real-time information about campus events, dining hall menus, and shuttle locations.',
    details: `This project is a mobile app that provides LSU students with real-time information about campus events, dining hall menus, and shuttle locations.
    This project was hosted by the LSU Google Developer Student Club (GDSC) and I was the lead developer for the frontend of the app.
    The app features a clean UI, real-time updates, and integration with Google Maps APIs for accurate information. 
    It also includes a personalized dashboard where users can save their favorite events for quick access.
    This project is built using Flutter for cross-platform compatibility, and it was a great experience in mobile app development and teamwork.`
  },
  {
    title: 'Naut, I\'d Shall Prevail (Chillennium Game Jam)',
    status: 'Completed',
    year: 'August 2025 - December 2025',
    links: [
      { label: 'GitHub Repository', url: 'https://github.com/Zernullo/CHILLENNIUM-2026' }
    ],
    summary: 'This is a Chillennium Game Jam project where we built a game with the theme of "Nah, I Win".',
    details: `This is a Chillennium Game Jam project where we built a game with the theme of "Nah, I Win".
    The theme was a Jujutsu Kaisen reference, and we decided to create a 3D game.
    Our game is a rythm-based action game where players control a character that must defeat enemies by hitting them in time with the random pattern.
    It was a fun and creative project that allowed us to experiment with 3D game mechanics and design.
    This game was built using Unity and C#, and it was a great experience in rapid game development and teamwork.`
  },
  {
    title: 'Attack On Quack (Game)',
    status: 'Completed',
    year: 'January 2025 - May 2025',
    links: [
      { label: 'GitHub Repository', url: 'https://github.com/Zernullo/DucksTowerDefense' }
    ],
    summary: 'This project is a game my team and I developed for our class CSC 3380, Object Oriented Design. A capstone course where we had to build projects from scratch. This game was inspired by a classic game called "Bloon Tower Defense", but with a unique twist and theme.',
    details: `This project is a game my team and I developed for our class CSC 3380. A capstone course where we had to build projects from scratch. 
    The game features a simple yet engaging gameplay loop, with multiple levels and increasing difficulty. 
    This game was inspired by a classic game called "Bloon Tower Defense", but with a unique twist and theme. 
    The player controls a duck that must defend against waves of incoming enemies (snakes) by placing various types of ducks along a path. 
    Each ducks has its own strengths and weaknesses, and players must strategically choose which ducks to place and where to place them in order to successfully defend against the waves of enemies.
    It was built using Unity and C#, and it was a great experience in game development and teamwork.`
  },
  {
    title: 'Grass Theme (Hackathon Project)',
    status: 'Completed',
    year: '3 Day Hackathon - November 2025',
    Links: [
      { label: 'GitHub Repository', url: 'https://github.com/Zernullo/Hackathon3' }
    ],
    summary: 'Hackathon project where we built a grass-themed app that connects people using waypoints and geolocation throughout the city.',
    details: `This project was built during a 3-day hackathon where we created a grass-themed app that connects people using waypoints and geolocation throughout the city. 
    The app features a clean UI, waypoint management, and geolocation tracking. 
    It also had Google Map API integration for real-time location updates.
    A login system was implemented to allow users to create accounts and save their waypoints.
    It was built using Flutter, and it was a great experience in rapid prototyping and teamwork.`
  },
  {
    title: 'Finance Theme (Hackathon Project)',
    status: 'Completed',
    year: '3 Day Hackathon - March 2025',
    links: [
      { label: 'GitHub Repository', url: 'https://github.com/Zernullo/Hackathon2' }
    ],
    summary: 'Hackathon project where we built a finance-themed app that helps users track expenses and manage budgets.',
    details: `This project was built during a 3-day hackathon where we created a finance-themed app that helps users track expenses and manage budgets.
    The user can input their expenses, and set budget limits. 
    The user can also input their yearly income and the app will generate a estimated tax amount.
    The app also has a feature where it give user financial tips.
    The app features a clean UI, expense tracking, and budget management tools. 
    It was built using JavaScript and HTML/CSS, and it was a great experience in rapid prototyping and teamwork.`
  },
  {
    title: 'Travel Theme (Hackathon Project)',
    status: 'Completed',
    year: '3 Day Hackathon - November 2024',
    links: [
      { label: 'GitHub Repository', url: 'https://github.com/Zernullo/HackathonTravel.github.io' }
    ],
    summary: 'Hackathon project where we built a travel-themed app that helps users discover new destinations and plan trips.',
    details: `This project was built during a 3-day hackathon where we created a travel-themed app that helps users discover new destinations and plan trips. 
    The user will first take a short quiz determining their preferences for travel, and then the app will generate personalized recommendations for destinations based on their quiz results.
    The app features a clean UI, and personalized recommendations based on user preferences. 
    It was built using JavaScript and HTML/CSS, and it was a great experience in rapid prototyping and teamwork.`
  },
  {
    title: 'BlobFish Flappy Bird (Game)',
    status: 'Completed',
    year: 'March 2025',
    links: [
      { label: 'GitHub Repository', url: 'https://github.com/Zernullo/BlobFishFlappyBird' }
    ],
    summary: 'Blobfish Flappy Bird is a fun and quirky take on the classic Flappy Bird game, featuring a blobfish character navigating through obstacles.',
    details: `Blobfish Flappy Bird is a fun and quirky take on the classic Flappy Bird game, featuring a blobfish character navigating through obstacles.
    This is a game I developed as a fun side project to practice my game development skills. 
    The game features a blobfish character that players control by tapping the screen to make it flap its fins and navigate through a series of pipes. 
    The goal is to achieve the highest score possible by passing through as many pipes as you can without crashing. 
    I built this game using Java, and it was a great opportunity to learn about game mechanics.`,
  },
]

export const certificationCards = [
  {
    title: 'Security+',
    year: '2026',
    issuer: 'CompTia',
    status: 'In Progress',
    details: 'CompTia Security+ is a globally recognized certification that validates foundational cybersecurity skills and knowledge. It covers topics such as network security, threat management, cryptography, and risk mitigation, making it an essential credential for aspiring cybersecurity professionals.'
  },
  {
    title: 'CC',
    year: '2026',
    issuer: 'ISC2',
    status: 'In Progress',
    details: 'ISC2\'s Certified in Cybersecurity (CC) is an entry-level certification designed to validate fundamental cybersecurity knowledge and skills. It covers essential topics such as security principles, risk management, and incident response, making it an ideal starting point for individuals pursuing a career in cybersecurity.'
  }
]

export const activityCards = [
  {
    title: 'Google Developer Student Clubs (GDSC)',
    badge: 'Officer',
    role: 'Operational Manager',
    dates: '2025 - Present',
    details: 'As the Operational Manager for LSU GDSC, I coordinate logistics for events, manage communications, and support the team in executing workshops, and speaker sessions to foster a vibrant developer community on campus.'
  },
  {
    title: 'SSL',
    badge: 'Member',
    role: 'Member',
    dates: '2025 - Present',
    details: 'A member of LSU SSL (Security Society at LSU) where I participate in weekly meetings, workshops, and CTFs to enhance my cybersecurity skills and collaborate with like-minded peers.'
  },
]
