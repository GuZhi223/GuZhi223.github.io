import { Github } from 'lucide-react';
import { repositories } from '../data/projects';
import { ExternalLink } from './ui/ExternalLink';
import { SectionHeading } from './ui/SectionHeading';
import { Tag } from './ui/Tag';

export function MoreProjects() {
  return (
    <section className="section-band" id="projects" data-reveal>
      <div className="content-wrap">
        <SectionHeading
          eyebrow="OPEN SOURCE"
          title="更多开源项目"
          description="这里用更轻的卡片记录其他仓库，重点说清楚练了什么、解决了什么。"
        />
        <div className="repo-grid">
          {repositories.map((repository) => (
            <article className="repo-card" key={repository.name}>
              <div className="repo-top">
                <h3>{repository.name}</h3>
                <span>{repository.status}</span>
              </div>
              <p>{repository.description}</p>
              <div className="tag-row">
                {repository.technologies.map((technology) => (
                  <Tag key={technology}>{technology}</Tag>
                ))}
              </div>
              <ExternalLink href={repository.githubUrl} icon={<Github size={16} aria-hidden="true" />}>
                打开仓库
              </ExternalLink>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
