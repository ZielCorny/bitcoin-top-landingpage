'use client'

export default function Home() {
  
  return (
    <main className="min-h-screen bg-background text-foreground flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-primary mb-4"
            style={{ 
              fontFamily: 'TT Norms Pro Expanded, sans-serif', 
              fontWeight: '900',
              letterSpacing: '-0.02em'
            }}>
          BitcoinTop
        </h1>
        <h2 className="text-2xl md:text-3xl lg:text-4xl text-foreground/80 font-mono">
          where dreams materialize
        </h2>
      </div>
    </main>
  )
}
