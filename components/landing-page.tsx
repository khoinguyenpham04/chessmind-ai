'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ChevronRight, Menu, X } from 'lucide-react'
import Image from 'next/image'

export function LandingPageComponent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [gradientAngle, setGradientAngle] = useState(0)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setGradientAngle((prevAngle) => (prevAngle + 1) % 360)
    }, 50)

    return () => clearInterval(intervalId)
  }, [])

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans antialiased">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-20">
          <h1 className="text-5xl sm:text-6xl font-bold mb-6 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            Master Chess with AI
          </h1>
          <p className="text-xl mb-10 text-gray-300">
            Elevate your game with personalized lessons, real-time analysis, and an AI opponent that adapts to your skill level.
          </p>
          <div className="flex justify-center space-x-4">
            <button className="px-8 py-3 rounded-full bg-gray-800 text-green-400 font-semibold shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] hover:shadow-[inset_0_-2px_0_0_rgba(0,0,0,0.1)] transition-all duration-300 ease-in-out transform hover:-translate-y-0.5">
              Start Learning
            </button>
            <button className="px-8 py-3 rounded-full bg-gray-800 text-white font-semibold shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] hover:shadow-[inset_0_-2px_0_0_rgba(0,0,0,0.1)] transition-all duration-300 ease-in-out transform hover:-translate-y-0.5 flex items-center">
              Watch Demo
              <ChevronRight className="ml-2 h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="relative w-full max-w-5xl mx-auto">
          {/* Rainbow Gradient Border */}
          <div 
            className="absolute inset-[-4px] rounded-[2.25rem] opacity-75"
            style={{
              background: `conic-gradient(from ${gradientAngle}deg at 50% 50%, #ff0000, #ff8000, #ffff00, #80ff00, #00ff00, #00ff80, #00ffff, #0080ff, #0000ff, #8000ff, #ff00ff, #ff0080, #ff0000)`,
              filter: 'blur(15px)',
              animation: 'pulse 4s infinite',
            }}
          ></div>
          {/* iPad Pro Frame */}
          <div className="relative aspect-[1.5] rounded-[2rem] border-[0.5rem] border-gray-800 bg-gray-800 p-2 shadow-2xl">
            {/* Screen Content */}
            <div className="relative h-full w-full overflow-hidden rounded-[1.5rem] bg-gray-900">
              <Image
                src="/images/screenshot.png?height=800&width=1200"
                alt="ChessMind AI Interface"
                className="object-cover"
                fill
                priority
              />
              {/* Screen Reflection */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-white/10"></div>
            </div>
            {/* Notch */}
            <div className="absolute left-1/2 top-0 h-6 w-24 -translate-x-1/2 rounded-b-xl bg-gray-800"></div>
          </div>
          {/* Enhanced Device Shadow */}
          <div className="absolute -bottom-8 left-1/2 h-16 w-[90%] -translate-x-1/2 rounded-[2rem] bg-black/30 blur-2xl"></div>
        </div>
      </main>

      <footer className="py-8 px-4 sm:px-6 lg:px-8 text-center text-gray-400">
        <p>&copy; 2023 ChessMind AI. All rights reserved.</p>
      </footer>
    </div>
  )
}

function NavLink({ href, children, mobile = false }: { href: string, children: React.ReactNode, mobile?: boolean }) {
  const baseClasses = "text-sm hover:text-green-400 transition-colors"
  const mobileClasses = mobile ? "block py-2 px-4 text-center" : ""
  
  if (href.startsWith('#')) {
    return (
      <a href={href} className={`${baseClasses} ${mobileClasses}`}>
        {children}
      </a>
    )
  }
  
  return (
    <Link href={href} className={`${baseClasses} ${mobileClasses}`}>
      {children}
    </Link>
  )
}