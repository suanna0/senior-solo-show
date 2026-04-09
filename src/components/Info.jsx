import './Info.css'

export default function Info() {
  return (
    <section className="info grid">
      <div className="info__bio">
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

      <div className="info__content">
        <div className="info__title">SUANNA ZHONG'S BXA CAPSTONE</div>

        <div className="info__section">
          <span className="info__label">LOCATION</span>
          <span>THE FRAME GALLERY</span>

          <span className="info__label">ADDRESS</span>
          <span>5200 FORBES AVE,<br />PITTSBURGH, PA</span>
        </div>

        <div className="info__section">
          <span className="info__show-days">SHOW DAYS</span>
          <span />

          <span className="info__label">04.24</span>
          <span>
            <span className="info__label">[RECEPTION]</span><br />6:00PM – 9:00PM
          </span>

          <span className="info__label">04.25</span>
          <span>12:00PM – 5:00PM</span>

          <span className="info__label">04.26</span>
          <span>12:00PM – 5:00PM</span>
        </div>
      </div>
    </section>
  )
}
