"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { updateTradingViewUsername } from "@/actions/user"
import { Loader2, Settings } from "lucide-react"
import { useTranslations } from "next-intl"

interface TradingViewAccountDialogProps {
  initialUsername?: string
}

export function TradingViewAccountDialog({ initialUsername }: TradingViewAccountDialogProps) {
  const t = useTranslations("Dashboard.dialog")
  const [open, setOpen] = useState(false)
  const [username, setUsername] = useState(initialUsername || "")
  const [isLoading, setIsLoading] = useState(false)

  const handleSave = async () => {
    setIsLoading(true)
    try {
      await updateTradingViewUsername(username)
      setOpen(false)
    } catch (error) {
      console.error("Failed to update username:", error)
      alert(t("error"))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="w-full">
          <Settings className="w-4 h-4 mr-2" />
          {initialUsername ? t("trigger.edit") : t("trigger.set")}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t("title")}</DialogTitle>
          <DialogDescription>
            {t("description")}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right text-white">
              {t("label")}
            </Label>
            <Input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="col-span-3 bg-white/5 border-white/10 text-white"
              placeholder={t("placeholder")}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="gradient" onClick={handleSave} disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {t("save")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
