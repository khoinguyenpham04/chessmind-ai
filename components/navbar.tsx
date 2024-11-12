'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
      <header className="py-6 px-4 sm:px-6 lg:px-8 flex justify-center">
        <nav className="relative w-full max-w-3xl">
          <div className="absolute inset-0 bg-gray-800 bg-opacity-50 blur"></div>
          <div className="relative bg-gray-800 bg-opacity-50 rounded-full px-4 py-2 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Link href="/" className="text-lg font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                ChessMind AI
              </Link>
            </div>
            <div className="hidden md:flex space-x-4">
              <NavLink href="/">Home</NavLink>
              <NavLink href="/practice">Practice</NavLink>
              <NavLink href="#contact">Contact</NavLink>
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
        <div className="md:hidden bg-gray-800 bg-opacity-95 py-4">
          <NavLink href="/" mobile>Home</NavLink>
          <NavLink href="/practice" mobile>Practice</NavLink>
          <NavLink href="#contact" mobile>Contact</NavLink>
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