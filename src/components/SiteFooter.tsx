import { site } from '../data/site';

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="content-wrap footer-inner">
        <p>GO WORK</p>
        <p>
          © {new Date().getFullYear()} {site.name}的数字试验田。Powered by 持续不断的折腾。
        </p>
      </div>
    </footer>
  );
}
