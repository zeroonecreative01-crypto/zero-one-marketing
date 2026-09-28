export default function About() {
  return (
    <section className="about section-pad about--immersive" id="about" aria-labelledby="about-title">
      <div className="about__ambient" aria-hidden="true"><span>0</span><i /></div>
      <div className="section-shell about__layout">
        <div className="about__index" data-reveal><span>04 / THE STUDIO</span><i>—</i><span>CAIRO, EGYPT</span></div>
        <div className="about__statement">
          <p className="eyebrow" data-reveal><span>ABOUT ZERO ONE</span></p>
          <h2 id="about-title" className="about__headline" data-word-reveal aria-label="We don't just make things look good.">
            <span className="about__line"><span data-word>WE DON'T</span><span data-word>JUST</span></span>
            <span className="about__line"><span data-word>MAKE THINGS</span></span>
            <span className="about__line about__line--muted"><span data-word>LOOK GOOD.</span></span>
          </h2>
          <div className="about__bottom">
            <p data-reveal>We combine strategy, creativity, technology and execution to turn ideas into brands people remember.</p>
            <p data-reveal>بنفكر في الصورة الكبيرة، ونشتغل على كل تفصيلة تخلي علامتك أوضح وأقرب لجمهورها.</p>
            <div className="about__seal" aria-hidden="true"><span>0</span><i>→</i><b>1</b></div>
          </div>
        </div>
      </div>
    </section>
  )
}
