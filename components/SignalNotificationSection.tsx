'use client';

import { useState, useEffect } from 'react';

export default function SignalNotificationSection() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [validationErrors, setValidationErrors] = useState({ email: '' });

  // Function to check session token validity
  const checkSessionValidity = async () => {
    try {
      const response = await fetch('/api/auth/status');
      const data = await response.json();
      setIsAuthenticated(data.authenticated);
      return data.authenticated;
    } catch (error) {
      console.error('Error checking session validity:', error);
      setIsAuthenticated(false);
      return false;
    }
  };

  useEffect(() => {
    // Initial check of session token validity
    checkSessionValidity();

    // Set up periodic checking of session validity (every 5 minutes)
    const interval = setInterval(checkSessionValidity, 5 * 60 * 1000);

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setEmail(value);
    
    // Clear validation error when user starts typing
    if (validationErrors.email) {
      setValidationErrors(prev => ({ ...prev, email: '' }));
    }
  };

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { value } = e.target;
    let errorMessage = '';
    
    const trimmedValue = value.trim();
    if (!trimmedValue) {
      errorMessage = 'Email is required';
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(trimmedValue)) {
      if (!trimmedValue.includes('@')) {
        errorMessage = `Please include an '@' in the email address. '${trimmedValue}' is missing an '@'.`;
      } else if (!trimmedValue.includes('.')) {
        errorMessage = `Please include a '.' in the email address. '${trimmedValue}' is missing a '.'.`;
      } else {
        errorMessage = `Please enter a valid email address. '${trimmedValue}' is not a valid email.`;
      }
    }
    
    setValidationErrors(prev => ({ ...prev, email: errorMessage }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate email field
    const errors = { email: '' };
    const trimmedEmail = email.trim();
    
    if (!trimmedEmail) {
      errors.email = 'Email is required';
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(trimmedEmail)) {
      if (!trimmedEmail.includes('@')) {
        errors.email = `Please include an '@' in the email address. '${trimmedEmail}' is missing an '@'.`;
      } else if (!trimmedEmail.includes('.')) {
        errors.email = `Please include a '.' in the email address. '${trimmedEmail}' is missing a '.'.`;
      } else {
        errors.email = `Please enter a valid email address. '${trimmedEmail}' is not a valid email.`;
      }
    }
    
    setValidationErrors(errors);
    
    if (errors.email) {
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/auth/send-magic-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmedEmail }),
      });

      if (response.ok) {
        setMessage('Check your email for the magic link!');
      } else {
        setMessage('Failed to send email. Please try again.');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 bg-black relative mb-24">
      
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          {/* Only show heading and subheading when not authenticated and not showing confirmation message */}
          {!isAuthenticated && !(message && message.includes('Check your email')) && (
            <>
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
                fontWeight: '300',
                fontSize: '20px',
                letterSpacing: '-0.01em'
              }}>
                Erhalte eine Nachricht, sobald sich etwas bewegt.
              </p>
            </>
          )}
          
          {/* Content Status Display 
          <div className="text-center mb-6">
            {isAuthenticated ? (
              <p className="text-green-400 font-semibold text-lg" style={{ 
                fontFamily: 'zz_type_exp, sans-serif'
              }}>
                ✓ Content is unlocked
              </p>
            ) : (
              <p className="text-red-400 font-semibold text-lg" style={{ 
                fontFamily: 'zz_type_exp, sans-serif'
              }}>
                Content locked
              </p>
            )}
            <button
              onClick={checkSessionValidity}
              className="mt-2 text-sm text-blue-400 hover:text-blue-300 underline"
              style={{ 
                fontFamily: 'zz_type_mon, sans-serif'
              }}
            >
              Check Status
            </button>
          </div>*/}
          
          {isAuthenticated ? (
            <div className="text-center py-8">
              <div className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ 
                fontFamily: 'zz_type_exp, sans-serif', 
                fontWeight: '800',
                letterSpacing: '-0.06em'
              }}>
                YOU ARE ALL SET NOW
              </div>
            </div>
          ) : message && message.includes('Check your email') ? (
            <div className="text-center py-8">
              <h2 className="text-white mb-8" style={{ 
                fontFamily: 'zz_type_exp, sans-serif', 
                fontWeight: '600',
                fontSize: '49px',
                letterSpacing: '-0.06em'
              }}>
                VIELEN DANK
              </h2>
              <p className="text-white mb-8" style={{ 
                fontFamily: 'zz_type_mon, sans-serif', 
                fontWeight: '300',
                fontSize: '20px',
                lineHeight: '1.5',
                letterSpacing: '-0.01em'
              }}>
                Fast geschafft! Bitte schau in deine Emails und klicke auf den Bestätigungslink.
              </p>
              <div className="flex items-center justify-center space-x-2 text-[hsl(var(--signal))]">
                <div className="w-4 h-4 bg-[hsl(var(--signal))] rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">!</span>
                </div>
                <p className="text-sm" style={{ 
                  fontFamily: 'zz_type_mon, sans-serif', 
                  fontWeight: '300',
                  fontSize: '14px',
                  lineHeight: '1.5',
                  letterSpacing: '-0.01em'
                }}>
                  Keine E-Mail bekommen? Schau sicherheitshalber auch im Spam-Ordner nach.
                </p>
              </div>
            </div>
          ) : loading ? (
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
                    type="email"
                    name="email"
                    value={email}
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
                    disabled={loading}
                    className="text-lg px-8 py-3 bg-[hsl(var(--signal))] text-white hover:opacity-90 transition-colors disabled:opacity-50 rounded-full m-2"
                    style={{ 
                      fontFamily: 'zz_type_mon, sans-serif',
                      letterSpacing: '0.05em'
                    }}
                  >
                    {loading ? 'ABONNIEREN...' : 'JETZT ABONNIEREN'}
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
              
              {/* Error message (only show if not success) */}
              {message && !message.includes('Check your email') && (
                <div className="text-center">
                  <p className="text-sm text-red-400" style={{ 
                    fontFamily: 'zz_type_mon, sans-serif'
                  }}>
                    {message}
                  </p>
                </div>
              )}
              
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
  );
}
