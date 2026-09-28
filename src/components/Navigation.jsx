import { useEffect, useState } from 'react'

const links = [
  ['WORK', '#work'],
  ['SERVICES', '#services'],
  ['ABOUT', '#about'],
  ['CONTACT', '#contact'],
]

const notifications = [
  { label: 'WELCOME', text: 'أهلًا بك في Zero One', action: 'استكشف الموقع' },
  { label: 'SERVICES', text: 'حلول تسويق تبدأ من 0 وتصل إلى 1', action: 'شوف خدماتنا' },
  { label: 'WORK', text: 'جاهز تشوف شغلنا؟', action: 'استكشف أعمالنا' },
  { label: 'START', text: 'عندك مشروع؟ خلّينا نبدأ', action: 'ابدأ مشروعك' },
]

export default function Navigation({ whatsappUrl }) {
  const [open, setOpen] = useState(false)
  const [noticeIndex, setNoticeIndex] = useState(0)
  const [noticeVisible, setNoticeVisible] = useState(true)

  useEffect(() => {
    let hideTimer
    let rotateTimer

    const showNext = () => {
      setNoticeVisible(false)
      window.setTimeout(() => {
        setNoticeIndex((index) => (index + 1) % notifications.length)
        setNoticeVisible(true)
        hideTimer = window.setTimeout(() => setNoticeVisible(false), 3600)
      }, 300)
    }

    hideTimer = window.setTimeout(() => setNoticeVisible(false), 4200)
    rotateTimer = window.setInterval(showNext, 5000)

    return () => {
      window.clearTimeout(hideTimer)
      window.clearInterval(rotateTimer)
    }
  }, [])

  const notification = notifications[noticeIndex]

  const handleNavigate = (href) => {
    setOpen(false)
    setNoticeVisible(false)
    window.requestAnimationFrame(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }

  return (
    <header className={`dynamic-island-header${open ? ' is-open' : ''}`}>
      <div className={`dynamic-island${open ? ' is-expanded' : ''}`}>
        <div className="dynamic-island__bar">
          <button
            className="dynamic-island__brand"
            type="button"
            aria-label={open ? 'Close navigation' : 'Open navigation'}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            <span className="dynamic-island__logo"><img src="/zero-one-logo.png" alt="" /></span>
            <span className="dynamic-island__name"><b>ZERO</b> <i>ONE</i></span>
          </button>

          <button className="dynamic-island__status" type="button" onClick={() => setOpen((value) => !value)} aria-label="Open Zero One menu">
            <span className={`dynamic-island__dot${noticeVisible ? ' is-pulsing' : ''}`} />
            <span>ZERO ONE</span>
          </button>

          <button
            className={`dynamic-island__menu${open ? ' is-open' : ''}`}
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            <span /><span />
          </button>
        </div>

        <div className={`dynamic-island__notice${noticeVisible ? ' is-visible' : ''}`} aria-live="polite">
          <span className="dynamic-island__notice-copy">
            <small>{notification.label}</small>
            <strong>{notification.text}</strong>
          </span>
          <button type="button" onClick={() => setOpen(true)}>{notification.action}<span>↗</span></button>
        </div>

        <nav className={`dynamic-island__nav${open ? ' is-visible' : ''}`} aria-label="Main navigation">
          {links.map(([label, href], index) => (
            <button key={label} type="button" onClick={() => handleNavigate(href)}>
              <span>0{index + 1}</span>
              {label}
            </button>
          ))}
          <a className="dynamic-island__cta" href={whatsappUrl} target="_blank" rel="noreferrer">
            START A PROJECT <span>↗</span>
          </a>
        </nav>
      </div>
    </header>
  )
}
