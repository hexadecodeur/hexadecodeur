import { useEffect, useState } from "react"
import {
  applyConsent,
  COOKIE_BANNER_OPEN_EVENT,
  getConsent,
  initAnalyticsFromConsent,
} from "../utils/analyticsConsent"

function CookieBanner() {
  const [visible, setVisible] = useState(() => getConsent() === null)

  useEffect(() => {
    initAnalyticsFromConsent()

    const onOpen = () => setVisible(true)
    window.addEventListener(COOKIE_BANNER_OPEN_EVENT, onOpen)
    return () => window.removeEventListener(COOKIE_BANNER_OPEN_EVENT, onOpen)
  }, [])

  function handleAccept() {
    applyConsent("accepted")
    setVisible(false)
  }

  function handleRefuse() {
    applyConsent("refused")
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      className="cookie-banner"
      role="dialog"
      aria-labelledby="cookie-banner-title"
      aria-describedby="cookie-banner-desc"
    >
      <div className="cookie-banner-content">
        <p id="cookie-banner-title" className="cookie-banner-title">
          Cookies &amp; mesure d&apos;audience
        </p>
        <p id="cookie-banner-desc" className="cookie-banner-text">
          Ce site utilise des outils de mesure d&apos;audience (Google Analytics
          et Vercel) uniquement si vous l&apos;acceptez. Vous pouvez changer
          d&apos;avis à tout moment via « Gérer mes cookies ».
        </p>
      </div>

      <div className="cookie-banner-actions">
        <button type="button" className="cookie-btn cookie-btn-accept" onClick={handleAccept}>
          Accepter
        </button>
        <button type="button" className="cookie-btn cookie-btn-refuse" onClick={handleRefuse}>
          Refuser
        </button>
        <a href="#gestion-cookies" className="cookie-btn cookie-btn-manage">
          Gérer mes cookies
        </a>
      </div>
    </div>
  )
}

export default CookieBanner
