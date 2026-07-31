import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { HiMenu, HiX } from 'react-icons/hi'
import { NAV_LINKS } from '../constants/siteData'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const linkClass = ({ isActive }) =>
    `relative font-body text-sm font-medium tracking-wide transition-colors duration-300 ${
      isActive ? 'text-tea-gold' : scrolled ? 'text-tea-dark hover:text-tea-gold' : 'text-tea-cream hover:text-tea-gold'
    }`

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-tea-cream/95 backdrop-blur-md shadow-soft py-3' : 'bg-transparent py-5'
      }`}
    >
      <nav className="section-container flex items-center justify-between">
        <NavLink to="/" className="flex items-center gap-2 z-50">
          <span className={`font-heading text-2xl font-bold ${scrolled ? 'text-tea-dark' : 'text-tea-cream'}`}>
            Janta Tea
          </span>
        </NavLink>

        {/* Desktop links */}
        <ul className="hidden lg:flex items-center gap-9">
          {NAV_LINKS.map((link) => (
            <li key={link.path}>
              <NavLink to={link.path} className={linkClass}>
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="hidden lg:block">
          <NavLink
            to="/contact"
            className="inline-flex items-center px-6 py-2.5 rounded-full bg-tea-gold text-tea-dark font-semibold text-sm hover:bg-tea-goldLight transition-colors duration-300"
          >
            Get in Touch
          </NavLink>
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden z-50 text-3xl"
          onClick={() => setIsOpen((v) => !v)}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
        >
          {isOpen ? (
            <HiX className="text-tea-dark" />
          ) : (
            <HiMenu className={scrolled ? 'text-tea-dark' : 'text-tea-cream'} />
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="lg:hidden bg-tea-cream overflow-hidden"
          >
            <ul className="flex flex-col gap-1 px-5 pb-6 pt-2">
              {NAV_LINKS.map((link) => (
                <li key={link.path}>
                  <NavLink
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `block py-3 border-b border-tea-dark/10 font-body text-base ${
                        isActive ? 'text-tea-gold font-semibold' : 'text-tea-dark'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
