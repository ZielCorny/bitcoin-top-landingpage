'use client'

import Image from 'next/image'

export default function ContactLegalSection() {
  return (
    <section className="py-16 bg-black text-white mt-24">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="mb-18">
            <div className="text-sm text-white font-mono mb-2 mt-8" style={{ 
              fontFamily: 'zz_type_mon, sans-serif',
              fontWeight: '200',
              fontSize: '16px',
            }}>
              Feedback / Fragen / Kommentare / Kollaborationen
            </div>
            <div 
              className="font-bold text-white mb-8"
              style={{ 
                fontFamily: 'zz_type_exp, sans-serif', 
                fontSize: '88px',
                letterSpacing: '-0.05em',
                fontWeight: '600',
              }}
            >
              hodl@bitcointop.de
            </div>
          </div>
          
          {/* Separator Line */}
          <div className="border-t border-gray-400/50 mb-12 mt-12"></div>
          
          {/* Legal Disclaimer */}
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-[40%] ml-24">
              <h3 
                className="text-white/90 mb-4"
                style={{ 
                  fontFamily: 'zz_type_exp, sans-serif',
                  letterSpacing: '-0.05em',
                  fontWeight: '600',
                  fontSize: '24px'
                }}
              >
                Haftungsausschluss
              </h3>
            </div>
            <div className="lg:w-[60%] mr-24">
              <div 
                className="text-white/60 leading-relaxed text-left"
                style={{ 
                  fontFamily: 'zz_type_mon, monospace',
                  letterSpacing: '-0.01em',
                  fontSize: '12px'
                }}
              >
                <p>
                  Die Inhalte auf dieser Seite, insbesondere der bereitgestellte Bitcoin-Indikator und alle darauf basierenden Informationen, stellen <strong>keine Finanz- oder Anlageberatung</strong> dar. Alle Informationen dienen <strong>ausschließlich zu Informationszwecken</strong> und können sich jederzeit ändern. Die Indikatoren basieren auf historischen Daten und bieten <strong>keinerlei Garantie für zukünftige Marktentwicklungen oder Gewinne</strong>. Investitionen in Kryptowährungen sind mit <strong>erheblichen Risiken</strong> verbunden – ein <strong>Totalverlust</strong> des eingesetzten Kapitals ist möglich. Die Nutzung der Informationen und des Indikators erfolgt ausschließlich auf <strong>Ihr eigenes Risiko</strong>. Wir übernehmen <strong>keine Gewähr</strong> für die Richtigkeit, Vollständigkeit oder Aktualität der Daten und Indikatorsignale. Wir <strong>haften nicht</strong> für Verluste oder Schäden, die direkt oder indirekt aus der Nutzung oder Nichtnutzung der bereitgestellten Informationen entstehen. Bitte triff deine Entscheidungen eigenverantwortlich und ziehe im Zweifel einen <strong>unabhängigen Finanzberater</strong> hinzu.
                </p>
              </div>
            </div>
          </div>

          {/* Separator Line */}
          <div className="border-t border-gray-400/50 mb-12 mt-12"></div>
          
          {/* Footer */}
          <div className="flex justify-between items-end">
              <div className="text-white/60 font-mono" style={{ 
                fontFamily: 'zz_type_mon, sans-serif',
                fontWeight: '200',
                fontSize: '14px'
              }}>
                <a href="/impressum" className="hover:text-white transition-colors">IMPRESSUM</a> | <a href="/datenschutz" className="hover:text-white transition-colors">DATENSCHUTZ</a>
              </div>
            <div className="flex items-end space-x-2">
              <span className="text-white/90 font-mono mb-3 mr-6" style={{ 
                fontFamily: 'zz_type_mon, sans-serif',
                fontWeight: '100',
                fontSize: '12px'
              }}>Ein Projekt von</span>
              <Image
                src="/zielzone_text.svg"
                alt="Zielzone"
                width={160}
                height={32}
                className="h-8 w-auto brightness-0 invert"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
