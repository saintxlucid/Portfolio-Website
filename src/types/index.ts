export interface ProjectFrontmatter {
  title: string;
  slug: string;
  role: string;
  summary: string;
  tags: string[];
  cover: string;
  date: string;
  links: Array<{
    label: string;
    href: string;
  }>;
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  description?: string;
}

export interface Skill {
  category: string;
  items: string[];
}

export interface Domain {
  title: string;
  description: string;
  icon: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}
