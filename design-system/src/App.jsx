import React, { useState, useRef, useEffect } from 'react';
import { 
  Palette, 
  Type, 
  Sparkles, 
  Layers, 
  Code, 
  Copy, 
  Check, 
  ExternalLink, 
  Sliders, 
  Grid,
  Zap,
  ChevronRight,
  Heart,
  Maximize2,
  Building2,
  MapPin,
  Sun,
  Moon,
  Info,
  BookOpen,
  Eye,
  Activity,
  Compass,
  Layout,
  MousePointer,
  Maximize,
  Award,
  Calendar,
  Phone,
  FileText,
  Clock,
  Map,
  ShieldCheck,
  User,
  Mail,
  MessageSquare,
  ArrowUpRight,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

// EXACT Interactive 3D Tilt Card Component from main website
function InteractiveTiltCard({ children, className, onClick, ...props }) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    const rotateX = ((y - height / 2) / (height / 2)) * -8;
    const rotateY = ((x - width / 2) / (width / 2)) * 8;

    cardRef.current.style.setProperty('--rx', `${rotateX}deg`);
    cardRef.current.style.setProperty('--ry', `${rotateY}deg`);
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
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
  const [activeTab, setActiveTab] = useState('rationale');
  const [isLightMode, setIsLightMode] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastVisible, setToastVisible] = useState(false);
  const [copiedId, setCopiedId] = useState('');
  
  // Font Sandbox State
  const [fontSize, setFontSize] = useState(32);
  const [fontWeight, setFontWeight] = useState(800);
  const [letterSpacing, setLetterSpacing] = useState(-0.02);
  const [textPreview, setTextPreview] = useState('DIFERENCIAIS DUBAI');
  
  // Form Showcase State
  const [contactSegment, setContactSegment] = useState('cliente');
  const [isSpotlightActive, setIsSpotlightActive] = useState(true);

  // Code Modal state
  const [selectedCode, setSelectedCode] = useState(null);
  
  // Toggle themes
  const toggleTheme = () => {
    setIsLightMode(prev => !prev);
  };

  useEffect(() => {
    if (isLightMode) {
      document.body.classList.add('light-mode');
    } else {
      document.body.classList.remove('light-mode');
    }
  }, [isLightMode]);

  const showToast = (message, id) => {
    setToastMessage(message);
    setToastVisible(true);
    setCopiedId(id);
    navigator.clipboard.writeText(message);
    setTimeout(() => {
      setToastVisible(false);
      setCopiedId('');
    }, 2000);
  };

  const codeSnippets = {
    btnPrimary: `<button className="btn-primary">
  <span>EXPLORAR EMPREENDIMENTOS</span>
  <Zap className="w-4 h-4 text-white fill-white" />
</button>

/* CSS correspondente */
.btn-primary {
  position: relative;
  background: linear-gradient(135deg, #951b1e 0%, #af1e23 50%, #d81d00 100%);
  color: #ffffff;
  font-family: 'Outfit', sans-serif;
  font-weight: 600;
  font-size: 0.95rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  border: none;
  padding: 14px 28px;
  border-radius: 4px; /* LEI DO DESIGN DUBAI: Cantos estruturados e rígidos */
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  box-shadow: 0 4px 15px rgba(216, 29, 0, 0.2);
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.btn-primary::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: all 0.6s ease;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(216, 29, 0, 0.4);
}

.btn-primary:hover::before {
  left: 100%;
}`,
    projectCard: `<InteractiveTiltCard 
  className="glass-panel rounded overflow-hidden flex flex-col border border-zinc-900/60 relative cursor-pointer hover:-translate-y-2.5 hover:border-[#d81d00]/40 hover:shadow-[0_20px_50px_-10px_rgba(216,29,0,0.15)] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group"
  onClick={handleClick}
>
  {/* Efeito Brilho e Reflexo de Diamante Premium */}
  <div className="absolute inset-0 w-full h-full bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-[1500ms] ease-out pointer-events-none z-10" />

  <div className="relative overflow-hidden aspect-[4/3] bg-zinc-950">
    <img 
      src={emp.fotos[0]} 
      alt={emp.nome} 
      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-108 transition-all duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
    />
    <span className="absolute top-4 left-4 bg-black/85 text-[10px] font-bold tracking-widest text-red-500 uppercase px-3 py-1 border border-red-900/40 rounded shadow-md z-20">
      {emp.statusLabel}
    </span>
  </div>

  <div className="p-6 flex-1 flex flex-col justify-between">
    <div>
      <div className="flex items-center gap-1 text-zinc-400 text-xs tracking-wider uppercase mb-1">
        <MapPin size={12} className="text-red-500 group-hover:-translate-y-0.5 transition-transform duration-300" />
        <span>{emp.bairro}, {emp.cidade}</span>
      </div>
      <h3 className="text-xl font-bold text-white uppercase group-hover:text-[#d81d00] transition-colors duration-300 mb-2">
        {emp.nome}
      </h3>
      <p className="text-xs text-zinc-400 font-light line-clamp-2 mb-4 leading-relaxed">
        {emp.slogan}
      </p>
    </div>

    <div>
      <hr className="border-zinc-900 group-hover:border-red-900/30 transition-colors duration-500 my-4" />
      <div className="flex items-center justify-between text-xs text-zinc-400 mb-4">
        <span className="flex items-center gap-1">
          <Maximize2 size={12} className="text-red-800" />
          {emp.area}
        </span>
        <span className="flex items-center gap-1">
          <Building2 size={12} className="text-red-800" />
          {emp.dormitorios}
        </span>
      </div>
    </div>
  </div>
</InteractiveTiltCard>`,
    inputs: `/* Classes oficiais dos campos e formulários */
.ds-form-input {
  width: 100%;
  background: rgba(8, 8, 9, 0.4);
  border: 1px solid var(--border-color);
  color: var(--text-primary);
  font-size: 13px;
  padding: 12px 16px;
  border-radius: 4px;
  outline: none;
  transition: all 0.3s ease;
}

.ds-form-input:focus {
  border-color: var(--dubai-red-bright);
  box-shadow: 0 0 10px rgba(216, 29, 0, 0.1);
}`,
    catalogCard: `<InteractiveTiltCard 
  className="glass-panel rounded overflow-hidden grid grid-cols-1 lg:grid-cols-12 border border-zinc-900/60 relative cursor-pointer hover:-translate-y-2 hover:border-[#d81d00]/40 hover:shadow-[0_20px_50px_-10px_rgba(216,29,0,0.15)] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group"
>
  {/* Efeito Brilho e Reflexo de Diamante Premium */}
  <div className="absolute inset-0 w-full h-full bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-[1500ms] ease-out pointer-events-none z-10" />

  {/* Lado Esquerdo - Imagem com Zoom */}
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
        {emp.descricao || emp.slogan}
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
        <button className="flex-1 btn-primary !py-2.5 !text-xs text-center flex items-center justify-center gap-2">
          <span>Ver Detalhes</span>
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  </div>
</InteractiveTiltCard>`
  };

  const sampleProjects = [
    {
      id: 'authoria',
      nome: 'Authoria por Dubai',
      bairro: 'Vila Yara',
      cidade: 'Osasco',
      statusLabel: 'Lançamento',
      area: '120m² a 165m²',
      dormitorios: '3 a 4 Suítes',
      slogan: 'A expressão máxima de sofisticação e design contemporâneo.',
      fotos: ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80']
    },
    {
      id: 'yara',
      nome: 'Yara por Dubai',
      bairro: 'Vila Yara',
      cidade: 'Osasco',
      statusLabel: 'Em Obras',
      area: '82m² a 115m²',
      dormitorios: '2 a 3 Dormitórios (1 a 2 Suítes)',
      slogan: 'Elegância em cada detalhe, no bairro mais desejado.',
      fotos: ['https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80']
    },
    {
      id: 'legend',
      nome: 'Legend por Dubai',
      bairro: 'Bela Vista',
      cidade: 'Osasco',
      statusLabel: 'Em Obras',
      area: '95m² a 130m²',
      dormitorios: '3 Dormitórios (2 a 3 Suítes)',
      slogan: 'Um novo marco arquitetônico no horizonte de Osasco.',
      fotos: ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80']
    },
    {
      id: 'acervo',
      nome: 'Acervo por Dubai',
      bairro: 'Alphaville',
      cidade: 'Barueri',
      statusLabel: 'Pronto para Morar',
      area: '180m² a 240m²',
      dormitorios: '4 Suítes',
      slogan: 'Pronto para morar com a verdadeira assinatura de luxo.',
      fotos: ['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80']
    },
    {
      id: 'essence',
      nome: 'Essence por Dubai',
      bairro: 'Alphaville',
      cidade: 'Barueri',
      statusLabel: 'Pronto para Morar',
      area: '150m² a 200m²',
      dormitorios: '3 a 4 Suítes',
      slogan: 'A essência do luxo contemporâneo em Alphaville.',
      fotos: ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80']
    },
    {
      id: 'mirage',
      nome: 'Mirage por Dubai',
      bairro: 'Vila Yara',
      cidade: 'Osasco',
      statusLabel: 'Lançamento',
      area: '90m² a 130m²',
      dormitorios: '2 a 3 Suítes',
      slogan: 'Um miragem que se torna realidade de alto padrão.',
      fotos: ['https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80']
    }
  ];

  return (
    <div className={`min-h-screen relative overflow-hidden pattern-bg`}>
      
      {/* Background Geometries */}
      <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
        <div className="ambient-glow orb-1"></div>
        <div className="ambient-glow orb-2"></div>
      </div>

      {/* Main Luxury Header */}
      <header className="ds-header">
        <div className="ds-header-content">
          <div className="ds-logo-container">
            <div style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
              <svg width="40" height="40" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
                <path d="M30 2 L58 16 L58 44 L30 58 L2 44 L2 16 Z" fill="none" stroke="#d81d00" strokeWidth="3" />
                <path d="M30 2 L30 30 L58 44 M30 30 L2 44 M30 30 L30 58" fill="none" stroke="#d81d00" strokeWidth="2" />
              </svg>
              <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(216, 29, 0, 0.25)', filter: 'blur(8px)', borderRadius: '50%', zIndex: -1 }}></div>
            </div>
            <div>
              <span className="font-serif font-extrabold" style={{ fontSize: '16px', fontWeight: '800', letterSpacing: '0.05em', color: 'var(--text-primary)' }}>DUBAI DESIGN SYSTEM</span>
              <p style={{ fontSize: '9px', color: 'var(--text-muted)', uppercase: 'true', letterSpacing: '0.1em', marginTop: '2px' }}>CONCEITO E REGRAS ESTRUTURAIS</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button 
              onClick={toggleTheme}
              style={{
                background: 'var(--bg-card-hover)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-primary)',
                padding: '8px 16px',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '11px',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}
            >
              {isLightMode ? (
                <>
                  <Moon className="w-3.5 h-3.5 text-[#d81d00]" />
                  <span>Modo Escuro</span>
                </>
              ) : (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-500" />
                  <span>Light Landing Page Mode</span>
                </>
              )}
            </button>
            
            <a 
              href="/" 
              className="ds-view-code-btn"
              style={{ color: 'var(--dubai-red-bright)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: '600', textDecoration: 'none' }}
            >
              <span>Voltar ao Site Principal</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </header>

      {/* Main Layout Container */}
      <div className="ds-layout">
        
        {/* Navigation Sidebar */}
        <aside className="ds-sidebar">
          <div className="ds-sidebar-card">
            <h3 className="ds-sidebar-title">Conceito e Diretrizes</h3>
            
            <nav className="ds-nav-menu">
              <button 
                onClick={() => setActiveTab('rationale')}
                className={`ds-nav-btn ${activeTab === 'rationale' ? 'active' : ''}`}
              >
                <div className="ds-nav-icon-label">
                  <BookOpen className="w-4 h-4" />
                  <span>Conceito & Filosofia</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>

              <button 
                onClick={() => setActiveTab('laws')}
                className={`ds-nav-btn ${activeTab === 'laws' ? 'active' : ''}`}
              >
                <div className="ds-nav-icon-label">
                  <Activity className="w-4 h-4" />
                  <span>Leis & Regras de Design</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>

              <button 
                onClick={() => setActiveTab('sections')}
                className={`ds-nav-btn ${activeTab === 'sections' ? 'active' : ''}`}
              >
                <div className="ds-nav-icon-label">
                  <Layout className="w-4 h-4" />
                  <span>Navegação & Seções</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>

              <button 
                onClick={() => setActiveTab('components')}
                className={`ds-nav-btn ${activeTab === 'components' ? 'active' : ''}`}
              >
                <div className="ds-nav-icon-label">
                  <Layers className="w-4 h-4" />
                  <span>Cards & Botões Oficiais</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>

              <button 
                onClick={() => setActiveTab('forms')}
                className={`ds-nav-btn ${activeTab === 'forms' ? 'active' : ''}`}
              >
                <div className="ds-nav-icon-label">
                  <FileText className="w-4 h-4" />
                  <span>Formulários & Inputs</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>

              <button 
                onClick={() => setActiveTab('sandbox')}
                className={`ds-nav-btn ${activeTab === 'sandbox' ? 'active' : ''}`}
              >
                <div className="ds-nav-icon-label">
                  <Sparkles className="w-4 h-4" />
                  <span>Efeitos Ambientais & 3D</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </nav>
          </div>

          <div className="ds-sidebar-card">
            <h4 className="ds-sidebar-title">Garantia Técnica</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '11px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
              <div>
                <strong style={{ color: 'var(--text-primary)' }}>Rigor Construtivo</strong>
                <p style={{ marginTop: '2px' }}>O layout reflete perfeitamente a consistência corporativa em todos os pontos de contato da marca.</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Content Area */}
        <main className="ds-main">
          
          {/* TAB 1: RATIONALE */}
          {activeTab === 'rationale' && (
            <div className="ds-main" style={{ gap: '24px' }}>
              <div className="ds-intro-card">
                <span className="ds-section-tag">Fundamentação e Raciocínio</span>
                <h2 className="ds-section-title">Conceito Construtora Dubai</h2>
                <p className="ds-section-desc" style={{ fontSize: '15px', fontWeight: '500', color: 'var(--text-primary)', borderLeft: '3px solid var(--dubai-red-bright)', paddingLeft: '16px', fontStyle: 'italic' }}>
                  “Arquitetura Digital com o mesmo rigor da Arquitetura Física.”
                </p>
                <p className="ds-section-desc" style={{ marginTop: '16px' }}>
                  O site foi concebido para espelhar exatamente os atributos que definem os edifícios reais da Dubai: precisão, solidez e requinte. Mais do que mostrar imóveis, o objetivo é transmitir a confiança sólida que sustenta cada obra entregue.
                </p>
              </div>

              <div className="ds-concept-grid">
                <div className="ds-concept-card">
                  <h4 className="ds-concept-header">🎯 Pilares da Estratégia de Comunicação</h4>
                  <p className="ds-concept-body">
                    Foco nos dois maiores diferenciais da incorporadora: <strong>Entrega no prazo</strong> e <strong>Qualidade Dubai</strong>. Evitando apelos comerciais barulhentos, a linguagem institucional premium posiciona a marca com autoridade máxima frente a investidores e compradores exigentes.
                  </p>
                </div>

                <div className="ds-concept-card">
                  <h4 className="ds-concept-header">🎨 A Psicologia Cromática Dubai</h4>
                  <p className="ds-concept-body">
                    O <strong>Preto Absoluto</strong> simboliza sofisticação, exclusividade e poder, proporcionando o contraste perfeito para que as fotografias dos edifícios sejam as protagonistas. O <strong>Vermelho Dubai</strong> atua como um holofote de atenção controlado, reservado cirurgicamente apenas para botões de ação e indicações de foco, garantindo elegância e alto impacto.
                  </p>
                </div>

                <div className="ds-concept-card">
                  <h4 className="ds-concept-header">📐 Organização e Respiros Visuais</h4>
                  <p className="ds-concept-body">
                    A presença de grandes áreas vazias e alinhamentos geométricos rigorosos não representa ausência de conteúdo, mas sim <strong>confiança e planejamento construtivo</strong>. Marcas de luxo conduzem o olhar com elegância, clareza e autoridade.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: DESIGN LAWS */}
          {activeTab === 'laws' && (
            <div className="ds-main" style={{ gap: '24px' }}>
              <div className="ds-intro-card">
                <span className="ds-section-tag">Regras Construtivas Digitais</span>
                <h2 className="ds-section-title">Leis & Diretrizes de Design</h2>
                <p className="ds-section-desc">
                  Confira as leis e regras geométricas precisas que estabelecemos para garantir a coerência e a sofisticação da marca Construtora Dubai no ambiente digital.
                </p>
              </div>

              <div className="ds-concept-grid">
                
                {/* Law 1: Border Radius */}
                <div className="ds-concept-card" style={{ borderLeftColor: 'var(--dubai-red-bright)' }}>
                  <h4 className="ds-concept-header">📐 Cantos Geométricos (Border Radius Rule)</h4>
                  <p className="ds-concept-body" style={{ marginBottom: '12px' }}>
                    Em interfaces premium de arquitetura e luxo, botões arredondados (pílula) são evitados por transmitirem informalidade. Estabelecemos a regra de **cantos estruturados**:
                  </p>
                  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    <div style={{ padding: '10px 16px', background: 'var(--bg-deep)', border: '1px solid var(--border-color)', borderRadius: '4px', textAlign: 'center' }}>
                      <span style={{ fontSize: '13px', fontWeight: 'bold', color: 'var(--text-primary)', display: 'block' }}>4px (Rígido)</span>
                      <span style={{ fontSize: '9px', color: 'var(--text-muted)' }}>Botões Oficiais e CTAs</span>
                    </div>
                    <div style={{ padding: '10px 16px', background: 'var(--bg-deep)', border: '1px solid var(--border-color)', borderRadius: '8px', textAlign: 'center' }}>
                      <span style={{ fontSize: '13px', fontWeight: 'bold', color: 'var(--text-primary)', display: 'block' }}>8px / 12px (Suave)</span>
                      <span style={{ fontSize: '9px', color: 'var(--text-muted)' }}>Cards e Elementos Flutuantes</span>
                    </div>
                  </div>
                </div>

                {/* Law 2: Icons Style */}
                <div className="ds-concept-card" style={{ borderLeftColor: 'var(--dubai-red-bright)' }}>
                  <h4 className="ds-concept-header">✏️ O Estilo dos Ícones (Icon Outline Guidelines)</h4>
                  <p className="ds-concept-body" style={{ marginBottom: '12px' }}>
                    Os ícones seguem uma linguagem minimalista, estritamente geométrica e linear, simulando a precisão dos projetos técnicos e plantas arquitetônicas.
                  </p>
                  <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                    <div style={{ display: 'flex', gap: '12px' }}>
                      <div style={{ width: '40px', height: '40px', background: 'rgba(216, 29, 0, 0.1)', color: 'var(--dubai-red-bright)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '4px' }}>
                        <Compass className="w-5 h-5" strokeWidth={1.5} />
                      </div>
                      <div style={{ width: '40px', height: '40px', background: 'rgba(216, 29, 0, 0.1)', color: 'var(--dubai-red-bright)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '4px' }}>
                        <Maximize className="w-5 h-5" strokeWidth={1.5} />
                      </div>
                      <div style={{ width: '40px', height: '40px', background: 'rgba(216, 29, 0, 0.1)', color: 'var(--dubai-red-bright)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '4px' }}>
                        <Building2 className="w-5 h-5" strokeWidth={1.5} />
                      </div>
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                      • Traço limpo de <strong>1.5px (Thin Stroke)</strong><br />
                      • Uso do vermelho institucional nos ícones para criar pontos focais e guiar o olhar.
                    </div>
                  </div>
                </div>

                {/* Law 3: Metal Shine Rule */}
                <div className="ds-concept-card" style={{ borderLeftColor: 'var(--dubai-red-bright)' }}>
                  <h4 className="ds-concept-header">✨ Regra do Reflexo de Diamante (Metal Shine Sweep)</h4>
                  <p className="ds-concept-body">
                    Tanto os botões primários quanto os cards de projetos possuem um sweep de luz diagonal de <strong>-25 graus</strong> com uma transição suave de <strong>1.5s (cubic-bezier)</strong>. O efeito simula a reflexão física da luz natural sobre placas polidas de vidro e metal, gerando a sensação instantânea de acabamento nobre e valorização de marca.
                  </p>
                </div>

              </div>
            </div>
          )}

          {/* TAB 3: SITE SECTIONS */}
          {activeTab === 'sections' && (
            <div className="ds-main" style={{ gap: '24px' }}>
              <div className="ds-intro-card">
                <span className="ds-section-tag">Estruturação de Páginas</span>
                <h2 className="ds-section-title">As Seções do Website & Exemplos Visuais</h2>
                <p className="ds-section-desc">
                  Saiba por que cada seção do site foi estrategicamente pensada e confira os protótipos e exemplos visuais oficiais das seções.
                </p>
              </div>

              {/* 1. HERO SECTION VISUAL MOCKUP */}
              <div className="ds-component-row">
                <div className="ds-row-header">
                  <h3 className="ds-row-title">01. Hero Section (Vitrine de Abertura) - Exemplo Visual</h3>
                </div>
                <p className="ds-section-desc" style={{ fontSize: '13px' }}>
                  A abertura do site foi concebida como uma vitrine institucional. O uso de imagens amplas e movimento suave cria uma sensação de grandeza e valorização patrimonial. A sobreposição escura foi aplicada para aumentar a legibilidade e direcionar o foco para a mensagem principal.
                </p>
                <div className="ds-showcase-box" style={{ padding: 0, overflow: 'hidden', borderRadius: '8px', position: 'relative', height: '260px' }}>
                  <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url("https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80")', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.45 }}></div>
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(8,8,9,0.9) 30%, transparent 100%)', zIndex: 1 }}></div>
                  <div style={{ position: 'relative', zIndex: 10, padding: '40px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: '16px' }}>
                    <span style={{ color: 'var(--dubai-red-bright)', fontSize: '10px', fontWeight: 'bold', letterSpacing: '0.15em', uppercase: 'true' }}>DUBAI INCORPORAÇÃO E CONSTRUÇÃO</span>
                    <h3 className="hero-title" style={{ fontSize: '32px', color: '#fff', fontWeight: 800 }}>MÁXIMO DESIGN & EXCLUSIVIDADE</h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '12px', maxWidth: '380px' }}>Descubra empreendimentos planejados com o mais alto rigor estético e pontualidade contratual.</p>
                    <button className="btn-primary !py-2.5 !px-6 !text-[10px] font-bold uppercase tracking-wider flex items-center gap-2">
                      <span>Ver Empreendimentos</span>
                      <Zap className="w-3.5 h-3.5 fill-white text-white" />
                    </button>
                  </div>
                </div>
              </div>

              {/* 2. PROJECT CARDS SHORTCUT */}
              <div className="ds-concept-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h4 className="ds-concept-header">🏢 2. Cartões de Empreendimentos (Vitrine Modular)</h4>
                  <p className="ds-concept-body">Os empreendimentos ocupam posição de destaque máximo porque representam o principal ativo comercial. Cada card comunica localização, status, e características construtivas.</p>
                </div>
                <button onClick={() => setActiveTab('components')} className="btn-primary !py-2.5 !px-5 !text-[10px] font-bold uppercase" style={{ flexShrink: 0, marginLeft: '24px' }}>
                  <span>Ver Exemplo Real</span>
                </button>
              </div>

              {/* 3. DIFERENCIAIS VISUAL MOCKUP */}
              <div className="ds-component-row">
                <div className="ds-row-header">
                  <h3 className="ds-row-title">03. Diferenciais Dubai (Blocos Arquitetônicos) - Exemplo Visual</h3>
                </div>
                <p className="ds-section-desc" style={{ fontSize: '13px' }}>
                  Esta seção foi posicionada estrategicamente após os empreendimentos. Os blocos informativos foram organizados em formato estrutural, lembrando módulos arquitetônicos. Essa composição reforça visualmente os conceitos de solidez e engenharia.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', width: '100%', marginTop: '12px' }}>
                  
                  {/* Block 1 */}
                  <div className="glass-panel" style={{ padding: '24px', borderRadius: '8px', borderLeft: '3px solid var(--dubai-red-bright)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '4px', background: 'rgba(216,29,0,0.1)', color: 'var(--dubai-red-bright)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Clock className="w-5 h-5" strokeWidth={1.5} />
                    </div>
                    <h4 style={{ fontSize: '14px', fontWeight: 'bold', color: 'var(--text-primary)' }}>100% no Prazo</h4>
                    <p style={{ fontSize: '11px', color: 'var(--text-secondary)', lineHeight: '1.4' }}>Compromisso absoluto com o cumprimento rigoroso dos cronogramas contratuais.</p>
                  </div>

                  {/* Block 2 */}
                  <div className="glass-panel" style={{ padding: '24px', borderRadius: '8px', borderLeft: '3px solid var(--dubai-red-bright)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '4px', background: 'rgba(216,29,0,0.1)', color: 'var(--dubai-red-bright)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Award className="w-5 h-5" strokeWidth={1.5} />
                    </div>
                    <h4 style={{ fontSize: '14px', fontWeight: 'bold', color: 'var(--text-primary)' }}>Padrão Construtivo</h4>
                    <p style={{ fontSize: '11px', color: 'var(--text-secondary)', lineHeight: '1.4' }}>Acabamentos nobres, mármores importados e rigor construtivo inquestionável.</p>
                  </div>

                  {/* Block 3 */}
                  <div className="glass-panel" style={{ padding: '24px', borderRadius: '8px', borderLeft: '3px solid var(--dubai-red-bright)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '4px', background: 'rgba(216,29,0,0.1)', color: 'var(--dubai-red-bright)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Compass className="w-5 h-5" strokeWidth={1.5} />
                    </div>
                    <h4 style={{ fontSize: '14px', fontWeight: 'bold', color: 'var(--text-primary)' }}>Exclusividade Yara</h4>
                    <p style={{ fontSize: '11px', color: 'var(--text-secondary)', lineHeight: '1.4' }}>Localizações estratégicas nos bairros mais desejados e valorizados da região.</p>
                  </div>

                </div>
              </div>

              {/* 4. MAPS & LOCATION RATIONALE */}
              <div className="ds-component-row">
                <div className="ds-row-header">
                  <h3 className="ds-row-title">04. Sistema de Mapas (Por que este estilo?)</h3>
                </div>
                <div className="ds-flex-row" style={{ gap: '32px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <h4 style={{ fontSize: '14px', fontWeight: 'bold', color: 'var(--text-primary)' }}>Decisão Estratégica de Geolocalização</h4>
                    <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                      Optamos por um design de <strong>Mapa Vetorial Escuro e Minimalista</strong> integrado perfeitamente ao tema visual do site, em vez de injetar mapas coloridos tradicionais do Google ou Apple que poluem a estética.
                    </p>
                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                        <span style={{ color: 'var(--dubai-red-bright)', fontWeight: 'bold' }}>•</span>
                        <span><strong>Harmonia Visual:</strong> Mantém o tema de sofisticação luxuosa, impedindo que cores verdes/amarelas vibrantes quebrem a percepção do Brand Book.</span>
                      </div>
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                        <span style={{ color: 'var(--dubai-red-bright)', fontWeight: 'bold' }}>•</span>
                        <span><strong>Foco Comercial:</strong> Destaca única e exclusivamente os pontos de valorização imobiliária da Construtora Dubai (Vila Yara, Bela Vista, Alphaville).</span>
                      </div>
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                        <span style={{ color: 'var(--dubai-red-bright)', fontWeight: 'bold' }}>•</span>
                        <span><strong>Identidade Técnica:</strong> As linhas limpas no mapa integram-se de forma coerente à identidade das plantas e "arquitetura digital".</span>
                      </div>
                    </div>
                  </div>

                  {/* Real Interactive Dark Google Map */}
                  <div className="w-full min-h-[320px] rounded-2xl overflow-hidden border border-zinc-900 bg-zinc-950 relative shadow-inner flex-1">
                    <iframe 
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3658.0702956272583!2d-46.83151838502283!3d-23.530026884697387!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94cf017ad2eb0d79%3A0xe2a8b321eb1d713c!2sAv.%20Marcos%20Penteado%20de%20Ulh%C3%B4a%20Rodrigues%2C%201119%20-%20Tambor%C3%A9%2C%20Barueri%20-%20SP%2C%2006460-040!5e0!3m2!1spt-BR!2sbr!4v1622329388319!5m2!1spt-BR!2sbr" 
                      width="100%" 
                      height="100%" 
                      style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(95%) contrast(90%)', minHeight: '320px' }} 
                      allowFullScreen="" 
                      loading="lazy"
                      title="Mapa de Localização Oficial"
                      className="w-full h-full object-cover"
                    ></iframe>

                    {/* Floating Google Maps Overlay Tooltip */}
                    <div className="absolute top-4 left-4 bg-zinc-950/90 border border-zinc-900 rounded-xl p-4 shadow-[0_20px_40px_rgba(0,0,0,0.85)] max-w-xs text-left backdrop-blur-md z-10">
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
                            <span className="text-[9px] text-zinc-500 font-medium">(79)</span>
                          </div>
                        </div>

                        <a 
                          href="https://www.google.com/maps/dir//Av.+Marcos+Penteado+de+Ulh%C3%B4a+Rodrigues,+1119+-+Tambor%C3%A9,+Barueri+-+SP,+06460-040" 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="w-9 h-9 bg-red-950/20 border border-red-900/30 text-red-500 hover:bg-[#d81d00] hover:text-white rounded-lg flex items-center justify-center transition-all duration-300 shadow-md cursor-pointer flex-shrink-0"
                        >
                          <ArrowUpRight size={16} />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* TAB 4: COMPONENTS */}
          {activeTab === 'components' && (
            <div className="ds-main" style={{ gap: '24px' }}>
              <div className="ds-intro-card">
                <span className="ds-section-tag">Biblioteca de Componentes</span>
                <h2 className="ds-section-title">Cards & Botões Oficiais</h2>
                <p className="ds-section-desc">
                  Estes são os componentes mais importantes e expressivos da identidade digital da Construtora Dubai. Eles unem a rigidez geométrica do concreto com a elegância de interações 3D dinâmicas.
                </p>
              </div>

              {/* 1. Botões Oficiais */}
              <div className="ds-component-row">
                <div className="ds-row-header">
                  <h3 className="ds-row-title">01. Sistema de Botões (Ações Concretas)</h3>
                  <button 
                    onClick={() => setSelectedCode({ title: 'Botão Primário Oficial', code: codeSnippets.btnPrimary })}
                    className="ds-view-code-btn"
                  >
                    <Code className="w-3.5 h-3.5" />
                    <span>Ver Código do Botão</span>
                  </button>
                </div>
                
                <p className="ds-section-desc" style={{ fontSize: '13px' }}>
                  Nossos botões seguem a <strong>Lei dos Cantos Geométricos Rígidos (4px)</strong>. Eles representam blocos estruturais de concreto. O efeito hover ativa um brilho metálico diagonal sutil (Diamond Shine) que simboliza acabamento de luxo.
                </p>

                <div className="ds-showcase-box" style={{ gap: '32px' }}>
                  <div className="ds-button-wrapper">
                    <span style={{ fontSize: '10px', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.1em', marginBottom: '8px', display: 'block' }}>Botão Primário (CTA Principal)</span>
                    <button className="btn-primary !py-3.5 !px-8 !text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                      <span>Explorar Empreendimentos</span>
                      <Zap className="w-4 h-4 fill-white text-white" />
                    </button>
                  </div>

                  <div className="ds-button-wrapper">
                    <span style={{ fontSize: '10px', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.1em', marginBottom: '8px', display: 'block' }}>Botão Secundário (Apoio Visual)</span>
                    <button className="btn-secondary !py-3.5 !px-8 !text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                      <span>Fale com um Corretor</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* 2. Cards de Empreendimentos */}
              <div className="ds-component-row">
                <div className="ds-row-header">
                  <h3 className="ds-row-title">02. Cartões de Empreendimentos (Aspect-Ratio 4:3 & Interactive 3D Tilt)</h3>
                  <button 
                    onClick={() => setSelectedCode({ title: 'Card 3D Tilt Oficial', code: codeSnippets.projectCard })}
                    className="ds-view-code-btn"
                  >
                    <Code className="w-3.5 h-3.5" />
                    <span>Ver Código do Card</span>
                  </button>
                </div>

                <p className="ds-section-desc" style={{ fontSize: '13px' }}>
                  O card de empreendimento é o principal veículo visual dos nossos produtos. Ele utiliza o efeito **Interactive 3D Tilt** que reage dinamicamente aos movimentos do mouse do usuário, aliado a um efeito de brilho metálico escovado.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', width: '100%', marginTop: '12px' }}>
                  {sampleProjects.map((emp) => (
                    <InteractiveTiltCard 
                      key={emp.id} 
                      className="glass-panel rounded overflow-hidden flex flex-col border border-zinc-900/60 relative cursor-pointer hover:-translate-y-2.5 hover:border-[#d81d00]/40 hover:shadow-[0_20px_50px_-10px_rgba(216,29,0,0.15)] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group"
                    >
                      {/* Efeito Brilho e Reflexo de Diamante Premium */}
                      <div className="absolute inset-0 w-full h-full bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-[1500ms] ease-out pointer-events-none z-10" />

                      <div className="relative overflow-hidden aspect-[4/3] bg-zinc-950">
                        <img 
                          src={emp.fotos[0]} 
                          alt={emp.nome} 
                          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-108 transition-all duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                        />
                        <span className="absolute top-4 left-4 bg-black/85 text-[10px] font-bold tracking-widest text-red-500 uppercase px-3 py-1 border border-red-900/40 rounded shadow-md z-20">
                          {emp.statusLabel}
                        </span>
                      </div>

                      <div className="p-6 flex-1 flex flex-col justify-between" style={{ backgroundColor: 'var(--bg-card)', transition: 'background-color 0.5s ease' }}>
                        <div>
                          <div className="flex items-center gap-1 text-zinc-400 text-xs tracking-wider uppercase mb-1">
                            <MapPin size={12} className="text-red-500 group-hover:-translate-y-0.5 transition-transform duration-300" />
                            <span>{emp.bairro}, {emp.cidade}</span>
                          </div>
                          <h3 className="text-xl font-bold text-white uppercase group-hover:text-[#d81d00] transition-colors duration-300 mb-2" style={{ color: 'var(--text-primary)' }}>
                            {emp.nome}
                          </h3>
                          <p className="text-xs text-zinc-400 font-light line-clamp-2 mb-4 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                            {emp.slogan}
                          </p>
                        </div>

                        <div>
                          <hr className="border-zinc-900 group-hover:border-red-900/30 transition-colors duration-500 my-4" />
                          <div className="flex items-center justify-between text-xs text-zinc-400 mb-4" style={{ color: 'var(--text-secondary)' }}>
                            <span className="flex items-center gap-1">
                              <Maximize2 size={12} className="text-red-800" />
                              {emp.area}
                            </span>
                            <span className="flex items-center gap-1">
                              <Building2 size={12} className="text-red-800" />
                              {emp.dormitorios}
                            </span>
                          </div>
                        </div>
                      </div>
                    </InteractiveTiltCard>
                  ))}
                </div>
              </div>

              {/* 3. Cards do Catálogo (Horizontal Layout) */}
              <div className="ds-component-row">
                <div className="ds-row-header">
                  <h3 className="ds-row-title">03. Cartões do Catálogo (Layout Horizontal para Telas Largas)</h3>
                  <button 
                    onClick={() => setSelectedCode({ title: 'Card Horizontal de Empreendimento', code: codeSnippets.catalogCard })}
                    className="ds-view-code-btn"
                  >
                    <Code className="w-3.5 h-3.5" />
                    <span>Ver Código do Card Horizontal</span>
                  </button>
                </div>

                <p className="ds-section-desc" style={{ fontSize: '13px' }}>
                  Este tipo de card é utilizado especificamente na **página de catálogo de empreendimentos (Página Empreendimentos)**. Ele otimiza o espaço horizontal em telas de desktop e notebooks dividindo-se em uma grade (`grid-cols-12`), apresentando a foto do edifício no lado esquerdo (`col-span-6`) e os dados técnicos no lado direito (`col-span-6`).
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', width: '100%', marginTop: '12px' }}>
                  {sampleProjects.slice(0, 2).map((emp) => (
                    <InteractiveTiltCard 
                      key={emp.id + '-horizontal'} 
                      className="glass-panel rounded overflow-hidden grid grid-cols-1 lg:grid-cols-12 border border-zinc-900/60 relative cursor-pointer hover:-translate-y-2 hover:border-[#d81d00]/40 hover:shadow-[0_20px_50px_-10px_rgba(216,29,0,0.15)] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group"
                      style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}
                    >
                      {/* Efeito Brilho e Reflexo de Diamante Premium */}
                      <div className="absolute inset-0 w-full h-full bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-[1500ms] ease-out pointer-events-none z-10" />

                      {/* Lado Esquerdo - Galeria compacta */}
                      <div className="relative aspect-[4/3] bg-zinc-950 overflow-hidden" style={{ minHeight: '260px' }}>
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
                      <div className="p-8 flex flex-col justify-between" style={{ backgroundColor: 'var(--bg-card)', transition: 'background-color 0.5s ease', textAlign: 'left' }}>
                        <div>
                          <div className="flex items-center gap-1 text-zinc-400 text-xs tracking-wider uppercase mb-1">
                            <MapPin size={12} className="text-red-500 group-hover:-translate-y-0.5 transition-transform duration-300" />
                            <span>{emp.bairro}, {emp.cidade}</span>
                          </div>

                          <h2 className="text-2xl font-bold text-white uppercase group-hover:text-[#d81d00] transition-colors mb-3" style={{ color: 'var(--text-primary)' }}>
                            {emp.nome}
                          </h2>

                          <p className="text-xs text-zinc-400 font-light mb-6 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                            {emp.slogan}
                          </p>
                        </div>

                        <div>
                          <hr className="border-zinc-900 group-hover:border-red-900/30 transition-colors duration-500 my-4" />
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="text-xs text-zinc-400 mb-6">
                            <div className="flex items-center gap-2" style={{ color: 'var(--text-secondary)' }}>
                              <Maximize2 size={14} className="text-[#d81d00] group-hover:scale-110 transition-transform duration-300" />
                              <span>Área: <strong>{emp.area}</strong></span>
                            </div>
                            <div className="flex items-center gap-2" style={{ color: 'var(--text-secondary)' }}>
                              <Building2 size={14} className="text-[#d81d00] group-hover:scale-110 transition-transform duration-300" />
                              <span>Dorms: <strong>{emp.dormitorios}</strong></span>
                            </div>
                          </div>

                          <div className="flex gap-4">
                            <button className="flex-1 btn-primary !py-2.5 !text-xs text-center flex items-center justify-center gap-2">
                              <span>Ver Detalhes</span>
                              <ArrowRight size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </InteractiveTiltCard>
                  ))}
                </div>
              </div>

              {/* 4. Explicação Detalhada das Fontes e Títulos */}
              <div className="ds-component-row">
                <div className="ds-row-header">
                  <h3 className="ds-row-title">04. Estilos de Texto & Escala Tipográfica (Outfit Rules)</h3>
                </div>

                <p className="ds-section-desc" style={{ fontSize: '13px' }}>
                  A Construtora Dubai adota a fonte **Outfit** como pilar de sua comunicação tipográfica. A Outfit é uma fonte sem serifa geométrica, inspirada na simplicidade moderna e no rigor estrutural. Abaixo explicamos a hierarquia oficial adotada em todo o projeto:
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%', marginTop: '12px' }} className="glass-panel p-8 rounded-lg">
                  
                  {/* H1 / Hero Titles */}
                  <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '16px' }}>
                    <div style={{ display: 'flex', justifycontent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <span style={{ fontSize: '11px', fontWeight: 'bold', color: 'var(--dubai-red-bright)', textTransform: 'uppercase' }}>Títulos Principais (Hero / Seções)</span>
                      <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'monospace' }}>font-size: 32px | font-weight: 800 | letter-spacing: -0.02em</span>
                    </div>
                    <h1 style={{ fontFamily: 'var(--font-sans)', fontSize: '32px', fontWeight: '800', textTransform: 'uppercase', color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
                      EXCLUSIVIDADE DUBAI
                    </h1>
                    <p style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                      Utilizado nas aberturas de páginas e cabeçalhos principais para transmitir grandeza e imponência corporativa.
                    </p>
                  </div>

                  {/* Subtitle / Subheadings */}
                  <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '16px' }}>
                    <div style={{ display: 'flex', justifycontent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <span style={{ fontSize: '11px', fontWeight: 'bold', color: 'var(--dubai-red-bright)', textTransform: 'uppercase' }}>Subtítulos & Tags Institucionais</span>
                      <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'monospace' }}>font-size: 10px | font-weight: 700 | letter-spacing: 0.15em | uppercase</span>
                    </div>
                    <span style={{ fontFamily: 'var(--font-sans)', fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-primary)', letterSpacing: '0.15em', display: 'block' }}>
                      DUBAI INCORPORAÇÃO E CONSTRUÇÃO
                    </span>
                    <p style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                      Utilizado como tag superior e rótulo institucional. O espaçamento extra-amplo (letter-spacing) evoca o ritmo de blocos organizados e alinhamento milimétrico.
                    </p>
                  </div>

                  {/* H3 / Card Titles */}
                  <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '16px' }}>
                    <div style={{ display: 'flex', justifycontent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <span style={{ fontSize: '11px', fontWeight: 'bold', color: 'var(--dubai-red-bright)', textTransform: 'uppercase' }}>Títulos de Cards & Blocos</span>
                      <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'monospace' }}>font-size: 20px | font-weight: 700 | uppercase</span>
                    </div>
                    <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: '20px', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-primary)' }}>
                      AUTHORIA POR DUBAI
                    </h3>
                    <p style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                      Utilizado nos cartões de empreendimentos. Cantos retos e textos em caixa alta garantem a legibilidade sobre qualquer elemento.
                    </p>
                  </div>

                  {/* Body Text */}
                  <div>
                    <div style={{ display: 'flex', justifycontent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <span style={{ fontSize: '11px', fontWeight: 'bold', color: 'var(--dubai-red-bright)', textTransform: 'uppercase' }}>Texto Corrido (Body Text)</span>
                      <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'monospace' }}>font-size: 13.5px | font-weight: 300 | line-height: 1.6</span>
                    </div>
                    <p style={{ fontFamily: 'var(--font-sans)', fontSize: '13.5px', fontWeight: '300', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                      O website da Dubai foi concebido para refletir os mesmos atributos que definem seus empreendimentos: precisão, confiabilidade, solidez e excelência na entrega. O visitante deve perceber imediatamente que está diante de uma incorporadora premium.
                    </p>
                    <p style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                      Adota peso extra-leve (300) com altura de linha espaçosa para garantir um "respiro visual" ideal e leitura relaxada, evitando poluição de informações.
                    </p>
                  </div>

                </div>
              </div>

            </div>
          )}

          {/* TAB 5: FORMS AND FIELDS */}
          {activeTab === 'forms' && (
            <div className="ds-main" style={{ gap: '24px' }}>
              <div className="ds-intro-card">
                <span className="ds-section-tag">Campos e Interação</span>
                <h2 className="ds-section-title">Formulários & Inputs Regulamentados</h2>
                <p className="ds-section-desc">
                  Diretrizes visuais para caixas de texto, seletores de segmento e campos de mensagens. Todos os formulários seguem a lógica de "respiro visual" e cantos de 12px (rounded-xl) para preservar a sofisticação dos nossos empreendimentos.
                </p>
              </div>

              {/* Form guidelines card */}
              <div className="ds-component-row">
                <div className="ds-row-header">
                  <h3 className="ds-row-title">01. Especificação de Design do Formulário</h3>
                  <button 
                    onClick={() => setSelectedCode({ title: 'Inputs e Classes CSS', code: codeSnippets.inputs })}
                    className="ds-view-code-btn"
                  >
                    <Code className="w-3.5 h-3.5" />
                    <span>Ver Código dos Inputs</span>
                  </button>
                </div>

                <div className="ds-flex-row" style={{ gap: '32px' }}>
                  {/* Explicação de Especificação */}
                  <div className="ds-gradient-card" style={{ justifyContent: 'center' }}>
                    <h4 style={{ fontSize: '14px', fontweight: 'bold', color: 'var(--text-primary)' }}>Leis de Construção de Formulários</h4>
                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '8.5px', marginTop: '12px' }}>
                      <span>• <strong>Estilo de Cantos (12px / rounded-xl):</strong> Diferente dos botões, os campos de entrada de dados adotam cantos arredondados de 12px para criar uma sensação acolhedora e moderna de usabilidade tátil.</span>
                      <span>• <strong>Foco Ativo (Focus Border):</strong> Quando o usuário clica em um campo, a borda acende suavemente com <code>var(--dubai-red-bright)</code> e adiciona um anel de foco de 1px.</span>
                      <span>• <strong>Estrutura de Linha (Side-by-Side):</strong> Os campos de e-mail e telefone celular são agrupados horizontalmente para otimizar o espaço visual do usuário.</span>
                    </div>
                  </div>

                  {/* Segment Switches from main contact */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', justifycontent: 'center' }}>
                    <div className="ds-slider-group">
                      <label style={{ fontSize: '10px', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.1em' }}>Rótulo / Tag do Segmento do Lead</label>
                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '4px' }}>
                        {['cliente', 'vizinho', 'corretor'].map((seg) => (
                          <button
                            key={seg}
                            onClick={() => setContactSegment(seg)}
                            style={{
                              background: contactSegment === seg ? 'var(--dubai-gradient)' : 'transparent',
                              border: '1px solid',
                              borderColor: contactSegment === seg ? 'transparent' : 'var(--border-color)',
                              color: contactSegment === seg ? '#fff' : 'var(--text-secondary)',
                              padding: '8px 16px',
                              fontSize: '11px',
                              fontWeight: '600',
                              textTransform: 'uppercase',
                              borderRadius: '4px',
                              cursor: 'pointer',
                              transition: 'all 0.3s ease'
                            }}
                          >
                            {seg}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Complete mock form */}
              <div className="ds-component-row">
                <div className="ds-row-header">
                  <h3 className="ds-row-title">02. Simulador Interativo do Formulário Premium Oficial (100% Responsivo)</h3>
                </div>
                <div style={{ maxWidth: '480px', margin: '0 auto', width: '100%' }}>
                  <div className="border border-zinc-800/80 hover:border-red-950/20 rounded-3xl bg-zinc-950/90 backdrop-blur-2xl p-8 shadow-[0_25px_60px_rgba(0,0,0,0.95)] relative text-left transition-all duration-500 group/form">
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-6 leading-tight tracking-wide font-sans">
                      Fale com um de nossos especialistas!
                    </h3>
                    
                    <div className="flex flex-col gap-4">
                      {/* Nome */}
                      <div>
                        <input 
                          type="text" 
                          placeholder="Informe seu nome"
                          className="w-full bg-zinc-900/80 border border-zinc-800/80 text-white placeholder-zinc-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#d81d00] focus:ring-1 focus:ring-[#d81d00] transition-all duration-300"
                        />
                      </div>

                      {/* Email & Phone side-by-side */}
                      <div style={{ display: 'grid', gridTemplateColumns: '7fr 5fr', gap: '16px' }}>
                        <div>
                          <input 
                            type="email" 
                            placeholder="Informe seu email"
                            className="w-full bg-zinc-900/80 border border-zinc-800/80 text-white placeholder-zinc-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#d81d00] focus:ring-1 focus:ring-[#d81d00] transition-all duration-300"
                          />
                        </div>
                        <div>
                          <input 
                            type="tel" 
                            placeholder="Celular"
                            className="w-full bg-zinc-900/80 border border-zinc-800/80 text-white placeholder-zinc-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#d81d00] focus:ring-1 focus:ring-[#d81d00] transition-all duration-300"
                          />
                        </div>
                      </div>

                      {/* Dropdown: Selecione o Empreendimento */}
                      <div>
                        <select 
                          className="w-full bg-zinc-900/80 border border-zinc-800/80 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#d81d00] focus:ring-1 focus:ring-[#d81d00] cursor-pointer appearance-none transition-all duration-300"
                          style={{ backgroundImage: 'url("data:image/svg+xml,%3csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 20 20\'%3e%3cpath stroke=\'%23a1a1aa\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'1.5\' d=\'M6 8l4 4 4-4\'/%3e%3c/svg%3e")', backgroundPosition: 'right 16px center', backgroundSize: '1.2em', backgroundRepeat: 'no-repeat' }}
                        >
                          <option value="" disabled selected>Selecione o empreendimento</option>
                          {sampleProjects.map((emp) => (
                            <option key={emp.id} value={emp.id}>{emp.nome}</option>
                          ))}
                        </select>
                      </div>

                      {/* Mensagem */}
                      <div>
                        <textarea 
                          rows="3"
                          placeholder="Mensagem"
                          className="w-full bg-zinc-900/80 border border-zinc-800/80 text-white placeholder-zinc-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#d81d00] focus:ring-1 focus:ring-[#d81d00] transition-all duration-300 resize-none"
                        ></textarea>
                      </div>

                      {/* Checkbox 1 */}
                      <div className="flex items-start gap-2.5 mt-2">
                        <div 
                          className="w-4 h-4 rounded border flex items-center justify-center cursor-pointer transition-all duration-200 mt-0.5 flex-shrink-0"
                          style={{
                            borderColor: '#d81d00',
                            backgroundColor: '#d81d00'
                          }}
                        >
                          <span className="text-[10px] text-white font-black select-none">✓</span>
                        </div>
                        <label className="text-[10px] text-zinc-400 leading-normal cursor-pointer text-left font-light select-none">
                          Declaro que li e aceito os termos da <span className="underline text-red-500 hover:text-red-400 transition-colors cursor-pointer">Política de Privacidade</span> da Dubai Incorporação e Construção.
                        </label>
                      </div>

                      <button className="btn-primary !py-3 !px-8 !text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer h-[46px] shadow-lg w-full">
                        <Zap className="w-4 h-4 fill-white text-white" />
                        <span>Enviar Mensagem</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: SANDBOX AND SPOTLIGHT */}
          {activeTab === 'sandbox' && (
            <div className="ds-main">
              <div className="ds-intro-card">
                <span className="ds-section-tag">Visual Rigor Elements</span>
                <h2 className="ds-section-title">Efeitos Ambientais & Projeções Oficiais</h2>
                <p className="ds-section-desc">
                  Diretrizes dinâmicas dos elementos que constituem a atmosfera imersiva e de alto luxo do site.
                </p>
              </div>

              {/* Spotlight control sandbox */}
              <div className="ds-component-row">
                <div className="ds-row-header">
                  <h3 className="ds-row-title">01. O Refletor Físico Interativo (Spotlight Switch)</h3>
                  <button 
                    onClick={() => setSelectedCode({ title: 'Holofote Construtora Dubai', code: codeSnippets.spotlight })}
                    className="ds-view-code-btn"
                  >
                    <Code className="w-3.5 h-3.5" />
                    <span>Ver Código</span>
                  </button>
                </div>

                <div className="ds-physics-box" style={{ position: 'relative', overflow: 'hidden', minHeight: '380px' }}>
                  
                  {/* Ambient dim overlay */}
                  <div style={{ position: 'absolute', inset: 0, backgroundColor: isSpotlightActive ? 'rgba(0,0,0,0.45)' : 'transparent', transition: 'background-color 0.8s ease', zIndex: 1 }}></div>

                  {/* Primary wide spotlight beam */}
                  <div 
                    style={{
                      position: 'absolute',
                      top: '10%',
                      left: '50%',
                      width: '450px',
                      height: '350px',
                      background: 'linear-gradient(to bottom, rgba(255, 220, 180, 0.28) 0%, rgba(216, 29, 0, 0.08) 40%, transparent 100%)',
                      clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                      filter: 'blur(30px)',
                      transformOrigin: 'top center',
                      transform: isSpotlightActive ? 'translateX(-50%) rotate(-72deg)' : 'translateX(-50%) rotate(-15deg)',
                      transition: 'opacity 1.0s cubic-bezier(0.16, 1, 0.3, 1), transform 1.0s cubic-bezier(0.16, 1, 0.3, 1)',
                      opacity: isSpotlightActive ? 1 : 0,
                      zIndex: 2
                    }}
                  ></div>

                  {/* Core intense spotlight beam */}
                  <div 
                    style={{
                      position: 'absolute',
                      top: '10%',
                      left: '50%',
                      width: '180px',
                      height: '300px',
                      background: 'linear-gradient(to bottom, rgba(255, 235, 200, 0.22) 0%, rgba(216, 29, 0, 0.09) 50%, transparent 100%)',
                      clipPath: 'polygon(50% 0%, 15% 100%, 85% 100%)',
                      filter: 'blur(15px)',
                      transformOrigin: 'top center',
                      transform: isSpotlightActive ? 'translateX(-50%) rotate(-72deg)' : 'translateX(-50%) rotate(-15deg)',
                      transition: 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                      opacity: isSpotlightActive ? 0.7 : 0,
                      zIndex: 3
                    }}
                  ></div>

                  {/* Switch button */}
                  <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                    <button 
                      onClick={() => setIsSpotlightActive(prev => !prev)}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'transform 0.3s ease'
                      }}
                      className="hover:scale-110 active:scale-95"
                    >
                      <svg 
                        width="60" 
                        height="66" 
                        viewBox="0 0 52 58.296"
                        style={{
                          transform: isSpotlightActive ? 'rotate(180deg)' : 'rotate(0deg)',
                          transition: 'transform 0.8s ease'
                        }}
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

                    <div style={{ textAlign: 'center' }}>
                      <span style={{ fontSize: '11px', uppercase: 'true', fontWeight: 'bold', tracking: '0.1em', display: 'block', color: isSpotlightActive ? 'var(--dubai-red-bright)' : 'var(--text-secondary)' }}>
                        {isSpotlightActive ? 'REFLETOR ATIVO (WARM GOLD CORE)' : 'REFLETOR DESATIVADO'}
                      </span>
                      <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px', maxWidth: '280px' }}>
                        Clique no logotipo da Dubai acima para alternar a projeção da luz física de alta sofisticação.
                      </p>
                    </div>
                  </div>

                </div>
              </div>

              {/* Diretrizes de Iluminação Monumental e Filosofia */}
              <div className="ds-component-row">
                <div className="ds-row-header">
                  <h3 className="ds-row-title">02. Diretrizes Conceituais de Iluminação e Filosofia de Marca (Brazilian Portuguese Premium)</h3>
                </div>

                <div className="ds-concept-grid" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
                  
                  {/* Card 1 */}
                  <div className="ds-concept-card" style={{ borderLeftColor: 'var(--dubai-red-bright)' }}>
                    <h4 className="ds-concept-header">💡 A Metáfora da Luz na Arquitetura de Alto Padrão (Iluminação Monumental)</h4>
                    <p className="ds-concept-body" style={{ fontSize: '13px', lineHeight: '1.6' }}>
                      Na arquitetura física de luxo, <strong>a luz é uma matéria-prima construtiva</strong>. Um empreendimento premium não é apenas erguido com concreto e aço; ele é revelado ao mundo através da iluminação planejada. À noite, a volumetria, os balanços das lajes, os recuos e as texturas dos mármores importados só ganham vida e monumentalidade porque existem refletores estrategicamente posicionados que direcionam o olhar do espectador.
                    </p>
                    <p className="ds-concept-body" style={{ fontSize: '13px', lineHeight: '1.6', marginTop: '10px' }}>
                      No ambiente digital, aplicamos exatamente a mesma lógica do <strong>"Luxo Silencioso" (Quiet Luxury)</strong>:
                      O cenário perfeitamente neutro e imponente do Preto Absoluto contrasta com o feixe de luz âmbar aquecido projetado de forma cirúrgica, direcionando a atenção do investidor para os ativos mais valiosos da incorporadora.
                    </p>
                  </div>

                  {/* Card 2 */}
                  <div className="ds-concept-card" style={{ borderLeftColor: 'var(--dubai-red-bright)' }}>
                    <h4 className="ds-concept-header">📐 O Rigor Matemático e Físico da Luz (A Transição Angular e Duplo Núcleo)</h4>
                    <p className="ds-concept-body" style={{ fontSize: '13px', lineHeight: '1.6' }}>
                      A luz na natureza não é estática e obedece a leis físicas. A variação implementada no site oficial traz a física de transição volumétrica:
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8.5px', marginTop: '10px', fontSize: '12.5px', color: 'var(--text-secondary)' }}>
                      <span>• <strong>Transição de Ângulo Dinâmico:</strong> Quando o refletor é ativado, o feixe de luz realiza um movimento de varredura física, rotacionando suavemente de uma inclinação de repouso de -15° até atingir o ângulo exato de projeção arquitetônica de -72° com duração de 1.0s (cubic-bezier).</span>
                      <span>• <strong>Volumetria de Duplo Feixe:</strong> Composto por um Feixe Primário Difuso (Soft Glow com 450px e blur de 30px) e um Núcleo de Alta Intensidade (Intense Core com 180px e blur de 15px) simulando o núcleo real superaquecido do refletor de vapor metálico.</span>
                    </div>
                  </div>

                  {/* Card 3 */}
                  <div className="ds-concept-card" style={{ borderLeftColor: 'var(--dubai-red-bright)' }}>
                    <h4 className="ds-concept-header">🔷 O Gatilho Geométrico e o Logotipo Isométrico (Rigor Técnico e Planta)</h4>
                    <p className="ds-concept-body" style={{ fontSize: '13px', lineHeight: '1.6' }}>
                      O botão que controla essa atmosfera é o próprio logotipo tridimensional isométrico da Construtora Dubai, construído de forma limpa sem preenchimento sólido, simulando os traços de um projeto executivo de planta técnica.
                    </p>
                    <p className="ds-concept-body" style={{ fontSize: '13px', lineHeight: '1.6', marginTop: '10px' }}>
                      Ao clicar no logotipo, ele rotaciona fisicamente e acende no vermelho assinatura da Dubai (#fc1600), demonstrando ao cliente que a construtora detém o controle milimétrico e tecnológico sobre o ambiente.
                    </p>
                  </div>

                </div>
              </div>

            </div>
          )}

        </main>
      </div>

      {/* Code Drawer/Modal Overlay */}
      {selectedCode && (
        <div className="ds-modal-backdrop" onClick={() => setSelectedCode(null)}>
          <div className="ds-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="ds-modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Code className="w-4 h-4 text-[#d81d00]" />
                <h3 style={{ fontSize: '13px', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-primary)', letterSpacing: '0.05em' }}>{selectedCode.title}</h3>
              </div>
              <button 
                onClick={() => setSelectedCode(null)}
                style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', fontSize: '11px', textTransform: 'uppercase', fontWeight: '600', cursor: 'pointer' }}
              >
                Fechar
              </button>
            </div>

            <div className="ds-modal-body">
              <pre className="ds-code-pre" style={{ maxHeight: '420px' }}>
                {selectedCode.code}
              </pre>
              
              <button 
                onClick={() => showToast(selectedCode.code, 'drawer-copy')}
                className="ds-modal-copy-btn"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Copiar Código</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Luxury Footer */}
      <footer style={{ borderTop: '1px solid var(--border-color)', marginTop: '80px', background: 'var(--bg-card)', transition: 'background-color 0.5s ease' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '32px 24px', display: 'flex', justifycontent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', fontSize: '12px', color: 'var(--text-muted)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <svg width="20" height="20" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
              <path d="M30 2 L58 16 L58 44 L30 58 L2 44 L2 16 Z" fill="none" stroke="var(--text-muted)" strokeWidth="3" />
            </svg>
            <span>&copy; {new Date().getFullYear()} Construtora Dubai. Todos os direitos reservados.</span>
          </div>
          <div>
            <span style={{ textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--dubai-red-bright)', fontWeight: '600' }}>Exclusividade & Elegância</span>
          </div>
        </div>
      </footer>

      {/* Copy notification Toast */}
      {toastVisible && (
        <div className="copy-toast">
          <Check className="w-4 h-4 text-emerald-500" />
          <span style={{ fontSize: '12px', fontWeight: '500' }}>Código copiado para a área de transferência!</span>
        </div>
      )}

    </div>
  );
}
