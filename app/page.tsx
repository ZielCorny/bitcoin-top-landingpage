'use client';

import { useState, useEffect } from 'react';

// Declare Cookiebot global types
declare global {
  interface Window {
    Cookiebot?: {
      consent: {
        marketing: boolean;
      };
    };
  }
}

export default function LandingPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check Cookiebot consent (if using Cookiebot)
    if (typeof window !== 'undefined' && window.Cookiebot && !window.Cookiebot.consent.marketing) {
      setMessage('Please accept cookies to continue');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/auth/send-magic-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
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
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="max-w-md w-full space-y-8">
        <h1 className="text-4xl font-bold text-center">Unlock Your Graph</h1>
        
        {/* Content Status Display */}
        <div className="text-center">
          {isAuthenticated ? (
            <p className="text-green-600 font-semibold text-lg">Content is unlocked</p>
          ) : (
            <p className="text-red-600 font-semibold text-lg">Content locked</p>
          )}
          <button
            onClick={checkSessionValidity}
            className="mt-2 text-sm text-blue-600 hover:text-blue-800 underline"
          >
            Check Status
          </button>
        </div>
        
        {!isAuthenticated ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Sending...' : 'Get Access'}
            </button>
            {message && <p className="text-center text-sm">{message}</p>}
          </form>
        ) : (
          <div className="space-y-4">
            <p className="text-green-600 text-center font-semibold">✓ Access Granted!</p>
            <div className="border rounded-lg p-6 bg-gray-50">
              {/* Your graph component goes here */}
              <h2 className="text-xl font-semibold mb-4">Your Exclusive Graph</h2>
              <p className="text-gray-600">Graph visualization would appear here...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}