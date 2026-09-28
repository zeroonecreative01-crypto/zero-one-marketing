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
        <a href={whatsappUrl} target="_blank" rel="noreferrer">CAIRO, EGYPT <i>·</i> SAY HELLO</a>
      </div>
    </footer>
  )
}
