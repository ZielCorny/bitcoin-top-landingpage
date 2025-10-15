'use client'

import ContactLegalSection from '@/components/ContactLegalSection'

export default function ImpressumPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="mt-32">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* BitcoinTop Logo */}
            <div className="container mx-auto px-4 text-center">
              <a href="/" className="inline-block">
                <h1 className="text-7xl md:text-8xl lg:text-8xl xl:text-[10rem] font-mono mb-24 text-primary hover:text-primary/80 transition-colors"
                    style={{ 
                      fontFamily: 'zz_type_exp, sans-serif', 
                      fontWeight: '800',
                      letterSpacing: '-0.08em',
                      fontSize: '170px'
                    }}>
                  Bitcoin Top
                </h1>
              </a>
            </div>

            {/* Impressum Title */}
            <div className="text-center mb-24">
              <h2 className="md:text-5xl font-bold text-black" style={{ 
                fontFamily: 'zz_type_exp, sans-serif', 
                fontWeight: '600',
                letterSpacing: '-0.08em',
                fontSize: '49px'
              }}>
                Impressum
              </h2>
            </div>

            {/* Impressum Content */}
            <div className="mx-auto" style={{ maxWidth: '38rem' }}>
              <div className="space-y-8 text-black" style={{ 
                fontFamily: 'zz_type_mon, sans-serif', 
                fontWeight: '400',
                fontSize: '16px',
                lineHeight: '1.6'
              }}>
                <div>
                  <p><strong>Betreiber der Website</strong></p>
                  <p>ZielZone FlexCo</p>
                  <p>Frankgasse 2 / Top 9</p>
                  <p>1090 Wien</p>
                  <p>Österreich</p>
                </div>

                <div>
                  <p><strong>E-Mail:</strong><br></br> hodl@bitcointop.de</p>
                </div>

                <div>
                  <p><strong>Firmenbuchnummer:</strong><br></br> FN 658888d</p>
                </div>

                <div>
                  <p><strong>Umsatzsteuer-Identifikationsnummer:</strong><br></br> ATU82421826</p>
                </div>

                <div>
                  <p><strong>Vertretungsberechtigter Geschäftsführer:</strong><br></br> Daniel Thaller</p>
                </div>

                <div>
                  <p><strong>Verantwortlich für den Inhalt gemäß § 5 TMG und § 25 MedienG:</strong><br></br> Daniel Thaller</p>
                </div>
              </div>

              {/* Disclaimer Title */}
              <div className="mt-24 mb-12 md:text-5xl font-bold text-black" style={{ 
                  fontFamily: 'zz_type_exp, sans-serif', 
                  fontWeight: '700',
                  letterSpacing: '-0.08em',
                  fontSize: '32px'
                }}>
                <p>Haftungsausschluss (Disclaimer)</p>
              </div>

              {/* Disclaimer Content */}
              <div className="space-y-6 text-black mb-64" style={{ 
                fontFamily: 'zz_type_mon, sans-serif', 
                fontWeight: '400',
                fontSize: '16px',
                lineHeight: '1.6'
              }}>
                <p>
                  Die auf dieser Website bereitgestellten Informationen dienen ausschließlich allgemeinen Informationszwecken. ZielZone FlexCo übernimmt keine Gewähr für die Aktualität, Richtigkeit oder Vollständigkeit der bereitgestellten Inhalte.
                </p>

                <p>
                  Die dargestellten Daten, Analysen und Indikatoren stellen <strong>keine Anlageberatung, Empfehlung oder Aufforderung zum Kauf oder Verkauf von Finanzinstrumenten</strong> dar. Nutzerinnen und Nutzer treffen ihre Anlageentscheidungen eigenverantwortlich und auf eigenes Risiko.
                </p>

                <p>
                  ZielZone FlexCo haftet nicht für Schäden materieller oder immaterieller Art, die durch die Nutzung oder Nichtnutzung der bereitgestellten Informationen entstehen, sofern kein nachweislich vorsätzliches oder grob fahrlässiges Verschulden vorliegt.
                </p>

                <p>
                  Trotz sorgfältiger inhaltlicher Kontrolle übernimmt ZielZone FlexCo keine Haftung für die Inhalte externer Links. Für den Inhalt verlinkter Seiten sind ausschließlich deren Betreiber verantwortlich.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ContactLegalSection />
    </main>
  )
}