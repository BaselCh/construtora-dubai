import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { 
  Building2, 
  MapPin, 
  Maximize2, 
  Calendar, 
  ChevronLeft, 
  ChevronRight, 
  Phone, 
  Mail, 
  FileText, 
  CheckCircle2, 
  Award, 
  Clock, 
  ArrowRight, 
  Filter, 
  Search,
  MessageSquare,
  Sparkles,
  ShieldCheck,
  Compass,
  Download,
  ArrowUpRight,
  X,
  ChevronDown,
  Play
} from 'lucide-react';

function CanvasHexagonGrid() {
  const canvasRef = React.useRef(null);
  const mouseRef = React.useRef({ x: -1000, y: -1000, active: false });

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    let time = 0;
    const drawGrid = () => {
      time += 0.005;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#080809'; // bg-deep
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const size = 35;
      const hSpacing = size * 1.732;
      const vSpacing = size * 1.5;
      const cols = Math.ceil(canvas.width / hSpacing) + 2;
      const rows = Math.ceil(canvas.height / vSpacing) + 2;

      // Pulse spotlight coordinate if mouse not active
      let spotX = mouseRef.current.x;
      let spotY = mouseRef.current.y;
      if (!mouseRef.current.active) {
        spotX = canvas.width / 2 + Math.sin(time * 2) * (canvas.width * 0.25);
        spotY = canvas.height / 2 + Math.cos(time * 1.5) * (canvas.height * 0.2);
      }

      for (let r = -1; r < rows; r++) {
        const offset = (r % 2) * (hSpacing / 2);
        for (let c = -1; c < cols; c++) {
          const centerX = c * hSpacing + offset;
          const centerY = r * vSpacing;

          // Calculate distance to spotlight
          const dx = centerX - spotX;
          const dy = centerY - spotY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          // Interactive height offset (3D extrusion wave)
          const wave = Math.sin(time * 3 + (centerX * 0.003) + (centerY * 0.003)) * 4;
          const distFactor = Math.max(0, 1 - dist / 350);
          const extrude = wave + distFactor * 12; // Extrude up to 12px based on mouse proximity

          const drawX = centerX;
          const drawY = centerY - extrude;

          // Spotlight intensity
          const glowIntensity = distFactor; // 0 to 1

          // Draw the 3D Cube
          drawCube(ctx, drawX, drawY, size, glowIntensity);
        }
      }

      animationFrameId = requestAnimationFrame(drawGrid);
    };

    const drawCube = (ctx, x, y, r, glow) => {
      const cx = 0.866 * r; // cos(30) * r
      const sy = 0.5 * r;  // sin(30) * r

      // Base grays for 3D faces (blended with brand red #d81d00)
      const r_val = Math.round(18 + glow * 198); 
      const g_val = Math.round(18 + glow * 11);  
      const b_val = Math.round(20 + glow * 0);   

      // 3 different faces (top, left, right) with lighting multipliers
      const topFill = `rgb(${Math.min(255, Math.round(r_val * 1.25))}, ${Math.min(255, Math.round(g_val * 1.25))}, ${Math.min(255, Math.round(b_val * 1.25))})`;
      const leftFill = `rgb(${Math.round(r_val * 0.75)}, ${Math.round(g_val * 0.75)}, ${Math.round(b_val * 0.75)})`;
      const rightFill = `rgb(${Math.round(r_val * 0.95)}, ${Math.round(g_val * 0.95)}, ${Math.round(b_val * 0.95)})`;
      
      // Outline stroke color (glowing red outline based on mouse distance)
      ctx.strokeStyle = glow > 0.05 ? `rgba(216, 29, 0, ${0.05 + glow * 0.35})` : 'rgba(255, 255, 255, 0.02)';
      ctx.lineWidth = 0.8;

      // 1. Top face
      ctx.fillStyle = topFill;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x - cx, y - sy);
      ctx.lineTo(x, y - r);
      ctx.lineTo(x + cx, y - sy);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // 2. Left face
      ctx.fillStyle = leftFill;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x - cx, y - sy);
      ctx.lineTo(x - cx, y + sy);
      ctx.lineTo(x, y + r);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // 3. Right face
      ctx.fillStyle = rightFill;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x, y + r);
      ctx.lineTo(x + cx, y + sy);
      ctx.lineTo(x + cx, y - sy);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    };

    drawGrid();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />;
}

const Spline = React.lazy(() => import('@splinetool/react-spline'));

// Dados dos Empreendimentos Oficiais da Dubai
const empreendimentosData = [
  {
    id: 'authoria',
    nome: 'Authoria por Dubai',
    slug: 'authoria-por-dubai',
    bairro: 'Vila Yara',
    cidade: 'Osasco',
    status: 'Lançamento', // Lançamento, Em Obras, Pronto
    statusLabel: 'Lançamento',
    area: '120m² a 165m²',
    dormitorios: '3 a 4 Suítes',
    vagas: '2 a 3 Vagas',
    slogan: 'A expressão máxima de sofisticação e design contemporâneo.',
    descricao: 'Projetado para quem valoriza a exclusividade. Um projeto que redefine o conceito de alto padrão na região com arquitetura autoral, acabamento primoroso e lazer de resort.',
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
    progressoObra: {
      fundacao: 100,
      estrutura: 20,
      alvenaria: 5,
      acabamento: 0
    },
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
    progressoObra: {
      fundacao: 100,
      estrutura: 85,
      alvenaria: 45,
      acabamento: 12
    },
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
    progressoObra: {
      fundacao: 100,
      estrutura: 60,
      alvenaria: 25,
      acabamento: 5
    },
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
    progressoObra: {
      fundacao: 100,
      estrutura: 100,
      alvenaria: 100,
      acabamento: 100
    },
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

// --- COMPONENTE INTERATIVO TILT 3D (Inspirado no Card-7 de Ravi Katiyar em 21st.dev) ---
function InteractiveTiltCard({ children, className, onClick, ...props }) {
  const cardRef = React.useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;

    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    // Rotação sutil e refinada de até 8 graus baseada no cursor do mouse
    const rotateX = ((y - height / 2) / (height / 2)) * -8;
    const rotateY = ((x - width / 2) / (width / 2)) * 8;

    // Aplica diretamente ao nó DOM para performance de 60/120 FPS sem re-render do React!
    cardRef.current.style.setProperty('--rx', `${rotateX}deg`);
    cardRef.current.style.setProperty('--ry', `${rotateY}deg`);
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    // Reseta suavemente para o estado original
    cardRef.current.style.setProperty('--rx', '0deg');
    cardRef.current.style.setProperty('--ry', '0deg');
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`${className} interactive-tilt`}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
}

export default function App() {
  const backgroundLayerRef = React.useRef(null);
  // Roteador baseado em Estado: 'home' | 'empreendimentos' | 'detalhe' | 'contato'
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedEmpreendimentoId, setSelectedEmpreendimentoId] = useState('authoria');
  const [isSpotlightActive, setIsSpotlightActive] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  
  // Estado para controlar a abertura do menu de navegação do wireframe
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Estado para controlar o segmento ativo na página de contato do wireframe
  const [contactSegment, setContactSegment] = useState('cliente'); // 'cliente' | 'vizinho' | 'fornecedor' | 'corretor' | 'trabalhar' | 'denuncia'
  const [desejaIdentificar, setDesejaIdentificar] = useState(false);

  // Estados para busca inteligente global
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Estado para controlar a aba ativa do portfólio no novo design (BARUERI | OSASCO | ALPHAVILLE)
  const [activePortfolioTab, setActivePortfolioTab] = useState('BARUERI');

  // Estados para efeito de parallax dinâmico do Hero (uniquesonu/text-parallax-content-scroll)
  const [heroScale, setHeroScale] = useState(1.1);
  const [heroTranslateY, setHeroTranslateY] = useState(0);
  const [heroOpacity, setHeroOpacity] = useState(1);

  // Controle do Slider de Luxo do Hero (Imagem vs Vídeo MP4 do cliente)
  const [activeHeroSlide, setActiveHeroSlide] = useState(0);

  useEffect(() => {
    if (currentPage === 'home') {
      const interval = setInterval(() => {
        setActiveHeroSlide((prev) => (prev === 0 ? 1 : 0));
      }, 7000); // Trocando a cada 7 segundos para visualização agradável
      return () => clearInterval(interval);
    }
  }, [currentPage]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      setScrollY(scrollPos);
      
      // Values for Hero parallax
      const newScale = Math.max(1, 1.1 - scrollPos * 0.0003);
      const newTranslate = scrollPos * 0.15;
      const newOpacity = Math.max(0.4, 1 - scrollPos * 0.0008);
      
      setHeroScale(newScale);
      setHeroTranslateY(newTranslate);
      setHeroOpacity(newOpacity);

      // HIGH-PERFORMANCE SCROLL REACTION FOR BRAND BLUEPRINT GEOMETRY:
      if (backgroundLayerRef.current) {
        // Shape 1 (geom-shape-1): Fades out as we scroll down into the page
        const y1 = scrollPos * 0.45; 
        const r1 = scrollPos * 0.06;
        const s1 = Math.max(0.4, 1 - scrollPos * 0.0006);
        const op1 = Math.max(0, 0.35 - scrollPos * 0.0008);

        // Shape 2 (geom-shape-2): Fades in at section 2, then fades out at section 4
        const y2 = (scrollPos - 900) * 0.3; 
        const r2 = scrollPos * -0.05;
        const s2 = Math.min(1.2, 0.75 + scrollPos * 0.0002);
        const op2 = Math.max(0, Math.min(0.35, (scrollPos - 200) * 0.0005) * (1 - Math.max(0, (scrollPos - 1800) * 0.0006)));

        // Shape 3 (geom-shape-3): Fades in at the bottom
        const y3 = (scrollPos - 2000) * 0.35;
        const r3 = scrollPos * 0.08;
        const s3 = Math.max(0.6, 1.2 - scrollPos * 0.00015);
        const op3 = Math.max(0, Math.min(0.35, (scrollPos - 1300) * 0.0006));

        backgroundLayerRef.current.style.setProperty('--sy1', `${y1}px`);
        backgroundLayerRef.current.style.setProperty('--sr1', `${r1}deg`);
        backgroundLayerRef.current.style.setProperty('--ss1', `${s1}`);
        backgroundLayerRef.current.style.setProperty('--so1', `${op1}`);

        backgroundLayerRef.current.style.setProperty('--sy2', `${y2}px`);
        backgroundLayerRef.current.style.setProperty('--sr2', `${r2}deg`);
        backgroundLayerRef.current.style.setProperty('--ss2', `${s2}`);
        backgroundLayerRef.current.style.setProperty('--so2', `${op2}`);

        backgroundLayerRef.current.style.setProperty('--sy3', `${y3}px`);
        backgroundLayerRef.current.style.setProperty('--sr3', `${r3}deg`);
        backgroundLayerRef.current.style.setProperty('--ss3', `${s3}`);
        backgroundLayerRef.current.style.setProperty('--so3', `${op3}`);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Inicialização do Lenis e Efeito de Transição das Seções ao Scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Easing de amortecimento premium
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 0.95,
      smoothTouch: false,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Observer para transições suaves de seção para seção
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible');
        }
      });
    }, observerOptions);

    const sections = document.querySelectorAll('section');
    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      lenis.destroy();
      sections.forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, [currentPage]);

  // Filtros da página de catálogo
  const [filterStatus, setFilterStatus] = useState('Todos');
  const [filterCidade, setFilterCidade] = useState('Todos');
  const [visibleCount, setVisibleCount] = useState(4);
  
  // Slide de fotos do empreendimento selecionado
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [activePlantaIndex, setActivePlantaIndex] = useState(0);
  const [activeAreaTab, setActiveAreaTab] = useState('273m²');
  const [activeTipoTab, setActiveTipoTab] = useState('Tipo 2');
  const [is3DMode, setIs3DMode] = useState(false);
  const [activeDecoradoIndex, setActiveDecoradoIndex] = useState(0);
  const [activeDecoradoPhotoIndex, setActiveDecoradoPhotoIndex] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [activeProgressPhotoIndex, setActiveProgressPhotoIndex] = useState(0);

  // States para formulários de Leads
  const [leadForm, setLeadForm] = useState({ nome: '', email: '', whatsapp: '', mensagem: '', interesse: 'authoria' });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [privacyAgreed, setPrivacyAgreed] = useState(true);
  const [commAgreed, setCommAgreed] = useState(true);
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');

  // Rolar para o topo ao trocar de página
  useEffect(() => {
    window.scrollTo(0, 0);
    setFormSubmitted(false);
    setIsMenuOpen(false); // Fechar menu ao mudar de página
  }, [currentPage, selectedEmpreendimentoId]);

  // Roteamento baseado no URL Hash (ideal para GitHub Pages e links diretos)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (!hash || hash === '#home') {
        setCurrentPage('home');
      } else if (hash === '#home2') {
        setCurrentPage('home2');
      } else if (hash === '#empreendimentos') {
        setCurrentPage('empreendimentos');
      } else if (hash === '#contato') {
        setCurrentPage('contato');
      } else if (hash.startsWith('#detalhe/')) {
        const id = hash.replace('#detalhe/', '');
        const exists = empreendimentosData.some(e => e.id === id);
        if (exists) {
          setSelectedEmpreendimentoId(id);
          setCurrentPage('detalhe');
        } else {
          setCurrentPage('home');
        }
      } else {
        setCurrentPage('home');
      }
    };

    // Executar no carregamento inicial
    handleHashChange();

    // Ouvir alterações de hash (botões voltar/avançar do navegador)
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Sincronizar o estado da página com o URL Hash e atualizar o título do documento
  useEffect(() => {
    let targetHash = 'home';
    let title = 'Dubai Construtora | Incorporadora de Luxo e Alto Padrão';

    if (currentPage === 'home') {
      targetHash = 'home';
      title = 'Dubai Construtora | Incorporadora de Luxo e Alto Padrão';
    } else if (currentPage === 'home2') {
      targetHash = 'home2';
      title = 'Dubai Construtora | Teste Hero 3D';
    } else if (currentPage === 'empreendimentos') {
      targetHash = 'empreendimentos';
      title = 'Nossos Empreendimentos | Dubai Construtora';
    } else if (currentPage === 'contato') {
      targetHash = 'contato';
      title = 'Entre em Contato | Dubai Construtora';
    } else if (currentPage === 'detalhe') {
      const current = empreendimentosData.find(e => e.id === selectedEmpreendimentoId) || empreendimentosData[0];
      targetHash = `detalhe/${selectedEmpreendimentoId}`;
      title = `${current.nome} | Dubai Construtora`;
    }

    if (window.location.hash !== `#${targetHash}`) {
      window.location.hash = targetHash;
    }
    document.title = title;
  }, [currentPage, selectedEmpreendimentoId]);

  // Sincronizar o interesse do lead com o empreendimento selecionado
  useEffect(() => {
    setLeadForm(prev => ({ ...prev, interesse: selectedEmpreendimentoId }));
  }, [selectedEmpreendimentoId]);

  // Obter o objeto do empreendimento atualmente selecionado
  const currentEmpreendimento = empreendimentosData.find(e => e.id === selectedEmpreendimentoId) || empreendimentosData[0];

  // Determinar fotos do decorado baseadas no id e index
  const getDecoradoPhotos = (projectId, tabIndex) => {
    const authoriaPhotos = [
      [
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80'
      ],
      [
        'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1617806118233-18e1db207f62?auto=format&fit=crop&w=800&q=80'
      ]
    ];

    const yaraPhotos = [
      [
        'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1502005229762-fc1b2b812ca5?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80'
      ],
      [
        'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=800&q=80'
      ]
    ];

    if (projectId === 'authoria') {
      return authoriaPhotos[tabIndex % authoriaPhotos.length];
    } else if (projectId === 'yara') {
      return yaraPhotos[tabIndex % yaraPhotos.length];
    } else {
      return [
        'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1502005229762-fc1b2b812ca5?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?auto=format&fit=crop&w=800&q=80'
      ];
    }
  };

  const currentDecoradoPhotos = getDecoradoPhotos(currentEmpreendimento.id, activeDecoradoIndex);
  const decoradoLeftPhoto = currentDecoradoPhotos[activeDecoradoPhotoIndex % currentDecoradoPhotos.length];
  const decoradoRightPhoto = currentDecoradoPhotos[(activeDecoradoPhotoIndex + 1) % currentDecoradoPhotos.length];

  const handleLeadSubmit = (e) => {
    e.preventDefault();
    if (leadForm.nome && leadForm.email && leadForm.whatsapp) {
      setFormSubmitted(true);
      // Resetar formulário
      setLeadForm({ nome: '', email: '', whatsapp: '', mensagem: '', interesse: currentEmpreendimento.id });
    }
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSubmitted(true);
      setNewsletterEmail('');
    }
  };

  // Filtrar dados do catálogo
  const filteredEmpreendimentos = empreendimentosData.filter(emp => {
    const matchStatus = filterStatus === 'Todos' || emp.status === filterStatus;
    const matchCidade = filterCidade === 'Todos' || emp.cidade === filterCidade;
    return matchStatus && matchCidade;
  });
  return (
    <div className="pattern-bg min-h-screen flex flex-col selection:bg-red-800 selection:text-white relative overflow-hidden">
      {/* Global Fixed Background Layer - Keeps beautiful premium moving glows & geometry always visible */}
      <div ref={backgroundLayerRef} className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
        {/* Ambient Premium Glow System - Pulsing and Drifting Elegantly */}
        <div className="ambient-glow orb-1"></div>
        <div className="ambient-glow orb-2"></div>
        <div className="ambient-glow orb-3"></div>

        {/* Floating Brand Geometry Shapes - Inspired by Dubai Construtora Isometric Logo */}
        <svg className="brand-geometry geom-shape-1" width="180" height="180" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g transform="translate(30, 10)">
            <polygon points="30,0 60,17 60,52 30,70 0,52 0,17" fill="rgba(216, 29, 0, 0.05)" stroke="rgba(216, 29, 0, 0.75)" strokeWidth="1.2" />
            <line x1="30" y1="70" x2="30" y2="35" stroke="rgba(216, 29, 0, 0.75)" strokeWidth="1.2" />
            <line x1="0" y1="17" x2="30" y2="35" stroke="rgba(216, 29, 0, 0.75)" strokeWidth="1.2" />
            <line x1="60" y1="17" x2="30" y2="35" stroke="rgba(216, 29, 0, 0.75)" strokeWidth="1.2" />
          </g>
          <g transform="translate(0, 50)">
            <polygon points="30,0 60,17 60,52 30,70 0,52 0,17" fill="rgba(216, 29, 0, 0.02)" stroke="rgba(216, 29, 0, 0.65)" strokeWidth="1" />
            <line x1="30" y1="70" x2="30" y2="35" stroke="rgba(216, 29, 0, 0.65)" strokeWidth="1" />
            <line x1="0" y1="17" x2="30" y2="35" stroke="rgba(216, 29, 0, 0.65)" strokeWidth="1" />
            <line x1="60" y1="17" x2="30" y2="35" stroke="rgba(216, 29, 0, 0.65)" strokeWidth="1" />
          </g>
          <g transform="translate(60, 50)">
            <polygon points="30,0 60,17 60,52 30,70 0,52 0,17" fill="rgba(216, 29, 0, 0.02)" stroke="rgba(216, 29, 0, 0.65)" strokeWidth="1" />
            <line x1="30" y1="70" x2="30" y2="35" stroke="rgba(216, 29, 0, 0.65)" strokeWidth="1" />
            <line x1="0" y1="17" x2="30" y2="35" stroke="rgba(216, 29, 0, 0.65)" strokeWidth="1" />
            <line x1="60" y1="17" x2="30" y2="35" stroke="rgba(216, 29, 0, 0.65)" strokeWidth="1" />
          </g>
        </svg>

        <svg className="brand-geometry geom-shape-2" width="220" height="220" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g transform="translate(10, 10)">
            <polygon points="50,0 100,28 100,85 50,113 0,85 0,28" stroke="rgba(216, 29, 0, 0.65)" strokeWidth="1" strokeDasharray="4 2" />
            <polygon points="50,15 87,36 87,77 50,98 13,77 13,36" stroke="rgba(216, 29, 0, 0.55)" strokeWidth="1" />
            <line x1="50" y1="0" x2="50" y2="113" stroke="rgba(216, 29, 0, 0.3)" strokeWidth="0.8" />
            <line x1="0" y1="28" x2="100" y2="85" stroke="rgba(216, 29, 0, 0.3)" strokeWidth="0.8" />
            <line x1="0" y1="85" x2="100" y2="28" stroke="rgba(216, 29, 0, 0.3)" strokeWidth="0.8" />
            <circle cx="50" cy="56" r="3.5" fill="#d81d00" opacity="0.9" />
            <circle cx="50" cy="15" r="2" fill="#d81d00" opacity="0.8" />
            <circle cx="87" cy="36" r="2" fill="#d81d00" opacity="0.8" />
            <circle cx="87" cy="77" r="2" fill="#d81d00" opacity="0.8" />
            <circle cx="50" cy="98" r="2" fill="#d81d00" opacity="0.8" />
            <circle cx="13" cy="77" r="2" fill="#d81d00" opacity="0.8" />
            <circle cx="13" cy="36" r="2" fill="#d81d00" opacity="0.8" />
          </g>
        </svg>

        <svg className="brand-geometry geom-shape-3" width="160" height="160" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g transform="translate(10, 10)">
            <polygon points="40,0 80,23 80,63 40,86 0,63 0,23" stroke="rgba(216, 29, 0, 0.8)" strokeWidth="1.2" />
            <line x1="40" y1="86" x2="40" y2="43" stroke="rgba(216, 29, 0, 0.8)" strokeWidth="1.2" />
            <line x1="0" y1="23" x2="40" y2="43" stroke="rgba(216, 29, 0, 0.8)" strokeWidth="1.2" />
            <line x1="80" y1="23" x2="40" y2="43" stroke="rgba(216, 29, 0, 0.8)" strokeWidth="1.2" />
            <polygon points="40,15 67,30 67,58 40,73 13,58 13,30" stroke="rgba(216, 29, 0, 0.45)" strokeWidth="0.8" />
          </g>
        </svg>
      </div>

      {/* Dubai Interactive Luxury Spotlight Switch (Favicon-inspired) - Hidden entirely in Hero area to keep it clean, active ONLY on Desktop */}
      <div className={`hidden md:flex fixed left-8 top-32 z-50 flex-col items-center select-none transition-all duration-750 ease-out ${scrollY > 400 ? 'opacity-100 translate-x-0 pointer-events-auto' : 'opacity-0 -translate-x-12 pointer-events-none'}`}>
        {/* Clean, boxless icon trigger */}
        <button 
          onClick={() => setIsSpotlightActive(prev => !prev)}
          className="relative flex items-center justify-center cursor-pointer transition-transform duration-300 hover:scale-115 active:scale-95"
          aria-label="Ativar Refletor"
        >
          {/* SVG Favicon Logo exact replication from spotlight.svg with clean outline strokes and dynamic scroll rotation */}
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="w-12 h-12 transition-transform duration-100 ease-out" 
            viewBox="0 0 52 58.296"
            style={{ transform: `rotate(${scrollY * 0.4}deg)` }}
          >
            <g id="Group_1" data-name="Group 1" transform="translate(-3.5 -2261.07)">
              <path id="Path_1" data-name="Path 1" d="M114.833,976.444l-8.332-4.3-8.334,4.3-8.333,4.812,8.333,4.81,8.334,4.812,8.332-4.812h0l8.333-4.81Z" transform="translate(-77 1318)" fill="none" stroke={isSpotlightActive ? "#fc1600" : "#707070"} strokeWidth="1.5" />
              <path id="Path_2" data-name="Path 2" d="M106.5,952.389v19.755l-8.334,4.3-8.333,4.812V962.011l8.333-4.811Z" transform="translate(-77 1318)" fill="none" stroke={isSpotlightActive ? "#fc1600" : "#707070"} strokeWidth="1.5" />
              <path id="Path_3" data-name="Path 3" d="M106.5,990.878v9.622l-8.334-4.81-13.862-8a5.611,5.611,0,0,1-2.805-4.858V957.2l8.334,4.811v19.245l8.333,4.81Z" transform="translate(-77 1318)" fill="none" stroke={isSpotlightActive ? "#fc1600" : "#707070"} strokeWidth="1.5" />
              <path id="Path_4" data-name="Path 4" d="M131.5,957.2v25.628a5.61,5.61,0,0,1-2.8,4.858l-5.529,3.192-8.333,4.812L106.5,1000.5v-9.623l8.333-4.811,8.333-4.811V962.011Z" transform="translate(-77 1318)" fill="none" stroke={isSpotlightActive ? "#fc1600" : "#707070"} strokeWidth="1.5" />
              <path id="Path_5" data-name="Path 5" d="M131.5,957.2l-8.333,4.812-8.333-4.812-8.333-4.811L98.167,957.2l-8.334,4.812L81.5,957.2l8.333-4.811,8.334-4.811,5.529-3.192a5.609,5.609,0,0,1,5.609,0l5.528,3.192,8.334,4.811Z" transform="translate(-77 1318)" fill="none" stroke={isSpotlightActive ? "#fc1600" : "#707070"} strokeWidth="1.5" />
              <path id="Path_6" data-name="Path 6" d="M114.834,957.2l-8.333-4.811v19.755l8.332,4.3,8.333,4.812V962.011Z" transform="translate(-77 1318)" fill="none" stroke={isSpotlightActive ? "#fc1600" : "#707070"} strokeWidth="1.5" />
            </g>
          </svg>
        </button>

        {/* The Spotlight Cone (Casted transversely/horizontally at -72 degrees, using warm golden-amber classic light) - MASSIVE SIZE */}
        <div 
          className={`absolute top-[90%] left-1/2 w-[1550px] h-[165vh] pointer-events-none transition-all duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] origin-top ${isSpotlightActive ? 'opacity-100 scale-y-100 scale-x-100' : 'opacity-0 scale-y-50 scale-x-75 pointer-events-none'}`}
          style={{
            background: 'linear-gradient(to bottom, rgba(255, 220, 180, 0.24) 0%, rgba(216, 29, 0, 0.07) 35%, rgba(216, 29, 0, 0.01) 70%, transparent 100%)',
            clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
            filter: 'blur(55px)',
            transform: `translateX(-50%) rotate(${isSpotlightActive ? '-72deg' : '-15deg'})`,
          }}
        ></div>

        {/* Extra Glowing Light Core for realism (wider soft gold core) - MASSIVE SIZE */}
        <div 
          className={`absolute top-[90%] left-1/2 w-[580px] h-[125vh] pointer-events-none transition-all duration-[800ms] ease-out origin-top ${isSpotlightActive ? 'opacity-65 scale-100' : 'opacity-0 scale-y-50'}`}
          style={{
            background: 'linear-gradient(to bottom, rgba(255, 235, 200, 0.18) 0%, rgba(216, 29, 0, 0.08) 50%, transparent 100%)',
            clipPath: 'polygon(50% 0%, 15% 100%, 85% 100%)',
            filter: 'blur(30px)',
            transform: `translateX(-50%) rotate(${isSpotlightActive ? '-72deg' : '-15deg'})`,
          }}
        ></div>

        {/* Glowing dust particles inside the spotlight beam (aligned horizontally) */}
        {isSpotlightActive && (
          <div 
            className="absolute top-16 left-1/2 w-[650px] h-[125vh] pointer-events-none overflow-hidden select-none z-10 opacity-45 origin-top transition-all duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{
              transform: `translateX(-50%) rotate(-72deg)`,
            }}
          >
            <div className="absolute w-1.5 h-1.5 bg-amber-400 rounded-full animate-ping top-[20%] left-[35%]"></div>
            <div className="absolute w-1 h-1 bg-red-300 rounded-full animate-ping top-[40%] left-[65%]"></div>
            <div className="absolute w-2 h-2 bg-amber-500 rounded-full animate-ping top-[60%] left-[25%]"></div>
            <div className="absolute w-1.5 h-1.5 bg-red-400 rounded-full animate-ping top-[75%] left-[55%]"></div>
          </div>
        )}
      </div>

      {/* Subtle opposite reflection bounce glow on the right edge of the screen for ultra-realism - ACTIVE ONLY ON DESKTOP */}
      <div 
        className={`hidden md:block fixed right-0 top-[20vh] w-[550px] h-[80vh] pointer-events-none transition-opacity duration-[1100ms] ease-out z-10 ${(isSpotlightActive && scrollY > 400) ? 'opacity-100' : 'opacity-0'}`}
        style={{
          background: 'radial-gradient(circle at right, rgba(255, 220, 180, 0.12) 0%, rgba(216, 29, 0, 0.04) 45%, transparent 75%)',
          filter: 'blur(50px)',
        }}
      ></div>

      {/* Dramatic Ambient Dim Overlay when Spotlight is active and scrolled past the Hero section - ACTIVE ONLY ON DESKTOP */}
      <div className={`hidden md:block fixed inset-0 bg-black/25 pointer-events-none z-0 transition-opacity duration-[1000ms] ${isSpotlightActive ? 'opacity-100' : 'opacity-0'}`}></div>

      {/* ========================================================================= */}
      {/* HEADER GLOBAL - Layout Centralizado & Menu Dinâmico do Wireframe */}
      {/* ========================================================================= */}
      <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrollY > 20 ? 'glass-panel border-b border-zinc-950/80 shadow-lg' : 'bg-transparent border-b border-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* Lado Esquerdo: Menu hambúrguer interativo + Links horizontais no estado Aberto */}
          <div className="flex items-center gap-6">
            {!isMenuOpen ? (
              // Estado Fechado: Ícone de Menu Hambúrguer Branco + Lupa de Pesquisa
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setIsMenuOpen(true)}
                  className="p-1 hover:opacity-80 transition-opacity"
                  aria-label="Abrir Menu"
                >
                  {/* Ícone de Menu Hambúrguer Branco Oficial da Marca */}
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 6H20M4 12H20M4 18H20" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                
                {/* Ícone de Busca cinza claro de alto contraste que abre a pesquisa interativa */}
                <button 
                  onClick={() => setIsSearchOpen(true)}
                  className="text-zinc-400 hover:text-white transition-colors"
                  aria-label="Abrir Busca"
                >
                  <Search size={20} />
                </button>
              </div>
            ) : (
              // Estado Aberto: Ícone de Fechar (X) Branco + Links de Navegação
              <div className="flex items-center gap-6 animate-fade-in-up">
                <button 
                  onClick={() => setIsMenuOpen(false)}
                  className="p-1 hover:opacity-80 transition-opacity"
                  aria-label="Fechar Menu"
                >
                  {/* Ícone Fechar (X) Branco Oficial da Marca */}
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 6L6 18M6 6L18 18" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                
                {/* Navegação Horizontal - Oculta em Mobile para evitar colisões e perfeitamente legível em Desktop */}
                <nav className="hidden md:flex items-center gap-5">
                  <button 
                    onClick={() => { setCurrentPage('home'); setIsMenuOpen(false); }}
                    className={`text-sm font-bold tracking-wide transition-colors ${currentPage === 'home' ? 'text-white border-b-2 border-[#D81D00] pb-0.5' : 'text-zinc-400 hover:text-white'}`}
                  >
                    Home
                  </button>

                  <button 
                    onClick={() => { setCurrentPage('empreendimentos'); setIsMenuOpen(false); }}
                    className={`text-sm font-bold tracking-wide transition-colors ${currentPage === 'empreendimentos' ? 'text-white border-b-2 border-[#D81D00] pb-0.5' : 'text-zinc-400 hover:text-white'}`}
                  >
                    Empreendimentos
                  </button>
                  <button 
                    onClick={() => { 
                      setCurrentPage('home'); 
                      setIsMenuOpen(false);
                      setTimeout(() => {
                        document.getElementById('sobre-nos-secao')?.scrollIntoView({ behavior: 'smooth' });
                      }, 100);
                    }}
                    className="text-sm font-bold tracking-wide text-zinc-400 hover:text-white transition-colors"
                  >
                    Quem somos
                  </button>
                  <button 
                    onClick={() => { setCurrentPage('home'); setIsMenuOpen(false); }}
                    className="text-sm font-bold tracking-wide text-zinc-400 hover:text-white transition-colors"
                  >
                    Insights
                  </button>
                </nav>
              </div>
            )}
          </div>

          {/* Centro: Logotipo Dubai Centralizado (Carregando o SVG Oficial) */}
          <div 
            onClick={() => setCurrentPage('home')}
            className="absolute left-1/2 transform -translate-x-1/2 flex items-center cursor-pointer h-12"
          >
            <img 
              src={`${import.meta.env.BASE_URL}logo.svg`} 
              alt="Dubai Incorporação e Construção" 
              className="h-9 md:h-11 w-auto" 
            />
          </div>

          {/* Lado Direito: Portal do Cliente em Vermelho e Branco Oficial (Hidden on mobile to prevent logo overlap) */}
          <div className="hidden md:flex items-center">
            <a 
              href="https://wa.me/5511999999999" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-xs font-bold text-white hover:text-[#D81D00] transition-colors uppercase tracking-wider"
            >
              Portal do Cliente
            </a>
          </div>

        </div>
      </header>

      {/* ========================================================================= */}
      {/* DRAWER DE MENU MOBILE FULL-SCREEN (Luxo, Legibilidade e Fluidez em Telas Menores) */}
      {/* ========================================================================= */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden bg-black/95 backdrop-blur-2xl flex flex-col justify-between pt-28 pb-12 px-6 animate-fade-in-up">
          <div className="flex flex-col gap-8 mt-12 text-left">
            <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-zinc-500 border-b border-zinc-900 pb-2">
              Navegação Dubai
            </span>
            <nav className="flex flex-col gap-6">
              <button 
                onClick={() => { setCurrentPage('home'); setIsMenuOpen(false); }}
                className={`text-2xl font-bold uppercase tracking-wider text-left transition-colors ${currentPage === 'home' ? 'text-red-500' : 'text-white hover:text-red-500'}`}
              >
                Home
              </button>

              <button 
                onClick={() => { setCurrentPage('empreendimentos'); setIsMenuOpen(false); }}
                className={`text-2xl font-bold uppercase tracking-wider text-left transition-colors ${currentPage === 'empreendimentos' ? 'text-red-500' : 'text-white hover:text-red-500'}`}
              >
                Empreendimentos
              </button>
              <button 
                onClick={() => { 
                  setCurrentPage('home'); 
                  setIsMenuOpen(false);
                  setTimeout(() => {
                    document.getElementById('sobre-nos-secao')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}
                className="text-2xl font-bold uppercase tracking-wider text-left text-white hover:text-red-500 transition-colors"
              >
                Quem somos
              </button>
              <button 
                onClick={() => { setCurrentPage('home'); setIsMenuOpen(false); }}
                className="text-2xl font-bold uppercase tracking-wider text-left text-white hover:text-red-500 transition-colors"
              >
                Insights
              </button>
            </nav>
          </div>

          {/* Rodapé Institucional do Menu Mobile para Riqueza Estética */}
          <div className="flex flex-col gap-6 text-left border-t border-zinc-900 pt-6">
            <a 
              href="https://wa.me/5511999999999" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-sm font-bold text-red-500 uppercase tracking-widest flex items-center gap-2"
            >
              <span>Portal do Cliente</span>
              <ArrowRight size={14} />
            </a>
            <div className="flex flex-col gap-1 text-xs text-zinc-500">
              <p>Osasco & Barueri (Alphaville) - SP</p>
              <p className="text-[10px] text-zinc-600 font-light">"Quem compara compra Dubai"</p>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* OVERLAY DE BUSCA MINIMALISTA E IMERSIVA (Para Desktop e Mobile) */}
      {/* ========================================================================= */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-3xl flex flex-col justify-center items-center p-6 animate-fade-in-up">
          <div className="max-w-2xl w-full flex flex-col gap-6 text-center">
            {/* Safe, non-overlapping Close Button centered perfectly at the top of the layout flow */}
            <button 
              onClick={() => { setIsSearchOpen(false); setSearchQuery(''); }}
              className="mx-auto p-2 rounded-full border border-zinc-800 bg-zinc-950 text-white hover:bg-red-800 hover:border-red-600 transition-all duration-300 w-11 h-11 flex items-center justify-center mb-2 cursor-pointer shadow-xl"
              aria-label="Fechar Pesquisa"
            >
              <X size={22} />
            </button>

            <span className="text-xs font-bold uppercase tracking-[0.2em] text-red-500">
              Busca Inteligente Dubai
            </span>
            
            <div className="relative">
              <input 
                type="text" 
                placeholder="Busque por cidade, bairro, status..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="w-full bg-transparent border-b-2 border-zinc-800 focus:border-red-600 text-2xl md:text-3xl font-light text-white text-center py-4 focus:outline-none transition-colors"
              />
              <Search className="absolute right-0 top-1/2 transform -translate-y-1/2 text-zinc-500" size={28} />
            </div>

            {/* Sugestões Rápidas de busca */}
            <div className="flex flex-wrap justify-center gap-3 mt-2">
              <span className="text-xs text-zinc-500 uppercase tracking-widest mr-2 self-center">Popular:</span>
              {['Osasco', 'Barueri', 'Alphaville', 'Lançamento', 'Pronto'].map((tag) => (
                <button 
                  key={tag}
                  onClick={() => setSearchQuery(tag)}
                  className="px-3 py-1.5 rounded-full border border-zinc-900 bg-zinc-950/40 text-xs text-zinc-400 hover:text-white hover:border-red-850 transition-colors uppercase tracking-wider"
                >
                  {tag}
                </button>
              ))}
            </div>

            {/* Exibição em Tempo Real de Resultados de Empreendimentos */}
            {searchQuery && (
              <div className="mt-8 max-h-[40vh] overflow-y-auto flex flex-col gap-4 text-left border-t border-zinc-900 pt-6">
                {empreendimentosData
                  .filter(emp => 
                    emp.nome.toLowerCase().includes(searchQuery.toLowerCase()) || 
                    emp.cidade.toLowerCase().includes(searchQuery.toLowerCase()) || 
                    emp.bairro.toLowerCase().includes(searchQuery.toLowerCase()) || 
                    emp.statusLabel.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    emp.descricao.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .map(emp => (
                    <div 
                      key={emp.id}
                      onClick={() => {
                        setSelectedEmpreendimentoId(emp.id);
                        setCurrentPage('detalhe');
                        setIsSearchOpen(false);
                        setSearchQuery('');
                      }}
                      className="group flex gap-4 p-3 rounded bg-zinc-950/60 border border-zinc-900 hover:border-red-800 cursor-pointer transition-all"
                    >
                      <img 
                        src={emp.fotos[0]} 
                        alt={emp.nome} 
                        className="w-16 h-16 object-cover rounded" 
                      />
                      <div className="flex flex-col justify-center">
                        <span className="text-[9px] uppercase font-bold tracking-widest text-red-500 mb-0.5">{emp.statusLabel}</span>
                        <h4 className="text-sm font-bold text-white group-hover:text-red-500 transition-colors">{emp.nome}</h4>
                        <p className="text-xs text-zinc-400 font-light">{emp.bairro}, {emp.cidade} • {emp.area}</p>
                      </div>
                    </div>
                  ))
                }
                {empreendimentosData.filter(emp => 
                  emp.nome.toLowerCase().includes(searchQuery.toLowerCase()) || 
                  emp.cidade.toLowerCase().includes(searchQuery.toLowerCase()) || 
                  emp.bairro.toLowerCase().includes(searchQuery.toLowerCase()) || 
                  emp.statusLabel.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  emp.descricao.toLowerCase().includes(searchQuery.toLowerCase())
                ).length === 0 && (
                  <p className="text-sm text-zinc-500 text-center py-4 font-light">Nenhum empreendimento encontrado para "{searchQuery}".</p>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Espaçador de Cabeçalho */}
      {currentPage !== 'home' && currentPage !== 'home2' && <div className="h-20"></div>}

      {/* ========================================================================= */}
      {/* CONTEÚDO PRINCIPAL - Sistema de Rotas */}
      {/* ========================================================================= */}
      <main className="flex-1">

        {/* ------------------------------------------------------------------------- */}
        {/* PÁGINA 1: HOME PAGE */}
        {/* ------------------------------------------------------------------------- */}
        {(currentPage === 'home' || currentPage === 'home2') && (
          <div className="animate-fade-in-up">
            
            {currentPage === 'home' ? (
              /* 1. HERO SECTION - LUXO PARALLAX E SLIDER (IMAGEM E VÍDEO) */
              <section className="relative h-screen overflow-hidden bg-transparent flex items-center justify-center">
                
                {/* ---------------- SLIDE 1: IMAGEM DE LUXO ---------------- */}
                <div 
                  className={`absolute inset-0 z-0 transition-opacity duration-[1200ms] ease-in-out ${activeHeroSlide === 0 ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                >
                  <div 
                    className="absolute inset-0"
                    style={{
                      transform: `scale(${heroScale}) translateY(${heroTranslateY}px)`,
                      opacity: heroOpacity * 0.45 + 0.25,
                      transition: 'transform 0.1s cubic-bezier(0.1, 0.8, 0.2, 1)'
                    }}
                  >
                    <img 
                      src={`${import.meta.env.BASE_URL}hero-bg.png`} 
                      alt="Fachada Construtora Dubai de Luxo" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black"></div>
                  </div>
                </div>

                {/* ---------------- SLIDE 2: VÍDEO MP4 CINEMATOGRÁFICO ---------------- */}
                <div 
                  className={`absolute inset-0 z-0 transition-opacity duration-[1200ms] ease-in-out ${activeHeroSlide === 1 ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                >
                  <div 
                    className="absolute inset-0"
                    style={{
                      transform: `scale(${heroScale}) translateY(${heroTranslateY}px)`,
                      opacity: heroOpacity * 0.5 + 0.3,
                      transition: 'transform 0.1s cubic-bezier(0.1, 0.8, 0.2, 1)'
                    }}
                  >
                    <video 
                      src={`${import.meta.env.BASE_URL}hero-video.mp4`} 
                      autoPlay 
                      loop 
                      muted 
                      playsInline 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black"></div>
                  </div>
                </div>

                {/* ---------------- TEXTO SLIDE 1 ---------------- */}
                <div 
                  className={`absolute inset-0 z-10 flex items-center justify-center px-6 transition-all duration-[1000ms] ease-in-out ${activeHeroSlide === 0 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95 pointer-events-none'}`}
                >
                  <div 
                    className="max-w-4xl mx-auto text-center flex flex-col gap-6"
                    style={{
                      transform: `translateY(${-heroTranslateY * 0.05}px)`,
                      opacity: heroOpacity,
                      transition: 'transform 0.1s cubic-bezier(0.1, 0.8, 0.2, 1), opacity 0.1s linear'
                    }}
                  >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-950/60 border border-red-800/40 w-fit mx-auto animate-pulse">
                      <Sparkles size={14} className="text-red-500" />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-red-400">
                        Quem compara compra Dubai • Obras Entregues no Prazo
                      </span>
                    </div>
                    
                    <h1 className="text-[26px] sm:text-4xl md:text-6xl text-white uppercase font-extrabold leading-tight tracking-wider font-sans px-2">
                      Empreendimentos que elevam <br />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-red-500 to-red-400">
                        sua experiência de viver
                      </span>
                    </h1>

                    <p className="text-base md:text-lg text-zinc-300 max-w-2xl mx-auto font-light leading-relaxed">
                      Projetos contemporâneos em localizações estratégicas de Osasco, Alphaville e região.
                    </p>

                    <div className="flex flex-wrap justify-center gap-4 mt-6">
                      <button 
                        onClick={() => setCurrentPage('empreendimentos')}
                        className="btn-primary flex items-center gap-2"
                      >
                        <span>Conhecer empreendimentos</span>
                        <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* ---------------- TEXTO SLIDE 2 ---------------- */}
                <div 
                  className={`absolute inset-0 z-10 flex items-center justify-center px-6 transition-all duration-[1000ms] ease-in-out ${activeHeroSlide === 1 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95 pointer-events-none'}`}
                >
                  <div 
                    className="max-w-4xl mx-auto text-center flex flex-col gap-6"
                    style={{
                      transform: `translateY(${-heroTranslateY * 0.05}px)`,
                      opacity: heroOpacity,
                      transition: 'transform 0.1s cubic-bezier(0.1, 0.8, 0.2, 1), opacity 0.1s linear'
                    }}
                  >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-950/60 border border-red-800/40 w-fit mx-auto animate-pulse">
                      <Sparkles size={14} className="text-red-500" />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-red-400">
                        DNA Dubai • Solidez, Segurança e Alto Padrão
                      </span>
                    </div>
                    
                    <h1 className="text-[26px] sm:text-4xl md:text-6xl text-white uppercase font-extrabold leading-tight tracking-wider font-sans px-2">
                      A grife do alto padrão <br />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-red-500 to-red-400">
                        na grande São Paulo
                      </span>
                    </h1>

                    <p className="text-base md:text-lg text-zinc-300 max-w-2xl mx-auto font-light leading-relaxed">
                      Acabamento nobre superior, engenharia de ponta e valorização imobiliária certificada por contrato.
                    </p>

                    <div className="flex flex-wrap justify-center gap-4 mt-6">
                      <button 
                        onClick={() => {
                          setCurrentPage('contato');
                          setTimeout(() => {
                            document.getElementById('lead-form-box')?.scrollIntoView({ behavior: 'smooth' });
                          }, 100);
                        }}
                        className="btn-primary flex items-center gap-2"
                      >
                        <span>Falar com especialista</span>
                        <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Setas de navegação exclusivas do Slider (Estilo Dubai Luxury) - Alinhadas no Grid Centralizado do Site, ocultas em mobile */}
                <div className="hidden md:flex absolute inset-x-0 top-1/2 -translate-y-1/2 w-full max-w-7xl mx-auto px-6 z-30 justify-between pointer-events-none">
                  <button 
                    onClick={() => setActiveHeroSlide((prev) => (prev === 0 ? 1 : 0))}
                    className="w-12 h-12 rounded-full border border-zinc-800 bg-black/40 text-white hover:text-[#d81d00] hover:border-[#d81d00]/40 flex items-center justify-center transition-all duration-300 group shadow-2xl backdrop-blur-md pointer-events-auto"
                    aria-label="Slide anterior"
                  >
                    <ChevronLeft size={24} className="group-hover:-translate-x-0.5 transition-transform" />
                  </button>
                  <button 
                    onClick={() => setActiveHeroSlide((prev) => (prev === 0 ? 1 : 0))}
                    className="w-12 h-12 rounded-full border border-zinc-800 bg-black/40 text-white hover:text-[#d81d00] hover:border-[#d81d00]/40 flex items-center justify-center transition-all duration-300 group shadow-2xl backdrop-blur-md pointer-events-auto"
                    aria-label="Próximo slide"
                  >
                    <ChevronRight size={24} className="group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>

                {/* Controles de navegação dos slides (Pontos/Dots inferiores de luxo) - Elevados para evitar sobreposição */}
                <div className="absolute bottom-52 left-1/2 -translate-x-1/2 z-20 flex gap-3">
                  <button 
                    onClick={() => setActiveHeroSlide(0)}
                    className={`w-3.5 h-1 rounded-full transition-all duration-300 ${activeHeroSlide === 0 ? 'bg-[#d81d00] w-7' : 'bg-zinc-700 hover:bg-zinc-500'}`}
                    aria-label="Slide 1"
                  />
                  <button 
                    onClick={() => setActiveHeroSlide(1)}
                    className={`w-3.5 h-1 rounded-full transition-all duration-300 ${activeHeroSlide === 1 ? 'bg-[#d81d00] w-7' : 'bg-zinc-700 hover:bg-zinc-500'}`}
                    aria-label="Slide 2"
                  />
                </div>

                {/* Icone animada de Scroll - Posicionada na base para separação geométrica perfeita (Sem texto Scroll) */}
                <div 
                  className="absolute bottom-28 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center cursor-pointer opacity-75 hover:opacity-100 transition-opacity"
                  onClick={() => {
                    const nextSection = document.querySelector('section.py-24');
                    nextSection?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <div className="w-5 h-9 border border-zinc-700 rounded-full flex justify-center p-1">
                    <div className="w-1.5 h-2 bg-[#d81d00] rounded-full animate-bounce"></div>
                  </div>
                </div>
              </section>
            ) : (
              /* 1. HERO SECTION - SPLINE 3D HERO (DUBAI CONSTRUTORA BRAND THEME) */
              <section className="relative min-h-screen flex items-center justify-center bg-[#080809] overflow-hidden font-sora">
                {/* Spline 3D Background (absolute, full-size) with color matrix filter shifting green to red */}
                <div className="absolute inset-0 z-0">
                  <React.Suspense fallback={<div className="absolute inset-0 bg-[#080809] animate-pulse" />}>
                    <Spline 
                      scene="https://prod.spline.design/Slk6b8kz3LRlKiyk/scene.splinecode" 
                      className="w-full h-full" 
                      style={{ filter: 'url(#green-to-red)' }}
                    />
                  </React.Suspense>
                  
                  {/* Seamless blending gradients: top fades to header, bottom fades to next section */}
                  <div className="absolute inset-0 bg-gradient-to-b from-[#080809] via-transparent to-[#080809] z-[1] pointer-events-none opacity-85" />
                </div>
                
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/25 z-[1] pointer-events-none" />
                
                {/* Content container - centered and aligned with header container boundaries (max-w-7xl mx-auto px-6) */}
                <div className="relative z-10 pointer-events-none w-full max-w-7xl mx-auto px-6 md:px-12 pt-20 flex flex-col items-center text-center">
                  {/* Heading */}
                  <h1 
                    className="text-[clamp(3rem,8vw,6.5rem)] font-bold leading-[1.05] tracking-[-0.05em] text-white mb-3 md:mb-5 uppercase opacity-0 animate-fade-up"
                    style={{ animationDelay: "0.2s" }}
                  >
                    DUBAI <span className="text-[#d81d00]">CONSTRUTORA</span>
                  </h1>

                  {/* Subheading */}
                  <p 
                    className="text-white/80 text-[clamp(1.125rem,2.5vw,2rem)] font-light mb-4 md:mb-6 opacity-0 animate-fade-up"
                    style={{ animationDelay: "0.4s" }}
                  >
                    Quem compara compra Dubai.
                  </p>

                  {/* Description */}
                  <p 
                    className="text-zinc-400 text-[clamp(0.875rem,1.5vw,1.25rem)] font-light mb-6 md:mb-8 opacity-0 animate-fade-up max-w-2xl leading-relaxed"
                    style={{ animationDelay: "0.55s" }}
                  >
                    Apartamentos de altíssimo padrão em Osasco e Barueri. Qualidade construtiva inquestionável e 100% das obras entregues no prazo. O padrão de luxo que sua família merece.
                  </p>

                  {/* Two CTA buttons */}
                  <div 
                    className="flex flex-wrap justify-center gap-4 font-bold opacity-0 animate-fade-up"
                    style={{ animationDelay: "0.7s" }}
                  >
                    <button 
                      onClick={() => setCurrentPage('empreendimentos')}
                      className="btn-primary px-8 py-4 pointer-events-auto uppercase tracking-wider flex items-center gap-2"
                    >
                      <span>Ver Empreendimentos</span>
                      <ArrowRight size={16} />
                    </button>
                    <button 
                      onClick={() => {
                        setCurrentPage('contato');
                        setTimeout(() => {
                          document.getElementById('lead-form-box')?.scrollIntoView({ behavior: 'smooth' });
                        }, 100);
                      }}
                      className="btn-secondary px-8 py-4 pointer-events-auto uppercase tracking-wider"
                    >
                      Falar com Especialista
                    </button>
                  </div>

                  {/* Trust line */}
                  <p 
                    className="text-zinc-500/80 text-xs font-light mt-8 md:mt-10 opacity-0 animate-fade-up"
                    style={{ animationDelay: "0.85s" }}
                  >
                    100% das obras entregues no prazo. Osasco & Barueri. Solidez construtiva.
                  </p>
                </div>
              </section>
            )}

            {/* 2. DESTAQUES DO PORTFÓLIO - Redesenho Monocromático Premium (Dark Luxury Integration) */}
            <section className="py-24 px-6 bg-black/40 border-t border-zinc-900 text-white relative">
              <div className="max-w-7xl mx-auto">
                
                {/* Abas de Filtro por Cidade (Fidelidade ao Wireframe no Tema Escuro da Marca, flex-wrap e espaçamento responsivo) */}
                <div className="flex flex-wrap justify-center items-center gap-1 sm:gap-4 md:gap-8 mb-16 text-[10px] sm:text-xs md:text-sm tracking-[0.1em] sm:tracking-[0.2em] md:tracking-[0.25em] font-extrabold uppercase text-zinc-500 font-sans px-2">
                  <button 
                    onClick={() => setActivePortfolioTab('BARUERI')} 
                    className={`transition-all duration-300 py-2 px-3 sm:px-4 ${activePortfolioTab === 'BARUERI' ? 'text-[#d81d00] border-b-2 border-[#d81d00] font-black scale-105' : 'hover:text-white font-normal'}`}
                  >
                    BARUERI
                  </button>
                  <span className="text-zinc-800">|</span>
                  <button 
                    onClick={() => setActivePortfolioTab('OSASCO')} 
                    className={`transition-all duration-300 py-2 px-3 sm:px-4 ${activePortfolioTab === 'OSASCO' ? 'text-[#d81d00] border-b-2 border-[#d81d00] font-black scale-105' : 'hover:text-white font-normal'}`}
                  >
                    OSASCO
                  </button>
                  <span className="text-zinc-800">|</span>
                  <button 
                    onClick={() => setActivePortfolioTab('ALPHAVILLE')} 
                    className={`transition-all duration-300 py-2 px-3 sm:px-4 ${activePortfolioTab === 'ALPHAVILLE' ? 'text-[#d81d00] border-b-2 border-[#d81d00] font-black scale-105' : 'hover:text-white font-normal'}`}
                  >
                    ALPHAVILLE
                  </button>
                </div>

                {/* Grid de Cards no Tema Escuro da Marca (Fidelidade ao Estilo e Ícones do Website) */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                  {/* Filtramos ou mostramos os empreendimentos correspondentes */}
                  {(activePortfolioTab === 'BARUERI' 
                    ? [
                        { ...empreendimentosData.find(e => e.id === 'authoria'), nome: 'Authoria', bairro: 'Alphaville', cidade: 'Barueri', area: '273m² a 529m²', dormitorios: '4 a 5 Quartos', statusLabel: 'Lançamento' },
                        { ...empreendimentosData.find(e => e.id === 'acervo'), nome: 'Acervo por Dubai', bairro: 'Alphaville', cidade: 'Barueri', statusLabel: 'Pronto para Morar' },
                        { ...empreendimentosData.find(e => e.id === 'legend'), nome: 'Legend por Dubai', statusLabel: 'Em Obras' }
                      ]
                    : activePortfolioTab === 'OSASCO'
                    ? [
                        { ...empreendimentosData.find(e => e.id === 'authoria'), nome: 'Authoria por Dubai' },
                        { ...empreendimentosData.find(e => e.id === 'yara'), nome: 'Yara por Dubai' },
                        { ...empreendimentosData.find(e => e.id === 'legend'), nome: 'Legend por Dubai' }
                      ]
                    : [
                        { ...empreendimentosData.find(e => e.id === 'authoria'), nome: 'Authoria', bairro: 'Alphaville', cidade: 'Barueri', area: '273m² a 529m²', dormitorios: '4 a 5 Quartos', statusLabel: 'Lançamento' },
                        { ...empreendimentosData.find(e => e.id === 'acervo'), nome: 'Acervo por Dubai', statusLabel: 'Pronto para Morar' },
                        { ...empreendimentosData.find(e => e.id === 'yara'), nome: 'Yara por Dubai' }
                      ]
                  ).map((emp, index) => (
                    <InteractiveTiltCard 
                      key={emp.id + '-' + index} 
                      className="glass-panel rounded overflow-hidden flex flex-col border border-zinc-900/60 relative cursor-pointer hover:-translate-y-2.5 hover:border-[#d81d00]/40 hover:shadow-[0_20px_50px_-10px_rgba(216,29,0,0.15)] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group"
                      onClick={() => {
                        setSelectedEmpreendimentoId(emp.id);
                        setCurrentPage('detalhe');
                      }}
                    >
                      {/* Efeito Brilho e Reflexo de Diamante Premium */}
                      <div className="absolute inset-0 w-full h-full bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-[1500ms] ease-out pointer-events-none z-10" />

                      <div className="relative overflow-hidden aspect-[4/3] bg-zinc-950">
                        {/* Imagens Reais Coloridas e Distintas com Zoom Suave (Ken Burns Effect) */}
                        <img 
                          src={emp.fotos[0]} 
                          alt={emp.nome} 
                          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-108 transition-all duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                        />
                        {/* Status Badge Oficial */}
                        <span className="absolute top-4 left-4 bg-black/85 text-[10px] font-bold tracking-widest text-red-500 uppercase px-3 py-1 border border-red-900/40 rounded shadow-md z-20">
                          {emp.statusLabel || 'Lançamento'}
                        </span>
                      </div>

                      <div className="p-6 flex-1 flex flex-col justify-between">
                        <div>
                          {/* Localização com micro-interação de salto no ícone */}
                          <div className="flex items-center gap-1 text-zinc-400 text-xs tracking-wider uppercase mb-1">
                            <MapPin size={12} className="text-red-500 group-hover:-translate-y-0.5 transition-transform duration-300" />
                            <span>{emp.bairro}, {emp.cidade}</span>
                          </div>
                          
                          {/* Nome do Empreendimento */}
                          <h3 className="text-xl font-bold text-white uppercase group-hover:text-[#d81d00] transition-colors duration-300 mb-2">
                            {emp.nome}
                          </h3>

                          {/* Slogan Curto */}
                          <p className="text-xs text-zinc-400 font-light line-clamp-2 mb-4 leading-relaxed">
                            {emp.slogan}
                          </p>
                        </div>

                        <div>
                          {/* Divisor que acende na cor da marca no hover */}
                          <hr className="border-zinc-900 group-hover:border-red-900/30 transition-colors duration-500 my-4" />
                          <div className="flex items-center justify-between text-xs text-zinc-400 mb-4">
                            <span className="flex items-center gap-1">
                               <Maximize2 size={12} className="text-red-800 group-hover:scale-110 transition-transform duration-300" />
                              {emp.area}
                            </span>
                            <span className="flex items-center gap-1">
                               <Building2 size={12} className="text-red-800 group-hover:scale-110 transition-transform duration-300" />
                              {emp.dormitorios}
                            </span>
                          </div>
                        </div>
                      </div>
                    </InteractiveTiltCard>
                  ))}
                </div>

                <div className="flex justify-center">
                  <button 
                    onClick={() => setCurrentPage('empreendimentos')}
                    className="btn-primary"
                  >
                    Ver todos os empreendimentos
                  </button>
                </div>

              </div>
            </section>

            {/* 3. SEÇÃO DE DIFERENCIAIS E ESTATÍSTICAS - Redesenhado Premium */}
            <section className="py-28 px-6 border-t border-zinc-950/80 relative overflow-hidden">
              {/* Elementos de iluminação/glow premium no fundo */}
              <div className="absolute top-1/4 -left-10 w-96 h-96 bg-red-950/10 rounded-full blur-[120px] pointer-events-none"></div>
              <div className="absolute bottom-1/4 -right-10 w-96 h-96 bg-red-900/5 rounded-full blur-[150px] pointer-events-none"></div>
              
              <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                  
                  {/* Lado Esquerdo: Info + Estatísticas */}
                  <div className="lg:col-span-5 space-y-12">
                    <div>
                      <span className="text-red-500 text-xs font-bold uppercase tracking-[0.25em] block mb-3">
                        O Selo Construtivo
                      </span>
                      <h2 className="text-4xl lg:text-5xl text-white uppercase font-extrabold tracking-tight leading-[1.1] mb-6">
                        Diferenciais <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-300 to-red-500">e Qualidade Dubai</span>
                      </h2>
                      <div className="w-16 h-[2px] bg-red-600 mb-6"></div>
                      <p className="text-sm text-zinc-400 font-light leading-relaxed max-w-lg">
                        Nossa dedicação vai além da alvenaria. Construímos obras com solidez jurídica, engenharia moderna e total respeito ao cronograma estabelecido.
                      </p>
                    </div>

                    {/* Grid de Estatísticas Premium */}
                    <div className="grid grid-cols-2 gap-x-8 gap-y-10 pt-8 border-t border-zinc-900/60">
                      
                      {/* Stat 1 */}
                      <div className="group relative">
                        <div className="absolute -left-3 top-0 w-[2px] h-0 bg-red-600 group-hover:h-full transition-all duration-500"></div>
                        <div className="pl-2">
                          <div className="text-4xl lg:text-5xl font-extrabold text-white tracking-tight flex items-baseline">
                            <span className="bg-clip-text text-transparent bg-gradient-to-br from-white via-zinc-100 to-zinc-400 group-hover:to-red-500 transition-colors duration-300">
                              9
                            </span>
                          </div>
                          <p className="text-[10px] text-zinc-500 font-medium uppercase tracking-wider mt-2 group-hover:text-zinc-400 transition-colors">
                            cidades em todo o Brasil
                          </p>
                        </div>
                      </div>

                      {/* Stat 2 */}
                      <div className="group relative">
                        <div className="absolute -left-3 top-0 w-[2px] h-0 bg-red-600 group-hover:h-full transition-all duration-500"></div>
                        <div className="pl-2">
                          <div className="text-4xl lg:text-5xl font-extrabold text-white tracking-tight flex items-baseline">
                            <span className="bg-clip-text text-transparent bg-gradient-to-br from-white via-zinc-100 to-zinc-400 group-hover:to-red-500 transition-colors duration-300">
                              457
                            </span>
                          </div>
                          <p className="text-[10px] text-zinc-500 font-medium uppercase tracking-wider mt-2 group-hover:text-zinc-400 transition-colors">
                            projetos entregues
                          </p>
                        </div>
                      </div>

                      {/* Stat 3 */}
                      <div className="group relative">
                        <div className="absolute -left-3 top-0 w-[2px] h-0 bg-red-600 group-hover:h-full transition-all duration-500"></div>
                        <div className="pl-2">
                          <div className="text-4xl lg:text-5xl font-extrabold text-white tracking-tight flex items-baseline">
                            <span className="bg-clip-text text-transparent bg-gradient-to-br from-white via-zinc-100 to-zinc-400 group-hover:to-red-500 transition-colors duration-300">
                              +112mil
                            </span>
                          </div>
                          <p className="text-[10px] text-zinc-500 font-medium uppercase tracking-wider mt-2 group-hover:text-zinc-400 transition-colors">
                            pessoas que vivem em um Dubai
                          </p>
                        </div>
                      </div>

                      {/* Stat 4 */}
                      <div className="group relative">
                        <div className="absolute -left-3 top-0 w-[2px] h-0 bg-red-600 group-hover:h-full transition-all duration-500"></div>
                        <div className="pl-2">
                          <div className="text-4xl lg:text-5xl font-extrabold text-white tracking-tight flex items-baseline">
                            <span className="bg-clip-text text-transparent bg-gradient-to-br from-white via-zinc-100 to-zinc-400 group-hover:to-red-500 transition-colors duration-300">
                              +3,1mil
                            </span>
                          </div>
                          <p className="text-[10px] text-zinc-500 font-medium uppercase tracking-wider mt-2 group-hover:text-zinc-400 transition-colors">
                            colaboradores em nossa equipe
                          </p>
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* Lado Direito: Os 4 Diferenciais em Grid Magnífico */}
                  <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                    
                    {/* Diferencial 1: Entrega no Prazo */}
                    <InteractiveTiltCard className="glass-panel glass-panel-hover p-8 rounded relative group overflow-hidden">
                      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-red-500/20 to-transparent"></div>
                      <div className="w-12 h-12 bg-zinc-950 border border-zinc-900 flex items-center justify-center text-red-500 mb-6 group-hover:scale-105 group-hover:border-red-600/30 transition-all duration-300">
                        <Clock size={20} className="group-hover:rotate-[360deg] transition-transform duration-750 ease-out" />
                      </div>
                      <h3 className="text-md font-bold text-white uppercase tracking-wider mb-3">
                        Entrega no Prazo
                      </h3>
                      <p className="text-xs text-zinc-400 font-light leading-relaxed">
                        100% de nossos empreendimentos são entregues rigorosamente dentro do cronograma contratual estabelecido. Sua garantia máxima de tranquilidade.
                      </p>
                    </InteractiveTiltCard>

                    {/* Diferencial 2: Qualidade Dubai */}
                    <InteractiveTiltCard className="glass-panel glass-panel-hover p-8 rounded relative group overflow-hidden">
                      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-red-500/20 to-transparent"></div>
                      <div className="w-12 h-12 bg-zinc-950 border border-zinc-900 flex items-center justify-center text-red-500 mb-6 group-hover:scale-105 group-hover:border-red-600/30 transition-all duration-300">
                        <Award size={20} className="group-hover:scale-110 transition-transform duration-300" />
                      </div>
                      <h3 className="text-md font-bold text-white uppercase tracking-wider mb-3">
                        Qualidade Dubai
                      </h3>
                      <p className="text-xs text-zinc-400 font-light leading-relaxed">
                        Utilização de revestimentos nobres, engenharia estrutural de vanguarda e acabamento de altíssimo nível em cada detalhe das áreas comuns e privativas.
                      </p>
                    </InteractiveTiltCard>

                    {/* Diferencial 3: Solidez e Segurança */}
                    <InteractiveTiltCard className="glass-panel glass-panel-hover p-8 rounded relative group overflow-hidden">
                      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-red-500/20 to-transparent"></div>
                      <div className="w-12 h-12 bg-zinc-950 border border-zinc-900 flex items-center justify-center text-red-500 mb-6 group-hover:scale-105 group-hover:border-red-600/30 transition-all duration-300">
                        <ShieldCheck size={20} className="group-hover:scale-110 transition-transform duration-300" />
                      </div>
                      <h3 className="text-md font-bold text-white uppercase tracking-wider mb-3">
                        Solidez e Segurança
                      </h3>
                      <p className="text-xs text-zinc-400 font-light leading-relaxed">
                        Empresa com capital próprio consolidado e parcerias seguras. Incorporações registradas de forma correta e transparência jurídica absoluta.
                      </p>
                    </InteractiveTiltCard>

                    {/* Diferencial 4: Endereços de Elite */}
                    <InteractiveTiltCard className="glass-panel glass-panel-hover p-8 rounded relative group overflow-hidden">
                      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-red-500/20 to-transparent"></div>
                      <div className="w-12 h-12 bg-zinc-950 border border-zinc-900 flex items-center justify-center text-red-500 mb-6 group-hover:scale-105 group-hover:border-red-600/30 transition-all duration-300">
                        <MapPin size={20} className="group-hover:translate-y-[-4px] transition-transform duration-300" />
                      </div>
                      <h3 className="text-md font-bold text-white uppercase tracking-wider mb-3">
                        Endereços de Elite
                      </h3>
                      <p className="text-xs text-zinc-400 font-light leading-relaxed">
                        Terrenos criteriosamente selecionados nos melhores pontos de Osasco e Barueri, assegurando excelente valorização e infraestrutura de transporte e lazer.
                      </p>
                    </InteractiveTiltCard>

                  </div>

                </div>
              </div>
            </section>

            {/* 4. INSTITUCIONAL / SOBRE NÓS - Redesenhado Ultra Premium */}
            <section id="sobre-nos-secao" className="py-28 px-6 border-t border-zinc-950 bg-black/40 relative overflow-hidden">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-950/5 rounded-full blur-[160px] pointer-events-none"></div>
              
              <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                  
                  {/* Lado Esquerdo: Imagem com Moldura Arquitetônica Premium Offset */}
                  <div className="lg:col-span-5 relative group cursor-pointer">
                    {/* Moldura de Linha Arquitetônica Traseira Offset */}
                    <div className="absolute top-4 left-4 -right-4 -bottom-4 border border-[#d81d00]/30 group-hover:top-2 group-hover:left-2 group-hover:-right-2 group-hover:-bottom-2 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] rounded pointer-events-none z-0"></div>
                    
                    {/* Container Principal da Imagem */}
                    <div className="relative overflow-hidden rounded aspect-[4/5] bg-zinc-950 border border-zinc-800/80 z-10 shadow-2xl transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2 group-hover:translate-y-2 group-hover:border-[#d81d00]/50">
                      {/* Efeito Brilho e Reflexo de Diamante Premium */}
                      <div className="absolute inset-0 w-full h-full bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-[1500ms] ease-out pointer-events-none z-20" />

                      <img 
                        src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80" 
                        alt="Edifício Corporativo Construtora Dubai" 
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-108 transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                      />
                    </div>
                  </div>

                  {/* Lado Direito: Texto Histórico, Métricas e Bento M.V.V */}
                  <div className="lg:col-span-7 space-y-10 text-left">
                    <div>
                      <span className="text-red-500 text-xs font-bold uppercase tracking-[0.25em] block mb-3">
                        Conheça-nos
                      </span>
                      <h2 className="text-3xl md:text-4xl lg:text-5xl text-white uppercase font-extrabold tracking-tight leading-[1.1] mb-6">
                        Quem Somos
                      </h2>
                      <div className="w-16 h-[2px] bg-red-600 mb-6"></div>
                      <p className="text-sm text-zinc-400 font-light leading-relaxed">
                        A Dubai Construtora e Incorporadora é referência em empreendimentos de alto padrão na região metropolitana de São Paulo. Com atuação em Osasco, Alphaville e Barueri, já entregamos mais de 22 empreendimentos e 3.000+ unidades, impactando a sociedade e construindo um legado transformador. Nossos apartamentos duplex, coberturas e residências de luxo são referência em qualidade, design e valorização imobiliária.
                      </p>
                    </div>

                    {/* Bento Grid: Missão, Visão e Valores */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      
                      {/* Missão */}
                      <InteractiveTiltCard className="glass-panel p-6 rounded relative group overflow-hidden border-zinc-900 hover:border-red-900/50 transition-all duration-300">
                        <div className="w-8 h-8 bg-zinc-950 flex items-center justify-center text-red-500 mb-4 group-hover:scale-110 transition-transform">
                          <Compass size={16} />
                        </div>
                        <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2">Missão</h4>
                        <p className="text-[11px] text-zinc-400 font-light leading-relaxed">
                          Transformar o jeito de viver.
                        </p>
                      </InteractiveTiltCard>

                      {/* Visão */}
                      <InteractiveTiltCard className="glass-panel p-6 rounded relative group overflow-hidden border-zinc-900 hover:border-red-900/50 transition-all duration-300">
                        <div className="w-8 h-8 bg-zinc-950 flex items-center justify-center text-red-500 mb-4 group-hover:scale-110 transition-transform">
                          <Sparkles size={16} />
                        </div>
                        <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2">Visão</h4>
                        <p className="text-[11px] text-zinc-400 font-light leading-relaxed">
                          Impactar a society respeitando os pilares social, ambiental e econômico, construindo um legado transformador.
                        </p>
                      </InteractiveTiltCard>

                      {/* Valores */}
                      <InteractiveTiltCard className="glass-panel p-6 rounded relative group overflow-hidden border-zinc-900 hover:border-red-900/50 transition-all duration-300">
                        <div className="w-8 h-8 bg-zinc-950 flex items-center justify-center text-red-500 mb-4 group-hover:scale-110 transition-transform">
                          <Award size={16} />
                        </div>
                        <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2">Valores</h4>
                        <p className="text-[11px] text-zinc-400 font-light leading-relaxed">
                          DNA: Somos apaixonados pelo que fazemos. Segurança, Clientes, Padrão Dubai e Assertividade.
                        </p>
                      </InteractiveTiltCard>

                    </div>

                    {/* Botão Saiba Mais */}
                    <div className="pt-4">
                      <button 
                        onClick={() => {
                          const contactSection = document.getElementById('contato-secao');
                          if (contactSection) {
                            contactSection.scrollIntoView({ behavior: 'smooth' });
                          }
                        }}
                        className="btn-primary"
                      >
                        Saiba mais
                      </button>
                    </div>

                  </div>

                </div>
              </div>
            </section>

            {/* 5. SEÇÃO DE INSIGHTS - Redesenhado Premium */}
            <section className="py-28 px-6 border-t border-zinc-950 relative overflow-hidden">
              {/* Elementos geométricos / glow no fundo */}
              <div className="absolute top-1/2 right-10 w-96 h-96 bg-red-900/5 rounded-full blur-[150px] pointer-events-none"></div>
              
              <div className="max-w-7xl mx-auto">
                
                {/* Header da Seção */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                  <div className="text-left">
                    <span className="text-red-500 text-xs font-bold uppercase tracking-[0.25em] block mb-3">
                      Design & Tendências
                    </span>
                    <h2 className="text-4xl lg:text-5xl text-white uppercase font-extrabold tracking-tight leading-[1.1]">
                      Insights
                    </h2>
                  </div>
                  
                  {/* Navegação Seta Carrossel */}
                  <div className="flex gap-3">
                    <button className="w-12 h-12 rounded border border-zinc-900 bg-zinc-950/40 text-zinc-400 hover:text-white hover:border-red-800 flex items-center justify-center transition-all duration-300">
                      <ChevronLeft size={20} />
                    </button>
                    <button className="w-12 h-12 rounded border border-zinc-900 bg-zinc-950/40 text-zinc-400 hover:text-white hover:border-red-800 flex items-center justify-center transition-all duration-300">
                      <ChevronRight size={20} />
                    </button>
                  </div>
                </div>

                {/* Grid de Insights (3 Cards de Alto Padrão) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  
                  {/* Insight 1: Automação */}
                  <InteractiveTiltCard className="glass-panel rounded relative group overflow-hidden flex flex-col h-full hover:border-red-900/50 transition-all duration-300">
                    <div className="relative overflow-hidden aspect-[16/10] bg-zinc-950">
                      <img 
                         src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80" 
                        alt="Automação Residencial Alto Padrão" 
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
                      />
                      <span className="absolute top-4 left-4 glass-panel px-3 py-1 text-[8px] uppercase tracking-widest text-red-500 border-red-800/40 rounded font-bold">
                        Tecnologia
                      </span>
                    </div>
                    <div className="p-8 flex flex-col flex-1 text-left">
                      <h3 className="text-lg font-bold text-white uppercase tracking-wider mb-4 leading-snug group-hover:text-red-500 transition-colors">
                        Como integrar a automação residencial no design de alto padrão
                      </h3>
                      <p className="text-xs text-zinc-400 font-light leading-relaxed mb-6 flex-1">
                        A tecnologia deve trabalhar a favor do conforto. Descubra como planejar a infraestrutura de som, iluminação e climatização inteligente de forma invisível e sofisticada.
                      </p>
                      <div className="flex items-center gap-2 text-white text-xs font-semibold uppercase tracking-wider group-hover:text-red-500 transition-colors mt-auto">
                        <span>Leia o artigo</span>
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </InteractiveTiltCard>

                  {/* Insight 2: Sala de TV (Texto Original da Imagem) */}
                  <InteractiveTiltCard className="glass-panel rounded relative group overflow-hidden flex flex-col h-full hover:border-red-900/50 transition-all duration-300">
                    <div className="relative overflow-hidden aspect-[16/10] bg-zinc-950">
                      <img 
                        src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80" 
                        alt="Sala de TV Confortável e Elegante" 
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
                      />
                      <span className="absolute top-4 left-4 glass-panel px-3 py-1 text-[8px] uppercase tracking-widest text-red-500 border-red-800/40 rounded font-bold">
                        Design
                      </span>
                    </div>
                    <div className="p-8 flex flex-col flex-1 text-left">
                      <h3 className="text-lg font-bold text-white uppercase tracking-wider mb-4 leading-snug group-hover:text-red-500 transition-colors">
                        Monte uma sala de TV confortável e elegante para momentos em família
                      </h3>
                      <p className="text-xs text-zinc-400 font-light leading-relaxed mb-6 flex-1">
                        O equilíbrio perfeito entre acústica impecável, marcenaria planejada e disposição estratégica de móveis para criar um ambiente acolhedor sem abrir mão da sofisticação.
                      </p>
                      <div className="flex items-center gap-2 text-white text-xs font-semibold uppercase tracking-wider group-hover:text-red-500 transition-colors mt-auto">
                        <span>Leia o artigo</span>
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </InteractiveTiltCard>

                  {/* Insight 3: Revestimentos Nobres */}
                  <InteractiveTiltCard className="glass-panel rounded relative group overflow-hidden flex flex-col h-full hover:border-red-900/50 transition-all duration-300">
                    <div className="relative overflow-hidden aspect-[16/10] bg-zinc-950">
                      <img 
                        src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80" 
                        alt="Revestimentos Nobres de Luxo" 
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
                      />
                      <span className="absolute top-4 left-4 glass-panel px-3 py-1 text-[8px] uppercase tracking-widest text-red-500 border-red-800/40 rounded font-bold">
                        Materiais
                      </span>
                    </div>
                    <div className="p-8 flex flex-col flex-1 text-left">
                      <h3 className="text-lg font-bold text-white uppercase tracking-wider mb-4 leading-snug group-hover:text-red-500 transition-colors">
                        Tendências de revestimentos nobres para coberturas e duplex
                      </h3>
                      <p className="text-xs text-zinc-400 font-light leading-relaxed mb-6 flex-1">
                        Mármores retroiluminados, painéis ripados de madeira natural e metais escovados estão no topo das escolhas dos melhores designers para criar texturas exclusivas e aconchego.
                      </p>
                      <div className="flex items-center gap-2 text-white text-xs font-semibold uppercase tracking-wider group-hover:text-red-500 transition-colors mt-auto">
                        <span>Leia o artigo</span>
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </InteractiveTiltCard>

                </div>

              </div>
            </section>

          </div>
        )}

        {/* ------------------------------------------------------------------------- */}
        {/* PÁGINA 2: EMPREENDIMENTOS (CATÁLOGO COMPLETO) */}
        {/* ------------------------------------------------------------------------- */}
        {currentPage === 'empreendimentos' && (
          <div className="animate-fade-in-up pb-24">
            {/* The Big Luxury Banner */}
            <div className="relative bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 border-b border-zinc-900/60 py-32 px-6 overflow-hidden">
              {/* Ambient premium lights specifically for this banner */}
              <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-red-900 rounded-full blur-[100px]"></div>
              </div>
              
              <div className="max-w-5xl mx-auto text-left relative z-10 pt-8">
                <h1 className="text-4xl md:text-6xl text-white uppercase font-black leading-[1.1] tracking-wider font-sans">
                  Nossos <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-red-500 to-red-400">
                    Empreendimentos
                  </span>
                </h1>
              </div>
            </div>

            {/* Overlapping Search Card from the Wireframe */}
            <div className="relative -mt-16 md:-mt-20 z-20 max-w-4xl mx-auto w-full px-6">
              <div className="bg-zinc-950/95 border border-zinc-900 p-6 md:p-8 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.9)] backdrop-blur-3xl">
                <h3 className="text-center text-sm md:text-base font-bold text-white tracking-widest uppercase mb-6">
                  Encontre o imóvel ideal para você
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
                  {/* Região (Cidade) Select */}
                  <div className="flex flex-col text-left">
                    <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-2">Região</label>
                    <select 
                      value={filterCidade}
                      onChange={(e) => { setFilterCidade(e.target.value); setVisibleCount(4); }}
                      className="w-full bg-zinc-900 border border-zinc-800 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-red-600 cursor-pointer appearance-none transition-colors"
                      style={{ backgroundImage: 'url("data:image/svg+xml,%3csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 20 20\'%3e%3cpath stroke=\'%23a1a1aa\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'1.5\' d=\'M6 8l4 4 4-4\'/%3e%3c/svg%3e")', backgroundPosition: 'right 16px center', backgroundSize: '1.2em', backgroundRepeat: 'no-repeat' }}
                    >
                      <option value="Todos">Todas as Regiões</option>
                      <option value="Osasco">Osasco</option>
                      <option value="Barueri">Barueri / Alphaville</option>
                    </select>
                  </div>

                  {/* Status Select */}
                  <div className="flex flex-col text-left">
                    <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-2">Status</label>
                    <select 
                      value={filterStatus}
                      onChange={(e) => { setFilterStatus(e.target.value); setVisibleCount(4); }}
                      className="w-full bg-zinc-900 border border-zinc-800 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-red-600 cursor-pointer appearance-none transition-colors"
                      style={{ backgroundImage: 'url("data:image/svg+xml,%3csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 20 20\'%3e%3cpath stroke=\'%23a1a1aa\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'1.5\' d=\'M6 8l4 4 4-4\'/%3e%3c/svg%3e")', backgroundPosition: 'right 16px center', backgroundSize: '1.2em', backgroundRepeat: 'no-repeat' }}
                    >
                      <option value="Todos">Todos os Status</option>
                      <option value="Lançamento">Lançamento</option>
                      <option value="Em Obras">Em Obras</option>
                      <option value="Pronto">Pronto para Morar</option>
                    </select>
                  </div>

                  {/* Buscar Imóvel Button */}
                  <div className="flex flex-col">
                    <button 
                      onClick={() => {
                        document.getElementById('catalog-grid-start')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="w-full btn-primary py-3 rounded-xl font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 h-[46px] cursor-pointer"
                    >
                      <Search size={14} />
                      <span>Buscar imóvel</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Container para o Grid */}
            <div id="catalog-grid-start" className="max-w-7xl mx-auto px-6 mt-16">
              
              {/* Quantidade encontrada (sutil e elegante) */}
              <div className="flex justify-between items-center mb-8 border-b border-zinc-900 pb-4">
                <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">
                  Catálogo Completo
                </span>
                <span className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold">
                  {filteredEmpreendimentos.length} empreendimentos encontrados
                </span>
              </div>

              {/* Grid dos Empreendimentos */}
              {filteredEmpreendimentos.length === 0 ? (
                <div className="text-center py-20 bg-zinc-950/20 border border-dashed border-zinc-900 rounded">
                  <span className="text-zinc-500 text-sm block mb-4">Nenhum empreendimento corresponde aos filtros selecionados.</span>
                  <button 
                    onClick={() => {
                      setFilterCidade('Todos');
                      setFilterStatus('Todos');
                      setVisibleCount(4);
                    }}
                    className="btn-secondary !py-2 !text-[10px]"
                  >
                    Resetar Filtros
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
                  {filteredEmpreendimentos.slice(0, visibleCount).map((emp) => (
                    <InteractiveTiltCard 
                      key={emp.id} 
                      className="glass-panel rounded overflow-hidden grid grid-cols-1 lg:grid-cols-12 border border-zinc-900/60 relative cursor-pointer hover:-translate-y-2 hover:border-[#d81d00]/40 hover:shadow-[0_20px_50px_-10px_rgba(216,29,0,0.15)] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group"
                    >
                      {/* Efeito Brilho e Reflexo de Diamante Premium */}
                      <div className="absolute inset-0 w-full h-full bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-[1500ms] ease-out pointer-events-none z-10" />

                      {/* Lado Esquerdo - Galeria compacta */}
                      <div className="lg:col-span-6 relative aspect-[4/3] lg:aspect-auto bg-zinc-950 overflow-hidden">
                        <img 
                          src={emp.fotos[0]} 
                          alt={emp.nome} 
                          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                        />
                        <span className="absolute top-4 left-4 bg-black/85 text-[10px] font-bold tracking-widest text-red-500 uppercase px-3 py-1 border border-red-900/40 rounded z-20 shadow-md">
                          {emp.statusLabel}
                        </span>
                      </div>

                      {/* Lado Direito - Informações Técnicas */}
                      <div className="lg:col-span-6 p-8 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-1 text-zinc-400 text-xs tracking-wider uppercase mb-1">
                            <MapPin size={12} className="text-red-500 group-hover:-translate-y-0.5 transition-transform duration-300" />
                            <span>{emp.bairro}, {emp.cidade}</span>
                          </div>

                          <h2 className="text-2xl font-bold text-white uppercase group-hover:text-[#d81d00] transition-colors mb-3">
                            {emp.nome}
                          </h2>

                          <p className="text-xs text-zinc-400 font-light mb-6 leading-relaxed">
                            {emp.descricao}
                          </p>
                        </div>

                        <div>
                          <hr className="border-zinc-900 group-hover:border-red-900/30 transition-colors duration-500 my-4" />
                          <div className="grid grid-cols-2 gap-4 text-xs text-zinc-400 mb-6">
                            <div className="flex items-center gap-2">
                              <Maximize2 size={14} className="text-[#d81d00] group-hover:scale-110 transition-transform duration-300" />
                              <span>Área: <strong>{emp.area}</strong></span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Building2 size={14} className="text-[#d81d00] group-hover:scale-110 transition-transform duration-300" />
                              <span>Dorms: <strong>{emp.dormitorios}</strong></span>
                            </div>
                          </div>

                          <div className="flex gap-4">
                            <button 
                              onClick={() => {
                                setSelectedEmpreendimentoId(emp.id);
                                setCurrentPage('detalhe');
                              }}
                              className="flex-1 btn-primary !py-2.5 !text-xs text-center flex items-center justify-center gap-2"
                            >
                              <span>Ver Detalhes</span>
                              <ArrowRight size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </InteractiveTiltCard>
                  ))}
                </div>
              )}

              {filteredEmpreendimentos.length > visibleCount ? (
                <div className="flex justify-center mt-12 mb-8 animate-fade-in-up">
                  <button 
                    onClick={() => setVisibleCount(visibleCount + 4)}
                    className="btn-secondary !px-8 !py-3 font-bold uppercase tracking-wider text-xs flex items-center gap-2 cursor-pointer border border-zinc-850 hover:border-red-650 hover:text-white transition-all duration-300 group/btn"
                  >
                    <span>Ver mais</span>
                    <ChevronDown size={16} className="animate-bounce group-hover/btn:translate-y-0.5 transition-transform" />
                  </button>
                </div>
              ) : null}

            </div>
          </div>
        )}

        {/* ------------------------------------------------------------------------- */}
        {/* PÁGINA 3: PAGINA DO EMPREENDIMENTO */}
        {/* ------------------------------------------------------------------------- */}
        {currentPage === 'detalhe' && (
          <div className="animate-fade-in-up pb-20">
            
            {/* Nav / Voltar Bar */}
            <div className="bg-zinc-950 border-b border-zinc-900/60 py-4 px-6 sticky top-[72px] z-30 backdrop-blur-md bg-opacity-90">
              <div className="max-w-7xl mx-auto flex justify-between items-center">
                <button 
                  onClick={() => setCurrentPage('empreendimentos')}
                  className="text-xs uppercase tracking-widest text-zinc-400 hover:text-white flex items-center gap-2 transition-colors cursor-pointer group"
                >
                  <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                  <span>Voltar para Empreendimentos</span>
                </button>
              </div>
            </div>

            {/* 1. HERO DO EMPREENDIMENTO (DESIGN ULTRA LUXO COM FORMULÁRIO ACOPLADO) */}
            <section className="relative min-h-[85vh] lg:min-h-[90vh] flex items-center py-20 lg:py-28 px-6 overflow-hidden">
              {/* Ambient Background Blur Lights */}
              <div className="absolute inset-0 z-0">
                <img 
                  src={currentEmpreendimento.fotos[activePhotoIndex]} 
                  alt={currentEmpreendimento.nome} 
                  className="w-full h-full object-cover opacity-40 scale-102 transition-all duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/70 to-transparent"></div>
                <div className="absolute inset-0 bg-black/60"></div>
                {/* Decorative Red Accent Glow */}
                <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-red-900/10 rounded-full blur-[130px] pointer-events-none"></div>
              </div>

              <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-6">
                
                {/* Lado Esquerdo: Detalhes do Empreendimento */}
                <div className="lg:col-span-7 text-left flex flex-col justify-center">
                  <div className="flex flex-wrap items-center gap-3 mb-6">
                    <span className="bg-red-950/80 text-red-500 text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full border border-red-900/40 shadow-lg">
                      {currentEmpreendimento.statusLabel}
                    </span>
                    <div className="flex items-center gap-1.5 text-zinc-400 text-xs tracking-wider uppercase bg-zinc-900/85 px-4 py-1.5 rounded-full border border-zinc-800/50 shadow-md">
                      <MapPin size={12} className="text-red-500" />
                      <span>{currentEmpreendimento.bairro}, {currentEmpreendimento.cidade}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-zinc-400 text-xs tracking-wider uppercase bg-zinc-900/85 px-4 py-1.5 rounded-full border border-zinc-800/50 shadow-md">
                      <Calendar size={12} className="text-red-500" />
                      <span>ENTREGA: {currentEmpreendimento.entrega || (currentEmpreendimento.status === 'Pronto' ? 'IMEDIATA' : 'NOV/2029')}</span>
                    </div>
                  </div>
                  
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white uppercase mb-6 leading-[1.05] tracking-tight max-w-4xl">
                    {currentEmpreendimento.nome}
                  </h1>
                  
                  <p className="text-lg md:text-xl text-zinc-355 max-w-2xl font-light mb-10 leading-relaxed font-sans">
                    {currentEmpreendimento.slogan}
                  </p>

                  {/* Info Ribbon Grid - Exatamente 3 Ícones com Efeito Tilt 3D */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl">
                    {[
                      { label: 'Metragem', value: currentEmpreendimento.area, icon: Maximize2 },
                      { label: 'Dormitórios', value: currentEmpreendimento.dormitorios, icon: Building2 },
                      { label: 'Garagem', value: currentEmpreendimento.vagas || '2 a 3 Vagas', icon: Compass }
                    ].map((stat, idx) => (
                      <InteractiveTiltCard key={idx} className="bg-zinc-950/85 border border-zinc-900/85 p-4.5 rounded-xl backdrop-blur-md shadow-xl flex items-center gap-4 hover:border-red-650/20 transition-all duration-300 group cursor-pointer">
                        <div className="p-3 bg-red-950/40 rounded-lg text-red-500 border border-red-900/30 group-hover:bg-[#d81d00] group-hover:text-white transition-colors duration-300 flex-shrink-0">
                          <stat.icon size={16} />
                        </div>
                        <div className="flex flex-col text-left">
                          <span className="text-[9px] uppercase text-zinc-500 font-bold tracking-widest mb-0.5">{stat.label}</span>
                          <span className="text-xs text-white font-bold tracking-wide uppercase">{stat.value}</span>
                        </div>
                      </InteractiveTiltCard>
                    ))}
                  </div>

                  {/* Botão Ver Detalhes Vermelho Premium (btn-primary de Home) */}
                  <div className="mt-8 flex text-left">
                    <button 
                      onClick={() => {
                        setLeadForm(prev => ({ ...prev, mensagem: `Desejo receber o catálogo PDF completo do ${currentEmpreendimento.nome}` }));
                        document.getElementById('lead-form-box')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="btn-primary !py-3 !px-8 !text-xs font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-lg group/btn"
                    >
                      <FileText size={16} className="text-white group-hover/btn:scale-110 transition-transform" />
                      <span>Ver Detalhes</span>
                    </button>
                  </div>
                </div>

                {/* Lado Direito: Formulário da Wireframe */}
                <div className="lg:col-span-5 w-full">
                  <div className="border border-zinc-800/80 hover:border-red-950/20 rounded-3xl bg-zinc-950/90 backdrop-blur-2xl p-8 shadow-[0_25px_60px_rgba(0,0,0,0.95)] relative text-left transition-all duration-500 group/form">
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-6 leading-tight tracking-wide font-sans">
                      Fale com um de nossos especialistas!
                    </h3>

                    {formSubmitted ? (
                      <div className="bg-red-950/30 border border-red-900/40 p-8 rounded-2xl text-center text-sm text-white flex flex-col items-center justify-center gap-4 animate-fade-in-up">
                        <CheckCircle2 size={40} className="text-[#d81d00] animate-bounce" />
                        <div>
                          <h4 className="font-bold text-base uppercase text-white mb-1">Contato Recebido!</h4>
                          <p className="text-xs text-zinc-400 font-light leading-relaxed">
                            Obrigado! Um consultor especializado entrará em contato em até 15 minutos via WhatsApp para lhe apresentar os detalhes exclusivos.
                          </p>
                        </div>
                      </div>
                    ) : (
                      <form onSubmit={handleLeadSubmit} className="flex flex-col gap-4">
                        {/* Nome */}
                        <div>
                          <input 
                            type="text" 
                            required
                            value={leadForm.nome}
                            onChange={(e) => setLeadForm({ ...leadForm, nome: e.target.value })}
                            placeholder="Informe seu nome"
                            className="w-full bg-zinc-900/80 border border-zinc-800/80 text-white placeholder-zinc-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#d81d00] focus:ring-1 focus:ring-[#d81d00] transition-all duration-300"
                          />
                        </div>

                        {/* Email & Phone side-by-side */}
                        <div className="grid grid-cols-12 gap-4">
                          <div className="col-span-7">
                            <input 
                              type="email" 
                              required
                              value={leadForm.email}
                              onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                              placeholder="Informe seu email"
                              className="w-full bg-zinc-900/80 border border-zinc-800/80 text-white placeholder-zinc-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#d81d00] focus:ring-1 focus:ring-[#d81d00] transition-all duration-300"
                            />
                          </div>
                          <div className="col-span-5">
                            <input 
                              type="tel" 
                              required
                              value={leadForm.whatsapp}
                              onChange={(e) => setLeadForm({ ...leadForm, whatsapp: e.target.value })}
                              placeholder="Celular"
                              className="w-full bg-zinc-900/80 border border-zinc-800/80 text-white placeholder-zinc-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#d81d00] focus:ring-1 focus:ring-[#d81d00] transition-all duration-300"
                            />
                          </div>
                        </div>

                        {/* Dropdown: Selecione o Empreendimento */}
                        <div>
                          <select 
                            value={leadForm.interesse}
                            onChange={(e) => setLeadForm({ ...leadForm, interesse: e.target.value })}
                            className="w-full bg-zinc-900/80 border border-zinc-800/80 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#d81d00] focus:ring-1 focus:ring-[#d81d00] cursor-pointer appearance-none transition-all duration-300"
                            style={{ backgroundImage: 'url("data:image/svg+xml,%3csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 20 20\'%3e%3cpath stroke=\'%23a1a1aa\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'1.5\' d=\'M6 8l4 4 4-4\'/%3e%3c/svg%3e")', backgroundPosition: 'right 16px center', backgroundSize: '1.2em', backgroundRepeat: 'no-repeat' }}
                          >
                            <option value="" disabled>Selecione o empreendimento</option>
                            {empreendimentosData.map((emp) => (
                              <option key={emp.id} value={emp.id}>{emp.nome}</option>
                            ))}
                          </select>
                        </div>

                        {/* Mensagem */}
                        <div>
                          <textarea 
                            rows="3"
                            value={leadForm.mensagem}
                            onChange={(e) => setLeadForm({ ...leadForm, mensagem: e.target.value })}
                            placeholder="Mensagem"
                            className="w-full bg-zinc-900/80 border border-zinc-800/80 text-white placeholder-zinc-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#d81d00] focus:ring-1 focus:ring-[#d81d00] transition-all duration-300 resize-none"
                          ></textarea>
                        </div>

                        {/* Checkbox 1 */}
                        <div className="flex items-start gap-2.5 mt-2">
                          <div 
                            onClick={() => setPrivacyAgreed(!privacyAgreed)}
                            className="w-4 h-4 rounded border flex items-center justify-center cursor-pointer transition-all duration-200 mt-0.5 flex-shrink-0"
                            style={{
                              borderColor: privacyAgreed ? '#d81d00' : '#ffffff',
                              backgroundColor: privacyAgreed ? '#d81d00' : 'transparent'
                            }}
                          >
                            {privacyAgreed && <span className="text-[10px] text-white font-black select-none">✓</span>}
                          </div>
                          <input 
                            type="checkbox" 
                            id="privacy-terms"
                            required
                            checked={privacyAgreed}
                            onChange={() => {}}
                            className="sr-only"
                          />
                          <label htmlFor="privacy-terms" className="text-[10px] text-zinc-400 leading-normal cursor-pointer text-left font-light select-none">
                            Declaro que li e aceito os termos da <span className="underline text-red-500 hover:text-red-400 transition-colors cursor-pointer" onClick={(e) => { e.preventDefault(); alert('Políticas de Privacidade Dubai.'); }}>Política de Privacidade</span> da Dubai Incorporação e Construção.
                          </label>
                        </div>

                        {/* Checkbox 2 */}
                        <div className="flex items-start gap-2.5">
                          <div 
                            onClick={() => setCommAgreed(!commAgreed)}
                            className="w-4 h-4 rounded border flex items-center justify-center cursor-pointer transition-all duration-200 mt-0.5 flex-shrink-0"
                            style={{
                              borderColor: commAgreed ? '#d81d00' : '#ffffff',
                              backgroundColor: commAgreed ? '#d81d00' : 'transparent'
                            }}
                          >
                            {commAgreed && <span className="text-[10px] text-white font-black select-none">✓</span>}
                          </div>
                          <input 
                            type="checkbox" 
                            id="comm-agree"
                            checked={commAgreed}
                            onChange={() => {}}
                            className="sr-only"
                          />
                          <label htmlFor="comm-agree" className="text-[10px] text-zinc-400 leading-normal cursor-pointer text-left font-light select-none">
                            Estou de acordo em receber comunicações e ser acessado para possível atendimento.
                          </label>
                        </div>

                        {/* Submit Button right-aligned */}
                        <div className="flex justify-end mt-4">
                          <button 
                            type="submit" 
                            className="bg-white hover:bg-zinc-100 text-zinc-950 font-bold uppercase tracking-wider text-xs px-8 py-3 rounded-xl transition-all duration-300 shadow-lg cursor-pointer transform hover:-translate-y-0.5"
                          >
                            Enviar
                          </button>
                        </div>
                      </form>
                    )}
                  </div>
                </div>

              </div>

              {/* Elegant scroll indicator */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-1.5 animate-pulse opacity-60">
                <span className="text-[9px] uppercase tracking-widest text-zinc-500 font-bold">Descubra o projeto</span>
                <ChevronDown size={14} className="text-red-500" />
              </div>
            </section>

            {/* 2. CONTEÚDO PRINCIPAL E GALERIA EM LARGURA TOTAL */}
            <section className="py-24 px-6 max-w-7xl mx-auto flex flex-col gap-20">
              
              {/* APARTAMENTO DECORADO - DESIGN PREMIUM E ESPETACULAR EM LARGURA TOTAL (LÓGICA WIREFRAME) */}
              <div className="w-full">
                {/* Header: Título à Esquerda & Tags/Abas à Direita */}
                <div className="flex justify-between items-start md:items-end flex-wrap gap-4 border-b border-zinc-900 pb-6">
                  <div className="text-left">
                    <h2 className="text-[10px] uppercase tracking-[0.25em] text-[#d81d00] font-black mb-2">Ambientes Reais Decorados</h2>
                    <h3 className="text-2xl md:text-3xl font-bold text-white uppercase tracking-wider font-sans">
                      Apartamento Decorado
                    </h3>
                  </div>
                  <div className="flex flex-col items-end gap-3">
                    <div className="flex items-center gap-2">
                      <span className="bg-white text-zinc-950 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded shadow-md">
                        DECORADO
                      </span>
                      <button 
                        onClick={() => {
                          const activePlantaName = currentEmpreendimento.plantas[activeDecoradoIndex]?.nome || '';
                          setLeadForm(prev => ({ ...prev, mensagem: `Desejo receber mais informações e agendar um Tour Virtual 360° do decorado de ${activePlantaName} do ${currentEmpreendimento.nome}.` }));
                          document.getElementById('lead-form-box')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="bg-zinc-950 text-white hover:text-white border border-zinc-800 hover:border-red-650 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded transition-all cursor-pointer flex items-center gap-1.5 shadow-lg group/tour animate-pulse"
                      >
                        <Sparkles size={11} className="text-[#d81d00]" />
                        <span>TOUR 360°</span>
                      </button>
                    </div>
                    
                    {/* Size Tabs */}
                    <div className="flex gap-2 p-1 bg-zinc-950 border border-zinc-900 rounded-xl">
                      {currentEmpreendimento.plantas.map((planta, idx) => {
                        const sizeLabel = planta.nome.match(/(\d+m²|\d+\s*m²)/i)?.[1] || planta.nome;
                        return (
                          <button
                            key={idx}
                            onClick={() => {
                              setActiveDecoradoIndex(idx);
                              setActiveDecoradoPhotoIndex(0);
                            }}
                            className={`px-4 py-1.5 rounded-lg text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer ${activeDecoradoIndex === idx ? 'bg-[#d81d00] text-white shadow-lg' : 'text-zinc-500 hover:text-zinc-300'}`}
                          >
                            {sizeLabel}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Main Display Grid - Duas Lindas Fotos Coloridas Lado a Lado (Cozinha & Quarto / Living) */}
                <div className="flex flex-col gap-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InteractiveTiltCard className="relative aspect-[4/3] bg-zinc-950 rounded-2xl overflow-hidden border border-zinc-900 shadow-2xl group/decorado-l cursor-pointer">
                      <img 
                        src={decoradoLeftPhoto} 
                        alt={`${currentEmpreendimento.nome} Decorado`} 
                        className="w-full h-full object-cover transition-all duration-700 ease-out group-hover/decorado-l:scale-103"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none"></div>
                    </InteractiveTiltCard>

                    <InteractiveTiltCard className="relative aspect-[4/3] bg-zinc-950 rounded-2xl overflow-hidden border border-zinc-900 shadow-2xl group/decorado-r cursor-pointer">
                      <img 
                        src={decoradoRightPhoto} 
                        alt={`${currentEmpreendimento.nome} Decorado`} 
                        className="w-full h-full object-cover transition-all duration-700 ease-out group-hover/decorado-r:scale-103"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none"></div>
                    </InteractiveTiltCard>
                  </div>

                  {/* Thumbnails list with navigation arrows */}
                  <div className="relative flex items-center justify-center max-w-full px-12 group/thumb">
                    <button
                      onClick={() => setActiveDecoradoPhotoIndex(prev => prev === 0 ? currentDecoradoPhotos.length - 1 : prev - 1)}
                      className="absolute left-0 p-2.5 bg-zinc-950 hover:bg-[#d81d00] hover:text-white text-zinc-400 rounded-full border border-zinc-900 hover:border-red-650 transition-all duration-300 shadow-xl cursor-pointer"
                    >
                      <ChevronLeft size={16} />
                    </button>

                    <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none max-w-full justify-center">
                      {currentDecoradoPhotos.map((pic, idx) => {
                        const isSelected = activeDecoradoPhotoIndex === idx;
                        return (
                          <button
                            key={idx}
                            onClick={() => setActiveDecoradoPhotoIndex(idx)}
                            className={`w-20 aspect-[4/3] rounded-lg overflow-hidden border-2 flex-shrink-0 transition-all duration-300 ${isSelected ? 'border-[#d81d00] opacity-100 scale-102 shadow-lg' : 'border-zinc-900 opacity-40 hover:opacity-90'}`}
                          >
                            <img src={pic} className="w-full h-full object-cover" />
                          </button>
                        );
                      })}
                    </div>

                    <button
                      onClick={() => setActiveDecoradoPhotoIndex(prev => (prev + 1) % currentDecoradoPhotos.length)}
                      className="absolute right-0 p-2.5 bg-zinc-950 hover:bg-[#d81d00] hover:text-white text-zinc-400 rounded-full border border-zinc-900 hover:border-red-650 transition-all duration-300 shadow-xl cursor-pointer"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Conteúdo do Empreendimento - Layout Centrado e Luxuoso */}
              <div className="max-w-7xl mx-auto w-full flex flex-col gap-16">

                {/* Seção de Plantas - Redesenhada com Fidelidade Absoluta ao Wireframe */}
                <div className="border-b border-zinc-900/60 pb-12 text-left">
                  <div className="flex justify-between items-end mb-8 flex-wrap gap-4">
                    <div>
                      <h3 className="text-3xl font-black text-white uppercase tracking-wider">Plantas</h3>
                    </div>
                    
                    {/* Size Selector Tabs (273m² and 529m²) */}
                    <div className="flex gap-2 p-1 bg-zinc-950 border border-zinc-900 rounded-xl">
                      {['273m²', '529m²'].map((size) => (
                        <button
                          key={size}
                          onClick={() => {
                            setActiveAreaTab(size);
                            setIs3DMode(false); // Reset to 2D view on tab switch
                          }}
                          className={`px-6 py-2.5 rounded-lg text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${activeAreaTab === size ? 'bg-[#d81d00] text-white shadow-lg shadow-red-950/40' : 'text-zinc-500 hover:text-white'}`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Wireframe-inspired Interactive Container */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 rounded-2xl overflow-hidden border border-zinc-900 shadow-2xl bg-zinc-950 min-h-[480px]">
                    
                    {/* Left Column: Dark Info Area */}
                    <div className="lg:col-span-5 p-8 flex flex-col justify-between bg-zinc-950 text-left border-r border-zinc-900">
                      <div>

                        <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-6">
                          Área privativa {activeAreaTab}
                        </h3>
                        
                        {/* Bullets List */}
                        <ul className="flex flex-col gap-3 text-xs text-zinc-300 font-light pl-1">
                          {(activeAreaTab === '273m²' ? [
                            '2 suítes',
                            'Lavabo',
                            'Varanda Gourmet',
                            'Churrasqueira',
                            'Opção de churrasqueira convencional ou grill',
                            'Opção sem churrasqueira',
                            'Opção de ponto para ilha gourmet',
                            'Janela da sala com peitoril de vidro',
                            'Porcelanato retificado',
                            'Porcelanato na parede do box e na área de serviço',
                            'Forro de gesso em todo o apartamento'
                          ] : [
                            '4 ou 5 suítes (sendo 1 suíte master com hidro)',
                            'Living com pé-direito duplo e pele de vidro',
                            'Terraço gourmet com piscina privativa integrada',
                            'Lavabo social de luxo e W.C. de serviço',
                            'Copa e cozinha gourmet com despensa',
                            'Elevador privativo com biometria e hall exclusivo',
                            'Automação residencial completa via app/voz',
                            'Aspiração central e aquecimento de piso nos banhos',
                            'Acabamentos premium em mármores importados',
                            'Janelas termoacústicas automáticas com controle',
                            'Dependência completa para colaboradores'
                          ]).map((spec, idx) => (
                            <li key={idx} className="flex items-start gap-2.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#d81d00] mt-1.5 flex-shrink-0" />
                              <span className="leading-relaxed">{spec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Bottom Type selectors (Tipo 1 to Tipo 6) */}
                      <div className="mt-8">
                        <div className="flex flex-wrap gap-1.5 bg-zinc-900/50 p-1 rounded-xl border border-zinc-900">
                          {['Tipo 1', 'Tipo 2', 'Tipo 3', 'Tipo 4', 'Tipo 5', 'Tipo 6'].map((tipo) => (
                            <button
                              key={tipo}
                              onClick={() => setActiveTipoTab(tipo)}
                              className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer ${activeTipoTab === tipo ? 'bg-[#d81d00] text-white shadow-md' : 'text-zinc-500 hover:text-zinc-300'}`}
                            >
                              {tipo}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right Column: Floor Plan Canvas (Beautiful White background contrast) */}
                    <div className="lg:col-span-7 bg-white p-8 flex flex-col justify-between items-center relative min-h-[350px]">
                      
                      {/* Top Decorative Elements */}
                      <div className="flex justify-between items-start pointer-events-none z-10 absolute top-6 left-8 right-8">
                        <span className="text-[9px] font-bold tracking-widest text-zinc-400 uppercase">
                          {currentEmpreendimento.nome} / Planta {activeAreaTab} - {activeTipoTab}
                        </span>
                      </div>

                      {/* The Floor Plan Image Panel with Premium 3D Tilt Effect on Hover */}
                      <InteractiveTiltCard className="w-full h-full flex items-center justify-center py-8 relative group/canvas bg-white border-0 shadow-none cursor-pointer">
                        <img
                          src={`${import.meta.env.BASE_URL}22.png`}
                          alt={`Planta ${activeAreaTab}`}
                          className="max-h-[320px] w-auto object-contain transition-all duration-500 ease-out group-hover/canvas:scale-102"
                        />
                        
                        {/* Floating Zoom Button Overlay matching the wireframe */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation(); // Avoid triggering card click
                            setLeadForm(prev => ({ ...prev, mensagem: `Desejo receber a planta técnica do ${currentEmpreendimento.nome} (${activeAreaTab} - ${activeTipoTab}) em alta resolução com ampliação.` }));
                            document.getElementById('lead-form-box')?.scrollIntoView({ behavior: 'smooth' });
                          }}
                          className="absolute left-6 top-1/2 -translate-y-1/2 flex items-center justify-center p-3 rounded-full bg-white border border-zinc-200 text-zinc-800 hover:text-[#d81d00] hover:border-[#d81d00]/30 shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer z-10"
                        >
                          <Maximize2 size={16} />
                        </button>
                      </InteractiveTiltCard>

                      {/* Download CTA at the bottom right */}
                      <div className="w-full flex justify-end items-center border-t border-zinc-100 pt-4">
                        <button
                          onClick={() => {
                            setLeadForm(prev => ({ ...prev, mensagem: `Desejo fazer o download do PDF completo das plantas do ${currentEmpreendimento.nome} (${activeAreaTab} - ${activeTipoTab}).` }));
                            document.getElementById('lead-form-box')?.scrollIntoView({ behavior: 'smooth' });
                          }}
                          className="flex items-center gap-2 text-zinc-800 hover:text-[#d81d00] font-black uppercase text-[11px] tracking-widest transition-colors cursor-pointer group/down"
                        >
                          <Download size={14} className="group-hover/down:translate-y-0.5 transition-transform" />
                          <span>Download</span>
                        </button>
                      </div>

                    </div>

                  </div>
                </div>


                {/* Térreo e Lazer - Bento Grid de Fotos Coloridas com Efeito Tilt 3D */}
                <div className="border-b border-zinc-900/60 pb-12 text-left">
                  <h2 className="text-[10px] uppercase tracking-[0.25em] text-[#d81d00] font-black mb-4">Exclusividade Garantida</h2>
                  <h3 className="text-2xl font-bold text-white uppercase mb-8">Térreo e Lazer</h3>

                  {/* Bento Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[160px] md:auto-rows-[180px]">
                    
                    {/* Item 1: Piscina Aquecida (col-span-1, row-span-1) */}
                    <InteractiveTiltCard className="md:col-span-1 rounded-2xl overflow-hidden border border-zinc-900/80 hover:border-red-900/30 transition-all duration-300 group/bento cursor-pointer relative shadow-xl">
                      <img 
                        src="https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=800&q=80" 
                        alt="Piscina Aquecida" 
                        className="w-full h-full object-cover group-hover/bento:scale-103 transition-transform duration-500" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent flex flex-col justify-end p-4">
                        <span className="text-[9px] font-black text-[#d81d00] tracking-widest uppercase mb-1">Lazer Resort</span>
                        <h4 className="text-xs font-bold text-white uppercase leading-snug">Piscina Aquecida</h4>
                      </div>
                    </InteractiveTiltCard>

                    {/* Item 2: Lobby de Entrada (col-span-1, row-span-1) */}
                    <InteractiveTiltCard className="md:col-span-1 rounded-2xl overflow-hidden border border-zinc-900/80 hover:border-red-900/30 transition-all duration-300 group/bento cursor-pointer relative shadow-xl">
                      <img 
                        src="https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80" 
                        alt="Lobby Social" 
                        className="w-full h-full object-cover group-hover/bento:scale-103 transition-transform duration-500" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent flex flex-col justify-end p-4">
                        <span className="text-[9px] font-black text-[#d81d00] tracking-widest uppercase mb-1">Boas-Vindas</span>
                        <h4 className="text-xs font-bold text-white uppercase leading-snug">Lobby de Entrada</h4>
                      </div>
                    </InteractiveTiltCard>

                    {/* Item 3: Salão de Festas & Espaço Gourmet (col-span-2, row-span-1) */}
                    <InteractiveTiltCard className="md:col-span-2 rounded-2xl overflow-hidden border border-zinc-900/80 hover:border-red-900/30 transition-all duration-300 group/bento cursor-pointer relative shadow-xl">
                      <img 
                        src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80" 
                        alt="Espaço Gourmet" 
                        className="w-full h-full object-cover group-hover/bento:scale-103 transition-transform duration-500" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent flex flex-col justify-end p-4">
                        <span className="text-[9px] font-black text-[#d81d00] tracking-widest uppercase mb-1">Celebração</span>
                        <h4 className="text-xs font-bold text-white uppercase leading-snug">Espaço Gourmet & Festas</h4>
                      </div>
                    </InteractiveTiltCard>

                    {/* Item 4: Wellness Spa (col-span-2, row-span-1) */}
                    <InteractiveTiltCard className="md:col-span-2 rounded-2xl overflow-hidden border border-zinc-900/80 hover:border-red-900/30 transition-all duration-300 group/bento cursor-pointer relative shadow-xl">
                      <img 
                        src="https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=800&q=80" 
                        alt="Spa Wellness" 
                        className="w-full h-full object-cover group-hover/bento:scale-103 transition-transform duration-500" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent flex flex-col justify-end p-4">
                        <span className="text-[9px] font-black text-[#d81d00] tracking-widest uppercase mb-1">Bem-Estar</span>
                        <h4 className="text-xs font-bold text-white uppercase leading-snug">Spa & Sala de Massagem</h4>
                      </div>
                    </InteractiveTiltCard>

                    {/* Item 5: Fitness Center (col-span-1, row-span-1) */}
                    <InteractiveTiltCard className="md:col-span-1 rounded-2xl overflow-hidden border border-zinc-900/80 hover:border-red-900/30 transition-all duration-300 group/bento cursor-pointer relative shadow-xl">
                      <img 
                        src="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=800&q=80" 
                        alt="Fitness Center" 
                        className="w-full h-full object-cover group-hover/bento:scale-103 transition-transform duration-500" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent flex flex-col justify-end p-4">
                        <span className="text-[9px] font-black text-[#d81d00] tracking-widest uppercase mb-1">Saúde</span>
                        <h4 className="text-xs font-bold text-white uppercase leading-snug">Academia Profissional</h4>
                      </div>
                    </InteractiveTiltCard>

                    {/* Item 6: Brinquedoteca (+15 fotos overlay) (col-span-1, row-span-1) */}
                    <InteractiveTiltCard 
                      onClick={() => {
                        setLeadForm(prev => ({ ...prev, mensagem: `Desejo receber o catálogo completo com todas as fotos do Lazer e Térreo do ${currentEmpreendimento.nome}.` }));
                        document.getElementById('lead-form-box')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="md:col-span-1 rounded-2xl overflow-hidden border border-zinc-900/80 hover:border-red-900/30 transition-all duration-300 group/bento cursor-pointer relative shadow-xl"
                    >
                      <img 
                        src="https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&w=800&q=80" 
                        alt="Brinquedoteca" 
                        className="w-full h-full object-cover group-hover/bento:scale-103 transition-transform duration-500 filter brightness-50" 
                      />
                      <div className="absolute inset-0 bg-black/40 group-hover/bento:bg-black/50 transition-colors duration-300 flex flex-col justify-center items-center">
                        <span className="text-2xl font-black text-white tracking-wider font-sans group-hover/bento:scale-110 transition-transform duration-300">+15</span>
                        <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mt-1">Ver Fotos</span>
                      </div>
                    </InteractiveTiltCard>

                  </div>
                </div>

                {/* Seção de Vídeo Conceito - Redesenhado Ultra Premium */}
                <div className="w-full text-center mt-12">
                  <div className="relative rounded-2xl overflow-hidden border border-zinc-900 bg-zinc-950 shadow-2xl aspect-video md:aspect-[21/9] max-w-7xl mx-auto group/video cursor-pointer">
                    <video
                      ref={(el) => {
                        if (el) {
                          if (isVideoPlaying) {
                            el.play().catch(() => {});
                          } else {
                            el.pause();
                          }
                        }
                      }}
                      src={`${import.meta.env.BASE_URL}333.mp4`}
                      playsInline
                      loop
                      controls={isVideoPlaying}
                      className="w-full h-full object-cover"
                      onClick={() => setIsVideoPlaying(!isVideoPlaying)}
                    />
                    
                    {/* Semi-transparent Dark Overlay when not playing */}
                    {!isVideoPlaying && (
                      <div 
                        onClick={() => setIsVideoPlaying(true)}
                        className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/80 flex flex-col justify-between p-8 md:p-12 text-center items-center z-10 transition-all duration-500 ease-out group-hover/video:bg-black/60"
                      >
                        {/* Top decorative element */}
                        <div className="pointer-events-none">
                          <span className="text-[10px] tracking-[0.25em] text-[#d81d00] font-black uppercase bg-red-950/40 border border-red-900/30 px-4 py-1.5 rounded-full shadow-lg">
                            {currentEmpreendimento.statusLabel || 'LANÇAMENTO'}
                          </span>
                        </div>

                        {/* Middle: Large Glowing Play Button */}
                        <div className="flex flex-col items-center justify-center gap-4 my-auto select-none pointer-events-none">
                          <div className="w-16 h-16 md:w-20 md:h-20 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 rounded-full flex items-center justify-center text-white shadow-2xl transform group-hover/video:scale-105 transition-all duration-500 relative">
                            {/* Pulse background effects */}
                            <span className="absolute inset-0 rounded-full bg-white/5 animate-ping opacity-75"></span>
                            <Play size={24} className="fill-white translate-x-0.5 text-white" />
                          </div>
                        </div>

                        {/* Bottom: Luxury Wireframe Titles */}
                        <div className="flex flex-col items-center gap-2 pointer-events-none select-none">
                          <h3 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight leading-none">
                            {currentEmpreendimento.nome}
                          </h3>
                          <span className="text-xs md:text-sm text-zinc-400 font-bold uppercase tracking-widest">
                            {currentEmpreendimento.bairro} . SP
                          </span>
                          <div className="flex items-center gap-3 mt-1 text-[10px] md:text-xs text-zinc-500 uppercase tracking-widest font-light">
                            <span>{currentEmpreendimento.dormitorios}</span>
                            <span className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
                            <span>{currentEmpreendimento.area}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* 4. SEÇÃO DE STATUS DA OBRA - Redesenhado Ultra Premium */}
                <div className="w-full mt-24 text-left">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-7xl mx-auto">
                    
                    {/* Left Column: Construction Stats */}
                    <InteractiveTiltCard className="lg:col-span-5 flex flex-col justify-between glass-panel p-8 md:p-10 rounded-3xl border border-zinc-900 shadow-2xl relative overflow-hidden group/status min-h-[480px]">
                      {/* Ambient background red glow */}
                      <div className="absolute top-0 right-0 w-40 h-40 bg-red-955/15 rounded-full blur-[80px] pointer-events-none"></div>
                      
                      <div>
                        {/* Section Header */}
                        <div className="mb-8">
                          <span className="text-[10px] uppercase tracking-[0.25em] text-[#d81d00] font-black block mb-2">Acompanhamento</span>
                          <h3 className="text-3xl font-black text-white uppercase tracking-wider font-sans">Status da Obra</h3>
                        </div>

                        {/* Top Info Ribbon */}
                        <div className="grid grid-cols-2 gap-4 bg-zinc-950 p-4 rounded-2xl border border-zinc-900 mb-8 select-none">
                          <div className="flex items-center gap-3 text-left">
                            <div className="w-9 h-9 bg-red-955/20 border border-red-900/30 rounded-xl flex items-center justify-center text-red-500 flex-shrink-0">
                              <Calendar size={14} />
                            </div>
                            <div className="flex flex-col">
                              <span className="text-[8px] uppercase text-zinc-500 font-bold tracking-widest">Previsão</span>
                              <span className="text-xs text-white font-black uppercase">25/07/2029</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 text-left">
                            <div className="w-9 h-9 bg-red-955/20 border border-red-900/30 rounded-xl flex items-center justify-center text-red-500 flex-shrink-0">
                              <Building2 size={14} />
                            </div>
                            <div className="flex flex-col">
                              <span className="text-[8px] uppercase text-zinc-500 font-bold tracking-widest">Torre</span>
                              <span className="text-xs text-white font-black uppercase">Única</span>
                            </div>
                          </div>
                        </div>

                        {/* Progress Indicators Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
                          {[
                            { name: 'Terraplanagem', percentage: 54 },
                            { name: 'Estrutura', percentage: 54 },
                            { name: 'Hidrossanitário', percentage: 54 },
                            { name: 'Elétrica', percentage: 5 },
                            { name: 'Água e esgoto', percentage: 0 },
                            { name: 'Acabamento', percentage: 0 }
                          ].map((item, idx) => (
                            <div key={idx} className="flex flex-col gap-2">
                              <div className="flex justify-between items-baseline select-none">
                                <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">{item.name}</span>
                                <span className="text-[11px] font-black text-white font-mono">{item.percentage}%</span>
                              </div>
                              {/* Glowing progress track */}
                              <div className="w-full h-2.5 bg-zinc-950 border border-zinc-900 rounded-full overflow-hidden relative">
                                <div 
                                  className="h-full bg-gradient-to-r from-[#d81d00] to-red-650 rounded-full transition-all duration-[1500ms] ease-out shadow-[0_0_8px_rgba(216,29,0,0.5)]" 
                                  style={{ width: `${item.percentage}%` }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Request catalog CTA button */}
                      <div className="mt-8 pt-6 border-t border-zinc-900/60">
                        <button
                          onClick={() => {
                            setLeadForm(prev => ({ ...prev, mensagem: `Desejo receber o relatório técnico detalhado e atualizado com o cronograma completo da obra do ${currentEmpreendimento.nome}.` }));
                            document.getElementById('lead-form-box')?.scrollIntoView({ behavior: 'smooth' });
                          }}
                          className="w-full flex justify-between items-center bg-zinc-950/80 hover:bg-zinc-900 border border-zinc-900 hover:border-red-955/30 p-4 rounded-xl text-left cursor-pointer transition-all duration-300 group/status-btn"
                        >
                          <div className="flex flex-col text-left">
                            <span className="text-[9px] uppercase text-zinc-500 font-bold tracking-widest mb-0.5">Memorial Descritivo</span>
                            <span className="text-[10px] text-white font-black uppercase tracking-wider">Solicitar Relatório Técnico</span>
                          </div>
                          <ArrowRight size={16} className="text-[#d81d00] group-hover/status-btn:translate-x-1 transition-transform" />
                        </button>
                      </div>

                    </InteractiveTiltCard>

                    {/* Right Column: Premium Site Gallery Carousel */}
                    <div className="lg:col-span-7 rounded-3xl overflow-hidden border border-zinc-900 relative shadow-2xl flex flex-col group/gallery min-h-[480px]">
                      {/* Dynamic Carousel Slide */}
                      <div className="relative w-full h-full min-h-[480px] bg-zinc-950">
                        {/* Slide image with diamond glass flare effect */}
                        <img 
                          src={[
                            "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1200&q=80",
                            "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80",
                            "https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?auto=format&fit=crop&w=1200&q=80"
                          ][activeProgressPhotoIndex]} 
                          alt="Estágio da Obra Construtora Dubai" 
                          className="w-full h-full object-cover opacity-80 group-hover/gallery:scale-108 transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] absolute inset-0"
                        />
                        
                        {/* Absolute gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none"></div>

                        {/* Top corner slide counter */}
                        <div className="absolute top-6 left-6 z-10 select-none">
                          <span className="bg-zinc-950/80 backdrop-blur-md text-[9px] font-black tracking-widest text-[#d81d00] px-4 py-1.5 rounded-full border border-zinc-900 shadow-xl uppercase">
                            Slide {activeProgressPhotoIndex + 1} de 3
                          </span>
                        </div>

                        {/* Left & Right navigation triggers matching wireframe */}
                        <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between items-center z-10">
                          <button
                            onClick={() => setActiveProgressPhotoIndex(prev => prev === 0 ? 2 : prev - 1)}
                            className="p-3 bg-zinc-950/80 hover:bg-[#d81d00] hover:text-white text-zinc-400 rounded-full border border-zinc-900 hover:border-red-650 transition-all duration-300 shadow-xl cursor-pointer"
                          >
                            <ChevronLeft size={18} />
                          </button>
                          <button
                            onClick={() => setActiveProgressPhotoIndex(prev => (prev + 1) % 3)}
                            className="p-3 bg-zinc-950/80 hover:bg-[#d81d00] hover:text-white text-zinc-400 rounded-full border border-zinc-900 hover:border-red-650 transition-all duration-300 shadow-xl cursor-pointer"
                          >
                            <ChevronRight size={18} />
                          </button>
                        </div>

                        {/* Bottom slide caption description */}
                        <div className="absolute bottom-6 left-6 right-6 z-10 text-left pointer-events-none select-none">
                          <span className="text-[8px] uppercase tracking-widest text-[#d81d00] font-black mb-1 block">Fotos Reais do Canteiro</span>
                          <h4 className="text-sm font-bold text-white uppercase tracking-wider leading-snug">
                            {[
                              'Estrutura em andamento e concretagem das primeiras lajes corporativas.',
                              'Equipe Dubai realizando engenharia de infraestrutura e alvenaria.',
                              'Detalhes estruturais dos pilares técnicos de concreto armado.'
                            ][activeProgressPhotoIndex]}
                          </h4>
                        </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 5. SEÇÃO DE LOCALIZAÇÃO - Redesenhado Ultra Premium */}
                <div className="w-full mt-24 text-left border-t border-zinc-900/60 pt-16">
                  <div className="max-w-7xl mx-auto">
                    
                    {/* Header */}
                    <div className="mb-12">
                      <span className="text-[10px] uppercase tracking-[0.25em] text-[#d81d00] font-black block mb-2">Conveniência</span>
                      <h3 className="text-3xl font-black text-white uppercase tracking-wider font-sans mb-4">Localização</h3>
                      <p className="text-zinc-400 font-light text-xs md:text-sm leading-relaxed max-w-4xl text-left">
                        Próximo a diversos pontos importantes da cidade, e de facilidades para o dia a dia. Mercados, farmácias, shopping e hospital, a localização privilegiada contribui para uma rotina mais tranquila e leve.
                      </p>
                    </div>

                    {/* Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                      
                      {/* Left: Showroom Card */}
                      <InteractiveTiltCard className="lg:col-span-4 flex flex-col justify-between glass-panel p-8 rounded-3xl border border-zinc-900 shadow-2xl relative overflow-hidden group/showroom min-h-[480px]">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-red-955/10 rounded-full blur-[80px] pointer-events-none"></div>
                        
                        <div>
                          <span className="text-[9px] uppercase tracking-widest text-[#d81d00] font-black mb-1 block">Visite-nos</span>
                          <h4 className="text-xl font-bold text-white uppercase tracking-wider mb-6">Visite o showroom!</h4>
                          
                          <div className="flex flex-col gap-4 text-xs text-zinc-400 font-light mb-6">
                            <div className="flex items-start gap-3">
                              <MapPin size={16} className="text-[#d81d00] mt-0.5 flex-shrink-0" />
                              <div className="flex flex-col text-left">
                                <span className="font-bold text-white uppercase text-[10px] tracking-wider mb-0.5">Showroom Barueri</span>
                                <span className="leading-relaxed">R. Gen. de Divisão Pedro Rodrigues da Silva, 651 - Barueri, SP</span>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-3">
                              <Phone size={16} className="text-[#d81d00] flex-shrink-0" />
                              <div className="flex flex-col text-left">
                                <span className="font-bold text-white uppercase text-[10px] tracking-wider mb-0.5">Telefone</span>
                                <a href="tel:1120783960" className="hover:text-white transition-colors underline font-semibold">(11) 2078-3960</a>
                              </div>
                            </div>
                            
                            <div className="flex items-start gap-3">
                              <Clock size={16} className="text-[#d81d00] mt-0.5 flex-shrink-0" />
                              <div className="flex flex-col text-left">
                                <span className="font-bold text-white uppercase text-[10px] tracking-wider mb-0.5">Horário de Atendimento</span>
                                <span>Seg a Sáb, 9h às 20h</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Beautiful Showroom image */}
                        <div className="w-full aspect-[16/10] rounded-2xl overflow-hidden border border-zinc-900 bg-zinc-950 mt-auto relative shadow-lg">
                          <img 
                            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80"
                            alt="Showroom Construtora Dubai"
                            className="w-full h-full object-cover opacity-80 group-hover/showroom:scale-105 transition-all duration-700 ease-out"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none"></div>
                        </div>

                      </InteractiveTiltCard>

                      {/* Right: Map Card */}
                      <InteractiveTiltCard className="lg:col-span-8 flex flex-col glass-panel p-8 rounded-3xl border border-zinc-900 shadow-2xl relative overflow-hidden group/map min-h-[480px]">
                        <div className="flex justify-between items-baseline mb-6">
                          <h4 className="text-xl font-bold text-white uppercase tracking-wider text-left">Local do empreendimento</h4>
                        </div>

                        {/* Interactive Google Map Panel */}
                        <div className="w-full h-full min-h-[320px] rounded-2xl overflow-hidden border border-zinc-900 bg-zinc-950 relative shadow-inner flex-1">
                          
                          {/* Map iframe */}
                          <iframe 
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3658.0702956272583!2d-46.83151838502283!3d-23.530026884697387!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94cf017ad2eb0d79%3A0xe2a8b321eb1d713c!2sAv.%20Marcos%20Penteado%20de%20Ulh%C3%B4a%20Rodrigues%2C%201119%20-%20Tambor%C3%A9%2C%20Barueri%20-%20SP%2C%2006460-040!5e0!3m2!1spt-BR!2sbr!4v1622329388319!5m2!1spt-BR!2sbr" 
                            width="100%" 
                            height="100%" 
                            style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(95%) contrast(90%)' }} 
                            allowFullScreen="" 
                            loading="lazy"
                            title="Mapa de Localização"
                            className="absolute inset-0 w-full h-full object-cover"
                          ></iframe>

                          {/* Floating Google Maps Overlay Tooltip matching the wireframe */}
                          <div className="absolute top-4 left-4 bg-zinc-950/90 border border-zinc-900 rounded-xl p-4 shadow-[0_20px_40px_rgba(0,0,0,0.85)] max-w-xs md:max-w-sm text-left backdrop-blur-md z-10 transition-transform duration-300 group-hover/map:translate-y-1">
                            <div className="flex justify-between items-start gap-4">
                              <div>
                                <h5 className="text-xs font-black text-white uppercase tracking-wider mb-1">Office Shopping Tamboré</h5>
                                <p className="text-[9px] text-zinc-400 font-light leading-relaxed mb-2">Av. Marcos Penteado de Ulhoa Rodrigues, 1119 - Tamboré, Barueri - SP, 06460-040, Brazil</p>
                                
                                <div className="flex items-center gap-1.5 select-none">
                                  <span className="text-[10px] font-black text-white">4.7</span>
                                  <div className="flex text-[#d81d00]">
                                    {['★','★','★','★','★'].map((star, i) => (
                                      <span key={i} className="text-[9px]">{star}</span>
                                    ))}
                                  </div>
                                  <a href="https://www.google.com/maps/place/Av.+Marcos+Penteado+de+Ulh%C3%B4a+Rodrigues,+1119+-+Tambor%C3%A9,+Barueri+-+SP,+06460-040" target="_blank" rel="noopener noreferrer" className="text-[9px] text-zinc-500 hover:text-white transition-colors underline font-medium">(79)</a>
                                </div>
                              </div>

                              <a 
                                href="https://www.google.com/maps/dir//Av.+Marcos+Penteado+de+Ulh%C3%B4a+Rodrigues,+1119+-+Tambor%C3%A9,+Barueri+-+SP,+06460-040" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="w-9 h-9 bg-red-955/20 border border-red-900/30 text-red-500 hover:bg-[#d81d00] hover:text-white rounded-lg flex items-center justify-center transition-all duration-300 shadow-md cursor-pointer flex-shrink-0"
                              >
                                <ArrowUpRight size={16} />
                              </a>
                            </div>
                          </div>

                        </div>
                      </InteractiveTiltCard>

                  </div>
                </div>
              </div>

              {/* 6. BANNER CALL TO ACTION - Redesenhado Ultra Premium */}
                <div className="w-full mt-24 text-left">
                  <div className="relative rounded-3xl overflow-hidden border border-zinc-900 bg-zinc-950 shadow-2xl min-h-[280px] flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto group/cta">
                    
                    {/* Left Side: Content */}
                    <div className="p-8 md:p-12 md:w-1/2 flex flex-col items-start justify-center relative z-10">
                      <span className="text-[9px] uppercase tracking-widest text-[#d81d00] font-black mb-2 block">Atendimento Exclusivo</span>
                      <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-white uppercase tracking-tight mb-3 font-sans leading-tight">
                        Quer saber mais detalhes?
                      </h3>
                      <p className="text-xs md:text-sm text-zinc-400 font-light leading-relaxed mb-6 max-w-md">
                        Entre em contato e fale com um de nossos especialistas
                      </p>
                      
                      <button
                        onClick={() => {
                          setCurrentPage('contato');
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="btn-primary !py-3 !px-8 !text-xs font-bold uppercase tracking-wider shadow-lg group-hover/cta:scale-102 transition-transform cursor-pointer"
                      >
                        Entrar em contato
                      </button>
                    </div>

                    {/* Right Side: Image with dark fade overlay */}
                    <div className="w-full md:w-1/2 h-64 md:h-full min-h-[280px] relative overflow-hidden flex-shrink-0">
                      <img 
                        src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1200&q=80" 
                        alt="Especialistas Construtora Dubai" 
                        className="w-full h-full object-cover opacity-80 group-hover/cta:scale-103 transition-transform duration-[1200ms] ease-out absolute inset-0"
                      />
                      {/* Smooth dark overlay blending the photo into the left column's black background */}
                      <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/40 to-transparent pointer-events-none hidden md:block"></div>
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent pointer-events-none md:hidden"></div>
                    </div>

                  </div>
                </div>
              </div>
            </section>

          </div>
        )}

        {/* ------------------------------------------------------------------------- */}
        {/* PÁGINA 4: ENTRE EM CONTATO */}
        {/* ------------------------------------------------------------------------- */}
        {currentPage === 'contato' && (
          <div className="animate-fade-in-up py-16 px-6 max-w-7xl mx-auto">
            
            <div className="text-center mb-12">
              <span className="text-[#d81d00] text-xs font-bold uppercase tracking-[0.25em] flex items-center justify-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#d81d00] animate-pulse"></span>
                Canais de Atendimento
              </span>
              <h1 className="text-4xl md:text-5xl text-white uppercase font-extrabold tracking-tight">
                Entre em Contato
              </h1>
              <p className="text-sm text-zinc-400 font-light mt-4 max-w-2xl mx-auto leading-relaxed">
                Queremos ouvir você. Escolha um dos perfis abaixo para obter um atendimento especializado e direcionado para a sua necessidade.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-6xl mx-auto">
              
              {/* Lado Esquerdo - Botões Verticais (Segmentação de Contato do Wireframe) */}
              <div className="lg:col-span-4 flex flex-col gap-3.5 pr-0 lg:pr-4">
                {[
                  { id: 'cliente', label: 'Sou cliente' },
                  { id: 'vizinho', label: 'Sou vizinho' },
                  { id: 'fornecedor', label: 'Sou fornecedor' },
                  { id: 'corretor', label: 'Sou corretor' },
                  { id: 'trabalhar', label: 'Quero trabalhar na Dubai' },
                  { id: 'denuncia', label: 'Central de denúncia' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setContactSegment(item.id);
                      setFormSubmitted(false);
                    }}
                    className={`w-full text-left px-6 py-4 rounded-xl text-xs uppercase tracking-widest font-bold transition-all duration-300 relative select-none flex items-center justify-between border ${
                      contactSegment === item.id
                        ? 'bg-zinc-900 border-[#d81d00] text-white shadow-[0_0_15px_rgba(216,29,0,0.15)]'
                        : 'bg-zinc-950/40 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-white hover:bg-zinc-900/30'
                    }`}
                  >
                    <span>{item.label}</span>
                    {contactSegment === item.id && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#d81d00]"></span>
                    )}
                  </button>
                ))}
              </div>

              {/* Lado Direito - O Container do Formulário Ativo com Moldura Clássica do Wireframe */}
              <div className="lg:col-span-8 bg-zinc-950/50 backdrop-blur-md border border-zinc-800 p-8 md:p-10 rounded-2xl relative shadow-[0_0_50px_rgba(0,0,0,0.7)] hover:border-zinc-700/80 transition-all duration-500 min-h-[500px] flex flex-col justify-center">
                <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-[#d81d00]/70 to-transparent"></div>
                
                {formSubmitted ? (
                  <div className="bg-red-950/20 border border-red-900/30 p-10 rounded-2xl text-center text-sm text-white flex flex-col items-center justify-center gap-5 animate-fade-in-up">
                    <div className="w-16 h-16 rounded-full bg-[#d81d00]/10 border border-[#d81d00]/30 flex items-center justify-center">
                      <CheckCircle2 size={36} className="text-[#d81d00] animate-bounce" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-lg uppercase text-white mb-2">Solicitação Recebida!</h4>
                      <p className="text-xs text-zinc-400 font-light leading-relaxed max-w-sm mx-auto">
                        Agradecemos o envio. Nosso departamento especializado para <strong>{
                          contactSegment === 'cliente' ? 'Clientes' :
                          contactSegment === 'vizinho' ? 'Vizinhos da Obra' :
                          contactSegment === 'fornecedor' ? 'Fornecedores' :
                          contactSegment === 'corretor' ? 'Parcerias de Corretores' :
                          contactSegment === 'trabalhar' ? 'Recursos Humanos' : 'Ouvidoria & Denúncias'
                        }</strong> já recebeu seus dados e dará retorno com prioridade máxima.
                      </p>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleLeadSubmit} className="flex flex-col gap-4">
                    
                    {/* Título da Seção do Formulário Dinâmico */}
                    <div className="mb-2">
                      <span className="text-[10px] uppercase tracking-widest text-[#d81d00] font-bold">
                        {contactSegment === 'cliente' && 'Portal do Cliente & Vendas'}
                        {contactSegment === 'vizinho' && 'Canal de Relacionamento da Vizinhança'}
                        {contactSegment === 'fornecedor' && 'Área de Negócios & Suprimentos'}
                        {contactSegment === 'corretor' && 'Credenciamento & Parceria Imobiliária'}
                        {contactSegment === 'trabalhar' && 'Trabalhe Conosco / Talentos'}
                        {contactSegment === 'denuncia' && 'Ouvidoria Geral Confidencial'}
                      </span>
                      <h3 className="text-xl font-extrabold uppercase tracking-wider text-white mt-1">
                        {contactSegment === 'cliente' && 'Solicitar Atendimento'}
                        {contactSegment === 'vizinho' && 'Registrar Ocorrência / Dúvida'}
                        {contactSegment === 'fornecedor' && 'Seja um Fornecedor Dubai'}
                        {contactSegment === 'corretor' && 'Cadastrar Nova Parceria'}
                        {contactSegment === 'trabalhar' && 'Enviar Perfil Técnico'}
                        {contactSegment === 'denuncia' && 'Registrar Denúncia Segura'}
                      </h3>
                    </div>

                    {/* CANAL CONFIDENCIAL DISCLAIMER & RADIO BUTTONS */}
                    {contactSegment === 'denuncia' && (
                      <div className="flex flex-col gap-3 text-xs text-zinc-300 font-light leading-relaxed bg-zinc-900/50 p-4 rounded-xl border border-zinc-800/80 mb-2">
                        <p>
                          Este é um canal confidencial disponível para funcionários, fornecedores, parceiros e clientes, conforme as Leis 14.457/22 e 14.611/23. Utilize este canal para enviar denúncias, reclamações e sugestões.
                        </p>
                        <div className="flex flex-col gap-2 mt-1">
                          <span className="font-bold text-white text-[11px] uppercase tracking-wider">Deseja se identificar?</span>
                          <div className="flex items-center gap-6">
                            <label className="flex items-center gap-2 cursor-pointer select-none text-[11px]">
                              <input 
                                type="radio" 
                                name="desejaIdentificar" 
                                checked={desejaIdentificar === true} 
                                onChange={() => setDesejaIdentificar(true)}
                                className="accent-[#d81d00]"
                              />
                              <span>Sim</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer select-none text-[11px]">
                              <input 
                                type="radio" 
                                name="desejaIdentificar" 
                                checked={desejaIdentificar === false} 
                                onChange={() => setDesejaIdentificar(false)}
                                className="accent-[#d81d00]"
                              />
                              <span>Não</span>
                            </label>
                          </div>
                        </div>
                      </div>
                    )}

                     {/* Campo 1: Nome */}
                    <div>
                      <label className="sr-only">
                        {contactSegment === 'fornecedor' ? 'Nome da Empresa / Contato' : 'Nome Completo'}
                      </label>
                      <input 
                        type="text" 
                        disabled={contactSegment === 'denuncia' && !desejaIdentificar}
                        required={contactSegment !== 'denuncia' && contactSegment !== 'trabalhar' && (contactSegment !== 'denuncia' || desejaIdentificar)}
                        value={leadForm.nome}
                        onChange={(e) => setLeadForm({ ...leadForm, nome: e.target.value })}
                        placeholder="Informe seu nome"
                        className={`w-full bg-zinc-900/80 border border-zinc-800/80 text-white placeholder-zinc-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#d81d00] focus:ring-1 focus:ring-[#d81d00] transition-all duration-300 ${contactSegment === 'denuncia' && !desejaIdentificar ? 'opacity-40 cursor-not-allowed' : ''}`}
                      />
                    </div>

                    {/* Campo 2 & 3: Email e Celular em Linha */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="sr-only">
                          E-mail
                          {contactSegment === 'fornecedor' ? ' Corporativo' : ''}
                        </label>
                        <input 
                          type="email" 
                          disabled={contactSegment === 'denuncia' && !desejaIdentificar}
                          required={contactSegment !== 'denuncia' && contactSegment !== 'trabalhar' && (contactSegment !== 'denuncia' || desejaIdentificar)}
                          value={leadForm.email}
                          onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                          placeholder="Informe seu email"
                          className={`w-full bg-zinc-900/80 border border-zinc-800/80 text-white placeholder-zinc-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#d81d00] focus:ring-1 focus:ring-[#d81d00] transition-all duration-300 ${contactSegment === 'denuncia' && !desejaIdentificar ? 'opacity-40 cursor-not-allowed' : ''}`}
                        />
                      </div>
                      <div>
                        <label className="sr-only">
                          Celular
                        </label>
                        <input 
                          type="tel" 
                          disabled={contactSegment === 'denuncia' && !desejaIdentificar}
                          required={contactSegment !== 'denuncia' && contactSegment !== 'trabalhar' && (contactSegment !== 'denuncia' || desejaIdentificar)}
                          value={leadForm.whatsapp}
                          onChange={(e) => setLeadForm({ ...leadForm, whatsapp: e.target.value })}
                          placeholder="Celular"
                          className={`w-full bg-zinc-900/80 border border-zinc-800/80 text-white placeholder-zinc-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#d81d00] focus:ring-1 focus:ring-[#d81d00] transition-all duration-300 ${contactSegment === 'denuncia' && !desejaIdentificar ? 'opacity-40 cursor-not-allowed' : ''}`}
                        />
                      </div>
                    </div>

                    {/* Campo 4 Dinâmico baseado no Segmento */}
                    
                    {/* CLIENTE */}
                    {contactSegment === 'cliente' && (
                      <div>
                        <label className="sr-only">
                          Empreendimento de Interesse
                        </label>
                        <div className="relative">
                          <select 
                            value={leadForm.interesse}
                            onChange={(e) => setLeadForm({ ...leadForm, interesse: e.target.value })}
                            className="w-full bg-zinc-900/80 border border-zinc-800/80 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#d81d00] focus:ring-1 focus:ring-[#d81d00] cursor-pointer appearance-none transition-all duration-300"
                            style={{ backgroundImage: 'url("data:image/svg+xml,%3csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 20 20\'%3e%3cpath stroke=\'%23a1a1aa\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'1.5\' d=\'M6 8l4 4 4-4\'/%3e%3c/svg%3e")', backgroundPosition: 'right 16px center', backgroundSize: '1.2em', backgroundRepeat: 'no-repeat' }}
                          >
                            <option value="" disabled>Selecione o empreendimento de interesse</option>
                            {empreendimentosData.map((emp) => (
                              <option key={emp.id} value={emp.id}>{emp.nome} ({emp.cidade})</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    )}

                    {/* VIZINHO */}
                    {contactSegment === 'vizinho' && (
                      <>
                        <div>
                          <label className="sr-only">Informe seu endereço</label>
                          <input 
                            type="text" 
                            required
                            placeholder="Informe seu endereço"
                            className="w-full bg-zinc-900/80 border border-zinc-800/80 text-white placeholder-zinc-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#d81d00] focus:ring-1 focus:ring-[#d81d00] transition-all duration-300"
                          />
                        </div>
                        <div>
                          <label className="sr-only">
                            Obra / Empreendimento Próximo
                          </label>
                          <div className="relative">
                            <select 
                              value={leadForm.interesse}
                              onChange={(e) => setLeadForm({ ...leadForm, interesse: e.target.value })}
                              className="w-full bg-zinc-900/80 border border-zinc-800/80 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#d81d00] focus:ring-1 focus:ring-[#d81d00] cursor-pointer appearance-none transition-all duration-300"
                              style={{ backgroundImage: 'url("data:image/svg+xml,%3csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 20 20\'%3e%3cpath stroke=\'%23a1a1aa\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'1.5\' d=\'M6 8l4 4 4-4\'/%3e%3c/svg%3e")', backgroundPosition: 'right 16px center', backgroundSize: '1.2em', backgroundRepeat: 'no-repeat' }}
                            >
                              <option value="" disabled>Qual a obra próxima?</option>
                              {empreendimentosData.map((emp) => (
                                <option key={emp.id} value={emp.id}>{emp.nome} ({emp.cidade})</option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </>
                    )}

                    {/* FORNECEDOR */}
                    {contactSegment === 'fornecedor' && (
                      <div>
                        <label className="sr-only">Qual o tipo de serviço?</label>
                        <input 
                          type="text" 
                          required
                          placeholder="Qual o tipo de serviço?"
                          className="w-full bg-zinc-900/80 border border-zinc-800/80 text-white placeholder-zinc-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#d81d00] focus:ring-1 focus:ring-[#d81d00] transition-all duration-300"
                        />
                      </div>
                    )}

                    {/* CORRETOR */}
                    {contactSegment === 'corretor' && (
                      <div>
                        <label className="sr-only">CRECI</label>
                        <input 
                          type="text" 
                          required
                          placeholder="CRECI"
                          className="w-full bg-zinc-900/80 border border-zinc-800/80 text-white placeholder-zinc-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#d81d00] focus:ring-1 focus:ring-[#d81d00] transition-all duration-300"
                        />
                      </div>
                    )}

                    {/* TRABALHAR */}
                    {contactSegment === 'trabalhar' && (
                      <div>
                        <label className="sr-only">Anexar imagem/vídeo</label>
                        <div className="relative flex items-center gap-3">
                          <label className="bg-zinc-800 hover:bg-zinc-700/80 border border-zinc-700/80 hover:border-[#d81d00]/30 text-white text-[10px] font-bold uppercase tracking-widest py-3 px-5 rounded-xl cursor-pointer transition-all duration-300 select-none">
                            <span>Anexar imagem/vídeo</span>
                            <input 
                              type="file" 
                              className="sr-only" 
                              onChange={(e) => {
                                const fileName = e.target.files[0] ? e.target.files[0].name : 'Nenhum arquivo selecionado';
                                const el = document.getElementById('trabalhar-file-name');
                                if (el) el.textContent = fileName;
                              }} 
                            />
                          </label>
                          <span id="trabalhar-file-name" className="text-[10px] text-zinc-500 font-light">Nenhum arquivo selecionado</span>
                        </div>
                      </div>
                    )}

                    {/* Campo 5: Mensagem */}
                    {contactSegment !== 'trabalhar' && (
                      <div>
                        <label className="sr-only">
                          Mensagem
                        </label>
                        <textarea 
                          rows="4"
                          required
                          value={leadForm.mensagem}
                          onChange={(e) => setLeadForm({ ...leadForm, mensagem: e.target.value })}
                          placeholder="Mensagem"
                          className="w-full bg-zinc-900/80 border border-zinc-800/80 text-white placeholder-zinc-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#d81d00] focus:ring-1 focus:ring-[#d81d00] transition-all duration-300 resize-none"
                        ></textarea>
                      </div>
                    )}

                    {/* VIZINHO - Anexar arquivo do Wireframe */}
                    {contactSegment === 'vizinho' && (
                      <div>
                        <label className="sr-only">Anexar imagem/vídeo</label>
                        <div className="relative flex items-center gap-3">
                          <label className="bg-zinc-800 hover:bg-zinc-700/80 border border-zinc-700/80 hover:border-[#d81d00]/30 text-white text-[10px] font-bold uppercase tracking-widest py-3 px-5 rounded-xl cursor-pointer transition-all duration-300 select-none">
                            <span>Anexar imagem/vídeo</span>
                            <input 
                              type="file" 
                              className="sr-only" 
                              onChange={(e) => {
                                const fileName = e.target.files[0] ? e.target.files[0].name : 'Nenhum arquivo selecionado';
                                const el = document.getElementById('vizinho-file-name');
                                if (el) el.textContent = fileName;
                              }} 
                            />
                          </label>
                          <span id="vizinho-file-name" className="text-[10px] text-zinc-500 font-light">Nenhum arquivo selecionado</span>
                        </div>
                      </div>
                    )}

                    {/* Checkbox 1 (Customizado - Borda branca vira Fundo Vermelho e check) */}
                    <div className="flex items-start gap-2.5 mt-2">
                      <div 
                        onClick={() => setPrivacyAgreed(!privacyAgreed)}
                        className="w-4 h-4 rounded border flex items-center justify-center cursor-pointer transition-all duration-200 mt-0.5 flex-shrink-0"
                        style={{
                          borderColor: privacyAgreed ? '#d81d00' : '#ffffff',
                          backgroundColor: privacyAgreed ? '#d81d00' : 'transparent'
                        }}
                      >
                        {privacyAgreed && <span className="text-[10px] text-white font-black select-none">✓</span>}
                      </div>
                      <input 
                        type="checkbox" 
                        id="privacy-terms-contact"
                        required
                        checked={privacyAgreed}
                        onChange={() => {}}
                        className="sr-only"
                      />
                      <label htmlFor="privacy-terms-contact" className="text-[10px] text-zinc-400 leading-normal cursor-pointer text-left font-light select-none">
                        Declaro que li e aceito os termos da <span className="underline text-red-500 hover:text-red-400 transition-colors cursor-pointer" onClick={(e) => { e.preventDefault(); alert('Políticas de Privacidade Dubai.'); }}>Política de Privacidade</span> da Dubai Incorporação e Construção.
                      </label>
                    </div>

                    {/* Checkbox 2 (Customizado - Borda branca vira Fundo Vermelho e check) */}
                    <div className="flex items-start gap-2.5">
                      <div 
                        onClick={() => setCommAgreed(!commAgreed)}
                        className="w-4 h-4 rounded border flex items-center justify-center cursor-pointer transition-all duration-200 mt-0.5 flex-shrink-0"
                        style={{
                          borderColor: commAgreed ? '#d81d00' : '#ffffff',
                          backgroundColor: commAgreed ? '#d81d00' : 'transparent'
                        }}
                      >
                        {commAgreed && <span className="text-[10px] text-white font-black select-none">✓</span>}
                      </div>
                      <input 
                        type="checkbox" 
                        id="comm-consent-contact"
                        required
                        checked={commAgreed}
                        onChange={() => {}}
                        className="sr-only"
                      />
                      <label htmlFor="comm-consent-contact" className="text-[10px] text-zinc-400 leading-normal cursor-pointer text-left font-light select-none">
                        Estou de acordo em receber comunicações e ser acessado para possível atendimento.
                      </label>
                    </div>

                    <button 
                      type="submit" 
                      className="w-full mt-4 bg-[#d81d00] hover:bg-[#d81d00]/90 text-white font-bold text-xs uppercase tracking-[0.25em] py-4 rounded-xl transition-all duration-300 hover:shadow-[0_0_20px_rgba(216,29,0,0.3)] select-none"
                    >
                      Enviar
                    </button>
                  </form>
                )}
              </div>

            </div>

            {/* Divisor Elegante */}
            <hr className="border-zinc-800/80 my-16 max-w-6xl mx-auto" />

            {/* Seção: Nossa Localização do Wireframe */}
            <div className="max-w-6xl mx-auto mb-8 animate-fade-in-up">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
                <div>
                  <span className="text-[#d81d00] text-xs font-bold uppercase tracking-[0.25em] flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#d81d00] animate-pulse"></span>
                    Sede Institucional
                  </span>
                  <h2 className="text-3xl md:text-4xl text-white uppercase font-extrabold tracking-tight mt-2">
                    Nossa localização
                  </h2>
                </div>
                
                {/* Cartão de Endereço do Wireframe */}
                <div className="glass-panel p-5 rounded-2xl border border-zinc-800 text-xs text-zinc-300 font-light flex items-start gap-3.5 max-w-lg shadow-[0_0_30px_rgba(0,0,0,0.4)]">
                  <MapPin className="text-[#d81d00] mt-0.5 flex-shrink-0" size={16} />
                  <div className="flex flex-col gap-1">
                    <p className="font-semibold text-white text-sm">Av Marcos Penteado de Ulhôa Rodrigues, 1119</p>
                    <p className="text-zinc-400">7º Andar - Office Tamboré - Barueri - SP</p>
                    <p className="text-zinc-500 font-medium">CEP: 06460 - 040</p>
                  </div>
                </div>
              </div>

              {/* Mapa Google Maps Interativo Incorporado */}
              <div className="w-full h-[450px] rounded-2xl overflow-hidden border border-zinc-800/80 relative group shadow-[0_0_35px_rgba(0,0,0,0.6)]">
                <iframe 
                  title="Dubai Construtora Office Tamboré Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3659.0494488346065!2d-46.837330523824424!3d-23.49472305929654!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94cf01f7871b6923%3A0xc0eb77926b484de!2sAv.%20Marcos%20Penteado%20de%20Ulh%C3%B4a%20Rodrigues%2C%201119%20-%20Tambor%C3%A9%2C%20Barueri%20-%20SP%2C%2006460-040!5e0!3m2!1spt-BR!2sbr!4v1717000000000!5m2!1spt-BR!2sbr"
                  width="100%" 
                  height="100%" 
                  style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(95%) contrast(90%)' }} 
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full absolute inset-0 object-cover"
                ></iframe>
                
                {/* Botão de Direções premium flutuante por cima do mapa */}
                <a 
                  href="https://maps.google.com/?q=Av.+Marcos+Penteado+de+Ulhôa+Rodrigues,+1119+-+Tamboré,+Barueri+-+SP,+06460-040"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute top-4 left-4 bg-zinc-950/90 text-white border border-zinc-800 hover:border-[#d81d00]/40 px-4 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all duration-300 hover:shadow-[0_0_15px_rgba(216,29,0,0.25)] select-none flex items-center gap-2"
                >
                  <MapPin size={10} className="text-[#d81d00]" />
                  Open in Maps
                </a>
              </div>
            </div>

          </div>
        )}
      </main>

      <footer className="bg-black/95 border-t border-zinc-950 pt-20 pb-0 px-6 text-zinc-400 text-xs relative overflow-hidden pattern-bg">
        {/* Elemento de iluminação neon no topo central (Estilo Efferd/SaaS) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-red-950/10 rounded-full blur-[160px] pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20 relative z-10">
          
          {/* Coluna Esquerda (Logo, Slogan, Redes Sociais, Contato) */}
          <div className="lg:col-span-7 flex flex-col items-start gap-5">
            <img 
              src={`${import.meta.env.BASE_URL}logo.svg`} 
              alt="Dubai Incorporação e Construção" 
              className="h-10 w-auto cursor-pointer mb-2" 
              onClick={() => {
                setCurrentPage('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
            <p className="text-[11px] italic text-zinc-500 font-light mt-1">
              "Quem compara compra Dubai."
            </p>
            <p className="text-xs text-zinc-400 font-light leading-relaxed max-w-md">
              Excelência, acabamento superior e 100% das obras entregues no prazo estipulado por contrato.
            </p>
            
            {/* Ícones de Redes Sociais Circulares */}
            <div className="flex gap-3 pt-2">
              <a href="#" className="w-8 h-8 rounded-full border border-zinc-900 bg-zinc-950/40 text-zinc-500 hover:text-white hover:border-red-800 flex items-center justify-center transition-all duration-300">
                <span className="text-[10px] font-bold">T</span>
              </a>
              <a href="#" className="w-8 h-8 rounded-full border border-zinc-900 bg-zinc-950/40 text-zinc-500 hover:text-white hover:border-red-800 flex items-center justify-center transition-all duration-300">
                <span className="text-[10px] font-bold">F</span>
              </a>
              <a href="#" className="w-8 h-8 rounded-full border border-zinc-900 bg-zinc-950/40 text-zinc-500 hover:text-white hover:border-red-800 flex items-center justify-center transition-all duration-300">
                <span className="text-[10px] font-bold">In</span>
              </a>
            </div>
            
            <div className="pt-2">
              <span className="text-zinc-300 text-xs font-semibold tracking-wider">TEL: 11 2078-3960</span>
            </div>
          </div>

          {/* Coluna Direita (Menu de Links Planos Exigidos) */}
          <div className="lg:col-span-5 flex flex-col gap-3.5 text-left lg:items-end justify-center pt-4 lg:pt-0">
            <button onClick={() => {
              setCurrentPage('home');
              setTimeout(() => {
                document.getElementById('sobre-nos-secao')?.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }} className="text-left lg:text-right hover:text-[#d81d00] transition-colors font-medium tracking-wide text-xs">Conheça a Dubai</button>
            
            <button onClick={() => {
              setCurrentPage('empreendimentos');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }} className="text-left lg:text-right hover:text-[#d81d00] transition-colors font-medium tracking-wide text-xs">Empreendimentos</button>
            
            <button onClick={() => {
              setCurrentPage('home');
              setTimeout(() => {
                const insightsSecao = document.querySelector('section.py-28.px-6.border-t.border-zinc-950');
                insightsSecao?.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }} className="text-left lg:text-right hover:text-[#d81d00] transition-colors font-medium tracking-wide text-xs">Insights</button>
            
            <a href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer" className="text-left lg:text-right hover:text-[#d81d00] transition-colors font-medium tracking-wide text-xs">Portal do cliente</a>
            
            <button onClick={() => {
              setCurrentPage('contato');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }} className="text-left lg:text-right hover:text-[#d81d00] transition-colors font-medium tracking-wide text-xs">Contato</button>
            
            <button onClick={() => {
              setCurrentPage('home');
              window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
            }} className="text-left lg:text-right hover:text-[#d81d00] transition-colors font-medium tracking-wide text-xs">Políticas de Privacidade</button>
            
            <button onClick={() => {
              setCurrentPage('home');
              window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
            }} className="text-left lg:text-right hover:text-[#d81d00] transition-colors font-medium tracking-wide text-xs">Termos e Condições de Uso</button>
          </div>

        </div>


        {/* Copyright strip */}
        <div className="border-t border-zinc-900/60 py-8 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between text-[10px] text-zinc-500 gap-4 relative z-10 bg-transparent">
          <p 
            onClick={() => {
              setCurrentPage('home2');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="cursor-pointer hover:text-zinc-300 transition-colors"
            title="Acessar página de teste 3D"
          >
            © 2026 Dubai Incorporação e Construção. Todos os direitos reservados. Desenvolvimento de Alto Padrão.
          </p>
        </div>

        {/* Créditos obrigatórios da New Humans */}
        <div className="bg-black/90 border-t border-zinc-950 py-4 px-6 text-center text-[9px] text-zinc-600 -mx-6 relative z-10">
          Criação e Desenvolvimento New Humans | Plataforma Add Suite - Tecnologia e Comunicação para Transformação Digital
        </div>
      </footer>

      {/* ========================================================================= */}
      {/* 2 BOTÕES FLUTUANTES DE CONTATO PREMIUM & LUXUOSOS (Fidelidade ao Tema Dubai) */}
      {/* ========================================================================= */}
      <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-4 items-end">
        {/* Botão 1: Enviar Mensagem (Abre Formulário de Lead ou Rola até a Seção) */}
        <button 
          onClick={() => {
            setCurrentPage('contato');
            setTimeout(() => {
              document.getElementById('lead-form-box')?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
          }}
          className="w-14 h-14 bg-zinc-950/90 backdrop-blur-md rounded-full border border-zinc-900 flex items-center justify-center text-white hover:text-[#d81d00] hover:border-[#d81d00]/40 hover:shadow-[0_0_25px_rgba(216,29,0,0.25)] transition-all duration-300 group shadow-2xl relative"
          title="Enviar Mensagem"
        >
          {/* Tooltip elegante em Gilroy que desliza para a esquerda */}
          <span className="absolute right-16 bg-zinc-950/95 backdrop-blur-md border border-zinc-900 text-white text-[9px] tracking-[0.2em] uppercase font-bold px-3.5 py-2 rounded-sm opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap shadow-xl transform translate-x-2 group-hover:translate-x-0 font-sans">
            Enviar Mensagem
          </span>
          <Mail size={20} className="text-[#d81d00] group-hover:scale-110 transition-transform duration-300" />
        </button>

        {/* Botão 2: Atendimento WhatsApp de Plantão */}
        <a 
          href="https://wa.me/5511999999999" 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-14 h-14 bg-zinc-950/90 backdrop-blur-md rounded-full border border-zinc-900 flex items-center justify-center text-white hover:text-[#d81d00] hover:border-[#d81d00]/40 hover:shadow-[0_0_25px_rgba(216,29,0,0.25)] transition-all duration-300 group shadow-2xl relative"
          title="WhatsApp de Plantão"
        >
          {/* Tooltip elegante em Gilroy */}
          <span className="absolute right-16 bg-zinc-950/95 backdrop-blur-md border border-zinc-900 text-white text-[9px] tracking-[0.2em] uppercase font-bold px-3.5 py-2 rounded-sm opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap shadow-xl transform translate-x-2 group-hover:translate-x-0 font-sans">
            Fale no WhatsApp
          </span>
          {/* Ícone customizado de Chat/WhatsApp usando MessageSquare padrão do site */}
          <MessageSquare size={20} className="text-[#d81d00] group-hover:scale-110 transition-transform duration-300" />
        </a>
      </div>

    </div>
  );
}
