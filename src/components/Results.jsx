export default function Results() {
  return (
    <section className="results section-pad" aria-labelledby="results-title">
      <div className="results__grid" aria-hidden="true" />
      <div className="section-shell results__inner">
        <p className="eyebrow" data-reveal><span>06</span> THINKING FORWARD</p>
        <h2 id="results-title" className="results__headline" data-word-reveal>
          <span className="results__line"><span data-word>IDEAS</span></span>
          <span className="results__line"><span data-word>ARE</span></span>
          <span className="results__line results__line--muted"><span data-word>NOT ENOUGH.</span></span>
          <span className="results__line results__line--lime"><span data-word>WE TURN THEM</span></span>
          <span className="results__line results__line--lime"><span data-word>INTO RESULTS.</span></span>
        </h2>
        <div className="results__footer"><p>STRATEGY / CREATIVITY / EXECUTION / GROWTH</p><span aria-hidden="true">0<i>→</i>1</span></div>
      </div>
    </section>
  )
}
