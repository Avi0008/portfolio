'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, ArrowUpRight } from 'lucide-react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#121212]/85 backdrop-blur-md border-b border-white/10 py-3 shadow-lg'
          : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
        {/* Brand Logo / Title */}
        <Link 
          href="#about" 
          className="text-white font-bold tracking-tight text-lg sm:text-xl flex items-center gap-2 group min-h-[48px] min-w-[48px] items-center"
        >
          <span className="h-3 w-3 rounded-full bg-blue-500 group-hover:scale-125 transition-transform duration-300"></span>
          <span>Avishek Chakraborty</span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-white/70 hover:text-white font-medium text-sm transition-colors min-h-[48px] min-w-[48px] flex items-center px-2"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Desktop Primary CTA Button */}
        <div className="hidden md:flex items-center">
          <Link
            href="#contact"
            className="min-h-[48px] px-6 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all duration-300 flex items-center gap-2 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-105 active:scale-95"
          >
            <span>Get in Touch</span>
            <ArrowUpRight size={16} />
          </Link>
        </div>

        {/* Mobile Hamburger Button (Strict >= 48px touch target) */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Navigation Menu"
          aria-expanded={isOpen}
          className="md:hidden text-white/80 hover:text-white focus:outline-none min-h-[48px] min-w-[48px] flex items-center justify-center p-3 rounded-lg hover:bg-white/10"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer Navigation */}
      {isOpen && (
        <div className="md:hidden bg-[#121212]/95 backdrop-blur-xl border-b border-white/10 px-6 py-6 transition-all duration-300">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white font-medium text-lg min-h-[48px] flex items-center px-4 rounded-lg hover:bg-white/5"
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="mt-2 min-h-[48px] w-full px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-center flex items-center justify-center gap-2 shadow-lg shadow-blue-500/30"
            >
              <span>Get in Touch</span>
              <ArrowUpRight size={18} />
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
