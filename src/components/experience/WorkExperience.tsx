import { client } from '@/sanity/lib/client';
import { EXPERIENCE_QUERY } from '@/sanity/queries';
import SectionTitle from '../animations/SectionTitle';
import './WorkExperience.scss';
import WorkCard from './WorkCard';

const options = { next: { revalidate: 3600 } }; // 1 hour

async function WorkExperience() {
  const experience = await client.fetch(EXPERIENCE_QUERY, undefined, options);

  return (
    <section
      className="home-section exp"
      aria-labelledby="experience-label"
      id="experience"
    >
      <div className="exp__wrapper">
        <SectionTitle
          id="experience-label"
          className="exp__title"
          title="Experience"
          index="03"
        />

        {/* newest first; numbered like entries in a drawing register,
            so the oldest role is 01 */}
        <ol className="exp__list" reversed>
          {experience.map((exp, i) => (
            <WorkCard
              key={exp._id}
              exp={exp}
              number={String(experience.length - i).padStart(2, '0')}
            />
          ))}
        </ol>
      </div>
    </section>
  );
}

export default WorkExperience;
