import { useState } from 'react'

const services = [
  ['01', 'BRANDING', 'نبني هوية بتعبّر عنك وتفضل واضحة في كل نقطة تواصل.', 'Strategy · Naming · Identity · Guidelines'],
  ['02', 'SOCIAL MEDIA', 'حضور يومي متماسك يحوّل المتابعة لعلاقة.', 'Content · Art Direction · Community · Reporting'],
  ['03', 'CAMPAIGNS', 'أفكار حملات لها هدف وصوت وشكل مايتنسيش.', 'Concept · Creative Direction · Launch · Adaptations'],
  ['04', 'MOTION & VIDEO', 'صورة متحركة تشد الانتباه وتوصل الفكرة بسرعة.', 'Motion Design · Editing · Reels · Commercials'],
  ['05', 'WEB DESIGN', 'تجارب رقمية سريعة، واضحة، ومتوافقة مع هويتك.', 'UX · UI · Landing Pages · Creative Development'],
  ['06', 'PERFORMANCE', 'قرارات تسويق مبنية على قياس وتطوير مستمر.', 'Media Buying · Tracking · CRO · ROAS / CPA'],
  ['07', 'CONTENT', 'محتوى يشرح القيمة ويخلق سببًا حقيقيًا للاهتمام.', 'Strategy · Copy · Visual Systems · Editorial'],
  ['08', 'AI CREATIVE', 'أدوات ذكية توسّع مساحة التجريب والإنتاج.', 'AI Workflow · Ideation · Prototyping · Production'],
]

export default function Services({ whatsappUrl }) {
  const [active, setActive] = useState(0)
  const activeService = services[active]

  return (
    <section className="services section-pad" id="services" aria-labelledby="services-title">
      <div className="section-shell">
        <div className="section-intro" data-reveal>
          <p className="eyebrow"><span>02</span> WHAT WE DO</p>
          <h2 id="services-title" className="section-title">ONE IDEA.<br /><em>MANY WAYS</em><br />TO MOVE.</h2>
          <p className="section-intro__copy">استراتيجية، إبداع، وتنفيذ — فريق واحد يربط كل خطوة باللي بعدها.</p>
        </div>
        <div className="services-layout">
          <div className="service-list" aria-label="ZERO ONE services">
            {services.map(([number, title, description, deliverables], index) => (
              <button
                className={`service-row${active === index ? ' is-active' : ''}`}
                type="button"
                key={number}
                onMouseEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
                onClick={() => setActive(index)}
                aria-pressed={active === index}
                data-cursor="EXPLORE"
              >
                <span className="service-row__num">{number}</span>
                <span className="service-row__title">{title}</span>
                <span className="service-row__description">{description}</span>
                <span className="service-row__arrow">↗</span>
              </button>
            ))}
          </div>
          <div className={`service-visual service-visual--${active + 1}`} aria-label={`${activeService[1]} service: ${activeService[3]}`}>
            <div className="service-visual__orbit service-visual__orbit--one" />
            <div className="service-visual__orbit service-visual__orbit--two" />
            <div className="service-visual__object"><span>0</span><i /></div>
            <div className="service-visual__caption"><span>{activeService[3]}</span><b>{activeService[1]}</b></div>
            <span className="service-visual__index">{activeService[0]}</span>
          </div>
        </div>
        <div className="services-footer"><span>THE RIGHT FIRST STEP CHANGES EVERYTHING.</span><a href={whatsappUrl} target="_blank" rel="noreferrer" data-cursor="OPEN">LET'S FIND YOURS <b>↗</b></a></div>
      </div>
    </section>
  )
}
