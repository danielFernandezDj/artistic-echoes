'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Image from 'next/image'
import SignInButton from '../ui/SignInButton';

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

export default function Navbar() {
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

  return (
    <nav className={`sticky top-0 z-50 bg-transparent navbar-custom-dashed-border transitionAll border-gray-200 
        ${useScrolling() ? 'bg-white shadow-lg' : ''} 
        ${isOpen ? 'bg-white shadow-lg' : ''}
    `}>
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
          <div className="hidden lg:flex items-center space-x-4">
            {navigation.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`text-sm px-3 py-2 font-mono rounded-md font-medium transition-colors ${currentPath === item.href
                  ? 'text-gray-950 bg-gray-200'
                  : 'hover:bg-gray-200'
                  }`}
                aria-current={currentPath === item.href ? 'page' : undefined}
                aria-label={item.label}
              >
                {item.label}
              </a>
            ))}
            <div className='flex items-center gap-4'>
              <a
                href='https://buymeacoffee.com/daniel.tech'
                target='_blank'
                className="text-magenta-color cursor-alias font-mono text-base font-bold hidden lg:block"
              >
                Donate⤴︎
              </a>

              <SignInButton />
            </div>

          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center gap-6">
            <div className='hidden md:flex items-center gap-4 '>
              <a
                href='https://buymeacoffee.com/daniel.tech'
                target='_blank'
                className="text-magenta-color cursor-alias font-mono text-base font-bold"
              >
                Donate⤴︎
              </a>

              <SignInButton />
            </div>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              {isOpen ? (
                <X className="h-6 w-6 text-red-500" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="lg:hidden h-screen  bg-white transitionAll">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white">
            {navigation.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`block px-3 py-2 rounded-md text-base font-mono font-medium ${currentPath === item.href
                  ? 'text-gray-950 bg-gray-200'
                  : 'hover:bg-gray-100'
                  }`}
              >
                {item.label}
              </a>
            ))}
            <div className='flex flex-wrap items-center gap-2'>
              <a
                href='https://buymeacoffee.com/daniel.tech'
                target='_blank'
                className="text-magenta-color w-full font-mono px-3 py-2 rounded-md text-base font-bold"
              >
                Donate⤴︎
              </a>
            </div>
          </div>
          <div className='flex w-full items-center justify-center pl-5 pb-4 fixed bottom-5'>
            <div className='border-2 border-magenta-color/50 rounded-lg p-2 '>
              <SignInButton />
            </div>
          </div>
        </div>
      )}


    </nav>
  );
};

