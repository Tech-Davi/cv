"use client"

import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"
import { Globe } from "lucide-react"

export function LanguageToggle() {
  const { language, setLanguage, t } = useLanguage()

  const nextLanguage = language === "en" ? "pt-br" : "en"

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setLanguage(nextLanguage)}
      className="flex items-center gap-1"
      title={t(`switch_to_${nextLanguage === "pt-br" ? "pt" : "en"}`)}
    >
      <Globe className="h-4 w-4 mr-1" />
      {language === "pt-br" ? "PT-BR" : "EN"}
    </Button>
  )
}

