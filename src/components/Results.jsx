const measures = [
  ['01', 'CLARITY', 'Positioning, offer and message'],
  ['02', 'ATTENTION', 'Reach, engagement and creative response'],
  ['03', 'ACTION', 'Leads, enquiries and conversion'],
  ['04', 'EFFICIENCY', 'CPA, ROAS and channel performance'],
]

export default function Results() {
  return (
    <section className="results section-pad results--immersive" id="results" aria-labelledby="results-title">
      <div className="results__grid" aria-hidden="true" />
      <div className="results__scan" aria-hidden="true" />
      <div className="section-shell results__inner">
        <p className="eyebrow" data-reveal><span>06</span> MEASUREMENT</p>
        <div className="results__intro">
          <div>
            <h2 id="results-title" className="results__headline results__headline--immersive" data-word-reveal>
              <span className="results__line"><span data-word>CREATIVE</span></span>
              <span className="results__line results__line--muted"><span data-word>SHOULD MOVE</span></span>
              <span className="results__line results__line--accent"><span data-word>THE BUSINESS.</span></span>
            </h2>
          </div>
          <p className="results__copy" data-reveal>
            We do not invent performance numbers to make a case study look better. Every engagement starts with a measurable objective and a baseline, then tracks the indicators that actually matter.
          </p>
        </div>
        <div className="results__measures" aria-label="What ZERO ONE measures">
          {measures.map(([number, title, description]) => (
            <article className="results__measure results__measure--immersive" key={number} data-reveal>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
        <div className="results__footer"><p>STRATEGY / CREATIVITY / EXECUTION / GROWTH</p><span aria-hidden="true">0<i>→</i>1</span></div>
      </div>
    </section>
  )
}
