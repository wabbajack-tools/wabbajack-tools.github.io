import { Link, useLocation } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const navLinks = [
  { to: '/' as const, label: 'Home' },
  { to: '/gallery' as const, label: 'Gallery' },
  { to: '/search/global' as const, label: 'Archive Search' },
  { to: '/status' as const, label: 'Status' },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50">
      {/* Gradient line at top */}
      <div className="h-[2px] bg-gradient-to-r from-transparent via-neon-purple to-transparent" />

      <nav className="glass border-b border-neon-purple/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <motion.div
                className="relative"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                <img
                  src="/wabbajack_transparent.webp"
                  alt="Wabbajack"
                  className="h-10 w-10"
                />
                <div className="absolute inset-0 bg-neon-purple/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
              <span className="font-display font-bold text-xl gradient-text hidden sm:block">
                Wabbajack
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map(({ to, label }) => {
                const isActive = location.pathname === to ||
                  (to !== '/' && location.pathname.startsWith(to));

                return (
                  <Link
                    key={to}
                    to={to}
                    className={cn(
                      'relative px-4 py-2 text-sm font-medium transition-colors rounded-lg',
                      isActive
                        ? 'text-neon-purple'
                        : 'text-text-secondary hover:text-text-primary'
                    )}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute inset-0 bg-neon-purple/10 rounded-lg border border-neon-purple/30"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{label}</span>
                  </Link>
                );
              })}
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 text-text-secondary hover:text-neon-purple transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden border-t border-neon-purple/10"
          >
            <div className="px-4 py-3 space-y-1">
              {navLinks.map(({ to, label }) => {
                const isActive = location.pathname === to;

                return (
                  <Link
                    key={to}
                    to={to}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      'block px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-neon-purple/10 text-neon-purple border border-neon-purple/30'
                        : 'text-text-secondary hover:bg-surface-light hover:text-text-primary'
                    )}
                  >
                    {label}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </nav>
    </header>
  );
}
