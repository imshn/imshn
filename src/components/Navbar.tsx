
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentHash, setCurrentHash] = useState('');
  const pathname = usePathname();

  // Navigation links
  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Who I Help', href: '/#about' },
    { name: 'Services', href: '/#skills' },
    { name: 'Process & Proof', href: '/#projects' },
    // { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/#contact' },
  ];

  // Check if current path matches link path
  const isActive = (path: string) => {
    if (path.includes('#')) {
      const [basePath, hash] = path.split('#');
      return pathname === basePath && currentHash === `#${hash}`;
    }
    return path === '/' ? pathname === '/' && !currentHash : pathname === path;
  };

  useEffect(() => {
    const syncHash = () => setCurrentHash(window.location.hash || '');
    syncHash();
    window.addEventListener('hashchange', syncHash);

    return () => window.removeEventListener('hashchange', syncHash);
  }, [pathname]);

  // Handle scroll event to change navbar style
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when changing routes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Handle smooth scrolling for anchor links
  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.includes('#')) {
      e.preventDefault();
      const [basePath, hash] = href.split('#');
      
      // Only handle if we're on the same base path
      if (pathname === basePath || (basePath === '/' && pathname === '/')) {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          window.history.pushState(null, '', href);
          setCurrentHash(`#${hash}`);
        }
      } else {
        window.location.assign(href);
      }
    }
  };

  return (
    <header
      className={cn(
        'fixed top-0 w-full z-50 transition-all duration-300 ease-in-out',
        isScrolled
          ? 'py-3 glass'
          : 'py-6 bg-transparent'
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link 
          href="/"
          className="text-xl font-bold flex items-center"
        >
          <div className="relative">
            <span className="text-shimmer">Shaan</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
                href={link.href}
              onClick={(e) => handleAnchorClick(e, link.href)}
              className={cn(
                "nav-link",
                isActive(link.href) && "text-primary after:scale-x-100"
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-foreground hover:text-primary transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div
        className={cn(
          "fixed inset-0 top-[60px] bg-background/95 backdrop-blur-sm z-40 md:hidden transition-all duration-300 ease-in-out",
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        <nav className="container mx-auto px-4 py-8 flex flex-col items-center space-y-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
                href={link.href}
              onClick={(e) => handleAnchorClick(e, link.href)}
              className={cn(
                "text-lg font-medium transition-colors hover:text-primary",
                isActive(link.href) && "text-primary"
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
