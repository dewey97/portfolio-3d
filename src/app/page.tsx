import {
  getProfileData,
  getExperiencesData,
  getProjectsData,
  getSkillsData,
  getBeyondWorkData,
} from '@/lib/data';
import PortfolioView from '@/components/portfolio/PortfolioView';

export default function Home() {
  const initialData = {
    vie: {
      profile: getProfileData('vie', 'master'),
      experiences: getExperiencesData('vie', 'master'),
      projects: getProjectsData('vie', 'master'),
      skills: getSkillsData('vie', 'master'),
      beyondWork: getBeyondWorkData('vie'),
    },
    eng: {
      profile: getProfileData('eng', 'master'),
      experiences: getExperiencesData('eng', 'master'),
      projects: getProjectsData('eng', 'master'),
      skills: getSkillsData('eng', 'master'),
      beyondWork: getBeyondWorkData('eng'),
    },
  };

  return <PortfolioView initialData={initialData} />;
}
