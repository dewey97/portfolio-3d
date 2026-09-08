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
        subtitle: 'Toàn diện từ Tư duy Phân tích Nghiệp vụ đến Triển khai Kỹ thuật Dữ liệu',
        icon: Layers,
        url: '/resume_vie.pdf',
      },
      {
        id: 'consultant',
        title: 'CV Tư Vấn & Phân Tích Nghiệp Vụ',
        subtitle: 'Khảo sát yêu cầu nghiệp vụ, tối ưu phễu chuyển đổi & xây dựng báo cáo P&L điều hành',
        icon: Briefcase,
        url: '/resume_consultant_vie.pdf',
      },
      {
        id: 'technical',
        title: 'CV Kỹ Thuật Dữ Liệu (Analytics Engineering)',
        subtitle: 'Kiến trúc Data Warehouse, tối ưu hóa ETL Pipelines & tự động hóa hạ tầng phân tích',
        icon: Cpu,
        url: '/resume_technical_vie.pdf',
      },
    ],
    eng: [
      {
        id: 'master',
        title: 'Master Resume (Hybrid Leader)',
        subtitle: 'End-to-End Leadership: Business Analysis, Data Architecture & BI Systems',
        icon: Layers,
        url: '/resume_eng.pdf',
      },
      {
        id: 'consultant',
        title: 'Consulting & Business Analysis Resume',
        subtitle: 'Requirements Engineering, Funnel & ROI Optimization, P&L Financial Dashboards',
        icon: Briefcase,
        url: '/resume_consultant_eng.pdf',
      },
      {
        id: 'technical',
        title: 'Analytics & Data Engineering Resume',
        subtitle: 'Data Warehouse Architecture (Star Schema), Automated ETL Pipelines & Analytics Infrastructure',
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
      header: 'Select Resume Track',
    },
  }[lang];

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-blue-200 transition-all text-xs font-sans font-medium shadow-lg shadow-black/60 ring-1 ring-white/10 hover:ring-blue-500/30 cursor-pointer"
        aria-expanded={isOpen}
      >
        <FileText className="w-4 h-4 text-blue-400 shrink-0" />
        <span className="font-medium">{labels.button}</span>
        <ChevronDown className={`w-3.5 h-3.5 text-slate-400 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-blue-400' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-2 w-84 rounded-2xl bg-[#080d1a]/95 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.85)] p-3 z-50 animate-in fade-in zoom-in-95 duration-150 ring-1 ring-white/10">
          <div className="px-2 pt-1 pb-2">
            <span className="text-xs font-sans font-semibold text-slate-300 tracking-wide">
              {labels.header}
            </span>
          </div>

          <div className="space-y-1">
            {cvTracks.map((track) => {
              const Icon = track.icon;
              return (
                <a
                  key={track.id}
                  href={track.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="group flex items-start gap-3 p-2.5 rounded-xl bg-slate-900/30 hover:bg-blue-950/40 ring-1 ring-transparent hover:ring-blue-500/30 transition-all duration-200 cursor-pointer"
                >
                  <div className="p-2 rounded-lg bg-blue-950/50 text-blue-400 shrink-0 mt-0.5 group-hover:bg-blue-600 group-hover:text-white transition-all duration-200 shadow-sm">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold text-slate-100 group-hover:text-blue-300 transition-colors leading-tight">
                      {track.title}
                    </div>
                    <div className="text-[11px] text-slate-400 leading-snug mt-1 group-hover:text-slate-300 transition-colors">
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
