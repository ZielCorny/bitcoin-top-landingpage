'use client'

import ContactLegalSection from '@/components/ContactLegalSection'

export default function DatenschutzPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="hero-top-margin">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* BitcoinTop Logo */}
            <div className="container mx-auto px-4 text-center">
              <a href="/" className="inline-block">
                <h1 className="hero-title font-mono hero-margin text-primary"
                    style={{ 
                      fontFamily: 'zz_type_exp, sans-serif', 
                      fontWeight: '800',
                      letterSpacing: '-0.08em'
                    }}>
                  BitcoinTop
                </h1>
              </a>
            </div>

            {/* Datenschutz Title */}
            <div className="text-center title-container-margin">
              <h2 className="section-title font-bold text-black" style={{ 
                fontFamily: 'zz_type_exp, sans-serif', 
                fontWeight: '600',
                letterSpacing: '-0.08em'
              }}>
                Datenschutzerklärung
              </h2>
            </div>

            {/* Datenschutz Content */}
            <div className="mx-auto" style={{ maxWidth: '38rem' }}>
              <div className="space-y-8 text-black body-text" style={{ 
                fontFamily: 'zz_type_mon, sans-serif', 
                fontWeight: '400',
                lineHeight: '1.6'
              }}>
                {/* Section 1 */}
                <div>
                  <div className="large-section-spacing-margin section-header font-bold text-black" style={{ 
                    fontFamily: 'zz_type_exp, sans-serif', 
                    fontWeight: '700',
                    letterSpacing: '-0.08em'
                  }}>
                    <p>1. Allgemeines</p>
                  </div>
                  <p className="mb-4">
                  Der Schutz Ihrer persönlichen Daten ist uns ein besonderes Anliegen. Wir verarbeiten Ihre Daten daher ausschließlich auf Grundlage der gesetzlichen Bestimmungen (DSGVO, TKG 2003). In dieser Datenschutzerklärung informieren wir Sie über die wichtigsten Aspekte der Datenverarbeitung im Rahmen unserer Website bitcointop.de.
                  </p>
                  <p className="font-bold">Verantwortlicher im Sinne der Datenschutzgesetze ist:</p>
                  <div className="">
                    <p>ZielZone FlexCo</p>
                    <p>Frankgasse 2 / Top 9</p>
                    <p>1090 Wien, Österreich</p>
                    <p>E-Mail: kontakt@zielzone.com</p>
                  </div>
                </div>

                {/* Section 2 */}
                <div>
                  <div className="section-spacing-margin section-header font-bold text-black" style={{ 
                    fontFamily: 'zz_type_exp, sans-serif', 
                    fontWeight: '700',
                    letterSpacing: '-0.08em',
                  }}>
                    <p>2. Erhebung und Speicherung personenbezogener Daten</p>
                  </div>
                  <p>
                  Wir verarbeiten personenbezogene Daten ausschließlich, soweit dies zur Bereitstellung einer funktionsfähigen Website sowie unserer Inhalte und Leistungen erforderlich ist. Die Erhebung und Verwendung personenbezogener Daten erfolgt nur mit Ihrer Einwilligung oder wenn eine gesetzliche Grundlage besteht.
                  </p>
                </div>

                {/* Section 3 */}
                <div>
                  <div className="section-spacing-margin section-header font-bold text-black" style={{ 
                    fontFamily: 'zz_type_exp, sans-serif', 
                    fontWeight: '700',
                    letterSpacing: '-0.08em',
                  }}>
                    <p>3. Hosting</p>
                  </div>
                  <p className="mb-4">
                  Unsere Website wird auf Servern der Amazon Web Services EMEA SARL (AWS) gehostet.
                  </p>
                  <p className="mb-4">
                  AWS verarbeitet personenbezogene Daten ausschließlich im Auftrag und nach Weisung des Betreibers. Die Datenverarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einer sicheren und effizienten Bereitstellung unseres Onlineangebots).
                  </p>
                  <p>
                  AWS ist durch Standardvertragsklauseln der EU-Kommission vertraglich zur Einhaltung der EU-Datenschutzvorgaben verpflichtet. Weitere Informationen: <a href="https://aws.amazon.com/privacy/" className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">https://aws.amazon.com/privacy/</a>
                  </p>
                </div>

                {/* Section 4 */}
                <div>
                  <div className="section-spacing-margin section-header font-bold text-black" style={{ 
                    fontFamily: 'zz_type_exp, sans-serif', 
                    fontWeight: '700',
                    letterSpacing: '-0.08em',
                  }}>
                    <p>4. Cookies und Einwilligungsmanagement</p>
                  </div>
                  <p className="mb-4">
                  Diese Website verwendet Cookiebot der FirmaDie Rechtsgrundlage für den Einsatz von Cookiebot ist Usercentrics A/S , Havnegade 39, 1058 Kopenhagen, Dänemark, um die Einwilligung zur Speicherung bestimmter Cookies einzuholen und datenschutzkonform zu dokumentieren.
                  </p>
                  <p className="mb-4">
                  Art. 6 Abs. 1 lit. c DSGVO (rechtliche Verpflichtung).
                  </p>
                  <p>
                    Weitere Informationen: <a href="https://www.cookiebot.com/de/privacy-policy/" className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">https://www.cookiebot.com/de/privacy-policy/</a>
                  </p>
                </div>

                {/* Section 5 */}
                <div>
                  <div className="section-spacing-margin section-header font-bold text-black" style={{ 
                    fontFamily: 'zz_type_exp, sans-serif', 
                    fontWeight: '700',
                    letterSpacing: '-0.08em',
                  }}>
                    <p>5. Webanalyse mit Google Analytics</p>
                  </div>
                  <p className="mb-4">
                  Diese Website verwendet Google Analytics , einen Webanalysedienst der Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland.
                  </p>
                  <p className="mb-4">
                  Google Analytics verwendet Cookies, die eine Analyse der Benutzung der Website ermöglichen. Die erzeugten Informationen werden in der Regel an einen Server von Google in den USA übertragen und dort gespeichert.
                  </p>
                  <p className="mb-4">
                  Wir verwenden Google Analytics mit aktivierter IP-Anonymisierung, sodass Ihre IP-Adresse vor der Übertragung in die USA gekürzt wird.
                  </p>
                  <p className="mb-4">
                  Rechtsgrundlage ist Ihre Einwilligung gemäß Art. 6 Abs. 1 lit. a DSGVO .
                  </p>
                  <p className="mb-4">
                  Sie können Ihre Einwilligung jederzeit über das Cookiebot-Banner widerrufen.
                  </p>
                  <p>
                    Weitere Informationen: <a href="https://policies.google.com/privacy" className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">https://policies.google.com/privacy</a>
                  </p>
                </div>

                {/* Section 6 */}
                <div>
                  <div className="section-spacing-margin section-header font-bold text-black" style={{ 
                    fontFamily: 'zz_type_exp, sans-serif', 
                    fontWeight: '700',
                    letterSpacing: '-0.08em',
                  }}>
                    <p>6. Newsletter und E-Mail-Kommunikation (ActiveCampaign)</p>
                  </div>
                  <p className="mb-4">
                  Wenn Sie sich für unseren E-Mail-Newsletter anmelden, werden Ihre Daten (E-Mail-Adresse, ggf. IP-Adresse, Anmeldezeitpunkt) bei ActiveCampaign LLC , 1 North Dearborn Street, 5th Floor, Chicago, IL 60602, USA, gespeichert.
                  </p>
                  <p className="mb-4">
                  ActiveCampaign verarbeitet diese Daten im Auftrag von ZielZone FlexCo, um Newsletter zu versenden und Interaktionen (z. B. Öffnungen, Klicks) auszuwerten.
                  </p>
                  <p className="mb-4">
                  Die Datenverarbeitung erfolgt auf Grundlage Ihrer Einwilligung gemäß Art. 6 Abs. 1 lit. a DSGVO .
                  </p>
                  <p className="mb-4">
                  Sie können Ihre Einwilligung jederzeit durch Abmeldung vom Newsletter widerrufen.
                  </p>
                  <p className="mb-4">
                  ActiveCampaign ist durch EU-Standardvertragsklauseln zur Einhaltung der europäischen Datenschutzstandards verpflichtet.
                  </p>
                  <p>
                    Mehr Infos: <a href="https://www.activecampaign.com/legal/privacy-policy" className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">https://www.activecampaign.com/legal/privacy-policy</a>
                  </p>
                </div>

                {/* Section 7 */}
                <div>
                  <div className="section-spacing-margin section-header font-bold text-black" style={{ 
                    fontFamily: 'zz_type_exp, sans-serif', 
                    fontWeight: '700',
                    letterSpacing: '-0.08em',
                  }}>
                    <p>7. Eingebettete Inhalte (YouTube)</p>
                  </div>
                  <p className="mb-4">
                  Unsere Website kann Videos von YouTube (Google Ireland Limited) einbetten. Beim Aufruf einer Seite mit eingebettetem YouTube-Video wird eine Verbindung zu den Servern von YouTube hergestellt.
                  </p>
                  <p className="mb-4">
                  Dabei kann YouTube Cookies setzen und Daten (z. B. IP-Adresse, aufgerufene Seiten) erfassen.
                  </p>
                  <p className="mb-4">
                  Die Datenverarbeitung erfolgt auf Grundlage Ihrer Einwilligung gemäß Art. 6 Abs. 1 lit. a DSGVO .
                  </p>
                  <p>
                    Weitere Informationen: <a href="https://policies.google.com/privacy" className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">https://policies.google.com/privacy</a>
                  </p>
                </div>

                {/* Section 8 */}
                <div>
                  <div className="section-spacing-margin section-header font-bold text-black" style={{ 
                    fontFamily: 'zz_type_exp, sans-serif', 
                    fontWeight: '700',
                    letterSpacing: '-0.08em',
                  }}>
                    <p>8. Ihre Rechte</p>
                  </div>
                  <p className="mb-4">
                  Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit, Widerruf und Widerspruch.
                  </p>
                  <p>
                  Wenn Sie glauben, dass die Verarbeitung Ihrer Daten gegen das Datenschutzrecht verstößt, können Sie sich bei der Datenschutzbehörde beschweren. In Österreich ist dies die Datenschutzbehörde (DSB) , Barichgasse 40–42, 1030 Wien.
                  </p>
                </div>

                {/* Section 9 */}
                <div>
                  <div className="section-spacing-margin section-header font-bold text-black" style={{ 
                    fontFamily: 'zz_type_exp, sans-serif', 
                    fontWeight: '700',
                    letterSpacing: '-0.08em',
                  }}>
                    <p>9. Kontaktaufnahme</p>
                  </div>
                  <p>
                  Wenn Sie per E-Mail Kontakt mit uns aufnehmen, werden Ihre angegebenen Daten zur Bearbeitung der Anfrage verwendet. Die Datenverarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche Maßnahmen).
                  </p>
                </div>

                {/* Section 10 */}
                <div>
                  <div className="section-spacing-margin section-header font-bold text-black" style={{ 
                    fontFamily: 'zz_type_exp, sans-serif', 
                    fontWeight: '700',
                    letterSpacing: '-0.08em',
                  }}>
                    <p>10. Änderungen dieser Datenschutzerklärung</p>
                  </div>
                  <p className="mb-64">
                  Wir behalten uns vor, diese Datenschutzerklärung bei Bedarf anzupassen, um sie an geänderte rechtliche oder technische Anforderungen anzupassen. Es gilt jeweils die aktuelle auf dieser Website veröffentlichte Fassung.                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ContactLegalSection />
    </main>
  )
}
