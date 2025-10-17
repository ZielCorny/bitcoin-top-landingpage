'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function ContactLegalSection() {
  return (
    <section className="py-16 bg-black text-white mt-24">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="container-margin">
            <div className="text-sm text-white font-mono mb-2 mt-4 sm:mt-6 md:mt-8 contact-label" style={{ 
              fontFamily: 'zz_type_mon, sans-serif',
              fontWeight: '200'
            }}>
              Feedback / Fragen / Kommentare / Kollaborationen
            </div>
            <div 
              className="font-bold text-white mb-6 sm:mb-8 email-address"
              style={{ 
                fontFamily: 'zz_type_exp, sans-serif', 
                letterSpacing: '-0.05em',
                fontWeight: '600',
              }}
            >
              <a href="mailto:hodl@bitcointop.de">hodl@bitcointop.de</a>
            </div>
          </div>
          
          {/* Separator Line */}
          <div className="border-t border-gray-400/50 separator-margin"></div>
          
          {/* Legal Disclaimer */}
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-[40%] lg:ml-24">
              <h3 
                className="text-white/90 mb-4 disclaimer-title"
                style={{ 
                  fontFamily: 'zz_type_exp, sans-serif',
                  letterSpacing: '-0.05em',
                  fontWeight: '600'
                }}
              >
                Haftungsausschluss
              </h3>
            </div>
            <div className="lg:w-[60%] lg:mr-24">
              <div 
                className="text-white/60 leading-relaxed text-left disclaimer-text"
                style={{ 
                  fontFamily: 'zz_type_mon, monospace',
                  letterSpacing: '-0.01em'
                }}
              >
                <p>
                  Die Inhalte auf dieser Seite, insbesondere der bereitgestellte Bitcoin-Indikator und alle darauf basierenden Informationen, stellen <strong>keine Finanz- oder Anlageberatung</strong> dar. Alle Informationen dienen <strong>ausschließlich zu Informationszwecken</strong> und können sich jederzeit ändern. Die Indikatoren basieren auf historischen Daten und bieten <strong>keinerlei Garantie für zukünftige Marktentwicklungen oder Gewinne</strong>. Investitionen in Kryptowährungen sind mit <strong>erheblichen Risiken</strong> verbunden – ein <strong>Totalverlust</strong> des eingesetzten Kapitals ist möglich. Die Nutzung der Informationen und des Indikators erfolgt ausschließlich auf <strong>Ihr eigenes Risiko</strong>. Wir übernehmen <strong>keine Gewähr</strong> für die Richtigkeit, Vollständigkeit oder Aktualität der Daten und Indikatorsignale. Wir <strong>haften nicht</strong> für Verluste oder Schäden, die direkt oder indirekt aus der Nutzung oder Nichtnutzung der bereitgestellten Informationen entstehen. Bitte triff deine Entscheidungen eigenverantwortlich und ziehe im Zweifel einen <strong>unabhängigen Finanzberater</strong> hinzu.
                </p>
              </div>
            </div>
          </div>

          {/* Separator Line */}
          <div className="border-t border-gray-400/50 separator-margin"></div>
          
          {/* Footer */}
          <div className="flex flex-col sm:flex-row justify-between items-center sm:items-end space-y-4 sm:space-y-0">
              <div className="text-white/60 font-mono small-text" style={{ 
                fontFamily: 'zz_type_mon, sans-serif',
                fontWeight: '200'
              }}>
                <Link href="/impressum" className="hover:text-white transition-colors">IMPRESSUM</Link> | <Link href="/datenschutz" className="hover:text-white transition-colors">DATENSCHUTZ</Link>
              </div>
            <div className="flex items-center space-x-2">
              <span className="text-white/90 font-mono extra-small-text" style={{ 
                fontFamily: 'zz_type_mon, sans-serif',
                fontWeight: '100'
              }}>Ein Projekt von</span>
              <Image
                src="/zielzone_text.svg"
                alt="Zielzone"
                width={160}
                height={32}
                className="h-6 sm:h-7 md:h-8 w-auto brightness-0 invert"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
