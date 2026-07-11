import { useEffect } from 'react';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { FeaturedProjects } from './components/FeaturedProjects';
import { HeroSection } from './components/HeroSection';
import { MoreProjects } from './components/MoreProjects';
import { NowSection } from './components/NowSection';
import { SiteFooter } from './components/SiteFooter';
import { SiteHeader } from './components/SiteHeader';
import { WorksSection } from './components/WorksSection';

function App() {
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    const elements = document.querySelectorAll<HTMLElement>('[data-reveal]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.04, rootMargin: '0px 0px -6% 0px' },
    );

    elements.forEach((element) => {
      const rect = element.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.95) {
        element.classList.add('is-visible');
        return;
      }

      observer.observe(element);
    });
    document.documentElement.classList.add('reveal-ready');

    return () => {
      observer.disconnect();
      document.documentElement.classList.remove('reveal-ready');
    };
  }, []);

  return (
    <>
      <SiteHeader />
      <main>
        <HeroSection />
        <NowSection />
        <FeaturedProjects />
        <WorksSection />
        <MoreProjects />
        <AboutSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}

export default App;
