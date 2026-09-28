import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  { id: '01', name: 'FORM / FUNCTION', category: 'BRAND IDENTITY · CONCEPT STUDY', shape: 'rings', accent: '#ff7138', note: 'A sharper point of view.' },
  { id: '02', name: 'AFTER HOURS', category: 'CAMPAIGN · CONCEPT STUDY', shape: 'type', accent: '#ff8a52', note: 'Made to stop the scroll.' },
  { id: '03', name: 'NORTH / SOUTH', category: 'DIGITAL · CONCEPT STUDY', shape: 'grid', accent: '#ff7138', note: 'A digital place with a pulse.' },
  { id: '04', name: 'STILL MOVING', category: 'MOTION · CONCEPT STUDY', shape: 'orb', accent: '#ff8a52', note: 'Motion with a reason.' },
]

function ProjectArtwork({ project }) {
  return (
    <div className={`project-art project-art--${project.shape}`} style={{ '--project-accent': project.accent }} aria-hidden="true">
      <div className="project-art__grain" />
      <div className="project-art__shape"><i /><b /><span>{project.id}</span></div>
      <p className="project-art__micro">ZERO ONE<br />SELECTED STUDY</p>
      <p className="project-art__giant">{project.shape === 'type' ? 'AFTER' : project.shape === 'grid' ? 'N / S' : project.shape === 'orb' ? 'MOVE' : 'F / F'}</p>
    </div>
  )
}

export default function Work() {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)

  useLayoutEffect(() => {
    const section = sectionRef.current
    const track = trackRef.current
    if (!section || !track) return undefined
    const context = gsap.context(() => {
      const media = gsap.matchMedia()
      media.add('(min-width: 901px) and (prefers-reduced-motion: no-preference)', () => {
        const distance = () => Math.max(0, track.scrollWidth - window.innerWidth + 48)
        gsap.to(track, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => `+=${distance()}`,
            scrub: 0.8,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        })
      })
      return () => media.revert()
    }, section)
    return () => context.revert()
  }, [])

  return (
    <section className="work" id="work" ref={sectionRef} aria-labelledby="work-title">
      <div className="work__heading section-shell">
        <div data-reveal>
          <p className="eyebrow"><span>03</span> SELECTED WORK</p>
          <h2 id="work-title" className="section-title">IDEAS, MADE<br /><em>VISIBLE.</em></h2>
        </div>
        <div className="work__heading-copy" data-reveal>
          <p className="work__note">A visual sample of how we think across identity, campaigns, digital and motion. These are concept studies—not client results presented as real work.</p>
          <a href="#contact" className="work__case-link">WANT A CASE STUDY FOR YOUR BRAND? <b>↗</b></a>
        </div>
        <span className="work__hint">SCROLL TO EXPLORE <b>→</b></span>
      </div>
      <div className="work__viewport">
        <div className="work-track" ref={trackRef}>
          {projects.map((project) => (
            <article className="project-panel" key={project.id} data-cursor="VIEW" aria-label={`${project.name}, ${project.category}`}>
              <ProjectArtwork project={project} />
              <div className="project-caption">
                <div><span>{project.category}</span><h3>{project.name}</h3><p>{project.note}</p></div>
                <span className="project-caption__number">{project.id} <i>↗</i></span>
              </div>
            </article>
          ))}
          <div className="work__end-card">
            <span>GOOD WORK<br />MOVES THINGS.</span>
            <a href="#contact" data-cursor="OPEN">HAVE A PROJECT? <b>↗</b></a>
          </div>
        </div>
      </div>
      <div className="work__mobile-note section-shell"><span>SWIPE TO EXPLORE</span><i>→</i></div>
    </section>
  )
}
