import { ChessGameComponent } from "@/components/chess-game"
import { Navbar } from "@/components/navbar"

export default function PracticePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      <Navbar />
      <ChessGameComponent />
    </div>
  )
}