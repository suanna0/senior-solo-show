import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer grid">
      <a
        href="https://suannazhong.com"
        target="_blank"
        rel="noopener noreferrer"
        className="footer__link footer__link--left"
      >
        SUANNAZHONG.COM
      </a>
      <span className="footer__link footer__link--right">Designed by <a href="https://melissaqin.com" target="_blank" rel="noopener noreferrer" className="footer__link--name">Melissa Qin</a></span>
    </footer>
  )
}
