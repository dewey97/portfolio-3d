import HeroWrapper from '@/components/3d/HeroWrapper';
import {
  getProfileData,
  getExperiencesData,
  getProjectsData,
  getSkillsData,
  getBeyondWorkData,
} from '@/lib/data';
import CvDownloadDropdown from '@/components/ui/CvDownloadDropdown';
import {
  Mail,
  MapPin,
  ExternalLink,
  Briefcase,
  Code,
  FolderGit2,
  TrendingUp,
  Compass,
  Sparkles,
  Activity,
  HeartHandshake,
} from 'lucide-react';
import { MotionReveal, SpotlightCard } from '@/components/ui/MotionReveal';

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

export default function Home() {
  const profile = getProfileData('vie', 'master');
  const experiences = getExperiencesData('vie', 'master');
  const projects = getProjectsData('vie', 'master');
  const skills = getSkillsData('vie', 'master');
  const beyondWork = getBeyondWorkData('vie');

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 selection:bg-blue-500 selection:text-white">
      {/* HEADER / NAVIGATION */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/80 border-b border-slate-800/60">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#" className="font-bold text-lg tracking-tight hover:text-blue-400 transition">
            {profile.name} <span className="text-blue-500">.</span>
          </a>
          <nav className="flex items-center space-x-6 text-sm text-slate-300">
            <a href="#about" className="hover:text-blue-400 transition">Giới Thiệu</a>
            <a href="#experience" className="hover:text-blue-400 transition">Kinh Nghiệm</a>
            <a href="#projects" className="hover:text-blue-400 transition">Dự Án</a>
            <a href="#skills" className="hover:text-blue-400 transition">Kỹ Năng</a>
            <a href="#beyond" className="hover:text-blue-400 transition">Bên Lề</a>
            
            {/* MULTI-TRACK CV DOWNLOAD DROPDOWN */}
            <CvDownloadDropdown />
          </nav>
        </div>
      </header>

      {/* HERO SECTION WITH 3D FULL BACKGROUND */}
      <section id="about" className="relative min-h-[90vh] flex items-center overflow-hidden border-b border-slate-800/40">
        {/* 3D FULL BACKGROUND CANVAS */}
        <div className="absolute inset-0 z-0 pointer-events-auto">
          <HeroWrapper />
        </div>

        {/* Ambient Gradient Overlays for optimal text legibility */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-r from-slate-950 via-slate-950/70 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-28 z-[1] bg-gradient-to-t from-slate-950 to-transparent pointer-events-none" />

        {/* HERO CONTENT LAYER */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 py-24 w-full">
          <div className="max-w-2xl space-y-6">
            <MotionReveal delay={0.1}>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight drop-shadow-sm">
                Xin chào, tôi là <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-sky-400 bg-clip-text text-transparent">{profile.name}</span>
              </h1>
            </MotionReveal>

            <MotionReveal delay={0.2}>
              <h2 className="text-xl md:text-2xl text-slate-200 font-medium">{profile.title}</h2>
            </MotionReveal>

            <MotionReveal delay={0.3}>
              <p className="text-slate-300/90 leading-relaxed text-base md:text-lg">
                {profile.bio}
              </p>
            </MotionReveal>

            <MotionReveal delay={0.4}>
              <div className="flex flex-wrap items-center gap-4 pt-4">
                {profile.github && (
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="GitHub"
                    className="p-2.5 rounded-lg bg-slate-900/90 backdrop-blur-md border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition shadow-md"
                  >
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
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
                    className="p-2.5 rounded-lg bg-slate-900/90 backdrop-blur-md border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition shadow-md"
                  >
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                )}
                {profile.email && (
                  <a
                    href={`mailto:${profile.email}`}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-slate-900/90 backdrop-blur-md border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition text-sm shadow-md"
                  >
                    <Mail className="w-4 h-4 text-blue-400" />
                    {profile.email}
                  </a>
                )}
              </div>
            </MotionReveal>
          </div>
        </div>
      </section>

      {/* EXPERIENCE SECTION - EXECUTIVE SPLIT-BENTO */}
      <section id="experience" className="max-w-6xl mx-auto px-6 py-20 border-t border-slate-800/60">
        <MotionReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-800/40 text-blue-400 text-xs font-mono mb-3">
                <Briefcase className="w-3.5 h-3.5" />
                <span>Career Journey</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
                Kinh Nghiệm Làm Việc
              </h2>
            </div>
            <p className="text-slate-400 text-sm max-w-md">
              Hành trình xây dựng kiến trúc dữ liệu, tối ưu hóa quy trình phân tích và tạo tác động thực tế cho doanh nghiệp.
            </p>
          </div>
        </MotionReveal>

        <div className="space-y-8">
          {experiences.map((exp, index) => {
            const isCurrent = exp.endDate.toLowerCase().includes('hiện tại') || exp.endDate.toLowerCase().includes('present');
            const initials = exp.company.toLowerCase().includes('giáo dục') || exp.company.toLowerCase().includes('educollab') ? 'EC' : 'ZS';
            const bullets = parseExperienceContent(exp.content);

            // Highlight bullet containing metric/impact
            const highlightBullet = bullets.find((b) => b.desc.includes('%') || b.title.includes('Web') || b.desc.includes('40%') || b.desc.includes('20%'));
            const standardBullets = bullets.filter((b) => b !== highlightBullet);

            return (
              <MotionReveal key={exp.id} delay={index * 0.15}>
                <SpotlightCard className="p-6 sm:p-8 hover:border-blue-500/40 transition-all duration-300 group">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
                    {/* LEFT COLUMN: COMPANY & ROLE */}
                    <div className="lg:col-span-4 space-y-4">
                      <div className="flex items-center gap-3.5">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600/20 via-sky-500/10 to-cyan-400/20 border border-blue-500/30 flex items-center justify-center text-blue-400 font-mono font-bold text-base shadow-inner group-hover:scale-105 group-hover:border-blue-400/60 transition-all">
                          {initials}
                        </div>
                        <div>
                          <span className="text-xs font-mono uppercase tracking-wider text-blue-400 font-semibold">
                            0{index + 1} • {exp.startDate.split('/')[1] || 'EXP'}
                          </span>
                          <h4 className="text-slate-200 font-semibold text-sm leading-snug">
                            {exp.company}
                          </h4>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                          {exp.role}
                        </h3>
                      </div>

                      <div className="flex flex-wrap items-center gap-2.5 pt-1">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium border ${
                            isCurrent
                              ? 'bg-emerald-950/60 text-emerald-300 border-emerald-800/50 shadow-sm shadow-emerald-950'
                              : 'bg-slate-800/80 text-slate-300 border-slate-700/60'
                          }`}
                        >
                          {isCurrent && <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />}
                          {exp.startDate} – {exp.endDate}
                        </span>

                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs text-slate-400 bg-slate-800/50 border border-slate-700/40">
                          <MapPin className="w-3 h-3 text-slate-400" />
                          {exp.location}
                        </span>
                      </div>
                    </div>

                    {/* RIGHT COLUMN: HIGHLIGHTS & DETAILED BULLETS */}
                    <div className="lg:col-span-8 space-y-5 lg:border-l lg:border-slate-800/80 lg:pl-8">
                      {/* KEY IMPACT METRIC BOX */}
                      {highlightBullet && (
                        <div className="rounded-xl bg-gradient-to-r from-blue-950/50 via-slate-900/60 to-slate-900/30 border border-blue-800/40 p-4 flex items-start gap-3 shadow-inner">
                          <div className="p-1.5 rounded-lg bg-blue-500/20 text-cyan-400 shrink-0 mt-0.5">
                            <TrendingUp className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="text-xs font-mono text-cyan-300 font-semibold uppercase tracking-wider block mb-0.5">
                              Key Business Impact
                            </span>
                            <p className="text-sm text-slate-200 font-medium leading-relaxed">
                              <strong className="text-white">{highlightBullet.title}:</strong>{' '}
                              {highlightBullet.desc}
                            </p>
                          </div>
                        </div>
                      )}

                      {/* DETAILED BULLET POINTS */}
                      <div className="space-y-3">
                        {standardBullets.map((bullet, bIdx) => (
                          <div key={bIdx} className="flex items-start gap-3 text-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 shrink-0 group-hover:bg-cyan-400 transition-colors" />
                            <p className="text-slate-300/90 leading-relaxed">
                              {bullet.title && <strong className="text-slate-100 font-semibold">{bullet.title}: </strong>}
                              {bullet.desc}
                            </p>
                          </div>
                        ))}
                      </div>

                      {/* TECH STACK PILLS */}
                      {exp.tags && exp.tags.length > 0 && (
                        <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-slate-800/60">
                          <span className="text-xs text-slate-400 font-mono mr-1">Stack:</span>
                          {exp.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-xs font-mono px-2.5 py-0.5 rounded-md bg-slate-800/80 border border-slate-700/60 text-slate-300 hover:border-blue-500/40 hover:text-cyan-300 transition-colors"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </SpotlightCard>
              </MotionReveal>
            );
          })}
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section id="projects" className="max-w-6xl mx-auto px-6 py-20 border-t border-slate-800/60">
        <MotionReveal>
          <div className="flex items-center gap-3 mb-10">
            <FolderGit2 className="w-6 h-6 text-blue-400" />
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Dự Án Nổi Bật</h2>
          </div>
        </MotionReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((proj, pIdx) => (
            <MotionReveal key={proj.id} delay={pIdx * 0.12}>
              <SpotlightCard className="p-6 h-full flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {proj.title}
                    </h3>
                    <span className="text-xs font-mono text-slate-400">{proj.date}</span>
                  </div>
                  <p className="text-xs text-blue-400 font-medium mb-3">{proj.subtitle}</p>
                  <p className="text-slate-300/90 text-sm leading-relaxed mb-4">
                    {proj.content.trim()}
                  </p>
                </div>

                <div>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {proj.tags.map((tag) => (
                      <span key={tag} className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800/80 text-slate-400">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-3 pt-3 border-t border-slate-800/60 text-xs">
                    {proj.github && (
                      <a
                        href={proj.github}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-slate-400 hover:text-white transition"
                      >
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                        </svg>
                        Code
                      </a>
                    )}
                    {proj.demo && (
                      <a
                        href={proj.demo}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-blue-400 hover:text-cyan-300 transition ml-auto"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </SpotlightCard>
            </MotionReveal>
          ))}
        </div>
      </section>

      {/* SKILLS SECTION */}
      {/* SKILLS SECTION */}
      <section id="skills" className="max-w-6xl mx-auto px-6 py-20 border-t border-slate-800/60">
        <MotionReveal>
          <div className="flex items-center gap-3 mb-10">
            <Code className="w-6 h-6 text-blue-400" />
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">{skills.title}</h2>
          </div>
        </MotionReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skills.categories.map((cat, cIdx) => (
            <MotionReveal key={cat.name} delay={cIdx * 0.1}>
              <SpotlightCard className="p-6 h-full">
                <h3 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500" />
                  {cat.name}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {cat.items.map((item) => (
                    <span
                      key={item}
                      className="text-xs font-mono px-3 py-1.5 rounded-lg bg-slate-800/70 border border-slate-700/50 text-slate-200 hover:border-blue-500/40 hover:text-cyan-300 transition-colors"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </SpotlightCard>
            </MotionReveal>
          ))}
        </div>
      </section>

      {/* BEYOND THE DATA / PERSONAL STORIES SECTION */}
      {beyondWork && beyondWork.items.length > 0 && (
        <section id="beyond" className="max-w-6xl mx-auto px-6 py-20 border-t border-slate-800/60">
          <MotionReveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-800/40 text-emerald-400 text-xs font-mono mb-3">
                  <Compass className="w-3.5 h-3.5" />
                  <span>Life & Perspectives</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
                  {beyondWork.title}
                </h2>
              </div>
              <p className="text-slate-400 text-sm max-w-md">
                {beyondWork.subtitle}
              </p>
            </div>
          </MotionReveal>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {beyondWork.items.map((item, bIdx) => {
              // Alternating bento spans: Row 1 (7/5), Row 2 (5/7)
              const colSpan = bIdx === 0 ? 'lg:col-span-7' : bIdx === 1 ? 'lg:col-span-5' : bIdx === 2 ? 'lg:col-span-5' : 'lg:col-span-7';
              
              let IconComponent = Compass;
              let iconColor = 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
              if (item.icon === 'Sparkles') {
                IconComponent = Sparkles;
                iconColor = 'text-blue-400 bg-blue-500/10 border-blue-500/30';
              } else if (item.icon === 'Activity') {
                IconComponent = Activity;
                iconColor = 'text-amber-400 bg-amber-500/10 border-amber-500/30';
              } else if (item.icon === 'HeartHandshake') {
                IconComponent = HeartHandshake;
                iconColor = 'text-rose-400 bg-rose-500/10 border-rose-500/30';
              }

              return (
                <MotionReveal key={item.id} delay={bIdx * 0.12} className={colSpan}>
                  <SpotlightCard className="p-7 sm:p-8 h-full flex flex-col justify-between group hover:border-slate-600/60 transition-all">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className={`p-2.5 rounded-xl border ${iconColor}`}>
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-mono px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700/60 text-slate-300">
                          {item.tag}
                        </span>
                      </div>

                      <div>
                        <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-xs font-mono text-blue-400 mt-1">{item.subtitle}</p>
                      </div>

                      <p className="text-slate-300/90 text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    {item.highlights && item.highlights.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-6 border-t border-slate-800/60 mt-6">
                        {item.highlights.map((hl) => (
                          <span
                            key={hl}
                            className="text-xs font-mono px-2.5 py-1 rounded-md bg-slate-900/90 border border-slate-800 text-slate-300"
                          >
                            ✓ {hl}
                          </span>
                        ))}
                      </div>
                    )}
                  </SpotlightCard>
                </MotionReveal>
              );
            })}
          </div>
        </section>
      )}

      {/* FOOTER */}
      <footer className="border-t border-slate-800/60 py-8 bg-slate-950 text-center text-xs text-slate-500">
        <p>© {new Date().getFullYear()} {profile.name}. Business Analytics & Analytics Engineering Portfolio.</p>
      </footer>
    </main>
  );
}
