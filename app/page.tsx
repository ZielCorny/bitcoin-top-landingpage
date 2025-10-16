'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import BitcoinRiskChart from '@/components/BitcoinRiskChart'
import ContactLegalSection from '@/components/ContactLegalSection'
import BitcoinTopGauge from '@/components/BitcoinTopGauge'

export default function Home() {
  const [formData, setFormData] = useState({ firstName: '', email: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [validationErrors, setValidationErrors] = useState({ firstName: '', email: '' })
  const [showSignup, setShowSignup] = useState(false)
  const [signupData, setSignupData] = useState({ email: '' })
  const [signupErrors, setSignupErrors] = useState({ email: '' })
  const [isSignupSubmitting, setIsSignupSubmitting] = useState(false)
  const [isSignupSubmitted, setIsSignupSubmitted] = useState(false)
  const [isUserSignedUp, setIsUserSignedUp] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate email field
    const errors = { firstName: '', email: '' }
    const trimmedEmail = formData.email.trim()
    if (!trimmedEmail) {
      errors.email = 'Email is required'
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(trimmedEmail)) {
      if (!trimmedEmail.includes('@')) {
        errors.email = `Please include an '@' in the email address. '${trimmedEmail}' is missing an '@'.`
      } else if (!trimmedEmail.includes('.')) {
        errors.email = `Please include a '.' in the email address. '${trimmedEmail}' is missing a '.'.`
      } else {
        errors.email = `Please enter a valid email address. '${trimmedEmail}' is not a valid email.`
      }
    }
    
    setValidationErrors(errors)
    
    if (errors.email) {
      return
    }
    
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
    setIsUserSignedUp(true)
    setFormData({ firstName: '', email: '' })
    setValidationErrors({ firstName: '', email: '' })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear validation error when user starts typing
    if (validationErrors[name as keyof typeof validationErrors]) {
      setValidationErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    let errorMessage = ''
    
    if (name === 'firstName' && !value.trim()) {
      errorMessage = 'First name is required'
    } else if (name === 'email') {
      const trimmedValue = value.trim()
      if (!trimmedValue) {
        errorMessage = 'Email is required'
      } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(trimmedValue)) {
        if (!trimmedValue.includes('@')) {
          errorMessage = `Please include an '@' in the email address. '${trimmedValue}' is missing an '@'.`
        } else if (!trimmedValue.includes('.')) {
          errorMessage = `Please include a '.' in the email address. '${trimmedValue}' is missing a '.'.`
        } else {
          errorMessage = `Please enter a valid email address. '${trimmedValue}' is not a valid email.`
        }
      }
    }
    
    setValidationErrors(prev => ({ ...prev, [name]: errorMessage }))
  }

  const handleSignupInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setSignupData(prev => ({ ...prev, [name]: value }))
    
    // Clear validation error when user starts typing
    if (signupErrors[name as keyof typeof signupErrors]) {
      setSignupErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleSignupInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    let errorMessage = ''
    
    if (name === 'email') {
      if (!value.trim()) {
        errorMessage = 'Email is required'
      } else {
        const trimmedValue = value.trim()
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(trimmedValue)) {
          if (!trimmedValue.includes('@')) {
            errorMessage = `Please include an '@' in the email address. '${trimmedValue}' is missing an '@'.`
          } else if (!trimmedValue.includes('.')) {
            errorMessage = `Please include a '.' in the email address. '${trimmedValue}' is missing a '.'.`
          } else {
            errorMessage = `Please enter a valid email address. '${trimmedValue}' is not a valid email.`
          }
        }
      }
    }
    
    setSignupErrors(prev => ({ ...prev, [name]: errorMessage }))
  }

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate email field
    const errors = { email: '' }
    
    if (!signupData.email.trim()) {
      errors.email = 'Email is required'
    } else {
      const trimmedEmail = signupData.email.trim()
      if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(trimmedEmail)) {
        if (!trimmedEmail.includes('@')) {
          errors.email = `Please include an '@' in the email address. '${trimmedEmail}' is missing an '@'.`
        } else if (!trimmedEmail.includes('.')) {
          errors.email = `Please include a '.' in the email address. '${trimmedEmail}' is missing a '.'.`
        } else {
          errors.email = `Please enter a valid email address. '${trimmedEmail}' is not a valid email.`
        }
      }
    }
    
    setSignupErrors(errors)
    
    if (errors.email) {
      return
    }
    
    setIsSignupSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsSignupSubmitting(false)
    setIsSignupSubmitted(true)
    setIsUserSignedUp(true)
    setSignupData({ email: '' })
    setSignupErrors({ email: '' })
  }
  return (
    <main className="min-h-screen bg-background text-foreground">

      {/* Hero Section with Score */}
      <section className="mt-32">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-7xl md:text-8xl lg:text-8xl xl:text-[10rem] font-mono mb-16 text-primary"
              style={{ 
                fontFamily: 'zz_type_exp, sans-serif', 
                fontWeight: '800',
                letterSpacing: '-0.08em',
                fontSize: '170px'
              }}>
            Bitcoin Top
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
      <section className="py-16 bg-[#1a1a1a] relative mb-24">
        {/* Top border line */}
        <div className="absolute top-0 left-0 w-full h-px bg-[#42b8c1]"></div>
        {/* Bottom border line */}
        <div className="absolute bottom-0 left-0 w-full h-px bg-[#4285f4]"></div>
        
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            {/* Main heading */}
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8" style={{ 
              fontFamily: 'zz_type_exp, sans-serif', 
              fontWeight: '600',
              letterSpacing: '-0.06em'
            }}>
              Kein Top verpassen
            </h2>
            
            {/* Subheading */}
            <p className="text-white mb-8" style={{ 
              fontFamily: 'zz_type_mon, sans-serif', 
              fontWeight: '200',
              fontSize: '20px',
              letterSpacing: '-0.01em'
            }}>
              Erhalte eine Nachricht, sobald sich etwas bewegt.
            </p>
            
            {isSubmitted ? (
              <div className="text-center py-8">
                <div className="text-2xl font-bold text-white mb-2" style={{ 
                  fontFamily: 'zz_type_exp, sans-serif', 
                  fontWeight: '800'
                }}>✓ Erfolgreich abonniert!</div>
                <p className="text-white/70" style={{ 
                  fontFamily: 'zz_type_exp, sans-serif'
                }}>Du erhältst jetzt Benachrichtigungen über neue Signale.</p>
              </div>
            ) : isSubmitting ? (
              <div className="text-center py-8">
                <div className="flex justify-center mb-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                </div>
                <p className="text-white/70" style={{ 
                  fontFamily: 'zz_type_exp, sans-serif'
                }}>Wird abonniert...</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-2">
                {/* Email input and button container */}
                <div className="relative">
                  <div className="flex rounded-full border-2 border-[hsl(var(--signal))] bg-[#151515] overflow-hidden">
                    <input
                      type="text"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      onBlur={handleInputBlur}
                      placeholder="Deine Email"
                      className="flex-1 px-6 py-3 bg-transparent text-xl text-white placeholder:text-white/60 focus:outline-none"
                      style={{ 
                        fontFamily: 'zz_type_mon, sans-serif',
                        fontWeight: '500'
                      }}
                    />
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="text-lg px-8 py-3 bg-[hsl(var(--signal))] text-white hover:opacity-90 transition-colors disabled:opacity-50 rounded-full m-2"
                      style={{ 
                        fontFamily: 'zz_type_mon, sans-serif',
                        letterSpacing: '0.05em'
                      }}
                    >
                      {isSubmitting ? 'ABONNIEREN...' : 'JETZT ABONNIEREN'}
                    </button>
                  </div>
                  
                  {validationErrors.email && (
                    <div className="absolute top-full left-0 mt-2 z-50">
                      <div className="bg-white border border-gray-300 rounded-lg shadow-lg p-3 max-w-xs">
                        <div className="flex items-start space-x-2">
                          <div className="w-4 h-4 bg-red-500 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-white text-xs font-bold">!</span>
                          </div>
                          <p className="text-gray-800 text-sm leading-relaxed">{validationErrors.email}</p>
                        </div>
                        <div className="absolute -top-1 left-4 w-2 h-2 bg-white border-l border-t border-gray-300 transform rotate-45"></div>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Privacy message */}
                <p className="text-sm text-white/60" style={{ 
                  fontFamily: 'zz_type_mon, sans-serif',
                  fontWeight: '200'
                }}>
                  Wir respektieren Dein Postfach. Deine Daten bleiben privat.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Trading Chart Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-bold text-center text-primary mb-20" style={{ 
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
            <h2 className="text-7xl md:text-8xl lg:text-8xl font-bold mb-24 text-black" style={{ 
              fontFamily: 'zz_type_exp, sans-serif', 
              fontWeight: '800',
              letterSpacing: '-0.08em',
            }}>
              Dein <span className="text-[hsl(var(--signal))]">objektiver Blick</span><br></br> auf Bitcoin.
            </h2>
            
            <div className="grid items-start ml-14 mr-8" style={{ gridTemplateColumns: '15% 85%' }}>
              <div></div>
            {/* Subtitle */}
            <p className="text-3xl md:text-4xl text-black mb-24" style={{ 
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
            <div className="space-y-16 ml-14 md:ml-14 ml-0">
              {/* Section 1: Was er macht */}
              <div className="hidden md:grid items-start mr-10" style={{ gridTemplateColumns: '17% 37% 1fr' }}>
                <div></div>
                <div className="flex flex-col gap-2">
                  <span className="text-3xl font-bold" style={{ color: 'hsl(var(--signal))'}}>→</span>
                  <h3 className="text-2xl md:text-3xl font-bold text-black" style={{ 
                    fontFamily: 'zz_type_exp, sans-serif', 
                    fontWeight: '700',
                    letterSpacing: '-0.05em'
                  }}>
                    Was er macht
                  </h3>
                </div>
                <div>
                  <p className="text-black leading-relaxed" style={{ 
                    fontFamily: 'zz_type_mon, sans-serif', 
                    fontWeight: '400',
                    fontSize: '16px'
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
                <p className="text-black leading-relaxed" style={{ 
                  fontFamily: 'zz_type_mon, sans-serif', 
                  fontWeight: '400',
                  fontSize: '16px'
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
                  <span className="text-3xl font-bold" style={{ color: 'hsl(var(--signal))' }}>→</span>
                  <h3 className="text-2xl md:text-3xl font-bold text-black" style={{ 
                    fontFamily: 'zz_type_exp, sans-serif', 
                    fontWeight: '700',
                    letterSpacing: '-0.05em'
                  }}>
                    Wie er funktioniert
                  </h3>
                </div>
                <div>
                  <p className="text-black leading-relaxed" style={{ 
                    fontFamily: 'zz_type_mon, sans-serif', 
                    fontWeight: '400',
                    fontSize: '16px'
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
                <p className="text-black leading-relaxed" style={{ 
                  fontFamily: 'zz_type_mon, sans-serif', 
                  fontWeight: '400',
                  fontSize: '16px'
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
                  <span className="text-3xl font-bold" style={{ color: 'hsl(var(--signal))' }}>→</span>
                  <h3 className="text-2xl md:text-3xl font-bold text-black" style={{ 
                    fontFamily: 'zz_type_exp, sans-serif', 
                    fontWeight: '700',
                    letterSpacing: '-0.05em'
                  }}>
                    Wer dahinter steckt
                  </h3>
                </div>
                <div>
                  <p className="text-black leading-relaxed" style={{ 
                    fontFamily: 'zz_type_mon, sans-serif', 
                    fontWeight: '400',
                    fontSize: '16px'
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
                <p className="text-black leading-relaxed" style={{ 
                  fontFamily: 'zz_type_mon, sans-serif', 
                  fontWeight: '400',
                  fontSize: '16px'
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
          <h2 className="text-4xl md:text-5xl font-bold text-center text-primary mb-20" style={{ 
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
