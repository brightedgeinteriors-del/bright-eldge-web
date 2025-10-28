"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when window is resized to desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileMenuOpen]);

  // Navigation links
  const navLinks = [
    { name: 'Home', href: '/', icon: 'home' },
    { name: 'About', href: '/about', icon: 'info' },
    { name: 'Services', href: '/services', icon: 'briefcase' },
    { name: 'Portfolio', href: '/portfolio', icon: 'image' },
    { name: 'Testimonials', href: '/testimonials', icon: 'chat' },
    { name: 'Pricing', href: '/pricing', icon: 'tag' },
  ];

  // Icon mapping
  const icons = {
    home: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    info: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    briefcase: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    image: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    chat: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
    tag: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
      </svg>
    ),
  };

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* Mobile menu overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            className="fixed inset-0 bg-black/70 z-40 md:hidden backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>
      
      <motion.nav 
        className={`fixed w-full z-50 transition-all duration-300 ease-in-out ${
          isScrolled 
            ? 'bg-white shadow-md py-2' 
            : 'bg-black/40 backdrop-blur-sm py-2'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="/" className="flex items-center space-x-3">
                <div className="relative w-16 h-16 md:w-20 md:h-20 flex items-center justify-center">
                  <Image 
                    src="/bright.png"
                    alt="Bright Edge Interiors Logo"
                    width={130}
                    height={130}
                    className="w-18 h-17 md:w-20 md:h-20 object-contain"
                    priority
                  />
                </div>
                <span className={`font-bold text-lg md:text-xl ${
                  isScrolled ? 'text-orange-900' : 'text-white'
                }`}>
                  Bright Edge Interiors
                </span>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {navLinks.map((link) => (
                <motion.div key={link.name} whileHover={{ scale: 1.05 }}>
                  <Link 
                    href={link.href}
                    className={`font-medium transition-colors duration-300 relative group ${
                      isScrolled ? 'text-orange-900 hover:text-orange-500' : 'text-white hover:text-yellow-300'
                    }`}
                  >
                    {link.name}
                    <span className={`absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${
                      isScrolled ? 'bg-gradient-to-r from-yellow-300 to-orange-500' : 'bg-white'
                    }`}></span>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center space-x-3">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link 
                  href="/contact"
                  className={`px-6 py-2 rounded-full font-medium hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 ${
                    isScrolled 
                      ? 'bg-gradient-to-r from-yellow-300 to-orange-500 text-white' 
                      : 'bg-white text-orange-900'
                  }`}
                >
                  Contact Us
                </Link>
              </motion.div>
            </div>

            {/* Mobile Menu Button */}
            <motion.button 
              className={`md:hidden focus:outline-none relative w-8 h-8 flex items-center justify-center ${
                isScrolled ? 'text-orange-900' : 'text-white'
              }`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {/* Animated hamburger icon */}
              <span 
                className={`absolute w-6 h-0.5 transition-all duration-300 ${
                  isScrolled ? 'bg-orange-900' : 'bg-white'
                } ${
                  isMobileMenuOpen ? 'rotate-45 translate-y-0' : '-translate-y-2'
                }`}
              />
              <span 
                className={`absolute w-6 h-0.5 transition-all duration-300 ${
                  isScrolled ? 'bg-orange-900' : 'bg-white'
                } ${
                  isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
                }`}
              />
              <span 
                className={`absolute w-6 h-0.5 transition-all duration-300 ${
                  isScrolled ? 'bg-orange-900' : 'bg-white'
                } ${
                  isMobileMenuOpen ? '-rotate-45 translate-y-0' : 'translate-y-2'
                }`}
              />
            </motion.button>
          </div>

          {/* Mobile Menu - Full Screen Design */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div 
                className="md:hidden fixed inset-0 bg-gradient-to-br from-orange-50 to-yellow-50 z-50 overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="h-full flex flex-col">
                  {/* Mobile menu header */}
                  <div className="flex items-center justify-between p-6 border-b border-orange-100">
                    <div className="flex items-center space-x-3">
                      <div className="relative w-14 h-14 flex items-center justify-center">
                        <Image 
                          src="/bright.png"
                          alt="Bright Edge Interiors Logo"
                          width={90}
                          height={90}
                          className="w-14 h-14 object-contain"
                          priority
                        />
                      </div>
                      <div>
                        <span className="text-orange-900 font-bold text-xl">Bright Edge</span>
                        <p className="text-xs text-orange-600">Interior Design Studio</p>
                      </div>
                    </div>
                    <motion.button 
                      className="text-orange-700 focus:outline-none p-3 rounded-full hover:bg-orange-100 transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                      aria-label="Close menu"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </motion.button>
                  </div>
                  
                  {/* Mobile menu links */}
                  <div className="flex-grow overflow-y-auto py-6">
                    <div className="px-6">
                      <h3 className="text-orange-800 font-semibold text-sm uppercase tracking-wider mb-4">Navigation</h3>
                      <div className="space-y-2">
                        {navLinks.map((link, index) => (
                          <motion.div 
                            key={link.name}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            whileHover={{ x: 5 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Link 
                              href={link.href}
                              className="flex items-center p-4 rounded-xl hover:bg-orange-100 transition-colors duration-300 group"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              <div className="mr-4 text-orange-500 group-hover:text-orange-600 transition-colors">
                                {icons[link.icon as keyof typeof icons]}
                              </div>
                              <span className="text-orange-900 font-medium text-lg">{link.name}</span>
                              <div className="ml-auto">
                                <svg className="w-5 h-5 text-orange-400 group-hover:text-orange-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                              </div>
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Mobile menu CTA */}
                  <div className="p-6 border-t border-orange-100">
                    <div className="space-y-3">
                      <motion.div 
                        whileHover={{ scale: 1.02 }} 
                        whileTap={{ scale: 0.98 }}
                        className="w-full"
                      >
                        <Link 
                          href="/admin/login"
                          className="bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-medium text-center block w-full hover:bg-gray-200 transition-all duration-300"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          Admin Panel
                        </Link>
                      </motion.div>
                      <motion.div 
                        whileHover={{ scale: 1.02 }} 
                        whileTap={{ scale: 0.98 }}
                        className="w-full"
                      >
                        <Link 
                          href="/contact"
                          className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-4 rounded-xl font-bold text-center block w-full hover:shadow-lg transition-all duration-300"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          Request a Consultation
                        </Link>
                      </motion.div>
                    </div>
                    <p className="text-center text-orange-600 text-sm mt-3">Free design consultation</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>
    </>
  );
};

export default Navbar;