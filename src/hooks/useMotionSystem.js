import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

export default function useMotionSystem() {
  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let lenis
    let tick

    if (!reducedMotion) {
      lenis = new Lenis({
        lerp: 0.085,
        wheelMultiplier: 0.88,
        smoothWheel: true,
        syncTouch: false,
      })
      lenis.on('scroll', ScrollTrigger.update)
      tick = (time) => lenis.raf(time * 1000)
      gsap.ticker.add(tick)
      gsap.ticker.lagSmoothing(0)
    }

    const context = gsap.context(() => {
      gsap.utils.toArray('[data-reveal]').forEach((element, index) => {
        gsap.fromTo(element,
          { y: 34, clipPath: 'inset(10% 0 0 0)', rotateX: 5 },
          {
            y: 0,
            clipPath: 'inset(0% 0 0 0)',
            rotateX: 0,
            duration: 0.9,
            delay: Math.min(index % 3, 2) * 0.06,
            ease: 'power3.out',
            scrollTrigger: { trigger: element, start: 'top 86%', once: true },
          },
        )
      })

      gsap.utils.toArray('[data-word-reveal]').forEach((group) => {
        const words = group.querySelectorAll('[data-word]')
        if (!words.length) return
        gsap.fromTo(words,
          { yPercent: 115, rotateX: -75, transformOrigin: '50% 100%' },
          {
            yPercent: 0,
            rotateX: 0,
            duration: 0.82,
            stagger: 0.075,
            ease: 'power4.out',
            scrollTrigger: { trigger: group, start: 'top 82%', once: true },
          },
        )
      })
    })

    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh, { once: true })
    const fontReady = document.fonts?.ready
    fontReady?.then(refresh)

    return () => {
      window.removeEventListener('load', refresh)
      context.revert()
      if (tick) gsap.ticker.remove(tick)
      lenis?.destroy()
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])
}
