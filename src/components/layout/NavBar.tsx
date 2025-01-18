'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Image from 'next/image'

interface NavItem {
  label: string;
  href: string;
}

const navigation: NavItem[] = [
  { label: 'Explore', href: '/' },
  { label: 'Contact', href: '/contact' },
  { label: 'About', href: '/about' },
  { label: 'License', href: '/license' },
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

  return (
    <nav className={`sticky top-0 z-50 bg-transparent navbar-custom-dashed-border border-gray-200 ${useScrolling() ? 'backdrop-blur-xl bg-black/50' : ''}`}>
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
                className="text-stale-800 hover:bg-slate-200/50 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                {item.label}
              </a>
            ))}
            <button className="bg-magenta-color text-white shadow-lg shadow-magenta-color/50 px-4 py-2 rounded-md text-sm font-medium hover:bg-magenta-hover transition-colors">
              Donation
            </button>
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
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white">
            {navigation.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              >
                {item.label}
              </a>
            ))}
            <button className="w-full text-left bg-blue-600 text-white px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700 transition-colors">
              Sign In
            </button>
          </div>
        </div>
      )}

    </nav>
  );
};

export default Navbar;