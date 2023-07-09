import FeaturedProject from './FeaturedProject';
import ProjectGallery from './ProjectGallery';

function Projects() {
  return (
    <section className="home-section projects">
      <h1 className="projects__title">Projects</h1>
      <ol className="projects__featured">
        <li className="projects__featured-item">
          <FeaturedProject
            index={1}
            type="Full-stack Developer"
            title="Reddit Apollo Clone"
            description=" Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi quaerat mollitia architecto autem, accusamus ratione fugiat labore unde possimus, deleniti ipsam perspiciatis, fugit sunt. "
            liveLink=""
            repoLink=""
            techStack={[]}
          />
        </li>
      </ol>

      <ProjectGallery />
    </section>
  );
}

export default Projects;
