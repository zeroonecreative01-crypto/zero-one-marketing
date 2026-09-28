import { useEffect, useState } from 'react'

const whatsappUrl = 'https://wa.me/201556764804?text=' + encodeURIComponent('أهلًا Zero One، حابب أتكلم معاكم عن مشروع جديد.')

const services = [
  { number: '01', title: 'استراتيجية العلامة', description: 'نحدد مكانك في السوق، ونبني صوتًا وهويةً بصريةً تعبر عنك بوضوح.', icon: 'compass', tag: 'DIRECTION' },
  { number: '02', title: 'صناعة المحتوى', description: 'أفكار وتصميمات ونصوص توقف التمرير وتخلّي رسالتك أقرب لجمهورك.', icon: 'spark', tag: 'CONTENT' },
  { number: '03', title: 'إدارة الحملات', description: 'حملات مدروسة تبدأ بهدف واضح، وتتحسن باستمرار مع كل نتيجة.', icon: 'chart', tag: 'CAMPAIGNS' },
  { number: '04', title: 'إدارة السوشيال ميديا', description: 'حضور يومي متناسق يبني علاقة حقيقية بين علامتك والناس.', icon: 'chat', tag: 'COMMUNITY' },
]

const steps = [
  { number: '01', title: 'نسمع', text: 'نبدأ من قصتك، ونفهم جمهورك واللي عايز توصله فعلًا.' },
  { number: '02', title: 'نصمّم الاتجاه', text: 'نحوّل الصورة الكبيرة لفكرة واضحة وخطة تقدر تتحرك.' },
  { number: '03', title: 'ننطلق ونطوّر', text: 'ننّفذ، نقيس، ونحسّن؛ كل خطوة مبنية على اللي قبلها.' },
]

function Mark({ className = '' }) {
  return (
    <span className={'logo-mark ' + className} aria-hidden="true">
      <img className="logo-mark-image" src="/zero-one-logo.png" alt="" />
    </span>
  )
}

function ArrowIcon({ diagonal = false }) {
  return diagonal ? (
    <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M5 15 15 5M6 5h9v9" /></svg>
  ) : (
    <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10h11M10 5l5 5-5 5" /></svg>
  )
}

function ServiceIcon({ name }) {
  const common = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.55, strokeLinecap: 'round', strokeLinejoin: 'round' }
  const paths = {
    compass: <><circle cx="12" cy="12" r="8.25" {...common} /><path d="m15.6 8.4-2.1 5.1-5.1 2.1 2.1-5.1 5.1-2.1Z" {...common} /></>,
    spark: <><path d="M12 3.2 13.8 9l5 2.2-5 2-1.8 5.6-1.8-5.6-5-2 5-2.2L12 3.2Z" {...common} /><path d="m18.3 3.5.5 1.6 1.4.5-1.4.5-.5 1.5-.5-1.5-1.4-.5 1.4-.5.5-1.6Z" {...common} /></>,
    chart: <><path d="M4 18.5h16" {...common} /><path d="M6.5 15.5v-4M11.5 15.5V6.5M16.5 15.5V9" {...common} /><path d="m5 8 5-3 5 1 4-3" {...common} /></>,
    chat: <><path d="M19.5 11.3a7.3 7.3 0 0 1-7.6 7.1 8.3 8.3 0 0 1-3.4-.8L4.5 19l1.3-3.2a6.8 6.8 0 0 1-1.5-4.3 7.3 7.3 0 0 1 7.6-7.1 7.3 7.3 0 0 1 7.6 6.9Z" {...common} /><path d="M8 11.5h.01M12 11.5h.01M16 11.5h.01" {...common} /></>,
  }
  return <svg className="service-icon" viewBox="0 0 24 24" aria-hidden="true">{paths[name]}</svg>
}

function Logo() {
  return (
    <a className="brand" href="#home" aria-label="Zero One — الرئيسية">
      <Mark className="brand-mark" />
      <span className="brand-copy"><strong>ZERO ONE</strong><small>تسويق يبدأ بفكرة</small></span>
    </a>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [hasScrolled, setHasScrolled] = useState(false)

  useEffect(() => {
    const elements = document.querySelectorAll('.reveal')
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion || !('IntersectionObserver' in window)) {
      elements.forEach((element) => element.classList.add('is-visible'))
      return undefined
    }
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          currentObserver.unobserve(entry.target)
        }
      })
    }, { threshold: 0.14 })
    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const progress = document.querySelector('.scroll-progress span')
    const updateScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight
      const amount = total > 0 ? Math.min(window.scrollY / total, 1) : 0
      if (progress) progress.style.transform = 'scaleX(' + amount + ')'
      setHasScrolled(window.scrollY > 24)
    }
    updateScroll()
    window.addEventListener('scroll', updateScroll, { passive: true })
    return () => window.removeEventListener('scroll', updateScroll)
  }, [])

  const closeMenu = () => setMenuOpen(false)
  const moveHeroArtwork = (event) => {
    if (event.pointerType === 'touch') return
    const bounds = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - bounds.left) / bounds.width
    const y = (event.clientY - bounds.top) / bounds.height
    event.currentTarget.style.setProperty('--pointer-x', (x * 100) + '%')
    event.currentTarget.style.setProperty('--pointer-y', (y * 100) + '%')
    event.currentTarget.style.setProperty('--parallax-x', ((x - 0.5) * 14) + 'px')
    event.currentTarget.style.setProperty('--parallax-y', ((y - 0.5) * 14) + 'px')
  }
  const resetHeroArtwork = (event) => {
    event.currentTarget.style.setProperty('--pointer-x', '72%')
    event.currentTarget.style.setProperty('--pointer-y', '44%')
    event.currentTarget.style.setProperty('--parallax-x', '0px')
    event.currentTarget.style.setProperty('--parallax-y', '0px')
  }

  return (
    <div className="site-shell">
      <div className="scroll-progress" aria-hidden="true"><span /></div>
      <header className={'site-header' + (hasScrolled ? ' is-scrolled' : '')}>
        <div className="container header-inner">
          <Logo />
          <button className={'menu-toggle' + (menuOpen ? ' is-open' : '')} type="button" aria-label={menuOpen ? 'إغلاق القائمة' : 'فتح القائمة'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
            <span /><span />
          </button>
          <nav className={'main-nav' + (menuOpen ? ' is-open' : '')} aria-label="القائمة الرئيسية">
            <a href="#home" onClick={closeMenu}>الرئيسية</a>
            <a href="#about" onClick={closeMenu}>الفكرة</a>
            <a href="#services" onClick={closeMenu}>خدماتنا</a>
            <a href="#approach" onClick={closeMenu}>منهجنا</a>
          </nav>
          <a className="header-cta" href={whatsappUrl} target="_blank" rel="noreferrer">ابدأ محادثة <ArrowIcon diagonal /></a>
        </div>
      </header>

      <main>
        <section className="hero hero-reference" id="home" onPointerMove={moveHeroArtwork} onPointerLeave={resetHeroArtwork}>
          <div className="hero-scene" aria-hidden="true">
            <img className="hero-scene-image" src="/zero-one-laptop.webp" alt="" fetchPriority="high" />
          </div>
          <div className="hero-grain" aria-hidden="true" />
          <div className="hero-grid container">
            <div className="hero-copy">
              <div className="hero-kicker"><span className="eyebrow-dot" /><span>وكالة تسويق إبداعي</span><i>القاهرة · نشتغل أونلاين</i></div>
              <h1><span>نبني تجارب</span><span>رقمية <em>تفضل</em></span><span>في الذاكرة.</span></h1>
              <p className="hero-description">من أول فكرة لآخر تفصيلة، بنجمع الاستراتيجية والإبداع عشان علامتك تفضل في بال الناس.</p>
              <div className="hero-actions">
                <a className="button button-primary" href={whatsappUrl} target="_blank" rel="noreferrer">احكي لنا عن مشروعك <ArrowIcon diagonal /></a>
                <a className="text-link text-link-light" href="#services">اكتشف اللي نقدر نعمله <ArrowIcon /></a>
              </div>
              <div className="hero-bottomline"><span>STRATEGY</span><i /><span>CREATIVE</span><i /><span>GROWTH</span></div>
            </div>
          </div>
          <div className="hero-floating-note"><span>01</span><i /><small>من الفكرة<br />للأثر</small></div>
          <div className="hero-wordmark" aria-hidden="true">ZERO <span>ONE</span></div>
          <a className="scroll-cue" href="#about"><span>اسحب لتحت واكتشف</span><i /></a>
          <div className="hero-side-index" aria-hidden="true"><span>ZERO ONE</span><i />01 — 04</div>
        </section>

        <div className="ticker" aria-label="استراتيجية، إبداع، محتوى، أثر، نمو">
          <div className="ticker-track" aria-hidden="true">
            {[0, 1].map((copy) => <div className="ticker-set" key={copy}>
              <span>استراتيجية</span><i>✳</i><span>إبداع</span><i>✳</i><span>محتوى</span><i>✳</i><span>أثر</span><i>✳</i><span>نمو</span><i>✳</i><span>هوية</span><i>✳</i>
            </div>)}
          </div>
        </div>

        <section className="about section-pad" id="about">
          <div className="container about-grid">
            <div className="about-index reveal"><span>( 01 )</span><i /><small>الفكرة<br />قبل كل حاجة</small></div>
            <div className="about-copy reveal">
              <div className="eyebrow"><span className="eyebrow-dot" /> عن زيرو وان</div>
              <h2>كل علامة عندها<br /><span>حكاية تستاهل</span><br />تتسمع.</h2>
              <div className="about-bottom"><p>في Zero One بنجمع بين التفكير الاستراتيجي والإبداع البصري عشان نحول كل تفصيلة لتجربة واضحة، قريبة، وتفضل في الذاكرة.</p><a className="round-link" href="#services" aria-label="اكتشف خدماتنا"><ArrowIcon diagonal /></a></div>
            </div>
            <div className="about-emblem reveal"><div className="emblem-ring" /><Mark className="about-mark" /><span>ZERO<br />ONE</span><i>✳</i></div>
          </div>
        </section>

        <section className="services section-pad" id="services">
          <div className="container">
            <div className="section-heading reveal">
              <div><div className="eyebrow eyebrow-light"><span className="eyebrow-dot" /> اللي بنعمله</div><h2>أدوات كتير.<br /><span>اتجاه واحد.</span></h2></div>
              <p>كل خدمة بتكمّل التانية؛ عشان حضور علامتك يبقى متماسك من أول نظرة لحد آخر تفاعل.</p>
            </div>
            <div className="service-grid">
              {services.map((service, index) => <article className="service-card reveal" key={service.number} style={{ '--delay': String(index * 110) + 'ms' }}>
                <div className="service-card-top"><span className="service-number">{service.number}</span><span className="service-tag">{service.tag}</span><ServiceIcon name={service.icon} /></div>
                <span className="service-watermark" aria-hidden="true">{service.number}</span>
                <div className="service-card-copy"><h3>{service.title}</h3><p>{service.description}</p></div>
                <span className="service-arrow"><ArrowIcon diagonal /></span>
              </article>)}
            </div>
            <div className="services-foot reveal"><span>عايز تعرف نبدأ منين؟</span><a href={whatsappUrl} target="_blank" rel="noreferrer">خلينا نفكر سوا <ArrowIcon diagonal /></a></div>
          </div>
        </section>

        <section className="manifesto">
          <div className="manifesto-noise" aria-hidden="true" />
          <div className="manifesto-orbit" aria-hidden="true"><span>IDEA TO IMPACT · IDEA TO IMPACT ·</span></div>
          <div className="container manifesto-inner reveal">
            <span className="section-index">( 02 ) / OUR POINT OF VIEW</span>
            <div className="manifesto-copy"><div className="eyebrow eyebrow-light"><span className="eyebrow-dot" /> وجهة نظرنا</div><h2>الظهور سهل.<br /><span>التأثير</span> هو الفكرة.</h2></div>
            <p>مش بنطارد الانتباه وخلاص. بنبني رسالة مفهومة، وشكل له شخصية، وخطوات تقرّبك من جمهورك.</p>
            <a className="manifesto-link" href="#approach">شوف منهجنا <ArrowIcon diagonal /></a>
            <div className="manifesto-stamp"><Mark className="manifesto-mark" /><b>ZERO<br />ONE</b></div>
          </div>
        </section>

        <section className="approach section-pad" id="approach">
          <div className="container approach-grid">
            <div className="approach-heading reveal">
              <div className="eyebrow"><span className="eyebrow-dot" /> من الفكرة للأثر</div>
              <span className="approach-giant">03</span>
              <h2>إحنا بنبدأ<br /><span>بالسؤال الصح.</span></h2>
              <p>كل مشروع له طريقته. بنسمع الأول، ونختار الاتجاه اللي يناسبك، وبعدها نتحرك معاك خطوة بخطوة.</p>
              <a className="text-link" href={whatsappUrl} target="_blank" rel="noreferrer">ابدأ أول خطوة <ArrowIcon diagonal /></a>
            </div>
            <div className="steps-list">
              {steps.map((step, index) => <article className="step-row reveal" key={step.number} style={{ '--delay': String(index * 120) + 'ms' }}>
                <span className="step-number">{step.number}</span><div><span className="step-label">STEP / {step.number}</span><h3>{step.title}</h3><p>{step.text}</p></div><span className="step-arrow"><ArrowIcon diagonal /></span>
              </article>)}
            </div>
          </div>
        </section>

        <section className="contact section-pad" id="contact">
          <div className="container contact-card reveal">
            <div className="contact-glow" aria-hidden="true" />
            <div className="contact-copy"><div className="eyebrow eyebrow-light"><span className="eyebrow-dot" /> الخطوة الأولى</div><h2>عندك فكرة؟<br /><span>خلّيها تبان.</span></h2><p>احكيلنا عنها، ونبدأ سوا من أول سؤال.</p><a className="button button-light" href={whatsappUrl} target="_blank" rel="noreferrer">كلمنا على واتساب <ArrowIcon diagonal /></a></div>
            <div className="contact-art" aria-hidden="true"><div className="contact-ring ring-one" /><div className="contact-ring ring-two" /><Mark className="contact-mark" /><span className="contact-art-caption">A GOOD IDEA<br />DESERVES TO BE SEEN</span><i className="contact-spark">✳</i><b className="contact-orbit-text">ZERO ONE · ZERO ONE ·</b></div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-top"><Logo /><p>الفكرة الصح، في الاتجاه الصح.</p><a className="back-top" href="#home">ارجع للبداية <span>↑</span></a></div>
        <div className="container footer-bottom"><span>© {new Date().getFullYear()} ZERO ONE. كل الحقوق محفوظة.</span><a href={whatsappUrl} target="_blank" rel="noreferrer">ابدأ محادثة <ArrowIcon diagonal /></a></div>
      </footer>
    </div>
  )
}

export default App


