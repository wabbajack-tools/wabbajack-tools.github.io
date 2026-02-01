import { Link } from '@tanstack/react-router';

export function Header() {
  return (
    <header className="sticky top-0 z-10">
      <nav className="sticky px-6 py-3 bg-wabbajack-background-darker">
        <div className="flex flex-wrap gap-3 items-center justify-end">
          <div className="flex-grow">
            <Link
              to="/"
              className="font-medium text-wabbajack-purple-light text-xl hover:underline"
            >
              Wabbajack
            </Link>
          </div>

          <Link
            to="/"
            className="font-light text-lg hover:underline"
          >
            Home
          </Link>
          <Link
            to="/gallery"
            className="font-light text-lg hover:underline"
          >
            Gallery
          </Link>
          <Link
            to="/status"
            className="font-light text-lg hover:underline"
          >
            Status
          </Link>
        </div>
      </nav>
    </header>
  );
}
