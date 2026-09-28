import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import ZeroScene from './components/ZeroScene.jsx'
import { setHeroProgress } from './heroProgress.js'

gsap.registerPlugin(ScrollTrigger)

const whatsappUrl =
  'https://wa.me/201556764804?text=' +
  encodeURIComponent('أهلًا Zero One، حابب أبدأ مشروع جديد معاكم.')

const projects = [
  {
    id: '01',
    category: 'IDENTITY',
    title: 'FORM / FUNCTION',
    image: '/zero-one-hero.webp',
    kicker: 'Brand system / Identity / Art direction',
    intro: 'هوية اتبنت عشان تفضل واضحة حتى وهي بتتحرك.',
    description:
      'A visual identity direction built around structure, contrast and a modular grid. The system is designed to move from identity to campaign without losing recognition.',
    deliverables: ['Strategy', 'Identity', 'Art Direction', 'Packaging'],
  },
  {
    id: '02',
    category: 'DIGITAL',
    title: 'AFTER HOURS',
    image: '/zero-one-laptop.webp',
    kicker: 'Digital experience / UX / Interaction',
    intro: 'واجهة بتتعامل مع الحركة كجزء من الرسالة.',
    description:
      'A tactile digital direction where interface, typography and motion work as one system. The goal is an experience that feels closer to an interactive campaign than a static page.',
    deliverables: ['UX/UI', 'Web', 'Interaction', '3D'],
  },
  {
    id: '03',
    category: 'MOTION',
    title: 'STILL MOVING',
    image: '/zero-one-orbit.png',
    kicker: 'Motion system / 3D / Film',
    intro: 'لغة بصرية مصممة إنها تعيش في الـloop.',
    description:
      'A motion-first visual system built from simple forms, rhythm and repeatable transitions. It can flex across titles, social edits, launch films and digital surfaces.',
    deliverables: ['Motion', '3D', 'Film', 'Titles'],
  },
]

const services = [
  {
    no: '01',
    title: 'BRAND WORLDS',
    line: 'Strategy / Identity / Packaging',
    body: 'من positioning للـvisual system، بنبني العلامة كمنظومة كاملة.',
    symbol: '0',
  },
  {
    no: '02',
    title: 'CAMPAIGNS',
    line: 'Concept / Art Direction / Launch',
    body: 'فكرة قوية، direction واضح، وتنفيذ يقدر يتحول لحركة.',
    symbol: '∞',
  },
  {
    no: '03',
    title: 'DIGITAL',
    line: 'Web / UX / Interaction / 3D',
    body: 'تجارب رقمية محسوبة من أول الـscroll لحد آخر click.',
    symbol: '01',
  },
  {
    no: '04',
    title: 'MOTION',
    line: '3D / Film / Social / Titles',
    body: 'من frame ثابت لسيستم كامل بيتحرك ويحافظ على الهوية.',
    symbol: '↻',
  },
  {
    no: '05',
    title: 'GROWTH',
    line: 'Media / CRO / Analytics / Content',
    body: 'التصميم والـmarketing يشتغلوا في اتجاه واحد.',
    symbol: '↗',
  },
]

const sectors = [
  'RESTAURANTS',
  'CAFÉS',
  'REAL ESTATE',
  'CLINICS',
  'FASHION',
  'FACTORIES',
  'PERSONAL BRANDS',
  'CORPORATE',
]

const process = [
  ['01', 'FRAME', 'نفهم المشكلة، السوق، والجمهور قبل ما نرسم أول شكل.'],
  ['02', 'FORM', 'نحوّل الاستراتيجية لنظام بصري قابل للتوسع.'],
  ['03', 'MOVE', 'نضيف interaction, motion, 3D، ونخلي التجربة حية.'],
  ['04', 'LAUNCH', 'نسلّم نظام يقدر يعيش بعد الـlaunch، مش لقطة وتنتهي.'],
]

function useSmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      wheelMultiplier: 0.88,
      touchMultiplier: 1.1,
    })

    let rafId
    const raf = (time) => {
      lenis.raf(time)
      ScrollTrigger.update()
      rafId = requestAnimationFrame(raf)
    }

    rafId = requestAnimationFrame(raf)
    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [])
}

function useInteractivePolish() {
  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return undefined

    const tiltEls = Array.from(document.querySelectorAll('[data-tilt]'))
    const magnetEls = Array.from(document.querySelectorAll('[data-magnetic]'))

    const onTiltMove = (event) => {
      const node = event.currentTarget
      const rect = node.getBoundingClientRect()
      const px = (event.clientX - rect.left) / rect.width - 0.5
      const py = (event.clientY - rect.top) / rect.height - 0.5
      gsap.to(node, {
        rotateX: py * -5,
        rotateY: px * 5,
        transformPerspective: 900,
        duration: 0.45,
        ease: 'power3.out',
      })
    }

    const onTiltLeave = (event) => {
      gsap.to(event.currentTarget, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.7,
        ease: 'elastic.out(1, 5)',
      })
    }

    const onMagnetMove = (event) => {
      const node = event.currentTarget
      const rect = node.getBoundingClientRect()
      const x = event.clientX - (rect.left + rect.width / 2)
      const y = event.clientY - (rect.top + rect.height / 2)
      gsap.to(node, {
        x: x * 0.12,
        y: y * 0.12,
        duration: 0.4,
        ease: 'power3.out',
      })
    }

    const onMagnetLeave = (event) => {
      gsap.to(event.currentTarget, { x: 0, y: 0, duration: 0.65, ease: 'elastic.out(1, 4)' })
    }

    tiltEls.forEach((node) => {
      node.addEventListener('pointermove', onTiltMove)
      node.addEventListener('pointerleave', onTiltLeave)
    })
    magnetEls.forEach((node) => {
      node.addEventListener('pointermove', onMagnetMove)
      node.addEventListener('pointerleave', onMagnetLeave)
    })

    return () => {
      tiltEls.forEach((node) => {
        node.removeEventListener('pointermove', onTiltMove)
        node.removeEventListener('pointerleave', onTiltLeave)
      })
      magnetEls.forEach((node) => {
        node.removeEventListener('pointermove', onMagnetMove)
        node.removeEventListener('pointerleave', onMagnetLeave)
      })
    }
  }, [])
}

function Preloader() {
  const [complete, setComplete] = useState(false)

  useEffect(() => {
    const timer = window.setTimeout(() => setComplete(true), 1750)
    return () => window.clearTimeout(timer)
  }, [])

  return (
    <div className={'final-loader' + (complete ? ' is-complete' : '')} aria-hidden={complete}>
      <div className="final-loader__inner">
        <div className="final-loader__meta">
          <span>ZERO ONE / 2026</span>
          <span>CREATIVE SYSTEM ONLINE</span>
        </div>
        <div className="final-loader__word">ZERO <i>ONE</i></div>
        <div className="final-loader__line"><span /></div>
        <div className="final-loader__bottom">
          <span>0</span>
          <span>→</span>
          <span>1</span>
        </div>
      </div>
    </div>
  )
}

function Cursor() {
  const dot = useRef(null)
  const ring = useRef(null)
  const label = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return undefined

    const move = (event) => {
      gsap.to(dot.current, { x: event.clientX, y: event.clientY, duration: 0.15, ease: 'power3.out' })
      gsap.to(ring.current, { x: event.clientX, y: event.clientY, duration: 0.5, ease: 'power3.out' })
      document.documentElement.style.setProperty('--pointer-x', event.clientX + 'px')
      document.documentElement.style.setProperty('--pointer-y', event.clientY + 'px')
    }

    const enterInteractive = (event) => {
      label.current.textContent = event.currentTarget.dataset.cursor || 'VIEW'
      document.body.classList.add('cursor-active')
      gsap.to(ring.current, { width: 74, height: 74, margin: -37, duration: 0.4, ease: 'power3.out' })
      gsap.to(label.current, { opacity: 1, scale: 1, duration: 0.25, ease: 'power3.out' })
    }

    const leaveInteractive = () => {
      document.body.classList.remove('cursor-active')
      gsap.to(ring.current, { width: 34, height: 34, margin: -17, duration: 0.4, ease: 'power3.out' })
      gsap.to(label.current, { opacity: 0, scale: 0.7, duration: 0.2 })
    }

    window.addEventListener('pointermove', move, { passive: true })
    const interactive = document.querySelectorAll('a, button, [data-cursor]')
    interactive.forEach((node) => {
      node.addEventListener('pointerenter', enterInteractive)
      node.addEventListener('pointerleave', leaveInteractive)
    })

    return () => {
      window.removeEventListener('pointermove', move)
      interactive.forEach((node) => {
        node.removeEventListener('pointerenter', enterInteractive)
        node.removeEventListener('pointerleave', leaveInteractive)
      })
    }
  }, [])

  return (
    <>
      <div className="final-cursor" ref={dot} />
      <div className="final-cursor__ring" ref={ring}><span ref={label}>VIEW</span></div>
    </>
  )
}

function IslandNav() {
  const [open, setOpen] = useState(false)
  const [noticeIndex, setNoticeIndex] = useState(0)
  const notices = [
    ['WELCOME', 'من أول فكرة… لحد أول أثر.'],
    ['SERVICES', 'بنشتغل كنظام، مش كخدمات منفصلة.'],
    ['WORK', 'كل مشروع هنا بيتعامل كـexperience.'],
    ['ZERO → ONE', 'المكان اللي الفكرة بتتحول فيه لحاجة حقيقية.'],
  ]

  useEffect(() => {
    const interval = window.setInterval(() => {
      setNoticeIndex((value) => (value + 1) % notices.length)
    }, 5000)
    return () => window.clearInterval(interval)
  }, [notices.length])

  const go = (id) => {
    setOpen(false)
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header className={'final-island' + (open ? ' is-open' : '')}>
      <div className="final-island__base">
        <button className="final-island__brand" onClick={() => setOpen((value) => !value)} aria-label="Toggle menu">
          <img src="/zero-one-logo.png" alt="" />
        </button>

        {!open && (
          <button className="final-island__notice" onClick={() => setOpen(true)}>
            <small>{notices[noticeIndex][0]}</small>
            <strong dir="rtl">{notices[noticeIndex][1]}</strong>
          </button>
        )}

        <button
          className={'final-island__toggle' + (open ? ' is-x' : '')}
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          <span /><span />
        </button>
      </div>

      <div className="final-island__menu">
        <div className="final-island__links">
          {[
            ['HOME', '#home'],
            ['SERVICES', '#services'],
            ['WORK', '#work'],
            ['PROCESS', '#process'],
            ['0 → 1', '#lab'],
            ['CONTACT', '#contact'],
          ].map(([label, target]) => (
            <button key={target} onClick={() => go(target)}>
              <span>↳</span>{label}
            </button>
          ))}
        </div>
        <a href={whatsappUrl} target="_blank" rel="noreferrer">START A PROJECT <span>↗</span></a>
      </div>
    </header>
  )
}

function Hero() {
  const ref = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: 'power4.out' } })
        .from('.hero-final__top', { y: 20, opacity: 0, duration: 0.6 })
        .from('.hero-final__word span', { yPercent: 115, rotateX: -80, stagger: 0.07, duration: 1.1 }, '-=.25')
        .from('.hero-final__sub, .hero-final__actions', { y: 25, opacity: 0, stagger: 0.1, duration: 0.6 }, '-=.55')

      gsap.to('.hero-final__scene', {
        yPercent: -18,
        scale: 1.08,
        ease: 'none',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
          onUpdate: (self) => setHeroProgress(self.progress),
        },
      })

      gsap.to('.hero-final__orb', {
        rotate: 180,
        scale: 1.18,
        ease: 'none',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })

      gsap.to('.hero-final__sideword', {
        xPercent: -24,
        ease: 'none',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })
    }, ref)

    return () => ctx.revert()
  }, [])

  return (
    <section className="hero-final" id="home" ref={ref}>
      <div className="hero-final__noise" />
      <div className="hero-final__grid" />
      <div className="hero-final__orb" />
      <div className="hero-final__scene"><ZeroScene /></div>
      <div className="hero-final__sideword">ZERO ONE — ZERO ONE — ZERO ONE —</div>

      <div className="hero-final__top">
        <span><i /> INDEPENDENT CREATIVE COMPANY</span>
        <span>CAIRO / DUBAI / EVERYWHERE</span>
      </div>

      <div className="hero-final__body">
        <div className="hero-final__kicker">01 / TRANSFORMATION SYSTEM</div>
        <div className="hero-final__word">
          <div><span>FROM</span> <b>ZERO</b></div>
          <div><span>TO</span> <em>ONE.</em></div>
        </div>
        <div className="hero-final__sub">
          <p>We build brands, campaigns and digital experiences that are designed to move.</p>
          <p dir="rtl">بنحوّل الفكرة من مساحة فاضية لحضور الناس تفتكره.</p>
        </div>
        <div className="hero-final__actions">
          <a href={whatsappUrl} target="_blank" rel="noreferrer" data-magnetic data-cursor="START">
            START A PROJECT <b>↗</b>
          </a>
          <a href="#work">SCROLL TO EXPLORE <b>↓</b></a>
        </div>
      </div>

      <div className="hero-final__footer">
        <span>ZERO ONE / 2026</span>
        <span>SCROLL</span>
        <b>0 → 1</b>
      </div>
    </section>
  )
}

function Manifesto() {
  const ref = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.manifesto-final__line', {
        yPercent: 120,
        opacity: 0,
        stagger: 0.08,
        duration: 0.9,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 72%',
          once: true,
        },
      })
      gsap.from('.manifesto-final__copy', {
        y: 35,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 58%',
          once: true,
        },
      })
    }, ref)

    return () => ctx.revert()
  }, [])

  return (
    <section className="manifesto-final" id="about" ref={ref}>
      <div className="manifesto-final__label">02 / POINT OF VIEW</div>
      <div className="manifesto-final__statement">
        <div className="manifesto-final__mask"><span className="manifesto-final__line">WE DON'T</span></div>
        <div className="manifesto-final__mask"><span className="manifesto-final__line">MAKE <i>NOISE.</i></span></div>
        <div className="manifesto-final__mask"><span className="manifesto-final__line">WE MAKE</span></div>
        <div className="manifesto-final__mask"><span className="manifesto-final__line orange">MOVEMENT.</span></div>
      </div>
      <p className="manifesto-final__copy" dir="rtl">
        استراتيجية واضحة. صورة لها شخصية. وتجربة تخلي الناس توقف، تتفاعل، وتفتكر.
      </p>
    </section>
  )
}

function Services() {
  const [active, setActive] = useState(0)
  const service = services[active]

  return (
    <section className="services-final" id="services">
      <div className="final-shell">
        <div className="section-label">03 / WHAT WE MOVE</div>
        <div className="services-final__heading">
          <h2>ONE SYSTEM.<br /><i>MANY MOVES.</i></h2>
          <p dir="rtl">
            كل خدمة جزء من صورة أكبر. النتيجة مش مجرد شغل حلو؛ النتيجة شغل له اتجاه.
          </p>
        </div>

        <div className="services-final__layout">
          <div className="services-final__list">
            {services.map((item, index) => (
              <button
                key={item.no}
                className={'service-final' + (index === active ? ' is-active' : '')}
                onMouseEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
                onClick={() => setActive(index)}
                data-cursor="SELECT"
              >
                <small>{item.no}</small>
                <strong>{item.title}</strong>
                <span>{item.line}</span>
                <b>↗</b>
              </button>
            ))}
          </div>

          <div className="services-final__visual" data-tilt data-cursor="EXPLORE">
            <div className="services-final__visual-grid" />
            <span className="services-final__visual-index">{service.no} / 05</span>
            <div className="services-final__symbol">{service.symbol}</div>
            <div className="services-final__copy">
              <strong>{service.title}</strong>
              <p>{service.body}</p>
            </div>
            <span className="services-final__corner">ZERO ONE SYSTEM</span>
          </div>
        </div>
      </div>
    </section>
  )
}

function Sectors() {
  return (
    <section className="sectors-final" aria-label="Industries">
      <div className="sectors-final__head">
        <span>BUILT FOR DIFFERENT WORLDS</span>
        <span>01—08</span>
      </div>
      <div className="sectors-final__track">
        {[...sectors, ...sectors].map((sector, index) => (
          <span key={sector + index}>{sector}<i>·</i></span>
        ))}
      </div>
    </section>
  )
}

function Work() {
  const ref = useRef(null)
  const [selected, setSelected] = useState(null)
  const active = selected === null ? projects[0] : projects[selected]

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.work-final__title span', {
        yPercent: 100,
        opacity: 0,
        stagger: 0.07,
        duration: 0.8,
        ease: 'power4.out',
        scrollTrigger: { trigger: ref.current, start: 'top 68%', once: true },
      })
      gsap.from('.work-card-final', {
        y: 80,
        opacity: 0,
        stagger: 0.12,
        duration: 0.9,
        ease: 'power4.out',
        scrollTrigger: { trigger: '.work-final__grid', start: 'top 78%', once: true },
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    document.body.classList.toggle('case-open', selected !== null)
    return () => document.body.classList.remove('case-open')
  }, [selected])

  const show = (direction) => {
    setSelected((current) => {
      const index = current === null ? 0 : current
      return (index + direction + projects.length) % projects.length
    })
  }

  return (
    <section className="work-final" id="work" ref={ref}>
      <div className="final-shell">
        <div className="section-label">04 / SELECTED WORK</div>

        <div className="work-final__title">
          <div><span>MAKE IT</span></div>
          <div><span className="orange">IMPOSSIBLE</span></div>
          <div><span>TO IGNORE.</span></div>
        </div>

        <div className="work-final__intro">
          <p>Concept studies, identity directions and digital experiences built around movement.</p>
          <span>CLICK A PROJECT TO ENTER</span>
        </div>

        <div className="work-final__grid">
          {projects.map((project, index) => (
            <button
              className={'work-card-final work-card-final--' + (index + 1)}
              key={project.id}
              onClick={() => setSelected(index)}
              data-cursor="OPEN"
              data-tilt
            >
              <div className="work-card-final__media">
                <img src={project.image} alt="" />
                <div className="work-card-final__shade" />
                <div className="work-card-final__scan" />
                <span>{project.id}</span>
                <b>{project.category}</b>
                <i>OPEN ↗</i>
              </div>
              <div className="work-card-final__info">
                <small>{project.kicker}</small>
                <h3>{project.title}</h3>
                <p>{project.intro}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {selected !== null && (
        <div className="case-modal" role="dialog" aria-modal="true" aria-label={active.title}>
          <button className="case-modal__backdrop" onClick={() => setSelected(null)} aria-label="Close case study" />
          <div className="case-modal__frame">
            <div className="case-modal__top">
              <span>{active.id} / {active.category} / ZERO ONE</span>
              <button className="case-modal__close" onClick={() => setSelected(null)} aria-label="Close case study">
                <span /><span />
              </button>
            </div>

            <div className="case-modal__main">
              <div className="case-modal__media">
                <img src={active.image} alt={active.title} />
                <div className="case-modal__media-overlay" />
                <span className="case-modal__media-note">{active.kicker}</span>
                <strong>0 → 1</strong>
              </div>

              <div className="case-modal__content">
                <small>{active.category} / ZERO ONE</small>
                <h2>{active.title}</h2>
                <p className="case-modal__intro">{active.intro}</p>
                <p className="case-modal__body">{active.description}</p>

                <div className="case-modal__deliverables">
                  {active.deliverables.map((item) => <span key={item}>{item}</span>)}
                </div>

                <div className="case-modal__footer">
                  <button onClick={() => show(-1)}>← PREV</button>
                  <button onClick={() => show(1)}>NEXT →</button>
                  <a href="#contact" onClick={() => setSelected(null)} data-magnetic>START A PROJECT ↗</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

function Process() {
  const ref = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.process-final__step', {
        x: 60,
        opacity: 0,
        stagger: 0.13,
        duration: 0.8,
        ease: 'power4.out',
        scrollTrigger: { trigger: ref.current, start: 'top 72%', once: true },
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section className="process-final" id="process" ref={ref}>
      <div className="final-shell">
        <div className="section-label">05 / HOW WE WORK</div>
        <div className="process-final__heading">
          <h2>IDEA IN.<br /><i>IMPACT OUT.</i></h2>
          <p dir="rtl">بنشتغل بمراحل واضحة، بس كل مرحلة فيها مساحة كفاية للتجريب.</p>
        </div>

        <div className="process-final__list">
          {process.map(([no, title, body]) => (
            <div className="process-final__step" key={no}>
              <span>{no}</span>
              <strong>{title}</strong>
              <p dir="rtl">{body}</p>
              <i>↗</i>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Lab() {
  const [active, setActive] = useState(false)
  const [move, setMove] = useState(0)

  const mark = useMemo(
    () => ({
      label: active ? '01' : '00',
      caption: active ? 'SYSTEM TRANSFORMED' : 'SYSTEM READY',
    }),
    [active],
  )

  useEffect(() => {
    const onMove = (event) => {
      const x = (event.clientX / window.innerWidth - 0.5) * 2
      const y = (event.clientY / window.innerHeight - 0.5) * 2
      setMove({ x, y })
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  return (
    <section className="lab-final" id="lab">
      <div className="lab-final__rings" />
      <div className="lab-final__glow" />

      <div className="final-shell lab-final__layout">
        <div className="lab-final__copy">
          <div className="section-label">06 / THE ZERO ONE LAB</div>
          <h2>THE MOMENT<br />A <span>0</span><br />BECOMES <i>1.</i></h2>
          <p dir="rtl">اضغط على العلامة وشوف الفكرة وهي بتتحرك من حالة لحالة.</p>
        </div>

        <button
          className={'lab-final__stage' + (active ? ' is-active' : '')}
          onClick={() => setActive((value) => !value)}
          style={{ '--lx': move.x + 'px', '--ly': move.y + 'px' }}
          aria-pressed={active}
          data-cursor="TRANSFORM"
        >
          <div className="lab-final__grid" />
          <div className="lab-final__particle p1" />
          <div className="lab-final__particle p2" />
          <div className="lab-final__particle p3" />
          <span className="lab-final__zero">0</span>
          <span className="lab-final__one">1</span>
          <div className="lab-final__core"><i /></div>
          <small>{mark.caption}</small>
          <b>{active ? 'RESET THE SYSTEM' : 'MAKE THE MOVE'} ↗</b>
        </button>
      </div>
    </section>
  )
}

function Contact() {
  const [hover, setHover] = useState(false)

  return (
    <section className={'contact-final' + (hover ? ' is-hover' : '')} id="contact">
      <div className="contact-final__orb" />
      <div className="contact-final__grain" />

      <div className="final-shell">
        <div className="section-label">07 / THE NEXT MOVE</div>

        <div className="contact-final__layout">
          <div>
            <span>READY WHEN YOU ARE.</span>
            <h2>FROM <i>0</i><br />TO <i>1?</i></h2>
            <p dir="rtl">قولنا إيه اللي بتبنيه. وإحنا نبدأ معاك من أول خطوة.</p>
          </div>

          <a
            className="contact-final__cta"
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            data-magnetic
            data-cursor="GO"
            onPointerEnter={() => setHover(true)}
            onPointerLeave={() => setHover(false)}
          >
            <span>START<br />A PROJECT</span>
            <b>↗</b>
          </a>
        </div>

        <div className="contact-final__bottom">
          <span>ZERO ONE / CREATIVE COMPANY</span>
          <span>CAIRO · DUBAI · EVERYWHERE</span>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer-final">
      <div className="final-shell">
        <div className="footer-final__top">
          <a href="#home" className="footer-final__brand">
            <img src="/zero-one-logo.png" alt="" />
            <span>ZERO <i>ONE</i></span>
          </a>
          <a href="#home">BACK TO TOP ↑</a>
        </div>
        <div className="footer-final__massive">ZERO ONE</div>
        <div className="footer-final__bottom">
          <span>© {new Date().getFullYear()} ZERO ONE</span>
          <span>BUILT TO MOVE.</span>
        </div>
      </div>
    </footer>
  )
}

function App() {
  useSmoothScroll()
  useInteractivePolish()

  return (
    <div className="final-site">
      <Preloader />
      <Cursor />
      <IslandNav />
      <main>
        <Hero />
        <Manifesto />
        <Services />
        <Sectors />
        <Work />
        <Process />
        <Lab />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
