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
    summary: 'This project was developed for my CSC 4700 AI & LLM Development class in collaboration with Performance Contractors and focuses on analyzing slip-and-fall incident data using a Large Language Model. The purpose is to allow personnel on-site to ask the LLM what hazards to look out for based on historical incident patterns and safety reports.',
    details: `For this class project, I am building an LLM-based safety assistant designed specifically around slip-and-fall incident data provided by Performance Contractors. 
    The system analyzes past incident reports and safety documentation so that when a worker or supervisor is physically present at a job site, they can ask the model contextual questions such as what risks are common in that area, during certain shifts, or under particular conditions. 
    Instead of manually reviewing years of reports, the LLM interprets historical safety information and provides clear, practical guidance to help workers stay aware of potential hazards. 
    The overall goal is to reduce incidents by making safety knowledge easily accessible, actionable, and available in real time.
    This project is built using C# for the backend data processing, React for the frontend interface, and Azure/PostgreSQL for the database. It is a great opportunity to explore real-world applications of LLMs in occupational safety.`
  },
  {
    title: 'ZL-Audio (Zero Latency Audio)',
    status: 'Starting Soon',
    year: '2026 - Present',
    summary: 'This is a personal project that I will be working on to create a low-latency audio processing library for real-time applications.',
    details: `ZL-Audio (Zero Latency Audio) is a real-time translation platform built on a low-latency audio engine that breaks language barriers across any foreign-language media — live audio, videos, novels, manga, songs, and more.
    The platform captures and processes speech, audio, text, and images through specialized AI engines including ASR, OCR, and NLP to deliver instant, context-aware translations as captions, overlays, or spoken output.
    Its zero-latency design enables floating subtitles, interactive reading modes, and live talk-back translation for real-time conversations.
    Starting with Chinese-to-English, ZL-Audio is built on a scalable, modular foundation ready for global expansion, LLM-powered context awareness, and personalized learning features — making it suitable for professional audio, streaming, and real-time multilingual communication applications.
    This project is built using Python for the backend audio processing and React for the frontend interface, and it is a great opportunity to explore real-time audio processing and AI integration.`
  },
  {
    title: 'GeoData Visualizer',
    status: 'Starting Soon',
    year: '2026 - Present',
    summary: 'This project is my class project for CSC 4700, Data Driven Security. A project that finds metadata in images. The goal of this project is to analyze social media images to extract metadata such as geolocation, timestamps, and other relevant information that can be used for security analysis and threat detection.',
    details: `For this class project, I am developing a GeoData Visualizer that processes images from social media platforms to extract and visualize metadata such as geolocation, timestamps, and other relevant information.
    The system uses images posted on social media to identify potential security threats by analyzing patterns in the metadata.
    We will have a controlled dataset of images we took ourselves, and post them on numerous social media platforms to test the system's ability to extract and analyze metadata accurately.
    Then we will compare the results to identify social media platforms that are more secure in terms of metadata exposure, and we will also analyze the types of metadata that are commonly exposed and how they can be used for security analysis.
    The project will be built using Python for data processing and React for the frontend.`
  },
  {
    title: 'Suni The Travel Companion',
    status: 'In Progress',
    year: '2026 - Present',
    summary: 'This project is my class project for CSC 4330, Software Systems. This is a capstone course where we build a software system from scratch. The project is a travel companion app that provides users with personalized travel recommendations, itinerary planning, and real-time updates on their trips.',
    details: `This project is my class project for CSC 4330, Software Systems. This is a capstone course where we build a software system from scratch. 
    Suni is a travel companion app that provides users with personalized travel recommendations, itinerary planning, and real-time updates on their trips.
    Suni presents a questionnaire to the user to determine their travel preferences, and then generates personalized recommendations for destinations, activities, and accommodations based on their quiz results.
    The app will also generate plans based on the weather forecast and feature travel tips for users.
    The app features a clean UI, real-time updates, integration with Maps APIs for accurate information, as well as a live itinerary planner based on the weather forecast as the date approaches.
    This project is built using React Native for cross-platform compatibility and Django (Python) for the backend, making it a great experience in mobile app development and teamwork.`
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
    This was a class project for my CSC 4444, Artificial Intelligence course, where we built a bot that could learn and play a game.
    In a team of 5, we built a poker bot because of the complexity and strategic depth of the game.
    The bot was trained using reinforcement learning and neural networks to make optimal decisions in real-time.
    At the end of the course, our bot competed against other bots in a tournament.
    It was built using Python and PyTorch, providing great experience in AI development and game theory.`
  },
  {
    title: 'Geaux App',
    status: 'Hiatus',
    year: '2025 - Hiatus',
    links: [
      { label: 'GitHub Repository', url: 'https://github.com/Google-Developers-Student-Club-LSU/GeauxApp-Frontend' }
    ],
    summary: 'This project is a mobile app that provides LSU students with real-time information about campus events, dining hall menus, and shuttle locations.',
    details: `This project is a mobile app that provides LSU students with real-time information about campus events, dining hall menus, and shuttle locations.
    This project was hosted by the LSU Google Developer Student Club (GDSC) where I was the lead frontend developer.
    The app features a clean UI, real-time updates, and integration with Google Maps APIs for accurate information. 
    It also includes a personalized dashboard where users can save their favorite events for quick access.
    This project is built using Flutter for cross-platform compatibility, providing great experience in mobile app development and teamwork.`
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
    The theme was a Jujutsu Kaisen reference, and we created a 3D game.
    Our game is a rhythm-based action game where players control a character that must defeat enemies by hitting them in time with patterns.
    It was a fun and creative project that allowed us to experiment with 3D game mechanics and design.
    This game was built using Unity and C#, providing great experience in rapid game development and teamwork.`
  },
  {
    title: 'Attack On Quack (Game)',
    status: 'Completed',
    year: 'January 2025 - May 2025',
    links: [
      { label: 'GitHub Repository', url: 'https://github.com/Zernullo/DucksTowerDefense' }
    ],
    summary: 'A tower defense game developed for CSC 3380 (Object Oriented Design) inspired by classic tower defense games with a unique duck-themed twist.',
    details: `This project is a game my team and I developed for CSC 3380 (Object Oriented Design).
    The game features a simple yet engaging gameplay loop, with multiple levels and increasing difficulty. 
    Inspired by classic tower defense games, the player controls a duck defending against waves of incoming snakes by placing various types of ducks along a path. 
    Each duck has its own strengths and weaknesses, requiring players to strategically choose placements.
    It was built using Unity and C#, providing valuable experience in game architecture and teamwork.`
  },
  {
    title: 'Grass Theme (Hackathon Project)',
    status: 'Completed',
    year: '3 Day Hackathon - November 2025',
    links: [
      { label: 'GitHub Repository', url: 'https://github.com/Zernullo/Hackathon3' }
    ],
    summary: 'Hackathon project where we built a grass-themed app that connects people using waypoints and geolocation throughout the city.',
    details: `This project was built during a 3-day hackathon where we created a grass-themed app connecting people using waypoints and geolocation throughout the city. 
    The app features a clean UI, waypoint management, and geolocation tracking. 
    It also integrated the Google Maps API for real-time location updates.
    A login system was implemented to allow users to create accounts and save their waypoints.
    It was built using Flutter, providing great experience in rapid prototyping and teamwork.`
  },
  {
    title: 'Finance Theme (Hackathon Project)',
    status: 'Completed',
    year: '3 Day Hackathon - March 2025',
    links: [
      { label: 'GitHub Repository', url: 'https://github.com/Zernullo/Hackathon2' }
    ],
    summary: 'Hackathon project where we built a finance-themed app that helps users track expenses and manage budgets.',
    details: `This project was built during a 3-day hackathon where we created a finance-themed app to help users track expenses and manage budgets.
    Users can input their expenses, set budget limits, and input their yearly income to generate an estimated tax amount.
    The app also gives users practical financial tips.
    It features a clean UI, expense tracking, and budget management tools. 
    It was built using JavaScript and HTML/CSS, providing great experience in rapid prototyping and teamwork.`
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
    The user takes a short quiz determining travel preferences, and the app generates personalized destination recommendations based on their results.
    The app features a clean UI and personalized recommendations based on user preferences. 
    It was built using JavaScript and HTML/CSS, providing great experience in rapid prototyping and teamwork.`
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
    This was developed as a fun side project to practice game development and physics principles. 
    Players control a blobfish character by tapping the screen to navigate through a series of pipes to achieve the highest score possible. 
    Built using Java, it was a great opportunity to learn about game loops and collision mechanics.`
  },
]

export const certificationCards = [
  {
    title: 'Security+',
    year: '2026',
    issuer: 'CompTIA',
    status: 'In Progress',
    details: 'CompTIA Security+ is a globally recognized certification validating foundational cybersecurity skills and knowledge. It covers topics such as network security, threat management, cryptography, and risk mitigation, making it an essential credential for cybersecurity professionals.'
  },
  {
    title: 'CC',
    year: '2026',
    issuer: 'ISC2',
    status: 'In Progress',
    details: 'ISC2 Certified in Cybersecurity (CC) is an entry-level certification validating fundamental cybersecurity knowledge and skills. It covers essential topics such as security principles, risk management, and incident response, providing a strong baseline for security practitioners.'
  }
]

export const activityCards = [
  {
    title: 'Google Developer Student Clubs (GDSC)',
    badge: 'Officer',
    role: 'Operational Manager',
    dates: '2025 - Present',
    details: 'As the Operational Manager for LSU GDSC, I coordinate logistics for events, manage communications, and support the team in executing workshops, hackathons, and speaker sessions to foster a vibrant developer community on campus.'
  },
  {
    title: 'SSL',
    badge: 'Member',
    role: 'Member',
    dates: '2025 - Present',
    details: 'Member of LSU SSL (Security Society at LSU), actively participating in weekly technical meetings, hands-on workshops, and CTF competitions to enhance cybersecurity skills and collaborate with peers.'
  },
]
