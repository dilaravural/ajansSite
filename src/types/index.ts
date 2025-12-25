export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  videoUrl?: string;
  thumbnailUrl: string;
  client?: string;
  date: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
}

export interface ContactForm {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
}

export interface NavItem {
  label: string;
  href: string;
}
