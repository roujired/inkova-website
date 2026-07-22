/**
 * INKOVA Communication — contenu du site.
 * Source de vérité pour les 7 pôles et leurs services.
 * Le client peut compléter la liste (49 services au total) sans toucher au layout :
 * il suffit d'ajouter des entrées dans les tableaux `services`.
 */

export type Accent = 'blue' | 'yellow' | 'magenta';

export interface Service {
  title: string;
  desc?: string;
}

export interface Niche {
  id: string;            // anchor id
  index: string;         // "01"…"07"
  name: string;          // FR display name
  tagline: string;       // short punchy line
  intro?: string;        // real Inkova copy
  accent: Accent;
  dark: boolean;         // black or white chapter
  art: 'strategy' | 'design' | 'content' | 'digital' | 'web' | 'print' | 'events';
  services: Service[];
  techniques?: Service[]; // niche 6 — horizontal-scroll technique sub-cards
  expectedTotal?: number; // catalog target (layout stays flexible)
}

export const NICHES: Niche[] = [
  {
    id: 'strategie',
    index: '01',
    name: 'Stratégie de Marque & Conseil',
    tagline: 'Le point de départ de chaque projet.',
    intro:
      'Positionnement, planification stratégique, conseil en communication : c’est ici que tout commence. Nous construisons des fondations solides avant de passer à la création.',
    accent: 'blue',
    dark: true,
    art: 'strategy',
    services: [
      { title: 'Positionnement de marque', desc: 'Définir une place unique et durable sur votre marché.' },
      { title: 'Planification stratégique', desc: 'Des plans d’action clairs, mesurables et alignés sur vos objectifs.' },
      { title: 'Conseil en communication', desc: 'Un regard expert pour guider chaque décision de communication.' },
      { title: 'Audit de marque', desc: 'Analyser l’existant pour révéler les vrais leviers de croissance.' },
    ],
  },
  {
    id: 'design',
    index: '02',
    name: 'Design Créatif & Identité Visuelle',
    tagline: 'Une communication visuelle percutante.',
    intro:
      'Services de conception graphique pour une communication visuelle percutante ! Nous créons des supports de communication adaptés à l’affichage sur écran ou à l’impression.',
    accent: 'yellow',
    dark: false,
    art: 'design',
    services: [
      { title: 'Conception graphique', desc: 'Des créations sur mesure, pensées pour marquer les esprits.' },
      { title: 'Identité visuelle', desc: 'Logo, charte graphique, systèmes visuels complets et cohérents.' },
      { title: 'Supports print & écran', desc: 'Des créations adaptées à tous les formats de diffusion.' },
      { title: 'Direction artistique', desc: 'Une vision créative forte, du concept à l’exécution.' },
    ],
  },
  {
    id: 'contenu',
    index: '03',
    name: 'Contenu & Production Média',
    tagline: 'Attirez, engagez, inspirez.',
    intro:
      'Créez un impact visuel instantané avec notre service de création de contenu graphique pour les réseaux sociaux. Attirez, engagez et inspirez votre audience !',
    accent: 'magenta',
    dark: true,
    art: 'content',
    services: [
      { title: 'Contenu réseaux sociaux', desc: 'Des visuels qui arrêtent le scroll et engagent votre communauté.' },
      { title: 'Production visuelle', desc: 'Photo et vidéo au service de votre image de marque.' },
      { title: 'Motion design', desc: 'Des contenus animés qui donnent vie à vos messages.' },
      { title: 'Campagnes créatives', desc: 'Des concepts de campagne complets, du visuel au message.' },
    ],
  },
  {
    id: 'digital',
    index: '04',
    name: 'Marketing Digital & Croissance',
    tagline: 'Des campagnes qui performent.',
    intro:
      'Stratégie digitale, gestion de campagnes et marketing orienté croissance : nous transformons vos objectifs business en résultats mesurables.',
    accent: 'blue',
    dark: false,
    art: 'digital',
    services: [
      { title: 'Stratégie digitale', desc: 'Une feuille de route digitale claire et orientée résultats.' },
      { title: 'Gestion de campagnes', desc: 'Pilotage et optimisation de vos campagnes publicitaires.' },
      { title: 'Social media management', desc: 'Animation et développement de votre présence sur les réseaux.' },
      { title: 'Growth marketing', desc: 'Des leviers d’acquisition activés pour accélérer votre croissance.' },
    ],
  },
  {
    id: 'web',
    index: '05',
    name: 'Web & Expérience Digitale',
    tagline: 'Une navigation fluide, sur tous les appareils.',
    intro:
      'Optimisez l’expérience de vos utilisateurs avec des sites web responsive, offrant une navigation fluide sur tous les appareils.',
    accent: 'yellow',
    dark: true,
    art: 'web',
    services: [
      { title: 'Sites web responsive', desc: 'Des sites rapides et élégants, parfaits sur mobile comme sur desktop.' },
      { title: 'Design UX / UI', desc: 'Des interfaces pensées pour vos utilisateurs avant tout.' },
      { title: 'Développement web', desc: 'Des réalisations techniques robustes et évolutives.' },
      { title: 'Maintenance & évolution', desc: 'Un accompagnement durable pour faire grandir votre plateforme.' },
    ],
  },
  {
    id: 'print',
    index: '06',
    name: 'Impression & Personnalisation',
    tagline: 'L’expertise matière, tous supports, tous formats.',
    intro:
      'INKOVA Communication met à votre service toute son expertise en conseil de matériaux et de mode d’impression, et ce sur tous les supports et pour tous les formats, qu’ils soient petits ou grands.',
    accent: 'magenta',
    dark: false,
    art: 'print',
    services: [
      {
        title: 'Impression offset & numérique',
        desc: 'Notre service de personnalisation offre des solutions d’impression adaptées à tous types de supports et de quantités. Grâce à des techniques modernes et un savoir-faire précis, nous assurons des rendus de haute qualité, durables et esthétiques.',
      },
      {
        title: 'Grand format & habillage d’espaces',
        desc: 'Nous proposons des solutions d’impression grand format de haute qualité, incluant des bâches, des panneaux et des supports publicitaires de grande dimension. Nous assurons également l’habillage de vos espaces, garantissant une visibilité optimale et une identité visuelle percutante.',
      },
      {
        title: 'Affichage extérieur & mobilier urbain',
        desc: 'Nous proposons des solutions d’affichage publicitaire variées, incluant la conception, l’installation et la location d’écrans publicitaires sur autoroute, dans les centres-villes et autres emplacements stratégiques. Notre objectif est d’assurer une visibilité maximale pour votre marque.',
      },
    ],
    techniques: [
      {
        title: 'Sérigraphie',
        desc: 'Idéale pour les grandes séries, cette technique garantit des couleurs vives, résistantes et une excellente durabilité, parfaite pour les sacs, textiles et objets publicitaires.',
      },
      {
        title: 'DTF — Direct To Film',
        desc: 'Solution moderne pour le marquage textile, offrant une grande flexibilité, un rendu précis et des couleurs éclatantes, même sur de petites quantités.',
      },
      {
        title: 'DTF-UV — Impression UV à plat',
        desc: 'Technologie avancée permettant d’imprimer directement sur des surfaces rigides (stylos, blocs-notes, clés USB, etc.) avec un rendu haut de gamme et une excellente résistance.',
      },
    ],
  },
  {
    id: 'evenementiel',
    index: '07',
    name: 'Événementiel & Branding Expérientiel',
    tagline: 'La marque prend vie dans l’espace.',
    intro:
      'Notre pôle le plus physique : conception, fabrication et installation d’univers de marque tangibles — stands, PLV, signalétique, espaces de vente et événements.',
    accent: 'blue',
    dark: true,
    art: 'events',
    expectedTotal: 11,
    services: [
      {
        title: 'PLV — Publicité sur le lieu de vente',
        desc: 'Bois, métal, forex, plexi, verre ou carton… La matière est un vecteur de qualité et d’émotion. Des matériaux bien choisis ancrent l’ADN de votre produit ou de votre marque, et plongent immédiatement le client dans votre univers, apportant une touche d’authenticité.',
      },
      {
        title: 'Signalétique & systèmes d’exposition',
        desc: 'Nous collaborons avec les meilleurs partenaires afin de vous offrir la meilleure solution de système d’exposition pour votre évènement ou votre entreprise.',
      },
      {
        title: 'Aménagement de stands',
        desc: 'Vous exposez à un salon professionnel et souhaitez aménager votre espace ? Notre expertise multi-matériaux nous permet de vous accompagner dans la conception, la fabrication et l’installation de votre stand pour un résultat attractif, à l’image de votre identité.',
      },
      {
        title: 'Branding intérieur & extérieur',
        desc: 'Grâce à notre expérience dans le domaine du branding intérieur et extérieur, nous accompagnons notre client dans l’aménagement, la décoration ou le rebranding des locaux de son entreprise.',
      },
      {
        title: 'Cadeaux d’entreprise & goodies',
        desc: 'Nous personnalisons des goodies publicitaires uniques qui captent l’attention de votre audience. Des articles de qualité, personnalisés avec votre logo, pour renforcer votre visibilité et fidéliser vos clients.',
      },
      {
        title: 'Organisation d’événements',
        desc: 'Nous proposons des services complets d’organisation d’événements, en prenant en charge la planification, la coordination et l’exécution afin de garantir des expériences inoubliables pour vos invités.',
      },
    ],
  },
];

export const MANIFESTO =
  'Agence de publicité active sur le marché algérien, notre agence s’engage à élaborer les meilleures stratégies pour ses clients, le tout avec une bonne dose de fun. Nous travaillons dans tous les domaines de la communication et du marketing, afin d’offrir des expériences uniques et impactantes.';

export const PROCESS_STEPS = [
  {
    n: '01',
    title: 'Écoute & stratégie',
    desc: 'Nous partons de vos objectifs, de votre marché et de votre audience pour poser les bonnes fondations.',
  },
  {
    n: '02',
    title: 'Création',
    desc: 'Concepts, identités, contenus : nos équipes créatives donnent forme à la stratégie.',
  },
  {
    n: '03',
    title: 'Production',
    desc: 'Print, digital, fabrication multi-matériaux : nous produisons en interne, sans sous-traitance cachée.',
  },
  {
    n: '04',
    title: 'Installation & suivi',
    desc: 'Pose, habillage, lancement, mesure : nous restons à vos côtés jusqu’au résultat final — et au-delà.',
  },
];

export const CONTACT_EMAIL = 'inkovacommunication@gmail.com';
export const CONTACT_PHONE = '06 67 96 97 58';
export const CONTACT_PHONE_TEL = '+213667969758';
export const CONTACT_ADDRESS = 'Route de Birtouta, Khraïcia 16103, Alger, Algérie';
export const CONTACT_MAP_URL = 'https://maps.app.goo.gl/6ubb9UPhsX7TmXnt7';
export const INSTAGRAM_URL = 'https://www.instagram.com/inkovacommunication';
export const INSTAGRAM_HANDLE = '@inkovacommunication';
export const LINKEDIN_URL = 'https://www.linkedin.com/company/inkovacommunication';
export const LINKEDIN_HANDLE = 'inkovacommunication';

export const ACCENT_HEX: Record<Accent, string> = {
  blue: '#0391D1',
  yellow: '#FAE926',
  magenta: '#CB056C',
};
