const projectData = {
  "01": {
    type: "IDENTITY",
    title: "FORM / FUNCTION",
    kicker: "01 / IDENTITY SYSTEM",
    intro: "A sharper visual language built around structure, contrast and motion.",
    body: "Built as a visual direction study for a modern brand system. The experience combines a strong typographic voice with a flexible visual grid, creating a language that can move from campaign to digital product without losing recognition.",
    tags: ["Strategy", "Identity", "Art Direction", "Packaging"],
  },
  "02": {
    type: "DIGITAL",
    title: "AFTER HOURS",
    kicker: "02 / DIGITAL EXPERIENCE",
    intro: "A digital experience where the interface becomes part of the campaign.",
    body: "A dark, tactile interface direction designed around motion, pacing and interaction. Content is treated as an active visual layer, giving the brand a digital presence that feels closer to an interactive film than a static website.",
    tags: ["UX/UI", "Web", "Interaction", "3D"],
  },
  "03": {
    type: "MOTION",
    title: "STILL MOVING",
    kicker: "03 / MOTION SYSTEM",
    intro: "A visual system designed to move, loop and stay recognizable.",
    body: "A motion-first identity study where shapes, typography and rhythm become the core assets. The system is designed to work across titles, social edits, launch films and short-form content.",
    tags: ["Motion", "3D", "Film", "Titles"],
  },
}

let activeIndex = 0
let overlay = null
let cards = []

function buildOverlay() {
  overlay = document.createElement("div")
  overlay.className = "case-study"
  overlay.setAttribute("aria-hidden", "true")
  overlay.innerHTML = `
    <div class="case-study__backdrop" data-case-close></div>
    <div class="case-study__frame" role="dialog" aria-modal="true" aria-label="Case study">
      <div class="case-study__top">
        <span class="case-study__index"></span>
        <button class="case-study__close" type="button" aria-label="Close case study" data-case-close>
          <span></span><span></span>
        </button>
      </div>
      <div class="case-study__grid">
        <div class="case-study__media">
          <img class="case-study__image" alt="" />
          <div class="case-study__media-glow"></div>
          <span class="case-study__media-label">ZERO ONE / 01</span>
        </div>
        <div class="case-study__content">
          <div class="case-study__kicker"></div>
          <h2 class="case-study__title"></h2>
          <p class="case-study__intro"></p>
          <p class="case-study__body"></p>
          <div class="case-study__tags"></div>
          <div class="case-study__actions">
            <button type="button" class="case-study__nav" data-case-prev>← PREV</button>
            <button type="button" class="case-study__nav" data-case-next>NEXT →</button>
            <a href="#contact" class="case-study__contact">START A PROJECT ↗</a>
          </div>
        </div>
      </div>
    </div>
  `
  document.body.appendChild(overlay)
}

function getCards() {
  return Array.from(document.querySelectorAll(".work-card"))
}

function getProjectId(card) {
  return card?.querySelector(".work-card__media > span")?.textContent?.trim() || "01"
}

function renderProject(id, direction = 1) {
  const data = projectData[id]
  if (!data || !overlay) return

  const card = cards.find((item) => getProjectId(item) === id) || cards[0]
  if (!card) return

  const image = card.querySelector(".work-card__media img")
  const imageEl = overlay.querySelector(".case-study__image")
  const frame = overlay.querySelector(".case-study__frame")
  const title = overlay.querySelector(".case-study__title")
  const content = overlay.querySelector(".case-study__content")

  activeIndex = Math.max(0, cards.indexOf(card))
  overlay.querySelector(".case-study__index").textContent = data.kicker
  overlay.querySelector(".case-study__kicker").textContent = data.type + " / ZERO ONE"
  overlay.querySelector(".case-study__intro").textContent = data.intro
  overlay.querySelector(".case-study__body").textContent = data.body
  overlay.querySelector(".case-study__media-label").textContent = data.kicker
  title.textContent = data.title
  imageEl.src = image?.currentSrc || image?.src || ""
  imageEl.alt = data.title
  overlay.querySelector(".case-study__tags").innerHTML = data.tags
    .map((tag) => `<span>${tag}</span>`)
    .join("")

  frame.classList.remove("is-next", "is-prev")
  void frame.offsetWidth
  frame.classList.add(direction >= 0 ? "is-next" : "is-prev")
}

function openCase(card) {
  cards = getCards()
  const id = getProjectId(card)

  if (!overlay) buildOverlay()
  renderProject(id)
  document.body.classList.add("case-study-open")
  overlay.classList.add("is-open")
  overlay.setAttribute("aria-hidden", "false")
}

function closeCase() {
  if (!overlay) return
  overlay.classList.remove("is-open")
  overlay.setAttribute("aria-hidden", "true")
  document.body.classList.remove("case-study-open")
}

function cycle(step) {
  if (!cards.length) cards = getCards()
  const nextIndex = (activeIndex + step + cards.length) % cards.length
  const card = cards[nextIndex]
  renderProject(getProjectId(card), step)
}

document.addEventListener("click", (event) => {
  const target = event.target
  const card = target.closest?.(".work-card")

  if (card) {
    const action = target.closest("a")
    if (action && action.closest(".case-study")) return
    event.preventDefault()
    openCase(card)
    return
  }

  if (!target.closest?.("[data-case-close]")) return
  closeCase()
})

document.addEventListener("click", (event) => {
  if (event.target.closest?.("[data-case-prev]")) cycle(-1)
  if (event.target.closest?.("[data-case-next]")) cycle(1)
})

document.addEventListener("keydown", (event) => {
  if (!overlay?.classList.contains("is-open")) return
  if (event.key === "Escape") closeCase()
  if (event.key === "ArrowLeft") cycle(-1)
  if (event.key === "ArrowRight") cycle(1)
})

window.addEventListener("hashchange", () => {
  if (window.location.hash === "#contact") closeCase()
})
