import logo from "../assets/logos/logoHDblancsansbg.webp"
import { LEGAL_LINKS } from "../data/nav"
import { scrollToSection } from "../utils/scroll"

function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer-main">
        <a
          href="#home"
          className="logo-link"
          aria-label="Retour en haut de page"
          onClick={(e) => scrollToSection(e, "home")}
        >
          <img src={logo} alt="Hexa Décodeur" className="logo" width={128} height={128} />
        </a>

        <nav className="site-footer-legal" aria-label="Informations légales">
          {LEGAL_LINKS.map(({ label, href }) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
        </nav>
      </div>

      <div className="site-footer-sub">
        © 2026 Hexa Décodeur — Anthony EXARTIER. Tous droits réservés.
      </div>
    </footer>
  )
}

export default Footer
