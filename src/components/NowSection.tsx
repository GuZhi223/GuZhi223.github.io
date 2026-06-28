import { site } from '../data/site';
import { SectionHeading } from './ui/SectionHeading';

export function NowSection() {
  return (
    <section className="section-band" id="now" data-reveal>
      <div className="content-wrap">
        <SectionHeading eyebrow="NOW" title="最近在折腾" description="不是技能熟练度表，更像一张当前学习状态的小便签。" />
        <div className="now-grid">
          {site.now.map((item) => (
            <article className="now-card" key={item.label}>
              <span>{item.label}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
