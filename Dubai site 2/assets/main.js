// Property database (exact copy from React for static detail rendering and search)
const empreendimentosData = [
  {
    id: 'authoria',
    nome: 'Authoria por Dubai',
    slug: 'authoria-por-dubai',
    bairro: 'Vila Yara',
    cidade: 'Osasco',
    status: 'Lançamento',
    statusLabel: 'Lançamento',
    area: '120m² a 165m²',
    dormitorios: '3 a 4 Suítes',
    vagas: '2 a 3 Vagas',
    slogan: 'A expressão máxima de sofisticação e design contemporâneo.',
    descricao: 'Projetado para quem valoriza a exclusividade. Um projeto que redefine o concept de alto padrão na região com arquitetura autoral, acabamento primoroso e lazer de resort.',
    precoBase: 'Sob Consulta',
    fotos: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80'
    ],
    plantas: [
      { nome: 'Planta Tipo 120m²', imagem: 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&w=600&q=80', desc: '3 suítes, amplo living integrado à varanda gourmet.' },
      { nome: 'Planta Duplex 165m²', imagem: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=600&q=80', desc: '4 suítes, pé-direito duplo no living, terraço estendido.' }
    ],
    progressoObra: { fundacao: 100, estrutura: 20, alvenaria: 5, acabamento: 0 },
    diferenciais: [
      'Piscina aquecida com borda infinita e vista panorâmica',
      'Elevador privativo com biometria',
      'Varanda Gourmet integrada com churrasqueira a carvão',
      'Gerador de energia para 100% das áreas comuns e apartamentos',
      'Fechaduras eletrônicas e automação residencial inclusa'
    ]
  },
  {
    id: 'yara',
    nome: 'Yara por Dubai',
    slug: 'yara-por-dubai',
    bairro: 'Vila Yara',
    cidade: 'Osasco',
    status: 'Em Obras',
    statusLabel: 'Em Obras',
    area: '82m² a 115m²',
    dormitorios: '2 a 3 Dormitórios (1 a 2 Suítes)',
    vagas: '1 a 2 Vagas',
    slogan: 'Elegância em cada detalhe, no bairro mais desejado.',
    descricao: 'O Yara por Dubai combina uma localização privilegiada com plantas inteligentes e funcionais de alto padrão. O espaço ideal para a sua família crescer com segurança e sofisticação.',
    precoBase: 'Sob Consulta',
    fotos: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80'
    ],
    plantas: [
      { nome: 'Planta 82m²', imagem: 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&w=600&q=80', desc: '2 dorms (1 suíte), cozinha americana, varanda nivelada.' },
      { nome: 'Planta 115m²', imagem: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=600&q=80', desc: '3 dorms (2 suítes), living ampliado, churrasqueira integrada.' }
    ],
    progressoObra: { fundacao: 100, estrutura: 85, alvenaria: 45, acabamento: 12 },
    diferenciais: [
      'Ponto de recarga para carro elétrico por apartamento',
      'Áreas comuns entregues totalmente decoradas e equipadas',
      'Janelas com persiana integrada e atenuação acústica',
      'Espaço coworking exclusivo no condomínio',
      'Depósito privativo nos subsolos'
    ]
  },
  {
    id: 'legend',
    nome: 'Legend por Dubai',
    slug: 'legend-por-dubai',
    bairro: 'Bela Vista',
    cidade: 'Osasco',
    status: 'Em Obras',
    statusLabel: 'Em Obras',
    area: '95m² a 130m²',
    dormitorios: '3 Dormitórios (2 a 3 Suítes)',
    vagas: '2 Vagas',
    slogan: 'Um novo marco arquitetônico no horizonte de Osasco.',
    descricao: 'Legend é sinônimo de exclusividade. Uma torre única com imponência visual sem precedentes, lazer completo de resort e plantas flexíveis feitas sob medida para o seu estilo de vida.',
    precoBase: 'Sob Consulta',
    fotos: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80'
    ],
    plantas: [
      { nome: 'Planta 95m²', imagem: 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&w=600&q=80', desc: '3 dorms (2 suítes), churrasqueira integrada, varanda.' },
      { nome: 'Planta 130m²', imagem: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=600&q=80', desc: '3 suítes, living 2 ambientes integrado à varanda de ponta a ponta.' }
    ],
    progressoObra: { fundacao: 100, structure: 60, alvenaria: 25, acabamento: 5 },
    diferenciais: [
      'Quadra de Tênis oficial no condomínio',
      'Tratamento acústico sob o contrapiso',
      'Academia com assessoria esportiva profissional instalada',
      'Piscina coberta e aquecida com raia de 25m',
      'Pet Place completo com área de banho'
    ]
  },
  {
    id: 'acervo',
    nome: 'Acervo por Dubai',
    slug: 'acervo-apartments-alphaville',
    bairro: 'Alphaville',
    cidade: 'Barueri',
    status: 'Pronto',
    statusLabel: 'Pronto para Morar',
    area: '180m² a 240m²',
    dormitorios: '4 Suítes',
    vagas: '3 a 4 Vagas',
    slogan: 'Pronto para morar com a verdadeira assinatura de luxo.',
    descricao: 'Para quem não aceita menos do que a perfeição absoluta. O Acervo Alphaville é um marco entregue rigorosamente no prazo estabelecido, consolidando o padrão Dubai com refinamento extremo.',
    precoBase: 'Sob Consulta',
    fotos: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
    ],
    plantas: [
      { nome: 'Planta Mansão Suspensa 180m²', imagem: 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&w=600&q=80', desc: '4 suítes plenas, sala íntima, terraço gourmet 180°.' },
      { nome: 'Planta Penthouse 240m²', imagem: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=600&q=80', desc: '4 suítes, terraço privativo com jacuzzi, acabamentos em mármore importado.' }
    ],
    progressoObra: { fundacao: 100, estrutura: 100, alvenaria: 100, acabamento: 100 },
    diferenciais: [
      'Entregue rigorosamente dentro do prazo contratual',
      'Hall de entrada privativo e elevadores de alta velocidade',
      'Infraestrutura pronta para aspiração central e ar condicionado em todos os cômodos',
      'Lazer exclusivo com adega climatizada gourmet',
      'Segurança armada integrada 24 horas blindada'
    ]
  },
  {
    id: 'essence',
    nome: 'Essence por Dubai',
    slug: 'essence-por-dubai',
    bairro: 'Alphaville',
    cidade: 'Barueri',
    status: 'Pronto',
    statusLabel: 'Pronto para Morar',
    area: '150m² a 200m²',
    dormitorios: '3 a 4 Suítes',
    vagas: '3 Vagas',
    slogan: 'A essência do luxo contemporâneo em Alphaville.',
    descricao: 'Um projeto sofisticado entregue com acabamento nobre de altíssima qualidade. O Essence oferece plantas amplas e flexíveis para proporcionar o máximo conforto e exclusividade para a sua família.',
    precoBase: 'Sob Consulta',
    fotos: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80'
    ],
    plantas: [
      { nome: 'Planta 150m²', imagem: 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&w=600&q=80', desc: '3 suítes, amplo terraço integrado ao living.' }
    ],
    progressoObra: { fundacao: 100, estrutura: 100, alvenaria: 100, acabamento: 100 },
    diferenciais: ['Hall privativo', 'Vagas com ponto de recarga elétrica', 'Depósito privativo']
  },
  {
    id: 'mirage',
    nome: 'Mirage por Dubai',
    slug: 'mirage-por-dubai',
    bairro: 'Vila Yara',
    cidade: 'Osasco',
    status: 'Lançamento',
    statusLabel: 'Lançamento',
    area: '90m² a 130m²',
    dormitorios: '2 a 3 Suítes',
    vagas: '2 Vagas',
    slogan: 'Um miragem que se torna realidade de alto padrão.',
    descricao: 'O Mirage traz um design arrojado e moderno em uma localização estratégica. Uma verdadeira obra de arte residencial com piscina de borda infinita e lazer exclusivo de clube resort.',
    precoBase: 'Sob Consulta',
    fotos: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80'
    ],
    plantas: [
      { nome: 'Planta 90m²', imagem: 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&w=600&q=80', desc: '2 suítes com living nivelado e varanda.' }
    ],
    progressoObra: { fundacao: 10, estrutura: 0, alvenaria: 0, acabamento: 0 },
    diferenciais: ['Piscina na cobertura com vista infinita', 'Automação residencial integrada']
  },
  {
    id: 'verve',
    nome: 'Verve por Dubai',
    slug: 'verve-por-dubai',
    bairro: 'Bela Vista',
    cidade: 'Osasco',
    status: 'Em Obras',
    statusLabel: 'Em Obras',
    area: '110m² a 145m²',
    dormitorios: '3 Suítes',
    vagas: '2 Vagas',
    slogan: 'A energia e sofisticação de viver no ponto alto da cidade.',
    descricao: 'Com projeto arquitetônico assinado e paisagismo exuberante, o Verve foi desenhado para quem busca dinamismo, elegância e proximidade de todas as conveniências com total segurança.',
    precoBase: 'Sob Consulta',
    fotos: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80'
    ],
    plantas: [
      { nome: 'Planta 110m²', imagem: 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&w=600&q=80', desc: '3 suítes plenas, varanda integrada.' }
    ],
    progressoObra: { fundacao: 100, estrutura: 40, alvenaria: 10, acabamento: 0 },
    diferenciais: ['Academia com equipamentos de última geração', 'Gerador de energia para toda a unidade']
  },
  {
    id: 'prime',
    nome: 'Prime por Dubai',
    slug: 'prime-por-dubai',
    bairro: 'Alphaville',
    cidade: 'Barueri',
    status: 'Em Obras',
    statusLabel: 'Em Obras',
    area: '200m² a 280m²',
    dormitorios: '4 Suítes',
    vagas: '3 a 4 Vagas',
    slogan: 'A definição máxima de exclusividade em Alphaville.',
    descricao: 'Altíssimo padrão construtivo em uma das áreas mais nobres de Barueri. O Prime oferece mansões suspensas com acabamento de mármores importados e lazer luxuoso privativo.',
    precoBase: 'Sob Consulta',
    fotos: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80'
    ],
    plantas: [
      { nome: 'Planta Tipo 200m²', imagem: 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&w=600&q=80', desc: '4 suítes plenas, dependência completa, elevador social privativo.' }
    ],
    progressoObra: { fundacao: 100, estrutura: 70, alvenaria: 35, acabamento: 5 },
    diferenciais: ['Elevador social biométrico privativo', 'Aspiração central instalada', 'Adega gourmet comum']
  }
];

// Header scroll background management
const updateHeaderScroll = () => {
  const header = document.querySelector('header');
  if (!header) return;
  const isLight = document.documentElement.classList.contains('light-mode');
  const scrollY = window.scrollY;
  
  const currentPath = window.location.pathname;
  const isHome = currentPath.endsWith('index.html') || currentPath === '/' || currentPath.endsWith('/') || !currentPath.includes('.html');
  
  const needsGlass = scrollY > 20 || !isHome;
  const needsLightHeader = isLight && (scrollY > 20 || !isHome);
  
  if (needsGlass) {
    header.classList.add('glass-panel', 'border-b', 'border-zinc-955', 'shadow-lg');
    header.classList.remove('bg-transparent', 'border-transparent');
  } else {
    header.classList.remove('glass-panel', 'border-b', 'border-zinc-955', 'shadow-lg');
    header.classList.add('bg-transparent', 'border-transparent');
  }
  
  if (needsLightHeader) {
    header.classList.add('header-light');
  } else {
    header.classList.remove('header-light');
  }
};

// Theme management (Dark / Light mode)
const getTheme = () => localStorage.getItem('theme-mode') || 'dark';
const setTheme = (theme) => {
  localStorage.setItem('theme-mode', theme);
  const isLight = theme === 'light';
  if (isLight) {
    document.documentElement.classList.add('light-mode');
  } else {
    document.documentElement.classList.remove('light-mode');
  }
  
  // Update logo images on the page
  document.querySelectorAll('.logo-img, header img, footer img').forEach(img => {
    img.src = isLight ? 'assets/logo-dark.svg' : 'assets/logo.svg';
  });
  
  // Update floating theme switcher button title and icon
  const themeBtn = document.querySelector('button[title*="Visão"]');
  if (themeBtn) {
    themeBtn.setAttribute('title', isLight ? 'Visão Noturna' : 'Visão Diurna');
    const tooltip = themeBtn.querySelector('span');
    if (tooltip) {
      tooltip.innerText = isLight ? 'Visão Noturna' : 'Visão Diurna';
    }
    
    const sunSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sun text-[#d81d00] group-hover:scale-110 transition-transform duration-300"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></svg>`;
    const moonSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-moon text-[#d81d00] group-hover:scale-110 transition-transform duration-300"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></svg>`;
    
    const existingSVG = themeBtn.querySelector('svg');
    if (existingSVG) {
      existingSVG.outerHTML = isLight ? moonSVG : sunSVG;
    }
  }
  
  // Update header classes based on scroll and theme
  updateHeaderScroll();
  
  // Update theme icons
  document.querySelectorAll('.theme-icon-sun').forEach(el => {
    isLight ? el.classList.remove('hidden') : el.classList.add('hidden');
  });
  document.querySelectorAll('.theme-icon-moon').forEach(el => {
    isLight ? el.classList.add('hidden') : el.classList.remove('hidden');
  });
};

const hamburgerSVG = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 6H20M4 12H20M4 18H20" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>`;
const closeSVG = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 6L6 18M6 6L18 18" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

// Mobile & Desktop Menu toggler
const toggleMenu = () => {
  const isDesktop = window.innerWidth >= 768;
  const menu = document.getElementById('mobile-menu');
  const closedContainer = document.getElementById('header-menu-closed');
  const openedContainer = document.getElementById('header-menu-opened');
  
  if (isDesktop) {
    if (closedContainer && openedContainer) {
      const isMenuOpen = closedContainer.classList.contains('hidden');
      if (isMenuOpen) {
        // Close menu
        closedContainer.classList.remove('hidden');
        openedContainer.classList.add('hidden');
      } else {
        // Open menu
        closedContainer.classList.add('hidden');
        openedContainer.classList.remove('hidden');
      }
    }
  } else {
    // Mobile behavior
    if (menu) {
      const isHidden = menu.classList.contains('hidden');
      const btn = document.querySelector('#header-menu-closed button[aria-label="Abrir Menu"], #header-menu-closed button[aria-label="Fechar Menu"]');
      if (isHidden) {
        // Open menu drawer
        menu.classList.remove('hidden');
        menu.classList.add('flex');
        if (btn) {
          btn.innerHTML = closeSVG;
          btn.setAttribute('aria-label', 'Fechar Menu');
        }
      } else {
        // Close menu drawer
        menu.classList.add('hidden');
        menu.classList.remove('flex');
        if (btn) {
          btn.innerHTML = hamburgerSVG;
          btn.setAttribute('aria-label', 'Abrir Menu');
        }
      }
    }
  }
};

// Interactive Tilt Card mouse hover tilt logic
const initTilt = () => {
  document.querySelectorAll('.interactive-tilt').forEach(card => {
    card.style.transition = 'transform 0.15s cubic-bezier(0.1, 0.8, 0.2, 1)';
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const xc = rect.width / 2;
      const yc = rect.height / 2;
      const dx = x - xc;
      const dy = y - yc;
      const rotX = (dy / yc) * -8; // subtle 8deg rotation
      const rotY = (dx / xc) * 8;
      card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.015, 1.015, 1.015)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  });
};

// Scroll Reveal Animation Observer
const initScrollReveal = () => {
  const targets = document.querySelectorAll('main div, main section, .glass-panel, .glass-panel-hover, .grid > div');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.05,
    rootMargin: '0px 0px -20px 0px'
  });

  targets.forEach(target => {
    if (!target.classList.contains('reveal-visible')) {
      observer.observe(target);
    }
  });
};

// History Slider Data & Functions
let currentHistorySlide = 0;
const historySlides = [
  {
    year: '2021 - 2022',
    title: 'Dubai Foundation & Expansion',
    p1: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
    p2: 'Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus sapien nunc eget odio. Lorem ipsum dolor sit amet, consectetur',
    img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80'
  },
  {
    year: '2023 - 2024',
    title: 'Padrão Dubai Consolidation',
    p1: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
    p2: 'Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus sapien nunc eget odio. Lorem ipsum dolor sit amet, consectetur',
    img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
  }
];

const updateHistorySlider = () => {
  const h3 = Array.from(document.querySelectorAll('h3')).find(el => el.textContent.includes('Nossa História'));
  if (!h3) return;
  const container = h3.parentElement.nextElementSibling;
  if (!container) return;

  const img = container.querySelector('.glass-panel img');
  const title = container.querySelector('h4');
  const paragraphs = container.querySelectorAll('p');
  const triggers = container.querySelectorAll('.flex.gap-8 button');

  const slide = historySlides[currentHistorySlide];
  if (img) img.src = slide.img;
  if (title) title.innerText = slide.title;
  if (paragraphs.length >= 2) {
    paragraphs[0].innerText = slide.p1;
    paragraphs[1].innerText = slide.p2;
  }

  triggers.forEach((trigger, idx) => {
    const dot = trigger.querySelector('.w-2.h-2');
    const text = trigger.querySelector('span:not(.w-2)');
    const line = trigger.querySelector('.absolute.bottom-0');

    const isCurrent = idx === currentHistorySlide;
    
    if (isCurrent) {
      if (dot) {
        dot.className = 'w-2 h-2 rounded-full bg-[#d81d00]';
      }
      if (text) {
        text.className = 'text-zinc-950 dark:text-white';
      }
      if (!line && trigger) {
        const indicator = document.createElement('span');
        indicator.className = 'absolute bottom-0 left-0 w-full h-[2px] bg-[#d81d00] animate-pulse';
        trigger.appendChild(indicator);
      }
    } else {
      if (dot) {
        dot.className = 'w-2 h-2 rounded-full bg-zinc-700';
      }
      if (text) {
        text.className = 'text-zinc-500';
      }
      if (line) {
        line.remove();
      }
    }
  });
};

// Populate the details page template dynamically based on selected property URL parameter ?id=yara
const populateDetailPage = () => {
  const isDetail = window.location.pathname.includes('detalhe.html');
  if (!isDetail) return;
  
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id') || 'authoria';
  const data = empreendimentosData.find(e => e.id === id) || empreendimentosData[0];

  // 1. Document title
  document.title = `${data.nome} | Dubai Construtora`;
  
  // 2. Hero Background Image & Video fallback
  const heroImg = document.querySelector('.hero-section img');
  if (heroImg) {
    heroImg.src = data.fotos[0];
    heroImg.alt = data.nome;
  }
  
  // 3. Hero text overlays
  const heroTitle = document.querySelector('.hero-section h3');
  if (heroTitle) heroTitle.innerText = data.nome.toUpperCase();
  
  const heroSub = document.querySelector('.hero-section p.uppercase') || document.querySelector('.hero-section p + p') || document.querySelector('.hero-section div.z-10 p.text-zinc-300');
  if (heroSub) {
    heroSub.innerText = `${data.cidade.toUpperCase()} — ${data.dormitorios.toUpperCase()} — ${data.area.toUpperCase()}`;
  }
  
  // 4. Large Page Content Heading
  const detailTitle = Array.from(document.querySelectorAll('h3')).find(el => el.textContent.includes('por Dubai') || el.textContent === 'Authoria por Dubai');
  if (detailTitle) {
    detailTitle.innerText = data.nome;
    const descSpan = detailTitle.nextElementSibling;
    if (descSpan) {
      descSpan.innerText = `${data.bairro} . SP`;
    }
  }
  
  // 5. Spec details (Dormitorios, Area, Vagas, Preço)
  const labels = Array.from(document.querySelectorAll('span')).filter(el => ['Dormitórios', 'Área Privativa', 'Vagas de Garagem', 'Preço Base'].includes(el.textContent));
  labels.forEach(label => {
    const valueEl = label.nextElementSibling;
    if (valueEl) {
      if (label.textContent === 'Dormitórios') valueEl.innerText = data.dormitorios;
      if (label.textContent === 'Área Privativa') valueEl.innerText = data.area;
      if (label.textContent === 'Vagas de Garagem') valueEl.innerText = data.vagas;
      if (label.textContent === 'Preço Base') valueEl.innerText = data.precoBase;
    }
  });

  // 6. Slogan paragraph
  const sloganParagraph = Array.from(document.querySelectorAll('p')).find(el => el.textContent.includes('A expressão máxima de sofisticação') || el.textContent.includes('Elegância em cada detalhe') || el.textContent.includes('Um novo marco arquitetônico') || el.textContent.includes('A essência do luxo') || el.textContent.includes('Um miragem que') || el.textContent.includes('A energia e sofisticação') || el.textContent.includes('A definição máxima'));
  if (sloganParagraph) sloganParagraph.innerText = data.slogan;

  // 7. Progress Bars
  const h3Obra = Array.from(document.querySelectorAll('h3')).find(el => el.textContent.includes('Status da Obra'));
  if (h3Obra && h3Obra.parentElement) {
    const progressGrid = h3Obra.parentElement.nextElementSibling.nextElementSibling;
    if (progressGrid) {
      const progressItems = progressGrid.querySelectorAll('.flex.flex-col.gap-2');
      progressItems.forEach(item => {
        const nameEl = item.querySelector('span:first-child');
        const valEl = item.querySelector('span.font-mono');
        const barEl = item.querySelector('.h-full.bg-gradient-to-r');
        
        if (nameEl && valEl && barEl) {
          const name = nameEl.textContent.trim();
          let pct = 0;
          if (name === 'Terraplanagem') pct = data.progressoObra.fundacao;
          else if (name === 'Estrutura') pct = data.progressoObra.estrutura;
          else if (name === 'Hidrossanitário') pct = Math.max(0, data.progressoObra.alvenaria - 10);
          else if (name === 'Elétrica') pct = Math.max(0, data.progressoObra.alvenaria - 20);
          else if (name === 'Água e esgoto') pct = Math.max(0, data.progressoObra.alvenaria - 15);
          else if (name === 'Acabamento') pct = data.progressoObra.acabamento;
          
          valEl.innerText = `${pct}%`;
          barEl.style.width = `${pct}%`;
        }
      });
    }
  }

  // 8. Gallery Photos
  const galleryImgs = document.querySelectorAll('main .grid-cols-1.md\\:grid-cols-4 img');
  if (galleryImgs.length > 0) {
    galleryImgs.forEach((img, idx) => {
      if (data.fotos[idx]) {
        img.src = data.fotos[idx];
      } else {
        img.src = data.fotos[0];
      }
    });
  }

  // 9. Differentials List
  const diffList = document.querySelector('ul.space-y-4');
  if (diffList && data.diferenciais) {
    diffList.innerHTML = '';
    data.diferenciais.forEach(diff => {
      const li = document.createElement('li');
      li.className = 'flex items-center gap-3 text-xs text-zinc-400 font-light';
      li.innerHTML = `
        <span class="w-1.5 h-1.5 rounded-full bg-[#d81d00] flex-shrink-0"></span>
        <span>${diff}</span>
      `;
      diffList.appendChild(li);
    });
  }

  // 10. Plants / Plantas Slider
  const plantTitle = Array.from(document.querySelectorAll('h3')).find(el => el.textContent.includes('Área privativa') || el.textContent.includes('Planta'));
  if (plantTitle && data.plantas.length > 0) {
    plantTitle.innerText = `${data.plantas[0].nome}`;
    const plantDesc = plantTitle.nextElementSibling;
    if (plantDesc) {
      plantDesc.innerText = data.plantas[0].desc;
    }
  }
  
  const plantImg = document.querySelector('.grid-cols-1.lg\\:grid-cols-12 img[alt*="Planta"]') || document.querySelector('img[alt*="Planta"]');
  if (plantImg && data.plantas.length > 0) {
    plantImg.src = data.plantas[0].imagem;
    plantImg.alt = data.plantas[0].nome;
  }
  
  // 11. Concept Video src
  const conceptVideo = document.querySelector('.concept-video-card video');
  if (conceptVideo) {
    conceptVideo.src = 'assets/333.mp4';
    // Reset overlay clicks
    const videoOverlay = document.querySelector('.concept-video-card div[onClick], .concept-video-card .absolute.inset-0.bg-gradient-to-t');
    if (videoOverlay) {
      videoOverlay.addEventListener('click', (e) => {
        e.stopPropagation();
        videoOverlay.classList.add('hidden');
        conceptVideo.play().catch(() => {});
        conceptVideo.setAttribute('controls', 'true');
      });
      conceptVideo.addEventListener('click', () => {
        if (conceptVideo.paused) {
          conceptVideo.play();
        } else {
          conceptVideo.pause();
        }
      });
    }
  }
};

// Initialize interactive elements on DOM Load
document.addEventListener('DOMContentLoaded', () => {
  // 1. Build desktop opened menu container in header programmatically
  const headerLeft = document.querySelector('header .max-w-7xl > div:first-child');
  if (headerLeft) {
    const closedContainer = headerLeft.querySelector('div.flex.items-center.gap-4');
    if (closedContainer) {
      closedContainer.id = 'header-menu-closed';
      
      const currentPath = window.location.pathname;
      const isHome = currentPath.endsWith('index.html') || currentPath === '/' || currentPath.endsWith('/') || !currentPath.includes('.html');
      const isEmpreendimentos = currentPath.includes('empreendimentos.html');
      const isQuemSomos = currentPath.includes('quem-somos.html');
      const isDConcept = currentPath.includes('d-concept.html');
      
      const openedContainer = document.createElement('div');
      openedContainer.id = 'header-menu-opened';
      openedContainer.className = 'flex items-center gap-6 hidden';
      openedContainer.innerHTML = `
        <button class="p-1 hover:opacity-80 transition-opacity" aria-label="Fechar Menu">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"></path>
          </svg>
        </button>
        <nav class="hidden md:flex items-center gap-5">
          <button class="text-sm font-bold tracking-wide transition-colors ${isHome ? 'text-white border-b-2 border-[#D81D00] pb-0.5' : 'text-zinc-400 hover:text-white'}">Home</button>
          <button class="text-sm font-bold tracking-wide transition-colors ${isEmpreendimentos ? 'text-white border-b-2 border-[#D81D00] pb-0.5' : 'text-zinc-400 hover:text-white'}">Empreendimentos</button>
          <button class="text-sm font-bold tracking-wide transition-colors ${isQuemSomos ? 'text-white border-b-2 border-[#D81D00] pb-0.5' : 'text-zinc-400 hover:text-white'}">Quem somos</button>
          <button class="text-sm font-bold tracking-wide transition-colors text-zinc-400 hover:text-white">Insights</button>
          <button class="text-sm font-bold tracking-wide transition-colors ${isDConcept ? 'text-white border-b-2 border-[#D81D00] pb-0.5' : 'text-zinc-400 hover:text-white'}">d.concept</button>
        </nav>
      `;
      headerLeft.appendChild(openedContainer);
      
      // Bind close button click
      const closeBtn = openedContainer.querySelector('button[aria-label="Fechar Menu"]');
      if (closeBtn) {
        closeBtn.addEventListener('click', toggleMenu);
      }
    }
  }

  // 2. Set scroll listener for the header
  window.addEventListener('scroll', updateHeaderScroll);
  
  // 3. Initialize theme (will trigger updateHeaderScroll)
  setTheme(getTheme());
  
  // 4. Fix theme toggle button visibility and pointer events
  const themeToggleContainer = document.querySelector('button[aria-label*="Refletor"]')?.parentElement;
  if (themeToggleContainer) {
    themeToggleContainer.classList.remove('opacity-0', '-translate-x-12', 'pointer-events-none');
    themeToggleContainer.classList.add('opacity-100', 'translate-x-0', 'pointer-events-auto');
  }

  const getProjectIdByName = (name) => {
    const n = name.toLowerCase();
    if (n.includes('authoria')) return 'authoria';
    if (n.includes('acervo')) return 'acervo';
    if (n.includes('legend')) return 'legend';
    if (n.includes('prime')) return 'prime';
    if (n.includes('legacy')) return 'legacy';
    if (n.includes('signature')) return 'signature';
    if (n.includes('unique')) return 'unique';
    if (n.includes('concept')) return 'concept';
    if (n.includes('infinity')) return 'infinity';
    if (n.includes('apex')) return 'apex';
    if (n.includes('vértice') || n.includes('vertice')) return 'vertice';
    if (n.includes('horizon')) return 'horizon';
    if (n.includes('jardins')) return 'jardins';
    if (n.includes('parque')) return 'parque';
    if (n.includes('reserva')) return 'reserva';
    if (n.includes('mirante')) return 'mirante';
    if (n.includes('splendour')) return 'splendour';
    if (n.includes('patio')) return 'patio';
    return null;
  };

  // Global event delegation for navigation buttons and logos (fixes broken page links)
  document.body.addEventListener('click', (e) => {
    // Intercept navigation button clicks
    const btn = e.target.closest('button');
    if (btn) {
      const text = btn.textContent.trim().toLowerCase();
      if (text === 'home') {
        window.location.href = 'index.html';
        return;
      } else if (text === 'empreendimentos' || text.includes('conhecer empreendimentos') || text.includes('ver todos os empreendimentos')) {
        window.location.href = 'empreendimentos.html';
        return;
      } else if (text === 'quem somos') {
        window.location.href = 'quem-somos.html';
        return;
      } else if (text === 'contato' || text.includes('falar com especialista') || text.includes('agendar') || text.includes('fale conosco')) {
        window.location.href = 'contato.html';
        return;
      } else if (text === 'd.concept' || text === 'dconcept') {
        window.location.href = 'd-concept.html';
        return;
      }
    }
    
    // Intercept logo clicks to return home
    const logoContainer = e.target.closest('.cursor-pointer');
    if (logoContainer && logoContainer.querySelector('img[alt*="Dubai"]')) {
      window.location.href = 'index.html';
      return;
    }
  });

  // Bind project card clicks to their detail pages
  document.querySelectorAll('.interactive-tilt, .glass-panel').forEach(card => {
    const h3 = card.querySelector('h3');
    if (h3) {
      const projectId = getProjectIdByName(h3.textContent.trim());
      if (projectId) {
        card.style.cursor = 'pointer';
        card.addEventListener('click', (e) => {
          if (e.target.closest('button') || e.target.closest('a')) return;
          window.location.href = `detalhe.html?id=${projectId}`;
        });
      }
    }
  });
  
  // Dynamically upgrade style & tilt logic for Nossos Valores cards on quem-somos.html
  const valuesH3 = Array.from(document.querySelectorAll('h3')).find(el => el.textContent.includes('Nossos Valores'));
  if (valuesH3) {
    const parentContainer = valuesH3.parentElement.nextElementSibling || valuesH3.parentElement.parentElement;
    const cards = parentContainer.querySelectorAll('.glass-panel-hover');
    cards.forEach(card => {
      card.classList.add('interactive-tilt');
    });
    
    // Style up the card icons to match the home page style (w-12 h-12 with border and size 20 icons)
    const cardIcons = parentContainer.querySelectorAll('.w-8.h-8.rounded.bg-zinc-950');
    cardIcons.forEach(iconWrapper => {
      iconWrapper.className = 'w-12 h-12 bg-zinc-950 border border-zinc-900 flex items-center justify-center text-red-500 mb-6 group-hover:scale-110 group-hover:border-red-600/30 transition-all duration-300';
      const svg = iconWrapper.querySelector('svg');
      if (svg) {
        svg.setAttribute('width', '20');
        svg.setAttribute('height', '20');
      }
    });
  }
  
  initTilt();
  initScrollReveal();
  populateDetailPage();
  
  // Theme toggler click events
  document.querySelectorAll('.theme-toggle, button[aria-label*="Tema"], button[aria-label*="Refletor"], button[title*="Visão"]').forEach(btn => {
    btn.addEventListener('click', () => {
      const nextTheme = document.documentElement.classList.contains('light-mode') ? 'dark' : 'light';
      setTheme(nextTheme);
    });
  });
  
  // Mobile menu triggers
  document.querySelectorAll('button[aria-label="Abrir Menu"], button[aria-label="Fechar Menu"], .menu-toggle-btn').forEach(btn => {
    btn.addEventListener('click', toggleMenu);
  });
  
  // Search Overlay Toggle & Input Handling
  const searchOpenBtn = document.querySelector('button[aria-label="Abrir Busca"]');
  const searchCloseBtn = document.querySelector('button[aria-label="Fechar Pesquisa"]');
  const searchOverlay = document.getElementById('search-overlay');
  
  if (searchOpenBtn && searchOverlay) {
    searchOpenBtn.addEventListener('click', () => {
      searchOverlay.classList.remove('hidden');
      const input = searchOverlay.querySelector('input');
      if (input) input.focus();
    });
  }
  if (searchCloseBtn && searchOverlay) {
    searchCloseBtn.addEventListener('click', () => {
      searchOverlay.classList.add('hidden');
    });
  }
  
  const searchInput = searchOverlay ? searchOverlay.querySelector('input') : null;
  const resultsContainer = searchOverlay ? searchOverlay.querySelector('.max-h-\\[40vh\\]') || searchOverlay.querySelector('.overflow-y-auto') : null;
  
  if (searchInput && resultsContainer) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      if (!query) {
        resultsContainer.innerHTML = '';
        return;
      }
      
      const filtered = empreendimentosData.filter(emp => 
        emp.nome.toLowerCase().includes(query) || 
        emp.cidade.toLowerCase().includes(query) || 
        emp.bairro.toLowerCase().includes(query) || 
        emp.statusLabel.toLowerCase().includes(query) ||
        emp.descricao.toLowerCase().includes(query)
      );
      
      resultsContainer.innerHTML = '';
      if (filtered.length === 0) {
        resultsContainer.innerHTML = `<p class="text-sm text-zinc-500 text-center py-4 font-light">Nenhum empreendimento encontrado para "${e.target.value}".</p>`;
        return;
      }
      
      filtered.forEach(emp => {
        const item = document.createElement('div');
        item.className = 'group flex gap-4 p-3 rounded bg-zinc-950/60 border border-zinc-900 hover:border-red-800 cursor-pointer transition-all';
        item.innerHTML = `
          <img src="${emp.fotos[0]}" alt="${emp.nome}" class="w-16 h-16 object-cover rounded" />
          <div class="flex flex-col justify-center">
            <span class="text-[9px] uppercase font-bold tracking-widest text-red-500 mb-0.5">${emp.statusLabel}</span>
            <h4 class="text-sm font-bold text-white group-hover:text-red-500 transition-colors">${emp.nome}</h4>
            <p class="text-xs text-zinc-400 font-light">${emp.bairro}, ${emp.cidade} • ${emp.area}</p>
          </div>
        `;
        item.addEventListener('click', () => {
          window.location.href = `detalhe.html?id=${emp.id}`;
        });
        resultsContainer.appendChild(item);
      });
    });
  }
  
  // History slider controls
  const h3 = Array.from(document.querySelectorAll('h3')).find(el => el.textContent.includes('Nossa História'));
  if (h3 && h3.parentElement) {
    const container = h3.parentElement.nextElementSibling;
    if (container) {
      const navButtons = container.querySelectorAll('button.w-10');
      if (navButtons.length >= 2) {
        const prevBtn = navButtons[0];
        const nextBtn = navButtons[1];
        
        prevBtn.addEventListener('click', () => {
          currentHistorySlide = (currentHistorySlide === 0) ? historySlides.length - 1 : currentHistorySlide - 1;
          updateHistorySlider();
        });
        navButtons[1].addEventListener('click', () => {
          currentHistorySlide = (currentHistorySlide === historySlides.length - 1) ? 0 : currentHistorySlide + 1;
          updateHistorySlider();
        });
      }
      
      const triggers = container.querySelectorAll('.flex.gap-8 button');
      triggers.forEach((trigger, idx) => {
        trigger.addEventListener('click', () => {
          currentHistorySlide = idx;
          updateHistorySlider();
        });
      });
    }
  }
  
  // Contact Segment Form Switching
  const segmentButtons = document.querySelectorAll('.contact-segment-btn');
  const contactFormTitle = document.getElementById('contact-form-title');
  if (segmentButtons.length > 0 && contactFormTitle) {
    segmentButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        segmentButtons.forEach(b => b.classList.remove('bg-[#d81d00]/10', 'border-[#d81d00]/30', 'text-white'));
        btn.classList.add('bg-[#d81d00]/10', 'border-[#d81d00]/30', 'text-white');
        const segment = btn.getAttribute('data-segment') || btn.textContent.trim().toLowerCase();
        
        let titleText = 'Fale Conosco';
        if (segment.includes('cliente')) titleText = 'Canal do Cliente';
        else if (segment.includes('vizinho')) titleText = 'Canal do Vizinho';
        else if (segment.includes('fornecedor')) titleText = 'Canal do Fornecedor';
        else if (segment.includes('corretor')) titleText = 'Portal do Corretor';
        else if (segment.includes('trabalhar')) titleText = 'Trabalhe Conosco';
        else if (segment.includes('denúncia') || segment.includes('denuncia')) titleText = 'Canal de Denúncia';
        contactFormTitle.innerText = titleText;
      });
    });
  }
});
