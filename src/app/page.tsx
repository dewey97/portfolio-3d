import HeroWrapper from '@/components/3d/HeroWrapper';
import {
  getProfileData,
  getExperiencesData,
  getProjectsData,
  getSkillsData,
} from '@/lib/data';
import {
  FileText,
  Mail,
  MapPin,
  ExternalLink,
  Briefcase,
  Code,
  FolderGit2,
} from 'lucide-react';

export default function Home() {
  const profile = getProfileData('vie');
  const experiences = getExperiencesData('vie');
  const projects = getProjectsData('vie');
  const skills = getSkillsData('vie');

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
            
            {/* MULTI-LANGUAGE CV DOWNLOAD BUTTONS */}
            <div className="flex items-center gap-2">
              <a
                href="/resume_vie.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs transition border border-slate-700"
              >
                <FileText className="w-3.5 h-3.5 text-blue-400" />
                CV Tiếng Việt
              </a>
              <a
                href="/resume_eng.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs transition shadow-lg shadow-blue-500/20"
              >
                <FileText className="w-3.5 h-3.5" />
                CV English
              </a>
            </div>
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
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight drop-shadow-sm">
              Xin chào, tôi là <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-sky-400 bg-clip-text text-transparent">{profile.name}</span>
            </h1>
            <h2 className="text-xl md:text-2xl text-slate-200 font-medium">{profile.title}</h2>
            <p className="text-slate-300/90 leading-relaxed text-base md:text-lg">
              {profile.bio}
            </p>

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
          </div>
        </div>
      </section>

      {/* EXPERIENCE SECTION */}
      <section id="experience" className="max-w-6xl mx-auto px-6 py-16 border-t border-slate-800/60">
        <div className="flex items-center gap-3 mb-10">
          <Briefcase className="w-6 h-6 text-blue-400" />
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Kinh Nghiệm Làm Việc</h2>
        </div>

        <div className="space-y-8 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-slate-800">
          {experiences.map((exp) => (
            <div key={exp.id} className="relative pl-10 group">
              <div className="absolute left-1.5 top-1.5 w-4 h-4 rounded-full bg-slate-950 border-2 border-blue-500 group-hover:scale-125 transition" />
              <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-6 hover:border-slate-700 transition">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <h3 className="text-xl font-semibold text-white">{exp.role}</h3>
                  <span className="text-xs font-mono px-2.5 py-1 rounded bg-blue-950/80 text-blue-300 border border-blue-800/40">
                    {exp.startDate} – {exp.endDate}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm text-slate-400 mb-4">
                  <span className="font-medium text-slate-300">{exp.company}</span>
                  <span className="flex items-center gap-1 text-xs">
                    <MapPin className="w-3.5 h-3.5" />
                    {exp.location}
                  </span>
                </div>
                <div className="text-slate-300 text-sm leading-relaxed whitespace-pre-line mb-4">
                  {exp.content.replace(/^### .*$/gm, '')}
                </div>
                {exp.tags && exp.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-800/60">
                    {exp.tags.map((tag) => (
                      <span key={tag} className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section id="projects" className="max-w-6xl mx-auto px-6 py-16 border-t border-slate-800/60">
        <div className="flex items-center gap-3 mb-10">
          <FolderGit2 className="w-6 h-6 text-blue-400" />
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Dự Án Nổi Bật</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((proj) => (
            <div
              key={proj.id}
              className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-6 hover:border-blue-500/50 transition flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition">
                    {proj.title}
                  </h3>
                  <span className="text-xs font-mono text-slate-400">{proj.date}</span>
                </div>
                <p className="text-xs text-blue-400 font-medium mb-3">{proj.subtitle}</p>
                <p className="text-slate-300 text-sm leading-relaxed mb-4">
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
                      className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 transition ml-auto"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SKILLS SECTION */}
      <section id="skills" className="max-w-6xl mx-auto px-6 py-16 border-t border-slate-800/60">
        <div className="flex items-center gap-3 mb-10">
          <Code className="w-6 h-6 text-blue-400" />
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">{skills.title}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skills.categories.map((cat) => (
            <div key={cat.name} className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-6">
              <h3 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500" />
                {cat.name}
              </h3>
              <div className="flex flex-wrap gap-2">
                {cat.items.map((item) => (
                  <span
                    key={item}
                    className="text-xs font-mono px-3 py-1.5 rounded-lg bg-slate-800/70 border border-slate-700/50 text-slate-200"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-800/60 py-8 bg-slate-950 text-center text-xs text-slate-500">
        <p>© {new Date().getFullYear()} {profile.name}. Single Source of Truth Multi-language Portfolio & LaTeX CV System.</p>
      </footer>
    </main>
  );
}
