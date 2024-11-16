import { ChessGameComponent } from "@/components/chess-game"
import { Navbar } from "@/components/navbar"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

export default async function PracticePage() {
  const { userId } = await auth()
  
  if (!userId) {
    redirect("/sign-in")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      <Navbar />
      <ChessGameComponent />
    </div>
  )
}