function AssistantIntro({ onClose }) {
    return (
        <div className="assistant-overlay">
            <div className="assistant-box">
                <p>
                    Bonjour et bienvenue sur le site vitrine de
                    <strong> Hexa Décodeur</strong>.
                </p>
                <p>
                    Je suis son assistant numérique personnel.
                </p>
                <p>
                    Mon rôle : vous guider pendant que mon créateur
                    résout des bugs, cherche des pages 404
                    ou sauve le monde.
                </p>

                <button className="btn-primary" onClick={onClose}>
                    Fermer
                </button>
            </div>
        </div>
    )
}

export default AssistantIntro
