"use client"
import Link from "next/link"
import { LanguageToggle } from "@/components/language-toggle"
import { useLanguage } from "@/contexts/language-context"

export default function NotFound() {
  const { t, language } = useLanguage()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <LanguageToggle />
      <h1 className="text-4xl font-pixel mb-4">{t("content_title")}</h1>
      <p className="font-mono mb-4">{t("content_text")}</p>
      <Link
        href="/"
        className="font-pixel bg-green-600 text-black px-4 py-2 rounded hover:bg-green-500 transition-colors"
      >
        {t("button_back")}
      </Link>
    </div>
  )
}
