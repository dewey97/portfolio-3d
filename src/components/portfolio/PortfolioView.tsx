'use client';

import React, { useState } from 'react';
import HeroWrapper from '@/components/3d/HeroWrapper';
import {
  ProfileData,
  ExperienceData,
  ProjectData,
  SkillsData,
  BeyondWorkData,
} from '@/lib/data';
import CvDownloadDropdown from '@/components/ui/CvDownloadDropdown';
import ArchitecturalLineage from '@/components/ui/ArchitecturalLineage';
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

const ARCHITECTURE_MATRIX = {
  vie: [
    {
      layer: '01',
      name: 'Thu Thập & Xử Lý (Ingestion & ETL)',
      icon: Database,
      description: 'Trích xuất và chuẩn hóa dữ liệu thô từ APIs, POS, GA4 và Webhooks theo chu kỳ micro-batch.',
      skills: ['Python Polars / Pandas', 'Tích hợp REST APIs', 'Đồng bộ POS Webhooks', 'GA4 BigQuery Export', 'PySpark (Xử lý dữ liệu lớn)'],
    },
    {
      layer: '02',
      name: 'Lưu Trữ & Kho Dữ Liệu (Warehouse)',
      icon: Server,
      description: 'Mô hình hóa dữ liệu Star Schema, tối ưu composite indexes và phân vùng bảng phục vụ truy vấn tốc độ cao.',
      skills: ['PostgreSQL Database', 'DuckDB Analytics Engine', 'Star Schema (Fact / Dims)', 'Phân vùng & Tối ưu câu lệnh', 'Định dạng Parquet Columnar'],
    },
    {
      layer: '03',
      name: 'Kỹ Thuật Phân Tích & Báo Cáo (BI)',
      icon: BarChart3,
      description: 'Thiết kế mô hình dữ liệu kinh doanh, hệ thống dashboard quản trị tự phục vụ (Self-serve BI).',
      skills: ['Metabase Advanced SQL', 'Báo cáo P&L Điều hành', 'Phân tích Giữ chân Cohort & RFM', 'Tự động hóa Data Marts', 'Chuẩn hóa mô hình dbt'],
    },
    {
      layer: '04',
      name: 'Trợ Lý Điều Hành & AI (Decision Layer)',
      icon: Cpu,
      description: 'Tự động hóa cảnh báo bất thường và tích hợp quy trình AI/LLM cho tối ưu hóa vận hành.',
      skills: ['Bot cảnh báo Telegram / Slack', 'Thuật toán phát hiện bất thường', 'Quy trình AI / LLM Agents', 'Data Governance & SLA', 'Tối ưu hóa chỉ số KPI'],
    },
  ],
  eng: [
    {
      layer: '01',
      name: 'Ingestion & ETL',
      icon: Database,
      description: 'Extract and standardize raw payloads from APIs, POS, GA4, and Webhooks in micro-batches.',
      skills: ['Python Polars / Pandas', 'REST API Integration', 'POS Webhook Sync', 'GA4 BigQuery Export', 'PySpark (Big Data)'],
    },
    {
      layer: '02',
      name: 'Storage & Warehouse',
      icon: Server,
      description: 'Star-schema dimensional modeling, composite indexing, and date-based table partitioning.',
      skills: ['PostgreSQL Database', 'DuckDB Analytics Engine', 'Star Schema Fact/Dims', 'Table Partitioning & Tuning', 'Columnar Parquet Marts'],
    },
    {
      layer: '03',
      name: 'Analytics Engineering & BI',
      icon: BarChart3,
      description: 'Business data modeling, executive decision metrics, and self-serve BI infrastructure.',
      skills: ['Metabase Advanced SQL', 'Executive P&L Models', 'Cohort & RFM Retention', 'Automated Daily Marts', 'dbt Data Modeling'],
    },
    {
      layer: '04',
      name: 'Decision Intelligence & AI',
      icon: Cpu,
      description: 'Automated anomaly threshold triggers, operational bots, and AI/LLM workflows.',
      skills: ['Telegram/Slack Alert Bot', 'Anomaly Detection Logic', 'AI/LLM Agent Pipelines', 'Data Governance SLA', 'Business KPI Optimization'],
    },
  ],
};

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

  const current = initialData[lang];
  const profile = current.profile;
  const experiences = current.experiences;
  const projects = current.projects;
  const beyondWork = current.beyondWork;
  const matrix = ARCHITECTURE_MATRIX[lang];

  const UI_TEXT = {
    vie: {
      nav: {
        about: 'Giới Thiệu',
        experience: 'Kinh Nghiệm',
        architecture: 'Kiến Trúc',
        projects: 'Dự Án',
        capabilities: 'Năng Lực',
        beyond: 'Bên Lề',
      },
      experience: {
        eyebrow: 'Lịch Sử Công Tác',
        title: 'Kinh Nghiệm Thực Chiến',
        subtitle: 'Thiết kế kiến trúc dữ liệu, giải quyết nút thắt phân tích và tạo giá trị định lượng cho doanh nghiệp.',
      },
      architecture: {
        eyebrow: 'Kiến Trúc Hệ Thống',
        title: 'Kiến Trúc Pipeline Dữ Liệu',
        subtitle: 'Quy trình trích xuất, chuẩn hóa và mô hình hóa dữ liệu phục vụ quyết định cấp điều hành.',
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
        title: 'Khung Năng Lực Kiến Trúc',
        subtitle: '4 tầng năng lực cốt lõi trong quy trình kỹ thuật dữ liệu và phân tích kinh doanh.',
      },
      footer: '— Hồ sơ Phân tích Dữ liệu & Kỹ thuật Dữ liệu Kinh doanh.',
    },
    eng: {
      nav: {
        about: 'About',
        experience: 'Experience',
        architecture: 'Architecture',
        projects: 'Projects',
        capabilities: 'Capabilities',
        beyond: 'Perspectives',
      },
      experience: {
        eyebrow: 'Career Trajectory',
        title: 'Professional Experience',
        subtitle: 'Architecting robust data pipelines, resolving analytical bottlenecks, and delivering measured business impact.',
      },
      architecture: {
        eyebrow: 'System Lineage',
        title: 'Data Pipeline Architecture',
        subtitle: 'End-to-end extraction, transformation, and semantic modeling powering executive decisions.',
      },
      projects: {
        eyebrow: 'Case Studies',
        title: 'Featured Projects & Case Studies',
        subtitle: 'Production data solutions, analytical modeling, and quantified business outcomes.',
        caseReview: 'Case Review',
        caseLabel: 'CASE STUDY 0',
      },
      capabilities: {
        eyebrow: 'Data Stack',
        title: 'Technical Architecture Capabilities',
        subtitle: '4 core architectural layers spanning data engineering, semantic warehousing, and decision intelligence.',
      },
      footer: '— Business Analytics & Analytics Engineering Portfolio.',
    },
  }[lang];

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 selection:bg-zinc-800 selection:text-zinc-100 antialiased font-sans">
      {/* HEADER / NAVIGATION */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-zinc-950/80 border-b border-zinc-800/60">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#" className="font-semibold text-base tracking-tight hover:text-zinc-300 transition">
            {profile.name}
          </a>
          <nav className="flex items-center space-x-6 text-sm text-zinc-400">
            <a href="#about" className="hover:text-zinc-100 transition">{UI_TEXT.nav.about}</a>
            <a href="#experience" className="hover:text-zinc-100 transition">{UI_TEXT.nav.experience}</a>
            <a href="#architecture" className="hover:text-zinc-100 transition">{UI_TEXT.nav.architecture}</a>
            <a href="#projects" className="hover:text-zinc-100 transition">{UI_TEXT.nav.projects}</a>
            <a href="#capabilities" className="hover:text-zinc-100 transition">{UI_TEXT.nav.capabilities}</a>
            <a href="#beyond" className="hover:text-zinc-100 transition">{UI_TEXT.nav.beyond}</a>
            
            {/* SVG FLAG LANGUAGE TOGGLE */}
            <div className="flex items-center bg-zinc-900/90 shadow-inner rounded-xl p-0.5 text-xs ring-1 ring-white/10">
              <button
                onClick={() => setLang('vie')}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition-all duration-200 text-xs cursor-pointer ${
                  lang === 'vie'
                    ? 'bg-zinc-800 text-white font-semibold shadow-md shadow-black/60 ring-1 ring-white/10'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
                }`}
                aria-label="Tiếng Việt"
              >
                <VietnamFlag className="w-4 h-3" />
                <span className="font-mono text-[11px]">VI</span>
              </button>
              <button
                onClick={() => setLang('eng')}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition-all duration-200 text-xs cursor-pointer ${
                  lang === 'eng'
                    ? 'bg-zinc-800 text-white font-semibold shadow-md shadow-black/60 ring-1 ring-white/10'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
                }`}
                aria-label="English"
              >
                <UkFlag className="w-4 h-3" />
                <span className="font-mono text-[11px]">EN</span>
              </button>
            </div>

            {/* MULTI-TRACK CV DOWNLOAD DROPDOWN */}
            <CvDownloadDropdown lang={lang} />
          </nav>
        </div>
      </header>

      {/* HERO SECTION WITH 3D FULL BACKGROUND */}
      <section id="about" className="relative min-h-[80vh] flex items-center overflow-hidden border-b border-zinc-800/60">
        {/* 3D FULL BACKGROUND CANVAS */}
        <div className="absolute inset-0 z-0 pointer-events-auto">
          <HeroWrapper />
        </div>

        {/* Ambient Overlays */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-r from-zinc-950 via-zinc-950/75 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-24 z-[1] bg-gradient-to-t from-zinc-950 to-transparent pointer-events-none" />

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
              <div className="flex flex-wrap items-center gap-4 pt-3">
                {profile.github && (
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="GitHub"
                    className="p-2.5 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-100 transition shadow-lg shadow-black/50 ring-1 ring-white/5"
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
                    className="p-2.5 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-100 transition shadow-lg shadow-black/50 ring-1 ring-white/5"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                )}
                {profile.email && (
                  <a
                    href={`mailto:${profile.email}`}
                    className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 text-zinc-300 hover:text-zinc-100 transition text-xs font-mono shadow-lg shadow-black/50 ring-1 ring-white/5"
                  >
                    <Mail className="w-3.5 h-3.5 text-zinc-400" />
                    {profile.email}
                  </a>
                )}
              </div>
            </MotionReveal>
          </div>
        </div>
      </section>

      {/* EXPERIENCE SECTION - ENGINEERING DOSSIER */}
      <section id="experience" className="max-w-6xl mx-auto px-6 py-20 border-t border-zinc-800/60">
        <MotionReveal>
          <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-16 gap-3 pb-6 border-b border-zinc-800/60">
            <div>
              <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider block mb-1">
                {UI_TEXT.experience.eyebrow}
              </span>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-zinc-100">
                {UI_TEXT.experience.title}
              </h2>
            </div>
            <p className="text-zinc-400 text-xs font-mono max-w-md">
              {UI_TEXT.experience.subtitle}
            </p>
          </div>
        </MotionReveal>

        {/* CHRONOLOGICAL DOSSIER LIST WITH TACTILE FLOATING CARDS */}
        <div className="space-y-6">
          {experiences.map((exp, index) => {
            const isCurrent = exp.endDate.toLowerCase().includes('hiện tại') || exp.endDate.toLowerCase().includes('present');
            const bullets = parseExperienceContent(exp.content);

            return (
              <MotionReveal key={exp.id} delay={index * 0.1}>
                <div className="group p-6 md:p-8 rounded-2xl bg-zinc-900/60 shadow-xl shadow-black/70 hover:shadow-2xl hover:shadow-black hover:bg-zinc-900/80 hover:-translate-y-1 transition-all duration-300 ring-1 ring-white/5 hover:ring-white/15 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative overflow-hidden backdrop-blur-md">
                  {/* LEFT COLUMN: COMPANY, ROLE & TIMELINE */}
                  <div className="lg:col-span-4 space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-zinc-500 group-hover:text-zinc-400 transition-colors">0{index + 1}</span>
                      <span className="text-zinc-700">•</span>
                      <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold group-hover:text-zinc-300 transition-colors">
                        {exp.company}
                      </h4>
                    </div>

                    <h3 className="text-xl font-bold text-zinc-100 group-hover:text-white transition-colors">
                      {exp.role}
                    </h3>

                    <div className="flex flex-wrap items-center gap-2 pt-1 font-mono text-xs">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg ring-1 shadow-sm ${
                        isCurrent
                          ? 'bg-emerald-950/50 text-emerald-300 ring-emerald-800/60 shadow-emerald-950/50'
                          : 'bg-zinc-950/60 text-zinc-400 ring-white/5'
                      }`}>
                        {isCurrent && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />}
                        {exp.startDate} — {exp.endDate}
                      </span>
                      <span className="px-2.5 py-1 rounded-lg bg-zinc-950/60 text-zinc-500 ring-1 ring-white/5">
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  {/* RIGHT COLUMN: ARCHITECTURAL NARRATIVE & IMPACT */}
                  <div className="lg:col-span-8 space-y-5">
                    <div className="space-y-3">
                      {bullets.map((bullet, bIdx) => (
                        <div key={bIdx} className="flex items-start gap-3 text-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-zinc-600 mt-2 shrink-0 group-hover:bg-zinc-400 transition-colors" />
                          <p className="text-zinc-300 leading-relaxed font-normal">
                            {bullet.title && <strong className="text-zinc-100 font-semibold">{bullet.title}: </strong>}
                            {bullet.desc}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* STACK TOKENS */}
                    {exp.tags && exp.tags.length > 0 && (
                      <div className="flex flex-wrap items-center gap-1.5 pt-4 border-t border-zinc-800/40">
                        <span className="text-xs font-mono text-zinc-500 mr-1">Stack:</span>
                        {exp.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs font-mono px-2.5 py-1 rounded-md bg-zinc-950/80 shadow-inner text-zinc-400 hover:text-zinc-200 transition-colors ring-1 ring-white/5"
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

      {/* ARCHITECTURE & DATA LINEAGE SECTION */}
      <section id="architecture" className="max-w-6xl mx-auto px-6 py-20 border-t border-zinc-800/60">
        <MotionReveal>
          <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-12 gap-3 pb-6 border-b border-zinc-800/60">
            <div>
              <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider block mb-1">
                {UI_TEXT.architecture.eyebrow}
              </span>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-zinc-100">
                {UI_TEXT.architecture.title}
              </h2>
            </div>
            <p className="text-zinc-400 text-xs font-mono max-w-md">
              {UI_TEXT.architecture.subtitle}
            </p>
          </div>
        </MotionReveal>

        <MotionReveal delay={0.1}>
          <ArchitecturalLineage lang={lang} />
        </MotionReveal>
      </section>

      {/* FEATURED CASE STUDIES & PROJECTS */}
      <section id="projects" className="max-w-6xl mx-auto px-6 py-20 border-t border-zinc-800/60">
        <MotionReveal>
          <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-12 gap-3 pb-6 border-b border-zinc-800/60">
            <div>
              <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider block mb-1">
                {UI_TEXT.projects.eyebrow}
              </span>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-zinc-100">
                {UI_TEXT.projects.title}
              </h2>
            </div>
            <p className="text-zinc-400 text-xs font-mono max-w-md">
              {UI_TEXT.projects.subtitle}
            </p>
          </div>
        </MotionReveal>

        {/* EDITORIAL CASE STUDY CARDS - FLOATING DEEP CARDS WITHOUT HARSH BORDERS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((proj, pIdx) => (
            <MotionReveal key={proj.id} delay={pIdx * 0.1}>
              <div className="group rounded-2xl bg-zinc-900/60 hover:bg-zinc-900/80 p-6 md:p-8 flex flex-col justify-between h-full shadow-xl shadow-black/80 hover:shadow-2xl hover:shadow-black hover:-translate-y-2 transition-all duration-300 ring-1 ring-white/5 hover:ring-white/15 relative overflow-hidden backdrop-blur-md">
                <div className="space-y-4">
                  <div className="flex items-center justify-between font-mono text-xs text-zinc-500">
                    <span className="group-hover:text-zinc-400 transition-colors">{UI_TEXT.projects.caseLabel}{pIdx + 1}</span>
                    <span>{proj.date}</span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-zinc-100 group-hover:text-white transition-colors">
                      {proj.title}
                    </h3>
                    <p className="text-xs font-mono text-zinc-400 mt-1">
                      {proj.subtitle}
                    </p>
                  </div>

                  <p className="text-zinc-400 text-sm leading-relaxed font-normal">
                    {proj.content.trim()}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-zinc-800/40 space-y-4">
                  <div className="flex flex-wrap gap-1.5">
                    {proj.tags.map((tag) => (
                      <span key={tag} className="text-xs font-mono px-2.5 py-1 rounded-md bg-zinc-950/80 shadow-inner text-zinc-400 ring-1 ring-white/5">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 text-xs font-mono">
                    {proj.github && (
                      <a
                        href={proj.github}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-zinc-400 hover:text-zinc-100 transition"
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
                        className="inline-flex items-center gap-1 text-zinc-300 hover:text-white transition ml-auto group/btn"
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

      {/* TECHNICAL ARCHITECTURE MATRIX (SKILLS) */}
      <section id="capabilities" className="max-w-6xl mx-auto px-6 py-20 border-t border-zinc-800/60">
        <MotionReveal>
          <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-12 gap-3 pb-6 border-b border-zinc-800/60">
            <div>
              <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider block mb-1">
                {UI_TEXT.capabilities.eyebrow}
              </span>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-zinc-100">
                {UI_TEXT.capabilities.title}
              </h2>
            </div>
            <p className="text-zinc-400 text-xs font-mono max-w-md">
              {UI_TEXT.capabilities.subtitle}
            </p>
          </div>
        </MotionReveal>

        {/* 4-COLUMN TACTILE MATRIX - FLOATING TILES */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {matrix.map((col, idx) => {
            const Icon = col.icon;
            return (
              <MotionReveal key={col.layer} delay={idx * 0.08}>
                <div className="group p-6 rounded-2xl bg-zinc-900/60 hover:bg-zinc-900/80 shadow-xl shadow-black/70 hover:shadow-2xl hover:shadow-black hover:-translate-y-1.5 transition-all duration-300 ring-1 ring-white/5 hover:ring-white/15 space-y-4 relative overflow-hidden backdrop-blur-md">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-zinc-500 font-semibold group-hover:text-zinc-400 transition-colors">
                      LAYER {col.layer}
                    </span>
                    <Icon className="w-4 h-4 text-zinc-400 group-hover:text-zinc-200 transition-colors" />
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-zinc-100 group-hover:text-white transition-colors">
                      {col.name}
                    </h3>
                    <p className="text-xs text-zinc-400 leading-relaxed mt-1 font-normal">
                      {col.description}
                    </p>
                  </div>

                  <div className="space-y-1.5 pt-2">
                    {col.skills.map((s) => (
                      <div
                        key={s}
                        className="text-xs font-mono text-zinc-300 py-1 border-b border-zinc-800/40 last:border-0 group-hover:text-zinc-200 transition-colors"
                      >
                        {s}
                      </div>
                    ))}
                  </div>
                </div>
              </MotionReveal>
            );
          })}
        </div>
      </section>

      {/* BEYOND WORK / PERSPECTIVES */}
      {beyondWork && beyondWork.items.length > 0 && (
        <section id="beyond" className="max-w-6xl mx-auto px-6 py-20 border-t border-zinc-800/60">
          <MotionReveal>
            <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-12 gap-3 pb-6 border-b border-zinc-800/60">
              <div>
                <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider block mb-1">
                  {lang === 'vie' ? 'Góc Nhìn Khác' : 'Perspectives'}
                </span>
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-zinc-100">
                  {beyondWork.title}
                </h2>
              </div>
              <p className="text-zinc-400 text-xs font-mono max-w-md">
                {beyondWork.subtitle}
              </p>
            </div>
          </MotionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {beyondWork.items.map((item, bIdx) => {
              return (
                <MotionReveal key={item.id} delay={bIdx * 0.1}>
                  <div className="group rounded-2xl bg-zinc-900/60 hover:bg-zinc-900/80 p-6 md:p-8 flex flex-col justify-between h-full space-y-4 shadow-xl shadow-black/70 hover:shadow-2xl hover:shadow-black hover:-translate-y-1.5 transition-all duration-300 ring-1 ring-white/5 hover:ring-white/15 relative overflow-hidden backdrop-blur-md">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between font-mono text-xs">
                        <span className="text-zinc-500 group-hover:text-zinc-400 transition-colors">{item.tag}</span>
                      </div>

                      <div>
                        <h3 className="text-lg font-bold text-zinc-100 group-hover:text-white transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-xs font-mono text-zinc-400 mt-0.5">{item.subtitle}</p>
                      </div>

                      <p className="text-zinc-400 text-sm leading-relaxed font-normal">
                        {item.description}
                      </p>
                    </div>

                    {item.highlights && item.highlights.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-4 border-t border-zinc-800/40">
                        {item.highlights.map((hl) => (
                          <span
                            key={hl}
                            className="text-xs font-mono px-2.5 py-1 rounded-md bg-zinc-950/80 shadow-inner text-zinc-400 group-hover:text-zinc-200 transition-colors ring-1 ring-white/5"
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

      {/* FOOTER */}
      <footer className="border-t border-zinc-800/60 py-8 bg-zinc-950 text-center text-xs text-zinc-500 font-mono">
        <p>© {new Date().getFullYear()} {profile.name} {UI_TEXT.footer}</p>
      </footer>
    </main>
  );
}
