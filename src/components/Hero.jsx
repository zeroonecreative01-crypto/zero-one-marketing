import { Suspense, lazy, useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { setHeroProgress } from '../heroProgress.js'

const ZeroScene = lazy(() => import('./ZeroScene.jsx'))

gsap.registerPlugin(ScrollTrigger)

export default function Hero({ whatsappUrl }) {
  const sectionRef = useRef(null)
  const wordsRef = useRef(null)
  const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const [sceneEnabled, setSceneEnabled] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(min-width: 761px) and (prefers-reduced-motion: no-preference)')
    const update = () => setSceneEnabled(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  useLayoutEffect(() => {
    const section = sectionRef.current
    if (!section) return undefined
    const context = gsap.context(() => {
      const entrance = gsap.timeline({ defaults: { ease: 'power4.out' } })
      entrance.from('.hero__eyebrow', { y: 18, opacity: 0, duration: 0.65 })
        .from('.hero__title-word', { yPercent: 115, rotateX: -78, stagger: 0.12, duration: 0.9, transformOrigin: '50% 100%' }, '-=0.25')
        .from('.hero__meta, .hero__actions', { y: 22, opacity: 0, stagger: 0.12, duration: 0.65 }, '-=0.4')

      if (!reduced) {
        ScrollTrigger.create({
          trigger: section,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.8,
          onUpdate: (self) => {
            setHeroProgress(self.progress)
            section.style.setProperty('--hero-progress', self.progress.toFixed(4))
          },
        })
      }
    }, section)
    return () => { setHeroProgress(0); context.revert() }
  }, [reduced])

  return (
    <section ref={sectionRef} className="hero" id="home" aria-labelledby="hero-title">
      <div className="hero__stage">
        <div className="hero__grid" aria-hidden="true" />
        <div className="hero__halo" aria-hidden="true" />
        <div className="hero__scene">{sceneEnabled ? <Suspense fallback={<SceneFallback />}><ZeroScene /></Suspense> : <SceneFallback />}</div>
        <div className="hero__eyebrow"><span className="signal-dot" /> INDEPENDENT CREATIVE COMPANY <span>CAIRO · EVERYWHERE</span></div>
        <div className="hero__content">
          <div className="hero__title-wrap">
            <p className="hero__overline">WE TAKE BRANDS</p>
            <h1 id="hero-title" ref={wordsRef}>
              <span className="hero__line"><span className="hero__title-word">FROM</span><span className="hero__title-word hero__outline">ZERO</span></span>
              <span className="hero__line"><span className="hero__title-word">TO</span><span className="hero__title-word hero__lime">ONE<span className="hero__period">.</span></span></span>
            </h1>
          </div>
          <div className="hero__bottom">
            <p className="hero__meta">We build brands, campaigns and digital experiences that move businesses forward.<br /><b lang="ar" dir="rtl">بنحوّل الفكرة لاتجاه واضح، وحضور يسيب أثر.</b></p>
            <div className="hero__actions">
              <a className="button button--lime" href={whatsappUrl} target="_blank" rel="noreferrer" data-cursor="START">START A PROJECT <span>↗</span></a>
              <a className="hero__work-link" href="#work" data-cursor="VIEW">VIEW OUR WORK <span>↓</span></a>
            </div>
          </div>
        </div>
        <div className="hero__transform-copy" aria-hidden="true"><span>ZERO</span><b>ONE</b></div>
        <div className="hero__scroll-note"><span>SCROLL TO TRANSFORM</span><i /></div>
        <div className="hero__count"><span>01</span><i /> <span>04</span></div>
      </div>
    </section>
  )
}

function SceneFallback() {
  return <div className="scene-fallback" aria-hidden="true"><span>0</span><i /></div>
}
