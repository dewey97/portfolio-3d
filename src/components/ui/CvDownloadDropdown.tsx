'use client';

import { useState, useRef, useEffect } from 'react';
import { FileText, ChevronDown, Briefcase, Cpu, Layers } from 'lucide-react';

export default function CvDownloadDropdown() {
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

  const cvTracks = [
    {
      id: 'master',
      title: 'CV Tổng Hợp (Hybrid Master)',
      subtitle: 'Cân bằng giữa Tư duy Kinh doanh & Kỹ thuật',
      icon: Layers,
      color: 'text-blue-400',
      vieUrl: '/resume_vie.pdf',
      engUrl: '/resume_eng.pdf',
    },
    {
      id: 'consultant',
      title: 'CV Tư Vấn & Chiến Lược (Consultant)',
      subtitle: 'Tập trung Business Analysis, ROI & Vận hành',
      icon: Briefcase,
      color: 'text-emerald-400',
      vieUrl: '/resume_consultant_vie.pdf',
      engUrl: '/resume_consultant_eng.pdf',
    },
    {
      id: 'technical',
      title: 'CV Kỹ Thuật & Hạ Tầng (Technical)',
      subtitle: 'Tập trung Data Warehouse, ETL & Python',
      icon: Cpu,
      color: 'text-cyan-400',
      vieUrl: '/resume_technical_vie.pdf',
      engUrl: '/resume_technical_eng.pdf',
    },
  ];

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 hover:from-blue-500 hover:to-indigo-500 text-white font-medium text-xs transition shadow-lg shadow-blue-500/20 border border-blue-400/30 cursor-pointer"
        aria-expanded={isOpen}
      >
        <FileText className="w-3.5 h-3.5" />
        <span>Tải CV / Resume</span>
        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-slate-900/95 backdrop-blur-xl border border-slate-700/80 shadow-2xl p-2.5 z-50 animate-in fade-in zoom-in-95 duration-150">
          <div className="px-3 py-2 border-b border-slate-800/80 mb-2">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400">
              Chọn phiên bản CV phù hợp
            </span>
          </div>

          <div className="space-y-1.5">
            {cvTracks.map((track) => {
              const Icon = track.icon;
              return (
                <div
                  key={track.id}
                  className="p-2.5 rounded-xl bg-slate-800/40 hover:bg-slate-800/90 border border-slate-700/30 hover:border-slate-600/60 transition-all"
                >
                  <div className="flex items-start gap-2.5 mb-2">
                    <div className={`p-1.5 rounded-lg bg-slate-900/80 ${track.color} shrink-0 mt-0.5`}>
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white leading-tight">{track.title}</div>
                      <div className="text-[11px] text-slate-400 leading-snug mt-0.5">{track.subtitle}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 pl-8">
                    <a
                      href={track.vieUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center py-1 px-2 rounded-md bg-slate-900/90 hover:bg-blue-950 hover:text-blue-300 text-slate-300 text-[11px] font-mono border border-slate-700/60 transition"
                    >
                      Bản Tiếng Việt
                    </a>
                    <a
                      href={track.engUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center py-1 px-2 rounded-md bg-blue-600/20 hover:bg-blue-600/40 text-blue-300 text-[11px] font-mono border border-blue-500/30 transition font-medium"
                    >
                      English PDF
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
