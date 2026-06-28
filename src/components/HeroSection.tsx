import { ArrowDown, ExternalLink } from 'lucide-react';
import { site } from '../data/site';

export function HeroSection() {
  return (
    <section className="hero section-band" id="home" data-reveal>
      <div className="content-grid hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">Still learning, still shipping</p>
          <h1>{site.hero.title}</h1>
          <p className="hero-lead">{site.hero.lead}</p>
          <div className="hero-tags" aria-label="当前关注方向">
            {site.hero.tags.map((tag) => (
              <span className="tag tag-soft" key={tag}>
                {tag}
              </span>
            ))}
          </div>
          <div className="hero-actions">
            <a className="button button-primary" href="#featured">
              查看代表项目
              <ArrowDown size={17} aria-hidden="true" />
            </a>
            <a className="button button-secondary" href="#works">
              逛逛在线作品
              <ExternalLink size={17} aria-hidden="true" />
            </a>
          </div>
        </div>
        <aside className="status-panel" aria-label="当前状态">
          <div className="status-panel-header">
            <span>CURRENTLY</span>
            <span className="status-dot">在线</span>
          </div>
          <dl>
            <div>
              <dt>Learning</dt>
              <dd>Android internals & C++</dd>
            </div>
            <div>
              <dt>Building</dt>
              <dd>Small tools that actually work</dd>
            </div>
            <div>
              <dt>Status</dt>
              <dd>Still shipping</dd>
            </div>
          </dl>
        </aside>
      </div>
    </section>
  );
}
