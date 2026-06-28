import { ArrowUpRight } from 'lucide-react';
import { useMemo, useState } from 'react';
import { originLabels, workCategories, works } from '../data/works';
import type { WorkCategory } from '../types/content';
import { withBaseUrl } from '../utils/url';
import { SectionHeading } from './ui/SectionHeading';
import { Tag } from './ui/Tag';

type WorkFilter = WorkCategory | 'all';

export function WorksSection() {
  const [active, setActive] = useState<WorkFilter>('all');
  const filteredWorks = useMemo(
    () => (active === 'all' ? works : works.filter((work) => work.category === active)),
    [active],
  );

  return (
    <section className="section-band" id="works" data-reveal>
      <div className="content-wrap">
        <SectionHeading
          eyebrow="ONLINE"
          title="在线作品"
          description="旧静态页面继续保留原地址，这里只把入口整理得更清楚。"
        />
        <div className="filter-tabs" role="tablist" aria-label="在线作品分类">
          {workCategories.map((category) => (
            <button
              key={category.id}
              className={active === category.id ? 'filter-tab is-active' : 'filter-tab'}
              type="button"
              role="tab"
              aria-selected={active === category.id}
              onClick={() => setActive(category.id)}
            >
              {category.label}
              <span>{category.id === 'all' ? works.length : works.filter((work) => work.category === category.id).length}</span>
            </button>
          ))}
        </div>
        <div className="work-grid">
          {filteredWorks.map((work) => (
            <a className="work-card" href={withBaseUrl(work.href)} key={work.id}>
              <span className={`origin origin-${work.origin}`}>{originLabels[work.origin]}</span>
              {work.image ? <img src={withBaseUrl(work.image)} alt="" loading="lazy" width="520" height="300" /> : null}
              <h3>{work.title}</h3>
              <p>{work.description}</p>
              <div className="tag-row">
                {work.technologies.map((technology) => (
                  <Tag key={technology}>{technology}</Tag>
                ))}
              </div>
              <span className="work-open">
                打开
                <ArrowUpRight size={16} aria-hidden="true" />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
