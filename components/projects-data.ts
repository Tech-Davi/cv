export interface MediaItem {
  type: 'image' | 'video';
  src: string;
  poster?: string;
}

export interface Project {
  id: string;
  titleKey: string;
  subdescriptionKey: string;
  descriptionKey: string;
  technologies: string[];
  media: MediaItem[];
}

export const projectsData: Project[] = [
  {
    id: 'amas',
    titleKey: 'ecommerce_platform',
    subdescriptionKey: 'ecommerce_subdescription',
    descriptionKey: 'ecommerce_description',
    technologies: ['PHP', 'Bootstrap', 'MySQL', 'Docker', 'Apache'],
    media: [
      { type: 'image', src: '/amas/dashboard.png' },
      { type: 'image', src: '/amas/contatos.png' },
      { type: 'image', src: '/amas/cadastro.png' },
      { type: 'image', src: '/amas/kanbam.png' },
      { type: 'image', src: '/amas/relatorios.png' },
      { type: 'image', src: '/amas/calendario.png' },
      { type: 'image', src: '/amas/user.png' },
      { type: 'image', src: '/amas/docker.png' },
      { type: 'video', src: '/amas/amas.mp4', poster: '/amas/dashboard.png' },
    ],
  },
  {
    id: 'techdente',
    titleKey: 'crm_system',
    subdescriptionKey: 'crm_subdescription',
    descriptionKey: 'crm_description',
    technologies: ['PHP', 'MySQL', 'Docker', 'EvolutionAPI', 'TypeBot', 'Apache', 'Bootstrap'],
    media: [
      { type: 'image', src: '/techdente/painel.png' },
      { type: 'image', src: '/techdente/start.png' },
      { type: 'image', src: '/techdente/cadastro.png' },
      { type: 'image', src: '/techdente/status.png' },
      { type: 'image', src: '/techdente/retirada.png' },
      { type: 'image', src: '/techdente/evolution.png' },
      { type: 'image', src: '/techdente/dashboard.png' },
      { type: 'image', src: '/techdente/modal.png' },
      { type: 'image', src: '/techdente/toast.png' },
      { type: 'video', src: '/techdente/tech.mp4', poster: '/techdente/painel.png' },
    ],
  },
  {
    id: 'portfolio',
    titleKey: 'restful_api',
    subdescriptionKey: 'api_subdescription',
    descriptionKey: 'api_description',
    technologies: ['React', 'Next.Js', 'Tailwind', 'TypeScript', 'Framer Motion'],
    media: [
      { type: 'image', src: '/portfolio/portfolio.png' },
      { type: 'image', src: '/portfolio/404.png' },
      { type: 'image', src: '/portfolio/page.png' },
      { type: 'image', src: '/portfolio/layout.png' },
      { type: 'image', src: '/portfolio/language.png' },
      { type: 'image', src: '/portfolio/fade.png' },
      { type: 'image', src: '/portfolio/video.png' },
      { type: 'image', src: '/portfolio/carousel.png' },
      { type: 'video', src: '/portfolio/portfolio.mp4', poster: '/portfolio/portfolio.png' },
    ],
  },
  {
    id: 'barberlab',
    titleKey: 'barber_system',
    subdescriptionKey: 'barber_subdescription',
    descriptionKey: 'barber_description',
    technologies: ['React', 'Supabase', 'Tailwind', 'NextJs', 'Shadcn', 'TypeScript'],
    media: [
      { type: 'image', src: '/barberlab/home.png' },
      { type: 'image', src: '/barberlab/home2.png' },
      { type: 'image', src: '/barberlab/home3.png' },
      { type: 'image', src: '/barberlab/mobilehome.png' },
      { type: 'image', src: '/barberlab/master.png' },
      { type: 'image', src: '/barberlab/listauser.png' },
      { type: 'image', src: '/barberlab/service.png' },
      { type: 'image', src: '/barberlab/agendamento.png' },
      { type: 'image', src: '/barberlab/relatorio.png' },
      { type: 'image', src: '/barberlab/config.png' },
      { type: 'image', src: '/barberlab/configpreview.png' },
      { type: 'image', src: '/barberlab/configgaleria.png' },
      { type: 'image', src: '/barberlab/informacoes.png' },
      { type: 'image', src: '/barberlab/servicossite.png' },
      { type: 'image', src: '/barberlab/mobilemaster.png' },
      { type: 'image', src: '/barberlab/cliente.png' },
      { type: 'image', src: '/barberlab/mobilecliente.png' },
      { type: 'video', src: '/barberlab/BarberLab.mp4', poster: '/barberlab/home.png' },
    ],
  },
  {
    id: 'driverapp',
    titleKey: 'driver_system',
    subdescriptionKey: 'driver_subdescription',
    descriptionKey: 'driver_description',
    technologies: ['React', 'Supabase', 'Tailwind', 'NextJs', 'TypeScript'],
    media: [
      { type: 'image', src: '/driverapp/login.png' },
      { type: 'image', src: '/driverapp/home.png' },
      { type: 'image', src: '/driverapp/dropprofile.png' },
      { type: 'image', src: '/driverapp/profile.png' },
      { type: 'image', src: '/driverapp/goals.png' },
      { type: 'image', src: '/driverapp/trips.png' },
      { type: 'image', src: '/driverapp/timer.png' },
      { type: 'image', src: '/driverapp/reports.png' },
      { type: 'image', src: '/driverapp/homemobile.png' },
      { type: 'image', src: '/driverapp/profilemobile.png' },
      { type: 'image', src: '/driverapp/tripsmobile.png' },
      { type: 'image', src: '/driverapp/goalsmobile.png' },
      { type: 'image', src: '/driverapp/reportsmobile.png' },
      { type: 'image', src: '/driverapp/vs1.png' },
      { type: 'video', src: '/driverapp/driverapp.mp4', poster: '/driverapp/login.png' },
    ],
  },
  {
    id: 'pibpe',
    titleKey: 'pibpe_system',
    subdescriptionKey: 'pibpe_subdescription',
    descriptionKey: 'pibpe_description',
    technologies: ['React', 'Supabase', 'Tailwind', 'NextJs', 'TypeScript'],
    media: [
      { type: 'image', src: '/pibpe/home.png' },
      { type: 'image', src: '/pibpe/agenda.png' },
      { type: 'image', src: '/pibpe/anuncios.png' },
      { type: 'image', src: '/pibpe/historia.png' },
      { type: 'image', src: '/pibpe/pedido.png' },
      { type: 'image', src: '/pibpe/contato.png' },
      { type: 'image', src: '/pibpe/admin.png' },
      { type: 'image', src: '/pibpe/dashadmin.png' },
      { type: 'image', src: '/pibpe/homemobile.png' },
      { type: 'image', src: '/pibpe/anunciosmobile.png' },
      { type: 'image', src: '/pibpe/pedidomobile.png' },
      { type: 'image', src: '/pibpe/contatomobile.png' },
      { type: 'image', src: '/pibpe/vscode.png' },
      { type: 'video', src: '/pibpe/pibpe.mp4', poster: '/pibpe/login.png' },
    ],
  },
];