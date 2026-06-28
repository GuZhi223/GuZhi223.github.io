import { site } from '../data/site';
import { SectionHeading } from './ui/SectionHeading';

export function AboutSection() {
  return (
    <section className="section-band about-band" id="about" data-reveal>
      <div className="content-grid about-grid">
        <SectionHeading eyebrow="ABOUT" title="关于我" description="真实一点，不把学习过程包装成资深工程师叙事。" />
        <div className="about-copy">
          {site.about.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
