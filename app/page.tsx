"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Code2, Database, ExternalLink, Github, Linkedin, Mail, Server, User, Eye, ChevronDown, ChevronUp } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageToggle } from "@/components/language-toggle"
import { useLanguage } from "@/contexts/language-context"
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/fade-in"
import { FaWhatsapp } from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";
import { projectsData } from "@/components/projects-data"
import { FullscreenCarousel } from "@/components/fullscreen-carousel"
import { useState } from "react"

export default function PortfolioPage() {
  const { t, language } = useLanguage()
  const [selectedProject, setSelectedProject] = useState<typeof projectsData[0] | null>(null)
  const [isCarouselOpen, setIsCarouselOpen] = useState(false)
  const [showAllProjects, setShowAllProjects] = useState(false)

  const order = [
  'barberlab',
  'techdente',
  'pibpe',
  'amas',
  'driverapp',
  'portfolio',
];

  const orderedProjects = [...projectsData].sort(
    (a, b) => order.indexOf(a.id) - order.indexOf(b.id)
  );

  const handleViewDetails = (project: typeof projectsData[0]) => {
    setSelectedProject(project)
    setIsCarouselOpen(true)
  }

  // Define quantos projetos mostrar inicialmente
  const initialProjectsCount = 3
  const displayedProjects = showAllProjects 
    ? orderedProjects 
    : orderedProjects.slice(0, initialProjectsCount)
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/75 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Code2 className="h-6 w-6 text-emerald-600" />
            <span className="font-bold">Cleverson Davi</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="#about" className="text-sm font-medium hover:text-emerald-600 transition-colors">
              {t("about_me")}
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
            <a href="mailto:contato@cleversondavi.com.br">
              <Button variant="outline" className="hidden md:flex">
                <Mail className="mr-2 h-4 w-4" />
                {t("hire_me")}
              </Button>
            </a>
          </div>
          <div className="flex md:hidden items-center gap-2">
            <LanguageToggle />
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="container pb-8 md:py-2">
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
                      <a href="#projects">{t("view_projects")}</a>
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
                          TypeScript
                        </Badge>
                        <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transform transition duration-200 hover:scale-110 cursor-default">
                          NodeJs
                        </Badge>                             
                        <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transform transition duration-200 hover:scale-110 cursor-default">
                          React
                        </Badge>
                        <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transform transition duration-200 hover:scale-110 cursor-default">
                          Next.js
                        </Badge>
                        <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transform transition duration-200 hover:scale-110 cursor-default">
                          PHP
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
                          PostgreSQL
                        </Badge>
                        <Badge variant="secondary" className="bg-emerald-50 text-blue-700 hover:bg-blue-100 transform transition duration-200 hover:scale-110 cursor-default">
                          Prisma
                        </Badge>    
                        <Badge variant="secondary" className="bg-emerald-50 text-blue-700 hover:bg-blue-100 transform transition duration-200 hover:scale-110 cursor-default">
                          MongoDB
                        </Badge>                    
                        <Badge variant="secondary" className="bg-emerald-50 text-blue-700 hover:bg-blue-100 transform transition duration-200 hover:scale-110 cursor-default">
                          MySQL
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
                    <Badge variant="outline" className="hover:bg-muted transform transition duration-200 hover:scale-110">JavaScript</Badge>
                    <Badge variant="outline" className="hover:bg-muted transform transition duration-200 hover:scale-110">Postman</Badge>
                    <Badge variant="outline" className="hover:bg-muted transform transition duration-200 hover:scale-110">MongoDB</Badge>
                    <Badge variant="outline" className="hover:bg-muted transform transition duration-200 hover:scale-110">JWT</Badge>
                    <Badge variant="outline" className="hover:bg-muted transform transition duration-200 hover:scale-110">Express</Badge>
                    <Badge variant="outline" className="hover:bg-muted transform transition duration-200 hover:scale-110">Zod</Badge>
                    <Badge variant="outline" className="hover:bg-muted transform transition duration-200 hover:scale-110">Cors</Badge>
                    <Badge variant="outline" className="hover:bg-muted transform transition duration-200 hover:scale-110">Bcrypt</Badge>
                    <Badge variant="outline" className="hover:bg-muted transform transition duration-200 hover:scale-110">Bootstrap</Badge>
                    <Badge variant="outline" className="hover:bg-muted transform transition duration-200 hover:scale-110">jQuery</Badge>
                    <Badge variant="outline" className="hover:bg-muted transform transition duration-200 hover:scale-110">AJAX</Badge>
                    <Badge variant="outline" className="hover:bg-muted transform transition duration-200 hover:scale-110">Apache</Badge>
                    <Badge variant="outline" className="hover:bg-muted transform transition duration-200 hover:scale-110">React</Badge>
                    <Badge variant="outline" className="hover:bg-muted transform transition duration-200 hover:scale-110">PHPMyAdmin</Badge>
                    <Badge variant="outline" className="hover:bg-muted transform transition duration-200 hover:scale-110">Git</Badge>
                    <Badge variant="outline" className="hover:bg-muted transform transition duration-200 hover:scale-110">Framer-Motion</Badge>
                    <Badge variant="outline" className="hover:bg-muted transform transition duration-200 hover:scale-110">TypeBot</Badge>
                    <Badge variant="outline" className="hover:bg-muted transform transition duration-200 hover:scale-110">EvolutionAPI</Badge>
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

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-500 ease-in-out">
                {displayedProjects.map((project, index) => (
                  <FadeIn key={project.id} delay={0.2 + index * 0.1}>
                    <Card className="overflow-hidden h-full flex flex-col group hover:shadow-lg transition-all duration-300">
                      <div 
                        className="relative aspect-video w-full overflow-hidden bg-muted cursor-pointer"
                        onClick={() => handleViewDetails(project)}
                      >
                        <Image
                          src={project.media[0].src}
                          alt={t(project.titleKey)}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <Button variant="secondary" size="sm" className="gap-2">
                            <Eye className="h-4 w-4" />
                            {t("view_details")}
                          </Button>
                        </div>
                      </div>
                      <CardContent className="p-6 flex-grow">
                        <div className="space-y-2">
                          <h3 className="text-xl font-bold">{t(project.titleKey)}</h3>
                          <span className="text-xs text-muted-foreground">{t(project.subdescriptionKey)}</span>
                          <p className="text-muted-foreground text-sm">{t(project.descriptionKey)}</p>
                          <div className="flex flex-wrap gap-2 pt-2">
                            {project.technologies.map((tech) => (
                              <Badge key={tech} variant="outline">{tech}</Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </FadeIn>
                ))}
              </div>

              {/* Botão Ver Mais / Ver Menos */}
              {projectsData.length > initialProjectsCount && (
                <FadeIn delay={0.6}>
                  <div className="flex justify-center pt-6">
                    <Button
                      onClick={() => setShowAllProjects(!showAllProjects)}
                      variant="outline"
                      size="lg"
                      className="gap-2 hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-600 transition-all duration-300 transform hover:scale-105 active:scale-95"
                    >
                      {showAllProjects ? (
                        <>
                          <ChevronUp className="h-4 w-4" />
                          {t("show_less")}
                        </>
                      ) : (
                        <>
                          <ChevronDown className="h-4 w-4" />
                          {t("show_more")}
                        </>
                      )}
                    </Button>
                  </div>
                </FadeIn>
              )}
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto px-4 md:px-0">
                <FadeIn direction="left" delay={0.3}>
                  <Card className="w-full">
                    <CardContent className="p-4 sm:p-6">
                      <form
                        action="https://formspree.io/f/mwpojvdy"
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
                              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
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
                              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
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
                              className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                              placeholder={t('your_message')}
                            ></textarea>
                          </div>
                        </div>
                        <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                          {t("send_message")}
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </FadeIn>

                <FadeIn direction="right" delay={0.5}>
                  <div className="space-y-4 w-full">
                    <Card className="w-full">
                      <CardContent className="p-4 sm:p-6">
                        <div className="flex items-center gap-4">
                          <div className="bg-emerald-100 p-3 rounded-full shrink-0">
                            <Mail className="h-6 w-6 text-emerald-600" />
                          </div>
                          <div className="min-w-0">
                            <h3 className="font-medium">{t("email")}</h3>
                            <p className="text-muted-foreground text-sm truncate">contato@cleversondavi.com.br</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="w-full">
                      <CardContent className="p-4 sm:p-6">
                        <div className="flex items-center gap-4">
                          <div className="bg-emerald-100 p-3 rounded-full shrink-0">
                            <User className="h-6 w-6 text-emerald-600" />
                          </div>
                          <div>
                            <h3 className="font-medium">{t("social_profiles")}</h3>
                            <div className="flex gap-4 mt-2">
                              <a
                                href="https://github.com/Tech-Davi"
                                target="_blank"
                                className="text-muted-foreground hover:text-emerald-600 transition-colors"
                              >
                                <Github className="h-5 w-5" />
                                <span className="sr-only">GitHub</span>
                              </a>
                              <a
                                href="https://www.linkedin.com/in/cleverson-davi/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-muted-foreground hover:text-emerald-600 transition-colors"
                              >
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

                    <Card className="w-full">
                      <CardContent className="p-4 sm:p-6">
                        <div className="space-y-4">
                          <h3 className="font-medium">{t("availability")}</h3>
                          <div className="space-y-2">
                            <div className="flex justify-between items-center gap-2">
                              <span className="text-muted-foreground text-sm">{t("freelance_projects")}</span>
                              <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 animate-blink shrink-0">
                                {t("available")}
                              </Badge>
                            </div>
                            <div className="flex justify-between items-center gap-2">
                              <span className="text-muted-foreground text-sm">{t("full_time")}</span>
                              <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 animate-blink shrink-0">
                                {t("limited")}
                              </Badge>
                            </div>
                            <div className="flex justify-between items-center gap-2">
                              <span className="text-muted-foreground text-sm">{t("consulting")}</span>
                              <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 animate-blink shrink-0">
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
              &copy; {new Date().getFullYear()} @{t("author")}. {t("rights_reserved")}
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

      {/* Fullscreen Carousel Modal */}
      {selectedProject && (
        <FullscreenCarousel
          media={selectedProject.media}
          isOpen={isCarouselOpen}
          onClose={() => {
            setIsCarouselOpen(false)
            setSelectedProject(null)
          }}
          autoPlayInterval={3000}
          videoDuration={5000}
        />
      )}
    </div>
  )
}