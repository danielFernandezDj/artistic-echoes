'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Image from 'next/image'

interface NavItem {
  label: string;
  href: string;
  id: string;
}

const navigation: NavItem[] = [
  { label: 'Explore', href: '/', id: 'nav-home' },
  { label: 'Contact', href: '/contact', id: 'nav-contact' },
  { label: 'About', href: '/about', id: 'nav-about' },
  { label: 'License', href: '/license', id: 'nav-license' },
];

const useScrolling = () => {
  const [scrolling, setScrolling] = useState(false);

  const handleScroll = () => {
    if (window.scrollY >= 20) {
      setScrolling(true);
    } else {
      setScrolling(false);
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return scrolling;
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState('')

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto'
    }

    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isOpen])

  useEffect(() => {
    setCurrentPath(window.location.pathname)

    const handlePathChange = (() => {
      setIsOpen(false)
      setCurrentPath(window.location.pathname);
    })

    window.addEventListener('popstate', handlePathChange)
    return () => window.removeEventListener('popstate', handlePathChange)
  }, [])

  const sanitizeUrl = (url: string): string => {
    const cleaned = url.replace(/[^\w-/]/g, '');
    return cleaned.startsWith('/') ? cleaned : `/${cleaned}`;
  };

  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const sanitizedUrl = sanitizeUrl(href);
    window.history.pushState({}, '', sanitizedUrl);
    setCurrentPath(sanitizedUrl);
    setIsOpen(false);
  };

  return (
    <nav className={`sticky top-0 z-50 bg-transparent navbar-custom-dashed-border transitionAll border-gray-200 ${useScrolling() ? 'bg-white shadow-lg' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 gap-2 flex items-center">
            <Image
              src="/images/icons.svg"
              alt="Logo Image."
              width={40}
              height={40}
            />
            <span className="text-2xl font-bold text-gradient">Artistic Echoes</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navigation.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`text-stale-900 text-sm px-3 py-2 font-mono rounded-md font-medium transition-colors ${currentPath === item.href
                  ? 'text-slate-50 bg-orange-color'
                  : 'hover:bg-gray-200'
                  }`}
                aria-current={currentPath === item.href ? 'page' : undefined}
                aria-label={item.label}
                onClick={(e) => handleNavigation(e, item.href)}
              >
                {item.label}
              </a>
            ))}
            <div className='flex items-center gap-4'>
              <a
                href='https://buymeacoffee.com/daniel.tech'
                target='_blank'
                className="text-magenta-color cursor-alias font-mono text-sm font-bold hover:text-orange-color transition-colors"
              >
                Donate⤴︎
              </a>
              <button className="bg-magenta-color text-white shadow-lg shadow-magenta-color/50 font-mono px-4 py-2 rounded-md text-sm font-medium hover:bg-magenta-hover transition-colors">
                Sign In
              </button>
            </div>

          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden ">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white">
            {navigation.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`block px-3 py-2 rounded-md text-base font-mono font-medium ${currentPath === item.href
                  ? 'text-slate-50 bg-orange-color'
                  : 'hover:bg-gray-100'
                  }`}
              >
                {item.label}
              </a>
            ))}
            <button
              className="text-magenta-color font-mono px-3 py-2 rounded-md text-sm font-bold hover:text-orange-color transition-colors"
            >
              Donate⤴︎
            </button>
            <button className="w-full text-left bg-blue-600 text-white px-3 py-2 rounded-md text-base font-mono font-medium hover:bg-blue-700 transition-colors">
              Sign In
            </button>
          </div>
        </div>
      )}

    </nav>
  );
};

export default Navbar;