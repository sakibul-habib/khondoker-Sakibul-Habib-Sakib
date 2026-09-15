import {
  ExperienceItem,
  OfficeLocation,
  ProjectItem,
  SkillCategory,
  NSDACertification,
  CertificationItem,
  EducationItem,
} from '../types';

export const PERSONAL_INFO = {
  name: "KHONDOKER SAKIBUL HABIB SAKIB",
  shortName: "Sakib Habib",
  title: "Head of IT • University Lecturer • Asset Project Coordinator",
  photoUrl: "./my-passport-photo.png",
  address: "House-11, Road-6, Badda link Road, Gulshan-1, Dhaka-1212, Bangladesh",
  phone: "+8801789557517",
  email: "sakibulhabib@gmail.com",
  secondaryEmail: "ctit.sakib@gmail.com",
  linkedin: "https://www.linkedin.com/in/khondoker-sakibul-habib-004b20198/",
  github: "https://github.com/khsakib-creator",
  website: "https://khsakib-creator.github.io/sakibulhabib/",
  objective: "To serve in a dynamic organization where there is an opportunity to utilize my knowledge, experience, education & skill with a scope of continuous career development.",
  profileSummary: "Willing to take on challenges through a creative and competitive environment where I have the opportunity to assert a strong sense of responsibility as well as to contribute.",
  declaration: "I, the undersigned, hereby corroborate that, to the best of my knowledge and belief, the above-furnished information is true and correct.",
  stats: {
    leadershipRoles: "5",
    professionalsTrained: "46+",
    projectsCompleted: "20+",
    nsdaLevel: "Level 4",
  }
};

export const OFFICE_LOCATIONS: OfficeLocation[] = [
  {
    id: "ucasm",
    name: "United College of Aviation Science & Management (UCASM)",
    address: "House #16, Road #04, Sector #03, Uttara, Dhaka, Bangladesh."
  },
  {
    id: "ucast",
    name: "United College of Aviation Science & Technology (UCAST)",
    address: "House #16, Road #04, Sector #03, Uttara, Dhaka, Bangladesh."
  },
  {
    id: "city-tech-it",
    name: "City Tech IT",
    address: "H.M. Plaza, Lift-14, Suite-1/A, Plot-34, Road-2, Sector-3, Uttara Rajlokkhi, Dhaka-1230, Bangladesh."
  }
];

export const PLANNET_PROJECTS = [
  "HR Management System",
  "Student Attendance Management System",
  "E-Commerce Website",
  "Inventory Management System with POS Integration",
  "Digital Marketing & Tracking Implementation",
  "Meta Pixel & Conversion API Integration",
  "Third-Party API Integration",
  "Website Development & Management"
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: "head-of-it-city-tech",
    company: "City Tech IT, Plannet Group",
    role: "Head of IT",
    period: "15 July 2025 – Present",
    highlightBadge: "Executive IT Leadership",
    locations: [
      "City Tech IT: H.M. Plaza, Lift-14, Suite-1/A, Plot-34, Road-2, Sector-3, Uttara Rajlokkhi, Dhaka-1230, Bangladesh"
    ],
    description: [
      "Lead IT operations, software solutions, website development, and technical support across organizational projects.",
      "Manage end-to-end software workflows, system maintenance, troubleshooting, and technology implementation.",
      "Develop and maintain web-based applications, business systems, and digital platforms.",
      "Coordinate digital marketing, SEO, tracking pixels, analytics, and third-party API integrations.",
      "Mentor and supervise technical team members, improving productivity, development practices, and service delivery."
    ],
    teamTrained: 8,
    projects: [
      "HR Management System",
      "Inventory Management System with POS Integration",
      "E-Commerce Website",
      "Digital Marketing & Tracking Implementation",
      "Meta Pixel & Conversion API Integration",
      "Third-Party API Integration",
      "Website Development & Management"
    ],
    techStack: ["Laravel", "PHP", "MySQL", "Meta Pixel & CAPI", "SEO", "REST APIs", "Digital Marketing", "Linux"]
  },
  {
    id: "lecturer-cse-ucasm",
    company: "Department of CSE, UCASM, Plannet Group",
    role: "Lecturer",
    period: "15 July 2025 – Present",
    highlightBadge: "Academic Faculty",
    locations: [
      "United College of Aviation Science & Management (UCASM): House #16, Road #04, Sector #03, Uttara, Dhaka, Bangladesh"
    ],
    description: [
      "Deliver lectures and practical sessions in Computer Science and Engineering subjects.",
      "Prepare course materials, assessments, practical examinations, and student learning resources.",
      "Guide students in programming, web development, software engineering, databases, IT support, cybersecurity, and related technologies.",
      "Support academic activities including presentations, orientations, examinations, workshops, and departmental events.",
      "Coordinate student-focused technical activities and contribute to programming, cybersecurity, and learning & development initiatives."
    ],
    teamTrained: 8,
    projects: [
      "Student Attendance Management System",
      "CSE Department Curriculum Delivery & Labs",
      "Programming, Web Development & Cybersecurity Practical Sessions",
      "Academic Examination & Project Supervision"
    ],
    techStack: ["Python", "C / C++", "Java", "Databases", "Web Engineering", "Cybersecurity", "IT Support"]
  },
  {
    id: "asset-project-coordinator-ucast",
    company: "UCAST, Plannet Group",
    role: "Asset Project Coordinator",
    period: "15 July 2025 – Present",
    highlightBadge: "Program Management",
    locations: [
      "United College of Aviation Science & Technology (UCAST): House #16, Road #04, Sector #03, Uttara, Dhaka, Bangladesh"
    ],
    description: [
      "Coordinate asset-project activities across 10+ academic and technical subjects.",
      "Maintain project documentation, resource records, task tracking, and coordination between relevant teams.",
      "Support the planning, implementation, and monitoring of academic and technical projects.",
      "Assist instructors and project teams with technical resources, systems, and operational requirements.",
      "Contribute to process improvement, documentation, and efficient project execution."
    ],
    teamTrained: 8,
    projects: [
      "Asset Project Across 10+ Academic & Technical Subjects",
      "Laboratory Resource Tracking & Equipment Audit",
      "Inter-Team Task Tracking & Milestones Coordination",
      "Technical Operational Systems & Process Improvement"
    ],
    techStack: ["Project Coordination", "Resource Tracking", "System Workflows", "Technical Documentation"]
  },
  {
    id: "turnago-group",
    company: "Turnago Group",
    role: "Manager – IT",
    period: "5th February 2024 – 15th July 2025",
    highlightBadge: "Senior Management",
    locations: [
      "Islam Mansion, (5th Floor), Plot- 39, Road- 126, Gulshan-1, Dhaka, Bangladesh"
    ],
    description: [
      "Oversee the daily operations Coordinate the end-to-end all the processes, from inbound management.",
      "Also, I have worked in the Turnago Group as a manager-IT. In there, I lead teams.",
      "I have trained more than 18 employees in enterprise software systems, operations, and development pipelines."
    ],
    teamTrained: 18,
    projects: [
      "HR management system",
      "Certificate Management & Verification Portal",
      "E-commerce website",
      "Inventory management system"
    ],
    techStack: ["PHP", "Laravel", "MySQL", "Bootstrap", "REST APIs", "Linux Server Ops"]
  },
  {
    id: "uctit",
    company: "Uttara Computer Training & IT Firm (UCTIT)",
    role: "Manager – Project",
    period: "1st October 2022 – 3rd February 2024",
    highlightBadge: "Project Leadership",
    locations: [
      "House 37 (3rd Floor), Road 7, Sector 3, Uttara, Dhaka-1230, Bangladesh (Contact No: 01996399534)"
    ],
    description: [
      "Oversee the daily operations Coordinate the end-to-end all the processes, from inbound management.",
      "Also, I have worked in the UCTIT as a manager-project. In there, I lead teams.",
      "I have trained more than 20 employees and coached emerging developers in full software lifecycles."
    ],
    teamTrained: 20,
    projects: [
      "Loan management system",
      "CGPA calculator",
      "E-commerce website",
      "Inventory management system",
      "Engino management system"
    ],
    techStack: ["HTML5", "CSS3", "JavaScript", "PHP", "MySQL", "C++", "Java", "Python"]
  }
];

export const PROJECTS: ProjectItem[] = [
  {
    id: "pos-inventory",
    title: "Inventory Management System with POS Integration",
    category: "Enterprise ERP & POS",
    roleOrigin: "Plannet Group / City Tech IT",
    description: "Full-scale point of sale and inventory management suite with barcode scanning, automated stock recalculations, multi-warehouse tracking, and daily invoice receipts.",
    features: [
      "Real-time Point of Sale (POS) checkout interface with instant receipt printing",
      "Multi-store inventory synchronization and low-stock automated threshold alerts",
      "Daily/Monthly profit, loss, and revenue accounting analytics",
      "Role-based cashier and administrator authorization controls"
    ],
    techStack: ["Laravel", "PHP", "MySQL", "JavaScript", "Bootstrap", "REST APIs"],
    metrics: "Production-deployed across retail units with sub-second SKU lookups",
    githubUrl: "https://github.com/khsakib-creator",
    liveUrl: "https://khsakib-creator.github.io/sakibulhabib/"
  },
  {
    id: "hr-management",
    title: "Enterprise HR Management System",
    category: "Enterprise ERP & POS",
    roleOrigin: "Plannet Group & Turnago Group",
    description: "Unified corporate human resources platform managing staff profiles, leave workflows, attendance logs, performance appraisals, and payroll disbursement.",
    features: [
      "Employee lifecycle onboarding and document repository",
      "Leave approval routing with multi-level manager hierarchy",
      "Automated salary slip generation and tax calculation",
      "Integrated daily attendance verification and audit trail"
    ],
    techStack: ["PHP", "Laravel", "MySQL", "Ajax", "CSS3", "HTML5"],
    metrics: "Streamlined operational workflows for over 100+ active staff members",
    githubUrl: "https://github.com/khsakib-creator"
  },
  {
    id: "student-attendant",
    title: "Student Attendant & Academic Monitoring System",
    category: "Academic & Utility",
    roleOrigin: "United College of Aviation Science & Management (UCASM)",
    description: "Academic attendance tracking platform designed for colleges and universities to log daily lecture presence, track absent alerts, and generate semester percentage summaries.",
    features: [
      "Rapid roll-call and biometric/RFID ready student attendance logging",
      "Automated notification triggers for low-attendance warning thresholds",
      "Faculty grading and subject-wise lecture attendance analytics",
      "Exportable regulatory accreditation attendance reports"
    ],
    techStack: ["Django", "Python", "MySQL", "Bootstrap", "Chart.js"],
    metrics: "Active across 10+ college departments and academic subjects",
    githubUrl: "https://github.com/khsakib-creator"
  },
  {
    id: "digital-marketing-pixel",
    title: "Digital Marketing & Multi-Pixel API Integration",
    category: "APIs & Marketing",
    roleOrigin: "Plannet Group & Freelance",
    description: "Sophisticated event tracking engine integrating Meta Conversions API (CAPI), Google Tag Manager, and custom analytics pixels for enhanced ad conversion fidelity.",
    features: [
      "Server-side event dispatching for cookieless attribution tracking",
      "Custom trigger listeners for AddToCart, Purchase, and Lead conversions",
      "Cross-domain attribution mapping and deduplication mechanisms",
      "Comprehensive tracking validation dashboard"
    ],
    techStack: ["JavaScript", "Python", "Meta CAPI", "Google Tag Manager", "PHP", "REST APIs"],
    metrics: "Over 95% event match quality and verified conversion telemetry",
    githubUrl: "https://github.com/khsakib-creator"
  },
  {
    id: "certificate-management",
    title: "Certificate Management & Public Verification Portal",
    category: "Web Applications",
    roleOrigin: "Turnago Group",
    description: "Anti-tamper certificate generation engine enabling institutional issuance of unique verifiable credentials with instant QR code scanning authentication.",
    features: [
      "Dynamic PDF certificate rendering with cryptographic hash signatures",
      "Public verification link and QR code scanner for instant authenticity check",
      "Batch student credential generator with CSV imports",
      "Audit logs preventing fraudulent duplication"
    ],
    techStack: ["Laravel", "PHP", "MySQL", "TCPDF", "QR Engine"],
    metrics: "Issued and validated thousands of tamper-evident digital certificates",
    githubUrl: "https://github.com/khsakib-creator"
  },
  {
    id: "loan-management",
    title: "Microfinance & Loan Management System",
    category: "Enterprise ERP & POS",
    roleOrigin: "Uttara Computer Training & IT Firm (UCTIT)",
    description: "Financial loan application, approval, amortization calculation, and installment repayment tracking system for community microcredit operations.",
    features: [
      "Flexible interest calculation engine (flat rate, reducing balance, compound)",
      "Daily/Weekly/Monthly EMI repayment scheduling and overdue alerts",
      "Borrower credit history and guarantor verification profiles",
      "Comprehensive balance sheet and ledger generation"
    ],
    techStack: ["PHP", "MySQL", "JavaScript", "HTML5", "CSS3"],
    metrics: "Automated calculation of complex loan schedules with zero discrepancy",
    githubUrl: "https://github.com/khsakib-creator"
  },
  {
    id: "ecommerce-platforms",
    title: "Custom E-Commerce Engine & Shopping Portal",
    category: "Web Applications",
    roleOrigin: "Plannet Group, Turnago Group & UCTIT",
    description: "High-performance online shopping storefront featuring dynamic catalog browsing, shopping cart, promo vouchers, and integrated payment gateways.",
    features: [
      "Product catalog with multifaceted filters and responsive image galleries",
      "Secure checkout flow with localized payment gateway support",
      "Customer dashboard with real-time order status tracking",
      "Admin inventory management and order fulfillment pipeline"
    ],
    techStack: ["Laravel", "Django", "MySQL", "Bootstrap", "Payment Gateway APIs"],
    metrics: "Built with high uptime and rapid page load speeds",
    githubUrl: "https://github.com/khsakib-creator"
  },
  {
    id: "cgpa-calculator",
    title: "University CGPA & Academic Grade Calculator",
    category: "Academic & Utility",
    roleOrigin: "UCTIT & University Community",
    description: "Interactive academic calculation tool allowing students to calculate semester GPA, cumulative CGPA, target grade projections, and credit weighting.",
    features: [
      "Configurable university grading scales (UGC Bangladesh 4.0 standard)",
      "Multi-semester course credit weighting and projected GPA goals",
      "Instant breakdown of letter grades and grade point averages",
      "Clean printable academic transcript simulator"
    ],
    techStack: ["JavaScript", "HTML5", "CSS3", "C++ Engine / Web Port"],
    metrics: "Used by university students for quick semester performance projections",
    githubUrl: "https://github.com/khsakib-creator"
  },
  {
    id: "engino-management",
    title: "Engino Management System",
    category: "Enterprise ERP & POS",
    roleOrigin: "Uttara Computer Training & IT Firm (UCTIT)",
    description: "Specialized engineering workshop and spare parts management software tracking equipment maintenance records, technician assignments, and repair job cards.",
    features: [
      "Job card generation and service ticket lifecycle tracking",
      "Spare parts inventory requisition and bill of materials (BOM)",
      "Technician labor time tracking and service history logs",
      "Preventive maintenance scheduling and client reminder notifications"
    ],
    techStack: ["PHP", "MySQL", "JavaScript", "Bootstrap"],
    metrics: "Reduced turnaround time for repair diagnostics and billing",
    githubUrl: "https://github.com/khsakib-creator"
  }
];

export const THESIS_DETAILS = {
  title: "Smart Glass for Blind People",
  subtitle: "Assistive IoT & Embedded Sensory Wearable System",
  status: "Completed Thesis Project",
  domain: "Computer Vision • Embedded Systems • Assistive Robotics",
  summary: "An innovative assistive wearable engineered to empower visually impaired individuals with sensory feedback, obstacle detection, ultrasonic echo-location, and auditory guidance—significantly increasing safety and independence in both indoor and outdoor environments.",
  problemStatement: "Visually impaired individuals face dangerous obstacles, head-level hazards, and navigation barriers that traditional walking canes cannot detect.",
  solutionFeatures: [
    {
      title: "Ultrasonic Proximity Array",
      description: "Twin ultrasonic sensors mounted on the spectacle frame scanning for obstacles from 2cm to 400cm in real-time."
    },
    {
      title: "Haptic & Audio Guidance System",
      description: "Integrated bone-conduction audio cues and localized vibration pulses that modulate frequency based on proximity danger."
    },
    {
      title: "Microcontroller Brain",
      description: "Low-latency embedded processing unit executing distance filtering algorithms with sub-50ms response rates."
    },
    {
      title: "Emergency Beacon & Power Management",
      description: "Rechargeable lithium battery circuit with power-saving telemetry and intuitive distress assistance signals."
    }
  ],
  impactMetrics: [
    { label: "Detection Range", value: "0.02m - 4.0m" },
    { label: "Sensor Latency", value: "< 50ms" },
    { label: "Safety Coverage", value: "180° Cone" },
    { label: "Battery Endurance", value: "12+ Hours" }
  ]
};

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Core Web & Backend Engineering",
    description: "Full-stack web architecture, server-side frameworks, and relational databases",
    skills: [
      { name: "Laravel (PHP)", level: 95, tags: "MVC, Eloquent, APIs, Auth" },
      { name: "Django (Python)", level: 90, tags: "ORM, REST Framework, Admin" },
      { name: "PHP", level: 95, tags: "OOP, Modern PHP 8.x, Composer" },
      { name: "MySQL / Database Management", level: 92, tags: "Queries, Indexes, Schemas" },
      { name: "HTML5 & CSS3 / Bootstrap", level: 96, tags: "Responsive Layouts, Flexbox" },
      { name: "WordPress Development", level: 88, tags: "Custom Themes & Plugins" }
    ]
  },
  {
    title: "Programming Languages & Software",
    description: "Fundamental languages, algorithms, and multi-paradigm software development",
    skills: [
      { name: "Python", level: 92, tags: "Data structures, Web, Automation" },
      { name: "Java", level: 85, tags: "OOP, Core Java, Enterprise patterns" },
      { name: "C & C++", level: 88, tags: "Memory management, Algorithms" },
      { name: "C# (.NET)", level: 82, tags: "Desktop apps, OOP, Logic" },
      { name: "Flutter (Dart)", level: 85, tags: "Cross-platform Mobile Apps" }
    ]
  },
  {
    title: "Product, Digital Marketing & Design",
    description: "Commercial growth, brand assets, and marketing technology integration",
    skills: [
      { name: "Digital Marketing & Pixel Setup", level: 92, tags: "Meta CAPI, Google Ads, GTM" },
      { name: "Search Engine Optimization (SEO)", level: 90, tags: "Technical SEO, Schema, Audits" },
      { name: "Product & Project Management", level: 94, tags: "Agile, Inbound workflows, QA" },
      { name: "Logo & Corporate Graphics Design", level: 88, tags: "Vector branding, Flyers, UI/UX" }
    ]
  },
  {
    title: "IT Literacy & Systems Engineering",
    description: "Foundational computer science principles and operational excellence",
    skills: [
      { name: "Algorithms & Data Structures", level: 90, tags: "Optimization, Analysis" },
      { name: "SDLC & Agile Methodologies", level: 94, tags: "Scrum, Sprints, Code Review" },
      { name: "Software Testing & Debugging", level: 89, tags: "Unit testing, System diagnosis" },
      { name: "Cloud Computing & Deployments", level: 86, tags: "VPS, Nginx, Linux, Git" },
      { name: "Security Principles & Data Safety", level: 88, tags: "Input sanitization, Auth, SSL" }
    ]
  }
];

export const NSDA_CERTIFICATIONS: NSDACertification[] = [
  {
    id: "nsda-1",
    sl: 1,
    occupation: "Computer Operation",
    level: 2,
    authority: "National Skills Development Authority (NSDA) Bangladesh"
  },
  {
    id: "nsda-2",
    sl: 2,
    occupation: "Digital Marketing for Freelancing",
    level: 3,
    authority: "National Skills Development Authority (NSDA) Bangladesh"
  },
  {
    id: "nsda-3",
    sl: 3,
    occupation: "Web Design and Development for Freelancing",
    level: 3,
    authority: "National Skills Development Authority (NSDA) Bangladesh"
  },
  {
    id: "nsda-4",
    sl: 4,
    occupation: "IT Support Service",
    level: 3,
    authority: "National Skills Development Authority (NSDA) Bangladesh"
  },
  {
    id: "nsda-5",
    sl: 5,
    occupation: "CBT&A (apart from written)",
    level: 4,
    authority: "National Skills Development Authority (NSDA) Bangladesh"
  },
  {
    id: "nsda-6",
    sl: 6,
    occupation: "Web Application Development with Python",
    level: 4,
    authority: "National Skills Development Authority (NSDA) Bangladesh"
  },
  {
    id: "nsda-7",
    sl: 7,
    occupation: "Search Engine Optimization (SEO)",
    level: 4,
    authority: "National Skills Development Authority (NSDA) Bangladesh"
  }
];

export const OTHER_CERTIFICATIONS: CertificationItem[] = [
  {
    title: "Introduction to Flutter Course",
    issuer: "SkillUp",
    type: "Mobile App Development",
    description: "Dart programming, stateful widgets, and cross-platform UI architectures."
  },
  {
    title: "Graphics Design: Corporate Flyer",
    issuer: "a2i (Aspire to Innovate) Bangladesh",
    type: "Design & Media",
    description: "Professional corporate identity branding, typography, and vector layouts."
  },
  {
    title: "Digital Security Agency Certification",
    issuer: "ICT Division, Bangladesh",
    type: "Cybersecurity",
    description: "Cyber threat awareness, safe digital transactions, and infrastructure hygiene."
  },
  {
    title: "Digital Security Essentials",
    issuer: "a2i (Aspire to Innovate)",
    type: "Information Security",
    description: "Information security governance and secure system operations."
  },
  {
    title: "MLH Local Hack Day",
    issuer: "Major League Hacking (Sponsored by Microsoft)",
    type: "Hackathon & Innovation",
    description: "Held at IUBAT Auditorium; collaborative rapid software prototyping."
  },
  {
    title: "C Programming Masterclass",
    issuer: "Udemy",
    type: "Programming Languages",
    description: "Advanced pointers, memory allocation, algorithms, and low-level data structures."
  },
  {
    title: "COVID-19 Quiz Certification",
    issuer: "Advanced Educational Institutions",
    type: "Public Health Awareness",
    description: "Digital health informatics and public health preparedness response."
  },
  {
    title: "Book Reading Programme 2019",
    issuer: "British Council",
    type: "Language & Literature",
    description: "Advanced English comprehension, literary critique, and communication skills."
  }
];

export const EDUCATION_TIMELINE: EducationItem[] = [
  {
    year: "2026",
    degree: "Professional Master of Science in Computer Science (PMSCS)",
    institution: "Jahangirnagar University (JU), Bangladesh",
    boardOrNote: "Ongoing Post-Graduate Degree",
    status: "Ongoing",
    highlights: [
      "Advanced algorithm design and distributed computing",
      "Software system architecture and database intelligence",
      "Research methodology and high-performance computing"
    ]
  },
  {
    year: "2024",
    degree: "Bachelor of Science in Computer Science & Engineering (B.Sc CSE)",
    institution: "International University of Business Agriculture & Technology (IUBAT)",
    boardOrNote: "Dhaka, Bangladesh",
    status: "Completed",
    highlights: [
      "Thesis: Smart Glass for Blind People (Assistive IoT & Sensor Guidance)",
      "Core coursework in OOP, Data Structures, Compiler Design, AI, Web Engineering",
      "Active participant in Microsoft-sponsored MLH Local Hack Day at IUBAT"
    ]
  },
  {
    year: "2019",
    degree: "Higher Secondary School Certificate (HSC)",
    institution: "Sadullapur Government College (SGC)",
    boardOrNote: "Dinajpur Board",
    status: "Completed",
    highlights: [
      "Science discipline: Mathematics, Physics, Chemistry, ICT",
      "Developed foundational interest in computer programming and logic"
    ]
  },
  {
    year: "2016",
    degree: "Secondary School Certificate (SSC)",
    institution: "Sadullapur ML Pilot High School",
    boardOrNote: "Dinajpur Board",
    status: "Completed",
    highlights: [
      "Science discipline with distinction in Mathematics and Science",
      "Extracurricular involvement in scientific exhibitions"
    ]
  }
];
