'use client'

import { ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { Navbar } from './navbar'
import { useRouter } from 'next/navigation'
import { Github, Star } from 'lucide-react'

export function LandingPageComponent() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white font-sans antialiased relative overflow-hidden">
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
          backgroundPosition: 'center center',
          mask: 'radial-gradient(circle at center, black 20%, transparent 80%)',
        }}
      ></div>

      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 70% 0%, rgba(0,255,170,0.1), transparent 65%)',
        }}
      ></div>

      <Navbar />
      <div className="relative z-10">
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20"> {/* Added pt-32 for navbar spacing */}
          <div className="text-center mb-20">
            <h1 className="text-5xl sm:text-6xl font-semibold tracking-tight mb-6 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              Your Personal AI Chess Coach
            </h1>
            <p className="text-xl mb-10 text-gray-400 max-w-2xl mx-auto">
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

          <div className="relative -mr-56 mt-8 overflow-hidden px-2 sm:mr-0 sm:mt-12 md:mt-20">
              <div
                  aria-hidden
                  className="bg-linear-to-b to-background absolute inset-0 z-10 from-transparent from-35%"
              />
              <div className="inset-shadow-2xs ring-background dark:inset-shadow-white/20 bg-background relative mx-auto max-w-6xl overflow-hidden rounded-2xl border p-4 shadow-lg shadow-zinc-950/15 ring-1">
                  <Image
                      className="bg-background aspect-15/8 relative hidden rounded-2xl dark:block"
                      src="/images/official.png"
                      alt="app screen"
                      width={2700}
                      height={1440}
                  />
                  <Image
                      className="z-2 border-border/25 aspect-15/8 relative rounded-2xl border dark:hidden"
                      src="/images/official.png"
                      alt="app screen"
                      width={2700}
                      height={1440}
                  />
              </div>
          </div>
        </main>

        <footer className="bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex flex-col items-center justify-between space-y-4 sm:flex-row sm:space-y-0">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} ChessMind AI by Pham Tran Khoi Nguyen. All rights reserved.
            </p>
            <a
              href="https://github.com/khoinguyenpham04/chessmind-ai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-200"
            >
              <Github className="h-5 w-5" />
              <span className="text-sm">Star us on GitHub</span>
              <Star className="h-4 w-4 fill-current" />
            </a>
          </div>
        </footer>
      </div>
    </div>
  )
}

