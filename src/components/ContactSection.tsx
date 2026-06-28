import { ArrowUp, Github, Mail } from 'lucide-react';
import { useState } from 'react';
import { site } from '../data/site';
import { SectionHeading } from './ui/SectionHeading';

export function ContactSection() {
  const [message, setMessage] = useState('');

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(site.email);
      setMessage('邮箱已复制');
    } catch {
      setMessage(`复制失败，可以手动使用 ${site.email}`);
    }
  }

  return (
    <section className="section-band contact-band" id="contact" data-reveal>
      <div className="content-wrap">
        <SectionHeading eyebrow="CONTACT" title="联系" description="GitHub 是主要代码产出地，邮件也可以找到我。" />
        <div className="contact-panel">
          <a href={site.githubUrl} target="_blank" rel="noreferrer">
            <Github size={18} aria-hidden="true" />
            GitHub / {site.handle}
          </a>
          <button type="button" onClick={copyEmail}>
            <Mail size={18} aria-hidden="true" />
            复制邮箱
          </button>
          <a href={`mailto:${site.email}`}>
            <Mail size={18} aria-hidden="true" />
            {site.email}
          </a>
          <a href="#home">
            <ArrowUp size={18} aria-hidden="true" />
            返回顶部
          </a>
        </div>
        <p className="copy-status" aria-live="polite">
          {message}
        </p>
      </div>
    </section>
  );
}
