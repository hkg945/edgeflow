"use client"

import { Link } from "@/i18n/routing"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Menu, X, MessageCircle } from "lucide-react"
import { useState } from "react"
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs"
import { useTranslations } from "next-intl"
import { LanguageSwitcher } from "./LanguageSwitcher"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const t = useTranslations("Navbar")

  return (
    <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold tracking-tighter text-white">
          EdgeFlow<span className="text-blue-500">.</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/indicators" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            {t("indicators")}
          </Link>
          <Link href="/#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            {t("features")}
          </Link>
          <Link href="/#pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            {t("pricing")}
          </Link>
          <SignedIn>
            <Link href="/dashboard" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              {t("dashboard")}
            </Link>
          </SignedIn>
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-4">
          <a href="https://discord.gg/" target="_blank" rel="noopener noreferrer">
            <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-foreground">
              <MessageCircle className="w-4 h-4" />
              <span>{t("discord")}</span>
            </Button>
          </a>
          <LanguageSwitcher />
          
          <SignedOut>
            <SignInButton mode="modal">
              <Button variant="ghost" size="sm">{t("login")}</Button>
            </SignInButton>
            <SignInButton mode="modal">
              <Button variant="gradient" size="sm">{t("freeTrial")}</Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton 
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: "w-9 h-9"
                }
              }}
            />
          </SignedIn>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <LanguageSwitcher />
          <button className="text-white" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden border-b border-white/10 bg-background px-4 py-4 flex flex-col gap-4 absolute w-full"
        >
          <Link href="/indicators" className="text-sm font-medium py-2" onClick={() => setIsOpen(false)}>{t("indicators")}</Link>
          <Link href="/#features" className="text-sm font-medium py-2" onClick={() => setIsOpen(false)}>{t("features")}</Link>
          <Link href="/#pricing" className="text-sm font-medium py-2" onClick={() => setIsOpen(false)}>{t("pricing")}</Link>
          
          <SignedIn>
            <Link href="/dashboard" className="text-sm font-medium py-2" onClick={() => setIsOpen(false)}>{t("dashboard")}</Link>
            <a href="https://discord.gg/" target="_blank" rel="noopener noreferrer" className="text-sm font-medium py-2 flex items-center gap-2" onClick={() => setIsOpen(false)}>
              <MessageCircle className="w-4 h-4" />
              {t("discord")}
            </a>
            <div className="py-2 flex justify-start">
               <UserButton afterSignOutUrl="/" />
            </div>
          </SignedIn>

          <SignedOut>
            <a href="https://discord.gg/" target="_blank" rel="noopener noreferrer" className="text-sm font-medium py-2 flex items-center gap-2" onClick={() => setIsOpen(false)}>
              <MessageCircle className="w-4 h-4" />
              {t("discord")}
            </a>
            <div className="flex flex-col gap-2 mt-2">
              <SignInButton mode="modal">
                <Button variant="ghost" className="w-full justify-start">{t("login")}</Button>
              </SignInButton>
              <SignInButton mode="modal">
                <Button variant="gradient" className="w-full justify-start">{t("freeTrial")}</Button>
              </SignInButton>
            </div>
          </SignedOut>
        </motion.div>
      )}
    </nav>
  )
}
