import { useState, useEffect } from 'react'
import './PreLaunch.css'

const SUBTITLE = 'LABOR IN PLAIN SIGHT'

export default function PreLaunch() {
  const [displayed, setDisplayed] = useState('')

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

  return (
    <>
      <header className="prelaunch__header grid">
        <div className="prelaunch__brand">
          <span className="prelaunch__title">Silicon Valley Girl</span>
          <span className="prelaunch__subtitle">
            {displayed}<span className="prelaunch__cursor">|</span>
          </span>
        </div>
      </header>

      <section className="prelaunch grid">
        <div className="prelaunch__content">
          <div className="prelaunch__info-title">SUANNA ZHONG'S BXA CAPSTONE</div>

          <div className="prelaunch__section">
            <span className="prelaunch__label">LOCATION</span>
            <span>THE FRAME GALLERY</span>

            <span className="prelaunch__label">ADDRESS</span>
            <span>5200 FORBES AVE,<br />PITTSBURGH, PA</span>
          </div>

          <div className="prelaunch__section">
            <span className="prelaunch__show-days">SHOW DAYS</span>
            <span />

            <span className="prelaunch__label">04.24</span>
            <span>
              <span className="prelaunch__label">[RECEPTION]</span><br />6:00PM – 9:00PM
            </span>

            <span className="prelaunch__label">04.25</span>
            <span>12:00PM – 5:00PM</span>

            <span className="prelaunch__label">04.26</span>
            <span>12:00PM – 5:00PM</span>
          </div>
        </div>

        <div className="prelaunch__bio">
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
      </section>
    </>
  )
}
