import { useState, useEffect } from "react"
import TechIcon from "../components/TechIcon"
import AssistantIntro from "../components/AssistantIntro"
import ArsenalGrid from "../components/ArsenalGrid"
import Carousel from "../components/Carousel"
import ProjectSlide from "../components/ProjectSlide"
import ProductFeaturesGrid from "../components/ProductFeaturesGrid"
import ContactForm from "../components/ContactForm"
import { PROJECTS } from "../data/projects"
import { getHeaderOffset } from "../utils/scroll"
import background from "../assets/images/background-brain-cyberpunk.webp"
import aboutPhoto from "../assets/images/anthony-profile.webp"
import aboutPhotoSm from "../assets/images/anthony-profile-560.webp"

const SECTION_IDS = ["home", "about", "services", "expertise", "projects", "contact"]
const ASSISTANT_INTRO_ENABLED = false
const CONTACT_PHONE_ENABLED = false

function OnePage({ onSectionChange }) {
  const [showAssistant, setShowAssistant] = useState(false)

  useEffect(() => {
    const hash = window.location.hash.slice(1)
    if (!SECTION_IDS.includes(hash) || hash === "home") return

    const el = document.getElementById(hash)
    if (!el) return

    const y = el.getBoundingClientRect().top + window.scrollY - getHeaderOffset()
    window.scrollTo({ top: y, behavior: "smooth" })
  }, [])

  useEffect(() => {
    if (!onSectionChange) return

    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(Boolean)
    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting && SECTION_IDS.includes(e.target.id))
          .map((e) => e.target.id)
        const active = SECTION_IDS.find((id) => visible.includes(id))
        if (active) onSectionChange(active)
      },
      {
        root: null,
        rootMargin: "-25% 0px -60% 0px",
        threshold: 0,
      }
    )

    sections.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [onSectionChange])

  return (
    <div
      className="one-page-bg"
      style={{ "--page-bg": `url(${background})` }}
    >
      {/* 1. Hero / Accueil */}
      <section id="home" className="home page section">
        <div className="hero">
          <div className="hero-content">
            <img
              src="/logo-hexadecodeur.svg"
              alt="Hexa Décodeur"
              className="hero-logo"
              width={500}
              height={500}
              fetchPriority="high"
            />
            <p className="hero-subtitle">
              Vous avez les idées, j'ai les outils.
            </p>
            {ASSISTANT_INTRO_ENABLED && (
              <div className="hero-actions">
                <button
                  className="btn-primary"
                  onClick={() => setShowAssistant(true)}
                >
                  ▶ Présentation
                </button>
              </div>
            )}
          </div>
          {ASSISTANT_INTRO_ENABLED && showAssistant && (
            <AssistantIntro onClose={() => setShowAssistant(false)} />
          )}
        </div>
      </section>

      {/* 2. À propos */}
      <section id="about" className="page section">
        <div className="page-header">
          <h1>À propos</h1>
        </div>
        <div className="page-content about-content">
          <img
            src={aboutPhoto}
            srcSet={`${aboutPhotoSm} 560w, ${aboutPhoto} 800w`}
            sizes="(max-width: 640px) min(280px, 100vw), 280px"
            alt="Anthony Exartier"
            className="about-photo"
            width={800}
            height={1000}
            decoding="async"
          />
          <p>
            Je m’appelle Anthony Exartier, développeur passionné par les systèmes,
            les machines et les interfaces intelligentes.
          </p>

          <h2>DE LA SANTÉ À LA TECH</h2>

          <p>
            Après une dizaine d'années dans le domaine de la santé, j’ai choisi d’élargir mon activité au développement logiciel
            en me formant principalement en autodidacte. J’exerce aujourd’hui comme infirmier libéral
            tout en développant progressivement mon activité dans la tech.
          </p>

          <h2>AUJOURD'HUI</h2>

          <p>
            Aujourd’hui, je conçois des applications, des sites web et des outils sur mesure,
            en combinant logique humaine, automatisation et intégration de l'intelligence artificielle.
          </p>

          <h2>MA PHILOSOPHIE</h2>

          <p>
            Mes premiers projets sont nés de besoins que je connaissais directement :
            le site web de mon cabinet d'infirmier libéral
            et une application web interactive développée pour mon propre mariage,
            qui permet aux invités d'accéder facilement à différentes informations et fonctionnalités
            grâce à un simple QR code.
          </p>

          <p>
            Voulant garder un certain équilibre entre ma vie professionnelle et personnelle,
            je privilégie actuellement les projets réalisables à distance.
          </p>
        </div>
      </section>

      {/* 3. Services */}
      <section id="services" className="page section">
        <div className="page-header">
          <h1>Services</h1>
        </div>
        <div className="page-content">
          <h2 className="services-heading">Votre vie numérique, mon domaine</h2>
          <p>
            Votre site ne doit pas seulement être beau. Il doit être utile, rapide, accessible et vous aider à être vu.
          </p>
          <p>
            Aujourd’hui, votre site web est souvent la première impression que les clients ont de votre commerce ou de votre entreprise.
            Il doit donc renforcer votre visibilité, votre crédibilité et donner immédiatement confiance.
          </p>
          <p>
            Je conçois des sites responsive, adaptés aux ordinateurs, tablettes et smartphones, avec une navigation claire et des temps de chargement optimisés.
            Chaque site est également pensé pour être performant, accessible et correctement structuré pour le référencement naturel, 
            afin d’être compris par les moteurs de recherche (SEO) et trouvé plus facilement par les personnes qui recherchent vos services.
          </p>
          <h2 className="services-heading">Suis-je fait pour vous ?</h2>
          <p>
            Que vous soyez une entreprise, un professionnel, une institution ou un particulier, votre besoin sera très différent.
            J'interviens dans tous ces domaines, via la création, la refonte, la maintenance, l'optimisation, 
            la transformation ou la mise en production de votre outil numérique sur mesure ou déjà existant.
          </p>
          <h2 className="services-heading">Fonctionnalités par type de produit</h2>
          <p>
            Chaque type de produit n’implique pas les mêmes briques techniques.
            Voici une vue d’ensemble des fonctionnalités typiques : ce qui est généralement indispensable,
            et ce qui est fréquent ou utile selon le projet.
          </p>
          <ProductFeaturesGrid />
        </div>
      </section>

      {/* 4. Expertises */}
      <section id="expertise" className="page section">
        <div className="page-header">
          <h1>Expertises</h1>
        </div>
        <div className="page-content arsenal-section">
          <h2 className="arsenal-heading">Mon Arsenal</h2>
          <p className="arsenal-intro">
            Une stack technique construite au fil de projets concrets, de formations en ligne
            et d’un apprentissage autodidacte constant.
          </p>

          <p>
            J’utilise aussi les LLMs comme outils pédagogiques pour comprendre les choix
            techniques, comparer les solutions et progresser plus vite sans me contenter
            de copier du code.
          </p>
          <ArsenalGrid />
        </div>
        <div className="page-content">
          <h2>Approche</h2>
          <p>
            Je commence par clarifier le besoin réel, identifier les contraintes et
            choisir une solution proportionnée au projet. Mon objectif est de livrer
            un outil utile, maintenable et compréhensible.
          </p>

          <p>
            Dans une société où notre vie numérique est de plus en plus importante,
            les dangers sont eux aussi de plus en plus nombreux et variés. 
            C'est pourquoi j’intègre dès la conception une attention particulière à la sécurité et à la confidentialité des données.
          </p>

          <p>
            Ma formation et mon expérience d'infirmier m'ont appris à mettre l'accent sur le travail bien fait et la qualité de service,
            ces notions étant essentielles dans le domaine de la santé comme dans le développement logiciel.
          </p>
        </div>
      </section>

      {/* 5. Projets */}
      <section id="projects" className="page section">
        <div className="page-header">
          <h1>Projets</h1>
        </div>
        <div className="page-content">
          <Carousel
            items={PROJECTS}
            renderItem={(project) => <ProjectSlide project={project} />}
          />
        </div>
      </section>

      {/* 6. Contact */}
      <section id="contact" className="page section">
        <div className="page-header">
          <h1>Contact</h1>
        </div>
        <div className="page-content">
          <p className="contact-intro">
            Pour toute demande d'information complémentaire, une demande de devis, une question sur les tarifs exercés, ou tout autre idée de projet, n'hésitez pas à me contacter.
          </p>
          <ul className="contact-list">
            <li>
              <span className="contact-label">Email</span>
              <a href="mailto:hexadecodeur@gmail.com">hexadecodeur@gmail.com</a>
            </li>
            {CONTACT_PHONE_ENABLED && (
              <li>
                <span className="contact-label">Téléphone</span>
                <a href="tel:+33631355164">+33 6 31 35 51 64</a>
              </li>
            )}
            <li>
              <span className="contact-label">
                <TechIcon id="linkedin" className="contact-label-icon" />
                LinkedIn
              </span>
              <a href="https://linkedin.com/in/anthony-exartier" target="_blank" rel="noopener noreferrer">
                linkedin.com/in/anthony-exartier
              </a>
            </li>
            <li>
              <span className="contact-label">
                <TechIcon id="github" className="contact-label-icon" />
                GitHub
              </span>
              <a href="https://github.com/hexadecodeur" target="_blank" rel="noopener noreferrer">
                github.com/hexadecodeur
              </a>
            </li>
          </ul>
          <ContactForm />
        </div>
      </section>
    </div>
  )
}

export default OnePage
