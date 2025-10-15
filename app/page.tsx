'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import TradingChartPlotly from '@/components/TradingChartPlotly'
import ConfidenceGauge from '@/components/ConfidenceGauge'
import FearGreedGauge from '@/components/FearGreedGauge'
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
  const [useLogScale, setUseLogScale] = useState(true) // Default to log scale


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
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-mono mb-16 text-primary"
              style={{ 
                fontFamily: 'zz_type_exp, sans-serif', 
                fontWeight: '800',
                letterSpacing: '-0.08em'
              }}>
            Bitcoin Top
          </h1>
          
          {/* Bitcoin Top Gauge */}
          <div className="mb-8">
              <BitcoinTopGauge value={68} />
          </div>
          {/*}
          <div className="absolute top-0 left-0 w-full h-full z-0">
            <ConfidenceGauge confidence={78} className="mt-60" />
          </div>*/}
          
          {/* Score Display */}
          <div className="relative flex flex-col items-center justify-center mb-12 z-10">
            {/* Date */}
            <div className="text-xl text-foreground/70 font-mono mb-8">
              {new Date().toLocaleDateString('en-US', { 
                month: 'long', 
                day: 'numeric', 
                year: 'numeric' 
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Signal Notifications Section */}
      <section className="py-16 bg-[#1a1a1a] relative">
        {/* Top border line */}
        <div className="absolute top-0 left-0 w-full h-px bg-[#42b8c1]"></div>
        {/* Bottom border line */}
        <div className="absolute bottom-0 left-0 w-full h-px bg-[#4285f4]"></div>
        
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            {/* Main heading */}
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6" style={{ 
              fontFamily: 'zz_type_exp, sans-serif', 
              fontWeight: '600',
              letterSpacing: '-0.02em'
            }}>
              Kein Top verpassen
            </h2>
            
            {/* Subheading */}
            <p className="text-xl text-white mb-8" style={{ 
              fontFamily: 'zz_type_mon, sans-serif', 
              fontWeight: '200'
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
                  <div className="flex rounded-full border-2 border-[#e07a5f] bg-[#1a1a1a] overflow-hidden">
                    <input
                      type="text"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      onBlur={handleInputBlur}
                      placeholder="Deine Email"
                      className="flex-1 px-6 py-4 bg-transparent text-white placeholder:text-white/80 focus:outline-none"
                      style={{ 
                        fontFamily: 'zz_type_mon, sans-serif',
                        fontSize: '18px'
                      }}
                    />
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-8 py-4 bg-[#f26419] text-white hover:bg-[#e55a15] transition-colors disabled:opacity-50 rounded-full m-2"
                      style={{ 
                        fontFamily: 'zz_type_mon, sans-serif',
                        fontSize: '16px',
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
                  fontFamily: 'zz_type_mon, sans-serif'
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
          <h2 className="text-4xl md:text-5xl font-bold text-center mt-16 mb-8 text-primary" style={{ 
            fontFamily: 'zz_type_exp, sans-serif', 
            fontWeight: '600',
            letterSpacing: '-0.02em'
          }}>
           Historische Daten
          </h2>
          <p className="text-xl text-center mb-16 text-foreground" style={{ 
              fontFamily: 'zz_type_mon, sans-serif', 
              fontWeight: '400'
            }}>
              So reagierte der Indikator in früheren Zyklen
            </p>
          {/* Historical Values with Year's High/Low */}
          <div className="max-w-4xl mx-auto mb-8">
              {/* Layout with Year's High/Low on sides when space allows (lg and up) */}
              <div className="hidden lg:flex items-center justify-center gap-4">
                {/* Year's Low - Left */}
                <div className="bg-foreground/5 rounded-lg p-6 text-center min-w-[140px]">
                  <div className="text-sm text-foreground/70 font-mono mb-2">Year&apos;s Low</div>
                  <div className="text-2xl font-bold text-foreground font-mono">45</div>
                </div>
                
                {/* Historical Values Container - Center */}
                <div className="bg-foreground/5 rounded-lg p-6">
                  <div className="grid grid-cols-3 gap-6">
                    {/* Yesterday */}
                    <div className="text-center">
                      <div className="text-sm text-foreground/70 font-mono mb-2">Yesterday</div>
                      <div className="text-2xl font-bold text-foreground font-mono">85</div>
                    </div>
                    
                    {/* Last Week */}
                    <div className="text-center">
                      <div className="text-sm text-foreground/70 font-mono mb-2">Last Week</div>
                      <div className="text-2xl font-bold text-foreground font-mono">82</div>
                    </div>
                    
                    {/* Last Month */}
                    <div className="text-center">
                      <div className="text-sm text-foreground/70 font-mono mb-2">Last Month</div>
                      <div className="text-2xl font-bold text-foreground font-mono">78</div>
                    </div>
                  </div>
                </div>
                
                {/* Year's High - Right */}
                <div className="bg-foreground/5 rounded-lg p-6 text-center min-w-[140px]">
                  <div className="text-sm text-foreground/70 font-mono mb-2">Year&apos;s High</div>
                  <div className="text-2xl font-bold text-foreground font-mono">94</div>
                </div>
              </div>
              
              {/* Stacked layout for smaller screens (below lg) */}
              <div className="lg:hidden">
                {/* Historical Values Container */}
                <div className="bg-foreground/5 rounded-lg p-6 mb-4">
                  <div className="grid grid-cols-3 gap-6">
                    {/* Yesterday */}
                    <div className="text-center">
                      <div className="text-sm text-foreground/70 font-mono mb-2">Yesterday</div>
                      <div className="text-2xl font-bold text-foreground font-mono">85</div>
                    </div>
                    
                    {/* Last Week */}
                    <div className="text-center">
                      <div className="text-sm text-foreground/70 font-mono mb-2">Last Week</div>
                      <div className="text-2xl font-bold text-foreground font-mono">82</div>
                    </div>
                    
                    {/* Last Month */}
                    <div className="text-center">
                      <div className="text-sm text-foreground/70 font-mono mb-2">Last Month</div>
                      <div className="text-2xl font-bold text-foreground font-mono">78</div>
                    </div>
                  </div>
                </div>
                
                {/* Year's High/Low - Below on smaller screens, next to each other */}
                <div className="flex items-center justify-center gap-4">
                  {/* Year's Low */}
                  <div className="bg-foreground/5 rounded-lg p-6 text-center flex-1 max-w-[200px]">
                    <div className="text-sm text-foreground/70 font-mono mb-2">Year&apos;s Low</div>
                    <div className="text-2xl font-bold text-foreground font-mono">45</div>
                  </div>
                  
                  {/* Year's High */}
                  <div className="bg-foreground/5 rounded-lg p-6 text-center flex-1 max-w-[200px]">
                    <div className="text-sm text-foreground/70 font-mono mb-2">Year&apos;s High</div>
                    <div className="text-2xl font-bold text-foreground font-mono">94</div>
                  </div>
                </div>
              </div>
            </div>
          <div className="max-w-6xl mx-auto">
            {/* Chart Display */}
            <div className="bg-card border border-border rounded-lg p-6 mb-6">
              <TradingChartPlotly height={700} useLogScale={useLogScale} />
            </div>
            
            {/* Chart Controls */}
            <div className="bg-foreground/5 border border-border rounded-lg p-6 relative">
              <h4 className="text-xl font-bold mb-6 text-primary font-sans">Chart Controls</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Price Scale */}
                <div>
                  <label className="block text-sm text-foreground/70 font-mono mb-2">Price Scale</label>
                  <select 
                    className="w-full px-3 py-2 bg-foreground/5 border border-border rounded-md text-foreground font-mono focus:outline-none focus:ring-2 focus:ring-primary" 
                    value={useLogScale ? 'log' : 'linear'}
                    onChange={(e) => setUseLogScale(e.target.value === 'log')}
                  >
                    <option value="log">Log Scale</option>
                    <option value="linear">Linear</option>
                  </select>
                </div>
                
                {/* Time Period */}
                <div>
                  <label className="block text-sm text-foreground/70 font-mono mb-2">Time Period</label>
                  <select className="w-full px-3 py-2 bg-foreground/5 border border-border rounded-md text-foreground font-mono focus:outline-none focus:ring-2 focus:ring-primary" defaultValue="1d">
                    <option value="1h">1 Hour</option>
                    <option value="4h">4 Hours</option>
                    <option value="1d">1 Day</option>
                    <option value="1w">1 Week</option>
                    <option value="1m">1 Month</option>
                  </select>
                </div>
                
                {/* Confidence Threshold */}
                <div>
                  <label className="block text-sm text-foreground/70 font-mono mb-2">Confidence Threshold: <span className="text-primary font-bold">75</span></label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    defaultValue="75"
                    className="w-full h-2 bg-foreground/10 rounded-lg appearance-none cursor-pointer slider"
                    style={{
                      background: 'linear-gradient(to right, hsl(var(--primary)) 0%, hsl(var(--primary)) 75%, hsl(var(--foreground) / 0.1) 75%, hsl(var(--foreground) / 0.1) 100%)'
                    }}
                  />
                </div>
                
                {/* Signal Sensitivity */}
                <div>
                  <label className="block text-sm text-foreground/70 font-mono mb-2">Signal Sensitivity: <span className="text-primary font-bold">Medium</span></label>
                  <select className="w-full px-3 py-2 bg-foreground/5 border border-border rounded-md text-foreground font-mono focus:outline-none focus:ring-2 focus:ring-primary" defaultValue="medium">
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                
                {/* Chart Type */}
                <div>
                  <label className="block text-sm text-foreground/70 font-mono mb-2">Chart Type</label>
                  <select className="w-full px-3 py-2 bg-foreground/5 border border-border rounded-md text-foreground font-mono focus:outline-none focus:ring-2 focus:ring-primary" defaultValue="line">
                    <option value="line">Line Chart</option>
                    <option value="candlestick">Candlestick</option>
                    <option value="area">Area Chart</option>
                    <option value="volume">Volume</option>
                  </select>
                </div>
              </div>
              
              {/* Additional Parameters */}
              <div className="mt-6 pt-6 border-t border-border">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Moving Average */}
                  <div>
                    <label className="block text-sm text-foreground/70 font-mono mb-2">Moving Average: <span className="text-primary font-bold">20</span></label>
                    <input
                      type="range"
                      min="5"
                      max="50"
                      defaultValue="20"
                      className="w-full h-2 bg-foreground/10 rounded-lg appearance-none cursor-pointer slider"
                    />
                  </div>
                  
                  {/* RSI Period */}
                  <div>
                    <label className="block text-sm text-foreground/70 font-mono mb-2">RSI Period: <span className="text-primary font-bold">14</span></label>
                    <input
                      type="range"
                      min="5"
                      max="30"
                      defaultValue="14"
                      className="w-full h-2 bg-foreground/10 rounded-lg appearance-none cursor-pointer slider"
                    />
                  </div>
                  
                  {/* Bollinger Bands */}
                  <div>
                    <label className="block text-sm text-foreground/70 font-mono mb-2">Bollinger Bands: <span className="text-primary font-bold">2.0</span></label>
                    <input
                      type="range"
                      min="1.0"
                      max="3.0"
                      step="0.1"
                      defaultValue="2.0"
                      className="w-full h-2 bg-foreground/10 rounded-lg appearance-none cursor-pointer slider"
                    />
                  </div>
                </div>
              </div>
              
              {/* Blurred Overlay for Non-Signed-Up Users */}
              {!isUserSignedUp && (
                <div className="absolute inset-0 bg-background/10 backdrop-blur-sm rounded-lg flex items-center justify-center">
                  <Button 
                    onClick={() => setShowSignup(true)}
                    className="font-sans px-12 py-6 text-2xl"
                  >
                    Unlock Features
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* About Bitcoin Top Section */}
      <section className="py-16 bg-foreground/5">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h3 className="text-3xl font-bold text-center mb-8 text-primary font-sans">About Bitcoin Top</h3>
            <div className="space-y-6 text-lg text-foreground/80 font-mono mb-12">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              <p>
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </div>
            
            {/* Explanation Video */}
            <div className="text-center mb-8">
              <h4 className="text-2xl font-bold text-primary font-sans mb-4">How Bitcoin Top Works</h4>
            </div>
            
            <div className="relative w-full max-w-4xl mx-auto">
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  className="absolute top-0 left-0 w-full h-full rounded-lg border border-border"
                  src="https://www.youtube.com/embed/Oo5yiOyAh5Q"
                  title="Bitcoin Top Explanation Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12 text-primary font-sans">Häufige Fragen</h3>
          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="bg-transparent">
                <AccordionTrigger className="text-left text-black font-mono border-b border-black pb-2 data-[state=open]:border-b-0">
                Wie entsteht der BitcoinTop Indikator?
                </AccordionTrigger>
                <AccordionContent className="text-black font-mono">
                Der Indikator kombiniert sieben zentrale Datenquellen aus technischer Analyse, On-Chain-Daten und makroökonomischen Faktoren. Mithilfe von Machine Learning werden diese Indikatoren gewichtet, um daraus ein möglichst präzises Gesamtbild des Marktrisikos zu berechnen.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2" className="bg-transparent">
                <AccordionTrigger className="text-left text-black font-mono border-b border-black pb-2 data-[state=open]:border-b-0">
                Warum nur sieben Indikatoren?
                </AccordionTrigger>
                <AccordionContent className="text-black font-mono">
                Viele Modelle nutzen 20 oder mehr Signale – aber mehr ist nicht immer besser. Unsere Tests zeigen: Nur eine fokussierte Auswahl liefert wirklich konsistente Ergebnisse. Die sieben gewählten Indikatoren bieten den besten Mix aus Präzision und Robustheit, was wir durch jahrelange Backtests belegen konnten.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3" className="bg-transparent">
                <AccordionTrigger className="text-left text-black font-mono border-b border-black pb-2 data-[state=open]:border-b-0">
                Kann der BitcoinTop die Zukunft vorhersagen?
                </AccordionTrigger>
                <AccordionContent className="text-black font-mono">
                Natürlich nicht – niemand kann das. Aber unser Modell erkennt mit hoher Genauigkeit den aktuellen Zustand des Marktes: ob er überhitzt, überkauft oder in einer neutralen Zone ist. Du bekommst also eine objektive Momentaufnahme, die hilft, das Risiko besser einzuordnen.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4" className="bg-transparent">
                <AccordionTrigger className="text-left text-black font-mono border-b border-black pb-2 data-[state=open]:border-b-0">
                Sollte ich meine Trades nach dem Indikator richten?
                </AccordionTrigger>
                <AccordionContent className="text-black font-mono">
                Nein. Der BitcoinTop ist kein Handelssignal, sondern ein Werkzeug zur Orientierung. Investitionsentscheidungen hängen von vielen individuellen Faktoren ab – unser Indikator soll dich dabei unterstützen, rationaler zu bleiben und Emotionen aus dem Spiel zu nehmen.
                </AccordionContent>
              </AccordionItem>
              
                <AccordionItem value="item-5" className="bg-transparent">
                  <AccordionTrigger className="text-left text-black font-mono border-b border-black pb-2 data-[state=open]:border-b-0">
                  Wie oft wird der Indikator aktualisiert?
                  </AccordionTrigger>
                  <AccordionContent className="text-black font-mono">
                  Einmal pro Stunde. So bleibst du immer nah am Marktgeschehen, ohne ständig Charts refreshen zu müssen.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-6" className="bg-transparent">
                  <AccordionTrigger className="text-left text-black font-mono border-b border-black pb-2 data-[state=open]:border-b-0">
                  Wird der Indikator weiterentwickelt?
                  </AccordionTrigger>
                  <AccordionContent className="text-black font-mono">
                  Ja, ständig. Märkte verändern sich, also entwickeln wir unser Modell kontinuierlich weiter – mit neuen Daten, besseren Methoden und laufender Optimierung.
                  </AccordionContent>
                </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Contact & Legal Disclaimer Section */}
      <section className="py-16 bg-black text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Contact Information */}
            <div className="mb-12">
              <div className="text-sm text-white/70 font-mono mb-2">
                Feedback / Fragen / Kommentare / Kollaborationen
              </div>
              <div 
                className="text-6xl font-bold text-white mb-8"
                style={{ 
                  fontFamily: 'zz_type_exp, sans-serif', 
                  letterSpacing: '-0.05em'
                }}
              >
                hodl@bitcointop.de
              </div>
            </div>
            
            {/* Separator Line */}
            <div className="border-t border-gray-400/50 mb-12"></div>
            
            {/* Legal Disclaimer */}
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="lg:w-1/3">
                <h3 
                  className="text-xl font-bold text-white mb-4"
                  style={{ 
                    fontFamily: 'zz_type_exp, sans-serif',
                    letterSpacing: '-0.05em'
                  }}
                >
                  Haftungsausschluss
                </h3>
              </div>
              <div className="lg:w-2/3">
                <div 
                  className="text-sm text-white leading-relaxed"
                  style={{ 
                    fontFamily: 'zz_type_mon, monospace',
                    letterSpacing: '-0.01em'
                  }}
                >
                  <p>
                    Die Inhalte auf dieser Seite, insbesondere der bereitgestellte Bitcoin-Indikator und alle darauf basierenden Informationen, stellen <strong>keine Finanz- oder Anlageberatung</strong> dar. Alle Informationen dienen <strong>ausschließlich zu Informationszwecken</strong> und können sich jederzeit ändern. Die Indikatoren basieren auf historischen Daten und bieten <strong>keinerlei Garantie für zukünftige Marktentwicklungen oder Gewinne.</strong><br></br> Investitionen in Kryptowährungen sind mit <strong>erheblichen Risiken</strong> verbunden – ein <strong>Totalverlust</strong> des eingesetzten Kapitals ist möglich. Die Nutzung der Informationen und des Indikators erfolgt ausschließlich auf <strong>Ihr eigenes Risiko.</strong><br></br> Wir übernehmen <strong>keine Gewähr</strong> für die Richtigkeit, Vollständigkeit oder Aktualität der Daten und Indikatorsignale. Wir <strong>haften nicht</strong> für Verluste oder Schäden, die direkt oder indirekt aus der Nutzung oder Nichtnutzung der bereitgestellten Informationen entstehen. Bitte triff deine Entscheidungen eigenverantwortlich und ziehe im Zweifel einen <strong>unabhängigen Finanzberater</strong> hinzu.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Separator Line */}
            <div className="border-t border-gray-400/50 mb-12 mt-12"></div>
            
            {/* Footer */}
            <div className="mt-20 flex justify-end">
              <div className="flex items-end space-x-2">
                <span className="text-sm text-gray-400 font-mono mb-2">Ein Projekt von</span>
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

      {/* Signup Modal */}
      {showSignup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-background border border-border rounded-lg p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-primary font-sans">Unlock All Features</h2>
              <button
                onClick={() => {
                  setShowSignup(false)
                  setIsSignupSubmitted(false)
                  setSignupData({ email: '' })
                  setSignupErrors({ email: '' })
                }}
                className="text-foreground/70 hover:text-foreground text-2xl font-bold"
              >
                ×
              </button>
            </div>
            
            <div className="text-foreground/70 font-mono mb-6">
              <ul className="list-disc list-outside space-y-1 pl-4">
                <li>Get an email notification when a signal is triggered</li>
                <li>Adjust the scoring behaviour</li>
                <li>Modify signal thresholds</li>
              </ul>
            </div>
            
            {isSignupSubmitted ? (
              <div className="text-center py-8">
                <div className="text-2xl font-bold text-primary font-mono mb-2">✓ Features Unlocked!</div>
                <p className="text-foreground/70 font-mono">You now have 30 day access to all features.</p>
              </div>
            ) : isSignupSubmitting ? (
              <div className="text-center py-8">
                <div className="flex justify-center mb-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
                <p className="text-foreground/70 font-mono">Unlocking features...</p>
              </div>
            ) : (
              <form onSubmit={handleSignupSubmit} className="space-y-4">
                <div className="relative">
                  <label className="block text-sm text-foreground/70 font-mono mb-2">Email</label>
                  <input
                    type="text"
                    name="email"
                    value={signupData.email}
                    onChange={handleSignupInputChange}
                    onBlur={handleSignupInputBlur}
                    placeholder="Enter your email"
                    className="w-full px-4 py-2 bg-foreground/5 border border-border rounded-md text-foreground font-mono placeholder:text-foreground/50 placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-primary h-10"
                  />
                  {signupErrors.email && (
                    <div className="absolute top-full left-0 mt-1 z-50">
                      <div className="bg-foreground border border-border rounded-lg shadow-lg p-3 max-w-xs">
                        <div className="flex items-start space-x-2">
                          <div className="w-4 h-4 bg-red-500 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-white text-xs font-bold">!</span>
                          </div>
                          <p className="text-white text-sm font-mono leading-relaxed">{signupErrors.email}</p>
                        </div>
                        <div className="absolute -top-1 left-4 w-2 h-2 bg-foreground border-l border-t border-border transform rotate-45"></div>
                      </div>
                    </div>
                  )}
                </div>
                
                <Button 
                  type="submit"
                  disabled={isSignupSubmitting}
                  className="w-full font-sans py-2 text-sm h-10 rounded-md mt-6"
                >
                  {isSignupSubmitting ? 'Unlocking...' : 'Unlock'}
                </Button>
              </form>
            )}
          </div>
        </div>
      )}
    </main>
  )
}
