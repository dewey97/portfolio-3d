'use client';

import { useState, useRef, useEffect } from 'react';
import { FileText, ChevronDown, Briefcase, Cpu, Layers, ExternalLink } from 'lucide-react';

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
        url: '/resume_vie.pdf',
      },
      {
        id: 'consultant',
        title: 'CV Tư Vấn & Chiến Lược (Consultant)',
        subtitle: 'Tập trung Phân tích Nghiệp vụ, ROI & Tối ưu Vận hành',
        icon: Briefcase,
        url: '/resume_consultant_vie.pdf',
      },
      {
        id: 'technical',
        title: 'CV Kỹ Thuật Dữ Liệu (Technical)',
        subtitle: 'Tập trung Kho Dữ liệu, ETL Pipelines & Python',
        icon: Cpu,
        url: '/resume_technical_vie.pdf',
      },
    ],
    eng: [
      {
        id: 'master',
        title: 'Master Resume (Hybrid)',
        subtitle: 'Bridging Business Strategy & Analytics Engineering',
        icon: Layers,
        url: '/resume_eng.pdf',
      },
      {
        id: 'consultant',
        title: 'Consultant & Strategy Resume',
        subtitle: 'Focus on Business Analysis, Operational Optimization & ROI',
        icon: Briefcase,
        url: '/resume_consultant_eng.pdf',
      },
      {
        id: 'technical',
        title: 'Data Engineering Resume',
        subtitle: 'Focus on Data Warehousing, ETL Pipelines & Python',
        icon: Cpu,
        url: '/resume_technical_eng.pdf',
      },
    ],
  }[lang];

  const labels = {
    vie: {
      button: 'Xem CV',
      header: 'Chọn phiên bản CV',
    },
    eng: {
      button: 'View CV',
      header: 'Select Targeted Resume Track',
    },
  }[lang];

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-lg bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-blue-200 transition text-xs font-mono shadow-lg shadow-black/60 ring-1 ring-blue-500/15 cursor-pointer"
        aria-expanded={isOpen}
      >
        <FileText className="w-3.5 h-3.5 text-blue-400 shrink-0" />
        <span className="font-semibold">{labels.button}</span>
        <ChevronDown className={`w-3.5 h-3.5 text-slate-400 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-blue-400' : ''}`} />
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
                <a
                  key={track.id}
                  href={track.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="group flex items-start gap-2.5 p-2.5 rounded-lg bg-slate-950/70 hover:bg-slate-900/90 border border-slate-800/80 hover:border-blue-700/60 transition-all cursor-pointer"
                >
                  <div className="p-1.5 rounded-md bg-blue-950/60 border border-blue-800/40 text-blue-300 shrink-0 mt-0.5 group-hover:border-blue-500/50 group-hover:text-blue-200 transition">
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div className="text-xs font-semibold text-slate-100 group-hover:text-blue-300 transition leading-tight truncate">
                        {track.title}
                      </div>
                      <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-blue-400 shrink-0 ml-1 transition" />
                    </div>
                    <div className="text-[11px] text-slate-400 leading-snug mt-0.5 group-hover:text-slate-300 transition">
                      {track.subtitle}
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
