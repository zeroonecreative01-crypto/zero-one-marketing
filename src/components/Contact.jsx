export default function Contact({ whatsappUrl }) {
  return (
    <section className="contact section-pad contact--immersive" id="contact" aria-labelledby="contact-title">
      <div className="contact__atmosphere" aria-hidden="true"><i /><b>01</b></div>
      <div className="section-shell contact__panel contact__panel--immersive" data-reveal>
        <div className="contact__texture" aria-hidden="true" />
        <div className="contact__copy">
          <p className="eyebrow"><span>07</span> THE NEXT MOVE</p>
          <div className="contact__pretitle">READY WHEN YOU ARE.</div>
          <h2 id="contact-title">FROM <em>0</em><br />TO <em>1?</em></h2>
          <p>Tell us what you're building. We'll help you find the clearest first move.</p>
          <a className="button button--accent contact__button" href={whatsappUrl} target="_blank" rel="noreferrer" data-cursor="LET'S TALK">START A PROJECT <span>↗</span></a>
        </div>
        <div className="contact__object" aria-hidden="true"><div className="contact__ring contact__ring--immersive"><i /><b>01</b></div><span>MAKE THE<br />FIRST MOVE</span></div>
        <span className="contact__side-note">ZERO IS A PLACE TO BEGIN.</span>
      </div>
    </section>
  )
}
