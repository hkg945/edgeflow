"use client"

import { useLocale, useTranslations } from "next-intl"
import { usePathname, useRouter } from "@/i18n/routing"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Globe } from "lucide-react"
import { useTransition } from "react"

export function LanguageSwitcher() {
  const t = useTranslations("LocaleSwitcher")
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()

  const onSelectChange = (nextLocale: string) => {
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale })
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-white" disabled={isPending}>
          <Globe className="h-5 w-5" />
          <span className="sr-only">{t("label")}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => onSelectChange("en")} className={locale === "en" ? "bg-accent" : ""}>
          {t("en")}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onSelectChange("zh-TW")} className={locale === "zh-TW" ? "bg-accent" : ""}>
          {t("zh-TW")}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onSelectChange("zh-CN")} className={locale === "zh-CN" ? "bg-accent" : ""}>
          {t("zh-CN")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
