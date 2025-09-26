'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import TradingChart from '@/components/TradingChart'

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
  const [isGlitching, setIsGlitching] = useState(false)

  // Glitch effect timer
  useEffect(() => {
    const glitchDurations = [50, 200, 1000] // Fixed durations in ms
    
    const glitchInterval = () => {
      const delay = Math.random() * 8000 + 2000 // Random delay between 3-8 seconds
      setTimeout(() => {
        setIsGlitching(true)
        const glitchDuration = glitchDurations[Math.floor(Math.random() * glitchDurations.length)]
        setTimeout(() => {
          setIsGlitching(false)
          glitchInterval() // Schedule next glitch
        }, glitchDuration)
      }, delay)
    }
    
    glitchInterval() // Start the first glitch cycle
  }, [])

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
          <h2 className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-mono mb-16 text-primary"
              style={{ 
                fontFamily: 'TT Norms Pro Expanded, sans-serif', 
                fontWeight: '900',
                letterSpacing: '-0.02em'
              }}>
            Bitcoin Top
          </h2>
          
          {/* Score Display */}
          <div className="relative flex flex-col items-center justify-center mb-12">
            
            {/* Large 3D Score Number */}
            <div className={`relative mb-12 ${isGlitching ? 'glitch-container' : ''}`}>
              {/* Main Text */}
              <div 
                className={`text-[11rem] md:text-[14rem] lg:text-[18rem] font-bold text-foreground ${isGlitching ? 'glitch-effect' : ''}`}
                style={{
                  textShadow: isGlitching ? 'none' : '12px 12px 0px hsl(68, 100%, 20%), 24px 24px 0px hsl(68, 100%, 30%), 36px 36px 0px hsl(68, 100%, 40%)',
                  fontFamily: 'TT Norms Pro, sans-serif',
                  fontWeight: '900',
                  lineHeight: '0.8'
                }}
              >
                87
              </div>
              
              {/* Glitch Duplicate - Top Half */}
              {isGlitching && (
                <div 
                  className="absolute top-0 left-0 text-[11rem] md:text-[14rem] lg:text-[18rem] font-bold text-foreground glitch-effect"
                  style={{
                    fontFamily: 'TT Norms Pro, sans-serif',
                    fontWeight: '900',
                    lineHeight: '0.8',
                    clipPath: 'inset(0% 0% 50% 0%)',
                    transform: 'translateX(8px)',
                    zIndex: 1
                  }}
                >
                  87
                </div>
              )}
              
              {/* Glitch Duplicate - Bottom Half */}
              {isGlitching && (
                <div 
                  className="absolute top-0 left-0 text-[11rem] md:text-[14rem] lg:text-[18rem] font-bold text-foreground glitch-effect"
                  style={{
                    fontFamily: 'TT Norms Pro, sans-serif',
                    fontWeight: '900',
                    lineHeight: '0.8',
                    clipPath: 'inset(50% 0% 0% 0%)',
                    transform: 'translateX(-12px)',
                    zIndex: 1
                  }}
                >
                  87
                </div>
              )}
            </div>
            
            {/* Date */}
            <div className="text-xl text-foreground/70 font-mono mb-8">
              {new Date().toLocaleDateString('en-US', { 
                month: 'long', 
                day: 'numeric', 
                year: 'numeric' 
              })}
            </div>
            
            {/* Historical Values with Year's High/Low */}
            <div className="max-w-4xl mx-auto">
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
          </div>
        </div>
      </section>

      {/* Signal Notifications Section */}
      <section className="py-8 bg-foreground/5">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {!isSubmitted && (
              <>
                <h4 className="text-3xl font-bold text-center mb-4 text-primary font-sans">Unlock All Features</h4>
                <div className="text-foreground/70 font-mono mb-6 text-center">
                  <ul className="list-disc list-outside space-y-1 inline-block text-left pl-4">
                    <li>Get an email notification when a signal is triggered</li>
                    <li>Adjust the scoring behaviour</li>
                    <li>Modify signal thresholds</li>
                  </ul>
                </div>
              </>
            )}
            
            {isSubmitted ? (
              <div className="text-center py-8">
                <div className="text-2xl font-bold text-primary font-mono mb-2">✓ Success!</div>
                <p className="text-foreground/70 font-mono">You now have 30 day access to all features.</p>
              </div>
            ) : isSubmitting ? (
              <div className="text-center py-8">
                <div className="flex justify-center mb-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
                <p className="text-foreground/70 font-mono">Unlocking features...</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-end justify-center">
                  <div className="sm:w-80 relative">
                    <label className="block text-sm text-foreground/70 font-mono mb-2">Email</label>
                    <input
                      type="text"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      onBlur={handleInputBlur}
                      placeholder="Enter your email"
                      className="w-full px-4 py-2 bg-foreground/5 border border-border rounded-md text-foreground font-mono placeholder:text-foreground/50 placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-primary h-10"
                    />
                    {validationErrors.email && (
                      <div className="absolute top-full left-0 mt-1 z-50">
                        <div className="bg-foreground border border-border rounded-lg shadow-lg p-3 max-w-xs">
                          <div className="flex items-start space-x-2">
                            <div className="w-4 h-4 bg-red-500 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="text-white text-xs font-bold">!</span>
                            </div>
                            <p className="text-white text-sm font-mono leading-relaxed">{validationErrors.email}</p>
                          </div>
                          <div className="absolute -top-1 left-4 w-2 h-2 bg-foreground border-l border-t border-border transform rotate-45"></div>
                        </div>
                      </div>
                    )}
                  </div>
                  <Button 
                    type="submit"
                    disabled={isSubmitting}
                    className="font-sans px-4 py-2 text-sm h-10 rounded-md"
                  >
                    {isSubmitting ? 'Unlocking...' : 'Unlock Features'}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Trading Chart Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-8 text-primary font-sans">Bitcoin Top Chart</h3>
          <div className="max-w-6xl mx-auto">
            {/* Chart Display */}
            <div className="bg-card border border-border rounded-lg p-6 mb-6">
              <TradingChart height={500} />
            </div>
            
            {/* Chart Controls */}
            <div className="bg-foreground/5 border border-border rounded-lg p-6 relative">
              <h4 className="text-xl font-bold mb-6 text-primary font-sans">Chart Controls</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
            <div className="space-y-6 text-lg text-foreground/80 font-mono">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              <p>
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12 text-primary font-sans">Frequently Asked Questions</h3>
          <div className="max-w-6xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="bg-card border border-border rounded-lg px-6">
                <AccordionTrigger className="text-left text-card-foreground font-mono">
                  What is Bitcoin Top Score?
                </AccordionTrigger>
                <AccordionContent className="text-card-foreground font-mono">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2" className="bg-card border border-border rounded-lg px-6">
                <AccordionTrigger className="text-left text-card-foreground font-mono">
                  How is the score calculated?
                </AccordionTrigger>
                <AccordionContent className="text-card-foreground font-mono">
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3" className="bg-card border border-border rounded-lg px-6">
                <AccordionTrigger className="text-left text-card-foreground font-mono">
                  What data sources are used?
                </AccordionTrigger>
                <AccordionContent className="text-card-foreground font-mono">
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4" className="bg-card border border-border rounded-lg px-6">
                <AccordionTrigger className="text-left text-card-foreground font-mono">
                  How often is the score updated?
                </AccordionTrigger>
                <AccordionContent className="text-card-foreground font-mono">
                  Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-5" className="bg-card border border-border rounded-lg px-6">
                <AccordionTrigger className="text-left text-card-foreground font-mono">
                  Can I get historical score data?
                </AccordionTrigger>
                <AccordionContent className="text-card-foreground font-mono">
                  At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Legal Disclaimer Section */}
      <section className="py-12 bg-foreground/5">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h3 className="text-2xl font-bold text-center mb-8 text-primary font-sans">Legal Disclaimer</h3>
            <div className="space-y-4 text-sm text-foreground/70 font-mono">
              <p>
                <strong className="text-foreground">Risk Warning:</strong> Bitcoin Top provides confidence scores and trading signals for informational purposes only. Cryptocurrency trading involves substantial risk of loss and is not suitable for all investors. Past performance does not guarantee future results.
              </p>
              <p>
                <strong className="text-foreground">No Financial Advice:</strong> The information provided by Bitcoin Top is not intended as financial, investment, or trading advice. You should not rely solely on our signals or scores when making investment decisions. Always conduct your own research and consider consulting with a qualified financial advisor.
              </p>
              <p>
                <strong className="text-foreground">Data Accuracy:</strong> While we strive to provide accurate and up-to-date information, Bitcoin Top does not guarantee the accuracy, completeness, or timeliness of any data, scores, or signals provided. Market conditions can change rapidly and without notice.
              </p>
              <p>
                <strong className="text-foreground">Limitation of Liability:</strong> Bitcoin Top and its affiliates shall not be liable for any direct, indirect, incidental, special, or consequential damages arising from the use of our services, including but not limited to trading losses, data inaccuracies, or service interruptions.
              </p>
              <p>
                <strong className="text-foreground">Regulatory Notice:</strong> Bitcoin Top is not a licensed financial services provider. Our services are provided on an "as is" basis without warranties of any kind. Users are responsible for ensuring compliance with applicable laws and regulations in their jurisdiction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="relative flex items-center justify-center min-h-[100px]">
            {/* SVG Logo behind text */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Image
                src="/zielzone_logo.svg"
                alt="Zielzone Logo"
                width={180}
                height={180}
                className="opacity-10"
              />
            </div>
            {/* Powered by text with Zielzone SVG */}
            <div className="relative z-10 flex items-end space-x-2">
              <span className="text-foreground/70 text-sm font-mono">Powered by</span>
              <Image
                src="/zielzone_text.svg"
                alt="Zielzone"
                width={120}
                height={24}
                className="h-6 w-auto"
              />
            </div>
          </div>
        </div>
      </footer>

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
