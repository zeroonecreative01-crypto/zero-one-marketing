import { useRef, useState } from 'react'

export default function ZeroToOne() {
  const [active, setActive] = useState(false)
  const fieldRef = useRef(null)

  const move = (event) => {
    if (event.pointerType === 'touch' || !fieldRef.current) return
    const bounds = fieldRef.current.getBoundingClientRect()
    const x = (event.clientX - bounds.left) / bounds.width
    const y = (event.clientY - bounds.top) / bounds.height
    fieldRef.current.style.setProperty('--pointer-x', `${(x * 100).toFixed(1)}%`)
    fieldRef.current.style.setProperty('--pointer-y', `${(y * 100).toFixed(1)}%`)
    fieldRef.current.style.setProperty('--tilt-x', `${((y - 0.5) * -7).toFixed(2)}deg`)
    fieldRef.current.style.setProperty('--tilt-y', `${((x - 0.5) * 9).toFixed(2)}deg`)
  }
  const resetTilt = () => {
    fieldRef.current?.style.setProperty('--tilt-x', '0deg')
    fieldRef.current?.style.setProperty('--tilt-y', '0deg')
  }

  return (
    <section className="zero-one section-pad zero-one--immersive" aria-labelledby="zero-one-title">
      <div className="zero-one__ambient" aria-hidden="true" />
      <div className="section-shell zero-one__layout">
        <div className="zero-one__copy" data-reveal>
          <p className="eyebrow"><span>05</span> OUR SIGNATURE</p>
          <h2 id="zero-one-title" className="section-title">EVERYTHING<br />STARTS AT <em>ZERO.</em></h2>
          <p lang="ar" dir="rtl">الفكرة مش مجرد رقم. دي اللحظة اللي فيها كل الاحتمالات لسه مفتوحة — والاختيار الصح بيغيّر كل حاجة.</p>
          <span className="zero-one__instruction">MOVE YOUR CURSOR OR TAP THE MARK</span>
        </div>
        <button ref={fieldRef} className={`zero-one__field zero-one__field--immersive${active ? ' is-active' : ''}`} type="button" onPointerMove={move} onPointerLeave={resetTilt} onClick={() => setActive(!active)} aria-pressed={active} aria-label={active ? 'Return the Zero One mark to zero' : 'Transform zero into one'} data-cursor={active ? 'RESET' : 'MAKE 1'}>
          <span className="zero-one__starfield" aria-hidden="true" />
          <span className="zero-one__guide" aria-hidden="true" />
          <span className="zero-one__guide zero-one__guide--inner" aria-hidden="true" />
          <span className="zero-one__mark zero-one__mark--zero" aria-hidden="true">0</span>
          <span className="zero-one__mark zero-one__mark--one" aria-hidden="true">1</span>
          <span className="zero-one__mark-glow" aria-hidden="true" />
          <span className="zero-one__button-label"><span>{active ? '01 / RESET' : '0 / 1'}</span><i>↗</i></span>
        </button>
      </div>
    </section>
  )
}
