import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ZeroScene from './components/ZeroScene.jsx'

gsap.registerPlugin(ScrollTrigger)

const whatsappUrl = 'https://wa.me/201556764804?text=' + encodeURIComponent('أهلًا Zero One، حابب أتكلم معاكم عن مشروع جديد.')

const services = [
  ['01', 'BRAND WORLDS', 'Strategy / Identity / Packaging'],
  ['02', 'CAMPAIGNS', 'Concept / Art Direction / Launch'],
  ['03', 'DIGITAL', 'Web / UX / Interaction / 3D'],
  ['04', 'MOTION', '3D / Film / Social / Titles'],
  ['05', 'GROWTH', 'Media / CRO / Analytics / Content'],
]

const projects = [
  { id: '01', type: 'IDENTITY', title: 'FORM / FUNCTION', image: '/zero-one-hero.webp', note: 'A sharper visual language built around structure, contrast and motion.' },
  { id: '02', type: 'DIGITAL', title: 'AFTER HOURS', image: '/zero-one-laptop.webp', note: 'A digital experience where the interface becomes part of the campaign.' },
  { id: '03', type: 'MOTION', title: 'STILL MOVING', image: '/zero-one-orbit.png', note: 'A visual system designed to move, loop and stay recognizable.' },
]

function Cursor() {
  const ref = useRef(null)
  const ring = useRef(null)
  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return undefined
    const move = (event) => {
      gsap.to(ref.current, { x: event.clientX, y: event.clientY, duration: .18, ease: 'power3.out' })
      gsap.to(ring.current, { x: event.clientX, y: event.clientY, duration: .42, ease: 'power3.out' })
      document.documentElement.style.setProperty('--mx', event.clientX + 'px')
      document.documentElement.style.setProperty('--my', event.clientY + 'px')
    }
    window.addEventListener('pointermove', move, { passive: true })
    return () => window.removeEventListener('pointermove', move)
  }, [])
  return <>
    <div className="award-cursor" ref={ref} />
    <div className="award-cursor-ring" ref={ring} />
  </>
}

function IslandNav() {
  const [open, setOpen] = useState(false)
  const [notice, setNotice] = useState(true)
  const [index, setIndex] = useState(0)
  const messages = [
    ['WELCOME', 'من أول فكرة... لحد أول أثر.'],
    ['SERVICES', 'مش بنبيع خدمة. بنبني نظام.'],
    ['WORK', 'شوف الـ work اللي بيتحرك معاك.'],
    ['ZERO → ONE', 'كل مشروع يبدأ من مساحة فاضية.'],
  ]
  useEffect(() => {
    const timer = window.setInterval(() => {
      setNotice(true)
      setIndex((value) => (value + 1) % messages.length)
      window.setTimeout(() => setNotice(false), 3000)
    }, 5200)
    return () => window.clearInterval(timer)
  }, [])
  const scrollTo = (selector) => {
    setOpen(false)
    setNotice(false)
    document.querySelector(selector)?.scrollIntoView({ behavior: 'smooth' })
  }
  return <div className={'award-island-wrap' + (open ? ' is-open' : '')}>
    <div className={'award-island' + (notice ? ' is-notice' : '') + (open ? ' is-menu' : '')}>
      <button className="award-island__brand" onClick={() => setOpen((value) => !value)} aria-label="Open menu">
        <img src="/zero-one-logo.png" alt="" /><span>ZERO ONE</span>
      </button>
      {!open && !notice && <span className="award-island__live"><i /> 0→1</span>}
      {!open && notice && <button className="award-island__message" onClick={() => setNotice(false)}><small>{messages[index][0]}</small><strong>{messages[index][1]}</strong></button>}
      {open && <div className="award-island__links">
        {['HOME|#home','SERVICES|#services','WORK|#work','ABOUT|#about','0 → 1|#zero-one','CONTACT|#contact'].map((entry) => {
          const parts = entry.split('|')
          return <button key={parts[0]} onClick={() => scrollTo(parts[1])}><small>↳</small>{parts[0]}</button>
        })}
        <a href={whatsappUrl} target="_blank" rel="noreferrer">START A PROJECT ↗</a>
      </div>}
      <button className={'award-island__toggle' + (open ? ' is-x' : '')} onClick={() => setOpen((value) => !value)} aria-label="Toggle menu"><span /><span /></button>
    </div>
  </div>
}

function Hero() {
  const ref = useRef(null)
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: 'power4.out' } })
        .from('.award-hero__eyebrow', { y: 20, opacity: 0, duration: .55 })
        .from('.award-hero__line span', { yPercent: 115, rotateX: -70, stagger: .08, duration: 1 }, '-=.2')
        .from('.award-hero__meta, .award-hero__cta-row', { y: 24, opacity: 0, stagger: .08, duration: .55 }, '-=.55')
      gsap.to('.award-hero__visual', { yPercent: -12, scale: 1.08, ease: 'none', scrollTrigger: { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: true } })
      gsap.to('.award-hero__orb', { rotation: 180, ease: 'none', scrollTrigger: { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: true } })
    }, ref)
    return () => ctx.revert()
  }, [])
  return <section className="award-hero" id="home" ref={ref}>
    <div className="award-hero__bg" /><div className="award-hero__grid" /><div className="award-hero__orb" />
    <div className="award-hero__visual"><ZeroScene /></div>
    <div className="award-hero__top"><span className="award-hero__eyebrow"><i /> INDEPENDENT CREATIVE COMPANY</span><span>CAIRO / DUBAI / EVERYWHERE</span></div>
    <div className="award-hero__content">
      <div className="award-hero__label">01 / THE TRANSFORMATION</div>
      <div className="award-hero__line"><span>FROM</span><span className="stroke">ZERO</span></div>
      <div className="award-hero__line"><span>TO</span><span className="orange">ONE<span>.</span></span></div>
      <div className="award-hero__meta"><p>We create brands, campaigns and digital experiences that are made to move.</p><p lang="ar" dir="rtl">بنحوّل الفكرة من مساحة فاضية لحضور الناس تفتكره.</p></div>
      <div className="award-hero__cta-row"><a className="award-btn" href={whatsappUrl} target="_blank" rel="noreferrer">START A PROJECT <span>↗</span></a><a className="award-link" href="#work">SCROLL TO EXPLORE <span>↓</span></a></div>
    </div>
    <div className="award-hero__footer"><span>ZERO ONE / 2026</span><span>SCROLL</span><b>0 → 1</b></div>
  </section>
}

function Manifesto() {
  const ref = useRef(null)
  useLayoutEffect(() => {
    const ctx = gsap.context(() => gsap.from('.manifesto__word', { yPercent: 120, opacity: 0, stagger: .08, duration: .85, ease: 'power4.out', scrollTrigger: { trigger: ref.current, start: 'top 68%', once: true } }), ref)
    return () => ctx.revert()
  }, [])
  return <section className="manifesto" id="about" ref={ref}><div className="manifesto__side">02 / POINT OF VIEW</div><div className="manifesto__words"><div><span className="manifesto__word">WE DON'T</span></div><div><span className="manifesto__word">MAKE</span> <span className="manifesto__word stroke">NOISE.</span></div><div><span className="manifesto__word">WE MAKE</span></div><div><span className="manifesto__word orange">MOVEMENT.</span></div></div><p className="manifesto__copy" lang="ar" dir="rtl">استراتيجية واضحة. صورة لها شخصية. وتجربة تخلي الناس توقف، تتفاعل، وتفتكر.</p></section>
}

function Services() {
  const [active, setActive] = useState(0)
  return <section className="award-services" id="services"><div className="award-shell"><div className="award-kicker">03 / WHAT WE MOVE</div><div className="award-services__head"><h2>ONE SYSTEM.<br /><em>MANY MOVES.</em></h2><p>كل خدمة عندنا جزء من صورة أكبر — عشان النتيجة ما تبقاش مجرد شغل حلو، تبقى شغل له اتجاه.</p></div><div className="award-services__grid"><div className="award-services__list">{services.map(([num,title,meta],i)=><button className={'award-service' + (active===i?' active':'')} key={num} onMouseEnter={()=>setActive(i)} onFocus={()=>setActive(i)} onClick={()=>setActive(i)}><small>{num}</small><strong>{title}</strong><span>{meta}</span><b>↗</b></button>)}</div><div className="award-services__visual"><span className="award-services__big">{services[active][0]} / 05</span><div className="award-services__core"><i />{active===0?'0':active===1?'∞':active===2?'01':active===3?'↻':'↗'}</div><p>{services[active][1]}</p><small>{services[active][2]}</small></div></div></div></section>
}

function Work() {
  const ref = useRef(null)
  useLayoutEffect(() => {
    const ctx = gsap.context(() => gsap.from('.work-card', { y: 70, opacity: 0, stagger: .12, duration: .8, ease: 'power4.out', scrollTrigger: { trigger: ref.current, start: 'top 70%', once: true } }), ref)
    return () => ctx.revert()
  }, [])
  return <section className="award-work" id="work" ref={ref}><div className="award-shell"><div className="award-kicker">04 / SELECTED WORK</div><div className="award-work__head"><h2>MAKE IT<br /><em>IMPOSSIBLE</em><br />TO IGNORE.</h2><p>Concept studies / visual experiments / selected directions.</p></div><div className="award-work__grid">{projects.map((project,i)=><article className={'work-card work-card--'+(i+1)} key={project.id}><div className="work-card__media"><img src={project.image} alt="" /><div className="work-card__veil" /><span>{project.id}</span><b>{project.type}</b></div><div className="work-card__info"><small>{project.type}</small><h3>{project.title}</h3><p>{project.note}</p><a href="#contact">EXPLORE <span>↗</span></a></div></article>)}</div></div></section>
}

function ZeroLab() {
  const [active,setActive]=useState(false)
  return <section className="zero-lab" id="zero-one"><div className="zero-lab__ring zero-lab__ring--1" /><div className="zero-lab__ring zero-lab__ring--2" /><div className="award-shell zero-lab__layout"><div><div className="award-kicker">05 / THE ZERO ONE LAB</div><h2>THE MOMENT<br />A <span>0</span><br />BECOMES <em>1.</em></h2><p lang="ar" dir="rtl">اضغط، حرّك، وخلّي العلامة تتغيّر قدامك.</p><span className="zero-lab__hint">CLICK THE MARK</span></div><button className={'zero-lab__stage'+(active?' is-active':'')} onClick={()=>setActive(value=>!value)} aria-pressed={active}><div className="zero-lab__particles" /><span className="zero-lab__zero">0</span><span className="zero-lab__one">1</span><i /><small>{active?'01 / TRANSFORMED':'00 / READY'}</small><b>{active?'RESET THE SYSTEM':'MAKE THE MOVE'} ↗</b></button></div></section>
}

function Contact() {
  return <section className="award-contact" id="contact"><div className="award-contact__glow" /><div className="award-shell"><div className="award-kicker">06 / THE NEXT MOVE</div><div className="award-contact__layout"><div><span className="award-contact__tiny">READY WHEN YOU ARE.</span><h2>FROM <i>0</i><br />TO <i>1?</i></h2><p lang="ar" dir="rtl">قولنا إيه اللي بتبنيه. وإحنا نبدأ معاك من أول خطوة.</p></div><a className="award-contact__cta" href={whatsappUrl} target="_blank" rel="noreferrer"><span>START<br />A PROJECT</span><b>↗</b></a></div><div className="award-contact__bottom"><span>ZERO ONE / CREATIVE COMPANY</span><span>CAIRO · DUBAI · EVERYWHERE</span></div></div></section>
}

function Footer() {
  return <footer className="award-footer"><div className="award-shell"><div className="award-footer__top"><img src="/zero-one-logo.png" alt="" /><span>ZERO <i>ONE</i></span><a href="#home">BACK TO TOP ↑</a></div><p>FROM ZERO TO SOMETHING THAT MOVES.</p><div className="award-footer__bottom"><span>© {new Date().getFullYear()} ZERO ONE</span><span>BUILT TO MOVE.</span></div></div></footer>
}

export default function App() {
  return <div className="award-site"><Cursor /><IslandNav /><main><Hero /><Manifesto /><Services /><Work /><ZeroLab /><section className="award-marquee" aria-hidden="true"><span>ZERO ONE — MAKE IT MOVE — ZERO ONE — MAKE IT MOVE — </span></section><Contact /></main><Footer /></div>
}