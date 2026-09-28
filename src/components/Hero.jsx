import { Suspense, lazy, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { setHeroProgress } from '../heroProgress.js'

const ZeroScene = lazy(() => import('./ZeroScene.jsx'))
gsap.registerPlugin(ScrollTrigger)

export default function Hero({ whatsappUrl }) {
  const sectionRef = useRef(null)
  const [sceneEnabled, setSceneEnabled] = useState(false)

  useLayoutEffect(() => {
    const section = sectionRef.current
    if (!section) return undefined
    const media = window.matchMedia('(min-width: 700px) and (prefers-reduced-motion: no-preference)')
    const update = () => setSceneEnabled(media.matches)
    update()
    media.addEventListener('change', update)
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const context = gsap.context(() => {
      if (!reduced) {
        const intro = gsap.timeline({ defaults: { ease: 'power4.out' } })
        intro.from('.hero__eyebrow', { y: 26, opacity: 0, duration: .65 })
          .from('.hero__overline', { y: 25, opacity: 0, duration: .45 }, '-=.3')
          .from('.hero__title-word', { yPercent: 130, rotateX: -72, stagger: .09, duration: 1.05 }, '-=.2')
          .from('.hero__meta, .hero__actions, .hero__micro, .hero__kicker-row', { y: 22, opacity: 0, stagger: .07, duration: .6 }, '-=.6')

        ScrollTrigger.create({
          trigger: section, start: 'top top', end: 'bottom bottom', scrub: .8,
          onUpdate: ({ progress }) => {
            setHeroProgress(progress)
            section.style.setProperty('--hero-progress', progress.toFixed(4))
          },
        })
        gsap.to('.hero__scene-shell', {
          scale: 1.35, rotate: 10, xPercent: 8, ease: 'none',
          scrollTrigger: { trigger: section, start: 'top top', end: 'bottom top', scrub: true },
        })
        gsap.to('.hero__hero-copy', { yPercent: -16, ease: 'none', scrollTrigger: { trigger: section, start: 'top top', end: 'bottom top', scrub: true } })
        gsap.to('.hero__orbit', { rotation: 180, ease: 'none', scrollTrigger: { trigger: section, start: 'top top', end: 'bottom top', scrub: true } })
      }
    }, section)
    return () => {
      media.removeEventListener('change', update)
      setHeroProgress(0)
      context.revert()
    }
  }, [])

  return (
    <section ref={sectionRef} className="hero hero--experience" id="home" aria-labelledby="hero-title">
      <div className="hero__stage">
        <div className="hero__grid" aria-hidden="true" />
        <div className="hero__mesh" aria-hidden="true" />
        <div className="hero__halo hero__halo--main" aria-hidden="true" />
        <div className="hero__halo hero__halo--secondary" aria-hidden="true" />
        <div className="hero__orbit" aria-hidden="true"><span>ZERO</span><i /></div>
        <div className="hero__scene-shell"><div className="hero__scene">{sceneEnabled ? <Suspense fallback={<SceneFallback />}><ZeroScene /></Suspense> : <SceneFallback />}</div></div>
        <div className="hero__scanline" aria-hidden="true" />
        <div className="hero__eyebrow"><span className="signal-dot" /> ZERO ONE / INDEPENDENT CREATIVE COMPANY <span>CAIRO · EVERYWHERE</span></div>

        <div className="hero__hero-copy">
          <div className="hero__kicker-row"><span>EST. 01</span><i /><span>THE TRANSFORMATION</span></div>
          <p className="hero__overline">WE TAKE BRANDS</p>
          <h1 id="hero-title">
            <span className="hero__line"><span className="hero__title-word">FROM</span><span className="hero__title-word hero__outline">ZERO</span></span>
            <span className="hero__line"><span className="hero__title-word">TO</span><span className="hero__title-word hero__accent">ONE<span className="hero__period">.</span></span></span>
          </h1>
          <div className="hero__bottom">
            <p className="hero__meta">Strategy, identity, campaigns, digital and motion — one connected system built to move businesses forward.<br /><b lang="ar" dir="rtl">من الفكرة الأولى للحضور اللي الناس تفتكره.</b></p>
            <div className="hero__actions">
              <a className="button button--accent" href={whatsappUrl} target="_blank" rel="noreferrer" data-cursor="START">START A PROJECT <span>↗</span></a>
              <a className="hero__work-link" href="#work" data-cursor="VIEW">DISCOVER THE WORK <span>↓</span></a>
            </div>
          </div>
        </div>

        <div className="hero__micro hero__micro--left"><span>01</span><span>CREATE / MOVE / ARRIVE</span></div>
        <div className="hero__micro hero__micro--right"><span>SCROLL TO TRANSFORM</span><i /><span>0 → 1</span></div>
      </div>
    </section>
  )
}

function SceneFallback() {
  return <div className="scene-fallback scene-fallback--cinematic" aria-hidden="true"><span>0</span><i /><b>1</b><em /></div>
}