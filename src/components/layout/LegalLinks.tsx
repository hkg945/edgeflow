"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

type LegalDocType = "terms" | "privacy" | "disclaimer" | null

export function LegalLinks() {
  const t = useTranslations("Footer.legal")
  const tDocs = useTranslations("LegalDocs")
  const [activeDoc, setActiveDoc] = useState<LegalDocType>(null)

  const docs = [
    { key: "terms" as const, label: t("terms") },
    { key: "privacy" as const, label: t("privacy") },
    { key: "disclaimer" as const, label: t("disclaimer") },
  ]

  const handleOpen = (doc: LegalDocType) => {
    setActiveDoc(doc)
  }

  const handleClose = () => {
    setActiveDoc(null)
  }

  return (
    <>
      <ul className="space-y-2 text-sm text-muted-foreground">
        {docs.map((doc) => (
          <li key={doc.key}>
            <button
              onClick={() => handleOpen(doc.key)}
              className="hover:text-blue-400 transition-colors text-left"
            >
              {doc.label}
            </button>
          </li>
        ))}
      </ul>

      <Dialog open={!!activeDoc} onOpenChange={(open) => !open && handleClose()}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl">{activeDoc && tDocs(`${activeDoc}.title`)}</DialogTitle>
            <DialogDescription className="sr-only">
               {activeDoc && tDocs(`${activeDoc}.title`)}
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 whitespace-pre-wrap text-muted-foreground leading-relaxed">
            {activeDoc && tDocs(`${activeDoc}.content`)}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
