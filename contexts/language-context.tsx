"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type Language = "en" | "pt-br"

interface LanguageContextType {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: string) => string
}

const translations = {
  en: {
    // Header
    about: "About",
    skills: "Skills",
    projects: "Projects",
    experience: "Experience",
    contact: "Contact",
    hire_me: "Hire Me",

    // Hero
    available_for_hire: "Available for Hire",
    php_web_developer: "Full Stack Developer",
    backend_specialist: "with Focus on Scalable Web Systems",
    hero_description:
      "With 3+ years of experience, I create reliable and modern applications using PHP, TypeScript, and Next.js—delivering solid backend logic and seamless user experiences.",
    view_projects: "View Projects",
    download_cv: "Download CV",

    // Skills
    technical_skills: "Technical Skills",
    skills_description:
      "I have experience with a range of web development technologies, working across different layers of the application.",
    backend_development: "Development",
    databases: "Databases",
    devops_others: "DevOps & Others",
    other_technologies: "Other Technologies",

    // Projects
    featured_projects: "Featured Projects",
    projects_description: "A selection of my recent work showcasing my PHP development skills.",
    ecommerce_platform: "AMAS System",
    ecommerce_subdescription: "CRM for a Government Association",
    ecommerce_description: "Developed a web-based CRM tailored for a government-run association, featuring secure login, interactive dashboards, multi-step forms with photo capture, role-based access control, attendance tracking, meal management, and task organization.",
    crm_system: "TechDente",
    crm_subdescription: "SaaS Platform for Dental Clinics",
    crm_description: "Built a SaaS platform for managing dental prosthetic workflows, including role-based authentication, real-time dashboards, automated status updates via WhatsApp (using EvolutionAPI), and detailed reporting on production and delivery stages.",
    restful_api: "RESTful API Platform",
    api_subdescription: "Ainda vou pensar em algo aqui ####",
    api_description:
      "A scalable API platform built with PHP, Laravel, and MySQL. Includes authentication, rate limiting, and comprehensive documentation.",
    code: "Code",
    demo: "Demo",
    view_all_projects: "View All Projects",

    // Experience
    work_experience: "Work Experience",
    experience_description: "My professional journey as a PHP developer.",
    senior_php: "Full Stack Developer / Techinical Support",
    present: "Present",
    php_developer: "Brazilian Army",
    junior_web: "Technical Support / Telecommunications – VoIP",
    // Experience Details
    techsolutions_company: "Home",
    webcraft_company: "11º Grupo de Artilharia de Campanha",
    digital_company: "Neo Promotora / Sistema Oráculo",

    senior_description: "Lead backend developer for multiple enterprise-level PHP applications. Responsible for architecture design, code reviews, and mentoring junior developers.",
    senior_task_1: "Developed and maintained REST APIs focused on security and performance",
    senior_task_2: "Built full systems for institutions and clinics, including dashboards, automation, and access control",
    senior_task_3: "Provided technical support for hardware and software across PCs, networks, and printers",
    senior_task_4: "Worked on infrastructure including cabling, networking, CCTV, and OS support (Windows, Linux, MacOS)",

    php_dev_description: "Worked in the Army’s IT sector with tech support, networks, internal systems, and intranet development.",
    php_dev_task_1: "Worked as IT assistant, providing tech support and maintaining IT infrastructure",
    php_dev_task_2: "Developed the unit’s intranet in 2020",
    php_dev_task_3: "Performed maintenance on wired networks and local infrastructure",
    php_dev_task_4: "Installed and managed systems and NAS servers, both physical and virtual",

    junior_description: "Worked with network infrastructure, tech support, HelpDesk, and VoIP systems using PABX, Asterisk, Grafana, and Wireshark.",
    junior_task_1: "Provided tech support and maintenance for computers, local and external networks",
    junior_task_2: "Managed and configured VoIP systems with Asterisk and PABX",
    junior_task_3: "Used Wireshark and Grafana for traffic analysis and network monitoring",
    junior_task_4: "Worked in HelpDesk and managed infrastructure environment setup",

    // Contact
    get_in_touch: "Get In Touch",
    contact_description: "Interested in working together? Feel free to contact me for any project or collaboration.",
    name: "Name",
    email: "Email",
    message: "Message",
    send_message: "Send Message",
    social_profiles: "Social Profiles",
    availability: "Availability",
    freelance_projects: " On-site/Hybrid in SP and RJ",
    available: "Available",
    full_time: "Home-Office",
    limited: "Available",
    consulting: "Freelancer",

     //Form
    Name: "Name",
    Email: "Email",
    Message: "Mensage",
    label_Message: "Menssage",
    your_name: "Your Name",
    your_email: "Your Email",
    your_message: "Your Message",

    // Footer
    rights_reserved: "All rights reserved.",

    // Language
    switch_to_pt: "Switch to Pt-BR",
  },
  "pt-br": {
    // Header
    about: "Sobre",
    skills: "Habilidades",
    projects: "Projetos",
    experience: "Experiência",
    contact: "Contato",
    hire_me: "Contrate-me",

    // Hero
    available_for_hire: "Disponível para Contratação",
    php_web_developer: "Desenvolvedor Full Stack",
    backend_specialist: "com foco em sistemas web modernos e eficientes",
    hero_description: "Atuo há mais de 3 anos criando aplicações confiáveis e bem estruturadas com PHP, TypeScript e Next.js, unindo uma base sólida no backend com interfaces leves e funcionais.",
    view_projects: "Ver Projetos",
    download_cv: "Baixar Currículo",

    // Skills
    technical_skills: "Habilidades Técnicas",
    skills_description: "Tenho vivência em diversas tecnologias voltadas para o desenvolvimento web, atuando em diferentes camadas da aplicação.",
    backend_development: "Desenvolvimento",
    databases: "Bancos de Dados",
    devops_others: "DevOps & Outros",
    other_technologies: "Outras Tecnologias",

    // Projects
    featured_projects: "Projetos em Destaque",
    projects_description: "Uma seleção dos meus trabalhos recentes demonstrando minhas habilidades em PHP.",
    ecommerce_platform: "Sistema AMAS",
    ecommerce_subdescription: "CRM para Associação Governamental",
    ecommerce_description:
      "Desenvolvi um sistema web para uma associação governamental, com login seguro, dashboard interativo, formulários com upload de fotos, controle de acesso por perfil, registro de presenças, controle de refeições e gestão de tarefas.",
    crm_system: "TechDente",
    crm_subdescription: "SaaS para Clínica Odontológica",
    crm_description: "Sistema web em modelo SaaS para gestão de peças protéticas, com autenticação por nível de acesso, dashboards em tempo real, integração com WhatsApp via EvolutionAPI, e relatórios detalhados de produção e entrega.",
    restful_api: "Plataforma de API RESTful",
    api_subdescription: "Ainda vou por algo aqui ####",
    api_description:
      "Uma plataforma de API escalável construída com PHP, Laravel e MySQL. Inclui autenticação, limitação de taxa e documentação abrangente.",
    code: "Código",
    demo: "Demo",
    view_all_projects: "Ver Todos os Projetos",

    // Experience
    work_experience: "Experiência Profissional",
    experience_description: "Minha jornada profissional como desenvolvedor PHP.",
    senior_php: "Desenvolvedor Full Stack / Suporte Técnico",
    present: "Presente",
    php_developer: "Exército Brasileiro",
    junior_web: "Suporte Técnico / Telecomunicações – VoIP",
    // Experience Details
    techsolutions_company: "Home",
    webcraft_company: "11º Grupo de Artilharia de Campanha",
    digital_company: "Neo Promotora / Sistema Oráculo",

    senior_description: "Profissional com atuação em desenvolvimento full stack e experiência em suporte técnico e infraestrutura.",
    senior_task_1: "Realizei manutenção e desenvolvimento de APIs REST para integração entre sistemas internos",
    senior_task_2: "Criei sistemas completos para instituições e clínicas, com dashboards, automações e controle de acesso",
    senior_task_3: "Prestei suporte técnico em hardware e software, garantindo funcionamento de PCs, redes e impressoras",
    senior_task_4: "Atuei em infraestrutura com cabeamento, redes, CFTV e suporte a Windows, Linux e MacOS",

    php_dev_description: "Atuei no setor de informática do Exército com suporte técnico, redes, sistemas internos e criação da Intranet.",
    php_dev_task_1: "Atuei como auxiliar de informática, prestando suporte técnico e mantendo a infraestrutura de TI",
    php_dev_task_2: "Criei a Intranet da unidade em 2020",
    php_dev_task_3: "Realizei manutenção em redes cabeadas e infraestrutura local",
    php_dev_task_4: "Fiz a instalação e administração de sistemas e servidores NAS, físicos e virtuais",

    junior_description: "Atuei com infraestrutura de rede, suporte técnico, HelpDesk e telefonia VoIP, com foco em PABX, Asterisk, Grafana e Wireshark.",
    junior_task_1: "Realizei suporte técnico e manutenção em computadores, rede local e externa",
    junior_task_2: "Gerenciei e configurei sistemas de telefonia VoIP com Asterisk e PABX",
    junior_task_3: "Utilizei Wireshark e Grafana para análise de tráfego e monitoramento de rede",
    junior_task_4: "Atuei no HelpDesk e na configuração e gestão de ambientes de infraestrutura",

    // Contact
    get_in_touch: "Entre em Contato",
    contact_description:
      "Interessado em trabalhar juntos? Sinta-se à vontade para me contatar para qualquer projeto ou colaboração.",
    name: "Nome",
    email: "Email",
    message: "Mensagem",
    send_message: "Enviar Mensagem",
    social_profiles: "Perfis Sociais",
    availability: "Disponibilidade",
    freelance_projects: "Presencial/Híbrido em SP e RJ",
    available: "Disponível",
    full_time: "Home-Office",
    limited: "Disponível",
    consulting: "Freelancer",

    //Form
    Name: "Nome",
    Email: "Email",
    Message: "Mensagem",
    label_Message: "Menssagem",
    your_name: "Seu Nome",
    your_email: "Seu Email",
    your_message: "Sua Mensagem",
    
    // Footer
    rights_reserved: "Todos os direitos reservados.",

    // Language
    switch_to_pt: "Mudar para Português",
    switch_to_en: "Mudar para Inglês",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  const t = (key: string): string => {
    return translations[language][key as keyof (typeof translations)[typeof language]] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
