import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface ProfileData {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  github: string;
  linkedin: string;
  website: string;
  bio: string;
  content: string;
}

export interface ExperienceData {
  id: string;
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string;
  tags: string[];
  featured: boolean;
  content: string;
}

export interface ProjectData {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  tags: string[];
  github?: string;
  demo?: string;
  featured: boolean;
  content: string;
}

export interface SkillsData {
  title: string;
  categories: { name: string; items: string[] }[];
}

function getDataDir(lang: string = 'vie'): string {
  const targetDir = path.join(process.cwd(), `../data/${lang}`);
  if (fs.existsSync(targetDir)) {
    return targetDir;
  }
  return path.join(process.cwd(), '../data/vie');
}

export function getProfileData(lang: string = 'vie'): ProfileData {
  const dataDir = getDataDir(lang);
  const fullPath = path.join(dataDir, 'profile.md');
  if (!fs.existsSync(fullPath)) {
    return {
      name: 'Bùi Đình Huy',
      title: 'Data Analyst & Analytics Engineer',
      email: '',
      phone: '',
      location: '',
      github: '',
      linkedin: '',
      website: '',
      bio: '',
      content: '',
    };
  }
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  return {
    name: data.name || '',
    title: data.title || '',
    email: data.email || '',
    phone: data.phone || '',
    location: data.location || '',
    github: data.github || '',
    linkedin: data.linkedin || '',
    website: data.website || '',
    bio: data.bio || '',
    content,
  };
}

export function getExperiencesData(lang: string = 'vie'): ExperienceData[] {
  const dataDir = getDataDir(lang);
  const expDir = path.join(dataDir, 'experiences');
  if (!fs.existsSync(expDir)) return [];
  const fileNames = fs.readdirSync(expDir);
  const experiences = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const id = fileName.replace(/\.md$/, '');
      const fullPath = path.join(expDir, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);
      return {
        id,
        company: data.company || '',
        role: data.role || '',
        location: data.location || '',
        startDate: data.startDate || '',
        endDate: data.endDate || '',
        tags: data.tags || [],
        featured: data.featured ?? true,
        content,
      };
    });
  return experiences;
}

export function getProjectsData(lang: string = 'vie'): ProjectData[] {
  const dataDir = getDataDir(lang);
  const projDir = path.join(dataDir, 'projects');
  if (!fs.existsSync(projDir)) return [];
  const fileNames = fs.readdirSync(projDir);
  const projects = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const id = fileName.replace(/\.md$/, '');
      const fullPath = path.join(projDir, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);
      return {
        id,
        title: data.title || '',
        subtitle: data.subtitle || '',
        date: data.date || '',
        tags: data.tags || [],
        github: data.github || '',
        demo: data.demo || '',
        featured: data.featured ?? true,
        content,
      };
    });
  return projects;
}

export function getSkillsData(lang: string = 'vie'): SkillsData {
  const dataDir = getDataDir(lang);
  const fullPath = path.join(dataDir, 'skills.md');
  if (!fs.existsSync(fullPath)) {
    return { title: 'Skills', categories: [] };
  }
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  const lines = content.split('\n');
  const categories: { name: string; items: string[] }[] = [];
  let currentCategory: { name: string; items: string[] } | null = null;

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('### ')) {
      if (currentCategory) categories.push(currentCategory);
      currentCategory = { name: trimmed.replace('### ', ''), items: [] };
    } else if (trimmed.startsWith('- ') && currentCategory) {
      currentCategory.items.push(trimmed.replace('- ', ''));
    }
  }
  if (currentCategory) categories.push(currentCategory);

  return {
    title: data.title || 'Skills',
    categories,
  };
}
