import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function CustomCursor() {
  const cursorRef = useRef(null)
  const labelRef = useRef(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const label = labelRef.current
    if (!cursor || window.matchMedia('(pointer: coarse)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    document.documentElement.classList.add('has-custom-cursor')
    const xTo = gsap.quickTo(cursor, 'x', { duration: 0.22, ease: 'power3' })
    const yTo = gsap.quickTo(cursor, 'y', { duration: 0.22, ease: 'power3' })
    const move = (event) => { xTo(event.clientX); yTo(event.clientY) }
    const over = (event) => {
      const target = event.target.closest('[data-cursor]')
      if (!target) return
      cursor.classList.add('is-active')
      label.textContent = target.dataset.cursor
    }
    const out = (event) => {
      const target = event.target.closest('[data-cursor]')
      if (target && !target.contains(event.relatedTarget)) cursor.classList.remove('is-active')
    }

    window.addEventListener('pointermove', move, { passive: true })
    document.addEventListener('pointerover', over)
    document.addEventListener('pointerout', out)
    return () => {
      document.documentElement.classList.remove('has-custom-cursor')
      window.removeEventListener('pointermove', move)
      document.removeEventListener('pointerover', over)
      document.removeEventListener('pointerout', out)
      xTo.tween.kill()
      yTo.tween.kill()
    }
  }, [])

  return <div className="custom-cursor" ref={cursorRef} aria-hidden="true"><span ref={labelRef} /></div>
}
