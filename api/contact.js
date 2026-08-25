import { Resend } from "resend"
import {
  BUDGETS,
  PROJECT_TYPES,
  PROJECT_TYPE_QUESTIONS,
  SITUATIONS,
  TIMELINES,
} from "../src/data/contactForm.js"

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const LIMITS = {
  name: 100,
  company: 150,
  email: 200,
  phone: 40,
  otherProjectType: 50,
  need: 400,
  projectType: 60,
  situation: 40,
  budget: 40,
  timeline: 40,
}

function labelFrom(list, id, fallback = "Non précisé") {
  if (!id) return fallback
  return list.find((item) => item.id === id)?.label ?? id
}

function formatTypeAnswers(projectType, typeAnswers = {}) {
  const questions = PROJECT_TYPE_QUESTIONS[projectType]
  if (!questions?.length) return ""

  const lines = questions.flatMap((question) => {
    const raw = typeAnswers[question.id]
    if (raw == null || raw === "" || (Array.isArray(raw) && raw.length === 0)) {
      return []
    }

    const answer = Array.isArray(raw)
      ? raw
          .map((id) => question.options.find((option) => option.id === id)?.label ?? id)
          .join(", ")
      : (question.options.find((option) => option.id === raw)?.label ?? raw)

    return [`- ${question.label}`, `  → ${answer}`]
  })

  if (lines.length === 0) return ""
  return `\nRéponses liées au type de projet :\n${lines.join("\n")}\n`
}

function buildEmailText(payload) {
  const projectLabel =
    payload.projectType === "autre" && payload.otherProjectType
      ? `Autre — ${payload.otherProjectType}`
      : labelFrom(PROJECT_TYPES, payload.projectType)

  return `
Nouveau message depuis le formulaire Hexa Décodeur

Identité
- Nom : ${payload.name}
- Entreprise : ${payload.company || "Non précisé"}
- Email : ${payload.email}
- Téléphone : ${payload.phone || "Non précisé"}

Projet
- Type : ${projectLabel}
- Situation : ${labelFrom(SITUATIONS, payload.situation)}
- Budget : ${labelFrom(BUDGETS, payload.budget)}
- Délai : ${labelFrom(TIMELINES, payload.timeline)}
${formatTypeAnswers(payload.projectType, payload.typeAnswers)}
Besoin
${payload.need}
`.trim()
}

function json(data, status = 200) {
  return Response.json(data, { status })
}

function tooLong(value, max) {
  return typeof value === "string" && value.length > max
}

export async function POST(request) {
  try {
    const body = await request.json()

    // Honeypot : les bots remplissent souvent ce champ invisible
    if (body.website) {
      return json({ success: true })
    }

    const name = typeof body.name === "string" ? body.name.trim() : ""
    const company = typeof body.company === "string" ? body.company.trim() : ""
    const email = typeof body.email === "string" ? body.email.trim() : ""
    const phone = typeof body.phone === "string" ? body.phone.trim() : ""
    const projectType =
      typeof body.projectType === "string" ? body.projectType.trim() : ""
    const otherProjectType =
      typeof body.otherProjectType === "string"
        ? body.otherProjectType.trim()
        : ""
    const situation =
      typeof body.situation === "string" ? body.situation.trim() : ""
    const need = typeof body.need === "string" ? body.need.trim() : ""
    const budget = typeof body.budget === "string" ? body.budget.trim() : ""
    const timeline =
      typeof body.timeline === "string" ? body.timeline.trim() : ""
    const typeAnswers =
      body.typeAnswers && typeof body.typeAnswers === "object"
        ? body.typeAnswers
        : {}

    if (!name || !email || !need) {
      return json(
        { error: "Les champs obligatoires sont manquants." },
        400
      )
    }

    if (!EMAIL_RE.test(email)) {
      return json({ error: "Le format de l’email est invalide." }, 400)
    }

    if (
      tooLong(name, LIMITS.name) ||
      tooLong(company, LIMITS.company) ||
      tooLong(email, LIMITS.email) ||
      tooLong(phone, LIMITS.phone) ||
      tooLong(projectType, LIMITS.projectType) ||
      tooLong(otherProjectType, LIMITS.otherProjectType) ||
      tooLong(situation, LIMITS.situation) ||
      tooLong(need, LIMITS.need) ||
      tooLong(budget, LIMITS.budget) ||
      tooLong(timeline, LIMITS.timeline)
    ) {
      return json(
        { error: "Un ou plusieurs champs sont trop longs." },
        400
      )
    }

    if (projectType && !PROJECT_TYPES.some((item) => item.id === projectType)) {
      return json({ error: "Type de projet invalide." }, 400)
    }

    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY is missing")
      return json({ error: "Configuration serveur incomplète." }, 500)
    }

    const from =
      process.env.CONTACT_FROM || "Hexa Décodeur <contact@hexadecodeur.fr>"
    const to = process.env.CONTACT_TO || "hexadecodeur@gmail.com"

    const payload = {
      name,
      company,
      email,
      phone,
      projectType,
      otherProjectType,
      situation,
      need,
      budget,
      timeline,
      typeAnswers,
    }

    const projectLabel = labelFrom(PROJECT_TYPES, projectType, "Non précisé")
    const resend = new Resend(process.env.RESEND_API_KEY)

    const { error } = await resend.emails.send({
      from,
      to: [to],
      replyTo: email,
      subject: `Nouveau projet — ${projectLabel}`,
      text: buildEmailText(payload),
    })

    if (error) {
      console.error(error)
      return json({ error: "L’envoi de l’email a échoué." }, 500)
    }

    return json({ success: true })
  } catch (error) {
    console.error(error)
    return json({ error: "Une erreur serveur est survenue." }, 500)
  }
}

export function GET() {
  return json({ error: "Méthode non autorisée." }, 405)
}
