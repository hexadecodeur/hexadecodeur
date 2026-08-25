import { useEffect, useState } from "react"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/react"

import Layout from "./components/Layout"
import CookieBanner from "./components/CookieBanner"
import OnePage from "./pages/OnePage"
import Cgv from "./pages/cgv"
import PolitiqueConfid from "./pages/PolitiqueConfid"
import MentionsLégales from "./pages/MentionsLégales"
import GestionCookies from "./pages/GestionCookies"
import {
  COOKIE_CONSENT_CHANGE_EVENT,
  getConsent,
} from "./utils/analyticsConsent"

const LEGAL_PAGES = {
  "mentions-legales": MentionsLégales,
  "cgv": Cgv,
  "politique-confidentialite": PolitiqueConfid,
  "gestion-cookies": GestionCookies,
}

function getPageFromHash() {
  const hash = window.location.hash.slice(1)
  return LEGAL_PAGES[hash] ? hash : "home"
}

function App() {
  const [activeSection, setActiveSection] = useState("home")
  const [page, setPage] = useState(getPageFromHash)
  const [analyticsAllowed, setAnalyticsAllowed] = useState(
    () => getConsent() === "accepted"
  )

  useEffect(() => {
    const onHashChange = () => setPage(getPageFromHash())
    window.addEventListener("hashchange", onHashChange)
    return () => window.removeEventListener("hashchange", onHashChange)
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [page])

  useEffect(() => {
    const onConsentChange = (event) => {
      setAnalyticsAllowed((event.detail ?? getConsent()) === "accepted")
    }
    window.addEventListener(COOKIE_CONSENT_CHANGE_EVENT, onConsentChange)
    return () => window.removeEventListener(COOKIE_CONSENT_CHANGE_EVENT, onConsentChange)
  }, [])

  const LegalPage = LEGAL_PAGES[page]

  return (
    <>
      <Layout activeSection={LegalPage ? "" : activeSection}>
        {LegalPage ? (
          <LegalPage />
        ) : (
          <OnePage onSectionChange={setActiveSection} />
        )}
      </Layout>
      <CookieBanner />
      {analyticsAllowed && (
        <>
          <Analytics />
          <SpeedInsights />
        </>
      )}
    </>
  )
}

export default App
