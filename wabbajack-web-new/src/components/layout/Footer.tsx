import { Link } from '@tanstack/react-router';
import { Github, MessageCircle, BookOpen, Heart, Users } from 'lucide-react';
import { EXTERNAL_LINKS } from '@/lib/constants';

const socialLinks = [
  { href: EXTERNAL_LINKS.github, icon: Github, label: 'GitHub' },
  { to: '/discord' as const, icon: MessageCircle, label: 'Discord' },
  { href: EXTERNAL_LINKS.wiki, icon: BookOpen, label: 'Wiki' },
  { href: EXTERNAL_LINKS.patreon, icon: Heart, label: 'Patreon' },
  { href: EXTERNAL_LINKS.reddit, icon: Users, label: 'Reddit' },
];

export function Footer() {
  return (
    <footer className="relative mt-auto">
      {/* Gradient line */}
      <div className="h-[1px] bg-gradient-to-r from-transparent via-neon-purple/50 to-transparent" />

      <div className="glass border-t border-neon-purple/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Logo and tagline */}
            <div className="flex items-center gap-3">
              <img
                src="/wabbajack_transparent.webp"
                alt="Wabbajack"
                className="h-8 w-8 opacity-70"
              />
              <div>
                <p className="text-sm text-text-secondary">
                  Automated Modlist Installer
                </p>
                <p className="text-xs text-text-muted">
                  Free & Open Source
                </p>
              </div>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-2">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                const commonClasses =
                  'flex items-center gap-2 px-3 py-2 text-sm text-text-secondary hover:text-neon-purple hover:bg-neon-purple/10 rounded-lg transition-all duration-200';

                if ('to' in link && link.to) {
                  return (
                    <Link key={link.label} to={link.to} className={commonClasses}>
                      <Icon className="h-4 w-4" />
                      <span className="hidden sm:inline">{link.label}</span>
                    </Link>
                  );
                }

                if ('href' in link && link.href) {
                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={commonClasses}
                    >
                      <Icon className="h-4 w-4" />
                      <span className="hidden sm:inline">{link.label}</span>
                    </a>
                  );
                }

                return null;
              })}
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-6 pt-6 border-t border-neon-purple/10 text-center">
            <p className="text-xs text-text-muted">
              Made with <span className="text-neon-pink">♥</span> by the Wabbajack Team
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
