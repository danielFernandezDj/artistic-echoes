"use client"

import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    products: [
      { name: 'Features', href: '#' },
      { name: 'Pricing', href: '#' },
      { name: 'Resources', href: '#' },
      { name: 'Case Studies', href: '#' },
    ],
    company: [
      { name: 'About', href: '#' },
      { name: 'Careers', href: '#' },
      { name: 'Blog', href: '#' },
      { name: 'Contact', href: '#' },
    ],
    support: [
      { name: 'Help Center', href: '#' },
      { name: 'Terms of Service', href: '#' },
      { name: 'Privacy Policy', href: '#' },
      { name: 'Cookie Settings', href: '#' },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: '#' },
    { icon: Twitter, href: '#' },
    { icon: Instagram, href: '#' },
    { icon: Linkedin, href: '#' },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300 rounded-t-2xl mx-4 absolute bottom-0">
      <div className="max-w-dull mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Logo and description section */}
          <div className="lg:col-span-2">
            <h2 className="text-white text-xl font-bold">Company Name</h2>
            <p className="mt-4 text-gray-400 text-sm">
              Building the future of digital experiences. Join us in creating
              meaningful solutions for businesses worldwide.
            </p>
            {/* Newsletter subscription */}
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-white">
                Subscribe to our newsletter
              </h3>
              <div className="mt-3 flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-gray-800 text-white px-4 py-2 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                />
                <button className="bg-blue-600 text-white px-4 py-2 rounded-r hover:bg-blue-700 transition-colors">
                  <Mail className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Links sections */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-sm font-semibold text-white uppercase">
                {category}
              </h3>
              <ul className="mt-4 space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom section with social links and copyright */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex space-x-6">
              {socialLinks.map((link, index) => {
                const Icon = link.icon;
                return (
                  <a
                    key={index}
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
            <p className="mt-4 md:mt-0 text-gray-400 text-sm">
              © {currentYear} Company Name. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;