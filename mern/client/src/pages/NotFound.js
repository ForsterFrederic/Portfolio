import React from "react";

const NotFoundPage = ({language}) => {
    return (
        <div className="min-h-screen bg-neutral-900 flex items-center justify-center text-white">
            <div className="text-center">
                <h1 className="text-8xl font-bold text-e28413 mb-12 tprimary">404</h1>
                <p className="text-2xl mb-10">{language === "EN" ? "Oops! The page you are looking for does not exist." : language === "FR" ? "Oups ! La page que vous recherchez n'existe pas." : "Hoppla! Die Seite, die Sie suchen, existiert nicht."}</p>
                <a
                    href="/"
                    className="btn-xl text-lg bg-e28413 px-6 py-3 rounded-full hover:bg-e28413/80 transition-colors"
                >
                    {language === "EN" ? "Go Back to Home" : language === "FR" ? "Retour à l'accueil" : "Zurück zur Startseite"}
                </a>
            </div>
        </div>
    );
};

export default NotFoundPage;