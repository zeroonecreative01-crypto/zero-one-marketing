import { useState } from 'react'

const links = [
  ['WORK', '#work'],
  ['SERVICES', '#services'],
  ['ABOUT', '#about'],
  ['CONTACT', '#contact'],
]

export default function Navigation({ whatsappUrl }) {
  const [open, setOpen] = useState(false)

  return (
    <header className="topbar">
      <div className="topbar__inner">
        <a className="wordmark" href="#home" aria-label="Zero One home">
          <img src="/zero-one-logo.png" alt="" />
          <span>ZERO <i>ONE</i></span>
        </a>
        <button className={`menu-toggle${open ? ' is-open' : ''}`} type="button" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} onClick={() => setOpen(!open)}>
          <span /><span />
        </button>
        <nav className={`topbar__links${open ? ' is-open' : ''}`} aria-label="Main navigation">
          {links.map(([label, href], index) => <a key={label} href={href} onClick={() => setOpen(false)}><sup>0{index + 1}</sup>{label}</a>)}
        </nav>
        <a className="topbar__cta" href={whatsappUrl} target="_blank" rel="noreferrer" data-cursor="OPEN">START A PROJECT <span aria-hidden="true">↗</span></a>
      </div>
    </header>
  )
}
