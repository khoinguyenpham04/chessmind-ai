'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { UserButton, SignInButton, SignUpButton, useAuth } from "@clerk/nextjs"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { isSignedIn } = useAuth()

  return (
    <>
      <header className="py-6 px-4 sm:px-6 lg:px-8 flex justify-center relative z-50">
        <nav className="relative w-full max-w-4xl">
          <div className="absolute inset-0 bg-gray-950/20 backdrop-blur-md rounded-full"></div>
          <div className="absolute inset-0 rounded-full border border-white/5"></div>
          <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/5 to-transparent"></div>
          <div className="relative rounded-full px-4 py-2 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Link href="/" className="text-lg font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                ChessMind AI
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <NavLink href="/">Home</NavLink>
              <NavLink href="/practice">Practice</NavLink>
              <NavLink href="#contact">Contact</NavLink>
              <div className="flex items-center space-x-3">
                {isSignedIn ? (
                  <UserButton afterSignOutUrl="/" />
                ) : (
                  <>
                    <Link href="/sign-in">
                      <button className="px-4 py-1.5 rounded-full bg-gray-800 text-white text-sm font-medium shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] hover:shadow-[inset_0_-2px_0_0_rgba(0,0,0,0.1)] transition-all">
                        Sign in
                      </button>
                    </Link>
                    <Link href="/sign-up">
                      <button className="px-4 py-1.5 rounded-full bg-gradient-to-r from-green-400 to-blue-500 text-white text-sm font-medium shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] hover:shadow-[inset_0_-2px_0_0_rgba(0,0,0,0.1)] transition-all">
                        Sign up
                      </button>
                    </Link>
                  </>
                )}
              </div>
            </div>
            <button 
              className="md:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </nav>
      </header>

      {isMenuOpen && (
        <div className="md:hidden relative z-50">
          <div className="absolute inset-0 bg-gray-950/20 backdrop-blur-md"></div>
          <div className="relative bg-gradient-to-b from-white/5 to-transparent border-t border-white/5 py-4 px-4 space-y-4">
            <NavLink href="/" mobile>Home</NavLink>
            <NavLink href="/practice" mobile>Practice</NavLink>
            <NavLink href="#contact" mobile>Contact</NavLink>
            <div className="flex flex-col space-y-2 pt-4">
              {isSignedIn ? (
                <div className="flex justify-center">
                  <UserButton afterSignOutUrl="/" />
                </div>
              ) : (
                <>
                  <Link href="/sign-in">
                    <button className="w-full px-4 py-2 rounded-full bg-gray-800 text-white text-sm font-medium shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] hover:shadow-[inset_0_-2px_0_0_rgba(0,0,0,0.1)] transition-all">
                      Sign in
                    </button>
                  </Link>
                  <Link href="/sign-up">
                    <button className="w-full px-4 py-2 rounded-full bg-gradient-to-r from-green-400 to-blue-500 text-white text-sm font-medium shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] hover:shadow-[inset_0_-2px_0_0_rgba(0,0,0,0.1)] transition-all">
                      Sign up
                    </button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
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