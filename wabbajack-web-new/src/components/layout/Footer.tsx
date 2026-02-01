import { Link } from '@tanstack/react-router';
import { EXTERNAL_LINKS } from '@/lib/constants';

export function Footer() {
  return (
    <footer className="sticky bottom-0 sm:px-6 py-2 bg-wabbajack-background-darker">
      <div className="flex flex-wrap gap-3 justify-center items-center text-center">
        <a
          href={EXTERNAL_LINKS.github}
          className="font-medium hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
        <Link to="/discord" className="font-medium hover:underline">
          Discord
        </Link>
        <a
          href={EXTERNAL_LINKS.wiki}
          className="font-medium hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Wiki
        </a>
        <a
          href={EXTERNAL_LINKS.patreon}
          className="font-medium hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Patreon
        </a>
        <a
          href={EXTERNAL_LINKS.reddit}
          className="font-medium hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Reddit
        </a>
      </div>
    </footer>
  );
}
