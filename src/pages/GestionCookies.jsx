import { useEffect, useState } from "react"
import {
  COOKIE_CONSENT_CHANGE_EVENT,
  getConsent,
  openCookieBanner,
} from "../utils/analyticsConsent"

function statusLabel(consent) {
  if (consent === "accepted") {
    return "Vous avez accepté les cookies de mesure d'audience (Google Analytics et Vercel)."
  }
  if (consent === "refused") {
    return "Vous avez refusé les cookies de mesure d'audience (Google Analytics et Vercel)."
  }
  return "Vous n'avez pas encore fait de choix."
}

function GestionCookies() {
  const [consent, setConsent] = useState(getConsent)

  useEffect(() => {
    const onChange = (event) => setConsent(event.detail ?? getConsent())
    window.addEventListener(COOKIE_CONSENT_CHANGE_EVENT, onChange)
    return () => window.removeEventListener(COOKIE_CONSENT_CHANGE_EVENT, onChange)
  }, [])

  return (
    <div className="page">
      <div className="page-header">
        <h1>Gestion des cookies</h1>
        <br />
        <p><strong>Dernière mise à jour : 25/08/2026</strong></p>
      </div>

      <div className="page-content">
        <p>
          Cette page vous informe sur l&apos;utilisation des cookies et traceurs sur le site
          Hexa Décodeur, et vous permet de modifier votre choix à tout moment.
        </p>
        <br />

        <h2>Qu&apos;est-ce qu&apos;un cookie ?</h2>
        <br />
        <p>
          Un cookie est un petit fichier déposé sur votre terminal (ordinateur, tablette, smartphone)
          lors de la visite d&apos;un site. Il permet de mémoriser des informations relatives à votre
          navigation ou à votre consentement. D&apos;autres technologies similaires (scripts de mesure,
          stockage local) peuvent être utilisées dans le même but.
        </p>
        <br />

        <h2>Cookies et préférences strictement nécessaires</h2>
        <br />
        <p>
          Hexa Décodeur ne dépose pas de cookies techniques obligatoires pour le fonctionnement
          du site. Votre choix de consentement (acceptation ou refus) est uniquement mémorisé
          dans le stockage local de votre navigateur (<code>localStorage</code>), afin de ne pas
          vous redemander votre préférence à chaque visite. Ce stockage ne constitue pas un
          cookie de mesure d&apos;audience.
        </p>
        <br />

        <h2>Cookies de mesure d&apos;audience (optionnels)</h2>
        <br />
        <p>
          Ces outils ne sont chargés qu&apos;après votre acceptation explicite. Tant que vous
          n&apos;avez pas accepté, aucun script Google Analytics ni Vercel Analytics / Speed Insights
          n&apos;est injecté.
        </p>
        <br />
        <p>
          <ul>
            <li>
              <strong>Google Analytics 4</strong> (Google LLC) — mesure d&apos;audience
              (pages consultées, provenance, interactions). Durée typique des cookies : jusqu&apos;à
              13 mois. Base légale : consentement.
            </li>
            <li>
              <strong>Vercel Analytics</strong> (Vercel Inc.) — statistiques d&apos;usage du site
              hébergé sur Vercel. Base légale : consentement.
            </li>
            <li>
              <strong>Vercel Speed Insights</strong> (Vercel Inc.) — mesure des performances
              de chargement des pages. Base légale : consentement.
            </li>
          </ul>
        </p>
        <br />

        <h2>Votre choix actuel</h2>
        <br />
        <p>
          <strong>Statut :</strong> {statusLabel(consent)}
        </p>
        <br />
        <p>
          Vous pouvez accepter ou refuser les cookies de mesure d&apos;audience, et revenir sur
          votre décision à tout moment. En cas de refus après une acceptation préalable, les
          cookies Analytics déjà déposés sont supprimés dans la mesure du possible.
        </p>
        <br />
        <button
          type="button"
          className="btn-primary"
          onClick={openCookieBanner}
        >
          Gérer mes cookies
        </button>
        <br />
        <br />

        <h2>En savoir plus</h2>
        <br />
        <p>
          Pour plus d&apos;informations sur le traitement de vos données personnelles, consultez
          la{" "}
          <a href="#politique-confidentialite">politique de confidentialité</a>.
        </p>
        <br />
        <p>
          Pour toute question relative aux cookies ou à vos données :{" "}
          <a href="mailto:hexadecodeur@gmail.com">hexadecodeur@gmail.com</a>.
        </p>
      </div>
    </div>
  )
}

export default GestionCookies
