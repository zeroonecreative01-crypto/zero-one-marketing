const socials = [
  ['INSTAGRAM', 'https://www.instagram.com/'],
  ['FACEBOOK', 'https://www.facebook.com/'],
  ['TIKTOK', 'https://www.tiktok.com/'],
  ['LINKEDIN', 'https://www.linkedin.com/'],
]

export default function Footer({ whatsappUrl }) {
  return (
    <footer className="footer">
      <div className="section-shell footer__top">
        <a className="wordmark footer__wordmark" href="#home"><img src="/zero-one-logo.png" alt="" /><span>ZERO <i>ONE</i></span></a>
        <p>FROM A GOOD IDEA<br />TO SOMETHING THAT MOVES.</p>
        <a className="footer__back" href="#home">BACK TO TOP <span>↑</span></a>
      </div>
      <div className="section-shell footer__bottom">
        <span>© {new Date().getFullYear()} ZERO ONE</span>
        <div className="footer__socials" aria-label="Social media">
          {socials.map(([label, href]) => <a key={label} href={href} target="_blank" rel="noreferrer" data-cursor="OPEN">{label} ↗</a>)}
        </div>
        <a href={whatsappUrl} target="_blank" rel="noreferrer">CAIRO, EGYPT <i>·</i> SAY HELLO</a>
      </div>
    </footer>
  )
}
