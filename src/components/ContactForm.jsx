import { useState } from "react"
import {
  BUDGETS,
  CONTACT_FORM_LIMITS,
  PROJECT_TYPES,
  PROJECT_TYPE_QUESTIONS,
  SITUATIONS,
  TIMELINES,
} from "../data/contactForm"

const INITIAL_FORM = {
  name: "",
  company: "",
  email: "",
  phone: "",
  projectType: "",
  otherProjectType: "",
  typeAnswers: {},
  situation: "",
  need: "",
  budget: "",
  timeline: "",
  website: "",
}

function SingleQuestion({ question, value, onToggle }) {
  return (
    <div className="contact-type-question">
      <p className="contact-type-question-label">{question.label}</p>
      <div className="contact-radio-list">
        {question.options.map(({ id, label }) => (
          <label key={id} className="contact-radio">
            <input
              type="radio"
              name={question.id}
              value={id}
              checked={value === id}
              onChange={() => {}}
              onClick={() => onToggle(id)}
            />
            <span>{label}</span>
          </label>
        ))}
      </div>
    </div>
  )
}

function MultiQuestion({ question, values, onToggle }) {
  return (
    <div className="contact-type-question">
      <p className="contact-type-question-label">
        {question.label}
        <em className="contact-optional"> — plusieurs réponses possibles</em>
      </p>
      <div className="contact-choice-grid" role="group" aria-label={question.label}>
        {question.options.map(({ id, label }) => {
          const selected = values.includes(id)
          return (
            <button
              key={id}
              type="button"
              className={`contact-choice-btn${selected ? " is-selected" : ""}`}
              aria-pressed={selected}
              onClick={() => onToggle(id)}
            >
              {label}
            </button>
          )
        })}
      </div>
    </div>
  )
}

function ContactForm() {
  const [form, setForm] = useState(INITIAL_FORM)
  const [status, setStatus] = useState("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }))
  }

  const selectProjectType = (id) => {
    setForm((current) => {
      const nextType = current.projectType === id ? "" : id
      return {
        ...current,
        projectType: nextType,
        otherProjectType: nextType === "autre" ? current.otherProjectType : "",
        typeAnswers: {},
      }
    })
  }

  const toggleRadio = (field, id) => {
    setForm((current) => ({
      ...current,
      [field]: current[field] === id ? "" : id,
    }))
  }

  const toggleTypeSingle = (questionId, optionId) => {
    setForm((current) => ({
      ...current,
      typeAnswers: {
        ...current.typeAnswers,
        [questionId]: current.typeAnswers[questionId] === optionId ? "" : optionId,
      },
    }))
  }

  const toggleTypeMulti = (questionId, optionId) => {
    setForm((current) => {
      const selected = current.typeAnswers[questionId] ?? []
      const next = selected.includes(optionId)
        ? selected.filter((value) => value !== optionId)
        : [...selected, optionId]

      return {
        ...current,
        typeAnswers: {
          ...current.typeAnswers,
          [questionId]: next,
        },
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (status === "loading") return

    setStatus("loading")
    setErrorMessage("")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          company: form.company,
          email: form.email,
          phone: form.phone,
          projectType: form.projectType,
          otherProjectType: form.otherProjectType,
          typeAnswers: form.typeAnswers,
          situation: form.situation,
          need: form.need,
          budget: form.budget,
          timeline: form.timeline,
          website: form.website,
        }),
      })

      const data = await response.json().catch(() => ({}))

      if (!response.ok) {
        throw new Error(data.error || "Impossible d’envoyer le message.")
      }

      setForm(INITIAL_FORM)
      setStatus("success")
    } catch (error) {
      setStatus("error")
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Une erreur est survenue. Réessaie dans un instant."
      )
    }
  }

  const showOtherField = form.projectType === "autre"
  const typeQuestions = PROJECT_TYPE_QUESTIONS[form.projectType] ?? []
  const showTypeQuestions = typeQuestions.length > 0
  const isLoading = status === "loading"

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <header className="contact-form-header">
        <h2 className="contact-form-title">Initialiser une mission</h2>
        <p className="contact-form-lead">
          Décrivez-moi votre besoin. Je reviens vers vous rapidement avec les premières pistes.
        </p>
      </header>

      <input
        className="contact-honeypot"
        type="text"
        name="website"
        value={form.website}
        onChange={(e) => updateField("website", e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      <fieldset className="contact-form-section">
        <legend>Identité</legend>
        <div className="contact-form-grid">
          <label className="contact-field">
            <span>Nom / prénom</span>
            <input
              type="text"
              name="name"
              autoComplete="name"
              required
              value={form.name}
              onChange={(e) => updateField("name", e.target.value)}
            />
          </label>
          <label className="contact-field">
            <span>
              Entreprise ou organisation
              <em className="contact-optional"> — facultatif</em>
            </span>
            <input
              type="text"
              name="company"
              autoComplete="organization"
              value={form.company}
              onChange={(e) => updateField("company", e.target.value)}
            />
          </label>
          <label className="contact-field">
            <span>Email</span>
            <input
              type="email"
              name="email"
              autoComplete="email"
              required
              value={form.email}
              onChange={(e) => updateField("email", e.target.value)}
            />
          </label>
          <label className="contact-field">
            <span>
              Téléphone
              <em className="contact-optional"> — facultatif</em>
            </span>
            <input
              type="tel"
              name="phone"
              autoComplete="tel"
              value={form.phone}
              onChange={(e) => updateField("phone", e.target.value)}
            />
          </label>
        </div>
      </fieldset>

      <fieldset className="contact-form-section">
        <legend>Type de projet</legend>
        <div className="contact-choice-grid" role="radiogroup" aria-label="Type de projet">
          {PROJECT_TYPES.map(({ id, label }) => {
            const selected = form.projectType === id
            return (
              <button
                key={id}
                type="button"
                className={`contact-choice-btn${selected ? " is-selected" : ""}`}
                aria-pressed={selected}
                onClick={() => selectProjectType(id)}
              >
                {label}
              </button>
            )
          })}
        </div>

        {showOtherField && (
          <label className="contact-field contact-field--other">
            <span>Précise ton type de projet</span>
            <input
              type="text"
              name="otherProjectType"
              maxLength={CONTACT_FORM_LIMITS.otherProjectType}
              value={form.otherProjectType}
              onChange={(e) => updateField("otherProjectType", e.target.value)}
            />
            <span className="contact-field-hint">
              {form.otherProjectType.length}/{CONTACT_FORM_LIMITS.otherProjectType}
            </span>
          </label>
        )}

        <div
          className={`contact-type-questions${showTypeQuestions ? " is-open" : ""}`}
          aria-hidden={!showTypeQuestions}
        >
          <div className="contact-type-questions-inner">
            {typeQuestions.map((question) =>
              question.mode === "multi" ? (
                <MultiQuestion
                  key={question.id}
                  question={question}
                  values={form.typeAnswers[question.id] ?? []}
                  onToggle={(optionId) => toggleTypeMulti(question.id, optionId)}
                />
              ) : (
                <SingleQuestion
                  key={question.id}
                  question={question}
                  value={form.typeAnswers[question.id] ?? ""}
                  onToggle={(optionId) => toggleTypeSingle(question.id, optionId)}
                />
              )
            )}
            <p className="contact-type-questions-note">
              Ces réponses m’aideront à comprendre votre besoin. Elles ne constituent pas un cahier des charges définitif.
            </p>
          </div>
        </div>
      </fieldset>

      <fieldset className="contact-form-section">
        <legend>Situation actuelle</legend>
        <div className="contact-radio-list">
          {SITUATIONS.map(({ id, label }) => (
            <label key={id} className="contact-radio">
              <input
                type="radio"
                name="situation"
                value={id}
                checked={form.situation === id}
                onChange={() => {}}
                onClick={() => toggleRadio("situation", id)}
              />
              <span>{label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="contact-form-section">
        <legend>Besoin</legend>
        <label className="contact-field">
          <span>Décrivez-moi votre projet, le problème rencontré ou le résultat recherché.</span>
          <textarea
            name="need"
            rows={5}
            maxLength={CONTACT_FORM_LIMITS.need}
            required
            value={form.need}
            onChange={(e) => updateField("need", e.target.value)}
          />
          <span className="contact-field-hint">
            {form.need.length}/{CONTACT_FORM_LIMITS.need}
          </span>
        </label>
      </fieldset>

      <fieldset className="contact-form-section">
        <legend>
          Budget envisagé
          <em className="contact-optional"> — facultatif</em>
        </legend>
        <div className="contact-radio-list">
          {BUDGETS.map(({ id, label }) => (
            <label key={id} className="contact-radio">
              <input
                type="radio"
                name="budget"
                value={id}
                checked={form.budget === id}
                onChange={() => {}}
                onClick={() => toggleRadio("budget", id)}
              />
              <span>{label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="contact-form-section">
        <legend>Délai</legend>
        <div className="contact-radio-list">
          {TIMELINES.map(({ id, label }) => (
            <label key={id} className="contact-radio">
              <input
                type="radio"
                name="timeline"
                value={id}
                checked={form.timeline === id}
                onChange={() => {}}
                onClick={() => toggleRadio("timeline", id)}
              />
              <span>{label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="contact-form-section">
        <legend>
          Pièce jointe
          <em className="contact-optional"> — facultatif</em>
        </legend>
        <p className="contact-attachment-hint">
          Vous pouvez joindre un brief, une capture d’écran, un cahier des charges ou une maquette
          en répondant à mon email après l’envoi du formulaire.
        </p>
      </fieldset>

      {status === "success" && (
        <p className="contact-form-feedback contact-form-feedback--success" role="status">
          Message envoyé. Je reviens vers vous rapidement.
        </p>
      )}
      {status === "error" && (
        <p className="contact-form-feedback contact-form-feedback--error" role="alert">
          {errorMessage}
        </p>
      )}

      <div className="contact-form-actions">
        <button
          type="submit"
          className="btn-primary contact-submit"
          disabled={isLoading}
        >
          {isLoading ? "Envoi en cours…" : "Initialiser le projet"}
        </button>
      </div>

      <p className="contact-privacy-note">
        Les informations transmises sont utilisées pour traiter votre demande et vous recontacter.
        En savoir plus :{" "}
        <a href="#politique-confidentialite">Politique de confidentialité</a>.
      </p>
    </form>
  )
}

export default ContactForm
