# Guia de Integração Técnica - Dubai Site 2 (WordPress & Elementor)

Este documento contém a versão em português das diretrizes técnicas para o desenvolvedor portar o projeto estático **Dubai Incorporadora** para o **WordPress** utilizando o **Elementor Builder** ou desenvolvimento de tema personalizado.

---

## Passo 1: Configuração do Cabeçalho (Header) e Tailwind CSS

Como o design utiliza classes utilitárias do Tailwind CSS, é necessário incluir o script do Tailwind no cabeçalho do seu tema WordPress (`header.php`) ou através de um plugin de injeção de scripts (como *Header and Footer Post Injections*).

Adicione a seguinte tag dentro da seção `<head>`:
```html
<script src="https://cdn.tailwindcss.com"></script>
```

---

## Passo 2: Importação dos Estilos (CSS Personalizado)

Todos os estilos personalizados de luxo, animações de scroll, efeito glossy de reflexo nos cards, transições da linha do tempo e overrides do modo claro estão centralizados no arquivo:
👉 `assets/style.css`

**Como implementar:**
1. Copie todo o conteúdo de `assets/style.css`.
2. Cole no WordPress em **Aparência > Personalizar > CSS Adicional** ou insira diretamente nas configurações globais de CSS do **Elementor** (Global Custom CSS).

---

## Passo 3: Importação do Script de Interatividade (JavaScript)

Toda a lógica interativa (efeito 3D tilt nos cards, abertura/fechamento do menu desktop/mobile, busca de projetos em tempo real, controle deslizante da história, e a lógica de carregamento dinâmico da página de detalhes) está contida em:
👉 `assets/main.js`

**Como implementar:**
1. Enfileire o script no arquivo `functions.php` do seu tema para que seja carregado no rodapé:
   ```php
   function enqueue_dubai_scripts() {
       wp_enqueue_script('dubai-main-js', get_template_directory_uri() . '/assets/main.js', array(), '1.0', true);
   }
   add_action('wp_enqueue_scripts', 'enqueue_dubai_scripts');
   ```
2. *Alternativa Elementor:* Se preferir, cole o conteúdo de `assets/main.js` dentro de um bloco de script customizado no rodapé do Elementor (Custom Code / Footer script).

---

## Passo 4: Construção das Páginas no Elementor (Widgets HTML)

Para cada página (`index.html`, `quem-somos.html`, `empreendimentos.html`, `contato.html`, `detalhe.html`):
1. Crie uma nova página no WordPress e edite-a com o **Elementor**.
2. Remova o cabeçalho e rodapé padrão do tema se desejar usar os cabeçalhos/rodapés estáticos de alta fidelidade do arquivo HTML (selecione o layout **Elementor Canvas**).
3. Adicione o widget **HTML** do Elementor na página.
4. Copie o HTML correspondente da página estática e cole no widget.

### ⚠️ Importante: Mapeamento de Mídia (Imagens e Vídeos)
Os caminhos das imagens e vídeos nos arquivos HTML são relativos (ex: `src="assets/hero-video.mp4"`).
1. Faça o upload de todos os arquivos da pasta `assets/` (imagens, vídeos, logos) para a **Biblioteca de Mídia do WordPress**.
2. Substitua os caminhos relativos nos blocos HTML pelos links permanentes (URLs) gerados pelo WordPress.
   * *Exemplo:*
     ```html
     <!-- De: -->
     <video src="assets/hero-video.mp4" ...></video>
     <!-- Para: -->
     <video src="https://seusite.com.br/wp-content/uploads/2026/07/hero-video.mp4" ...></video>
     ```

---

## Passo 5: Lógica de Navegação e Links do Menu

Para garantir que os botões estáticos naveguem corretamente, criamos um sistema de delegação de eventos em `assets/main.js` que escuta os textos dos botões.
* Ao criar os menus ou botões no Elementor, certifique-se de que os textos sejam:
  * `"Home"` para ir ao início.
  * `"Empreendimentos"` para ir aos empreendimentos.
  * `"Quem somos"` para a história da empresa.
  * `"Contato"` para a página de contato.

Você também pode substituir os botões estáticos por links padrão do WordPress (`<a>`) apontando para as páginas criadas no painel administrativo.

---

## Passo 6: Dinamização dos Empreendimentos (Custom Post Types)

Atualmente, os empreendimentos são carregados dinamicamente no arquivo `detalhe.html` baseado no parâmetro da URL (ex: `detalhe.html?id=authoria`), puxando os dados da constante `empreendimentosData` em `assets/main.js`.

Para deixar isso dinâmico dentro do ecossistema WordPress:
1. Instale os plugins **CPT UI** e **Advanced Custom Fields (ACF)**.
2. Crie um Custom Post Type chamado `Empreendimentos`.
3. Adicione os campos personalizados no ACF correspondentes às especificações técnicas:
   * Área (`area`)
   * Dormitórios (`dormitorios`)
   * Vagas (`vagas`)
   * Status (`statusLabel` - ex: Lançamento, Pronto para Morar, Em Obras)
   * Fotos da Galeria, Planta Baixa e progresso de obra (Fundação, Estrutura, Alvenaria, Acabamento).
4. Crie o template de página única no Elementor Pro (Theme Builder) para aplicar estes campos dinamicamente, substituindo a lógica client-side do `populateDetailPage`.

---

## Passo 7: Implementação das Páginas de Políticas e Termos no WordPress/Elementor

Como as páginas de **Políticas de Privacidade** e **Termos e Condições de Uso** foram estruturadas em arquivos HTML independentes (`politicas-de-privacidade.html` e `termos-e-condicoes-de-uso.html`), siga as diretrizes abaixo para portá-las:

1. **Criação das Páginas no WordPress:**
   * Crie duas novas páginas no painel do WordPress com os slugs correspondentes:
     * `/politicas-de-privacidade`
     * `/termos-e-condicoes-de-uso`

2. **Inserção do Layout (Elementor):**
   * Edite ambas no Elementor usando o modelo **Elementor Canvas** (para manter o cabeçalho e rodapé estáticos idênticos).
   * Insira um widget **HTML** do Elementor e cole o código correspondente de cada arquivo estático.
   * Substitua os caminhos relativos de recursos como imagens ou arquivos da pasta `assets/` pelos caminhos completos da biblioteca de mídia do WordPress.

3. **Navegação Rápida (Table of Contents Sidebar):**
   * As páginas utilizam um menu lateral fixo para rolagem interna rápida (ex: `#sub-1`, `#sub-2`).
   * No WordPress, certifique-se de que os links internos continuem apontando para os IDs corretos na mesma página (ex: `#sub-1`), garantindo que o Elementor faça a rolagem suave padrão.

---

## Passo 8: Implementação da Página d.concept no WordPress/Elementor

A página **d.concept** (`d-concept.html`) introduz a personalização de alto padrão da incorporadora com funcionalidades de altíssimo nível estético e interativo. Siga estas diretrizes passo a passo para migrá-la perfeitamente para o Elementor:

1. **Criação da Página no WordPress:**
   * Crie uma nova página no WordPress com o slug `/d-concept` e edite-a usando o modelo **Elementor Canvas** para manter o cabeçalho e rodapé unificados do site.
   * Insira um widget **HTML** do Elementor e cole todo o conteúdo estrutural dentro da tag `<main>` do arquivo `d-concept.html`.

2. **Gerenciamento e Injeção das Imagens de Luxo (Assets):**
   * Faça o upload de todas as novas imagens de luxo geradas para a página na sua biblioteca de mídia do WordPress. São elas:
     * `dconcept-hero.jpg` (Imagem principal do topo)
     * `dconcept-fase1.jpg` (Imagem ilustrativa do cronograma - Fase 1)
     * `dconcept-fase2.jpg` (Imagem ilustrativa do cronograma - Fase 2)
     * `dconcept-cozinha.jpg` (Cozinha Gourmet)
     * `dconcept-quarto.jpg` (Suíte Master)
     * `dconcept-office.jpg` (Home Office)
     * `dconcept-banheiro.jpg` (Banheiro Spa)
     * `dconcept-sala.jpg` (Living Room)
     * `dconcept-closet.jpg` (Closet sob medida)
   * Substitua os caminhos relativos (ex: `src="assets/dconcept-cozinha.jpg"`) no bloco HTML do Elementor pelas URLs absolutas das imagens na biblioteca de mídia do WordPress.

3. **Efeito 3D Tilt nos Cards e Imagens (Efeito de Inclinação Interativo):**
   * Em `assets/main.js`, existe um listener que inicializa o efeito 3D mouse tilt nos elementos que possuem a classe `interactive-tilt`.
   * **Como funciona:** O script escuta o movimento do mouse e calcula os ângulos de inclinação, injetando as variáveis CSS `--rx` e `--ry`.
   * **Implementação no Elementor:** Certifique-se de que os cards de diferenciais e os cards da galeria possuam a classe `interactive-tilt` e `cursor-pointer` para habilitar essa interatividade.

4. **Brilho Premium no Hover (Glass Panel Hover):**
   * O arquivo `assets/style.css` contém a classe `.glass-panel-hover` que adiciona uma transição suave de borda avermelhada e um brilho reflexivo premium (`box-shadow` vermelho) nos cards ao passar o mouse.
   * **Como aplicar:** Garanta que a classe `glass-panel-hover` esteja presente na div/container de todos os cards de diferenciais e cards da galeria.

5. **Garantia de Contraste Perfeito em Modo Claro (Light Mode Contrast):**
   * **Botões com Fundo Vermelho:** Para evitar que o texto dos botões ativos (como `FASE 1: INÍCIO DA OBRA` e o filtro `TODOS`) se torne preto e ilegível no modo diurno, foi introduzido o klasses `.text-white-forced` e regras adicionais na classe `.dconcept-badge`.
   * O klasses `.text-white-forced` possui estilo `color: #ffffff !important` para sobrepor quaisquer redefinições de tema do modo claro. Garanta que o botão selecionado de fase e os filtros ativos de galeria utilizem a classe `text-white-forced`.
   * As funções JS `showFase(num)` e `filterAmbiente(cat, btn)` no arquivo `d-concept.html` já vêm configuradas para injetar dinamicamente a classe `text-white-forced` ao ativar um botão. Mantenha essa lógica caso utilize o código JS fornecido.

6. **Implementação Nativa no Elementor (Alternativa sem Código HTML):**
   * Caso queira reconstruir os componentes visualmente no Elementor em vez de colar o HTML estático:
     * **Cronograma:** Use o widget **Tabs (Abas)** nativo. Estilize as abas com a cor de fundo cinza escuro/preto em modo escuro e borda avermelhada suave, aplicando o vermelho `#d81d00` na aba ativa com texto em branco (`#ffffff`).
     * **Filtros e Galeria:** Use o widget **Portfolio** ou **Gallery** (Elementor Pro), configurando as categorias exatamente como: *Cozinha*, *Dormitório*, *Home Office*, *Banheiro*, *Sala* e *Closet*. Adicione efeitos de escala na imagem (Scale hover) para replicar o zoom suave do layout original.
