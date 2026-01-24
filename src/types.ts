export interface Project {
  id: string;
  title: string;
  year: string;
  category: string;
  image: string;       // Matches data in constants.ts
  techStack: string[]; // Matches data in constants.ts
  summary: string;
  challenge?: string;  // Optional, but used in your modal
  solution?: string;   // Optional
  impact?: string;     // Optional
  link?: string;
}

export interface Experience {
  id: string;
  year: string;
  role: string;
  company: string;
  location: string;
  metric: string;
}

export interface ArchiveProject {
  date: string;
  id: string;
  stack: string[];
  link: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}