import { client } from '@/sanity/lib/client';
import { EXPERIENCE_QUERY } from '@/sanity/queries';
import SectionTitle from '../animations/SectionTitle';
import './WorkExperience.scss';
import WorkCard from './WorkCard';

const options = { next: { revalidate: 3600 } }; // 1 hour

async function WorkExperience() {
  const experience = await client.fetch(EXPERIENCE_QUERY, undefined, options);

  return (
    <section className="exp" aria-label="Experience section" id="experience">
      <div className="exp__wrapper">
        <SectionTitle
          id="experience-label"
          className="exp__title"
          title="Work Experience"
        />

        <ul className="exp__list">
          {experience.map((exp) => (
            <WorkCard key={exp._id} exp={exp} />
          ))}
        </ul>
      </div>
    </section>
  );
}

export default WorkExperience;
