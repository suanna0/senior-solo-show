import { useEffect, useRef, useState } from 'react'
import './Home.css'

const works = [
  { title: 'Envy Me', year: 2026, image: 'https://de1wwae7728z6.cloudfront.net/images/art-website/envy_me.jpg', medium: 'Oil on wood panel', dimensions: '10 x 10 inches' },
  { title: 'Why must they grow up and lose it all?', year: 2026, image: 'https://de1wwae7728z6.cloudfront.net/images/art-website/why_must_they.jpg', medium: 'Oil on wood panel', dimensions: '16 x 12 inches' },
  { title: 'Good Game', year: 2026, image: 'https://de1wwae7728z6.cloudfront.net/images/art-website/good_game.jpg', medium: 'Oil on canvas', dimensions: '11 x 14 inches each' },
  { title: 'Warm Up / Andromeda', year: 2026, image: 'https://de1wwae7728z6.cloudfront.net/images/art-website/warm_up_andromeda.jpg', medium: 'Oil on wood panel', dimensions: '48 x 15 inches' },
  { title: 'Two Birds', year: 2026, image: 'https://de1wwae7728z6.cloudfront.net/images/art-website/two_birds.jpg', medium: 'Oil on canvas', dimensions: '24 x 36 inches' },
  { title: 'Wreaking Havoc on Tantau Ave', year: 2025, image: 'https://de1wwae7728z6.cloudfront.net/images/art-website/photo/tantau/tantau_1.jpg', medium: 'Photography', dimensions: '12 x 18 inches' },
  { title: 'Luncheon at Yosemite', year: 2025, image: 'https://de1wwae7728z6.cloudfront.net/images/art-website/yosemite_luncheon.jpg', medium: 'Oil on wood panel', dimensions: '46.5 x 24 inches' },
  { title: '3464 19th Street', year: 2025, image: 'https://de1wwae7728z6.cloudfront.net/images/art-website/3464.jpg', medium: 'Oil on two wooden panels (diptych)', dimensions: '10 x 10 inches each' },
  { title: 'Marco Polo', year: 2025, image: 'https://de1wwae7728z6.cloudfront.net/images/art-website/marco_polo.jpeg', medium: 'Oil on mdf', dimensions: '12 x 16 inches' },
  { title: 'Running Away from the Memory Diagram', year: 2025, image: 'https://de1wwae7728z6.cloudfront.net/images/art-website/running_away.JPG', medium: 'Oil on canvas', dimensions: '6.5 x 7 inches' },
  { title: 'Regular Bride', year: 2025, image: 'https://de1wwae7728z6.cloudfront.net/images/art-website/regular_bride.JPG', medium: 'Oil on cardboard', dimensions: 'variable dimension' },
  { title: 'Time for Dancing Shoes', year: 2025, image: 'https://de1wwae7728z6.cloudfront.net/images/art-website/time_for_dancing_shoes.jpg', medium: 'Oil on wood panel', dimensions: '5.5 x 24 inches' },
  { title: 'Return Offer', year: 2025, image: 'https://de1wwae7728z6.cloudfront.net/images/art-website/return_offer.jpg', medium: 'Oil on canvas', dimensions: '24 x 30 inches' },
  { title: 'Untitled', year: 2025, image: 'https://de1wwae7728z6.cloudfront.net/images/art-website/untitled_aidan.jpg', medium: 'Oil on canvas', dimensions: '16 x 20 inches' },
  { title: 'China Beach', year: 2025, image: 'https://de1wwae7728z6.cloudfront.net/images/art-website/china_beach.jpg', medium: 'Oil on wood panel', dimensions: '12 x 12 inches' },
  { title: 'Finale', year: 2025, image: 'https://de1wwae7728z6.cloudfront.net/images/art-website/finale.jpg', medium: 'Oil on canvas, wood panel', dimensions: 'variable dimension' },
  { title: 'Untitled (Room)', year: 2024, image: 'https://de1wwae7728z6.cloudfront.net/images/art-website/printer_paper_2.jpg', medium: 'Graphite', dimensions: '8.5 x 11 inches' },
  { title: 'Kaitlyn, Jessie', year: 2024, image: 'https://de1wwae7728z6.cloudfront.net/images/art-website/kaitlyn_jessie.JPG', medium: 'Oil on wood panel', dimensions: '16 x 12 inches' },
  { title: 'The Computer is a Friend', year: 2024, image: 'https://de1wwae7728z6.cloudfront.net/images/art-website/computer.JPG', medium: 'Oil on canvas', dimensions: '20 x 24 inches' },
  { title: 'Haircut', year: 2024, image: 'https://de1wwae7728z6.cloudfront.net/images/art-website/haircut.jpg', medium: 'Oil on canvas', dimensions: '24 x 36 inches' },
  { title: 'Dad in Texas', year: 2023, image: 'https://de1wwae7728z6.cloudfront.net/images/art-website/photo/personal/001_dad_in_texas.jpg', medium: 'Photography', dimensions: '12 x 8 inches' },
  { title: '双 (Pair)', year: 2023, image: 'https://de1wwae7728z6.cloudfront.net/images/art-website/shuang.jpg', medium: 'Oil on canvas', dimensions: '24 x 48 inches' },
]

export default function Home() {
  const [showBackToTop, setShowBackToTop] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > 200)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const leftRef = useRef(null)
  const bioRef = useRef(null)
  const previewRef = useRef(null)
  const imgRef = useRef(null)
  const mediumRef = useRef(null)
  const dimensionsRef = useRef(null)
  const itemRefs = useRef([])
  const activeIndexRef = useRef(null)
  const orientations = useRef({})

  // Preload images and compute orientations
  useEffect(() => {
    // Manual overrides
    orientations.current['Two Birds'] = 'portrait-wide'
    orientations.current['Marco Polo'] = 'portrait-wide'

    works.forEach((work) => {
      if (!work.image || orientations.current[work.title]) return
      const img = new Image()
      img.onload = () => {
        const ratio = img.naturalWidth / img.naturalHeight
        orientations.current[work.title] = ratio > 1.05 ? 'landscape' : ratio < 0.95 ? 'portrait' : 'square'
      }
      img.src = work.image
    })
  }, [])

  const handleMouseEnter = (work, index) => {
    const orientation = orientations.current[work.title] ?? 'landscape'

    // Swap left panel class directly — no React re-render
    if (leftRef.current) {
      leftRef.current.className = `home__left${orientation !== 'landscape' ? ` home__left--${orientation}` : ''}`
    }

    // Update image src and captions directly
    if (imgRef.current) imgRef.current.src = work.image || ''
    if (mediumRef.current) mediumRef.current.textContent = work.medium
    if (dimensionsRef.current) dimensionsRef.current.textContent = work.dimensions

    // Swap bio ↔ preview
    if (bioRef.current) bioRef.current.style.display = 'none'
    if (previewRef.current) previewRef.current.style.display = 'flex'

    // Toggle active class
    if (activeIndexRef.current !== null && activeIndexRef.current !== index) {
      itemRefs.current[activeIndexRef.current]?.classList.remove('home__work-item--active')
    }
    activeIndexRef.current = index
    itemRefs.current[index]?.classList.add('home__work-item--active')
  }

  const handleMouseLeave = () => {
    // Swap back
    if (bioRef.current) bioRef.current.style.display = 'flex'
    if (previewRef.current) previewRef.current.style.display = 'none'
    if (leftRef.current) leftRef.current.className = 'home__left'

    if (activeIndexRef.current !== null) {
      itemRefs.current[activeIndexRef.current]?.classList.remove('home__work-item--active')
      activeIndexRef.current = null
    }
  }

  return (
    <section className="home grid">
      <div className="home__mobile-brand">
        <span className="home__mobile-title">Silicon Valley Girl</span>
        <span className="nav__subtitle">LABOR IN PLAIN SIGHT<span className="nav__cursor">|</span></span>
      </div>

      <div className="home__left" ref={leftRef}>
        <div className="home__text" ref={bioRef}>
          <p>
            Silicon Valley Girl reflects on the adolescent queer experience of growing up in the San Francisco
            Bay Area before the widespread use of artificial intelligence. Portraits, saturated landscapes, and
            the misuse of academic imagery embody a critical yet playful exploration of heterosexuality,
            "airport beauty," and quiet absurdities, set alongside the irreversible consequences of the
            technothropocene.
          </p>
          <p>
            Across 22 works, Zhong aims to represent the arduous yet meticulous labor of computer
            scientists within a contemporary art context, offering a glimpse of what computer science might
            become in the absence of fiscal motivation.
          </p>
        </div>
        <div className="home__preview" ref={previewRef} style={{ display: 'none' }}>
          <img ref={imgRef} className="home__preview-img" alt="" />
          <div className="home__caption">
            <div className="home__caption-col home__caption-labels">
              <span>MEDIUM</span>
              <span>DIMENSIONS</span>
            </div>
            <div className="home__caption-col home__caption-values">
              <span ref={mediumRef} />
              <span ref={dimensionsRef} />
            </div>
          </div>
        </div>
      </div>

      <ul className="home__works" onMouseLeave={handleMouseLeave}>
        {works.map((work, i) => (
          <li
            key={i}
            ref={el => itemRefs.current[i] = el}
            className="home__work-item"
            onMouseEnter={() => handleMouseEnter(work, i)}
          >
            <span className="home__work-indicator" aria-hidden="true" />
            <span className="home__work-text">
              {work.title}<span className="home__year">[{work.year}]</span>
            </span>
          </li>
        ))}
      </ul>

      {/* Mobile-only image list */}
      <ul className="home__mobile-works">
        {works.map((work, i) => (
          <li key={i} className="home__mobile-work">
            {work.image && <img src={work.image} alt={work.title} className="home__mobile-img" />}
            <div className="home__mobile-details">
              <span className="home__mobile-name">
                {work.title}<span className="home__year">[{work.year}]</span>
              </span>
              <div className="home__mobile-meta">
                <span>{work.medium}</span>
                <span>{work.dimensions}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <button
        className={`home__back-to-top${showBackToTop ? ' home__back-to-top--visible' : ''}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
      >
        BACK TO TOP ↑
      </button>
    </section>
  )
}
