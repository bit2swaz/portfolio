import type { Metadata } from "next";
import { projectData } from "@/data/project";
import { FeaturedProjectCard } from "./featured-card";
import { ProjectLink } from "./link";

export const metadata: Metadata = {
  title: "Projects",
  description: "Projects I've worked on",
};

const Projects = () => {
  const featuredProjects = projectData.filter((project) => project.isFeatured);

  return (
    <section>
      <h1 className="font-semibold text-xl sm:text-2xl mb-6 sm:mb-8 tracking-tighter">
        Some stuff I've worked on:
      </h1>

      {/* Featured Projects - visually distinguished */}
      {featuredProjects.length > 0 && (
        <div className="mb-6 sm:mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            {featuredProjects.map((project) => (
              <FeaturedProjectCard
                key={project.url}
                name={project.name}
                url={project.url}
                description={project.description}
                highlight={project.highlight}
              />
            ))}
          </div>
        </div>
      )}

      {/* All Projects - standard list format */}
      <ul>
        {projectData.map((project) => (
          <ProjectLink
            key={project.url}
            name={project.name}
            url={project.url}
            description={project.description}
            highlight={project.highlight}
          />
        ))}
      </ul>
    </section>
  );
};

export default Projects;
