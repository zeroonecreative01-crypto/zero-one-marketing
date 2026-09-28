import { useEffect, useRef, useState } from 'react'

const links = [
  ['WORK', '#work'],
  ['SERVICES', '#services'],
  ['ABOUT', '#about'],
  ['0 → 1', '#zero-one'],
  ['CONTACT', '#contact'],
]

const notifications = [
  { label: 'WELCOME', text: 'أهلًا بك في Zero One', action: 'استكشف الموقع', href: '#home' },
  { label: 'SERVICES', text: 'نحوّل الفكرة إلى نظام تسويق متكامل', action: 'شوف خدماتنا', href: '#services' },
  { label: 'WORK', text: 'شوف كيف بنحوّل 0 إلى 1', action: 'استكشف أعمالنا', href: '#work' },
  { label: '0 → 1', text: 'من أول فكرة لحدّ الحضور اللي يتشاف', action: 'اعرف قصتنا', href: '#zero-one' },
  { label: 'START', text: 'عندك مشروع؟ خلّينا نبدأ', action: 'ابدأ مشروعك', href: '#contact' },
]

const sectionLabels = [
  ['home', 'ZERO ONE'],
  ['services', 'SERVICES'],
  ['work', 'WORK'],
  ['about', 'ABOUT'],
  ['zero-one', '0 → 1'],
  ['results', 'RESULTS'],
  ['contact', 'CONTACT'],
]

export default function Navigation({ whatsappUrl }) {
  const [open, setOpen] = useState(false)
  const [noticeIndex, setNoticeIndex] = useState(0)
  const [noticeVisible, setNoticeVisible] = useState(false)
  const [activeLabel, setActiveLabel] = useState('ZERO ONE')
  const [pulse, setPulse] = useState(false)
  const indexRef = useRef(0)
  const openRef = useRef(false)

  useEffect(() => { openRef.current = open }, [open])

  useEffect(() => {
    const observers = sectionLabels.map(([id, label]) => {
      const element = document.getElementById(id)
      if (!element) return null
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) setActiveLabel(label)
      }, { rootMargin: '-30% 0px -55% 0px', threshold: 0 })
      observer.observe(element)
      return observer
    }).filter(Boolean)
    return () => observers.forEach((observer) => observer.disconnect())
  }, [])

  useEffect(() => {
    let hideTimer
    let revealTimer
    let pulseTimer

    const reveal = (index) => {
      indexRef.current = index
      setNoticeVisible(false)
      setPulse(true)
      window.clearTimeout(revealTimer)
      window.clearTimeout(hideTimer)
      window.clearTimeout(pulseTimer)
      revealTimer = window.setTimeout(() => {
        setNoticeIndex(index)
        setNoticeVisible(true)
        hideTimer = window.setTimeout(() => setNoticeVisible(false), 3200)
      }, 180)
      pulseTimer = window.setTimeout(() => setPulse(false), 720)
    }

    reveal(0)
    const rotateTimer = window.setInterval(() => {
      if (!openRef.current) reveal((indexRef.current + 1) % notifications.length)
    }, 5200)

    return () => {
      window.clearTimeout(hideTimer)
      window.clearTimeout(revealTimer)
      window.clearTimeout(pulseTimer)
      window.clearInterval(rotateTimer)
    }
  }, [])

  const handleNavigate = (href) => {
    setOpen(false)
    setNoticeVisible(false)
    window.requestAnimationFrame(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }

  const notification = notifications[noticeIndex]

  return (
    <header className={`dynamic-island-header${open ? ' is-open' : ''}${noticeVisible ? ' is-notifying' : ''}${pulse ? ' is-pulsing' : ''}`}>
      <div className={`dynamic-island${open ? ' is-expanded' : ''}${noticeVisible ? ' is-notifying' : ''}`}>
        <div className="dynamic-island__bar">
          <button className="dynamic-island__brand" type="button" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} onClick={() => setOpen((value) => !value)}>
            <span className="dynamic-island__logo"><img src="/zero-one-logo.png" alt="" /></span>
            <span className="dynamic-island__name"><b>ZERO</b> <i>ONE</i></span>
          </button>

          <button className="dynamic-island__status" type="button" onClick={() => setNoticeVisible((value) => !value)} aria-label="Show Zero One message">
            <span className={`dynamic-island__dot${pulse ? ' is-pulsing' : ''}`} />
            <span>{activeLabel}</span>
          </button>

          <button className={`dynamic-island__menu${open ? ' is-open' : ''}`} type="button" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen((value) => !value)}>
            <span /><span />
          </button>
        </div>

        <div className={`dynamic-island__notice${noticeVisible ? ' is-visible' : ''}`} aria-live="polite">
          <span className="dynamic-island__notice-copy">
            <small>{notification.label}</small>
            <strong>{notification.text}</strong>
          </span>
          <button type="button" onClick={() => handleNavigate(notification.href)}>{notification.action}<span>↗</span></button>
        </div>

        <nav className={`dynamic-island__nav${open ? ' is-visible' : ''}`} aria-label="Main navigation">
          {links.map(([label, href], index) => (
            <button key={label} type="button" onClick={() => handleNavigate(href)}><span>0{index + 1}</span>{label}</button>
          ))}
          <a className="dynamic-island__cta" href={whatsappUrl} target="_blank" rel="noreferrer">START A PROJECT <span>↗</span></a>
        </nav>
      </div>
    </header>
  )
}
