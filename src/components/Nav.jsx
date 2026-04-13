import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import gsap from 'gsap'
import './Nav.css'

const SUBTITLE = 'LABOR IN PLAIN SIGHT'

export default function Nav() {
  const [displayed, setDisplayed] = useState('')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const aboutCircleRef = useRef(null)
  const infoCircleRef = useRef(null)
  const { pathname } = useLocation()
  const isHome = pathname === '/'
  const isAbout = pathname === '/about'
  const isInfo = pathname === '/info'

  useEffect(() => {
    let timeout
    let current = ''
    let deleting = false

    const tick = () => {
      if (!deleting) {
        current = SUBTITLE.slice(0, current.length + 1)
        setDisplayed(current)
        if (current === SUBTITLE) {
          deleting = true
          timeout = setTimeout(tick, 10000)
          return
        }
      } else {
        current = current.slice(0, -1)
        setDisplayed(current)
        if (current === '') {
          deleting = false
          timeout = setTimeout(tick, 400)
          return
        }
      }
      timeout = setTimeout(tick, deleting ? 45 : 80)
    }

    timeout = setTimeout(tick, 80)
    return () => clearTimeout(timeout)
  }, [])

  useEffect(() => {
    if (aboutCircleRef.current) {
      gsap.killTweensOf(aboutCircleRef.current)
      gsap.set(aboutCircleRef.current, isAbout
        ? { width: 5, marginRight: 10, opacity: 1 }
        : { width: 0, marginRight: 0, opacity: 0 })
    }
    if (infoCircleRef.current) {
      gsap.killTweensOf(infoCircleRef.current)
      gsap.set(infoCircleRef.current, isInfo
        ? { width: 5, marginRight: 10, opacity: 1 }
        : { width: 0, marginRight: 0, opacity: 0 })
    }
  }, [isAbout, isInfo])

  const handleEnter = (ref, isActive) => {
    if (isActive) return
    gsap.killTweensOf(ref.current)
    gsap.to(ref.current, { width: 5, marginRight: 10, opacity: 1, duration: 0.15, ease: 'power2.out' })
  }

  const handleLeave = (ref, isActive) => {
    if (isActive) return
    gsap.killTweensOf(ref.current)
    gsap.to(ref.current, { width: 0, marginRight: 0, opacity: 0, duration: 0.12, ease: 'power2.in' })
  }

  const closeMenu = () => setMobileMenuOpen(false)

  return (
    <>
      <header className="nav grid">
        {/* Mobile-only MENU toggle — before brand in DOM so it renders above */}
        <button
          className="nav__menu-toggle"
          onClick={() => setMobileMenuOpen(o => !o)}
          aria-expanded={mobileMenuOpen}
        >
          MENU
        </button>

        <div className="nav__brand">
          <Link to="/" className="nav__title">Silicon Valley Girl</Link>
          <span className="nav__subtitle">
            {displayed}<span className="nav__cursor">|</span>
          </span>
        </div>

        <nav className="nav__links">
          <Link
            to="/about"
            className={`nav__link${isAbout ? ' nav__link--active' : ''}`}
            onMouseEnter={() => handleEnter(aboutCircleRef, isAbout)}
            onMouseLeave={() => handleLeave(aboutCircleRef, isAbout)}
          >
            <span className={`nav__circle${isAbout ? ' nav__circle--active' : ''}`} ref={aboutCircleRef} aria-hidden="true" />
            SUANNA ZHONG
          </Link>
          <Link
            to="/info"
            className={`nav__link nav__link--info${isInfo ? ' nav__link--active' : ''}`}
            onMouseEnter={() => handleEnter(infoCircleRef, isInfo)}
            onMouseLeave={() => handleLeave(infoCircleRef, isInfo)}
          >
            <span className={`nav__circle${isInfo ? ' nav__circle--active' : ''}`} ref={infoCircleRef} aria-hidden="true" />
            INFORMATION
          </Link>
        </nav>
      </header>

      {/* Mobile drawer — always in DOM, open/close via CSS transition */}
      <div className={`nav__drawer${mobileMenuOpen ? ' nav__drawer--open' : ''}`}>
        <nav className="nav__drawer-inner">
          <Link
            to="/"
            className={`nav__overlay-link${isHome ? ' nav__overlay-link--active' : ''}`}
            onClick={closeMenu}
          >
            {isHome && <span className="nav__overlay-bullet" />}
            SILICON VALLEY GIRL
          </Link>
          <Link
            to="/about"
            className={`nav__overlay-link${isAbout ? ' nav__overlay-link--active' : ''}`}
            onClick={closeMenu}
          >
            {isAbout && <span className="nav__overlay-bullet" />}
            SUANNA ZHONG
          </Link>
          <Link
            to="/info"
            className={`nav__overlay-link${isInfo ? ' nav__overlay-link--active' : ''}`}
            onClick={closeMenu}
          >
            {isInfo && <span className="nav__overlay-bullet" />}
            INFORMATION
          </Link>
        </nav>
      </div>

      {/* Mobile-only brand — sits below the drawer */}
      <div className="nav__mobile-brand">
        <Link to="/" className="nav__title">Silicon Valley Girl</Link>
        <span className="nav__subtitle">
          {displayed}<span className="nav__cursor">|</span>
        </span>
      </div>
    </>
  )
}
