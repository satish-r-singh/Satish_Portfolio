export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  link: string;
}

export interface Experience {
  id: string;
  year: string;
  role: string;
  company: string;
  location: string;
  metric: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}