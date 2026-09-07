import fs from 'fs';
import path from 'path';

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

export interface BeyondWorkItem {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  highlights: string[];
}

export interface BeyondWorkData {
  title: string;
  subtitle: string;
  items: BeyondWorkItem[];
}

function loadPortfolioJson() {
  const jsonPath = path.join(process.cwd(), '../data/portfolio.json');
  if (fs.existsSync(jsonPath)) {
    try {
      const raw = fs.readFileSync(jsonPath, 'utf8');
      return JSON.parse(raw);
    } catch (e) {
      console.error('Error parsing portfolio.json:', e);
    }
  }
  return null;
}

export function getProfileData(lang: string = 'vie', track: string = 'master'): ProfileData {
  const data = loadPortfolioJson();
  const langKey = lang === 'eng' ? 'eng' : 'vie';
  const langData = data?.[langKey];
  const profile = langData?.profile;
  const trackData = langData?.tracks?.[track] || langData?.tracks?.master;

  if (!profile) {
    return {
      name: 'Bùi Đình Huy',
      title: 'Business Analytics & Analytics Engineering Consultant',
      email: 'huybui9703@gmail.com',
      phone: '0328979304',
      location: 'Quận Cầu Giấy, Hà Nội, Việt Nam',
      github: 'https://github.com/dewey97',
      linkedin: 'https://www.linkedin.com/in/dinh-huy-bui/',
      website: 'https://dinhhuybui.dev',
      bio: '',
      content: '',
    };
  }

  return {
    name: profile.name || '',
    title: trackData?.title || 'Business Analytics & Analytics Engineering Consultant',
    email: profile.email || '',
    phone: profile.phone || '',
    location: profile.location || '',
    github: profile.github || '',
    linkedin: profile.linkedin || '',
    website: profile.website || '',
    bio: trackData?.bio || '',
    content: trackData?.bio || '',
  };
}

export function getExperiencesData(lang: string = 'vie', track: string = 'master'): ExperienceData[] {
  const data = loadPortfolioJson();
  const langKey = lang === 'eng' ? 'eng' : 'vie';
  const langData = data?.[langKey];
  const trackData = langData?.tracks?.[track] || langData?.tracks?.master;
  const experiences = trackData?.experiences;

  if (!experiences || !Array.isArray(experiences)) {
    return [];
  }

  return experiences.map((exp: any) => {
    const bulletsContent = Array.isArray(exp.bullets)
      ? exp.bullets.map((b: string) => `- ${b}`).join('\n')
      : exp.content || '';

    return {
      id: exp.id,
      company: exp.company || '',
      role: exp.role || '',
      location: exp.location || '',
      startDate: exp.startDate || '',
      endDate: exp.endDate || '',
      tags: exp.tags || [],
      featured: exp.featured ?? true,
      content: bulletsContent,
    };
  });
}

export function getProjectsData(lang: string = 'vie', track: string = 'master'): ProjectData[] {
  const data = loadPortfolioJson();
  const langKey = lang === 'eng' ? 'eng' : 'vie';
  const langData = data?.[langKey];
  const trackData = langData?.tracks?.[track] || langData?.tracks?.master;
  const projects = trackData?.projects;

  if (!projects || !Array.isArray(projects)) {
    return [];
  }

  return projects.map((proj: any) => ({
    id: proj.id,
    title: proj.title || '',
    subtitle: proj.subtitle || '',
    date: proj.date || '',
    tags: proj.tags || [],
    github: proj.github || '',
    demo: proj.demo || '',
    featured: proj.featured ?? true,
    content: proj.description || proj.content || '',
  }));
}

export function getSkillsData(lang: string = 'vie', track: string = 'master'): SkillsData {
  const data = loadPortfolioJson();
  const langKey = lang === 'eng' ? 'eng' : 'vie';
  const langData = data?.[langKey];
  const trackData = langData?.tracks?.[track] || langData?.tracks?.master;
  const skills = trackData?.skills;

  if (!skills) {
    return { title: 'Skills', categories: [] };
  }

  return {
    title: skills.title || 'Skills & Competencies',
    categories: skills.categories || [],
  };
}

export function getBeyondWorkData(lang: string = 'vie'): BeyondWorkData {
  const data = loadPortfolioJson();
  const langKey = lang === 'eng' ? 'eng' : 'vie';
  const beyond = data?.[langKey]?.beyondWork;

  if (!beyond) {
    return {
      title: 'Beyond The Data',
      subtitle: '',
      items: [],
    };
  }

  return {
    title: beyond.title || 'Beyond The Data',
    subtitle: beyond.subtitle || '',
    items: beyond.items || [],
  };
}

