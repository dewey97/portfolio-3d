'use client';

import React, { useState, useEffect } from 'react';
import HeroWrapper from '@/components/3d/HeroWrapper';
import {
  ProfileData,
  ExperienceData,
  ProjectData,
  SkillsData,
  BeyondWorkData,
} from '@/lib/data';
import CvDownloadDropdown from '@/components/ui/CvDownloadDropdown';
import { VietnamFlag, UkFlag } from '@/components/ui/FlagIcons';
import {
  Mail,
  ArrowUpRight,
  Database,
  Server,
  BarChart3,
  Cpu,
} from 'lucide-react';
import { MotionReveal } from '@/components/ui/MotionReveal';

function parseExperienceContent(content: string) {
  const lines = content
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l.startsWith('- '));

  return lines.map((line) => {
    const raw = line.replace(/^- /, '');
    const match = raw.match(/^\*\*(.*?)\*\*:?\s*(.*)$/);
    if (match) {
      return { title: match[1], desc: match[2] };
    }
    return { title: '', desc: raw };
  });
}

function renderFormattedText(text: string) {
  if (!text) return null;
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="font-semibold text-slate-100">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

interface PortfolioViewProps {
  initialData: {
    vie: {
      profile: ProfileData;
      experiences: ExperienceData[];
      projects: ProjectData[];
      skills: SkillsData;
      beyondWork: BeyondWorkData;
    };
    eng: {
      profile: ProfileData;
      experiences: ExperienceData[];
      projects: ProjectData[];
      skills: SkillsData;
      beyondWork: BeyondWorkData;
    };
  };
}

export default function PortfolioView({ initialData }: PortfolioViewProps) {
  const [lang, setLang] = useState<'vie' | 'eng'>('vie');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 120);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const current = initialData[lang];
  const profile = current.profile;
  const experiences = current.experiences;
  const projects = current.projects;
  const beyondWork = current.beyondWork;
  const skills = current.skills;

  const UI_TEXT = {
    vie: {
      nav: {
        about: 'Giới Thiệu',
        experience: 'Kinh Nghiệm',
        projects: 'Dự Án',
        capabilities: 'Năng Lực',
        beyond: 'Bên Lề',
      },
      experience: {
        eyebrow: 'Lịch Sử Công Tác',
        title: 'Kinh Nghiệm Thực Chiến',
        subtitle: 'Thiết kế kiến trúc dữ liệu, giải quyết nút thắt phân tích và tạo giá trị định lượng cho doanh nghiệp.',
      },
      projects: {
        eyebrow: 'Dự Án Thực Tế',
        title: 'Dự Án & Nghiên Cứu Điển Hình',
        subtitle: 'Các giải pháp dữ liệu thực tế đã triển khai và kết quả chuyển đổi kinh doanh.',
        caseReview: 'Xem Chi Tiết',
        caseLabel: 'DỰ ÁN 0',
      },
      capabilities: {
        eyebrow: 'Khung Năng Lực',
        title: 'Bộ Kỹ Năng & Năng Lực Cốt Lõi',
        subtitle: 'Các nhóm năng lực phân tích kinh doanh, cơ sở dữ liệu, trực quan hóa và tự động hóa.',
      },
      footer: '— Hồ sơ Phân tích Dữ liệu & Kỹ thuật Dữ liệu Kinh doanh.',
    },
    eng: {
      nav: {
        about: 'About',
        experience: 'Experience',
        projects: 'Projects',
        capabilities: 'Capabilities',
        beyond: 'Perspectives',
      },
      experience: {
        eyebrow: 'Career Trajectory',
        title: 'Professional Experience',
        subtitle: 'Architecting robust data pipelines, resolving analytical bottlenecks, and delivering measured business impact.',
      },
      projects: {
        eyebrow: 'Case Studies',
        title: 'Featured Projects & Case Studies',
        subtitle: 'Production data solutions, analytical modeling, and quantified business outcomes.',
        caseReview: 'Case Review',
        caseLabel: 'CASE STUDY 0',
      },
      capabilities: {
        eyebrow: 'Core Competencies',
        title: 'Technical & Analytical Stack',
        subtitle: 'Key skillsets across business consulting, database engineering, BI visualization, and programming.',
      },
      footer: '— Business Analytics & Analytics Engineering Portfolio.',
    },
  }[lang];

  return (
    <main className="min-h-screen bg-[#070b14] text-slate-100 selection:bg-blue-900/50 selection:text-blue-100 antialiased font-sans relative">
      {/* Ambient Midnight Blue Radial Lighting */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(30,58,138,0.22),transparent_70%)]" />
      <div className="fixed inset-0 pointer-events-none z-0 bg-[radial-gradient(ellipse_60%_40%_at_100%_60%,rgba(14,116,144,0.08),transparent_60%)]" />

      {/* HEADER / NAVIGATION */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'backdrop-blur-md bg-[#070b14]/85 border-b border-slate-800/80 shadow-md shadow-black/60'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a
            href="#"
            className={`font-bold text-base tracking-tight hover:text-blue-300 transition-all duration-300 shrink-0 flex items-center gap-1 ${
              isScrolled ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
            }`}
          >
            <span>Dewey</span>
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
          </a>
          
          <nav className="flex items-center space-x-6 text-sm text-slate-400">
            <div className="hidden md:flex items-center space-x-6">
              <a href="#about" className="hover:text-slate-100 transition">{UI_TEXT.nav.about}</a>
              <a href="#experience" className="hover:text-slate-100 transition">{UI_TEXT.nav.experience}</a>
              <a href="#projects" className="hover:text-slate-100 transition">{UI_TEXT.nav.projects}</a>
              <a href="#capabilities" className="hover:text-slate-100 transition">{UI_TEXT.nav.capabilities}</a>
              <a href="#beyond" className="hover:text-slate-100 transition">{UI_TEXT.nav.beyond}</a>
            </div>
            
            {/* PROMINENT SVG FLAG LANGUAGE TOGGLE */}
            <div className="flex items-center bg-slate-900/90 shadow-inner rounded-md p-0.5 ring-1 ring-slate-800 gap-0.5">
              <button
                onClick={() => setLang('vie')}
                className={`flex items-center justify-center p-1 rounded transition-all duration-150 cursor-pointer ${
                  lang === 'vie'
                    ? 'bg-slate-800 shadow-sm ring-1 ring-blue-500/30 opacity-100'
                    : 'opacity-40 hover:opacity-90 hover:bg-slate-800/40'
                }`}
                title="Tiếng Việt"
                aria-label="Tiếng Việt"
              >
                <VietnamFlag className="w-7 h-4.5 shrink-0 shadow-sm" />
              </button>
              <button
                onClick={() => setLang('eng')}
                className={`flex items-center justify-center p-1 rounded transition-all duration-150 cursor-pointer ${
                  lang === 'eng'
                    ? 'bg-slate-800 shadow-sm ring-1 ring-blue-500/30 opacity-100'
                    : 'opacity-40 hover:opacity-90 hover:bg-slate-800/40'
                }`}
                title="English"
                aria-label="English"
              >
                <UkFlag className="w-7 h-4.5 shrink-0 shadow-sm" />
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* HERO SECTION WITH 3D FULL BACKGROUND - FULL SCREEN 100VH */}
      <section id="about" className="relative min-h-screen flex items-center">
        {/* 3D FULL BACKGROUND CANVAS */}
        <div className="absolute inset-0 z-0 pointer-events-auto overflow-hidden">
          <HeroWrapper />
        </div>

        {/* Ambient Overlays with subtle midnight blue tint */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-r from-[#070b14] via-[#070b14]/80 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-32 z-[1] bg-gradient-to-t from-[#070b14] via-[#070b14]/70 to-transparent pointer-events-none" />

        {/* HERO CONTENT */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 w-full">
          <div className="max-w-2xl space-y-6">
            <MotionReveal delay={0.1}>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-zinc-100 leading-tight">
                {profile.name}
              </h1>
            </MotionReveal>

            <MotionReveal delay={0.2}>
              <h2 className="text-xl md:text-2xl text-zinc-300 font-medium tracking-tight">
                {profile.title}
              </h2>
            </MotionReveal>

            <MotionReveal delay={0.3}>
              <p className="text-zinc-400 leading-relaxed text-base md:text-lg font-normal max-w-xl">
                {profile.bio}
              </p>
            </MotionReveal>

            <MotionReveal delay={0.4}>
              <div className="flex flex-wrap items-center gap-3 pt-3 relative z-30">
                {/* CV / RESUME DROPDOWN IN HERO */}
                <CvDownloadDropdown lang={lang} />

                {profile.github && (
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="GitHub"
                    className="p-2.5 rounded-lg bg-slate-900/90 hover:bg-slate-800 text-slate-400 hover:text-blue-300 transition shadow-lg shadow-black/60 ring-1 ring-blue-500/15"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                  </a>
                )}
                {profile.linkedin && (
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="LinkedIn"
                    className="p-2.5 rounded-lg bg-slate-900/90 hover:bg-slate-800 text-slate-400 hover:text-blue-300 transition shadow-lg shadow-black/60 ring-1 ring-blue-500/15"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                )}
                {profile.email && (
                  <a
                    href={`mailto:${profile.email}`}
                    className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-lg bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-blue-200 transition text-xs font-mono shadow-lg shadow-black/60 ring-1 ring-blue-500/15"
                  >
                    <Mail className="w-3.5 h-3.5 text-blue-400" />
                    {profile.email}
                  </a>
                )}
              </div>
            </MotionReveal>
          </div>
        </div>
      </section>

      {/* EXPERIENCE SECTION - ENGINEERING DOSSIER */}
      <section id="experience" className="max-w-6xl mx-auto px-6 py-20 border-t border-slate-800/60">
        <MotionReveal>
          <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-12 gap-3">
            <div>
              <span className="text-xs font-mono text-blue-400 uppercase tracking-wider block mb-1">
                {UI_TEXT.experience.eyebrow}
              </span>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-100">
                {UI_TEXT.experience.title}
              </h2>
            </div>
            <p className="text-slate-400 text-sm font-normal max-w-lg leading-relaxed">
              {UI_TEXT.experience.subtitle}
            </p>
          </div>
        </MotionReveal>

        {/* CHRONOLOGICAL DOSSIER LIST WITH TACTILE FLOATING CARDS */}
        <div className="space-y-6">
          {experiences.map((exp, index) => {
            const bullets = parseExperienceContent(exp.content);

            return (
              <MotionReveal key={exp.id} delay={index * 0.1}>
                <div className="group p-6 md:p-8 rounded-xl bg-[#0b1222]/75 hover:bg-[#0f1930]/90 shadow-xl shadow-[#020617]/80 hover:shadow-2xl hover:shadow-blue-950/40 hover:-translate-y-1 transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative overflow-hidden backdrop-blur-md">
                  {/* LEFT COLUMN: COMPANY, ROLE & TIMELINE */}
                  <div className="lg:col-span-4 space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-blue-400/80 group-hover:text-blue-400 transition-colors">0{index + 1}</span>
                      <span className="text-slate-700">•</span>
                      <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold group-hover:text-slate-300 transition-colors">
                        {exp.company}
                      </h4>
                    </div>

                    <h3 className="text-xl font-bold text-slate-100 group-hover:text-white transition-colors">
                      {exp.role}
                    </h3>

                    <div className="flex flex-wrap items-center gap-2 pt-1 font-mono text-xs">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#060b17] text-slate-300 ring-1 ring-slate-800/80">
                        {exp.startDate} — {exp.endDate}
                      </span>
                      <span className="px-2.5 py-1 rounded-md bg-[#060b17] text-slate-400 ring-1 ring-slate-800/80">
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  {/* RIGHT COLUMN: ARCHITECTURAL NARRATIVE & IMPACT */}
                  <div className="lg:col-span-8 space-y-5">
                    <div className="space-y-3">
                      {bullets.map((bullet, bIdx) => (
                        <div key={bIdx} className="flex items-start gap-3 text-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500/60 mt-2 shrink-0 group-hover:bg-blue-400 transition-colors" />
                          <p className="text-slate-300 leading-relaxed font-normal">
                            {bullet.title && <strong className="text-slate-100 font-semibold">{bullet.title}: </strong>}
                            {renderFormattedText(bullet.desc)}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* STACK TOKENS */}
                    {exp.tags && exp.tags.length > 0 && (
                      <div className="flex flex-wrap items-center gap-1.5 pt-2">
                        <span className="text-xs font-mono text-slate-500 mr-1">Stack:</span>
                        {exp.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs font-mono px-2.5 py-1 rounded-md bg-[#060b17] shadow-inner text-blue-300 hover:text-blue-200 transition-colors ring-1 ring-blue-900/40"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </MotionReveal>
            );
          })}
        </div>
      </section>

      {/* FEATURED CASE STUDIES & PROJECTS */}
      <section id="projects" className="max-w-6xl mx-auto px-6 py-20 border-t border-slate-800/60">
        <MotionReveal>
          <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-12 gap-3">
            <div>
              <span className="text-xs font-mono text-blue-400 uppercase tracking-wider block mb-1">
                {UI_TEXT.projects.eyebrow}
              </span>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-100">
                {UI_TEXT.projects.title}
              </h2>
            </div>
            <p className="text-slate-400 text-sm font-normal max-w-lg leading-relaxed">
              {UI_TEXT.projects.subtitle}
            </p>
          </div>
        </MotionReveal>

        {/* EDITORIAL CASE STUDY CARDS - FLOATING DEEP CARDS WITHOUT HARSH BORDERS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((proj, pIdx) => (
            <MotionReveal key={proj.id} delay={pIdx * 0.1}>
              <div className="group rounded-xl bg-[#0b1222]/75 hover:bg-[#0f1930]/90 p-6 md:p-8 flex flex-col justify-between h-full shadow-xl shadow-[#020617]/80 hover:shadow-2xl hover:shadow-blue-950/40 hover:-translate-y-1.5 transition-all duration-300 relative overflow-hidden backdrop-blur-md">
                <div className="space-y-4">
                  <div className="flex items-center justify-between font-mono text-xs text-slate-400">
                    <span className="text-blue-400 group-hover:text-blue-300 transition-colors">{UI_TEXT.projects.caseLabel}{pIdx + 1}</span>
                    <span>{proj.date}</span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-slate-100 group-hover:text-white transition-colors">
                      {proj.title}
                    </h3>
                    <p className="text-xs font-mono text-blue-300/80 mt-1">
                      {proj.subtitle}
                    </p>
                  </div>

                  <p className="text-slate-300 text-sm leading-relaxed font-normal">
                    {renderFormattedText(proj.content.trim())}
                  </p>
                </div>

                <div className="pt-4 mt-2 space-y-4">
                  <div className="flex flex-wrap gap-1.5">
                    {proj.tags.map((tag) => (
                      <span key={tag} className="text-xs font-mono px-2.5 py-1 rounded-md bg-[#060b17] shadow-inner text-blue-300 ring-1 ring-blue-900/40">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 text-xs font-mono">
                    {proj.github && proj.github !== 'https://github.com/dewey97' && (
                      <a
                        href={proj.github}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-slate-400 hover:text-blue-300 transition"
                      >
                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                        </svg>
                        Repository
                      </a>
                    )}
                    {proj.demo && (
                      <a
                        href={proj.demo}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-blue-300 hover:text-white transition ml-auto group/btn"
                      >
                        <span>{UI_TEXT.projects.caseReview}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </MotionReveal>
          ))}
        </div>
      </section>

      {/* CORE COMPETENCIES & SKILLS MATRIX */}
      <section id="capabilities" className="max-w-6xl mx-auto px-6 py-20 border-t border-slate-800/60">
        <MotionReveal>
          <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-12 gap-3">
            <div>
              <span className="text-xs font-mono text-blue-400 uppercase tracking-wider block mb-1">
                {UI_TEXT.capabilities.eyebrow}
              </span>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-100">
                {UI_TEXT.capabilities.title}
              </h2>
            </div>
            <p className="text-slate-400 text-sm font-normal max-w-lg leading-relaxed">
              {UI_TEXT.capabilities.subtitle}
            </p>
          </div>
        </MotionReveal>

        {/* 4-COLUMN SKILLS MATRIX */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills && skills.categories && skills.categories.map((cat, idx) => {
            const icons = [Database, Server, BarChart3, Cpu];
            const Icon = icons[idx % icons.length];
            return (
              <MotionReveal key={cat.name} delay={idx * 0.08}>
                <div className="group p-6 rounded-xl bg-[#0b1222]/75 hover:bg-[#0f1930]/90 shadow-xl shadow-[#020617]/80 hover:shadow-2xl hover:shadow-blue-950/40 hover:-translate-y-1.5 transition-all duration-300 space-y-4 relative overflow-hidden backdrop-blur-md h-full flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs text-blue-400 font-semibold group-hover:text-blue-300 transition-colors">
                        0{idx + 1}
                      </span>
                      <Icon className="w-4 h-4 text-blue-400 group-hover:text-blue-300 transition-colors" />
                    </div>

                    <div>
                      <h3 className="text-base font-bold text-slate-100 group-hover:text-white transition-colors leading-snug">
                        {cat.name}
                      </h3>
                    </div>

                    <div className="space-y-1.5 pt-2">
                      {cat.items.map((item) => (
                        <div
                          key={item}
                          className="text-xs font-mono text-slate-300 py-0.5 group-hover:text-blue-200 transition-colors"
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </MotionReveal>
            );
          })}
        </div>
      </section>

      {/* BEYOND WORK / PERSPECTIVES */}
      {beyondWork && beyondWork.items.length > 0 && (
        <section id="beyond" className="max-w-6xl mx-auto px-6 py-20 border-t border-slate-800/60">
          <MotionReveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
              <div>
                <span className="text-xs font-mono text-blue-400 uppercase tracking-wider block mb-1">
                  {lang === 'vie' ? 'Góc Nhìn Khác' : 'Perspectives'}
                </span>
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-100">
                  {beyondWork.title}
                </h2>
              </div>
              <p className="text-slate-400 text-sm font-normal max-w-lg leading-relaxed md:text-right">
                {beyondWork.subtitle}
              </p>
            </div>
          </MotionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {beyondWork.items.map((item, bIdx) => {
              return (
                <MotionReveal key={item.id} delay={bIdx * 0.1}>
                  <div className="group rounded-xl bg-[#0b1222]/75 hover:bg-[#0f1930]/90 p-6 md:p-8 flex flex-col justify-between h-full space-y-4 shadow-xl shadow-[#020617]/80 hover:shadow-2xl hover:shadow-blue-950/40 hover:-translate-y-1.5 transition-all duration-300 relative overflow-hidden backdrop-blur-md">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between font-mono text-xs">
                        <span className="text-blue-400/80 group-hover:text-blue-300 transition-colors">{item.tag}</span>
                      </div>

                      <div>
                        <h3 className="text-lg font-bold text-slate-100 group-hover:text-white transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-xs font-mono text-slate-400 mt-0.5">{item.subtitle}</p>
                      </div>

                      <p className="text-slate-300 text-sm leading-relaxed font-normal">
                        {renderFormattedText(item.description)}
                      </p>
                    </div>

                    {item.highlights && item.highlights.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {item.highlights.map((hl) => (
                          <span
                            key={hl}
                            className="text-xs font-mono px-2.5 py-1 rounded-md bg-[#060b17] shadow-inner text-blue-300 group-hover:text-blue-200 transition-colors ring-1 ring-blue-900/40"
                          >
                            {hl}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </MotionReveal>
              );
            })}
          </div>
        </section>
      )}
    </main>
  );
}
