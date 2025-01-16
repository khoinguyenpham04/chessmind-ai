import { Github, Mail, Youtube, Instagram } from 'lucide-react'
import Link from "next/link"
import Image from "next/image"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#111827] text-white relative overflow-hidden">
     



      <div className="relative z-10 container mx-auto px-4 py-12 lg:py-24 max-w-7xl"> {/* Updated padding */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="col-span-1 lg:col-span-3 bg-[rgba(255,255,255,0.05)] backdrop-blur-sm rounded-xl p-6 lg:p-8 border border-[rgba(255,255,255,0.1)] flex flex-col items-center justify-center"> {/* Added flex, items-center, and justify-center */}
            <h1 className="text-5xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-[#7ed4fd] via-[#709dff] to-[#8d7aff]">
              Connect With Me
            </h1>

            <div className="grid grid-cols-2 gap-4 w-full max-w-2xl"> {/* Added w-full and max-w-2xl */}
              {[
                { icon: Github, label: "GitHub", href: "https://github.com/khoinguyenpham04", color: "group-hover:text-[#7ed4fd]" },
                { icon: Mail, label: "Email", href: "mailto:ptknguyen04@gmail.com", color: "group-hover:text-[#709dff]" },
                { icon: Youtube, label: "YouTube", href: "https://www.youtube.com/@khoinguyen_pham", color: "group-hover:text-[#ff0000]" },
                { icon: Instagram, label: "Instagram", href: "https://instagram.com/khoinguyen_pham", color: "group-hover:text-[#a855f7]" },
              ].map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className={`group flex items-center justify-center p-4 rounded-lg 
                    bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.05)]
                    transition-all duration-300 hover:bg-[rgba(255,255,255,0.08)]
                    hover:scale-105 hover:border-[rgba(255,255,255,0.2)]
                    hover:shadow-[0_0_15px_rgba(126,212,253,0.1)]`}
                >
                  <item.icon className={`w-8 h-8 mr-3 transition-colors duration-300 ${item.color}`} />
                  <span className="text-gray-300 group-hover:text-white transition-colors duration-300 text-sm">
                    {item.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          <div className="col-span-1 lg:col-span-2 bg-[rgba(255,255,255,0.05)] backdrop-blur-sm rounded-xl p-6 lg:p-8 border border-[rgba(255,255,255,0.1)] flex flex-col items-center">
            <div className="relative w-32 h-32 mb-6">
              <Image
                src="/images/icon.jpg?height=128&width=128"
                alt="Profile Picture"
                width={128}
                height={128}
                className="rounded-full border-4 border-[#7ed4fd]"
              />
            </div>
            <h2 className="text-2xl font-semibold mb-4 text-[#7ed4fd]">Noah - Pham Tran Khoi Nguyen</h2>
            <p className="text-gray-300 text-center mb-6">Chess Enthusiast & Software Developer</p>
            <ul className="space-y-3 text-gray-300 w-full">
              <li className="flex items-center justify-between">
                <span>♟️ Chess Rating</span>
                <span className="font-semibold">1400 ELO</span>
              </li>
              <li className="flex items-center justify-between">
                <span>🌍 Location</span>
                <span className="font-semibold">Manchester, UK</span>
              </li>
              <li className="flex items-center justify-between">
                <span>💼 Open for</span>
                <span className="font-semibold">Collaborations</span>
              </li>
            </ul>
            <div className="mt-8 w-full">
              <button className="w-full py-3 px-4 bg-[#22c55e] hover:bg-[#1ea550] text-white rounded-lg transition-colors duration-300">
                Let&apos;s Talk!
              </button>
            </div>
          </div>
        </div>

        <footer className="mt-16 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} ChessMind AI. All rights reserved.</p>
        </footer>
      </div>
    </div>
  )
}