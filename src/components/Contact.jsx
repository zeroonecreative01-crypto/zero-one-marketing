export default function Contact({ whatsappUrl }) {
  return (
    <section className="contact section-pad" id="contact" aria-labelledby="contact-title">
      <div className="section-shell contact__panel" data-reveal>
        <div className="contact__texture" aria-hidden="true" />
        <div className="contact__copy">
          <p className="eyebrow"><span>07</span> THE NEXT MOVE</p>
          <h2 id="contact-title">READY TO MOVE<br />FROM <em>0 TO 1?</em></h2>
          <p>Tell us what you're building. We'll help you find the clearest first move.</p>
          <a className="button button--accent contact__button" href={whatsappUrl} target="_blank" rel="noreferrer" data-cursor="LET'S TALK">START A PROJECT <span>↗</span></a>
        </div>
        <div className="contact__object" aria-hidden="true"><div className="contact__ring"><i /><b>01</b></div><span>MAKE THE<br />FIRST MOVE</span></div>
        <span className="contact__side-note">ZERO IS A PLACE TO BEGIN.</span>
      </div>
    </section>
  )
}
