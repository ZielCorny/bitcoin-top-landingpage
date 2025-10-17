'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import BitcoinRiskChart from '@/components/BitcoinRiskChart'
import ContactLegalSection from '@/components/ContactLegalSection'
import BitcoinTopGauge from '@/components/BitcoinTopGauge'
import SignalNotificationSection from '@/components/SignalNotificationSection'

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">

      {/* Hero Section with Score */}
      <section className="hero-top-margin">
        <div className="container mx-auto px-4 text-center">
          <h1 className="hero-title font-mono hero-margin text-primary"
              style={{ 
                fontFamily: 'zz_type_exp, sans-serif', 
                fontWeight: '800',
                letterSpacing: '-0.08em'
              }}>
            BitcoinTop
          </h1>
          
          {/* Bitcoin Top Gauge */}
          <div className="">
              <BitcoinTopGauge />
          </div>
          {/*}
          <div className="absolute top-0 left-0 w-full h-full z-0">
            <ConfidenceGauge confidence={78} className="mt-60" />
          </div>*/}
        </div>
      </section>

      {/* Signal Notifications Section */}
      <SignalNotificationSection />

      {/* Trading Chart Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
            <h2 className="section-title font-bold text-center text-primary section-margin" style={{ 
              fontFamily: 'zz_type_exp, sans-serif', 
              fontWeight: '600',
              letterSpacing: '-0.08em'
            }}>
              Der BitcoinTop im historischen Verlauf
            </h2>
            {/*<p className="text-xl text-center mb-16 text-foreground" style={{ 
              fontFamily: 'zz_type_mon, sans-serif', 
              fontWeight: '400'
            }}>
              So reagierte der Indikator in früheren Zyklen
            </p>*/}
          <div className="max-w-6xl mx-auto">
            {/* Chart Display */}
            <div className="mb-6">
              <BitcoinRiskChart height={700} />
            </div>
            </div>
          </div>
        </section>

      {/* BitcoinTop Info Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto mt-32">
            {/* Main Title */}
            <h2 className="large-title font-bold large-section-margin text-black" style={{ 
              fontFamily: 'zz_type_exp, sans-serif', 
              fontWeight: '800',
              letterSpacing: '-0.08em',
            }}>
              Dein <span className="text-[hsl(var(--signal))]">objektiver Blick</span><br></br> auf Bitcoin.
            </h2>
            
            <div className="grid items-start ml-14 mr-8" style={{ gridTemplateColumns: '17% 83%' }}>
              <div></div>
            {/* Subtitle */}
              <p className="subtitle text-black large-section-margin" style={{ 
                fontFamily: 'zz_type_exp, sans-serif', 
                fontWeight: '500',
                letterSpacing: '-0.05em',
                lineHeight: '1.2'
              }}>
              Niemand kann die Zukunft vorhersagen<br />
                — aber wir können Daten nutzen, um die<br />
                Gegenwart zu interpretieren.
              </p>
            </div>

            {/* Content Blocks */}
            <div className="space-y-16 ml-14 md:ml-14 sm:ml-0">
              {/* Section 1: Was er macht */}
              <div className="hidden md:grid items-start mr-10" style={{ gridTemplateColumns: '17% 37% 1fr' }}>
                <div></div>
                <div className="flex flex-col gap-2">
                  <svg width="2rem" viewBox="0 0 138 90" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color: 'hsl(var(--signal))' }}>
                    <path d="M138 45L92.8519 90L80.5852 77.6038L104.778 53.4906H0V36.5094H104.778L80.5852 12.2264L92.8519 0L138 45Z" fill="currentColor"/>
                  </svg>
                  <h3 className="small-title font-bold text-black" style={{ 
                    fontFamily: 'zz_type_exp, sans-serif', 
                    fontWeight: '700',
                    letterSpacing: '-0.05em'
                  }}>
                    Was er macht
                  </h3>
                </div>
                <div>
                  <p className="text-black leading-relaxed body-text" style={{ 
                    fontFamily: 'zz_type_mon, sans-serif', 
                    fontWeight: '400'
                  }}>
                    Der BitcoinTop Indikator zeigt dir auf einen Blick, <strong>wo sich Bitcoin im aktuellen Marktzyklus befindet</strong>. Statt dich durch Charts und Daten zu kämpfen, bekommst du eine <strong>objektive Einordnung</strong> der aktuellen Phase – verdichtet in einer Zahl zwischen <strong>0 und 100</strong>. So siehst du sofort, wie weit wir vom nächsten Top oder Boden entfernt sind, und kannst Marktbewegungen besser verstehen und einordnen.
                  </p>
                </div>
              </div>
              
              {/* Mobile layout for Section 1 */}
              <div className="md:hidden">
                <h3 className="text-2xl font-bold text-black mb-4" style={{ 
                  fontFamily: 'zz_type_exp, sans-serif', 
                  fontWeight: '700'
                }}>
                  Was er macht
                </h3>
                <p className="text-black leading-relaxed body-text" style={{ 
                  fontFamily: 'zz_type_mon, sans-serif', 
                  fontWeight: '400'
                }}>
                  Der BitcoinTop Indikator zeigt dir auf einen Blick, <strong>wo sich Bitcoin im aktuellen Marktzyklus befindet</strong>. Statt Stunden in Charts, News und Sentiment-Analysen zu stecken, bekommst du eine <strong>objektive Einordnung</strong> in einer Zahl: dem <strong>BitcoinTop Risk Score</strong>. Er reicht von <strong>0 und 100</strong> – und spiegelt wider, ob <strong>Gier oder Angst</strong> gerade den Markt dominieren. So kannst du besser entscheiden, wann es Zeit ist vorsichtiger oder mutiger zu sein.
                </p>
              </div>
              
              {/* Horizontal line between sections */}
              <div className="hidden md:grid items-start" style={{ gridTemplateColumns: '13% 40% 1fr' }}>
                <div></div>
                <div className="col-span-2">
                  <hr className="border-t" style={{ borderColor: 'hsl(var(--line-color))' }} />
                </div>
              </div>

              {/* Section 2: Wie er funktioniert */}
              <div className="hidden md:grid items-start mr-10" style={{ gridTemplateColumns: '17% 37% 1fr' }}>
                <div></div>
                <div className="flex flex-col gap-2">
                  <svg width="2rem" height="2rem" viewBox="0 0 138 90" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color: 'hsl(var(--signal))' }}>
                    <path d="M138 45L92.8519 90L80.5852 77.6038L104.778 53.4906H0V36.5094H104.778L80.5852 12.2264L92.8519 0L138 45Z" fill="currentColor"/>
                  </svg>
                  <h3 className="small-title font-bold text-black" style={{ 
                    fontFamily: 'zz_type_exp, sans-serif', 
                    fontWeight: '700',
                    letterSpacing: '-0.05em'
                  }}>
                    Wie er funktioniert
                  </h3>
                </div>
                <div>
                  <p className="text-black leading-relaxed body-text" style={{ 
                    fontFamily: 'zz_type_mon, sans-serif', 
                    fontWeight: '400'
                  }}>
                    Unter der Haube läuft ein <strong>Machine-Learning-Modell</strong>, das sieben präzise ausgewählte Indikatoren kombiniert – aus <strong>technischer Analyse, On-Chain-Daten, Sentiment und Makro-Trends</strong>. Keine Überfrachtung, kein Datenrauschen. Nur das, was wirklich zählt. Das Ergebnis ist ein klares, konsistentes Signal mit <strong>nachweisbarem Track Record seit 2017</strong>.
                  </p>
                </div>
              </div>
              
              {/* Mobile layout for Section 2 */}
              <div className="md:hidden">
                <h3 className="text-2xl font-bold text-black mb-4" style={{ 
                  fontFamily: 'zz_type_exp, sans-serif', 
                  fontWeight: '700'
                }}>
                  Wie er funktioniert
                </h3>
                <p className="text-black leading-relaxed body-text" style={{ 
                  fontFamily: 'zz_type_mon, sans-serif', 
                  fontWeight: '400'
                }}>
                  Unter der Haube läuft ein <strong>Machine-Learning-Modell</strong>, das sieben präzise ausgewählte Indikatoren kombiniert – aus <strong>technischer Analyse, On-Chain-Daten, Sentiment und Makro-Trends</strong>. Keine Überfrachtung, kein Datenrauschen. Nur das, was wirklich zählt. Das Ergebnis ist ein klares, konsistentes Signal mit <strong>nachweisbarem Track Record seit 2017</strong>.
                </p>
              </div>
              
              {/* Horizontal line between sections */}
              <div className="hidden md:grid items-start" style={{ gridTemplateColumns: '13% 40% 1fr' }}>
                <div></div>
                <div className="col-span-2">
                  <hr className="border-t" style={{ borderColor: 'hsl(var(--line-color))' }} />
                </div>
              </div>

              {/* Section 3: Wer dahinter steckt */}
              <div className="hidden md:grid items-start mr-10" style={{ gridTemplateColumns: '17% 37% 1fr' }}>
                <div></div>
                <div className="flex flex-col gap-2">
                  <svg width="2rem" height="2rem" viewBox="0 0 138 90" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color: 'hsl(var(--signal))' }}>
                    <path d="M138 45L92.8519 90L80.5852 77.6038L104.778 53.4906H0V36.5094H104.778L80.5852 12.2264L92.8519 0L138 45Z" fill="currentColor"/>
                  </svg>
                  <h3 className="small-title font-bold text-black" style={{ 
                    fontFamily: 'zz_type_exp, sans-serif', 
                    fontWeight: '700',
                    letterSpacing: '-0.05em'
                  }}>
                    Wer dahinter steckt
                  </h3>
                </div>
                <div>
                  <p className="text-black leading-relaxed body-text" style={{ 
                    fontFamily: 'zz_type_mon, sans-serif', 
                    fontWeight: '400'
                  }}>
                    Wir sind eine Gruppe von <strong>Bitcoin-Enthusiasten und Datennerds</strong>, die Marktzyklen verstehen wollen, statt ihnen hinterherzulaufen. Mit dem BitcoinTop Indikator teilen wir ein Werkzeug, das uns selbst hilft, klarer zu sehen und besser einzuordnen, was am Markt passiert – <strong>ohne Spekulation</strong>, <strong>ohne Hype</strong>. Ein unabhängiges Projekt für alle, die Bitcoin mit Verstand betrachten wollen.
                  </p>
                </div>
              </div>

              {/* Horizontal line between sections */}
              <div className="hidden md:grid items-start" style={{ gridTemplateColumns: '13% 40% 1fr' }}>
                <div></div>
                <div className="col-span-2">
                  <hr className="border-t" style={{ borderColor: 'hsl(var(--line-color))' }} />
                </div>
              </div>
              
              {/* Mobile layout for Section 3 */}
              <div className="md:hidden">
                <h3 className="text-2xl font-bold text-black mb-4" style={{ 
                  fontFamily: 'zz_type_exp, sans-serif', 
                  fontWeight: '700'
                }}>
                  Wer dahinter steckt
                </h3>
                <p className="text-black leading-relaxed body-text" style={{ 
                  fontFamily: 'zz_type_mon, sans-serif', 
                  fontWeight: '400'
                }}>
                  Wir sind eine Gruppe von <strong>Bitcoin-Enthusiasten und Datennerds</strong>, die Marktzyklen verstehen wollen, statt ihnen hinterherzulaufen. Mit dem BitcoinTop Indikator teilen wir ein Werkzeug, das uns selbst hilft, <strong>ohne Spekulation, ohne Hype</strong> ruhiger und rationaler zu investieren. Kostenlos, transparent und offen für alle, die Bitcoin wirklich verstehen wollen.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 mt-32">
        <div className="container mx-auto px-4">
          <h2 className="section-title font-bold text-center text-primary section-margin" style={{ 
              fontFamily: 'zz_type_exp, sans-serif', 
              fontWeight: '600',
              letterSpacing: '-0.08em'
            }}>
              Häufige Fragen
          </h2>
            <div className="mx-auto" style={{ maxWidth: '47rem' }}>
            <Accordion type="single" collapsible className="space-y-1">
              <AccordionItem value="item-1" className="bg-transparent">
                 <AccordionTrigger>
                Wie entsteht der BitcoinTop Indikator?
                </AccordionTrigger>
                <AccordionContent>
                Der Indikator kombiniert sieben zentrale Datenquellen aus technischer Analyse, On-Chain-Daten und makroökonomischen Faktoren. Mithilfe von Machine Learning werden diese Indikatoren gewichtet, um daraus ein möglichst präzises Gesamtbild des Marktrisikos zu berechnen.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2" className="bg-transparent">
                 <AccordionTrigger>
                Warum nur sieben Indikatoren?
                </AccordionTrigger>
                <AccordionContent>
                Viele Modelle nutzen 20 oder mehr Signale – aber mehr ist nicht immer besser. Unsere Tests zeigen: Nur eine fokussierte Auswahl liefert wirklich konsistente Ergebnisse. Die sieben gewählten Indikatoren bieten den besten Mix aus Präzision und Robustheit, was wir durch jahrelange Backtests belegen konnten.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3" className="bg-transparent">
                 <AccordionTrigger>
                Kann der BitcoinTop die Zukunft vorhersagen?
                </AccordionTrigger>
                <AccordionContent>
                Natürlich nicht – niemand kann das. Aber unser Modell erkennt mit hoher Genauigkeit den aktuellen Zustand des Marktes: ob er überhitzt, überkauft oder in einer neutralen Zone ist. Du bekommst also eine objektive Momentaufnahme, die hilft, das Risiko besser einzuordnen.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4" className="bg-transparent">
                 <AccordionTrigger>
                Sollte ich meine Trades nach dem Indikator richten?
                </AccordionTrigger>
                <AccordionContent>
                Nein. Der BitcoinTop ist kein Handelssignal, sondern ein Werkzeug zur Orientierung. Investitionsentscheidungen hängen von vielen individuellen Faktoren ab – unser Indikator soll dich dabei unterstützen, rationaler zu bleiben und Emotionen aus dem Spiel zu nehmen.
                </AccordionContent>
              </AccordionItem>
              
                <AccordionItem value="item-5" className="bg-transparent">
                 <AccordionTrigger>
                  Wie oft wird der Indikator aktualisiert?
                  </AccordionTrigger>
                  <AccordionContent>
                  Einmal pro Stunde. So bleibst du immer nah am Marktgeschehen, ohne ständig Charts refreshen zu müssen.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-6" className="bg-transparent">
                 <AccordionTrigger>
                  Wird der Indikator weiterentwickelt?
                  </AccordionTrigger>
                  <AccordionContent>
                  Ja, ständig. Märkte verändern sich, also entwickeln wir unser Modell kontinuierlich weiter – mit neuen Daten, besseren Methoden und laufender Optimierung.
                  </AccordionContent>
                </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      <ContactLegalSection />
    </main>
  )
}
