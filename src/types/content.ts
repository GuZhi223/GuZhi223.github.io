export type WorkCategory = 'interactive' | 'tool' | 'course' | 'archive';

export type WorkOrigin = 'original' | 'localized' | 'curated' | 'course';

export interface FeaturedProject {
  id: string;
  title: string;
  summary: string;
  problem: string;
  contribution: string;
  technologies: string[];
  image: string;
  imageAlt: string;
  githubUrl?: string;
  demoUrl?: string;
  status?: string;
}

export interface WorkItem {
  id: string;
  title: string;
  description: string;
  href: string;
  category: WorkCategory;
  origin: WorkOrigin;
  technologies: string[];
  image?: string;
}

export interface RepositoryItem {
  name: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  featured?: boolean;
  status?: string;
}
