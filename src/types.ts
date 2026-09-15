export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  period: string;
  locations: string[];
  description: string[];
  teamTrained: number;
  highlightBadge: string;
  projects: string[];
  techStack: string[];
}

export interface OfficeLocation {
  id: string;
  name: string;
  address: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: 'Enterprise ERP & POS' | 'Web Applications' | 'Academic & Utility' | 'APIs & Marketing';
  roleOrigin: string;
  description: string;
  features: string[];
  techStack: string[];
  metrics?: string;
  githubUrl?: string;
  liveUrl?: string;
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: {
    name: string;
    level: number;
    tags?: string;
  }[];
}

export interface NSDACertification {
  id: string;
  sl: number;
  occupation: string;
  level: number;
  authority: string;
}

export interface CertificationItem {
  title: string;
  issuer: string;
  type: string;
  year?: string;
  description?: string;
}

export interface EducationItem {
  year: string;
  degree: string;
  institution: string;
  boardOrNote: string;
  status: 'Ongoing' | 'Completed';
  highlights?: string[];
}

export interface GalleryMemoryItem {
  id: string;
  title: string;
  category: 'Milestone' | 'Academic & Campus' | 'Career & Leadership' | 'Teaching & Lab' | 'Personal';
  year: string;
  date?: string;
  location: string;
  description: string;
  imageUrl: string;
  isUserUploaded?: boolean;
  tags?: string[];
  featured?: boolean;
}
