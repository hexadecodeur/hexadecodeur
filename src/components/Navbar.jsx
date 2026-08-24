import { useRef, useLayoutEffect, useState } from "react"
import logo from "../assets/logos/logoHDblancsansbg.png"
import { NAV_ITEMS } from "../data/nav"
import { scrollToSection } from "../utils/scroll"

function Navbar({ activeSection = "home" }) {
  const navLinksRef = useRef(null)
  const [underline, setUnderline] = useState({ left: 0, width: 0 })

  useLayoutEffect(() => {
    const measure = () => {
      if (!navLinksRef.current) return
      if (activeSection === "home") {
        setUnderline({ left: 0, width: 0 })
        return
      }
      const link = navLinksRef.current.querySelector(`a[href="#${activeSection}"]`)
      if (!link) return
      const container = navLinksRef.current
      const linkRect = link.getBoundingClientRect()
      const containerRect = container.getBoundingClientRect()
      setUnderline({
        left: linkRect.left - containerRect.left + container.scrollLeft,
        width: linkRect.width,
      })
    }
    measure()
    const raf = requestAnimationFrame(measure)
    window.addEventListener("resize", measure)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", measure)
    }
  }, [activeSection])

  return (
    <nav className="navbar">
      <a
        href="#home"
        className="logo-link"
        aria-label="Accueil"
        onClick={(e) => scrollToSection(e, "home")}
      >
        <img src={logo} alt="Hexa Décodeur" className="logo" />
      </a>

      <div ref={navLinksRef} className="nav-links">
        {NAV_ITEMS.map(({ label, href }) => {
          const sectionId = href.slice(1)
          const isActive = activeSection === sectionId
          return (
            <a
              key={sectionId}
              href={href}
              className={isActive ? "active" : ""}
              onClick={(e) => scrollToSection(e, sectionId)}
            >
              {label}
            </a>
          )
        })}
        <div
          className="nav-underline"
          style={{
            left: underline.left,
            width: underline.width,
          }}
          aria-hidden
        />
      </div>
    </nav>
  )
}

export default Navbar
