const STORAGE_KEY = "cookie-consent"
export const GA_MEASUREMENT_ID = "G-4Z8Z89JEV0"
export const COOKIE_BANNER_OPEN_EVENT = "cookie-banner:open"
export const COOKIE_CONSENT_CHANGE_EVENT = "cookie-consent:change"

const GA_COOKIE_PREFIXES = ["_ga", "_gid", "_gat"]

export function getConsent() {
  try {
    return localStorage.getItem(STORAGE_KEY)
  } catch {
    return null
  }
}

export function openCookieBanner() {
  window.dispatchEvent(new CustomEvent(COOKIE_BANNER_OPEN_EVENT))
}

function getCookieDomains() {
  const hostname = window.location.hostname
  const domains = [undefined, hostname]

  if (hostname !== "localhost" && !hostname.endsWith(".localhost")) {
    domains.push(`.${hostname}`)

    const parts = hostname.split(".")
    if (parts.length > 2) {
      domains.push(`.${parts.slice(-2).join(".")}`)
    }
  }

  return domains
}

function expireCookie(name, domain) {
  const domainPart = domain ? `; domain=${domain}` : ""
  document.cookie = `${name}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Max-Age=0${domainPart}`
}

export function clearAnalyticsCookies() {
  if (typeof document === "undefined") return

  const cookieNames = document.cookie
    .split(";")
    .map((part) => part.trim().split("=")[0])
    .filter(Boolean)
    .filter((name) =>
      GA_COOKIE_PREFIXES.some(
        (prefix) => name === prefix || name.startsWith(`${prefix}_`)
      )
    )

  const domains = getCookieDomains()

  for (const name of cookieNames) {
    for (const domain of domains) {
      expireCookie(name, domain)
    }
  }
}

export function loadGA4() {
  if (typeof window === "undefined" || window.__ga4Loaded) return

  window.__ga4Loaded = true
  window.dataLayer = window.dataLayer || []

  function gtag() {
    window.dataLayer.push(arguments)
  }

  window.gtag = gtag

  const script = document.createElement("script")
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
  document.head.appendChild(script)

  gtag("js", new Date())
  gtag("config", GA_MEASUREMENT_ID)
}

export function applyConsent(value) {
  const previous = getConsent()

  try {
    localStorage.setItem(STORAGE_KEY, value)
  } catch {
    // ignore storage errors
  }

  window.dispatchEvent(
    new CustomEvent(COOKIE_CONSENT_CHANGE_EVENT, { detail: value })
  )

  if (value === "accepted") {
    loadGA4()
    return
  }

  clearAnalyticsCookies()

  // Coupe GA4 + scripts Vercel déjà injectés en session
  if (previous === "accepted") {
    window.location.reload()
  }
}

export function initAnalyticsFromConsent() {
  if (getConsent() === "accepted") loadGA4()
}
