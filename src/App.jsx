import { useEffect, useState } from 'react'

const whatsappUrl = `https://wa.me/201556764804?text=${encodeURIComponent('أهلًا Zero One، حابب أتكلم معاكم عن مشروع جديد.')}`

const services = [
  {
    number: '01',
    title: 'استراتيجية العلامة',
    description: 'نحدد مكانك في السوق، ونبني صوتًا وهويةً بصريةً تعبر عنك بوضوح.',
    icon: 'compass',
  },
  {
    number: '02',
    title: 'صناعة المحتوى',
    description: 'أفكار وتصميمات ونصوص توقف التمرير وتخلّي رسالتك أقرب لجمهورك.',
    icon: 'spark',
  },
  {
    number: '03',
    title: 'إدارة الحملات',
    description: 'حملات مدروسة تبدأ بهدف واضح، وتتحسن باستمرار مع كل نتيجة.',
    icon: 'chart',
  },
  {
    number: '04',
    title: 'إدارة السوشيال ميديا',
    description: 'حضور يومي متناسق يبني علاقة حقيقية بين علامتك والناس.',
    icon: 'chat',
  },
]

const steps = [
  { number: '01', title: 'نفهم', text: 'نسمع منك، ونتعرف على علامتك وجمهورك وهدفك.' },
  { number: '02', title: 'نخطط', text: 'نحوّل الصورة الكبيرة إلى خطوات واضحة وأفكار قابلة للتنفيذ.' },
  { number: '03', title: 'ننطلق', text: 'ننفّذ، نتابع، ونتعلم من كل خطوة عشان نكبر سوا.' },
]

function Mark({ className = '' }) {
  return (
    <span className={`logo-mark ${className}`} aria-hidden="true">
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
  const common = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round' }
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

  useEffect(() => {
    const elements = document.querySelectorAll('.reveal')
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          currentObserver.unobserve(entry.target)
        }
      })
    }, { threshold: 0.12 })

    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="container header-inner">
          <Logo />
          <button className={`menu-toggle${menuOpen ? ' is-open' : ''}`} type="button" aria-label={menuOpen ? 'إغلاق القائمة' : 'فتح القائمة'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
            <span /><span />
          </button>
          <nav className={`main-nav${menuOpen ? ' is-open' : ''}`} aria-label="القائمة الرئيسية">
            <a href="#home" onClick={closeMenu}>الرئيسية</a>
            <a href="#services" onClick={closeMenu}>خدماتنا</a>
            <a href="#approach" onClick={closeMenu}>منهجنا</a>
            <a href="#about" onClick={closeMenu}>عن زيرو وان</a>
          </nav>
          <a className="header-cta" href={whatsappUrl} target="_blank" rel="noreferrer">
            ابدأ محادثة <ArrowIcon diagonal />
          </a>
        </div>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-grain" aria-hidden="true" />
          <div className="container hero-grid">
            <div className="hero-copy">
              <div className="eyebrow eyebrow-light"><span className="eyebrow-dot" /> وكالة تسويق إبداعي</div>
              <h1>من أول فكرة،<br />نصنع <span>فرقًا يُرى.</span></h1>
              <p className="hero-description">نبني حضورًا رقميًا يشبه علامتك، ويكبر معها. من الاستراتيجية إلى المحتوى والحملات، كل خطوة لها معنى.</p>
              <div className="hero-actions">
                <a className="button button-primary" href={whatsappUrl} target="_blank" rel="noreferrer">احكي لنا عن مشروعك <ArrowIcon diagonal /></a>
                <a className="text-link text-link-light" href="#services">اكتشف خدماتنا <ArrowIcon /></a>
              </div>
              <div className="hero-note"><span className="note-line" /> شراكة تبدأ بالفهم، وتستمر بالأثر</div>
            </div>

            <div className="hero-visual" aria-label="شعار Zero One وسط هالة برتقالية متحركة">
              <div className="visual-orbit orbit-outer" />
              <div className="visual-orbit orbit-inner" />
              <div className="visual-glow" />
              <div className="visual-center"><Mark className="hero-mark" /><span>ZERO<br />ONE</span></div>
              <div className="visual-label label-top"><i /> فكرة لها اتجاه</div>
              <div className="visual-label label-bottom"><b>01</b><span>من البداية<br />للأثر</span></div>
              <span className="visual-star star-one">✳</span><span className="visual-star star-two">✦</span>
            </div>
          </div>
          <a className="scroll-cue" href="#about"><span>كمّل واكتشف</span><i /></a>
        </section>

        <div className="ticker" aria-label="استراتيجية، إبداع، نمو">
          <div className="ticker-track" aria-hidden="true">
            {[0, 1].map((copy) => <div className="ticker-set" key={copy}>
              <span>استراتيجية</span><i>✳</i><span>إبداع</span><i>✳</i><span>محتوى</span><i>✳</i><span>أثر</span><i>✳</i><span>نمو</span><i>✳</i>
            </div>)}
          </div>
        </div>

        <section className="intro section-pad" id="about">
          <div className="container intro-grid">
            <div className="intro-aside reveal"><span className="section-index">( 01 )</span><span className="index-line" /><span className="aside-note">البداية الصح<br />بتفرق</span></div>
            <div className="intro-main reveal">
              <div className="eyebrow"><span className="eyebrow-dot" /> عن زيرو وان</div>
              <h2>التسويق مش صوت أعلى.<br /><span>هو رسالة توصل صح.</span></h2>
              <div className="intro-bottom">
                <p>في Zero One بنؤمن إن العلامة القوية بتبدأ بفكرة واضحة وفهم حقيقي للناس. بنجمع بين التخطيط والإبداع عشان نحول كل تفصيلة إلى تجربة تستحق إنها تتشاف وتتذكر.</p>
                <a className="round-link" href="#services" aria-label="اكتشف خدماتنا"><ArrowIcon diagonal /></a>
              </div>
            </div>
          </div>
        </section>

        <section className="services section-pad" id="services">
          <div className="container">
            <div className="section-heading reveal">
              <div><div className="eyebrow"><span className="eyebrow-dot" /> إيه اللي بنعمله</div><h2>كل اللي تحتاجه،<br /><span>في اتجاه واحد.</span></h2></div>
              <p>خدمات متكاملة تخلي كل نقطة تواصل مع جمهورك تخدم صورة أكبر.</p>
            </div>
            <div className="service-grid">
              {services.map((service, index) => <article className="service-card reveal" key={service.number} style={{ '--delay': `${index * 90}ms` }}>
                <div className="service-card-top"><span className="service-number">{service.number}</span><ServiceIcon name={service.icon} /></div>
                <div><h3>{service.title}</h3><p>{service.description}</p></div>
                <span className="service-arrow"><ArrowIcon diagonal /></span>
              </article>)}
            </div>
            <div className="services-foot reveal"><span>مش عارف تبدأ منين؟</span><a href={whatsappUrl} target="_blank" rel="noreferrer">خلينا نفكر سوا <ArrowIcon diagonal /></a></div>
          </div>
        </section>

        <section className="manifesto">
          <div className="manifesto-orb" aria-hidden="true" />
          <div className="container manifesto-inner reveal">
            <span className="section-index">( 02 )</span>
            <div className="manifesto-copy"><div className="eyebrow eyebrow-light"><span className="eyebrow-dot" /> طريقتنا في التفكير</div><h2>فكرة واضحة.<br /><span>خطوة محسوبة.</span><br />أثر يستمر.</h2></div>
            <p>مش بنبدأ بالحلول الجاهزة. بنبدأ بالسؤال الصح، وبنشتغل على خطة تناسب علامتك فعلًا.</p>
            <a className="manifesto-link" href="#approach">اعرف منهجنا <ArrowIcon diagonal /></a>
          </div>
        </section>

        <section className="approach section-pad" id="approach">
          <div className="container approach-grid">
            <div className="approach-heading reveal">
              <div className="eyebrow"><span className="eyebrow-dot" /> من أول يوم</div>
              <h2>منهج بسيط.<br /><span>وشغل محسوب.</span></h2>
              <p>كل مشروع له تفاصيله، لكن البداية دايمًا واحدة: نسمع، نفهم، وبعدها نتحرك.</p>
              <a className="text-link" href={whatsappUrl} target="_blank" rel="noreferrer">ابدأ أول خطوة <ArrowIcon diagonal /></a>
            </div>
            <div className="steps-list">
              {steps.map((step) => <article className="step-row reveal" key={step.number}>
                <span className="step-number">{step.number}</span><div><h3>{step.title}</h3><p>{step.text}</p></div><span className="step-arrow"><ArrowIcon diagonal /></span>
              </article>)}
            </div>
          </div>
        </section>

        <section className="contact section-pad" id="contact">
          <div className="container contact-card reveal">
            <div className="contact-copy"><div className="eyebrow eyebrow-light"><span className="eyebrow-dot" /> الخطوة الأولى</div><h2>جاهز تبدأ<br /><span>حاجة مختلفة؟</span></h2><p>احكيلنا فكرتك، ونبدأ سوا من أول سؤال.</p>
              <a className="button button-light" href={whatsappUrl} target="_blank" rel="noreferrer">كلمنا على واتساب <ArrowIcon diagonal /></a>
            </div>
            <div className="contact-art" aria-hidden="true"><div className="contact-ring ring-one" /><div className="contact-ring ring-two" /><Mark className="contact-mark" /><span className="contact-art-caption">ZERO ONE<br />STARTS HERE</span><i className="contact-spark">✳</i></div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-top"><Logo /><p>كل بداية قوية وراها فكرة تستاهل.</p><a className="back-top" href="#home">الرجوع للأعلى <span>↑</span></a></div>
        <div className="container footer-bottom"><span>© {new Date().getFullYear()} ZERO ONE. كل الحقوق محفوظة.</span><a href={whatsappUrl} target="_blank" rel="noreferrer">ابدأ محادثة <ArrowIcon diagonal /></a></div>
      </footer>
    </div>
  )
}

export default App
