'use client'

import { ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { Navbar } from './navbar'
import { useRouter } from 'next/navigation'

export function LandingPageComponent() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white font-sans antialiased relative overflow-hidden">
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          backgroundPosition: 'center center',
          mask: 'radial-gradient(circle at center, black 40%, transparent 100%)',
        }}
      ></div>

      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 50% 0%, rgba(0,255,170,0.1), transparent 60%)',
        }}
      ></div>

      <div className="relative z-10">
        <Navbar />
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-20">
            <h1 className="text-5xl sm:text-6xl font-bold mb-6 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              Master Chess with AI
            </h1>
            <p className="text-xl mb-10 text-gray-300">
              Elevate your game with personalized lessons, real-time analysis, and an AI opponent that adapts to your skill level.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <button 
                onClick={() => router.push('/practice')}
                className="px-8 py-3 rounded-full bg-gray-800 text-green-400 font-semibold shadow-[inset_0_2px_0_0_rgba(255,255,255,0.1),inset_0_-2px_0_0_rgba(0,0,0,0.2)] hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1),inset_0_-3px_0_0_rgba(0,0,0,0.3)] transition-all duration-300 ease-in-out transform hover:-translate-y-0.5"
              >
                Start Learning
              </button>
              <button className="px-8 py-3 rounded-full bg-gray-800 text-white font-semibold shadow-[inset_0_2px_0_0_rgba(255,255,255,0.1),inset_0_-2px_0_0_rgba(0,0,0,0.2)] hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1),inset_0_-3px_0_0_rgba(0,0,0,0.3)] transition-all duration-300 ease-in-out transform hover:-translate-y-0.5 flex items-center justify-center">
                Watch Demo
                <ChevronRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="relative w-full max-w-5xl mx-auto">
            <div className="relative aspect-[1.5] rounded-[2rem] border-[0.5rem] border-gray-800 bg-gray-800 p-2 shadow-2xl">
              <div className="relative h-full w-full overflow-hidden rounded-[1.5rem] bg-gray-900">
                <Image
                  src="/images/screenshot3.png?height=800&width=1300"
                  alt="ChessMind AI Interface"
                  className="object-cover"
                  fill
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-white/10"></div>
              </div>
              <div className="absolute left-1/2 top-0 h-6 w-24 -translate-x-1/2 rounded-b-xl bg-gray-800"></div>
            </div>
            <div className="absolute -bottom-8 left-1/2 h-16 w-[90%] -translate-x-1/2 rounded-[2rem] bg-black/30 blur-2xl"></div>
          </div>
        </main>

        <footer className="py-8 px-4 sm:px-6 lg:px-8 text-center text-gray-400">
          <p>&copy; 2023 ChessMind AI by Pham Tran Khoi Nguyen. All rights reserved.</p>
        </footer>
      </div>
    </div>
  )
}

