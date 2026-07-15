const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '../Dubai site 2');

// 1. Create d-concept.html using contato.html as a template
const contatoPath = path.join(srcDir, 'contato.html');
const dconceptPath = path.join(srcDir, 'd-concept.html');

if (!fs.existsSync(contatoPath)) {
  console.error("Error: contato.html not found");
  process.exit(1);
}

let contatoHtml = fs.readFileSync(contatoPath, 'utf8');

// Define the custom main content for d.concept page
const dconceptMainContent = `
<main class="flex-1 relative z-10 bg-[#090909]">
  <div class="pt-32 pb-24 relative bg-[#090909] text-white">
    <!-- Grid de background para riqueza estética -->
    <div class="absolute inset-0 opacity-[0.05] pointer-events-none pattern-grid z-0" style="background-image: linear-gradient(rgba(216, 29, 0, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(216, 29, 0, 0.1) 1px, transparent 1px); background-size: 40px 40px;"></div>

    <div class="max-w-6xl mx-auto px-6 relative z-10">
      
      <!-- Botão Voltar -->
      <a href="index.html" class="flex items-center gap-2 text-xs uppercase tracking-widest text-[#d81d00] font-bold hover:translate-x-[-4px] transition-transform duration-300 mb-8 inline-flex">
        &larr; Voltar para o início
      </a>

      <!-- Cabeçalho da Página -->
      <div class="space-y-4 mb-16 text-center lg:text-left">
        <span class="text-[10px] font-bold tracking-[0.35em] text-[#d81d00] uppercase block">
          Dubai Construtora & Incorporadora
        </span>
        <h1 class="text-3xl lg:text-5xl font-extrabold uppercase tracking-tight font-display text-white">
          d.concept
        </h1>
        <p class="text-sm font-light max-w-2xl leading-relaxed text-zinc-400">
          Personalização Inteligente de Alto Padrão. Sua residência suspensa exatamente do seu jeito, antes mesmo de receber as chaves.
        </p>
      </div>

      <!-- Imagem de Destaque / Banner -->
      <div class="mb-20 rounded-2xl overflow-hidden border border-zinc-800 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
        <img 
          src="assets/dconcept-hero.jpg" 
          alt="d.concept Hero" 
          class="w-full h-[400px] object-cover"
        />
      </div>

      <!-- Seção 1: Grid de Vantagens -->
      <div class="mb-24">
        <h2 class="text-2xl font-bold uppercase tracking-wider mb-10 text-center lg:text-left text-white">
          Diferenciais e Vantagens
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <!-- Card 1 -->
          <div class="glass-panel p-6 rounded-xl border border-zinc-800 bg-zinc-950/40 transition-all duration-300 hover:border-[#d81d00]/50 hover:shadow-[0_0_15px_rgba(216,29,0,0.15)]">
            <div class="w-8 h-8 rounded-full bg-[#d81d00]/10 flex items-center justify-center text-[#d81d00] font-bold text-xs mb-4">1</div>
            <h4 class="text-sm font-bold uppercase tracking-wider mb-2 text-white">Assessoria de arquitetura</h4>
            <p class="text-xs font-light leading-relaxed text-zinc-400">Nossa equipe de arquitetos auxiliará gratuitamente durante todas as etapas do processo.</p>
          </div>
          <!-- Card 2 -->
          <div class="glass-panel p-6 rounded-xl border border-zinc-800 bg-zinc-950/40 transition-all duration-300 hover:border-[#d81d00]/50 hover:shadow-[0_0_15px_rgba(216,29,0,0.15)]">
            <div class="w-8 h-8 rounded-full bg-[#d81d00]/10 flex items-center justify-center text-[#d81d00] font-bold text-xs mb-4">2</div>
            <h4 class="text-sm font-bold uppercase tracking-wider mb-2 text-white">Comodidade</h4>
            <p class="text-xs font-light leading-relaxed text-zinc-400">Todos os itens contratados são gerenciados pela própria Dubai, deixando você livre dos aborrecimentos de uma obra.</p>
          </div>
          <!-- Card 3 -->
          <div class="glass-panel p-6 rounded-xl border border-zinc-800 bg-zinc-950/40 transition-all duration-300 hover:border-[#d81d00]/50 hover:shadow-[0_0_15px_rgba(216,29,0,0.15)]">
            <div class="w-8 h-8 rounded-full bg-[#d81d00]/10 flex items-center justify-center text-[#d81d00] font-bold text-xs mb-4">3</div>
            <h4 class="text-sm font-bold uppercase tracking-wider mb-2 text-white">Qualidade total</h4>
            <p class="text-xs font-light leading-relaxed text-zinc-400">O time de especialistas d.concept garante os melhores produtos e acabamentos de alto padrão.</p>
          </div>
          <!-- Card 4 -->
          <div class="glass-panel p-6 rounded-xl border border-zinc-800 bg-zinc-950/40 transition-all duration-300 hover:border-[#d81d00]/50 hover:shadow-[0_0_15px_rgba(216,29,0,0.15)]">
            <div class="w-8 h-8 rounded-full bg-[#d81d00]/10 flex items-center justify-center text-[#d81d00] font-bold text-xs mb-4">4</div>
            <h4 class="text-sm font-bold uppercase tracking-wider mb-2 text-white">Pagamento facilitado</h4>
            <p class="text-xs font-light leading-relaxed text-zinc-400">Melhores opções de pagamento integradas ao fluxo financeiro da sua obra.</p>
          </div>
          <!-- Card 5 -->
          <div class="glass-panel p-6 rounded-xl border border-zinc-800 bg-zinc-950/40 transition-all duration-300 hover:border-[#d81d00]/50 hover:shadow-[0_0_15px_rgba(216,29,0,0.15)]">
            <div class="w-8 h-8 rounded-full bg-[#d81d00]/10 flex items-center justify-center text-[#d81d00] font-bold text-xs mb-4">5</div>
            <h4 class="text-sm font-bold uppercase tracking-wider mb-2 text-white">Agilidade para mudar</h4>
            <p class="text-xs font-light leading-relaxed text-zinc-400">Todos os itens contratados serão entregues instalados, reduzindo substancialmente o tempo da mudança.</p>
          </div>
          <!-- Card 6 -->
          <div class="glass-panel p-6 rounded-xl border border-zinc-800 bg-zinc-950/40 transition-all duration-300 hover:border-[#d81d00]/50 hover:shadow-[0_0_15px_rgba(216,29,0,0.15)]">
            <div class="w-8 h-8 rounded-full bg-[#d81d00]/10 flex items-center justify-center text-[#d81d00] font-bold text-xs mb-4">6</div>
            <h4 class="text-sm font-bold uppercase tracking-wider mb-2 text-white">Garantia</h4>
            <p class="text-xs font-light leading-relaxed text-zinc-400">As garantias de alto padrão do imóvel são mantidas integralmente sem perda de cobertura.</p>
          </div>
        </div>
      </div>

      <!-- Seção 2: Fases Interativas -->
      <div class="mb-24">
        <h2 class="text-2xl font-bold uppercase tracking-wider mb-10 text-center lg:text-left text-white">
          Cronograma de Personalização
        </h2>
        
        <!-- Seletor de Abas -->
        <div class="flex justify-center lg:justify-start gap-4 mb-10">
          <button 
            id="btn-fase1"
            onclick="showFase(1)"
            class="px-6 py-3 rounded-lg text-xs uppercase font-bold tracking-widest transition-all duration-300 border bg-[#d81d00] border-[#d81d00] text-white"
          >
            Fase 1: Início da Obra
          </button>
          <button 
            id="btn-fase2"
            onclick="showFase(2)"
            class="px-6 py-3 rounded-lg text-xs uppercase font-bold tracking-widest transition-all duration-300 border border-zinc-800 hover:bg-zinc-900 text-zinc-400"
          >
            Fase 2: Acabamentos Finais
          </button>
        </div>

        <!-- Conteúdo da Aba -->
        <div class="glass-panel p-8 rounded-2xl border border-zinc-800 bg-zinc-950/20 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div class="lg:col-span-7 space-y-6">
            <!-- Fase 1 Block -->
            <div id="content-fase1" class="space-y-6">
              <h3 class="text-xl font-bold uppercase tracking-wider text-[#d81d00]">Fase 1: Viva sua exclusividade</h3>
              <p class="text-sm font-light leading-relaxed text-zinc-400 font-light">
                A fase 1 acontece nos primeiros meses da obra. O cliente tem a comodidade de escolher entre as opções de plantas disponíveis e até mesclá-las, além de poder escolher entre uma grande variedade de acabamentos que seguem as últimas tendências, com variedade de tamanhos, texturas e cores.
              </p>
              <div class="grid grid-cols-2 gap-4 pt-4">
                <div class="flex items-center gap-2">
                  <div class="w-1.5 h-1.5 rounded-full bg-[#d81d00]"></div>
                  <span class="text-xs uppercase font-semibold tracking-wide text-white">Metais</span>
                </div>
                <div class="flex items-center gap-2">
                  <div class="w-1.5 h-1.5 rounded-full bg-[#d81d00]"></div>
                  <span class="text-xs uppercase font-semibold tracking-wide text-white">Cubas</span>
                </div>
                <div class="flex items-center gap-2">
                  <div class="w-1.5 h-1.5 rounded-full bg-[#d81d00]"></div>
                  <span class="text-xs uppercase font-semibold tracking-wide text-white">Bancadas</span>
                </div>
                <div class="flex items-center gap-2">
                  <div class="w-1.5 h-1.5 rounded-full bg-[#d81d00]"></div>
                  <span class="text-xs uppercase font-semibold tracking-wide text-white">Bacias sanitárias</span>
                </div>
              </div>
            </div>
            <!-- Fase 2 Block (Hidden by default) -->
            <div id="content-fase2" class="space-y-6 hidden">
              <h3 class="text-xl font-bold uppercase tracking-wider text-[#d81d00]">Fase 2: Sua casa ainda mais completa</h3>
              <p class="text-sm font-light leading-relaxed text-zinc-400 font-light">
                A fase 2 acontece alguns meses antes da entrega do empreendimento. São oferecidas opções de móveis planejados, pisos, forro de gesso e iluminação, box, espelhos, revestimentos decorativos e muito mais. Tudo isso coordenado pela nossa equipe. Sem dor de cabeça e gastos não planejados.
              </p>
              <div class="grid grid-cols-2 gap-4 pt-4">
                <div class="flex items-center gap-2">
                  <div class="w-1.5 h-1.5 rounded-full bg-[#d81d00]"></div>
                  <span class="text-xs uppercase font-semibold tracking-wide text-white">Móveis planejados</span>
                </div>
                <div class="flex items-center gap-2">
                  <div class="w-1.5 h-1.5 rounded-full bg-[#d81d00]"></div>
                  <span class="text-xs uppercase font-semibold tracking-wide text-white">Iluminação</span>
                </div>
                <div class="flex items-center gap-2">
                  <div class="w-1.5 h-1.5 rounded-full bg-[#d81d00]"></div>
                  <span class="text-xs uppercase font-semibold tracking-wide text-white">Pisos de madeira</span>
                </div>
                <div class="flex items-center gap-2">
                  <div class="w-1.5 h-1.5 rounded-full bg-[#d81d00]"></div>
                  <span class="text-xs uppercase font-semibold tracking-wide text-white">Box</span>
                </div>
                <div class="flex items-center gap-2">
                  <div class="w-1.5 h-1.5 rounded-full bg-[#d81d00]"></div>
                  <span class="text-xs uppercase font-semibold tracking-wide text-white">Ar Condicionado</span>
                </div>
                <div class="flex items-center gap-2">
                  <div class="w-1.5 h-1.5 rounded-full bg-[#d81d00]"></div>
                  <span class="text-xs uppercase font-semibold tracking-wide text-white">Fechamento de varanda</span>
                </div>
              </div>
            </div>
          </div>
          <div class="lg:col-span-5">
            <div class="rounded-xl overflow-hidden border border-zinc-800/40">
              <img 
                id="fase-img"
                src="assets/dconcept-fase1.jpg" 
                alt="Fase 1" 
                class="w-full h-[250px] object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Seção 3: Galeria de Ambientes -->
      <div>
        <h2 class="text-2xl font-bold uppercase tracking-wider mb-4 text-center lg:text-left text-white">
          Inspiração de Ambientes
        </h2>
        <p class="text-sm font-light leading-relaxed mb-10 text-center lg:text-left text-zinc-400">
          Explore fotos reais de projetos executados que exemplificam as possibilidades de personalização do programa d.concept.
        </p>

        <!-- Filtro de Ambientes -->
        <div class="flex flex-wrap justify-center lg:justify-start gap-2 mb-10">
          <button onclick="filterAmbiente('Todos', this)" class="filter-btn px-4 py-2 rounded-full text-[10px] uppercase font-bold tracking-widest transition-all duration-300 border bg-[#d81d00] border-[#d81d00] text-white">Todos</button>
          <button onclick="filterAmbiente('Cozinha', this)" class="filter-btn px-4 py-2 rounded-full text-[10px] uppercase font-bold tracking-widest transition-all duration-300 border border-zinc-800 text-zinc-400 hover:bg-zinc-900 bg-zinc-950/40">Cozinha</button>
          <button onclick="filterAmbiente('Dormitório', this)" class="filter-btn px-4 py-2 rounded-full text-[10px] uppercase font-bold tracking-widest transition-all duration-300 border border-zinc-800 text-zinc-400 hover:bg-zinc-900 bg-zinc-950/40">Dormitório</button>
          <button onclick="filterAmbiente('Home Office', this)" class="filter-btn px-4 py-2 rounded-full text-[10px] uppercase font-bold tracking-widest transition-all duration-300 border border-zinc-800 text-zinc-400 hover:bg-zinc-900 bg-zinc-950/40">Home Office</button>
          <button onclick="filterAmbiente('Banheiro', this)" class="filter-btn px-4 py-2 rounded-full text-[10px] uppercase font-bold tracking-widest transition-all duration-300 border border-zinc-800 text-zinc-400 hover:bg-zinc-900 bg-zinc-950/40">Banheiro</button>
          <button onclick="filterAmbiente('Sala', this)" class="filter-btn px-4 py-2 rounded-full text-[10px] uppercase font-bold tracking-widest transition-all duration-300 border border-zinc-800 text-zinc-400 hover:bg-zinc-900 bg-zinc-950/40">Sala</button>
          <button onclick="filterAmbiente('Closet', this)" class="filter-btn px-4 py-2 rounded-full text-[10px] uppercase font-bold tracking-widest transition-all duration-300 border border-zinc-800 text-zinc-400 hover:bg-zinc-900 bg-zinc-950/40">Closet</button>
        </div>

        <!-- Grid da Galeria -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <!-- Card Cozinha -->
          <div class="gallery-card group relative rounded-xl overflow-hidden border border-zinc-850 bg-zinc-950/20" data-cat="Cozinha">
            <div class="overflow-hidden h-[300px]">
              <img src="assets/dconcept-cozinha.jpg" alt="Cozinha" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            </div>
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90"></div>
            <div class="absolute bottom-0 left-0 w-full p-6 text-left">
              <span class="text-[9px] font-bold uppercase tracking-widest text-[#d81d00] bg-[#d81d00]/10 px-2 py-1 rounded-sm">Cozinha</span>
              <h4 class="text-sm font-bold uppercase tracking-wider text-white mt-3">Cozinha d.concept Premium</h4>
            </div>
          </div>
          <!-- Card Dormitório -->
          <div class="gallery-card group relative rounded-xl overflow-hidden border border-zinc-850 bg-zinc-950/20" data-cat="Dormitório">
            <div class="overflow-hidden h-[300px]">
              <img src="assets/dconcept-quarto.jpg" alt="Dormitório" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            </div>
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90"></div>
            <div class="absolute bottom-0 left-0 w-full p-6 text-left">
              <span class="text-[9px] font-bold uppercase tracking-widest text-[#d81d00] bg-[#d81d00]/10 px-2 py-1 rounded-sm">Dormitório</span>
              <h4 class="text-sm font-bold uppercase tracking-wider text-white mt-3">Suíte Master com Iluminação Integrada</h4>
            </div>
          </div>
          <!-- Card Home Office -->
          <div class="gallery-card group relative rounded-xl overflow-hidden border border-zinc-850 bg-zinc-950/20" data-cat="Home Office">
            <div class="overflow-hidden h-[300px]">
              <img src="assets/dconcept-office.jpg" alt="Home Office" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            </div>
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90"></div>
            <div class="absolute bottom-0 left-0 w-full p-6 text-left">
              <span class="text-[9px] font-bold uppercase tracking-widest text-[#d81d00] bg-[#d81d00]/10 px-2 py-1 rounded-sm">Home Office</span>
              <h4 class="text-sm font-bold uppercase tracking-wider text-white mt-3">Escritório Minimalista Planejado</h4>
            </div>
          </div>
          <!-- Card Banheiro -->
          <div class="gallery-card group relative rounded-xl overflow-hidden border border-zinc-850 bg-zinc-950/20" data-cat="Banheiro">
            <div class="overflow-hidden h-[300px]">
              <img src="assets/dconcept-banheiro.jpg" alt="Banheiro" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            </div>
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90"></div>
            <div class="absolute bottom-0 left-0 w-full p-6 text-left">
              <span class="text-[9px] font-bold uppercase tracking-widest text-[#d81d00] bg-[#d81d00]/10 px-2 py-1 rounded-sm">Banheiro</span>
              <h4 class="text-sm font-bold uppercase tracking-wider text-white mt-3">Banheiro Spa em Mármore</h4>
            </div>
          </div>
          <!-- Card Sala -->
          <div class="gallery-card group relative rounded-xl overflow-hidden border border-zinc-850 bg-zinc-950/20" data-cat="Sala">
            <div class="overflow-hidden h-[300px]">
              <img src="assets/dconcept-sala.jpg" alt="Sala" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            </div>
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90"></div>
            <div class="absolute bottom-0 left-0 w-full p-6 text-left">
              <span class="text-[9px] font-bold uppercase tracking-widest text-[#d81d00] bg-[#d81d00]/10 px-2 py-1 rounded-sm">Sala</span>
              <h4 class="text-sm font-bold uppercase tracking-wider text-white mt-3">Living Room Contemporâneo</h4>
            </div>
          </div>
          <!-- Card Closet -->
          <div class="gallery-card group relative rounded-xl overflow-hidden border border-zinc-850 bg-zinc-950/20" data-cat="Closet">
            <div class="overflow-hidden h-[300px]">
              <img src="assets/dconcept-closet.jpg" alt="Closet" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            </div>
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90"></div>
            <div class="absolute bottom-0 left-0 w-full p-6 text-left">
              <span class="text-[9px] font-bold uppercase tracking-widest text-[#d81d00] bg-[#d81d00]/10 px-2 py-1 rounded-sm">Closet</span>
              <h4 class="text-sm font-bold uppercase tracking-wider text-white mt-3">Walk-in Closet Sob Medida</h4>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</main>

<script>
  function showFase(num) {
    const btn1 = document.getElementById('btn-fase1');
    const btn2 = document.getElementById('btn-fase2');
    const content1 = document.getElementById('content-fase1');
    const content2 = document.getElementById('content-fase2');
    const img = document.getElementById('fase-img');
    
    if (num === 1) {
      btn1.className = 'px-6 py-3 rounded-lg text-xs uppercase font-bold tracking-widest transition-all duration-300 border bg-[#d81d00] border-[#d81d00] text-white';
      btn2.className = 'px-6 py-3 rounded-lg text-xs uppercase font-bold tracking-widest transition-all duration-300 border border-zinc-800 hover:bg-zinc-900 text-zinc-400';
      content1.classList.remove('hidden');
      content2.classList.add('hidden');
      img.src = 'assets/dconcept-fase1.jpg';
      img.alt = 'Fase 1';
    } else {
      btn1.className = 'px-6 py-3 rounded-lg text-xs uppercase font-bold tracking-widest transition-all duration-300 border border-zinc-800 hover:bg-zinc-900 text-zinc-400';
      btn2.className = 'px-6 py-3 rounded-lg text-xs uppercase font-bold tracking-widest transition-all duration-300 border bg-[#d81d00] border-[#d81d00] text-white';
      content1.classList.add('hidden');
      content2.classList.remove('hidden');
      img.src = 'assets/dconcept-fase2.jpg';
      img.alt = 'Fase 2';
    }
  }

  function filterAmbiente(cat, btn) {
    // Update active class on buttons
    const btns = document.querySelectorAll('.filter-btn');
    btns.forEach(b => {
      b.className = 'filter-btn px-4 py-2 rounded-full text-[10px] uppercase font-bold tracking-widest transition-all duration-300 border border-zinc-800 text-zinc-400 hover:bg-zinc-900 bg-zinc-950/40';
    });
    btn.className = 'filter-btn px-4 py-2 rounded-full text-[10px] uppercase font-bold tracking-widest transition-all duration-300 border bg-[#d81d00] border-[#d81d00] text-white';
    
    // Filter cards
    const cards = document.querySelectorAll('.gallery-card');
    cards.forEach(card => {
      if (cat === 'Todos' || card.getAttribute('data-cat') === cat) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  }
</script>
`;

// Extract structure around main
const mainStartIndex = contatoHtml.indexOf('<main');
const mainEndIndex = contatoHtml.indexOf('</main>');

if (mainStartIndex === -1 || mainEndIndex === -1) {
  console.error("Error: Could not parse <main> structure in contato.html");
  process.exit(1);
}

// Assemble d-concept.html content
let dconceptHtml = contatoHtml.substring(0, mainStartIndex) + dconceptMainContent + contatoHtml.substring(mainEndIndex + 7);

// Replace title and metadata
dconceptHtml = dconceptHtml.replace(/<title>[^<]*<\/title>/i, '<title>d.concept | Dubai Construtora</title>');
dconceptHtml = dconceptHtml.replace(/<meta\s+name="description"\s+content="[^"]*"/i, '<meta name="description" content="d.concept - Personalização Inteligente de Alto Padrão pela Dubai Construtora."');

fs.writeFileSync(dconceptPath, dconceptHtml, 'utf8');
console.log('Successfully created d-concept.html');

// 2. Add d.concept button/link to all static HTML files in Dubai site 2
const htmlFiles = [
  'index.html',
  'quem-somos.html',
  'empreendimentos.html',
  'contato.html',
  'detalhe.html',
  'politicas-de-privacidade.html',
  'termos-e-condicoes-de-uso.html',
  'd-concept.html'
];

htmlFiles.forEach(file => {
  const filePath = path.join(srcDir, file);
  if (!fs.existsSync(filePath)) return;

  let content = fs.readFileSync(filePath, 'utf8');

  // Insert button in mobile menu
  const mobileSearch = '<button class="text-2xl font-bold uppercase tracking-wider text-left text-white hover:text-red-500 transition-colors">Insights</button>';
  const mobileReplacement = '<button class="text-2xl font-bold uppercase tracking-wider text-left text-white hover:text-red-500 transition-colors">Insights</button>\n              <button class="text-2xl font-bold uppercase tracking-wider text-left text-white hover:text-red-500 transition-colors">d.concept</button>';
  
  if (content.includes(mobileSearch) && !content.includes('d.concept</button>\n            </nav>')) {
    content = content.replace(mobileSearch, mobileReplacement);
  }

  // Insert button in footer
  const footerSearch = '<button class="text-left lg:text-right hover:text-[#d81d00] transition-colors font-medium tracking-wide text-xs">Insights</button>';
  const footerReplacement = '<button class="text-left lg:text-right hover:text-[#d81d00] transition-colors font-medium tracking-wide text-xs">Insights</button>\n            <button class="text-left lg:text-right hover:text-[#d81d00] transition-colors font-medium tracking-wide text-xs">d.concept</button>';

  if (content.includes(footerSearch) && !content.includes('d.concept</button>\n          </div>')) {
    content = content.replace(footerSearch, footerReplacement);
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated menus in ${file}`);
});
