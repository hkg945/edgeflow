import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { ChatDashboard } from "@/components/dashboard/chat/ChatDashboard"

export default function ChatPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 pt-24 pb-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Live Chat Support</h1>
          <p className="text-muted-foreground">Interact with users in real-time</p>
        </div>

        <ChatDashboard />
      </main>

      <Footer />
    </div>
  )
}
