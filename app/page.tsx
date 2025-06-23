"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Code2, Database, ExternalLink, Github, Linkedin, Mail, Server, User } from "lucide-react"
import { ProjectCarousel } from "@/components/project-carousel"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageToggle } from "@/components/language-toggle"
import { useLanguage } from "@/contexts/language-context"
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/fade-in"
import { FaWhatsapp } from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";


export default function PortfolioPage() {
  const { t, language } = useLanguage()


  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Code2 className="h-6 w-6 text-emerald-600" />
            <span className="font-bold">Cleverson Davi</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="#about" className="text-sm font-medium hover:text-emerald-600 transition-colors">
              {t("about")}
            </Link>
            <Link href="#skills" className="text-sm font-medium hover:text-emerald-600 transition-colors">
              {t("skills")}
            </Link>
            <Link href="#projects" className="text-sm font-medium hover:text-emerald-600 transition-colors">
              {t("projects")}
            </Link>
            <Link href="#experience" className="text-sm font-medium hover:text-emerald-600 transition-colors">
              {t("experience")}
            </Link>
            <Link href="#contact" className="text-sm font-medium hover:text-emerald-600 transition-colors">
              {t("contact")}
            </Link>
          </nav>
          <div className="hidden md:flex items-center gap-2">
            <LanguageToggle />
            <ThemeToggle />
            <a
            href="mailto:contato@cleversondavi.com.br"
            >
            <Button variant="outline" className="hidden md:flex">
              <Mail className="mr-2 h-4 w-4" />
              {t("hire_me")}
            </Button>
          </a>
          </div>
          <div className="flex md:hidden items-center gap-2">
            <LanguageToggle />
            <ThemeToggle />
            {/*
            <Button variant="ghost" size="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="18" y2="18" />
              </svg>
            </Button>
            */}
          </div>
        </div>
      </header>

      <main className="container py-8 md:py-12">
        {/* Hero Section */}
        <section id="about" className="py-12 md:py-20">
          <div className="grid gap-8 md:grid-cols-2 md:gap-12 items-center">
            <FadeIn direction="left" duration={0.8}>
              <div className="space-y-4">
                <FadeIn delay={0.2}>
                  <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100">
                    {t("available_for_hire")}
                  </Badge>
                </FadeIn>
                <FadeIn delay={0.4}>
                  <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                    {t("php_web_developer")} <span className="text-emerald-600">{t("backend_specialist")}</span>
                  </h1>
                </FadeIn>
                <FadeIn delay={0.6}>
                  <p className="text-muted-foreground text-lg">{t("hero_description")}</p>
                </FadeIn>
                <FadeIn delay={0.8}>
                  <div className="flex gap-4 pt-4">
                    <Button className="bg-emerald-600 hover:bg-emerald-700">
                      <a 
                      href="#projects">{t("view_projects")}
                      </a>
                    </Button>
                    <Button variant="outline">
                      <a href={language === "pt-br" ? "/cv-pt.pdf" : "/cv-en.pdf"} download>
                        {t("download_cv")}
                      </a>
                    </Button>
                  </div>
                </FadeIn>
              </div>
            </FadeIn>
            <FadeIn direction="right" duration={0.8} delay={0.3}>
              <div className="flex justify-center">
                <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-emerald-600">
                  <Image
                    src="/person.webp?height=320&width=320"
                    alt="Cleverson Davi"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-12 border-t scroll-mt-24">
          <FadeIn>
            <div className="space-y-8">
              <div className="text-center space-y-2">
                <FadeIn delay={0.2}>
                  <h2 className="text-3xl font-bold">{t("technical_skills")}</h2>
                </FadeIn>
                <FadeIn delay={0.4}>
                  <p className="text-muted-foreground max-w-2xl mx-auto">{t("skills_description")}</p>
                </FadeIn>
              </div>

              <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6" staggerDelay={0.2}>
                <StaggerItem>
                  <Card>
                    <CardContent className="p-6 space-y-4">
                      <div className="flex items-center gap-3">
                        <Code2 className="h-8 w-8 text-emerald-600" />
                        <h3 className="text-xl font-bold">{t("backend_development")}</h3>
                      </div>

                        <div className="flex flex-wrap gap-2">
                          <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transform transition duration-200 hover:scale-110 cursor-default">
                            PHP
                          </Badge>      

                          <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transform transition duration-200 hover:scale-110 cursor-default">
                            TypeScript
                          </Badge>

                          <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transform transition duration-200 hover:scale-110 cursor-default">
                            React
                          </Badge>

                          <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transform transition duration-200 hover:scale-110 cursor-default">
                            Next.js
                          </Badge>

                          <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transform transition duration-200 hover:scale-110 cursor-default">
                            Laravel
                          </Badge>
                        </div>
                    </CardContent>
                  </Card>
                </StaggerItem>

                <StaggerItem>
                  <Card>
                    <CardContent className="p-6 space-y-4">
                      <div className="flex items-center gap-3">
                        <Database className="h-8 w-8 text-emerald-600" />
                        <h3 className="text-xl font-bold">{t("databases")}</h3>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary" className="bg-emerald-50 text-blue-700 hover:bg-blue-100 transform transition duration-200 hover:scale-110 cursor-default">
                            MySQL
                          </Badge>

                          <Badge variant="secondary" className="bg-emerald-50 text-blue-700 hover:bg-blue-100 transform transition duration-200 hover:scale-110 cursor-default">
                            SQLite
                          </Badge>

                          <Badge variant="secondary" className="bg-emerald-50 text-blue-700 hover:bg-blue-100 transform transition duration-200 hover:scale-110 cursor-default">
                            Prisma
                          </Badge>

                          <Badge variant="secondary" className="bg-emerald-50 text-blue-700 hover:bg-blue-100 transform transition duration-200 hover:scale-110 cursor-default">
                            PostgreSQL
                          </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </StaggerItem>

                <StaggerItem>
                  <Card>
                    <CardContent className="p-6 space-y-4">
                      <div className="flex items-center gap-3">
                        <Server className="h-8 w-8 text-emerald-600" />
                        <h3 className="text-xl font-bold">{t("devops_others")}</h3>
                      </div>
                      <div className="flex item-center gap-2">
                        <Badge variant="secondary" className="bg-emerald-50 text-purple-700 hover:bg-purple-100 transform transition duration-200 hover:scale-110 cursor-default">
                          Docker
                        </Badge>

                        <Badge variant="secondary" className="bg-emerald-50 text-purple-700 hover:bg-purple-100 transform transition duration-200 hover:scale-110 cursor-default">
                          Git
                        </Badge>

                        <Badge variant="secondary" className="bg-emerald-50 text-purple-700 hover:bg-purple-100 transform transition duration-200 hover:scale-110 cursor-default">
                          RESTful APIs
                        </Badge>
                        
                        <Badge variant="secondary" className="bg-emerald-50 text-purple-700 hover:bg-purple-100 transform transition duration-200 hover:scale-110 cursor-default">
                          Tailwind
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </StaggerItem>
              </StaggerContainer>

              {/* Seção adicional: Outras tecnologias */}
              <FadeIn delay={0.6}>
                <div className="text-center space-y-4">
                  <h3 className="text-lg font-semibold text-muted-foreground">{t("other_technologies")}</h3>
                  <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto cursor-default">
                    <Badge variant="outline" className="hover:bg-muted">
                      HTML5
                    </Badge>
                    <Badge variant="outline" className="hover:bg-muted transform transition duration-200 hover:scale-110">
                      CSS3
                    </Badge>
                    <Badge variant="outline" className="hover:bg-muted transform transition duration-200 hover:scale-110">
                      JavaScript
                    </Badge>
                    <Badge variant="outline" className="hover:bg-muted transform transition duration-200 hover:scale-110">
                      Bootstrap
                    </Badge>
                    <Badge variant="outline" className="hover:bg-muted transform transition duration-200 hover:scale-110">
                      jQuery
                    </Badge>
                    <Badge variant="outline" className="hover:bg-muted transform transition duration-200 hover:scale-110">
                      AJAX
                    </Badge>
                    <Badge variant="outline" className="hover:bg-muted transform transition duration-200 hover:scale-110">
                      Apache
                    </Badge>
                    <Badge variant="outline" className="hover:bg-muted transform transition duration-200 hover:scale-110">
                      PHPMyAdmin
                    </Badge>
                    <Badge variant="outline" className="hover:bg-muted transform transition duration-200 hover:scale-110">
                      Postman
                    </Badge>
                    <Badge variant="outline" className="hover:bg-muted transform transition duration-200 hover:scale-110">
                      TypeBot
                    </Badge>
                    <Badge variant="outline" className="hover:bg-muted transform transition duration-200 hover:scale-110">
                      EvolutionAPI
                    </Badge>
                  </div>
                </div>
              </FadeIn>
            </div>
          </FadeIn>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-12 border-t scroll-mt-24">
          <FadeIn>
            <div className="space-y-8">
              <div className="text-center space-y-2">
                <FadeIn delay={0.2}>
                  <h2 className="text-3xl font-bold">{t("featured_projects")}</h2>
                </FadeIn>
                <FadeIn delay={0.4}>
                  <p className="text-muted-foreground max-w-2xl mx-auto">{t("projects_description")}</p>
                </FadeIn>
              </div>

              <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.15}>
                <StaggerItem>
                  <Card className="overflow-hidden">
                    <ProjectCarousel
                      media={[
                        { type: "image", src: "/amas/dashboard.png?height=200&width=400&text=E-commerce+Dashboard" },
                        { type: "image", src: "/amas/contatos.png?height=200&width=400&text=Product+Catalog" },
                        { type: "image", src: "/amas/cadastro.png?height=200&width=400&text=Shopping+Cart" },
                        { type: "image", src: "/amas/kanbam.png?height=200&width=400&text=Admin+Panel" },
                        { type: "image", src: "/amas/relatorios.png?height=200&width=400&text=effeffef" },
                        { type: "image", src: "/amas/calendario.png?height=200&width=400&text=fwv" },
                        { type: "image", src: "/amas/user.png?height=200&width=400&text=wrvrwv" },
                        { type: "image", src: "/amas/docker.png?height=200&width=400&text=wrvwrv" },
                        { type: "video", src: "/amas/amas.mp4", poster: "/amas/dashboard.png?height=200&width=400&text=tetet", },
                      ]}
                      alt="E-commerce Platform"
                      autoPlayInterval={3000} // 3 segundos para imagens
                      videoDuration={5000} // 5 segundos para vídeos
                    />
                    <CardContent className="p-6">
                      <div className="space-y-2">
                        <h3 className="text-xl font-bold">{t("ecommerce_platform")}</h3>
                        <span className="text-xs">{t("ecommerce_subdescription")}</span>
                        <p className="text-muted-foreground text-sm">{t("ecommerce_description")}</p>
                        <div className="flex flex-wrap gap-2 pt-2">
                          <Badge variant="outline">PHP</Badge>
                          <Badge variant="outline">Bootstrap</Badge>
                          <Badge variant="outline">MySQL</Badge>
                          <Badge variant="outline">Docker</Badge>
                          <Badge variant="outline">Apache</Badge>
                          <Badge variant="outline">Bootstrap</Badge>
                        </div>
                        <div className="flex gap-2 pt-4">
                          <Button variant="outline" size="sm" className="gap-1">
                            <Github className="h-4 w-4" />
                            {t("code")}
                          </Button>
                          <Button variant="outline" size="sm" className="gap-1">
                            <ExternalLink className="h-4 w-4" />
                            {t("demo")}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </StaggerItem>

                <StaggerItem>
                  <Card className="overflow-hidden">
                    <ProjectCarousel
                      media={[
                        { type: "image", src: "/techdente/painel.png?height=200&width=400&text=Cadastro TypeBot" },
                        { type: "image", src: "/techdente/start.png?height=200&width=400&text=Start" },
                        { type: "image", src: "/techdente/cadastro.png?height=200&width=400&text=Cadastro" },
                        { type: "image", src: "/techdente/status.png?height=200&width=400&text=Status" },
                        { type: "image", src: "/techdente/retirada.png?height=200&width=400&text=Retirada" },
                        { type: "image", src: "/techdente/evolution.png?height=200&width=400&text=Evolution" },
                        { type: "image", src: "/techdente/dashboard.png?height=200&width=400&text=Dashboard" },
                        { type: "image", src: "/techdente/modal.png?height=200&width=400&text=Modal" },
                        { type: "image", src: "/techdente/toast.png?height=200&width=400&text=Toast" },
                        { type: "video", src: "/techdente/tech.mp4", poster: "/techdente/painel.png?height=200&width=400&text=tetet",
                        },
                      ]}
                      alt="CRM System"
                      autoPlayInterval={3000} // 3 segundos para imagens
                      videoDuration={5000} // 5 segundos para vídeos
                    />
                    <CardContent className="p-6">
                      <div className="space-y-2">
                        <h3 className="text-xl font-bold">{t("crm_system")}</h3>
                        <span className="text-xs">{t("crm_subdescription")}</span>
                        <p className="text-muted-foreground text-sm">{t("crm_description")}</p>
                        <div className="flex flex-wrap gap-2 pt-2">
                          <Badge variant="outline">PHP</Badge>
                          <Badge variant="outline">MySQL</Badge>
                          <Badge variant="outline">Docker</Badge>
                          <Badge variant="outline">EvolutionAPI</Badge>
                          <Badge variant="outline">TypeBot</Badge>
                          <Badge variant="outline">Apache</Badge>
                          <Badge variant="outline">Bootstrap</Badge>
                        </div>
                        <div className="flex gap-2 pt-4">
                          <Button variant="outline" size="sm" className="gap-1">
                            <Github className="h-4 w-4" />
                            {t("code")}
                          </Button>
                          <Button variant="outline" size="sm" className="gap-1">
                            <ExternalLink className="h-4 w-4" />
                            {t("demo")}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </StaggerItem>

                <StaggerItem>
                  <Card className="overflow-hidden">
                    <ProjectCarousel
                      media={[
                        { type: "image", src: "/placeholder.svg?height=200&width=400&text=API+Documentation" },
                        { type: "image", src: "/placeholder.svg?height=200&width=400&text=Authentication+System" },
                        { type: "image", src: "/placeholder.svg?height=200&width=400&text=Rate+Limiting" },
                        { type: "image", src: "/placeholder.svg?height=200&width=400&text=Monitoring+Dashboard" },
                      ]}
                      alt="API Platform"
                    />
                    <CardContent className="p-6">
                      <div className="space-y-2">
                        <h3 className="text-xl font-bold">{t("restful_api")}</h3>
                        <span className="text-xs">{t("api_subdescription")}</span>
                        <p className="text-muted-foreground text-sm">{t("api_description")}</p>
                        <div className="flex flex-wrap gap-2 pt-2">
                          <Badge variant="outline">PHP</Badge>
                          <Badge variant="outline">Laravel</Badge>
                          <Badge variant="outline">MySQL</Badge>
                          <Badge variant="outline">Docker</Badge>
                        </div>
                        <div className="flex gap-2 pt-4">
                          <Button variant="outline" size="sm" className="gap-1">
                            <Github className="h-4 w-4" />
                            {t("code")}
                          </Button>
                          <Button variant="outline" size="sm" className="gap-1">
                            <ExternalLink className="h-4 w-4" />
                            {t("demo")}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </StaggerItem>
              </StaggerContainer>

              {/*
              <FadeIn delay={0.6}>
                <div className="flex justify-center pt-6">
                  <Button variant="outline">{t("view_all_projects")}</Button>
                </div>
              </FadeIn>*/}
            </div>
          </FadeIn>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-12 border-t scroll-mt-24">
          <FadeIn>
            <div className="space-y-8">
              <div className="text-center space-y-2">
                <FadeIn delay={0.2}>
                  <h2 className="text-3xl font-bold">{t("work_experience")}</h2>
                </FadeIn>
                <FadeIn delay={0.4}>
                  <p className="text-muted-foreground max-w-2xl mx-auto">{t("experience_description")}</p>
                </FadeIn>
              </div>

              <div className="space-y-8">
                <FadeIn direction="left" delay={0.2}>
                  <div className="relative pl-8 border-l-2 border-emerald-600 pb-8">
                    <div className="absolute w-4 h-4 bg-emerald-600 rounded-full -left-[9px] top-0"></div>
                    <div className="space-y-2">
                      <div className="flex flex-wrap justify-between items-start gap-2">
                        <h3 className="text-xl font-bold">{t("senior_php")}</h3>
                        <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100">
                          2014 - {t("present")}
                        </Badge>
                      </div>
                      <p className="font-medium">{t("techsolutions_company")}</p>
                      <p className="text-muted-foreground">{t("senior_description")}</p>
                      <ul className="list-disc list-inside text-muted-foreground space-y-1">
                        <li>{t("senior_task_1")}</li>
                        <li>{t("senior_task_2")}</li>
                        <li>{t("senior_task_3")}</li>
                        <li>{t("senior_task_4")}</li>
                      </ul>
                    </div>
                  </div>
                </FadeIn>

                <FadeIn direction="left" delay={0.6}>
                  <div className="relative pl-8 border-l-2 border-muted">
                    <div className="absolute w-4 h-4 bg-muted rounded-full -left-[9px] top-0"></div>
                    <div className="space-y-2">
                      <div className="flex flex-wrap justify-between items-start gap-2">
                        <h3 className="text-xl font-bold">{t("junior_web")}</h3>
                        <Badge variant="outline">2022 - 2025</Badge>
                      </div>
                      <p className="font-medium">{t("digital_company")}</p>
                      <p className="text-muted-foreground">{t("junior_description")}</p>
                      <ul className="list-disc list-inside text-muted-foreground space-y-1">
                        <li>{t("junior_task_1")}</li>
                        <li>{t("junior_task_2")}</li>
                        <li>{t("junior_task_3")}</li>
                        <li>{t("junior_task_4")}</li>
                      </ul>
                    </div>
                  </div>
                </FadeIn>

                <FadeIn direction="left" delay={0.4}>
                  <div className="relative pl-8 border-l-2 border-muted pb-8">
                    <div className="absolute w-4 h-4 bg-muted rounded-full -left-[9px] top-0"></div>
                    <div className="space-y-2">
                      <div className="flex flex-wrap justify-between items-start gap-2">
                        <h3 className="text-xl font-bold">{t("php_developer")}</h3>
                        <Badge variant="outline">2018 - 2021</Badge>
                      </div>
                      <p className="font-medium">{t("webcraft_company")}</p>
                      <p className="text-muted-foreground">{t("php_dev_description")}</p>
                      <ul className="list-disc list-inside text-muted-foreground space-y-1">
                        <li>{t("php_dev_task_1")}</li>
                        <li>{t("php_dev_task_2")}</li>
                        <li>{t("php_dev_task_3")}</li>
                        <li>{t("php_dev_task_4")}</li>
                      </ul>
                    </div>
                  </div>
                </FadeIn>
              </div>
            </div>
          </FadeIn>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-12 border-t scroll-mt-24">
          <FadeIn>
            <div className="space-y-8">
              <div className="text-center space-y-2">
                <FadeIn delay={0.2}>
                  <h2 className="text-3xl font-bold">{t("get_in_touch")}</h2>
                </FadeIn>
                <FadeIn delay={0.4}>
                  <p className="text-muted-foreground max-w-2xl mx-auto">{t("contact_description")}</p>
                </FadeIn>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <FadeIn direction="left" delay={0.3}>
                  <Card>
                    <CardContent className="p-6">
                      <form action="https://formspree.io/f/mwpojvdy"
                        method="POST"
                        className="space-y-4"
                      >
                        <div className="grid gap-4">
                          <div className="grid gap-2">
                            <label htmlFor="name" className="text-sm font-medium">
                              {t('name')}
                            </label>
                            <input
                              id="name"
                              name="name"
                              type="text"
                              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                              placeholder={t('your_name')}
                            />
                          </div>
                          <div className="grid gap-2">
                            <label htmlFor="email" className="text-sm font-medium">
                              Email
                            </label>
                            <input
                              id="email"
                              name="email"
                              type="email"
                              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                              placeholder={t('your_email')}
                            />
                          </div>
                          <div className="grid gap-2">
                            <label htmlFor="message" className="text-sm font-medium">
                              {t('label_Message')}
                            </label>
                            <textarea
                              id="message"
                              name="message"
                              className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                              placeholder={t('your_message')}
                            ></textarea>
                          </div>
                        </div>
                        <Button className="w-full bg-emerald-600 hover:bg-emerald-700">{t("send_message")}</Button>
                      </form>
                    </CardContent>
                  </Card>
                </FadeIn>

                <FadeIn direction="right" delay={0.5}>
                  <div className="space-y-6">
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                          <div className="bg-emerald-100 p-3 rounded-full">
                            <Mail className="h-6 w-6 text-emerald-600" />
                          </div>
                          <div>
                            <h3 className="font-medium">{t("email")}</h3>
                            <p className="text-muted-foreground">contato@cleversondavi.com.br</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                          <div className="bg-emerald-100 p-3 rounded-full">
                            <User className="h-6 w-6 text-emerald-600" />
                          </div>
                          <div>
                            <h3 className="font-medium">{t("social_profiles")}</h3>
                            <div className="flex gap-4 mt-2">
                              <a 
                                href="https://github.com/Tech-Davi"
                                target="_blank"
                                className="text-muted-foreground hover:text-emerald-600 transition-colors">
                                <Github className="h-5 w-5" />
                                <span className="sr-only">GitHub</span>
                              </a>
                              <a 
                                href="https://www.linkedin.com/in/cleverson-davi/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-muted-foreground hover:text-emerald-600 transition-colors">
                                <Linkedin className="h-5 w-5" />
                                <span className="sr-only">LinkedIn</span>
                              </a>
                              <a
                                href="https://wa.me/5511967194469"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-muted-foreground hover:text-emerald-600 transition-colors"
                              >
                                <FaWhatsapp className="h-5 w-5" />
                                <span className="sr-only">WhatsApp</span>
                              </a>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-6">
                        <div className="space-y-4">
                          <h3 className="font-medium">{t("availability")}</h3>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">{t("freelance_projects")}</span>
                              <Badge 
                                className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 animate-blink">
                                {t("available")}
                              </Badge>
                            </div>

                            <div className="flex justify-between">
                              <span className="text-muted-foreground">{t("full_time")}</span>
                              <Badge 
                                className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 animate-blink">
                                {t("limited")}
                              </Badge>
                            </div>

                            <div className="flex justify-between">
                              <span className="text-muted-foreground">{t("consulting")}</span>
                              <Badge 
                                className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 animate-blink">
                                {t("available")}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </FadeIn>
              </div>
            </div>
          </FadeIn>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-6 md:py-8">
        <FadeIn direction="down" delay={0.5}>
          <div className="container flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
            <div className="flex items-center gap-2">
              <Code2 className="h-5 w-5 text-emerald-600" />
              <span className="font-bold">Cleverson Davi</span>
            </div>
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} @i. {t("rights_reserved")}
            </p>
            <div className="flex gap-4">
              <a 
                href="https://github.com/Tech-Davi"
                target="_blank"
                className="text-muted-foreground hover:text-emerald-600 transition-colors">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
                <a 
                href="https://www.linkedin.com/in/cleverson-davi/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-emerald-600 transition-colors">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a
                href="mailto:contato@cleversondavi.com.br"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-emerald-600 transition-colors"
              >
                <MdAlternateEmail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </a>
            </div>
          </div>
        </FadeIn>
      </footer>
    </div>
  )
}

