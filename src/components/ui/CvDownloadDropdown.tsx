'use client';

import { useState, useRef, useEffect } from 'react';
import { FileText, ChevronDown, Briefcase, Cpu, Layers } from 'lucide-react';

interface CvDownloadDropdownProps {
  lang?: 'vie' | 'eng';
}

export default function CvDownloadDropdown({ lang = 'vie' }: CvDownloadDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const cvTracks = {
    vie: [
      {
        id: 'master',
        title: 'CV Tổng Hợp (Hybrid Master)',
        subtitle: 'Cân bằng giữa Tư duy Kinh doanh & Kỹ thuật Dữ liệu',
        icon: Layers,
        vieUrl: '/resume_vie.pdf',
        engUrl: '/resume_eng.pdf',
      },
      {
        id: 'consultant',
        title: 'CV Tư Vấn & Chiến Lược (Consultant)',
        subtitle: 'Tập trung Phân tích Nghiệp vụ, ROI & Tối ưu Vận hành',
        icon: Briefcase,
        vieUrl: '/resume_consultant_vie.pdf',
        engUrl: '/resume_consultant_eng.pdf',
      },
      {
        id: 'technical',
        title: 'CV Kỹ Thuật Dữ Liệu (Technical)',
        subtitle: 'Tập trung Kho Dữ liệu, ETL Pipelines & Python',
        icon: Cpu,
        vieUrl: '/resume_technical_vie.pdf',
        engUrl: '/resume_technical_eng.pdf',
      },
    ],
    eng: [
      {
        id: 'master',
        title: 'Master Resume (Hybrid)',
        subtitle: 'Bridging Business Strategy & Analytics Engineering',
        icon: Layers,
        vieUrl: '/resume_vie.pdf',
        engUrl: '/resume_eng.pdf',
      },
      {
        id: 'consultant',
        title: 'Consultant & Strategy Resume',
        subtitle: 'Focus on Business Analysis, Operational Optimization & ROI',
        icon: Briefcase,
        vieUrl: '/resume_consultant_vie.pdf',
        engUrl: '/resume_consultant_eng.pdf',
      },
      {
        id: 'technical',
        title: 'Data Engineering Resume',
        subtitle: 'Focus on Data Warehousing, ETL Pipelines & Python',
        icon: Cpu,
        vieUrl: '/resume_technical_vie.pdf',
        engUrl: '/resume_technical_eng.pdf',
      },
    ],
  }[lang];

  const labels = {
    vie: {
      button: 'Xem CV',
      header: 'Chọn phiên bản CV phù hợp',
      viePdf: 'Bản Tiếng Việt',
      engPdf: 'English PDF',
    },
    eng: {
      button: 'View CV',
      header: 'Select Targeted Resume Track',
      viePdf: 'Vietnamese PDF',
      engPdf: 'English PDF',
    },
  }[lang];

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-lg bg-blue-600/15 hover:bg-blue-600/25 border border-blue-500/40 hover:border-blue-400/70 text-blue-200 hover:text-white font-medium text-xs transition shadow-lg shadow-blue-950/60 ring-1 ring-blue-500/20 cursor-pointer"
        aria-expanded={isOpen}
      >
        <FileText className="w-3.5 h-3.5 text-blue-400 shrink-0" />
        <span className="font-semibold">{labels.button}</span>
        <ChevronDown className={`w-3.5 h-3.5 text-blue-400 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-2 w-80 rounded-xl bg-[#0b1329]/95 backdrop-blur-xl border border-blue-900/50 shadow-2xl shadow-black p-2.5 z-50 animate-in fade-in zoom-in-95 duration-150 ring-1 ring-blue-500/20">
          <div className="px-3 py-1.5 border-b border-slate-800/80 mb-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-blue-400/90 font-medium">
              {labels.header}
            </span>
          </div>

          <div className="space-y-1.5">
            {cvTracks.map((track) => {
              const Icon = track.icon;
              return (
                <div
                  key={track.id}
                  className="p-2.5 rounded-lg bg-slate-950/70 hover:bg-slate-900/90 border border-slate-800/80 hover:border-blue-700/50 transition-all"
                >
                  <div className="flex items-start gap-2.5 mb-2">
                    <div className="p-1.5 rounded-md bg-blue-950/60 border border-blue-800/40 text-blue-300 shrink-0 mt-0.5">
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-slate-100 leading-tight">{track.title}</div>
                      <div className="text-[11px] text-slate-400 leading-snug mt-0.5">{track.subtitle}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 pl-8">
                    <a
                      href={track.vieUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center py-1 px-2 rounded bg-slate-900 hover:bg-blue-950 text-slate-300 hover:text-blue-200 text-[11px] font-mono border border-slate-800 hover:border-blue-700/60 transition"
                    >
                      {labels.viePdf}
                    </a>
                    <a
                      href={track.engUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center py-1 px-2 rounded bg-slate-900 hover:bg-blue-950 text-slate-300 hover:text-blue-200 text-[11px] font-mono border border-slate-800 hover:border-blue-700/60 transition"
                    >
                      {labels.engPdf}
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
