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
            <span>当前状态</span>
            <span className="status-dot">在线</span>
          </div>
          <dl>
            <div>
              <dt>正在学</dt>
              <dd>Android 底层和 C++</dd>
            </div>
            <div>
              <dt>正在做</dt>
              <dd>能真正跑起来的小工具</dd>
            </div>
            <div>
              <dt>状态</dt>
              <dd>边学边交付</dd>
            </div>
          </dl>
        </aside>
      </div>
    </section>
  );
}
