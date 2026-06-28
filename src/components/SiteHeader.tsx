import { Github } from 'lucide-react';
import { useEffect, useState } from 'react';
import { site } from '../data/site';
import { ThemeToggle } from './ThemeToggle';

const navItems = [
  { href: '#now', label: '近况', shortLabel: '近况' },
  { href: '#featured', label: '作品', shortLabel: '作品' },
  { href: '#works', label: '在线作品', shortLabel: '项目' },
  { href: '#about', label: '关于', shortLabel: '关于' },
  { href: '#contact', label: '联系', shortLabel: '联系' },
];

export function SiteHeader() {
  const [activeId, setActiveId] = useState('home');

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>('section[id]');
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) {
          setActiveId(visible.target.id);
        }
      },
      { rootMargin: '-42% 0px -50% 0px', threshold: 0.01 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="site-header">
      <a className="skip-link" href="#home">
        跳到主要内容
      </a>
      <nav className="nav-shell" aria-label="主导航">
        <a className="brand" href="#home" aria-label="回到首页">
          <span className="brand-mark">钢</span>
          <span className="brand-text">{site.handle}</span>
        </a>
        <div className="nav-links">
          {navItems.map((item) => {
            const id = item.href.replace('#', '');
            return (
              <a
                key={item.href}
                className={activeId === id ? 'nav-link is-active' : 'nav-link'}
                href={item.href}
                aria-current={activeId === id ? 'page' : undefined}
              >
                <span className="nav-label-full">{item.label}</span>
                <span className="nav-label-short">{item.shortLabel}</span>
              </a>
            );
          })}
        </div>
        <div className="nav-actions">
          <a className="icon-button" href={site.githubUrl} target="_blank" rel="noreferrer" aria-label="打开 GitHub">
            <Github size={19} aria-hidden="true" />
          </a>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
