export function getHeaderOffset() {
  const header = document.querySelector(".app > header")
  return header?.offsetHeight ?? 72
}

export function scrollToSection(e, sectionId) {
  e.preventDefault()
  const el = document.getElementById(sectionId)
  if (!el) {
    window.location.hash = sectionId
    return
  }
  const y = el.getBoundingClientRect().top + window.scrollY - getHeaderOffset()
  window.scrollTo({ top: y, behavior: "smooth" })
}
