import { Github, Play } from 'lucide-react';
import { featuredProjects } from '../data/projects';
import { withBaseUrl } from '../utils/url';
import { ExternalLink } from './ui/ExternalLink';
import { SectionHeading } from './ui/SectionHeading';
import { Tag } from './ui/Tag';

export function FeaturedProjects() {
  return (
    <section className="section-band featured-band" id="featured" data-reveal>
      <div className="content-wrap">
        <SectionHeading
          eyebrow="FEATURED"
          title="代表项目"
          description="先把真正做出来、能说明不同能力方向的项目放在最前面。"
        />
        <div className="featured-list">
          {featuredProjects.map((project, index) => (
            <article className="featured-card" key={project.id}>
              <div className="project-shot">
                <img
                  src={withBaseUrl(project.image)}
                  alt={project.imageAlt}
                  width="640"
                  height="420"
                  loading={index === 0 ? 'eager' : 'lazy'}
                />
              </div>
              <div className="featured-content">
                <div className="card-kicker">{project.status}</div>
                <h3>{project.title}</h3>
                <p className="summary">{project.summary}</p>
                <div className="project-facts">
                  <p>
                    <strong>问题：</strong>
                    {project.problem}
                  </p>
                  <p>
                    <strong>我做了：</strong>
                    {project.contribution}
                  </p>
                </div>
                <div className="tag-row">
                  {project.technologies.map((technology) => (
                    <Tag key={technology}>{technology}</Tag>
                  ))}
                </div>
                <div className="link-row">
                  {project.githubUrl ? (
                    <ExternalLink href={project.githubUrl} icon={<Github size={16} aria-hidden="true" />}>
                      GitHub
                    </ExternalLink>
                  ) : null}
                  {project.demoUrl ? (
                    <ExternalLink href={withBaseUrl(project.demoUrl)} icon={<Play size={16} aria-hidden="true" />}>
                      在线体验
                    </ExternalLink>
                  ) : null}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
