/* ===========================================================
   VET EM CASA — interatividade
   =========================================================== */
(function () {
  "use strict";

  // -------- Config central (edite aqui) --------
  const CONFIG = {
    whatsapp: "5521995472564",
    msgPadrao: "Olá! Gostaria de agendar um atendimento veterinário domiciliar."
  };

  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const waLink = (msg) =>
    `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(msg || CONFIG.msgPadrao)}`;

  document.documentElement.classList.add("js");

  // Observer de "reveal" (declarado cedo para evitar TDZ, usado já na 1ª renderização do blog)
  let io;

  /* ---------- Ano no rodapé ---------- */
  $("#year").textContent = new Date().getFullYear();

  /* ---------- Links de WhatsApp ---------- */
  $$("[data-whats]").forEach((el) => {
    el.setAttribute("href", waLink(el.dataset.msg));
    el.setAttribute("target", "_blank");
    el.setAttribute("rel", "noopener");
  });

  /* ---------- Tema claro/escuro ---------- */
  const root = document.documentElement;
  const themeBtn = $("#theme-toggle");
  const saved = (() => { try { return localStorage.getItem("vetemcasa-theme"); } catch (e) { return null; } })();
  // Padrão: modo escuro. Só fica claro se o visitante escolheu "claro" explicitamente.
  if (saved === "light") root.removeAttribute("data-theme");
  else root.setAttribute("data-theme", "dark");
  themeBtn.addEventListener("click", () => {
    const dark = root.getAttribute("data-theme") === "dark";
    if (dark) root.removeAttribute("data-theme"); else root.setAttribute("data-theme", "dark");
    try { localStorage.setItem("vetemcasa-theme", dark ? "light" : "dark"); } catch (e) {}
  });

  /* ---------- Header scrolled + scroll spy ---------- */
  const header = $(".site-header");
  const navLinks = $$(".nav a");
  const sections = navLinks
    .map((a) => $(a.getAttribute("href")))
    .filter(Boolean);
  const onScroll = () => {
    header.classList.toggle("scrolled", window.scrollY > 12);
    let current = "";
    const y = window.scrollY + 140;
    sections.forEach((sec) => { if (sec.offsetTop <= y) current = "#" + sec.id; });
    navLinks.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === current));
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Menu mobile ---------- */
  const navToggle = $("#nav-toggle");
  const nav = $("#nav-menu");
  const backdrop = $("#nav-backdrop");
  const setMenu = (open) => {
    nav.classList.toggle("open", open);
    navToggle.setAttribute("aria-expanded", String(open));
    backdrop.hidden = !open;
    document.body.style.overflow = open ? "hidden" : "";
  };
  navToggle.addEventListener("click", () => setMenu(!nav.classList.contains("open")));
  backdrop.addEventListener("click", () => setMenu(false));
  nav.addEventListener("click", (e) => { if (e.target.tagName === "A") setMenu(false); });

  /* ---------- Placeholders de foto (SVG de marca) ---------- */
  function brandPlaceholder(label) {
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 800'>
      <defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
        <stop offset='0' stop-color='%231B2A47'/><stop offset='1' stop-color='%230C4A56'/></linearGradient></defs>
      <rect width='800' height='800' fill='url(%23g)'/>
      <g fill='%23C6A15B' opacity='0.85' transform='translate(400 360)'>
        <ellipse cx='-70' cy='-60' rx='34' ry='46'/><ellipse cx='-12' cy='-92' rx='34' ry='50'/>
        <ellipse cx='52' cy='-70' rx='32' ry='44'/><ellipse cx='0' cy='40' rx='84' ry='68'/>
      </g>
      <text x='400' y='560' fill='%23E4C98A' font-family='Georgia,serif' font-size='34' text-anchor='middle' opacity='0.92'>${label || "Vet em Casa"}</text>
    </svg>`;
    return "data:image/svg+xml," + svg.replace(/\n\s*/g, "");
  }
  $$(".ph").forEach((img) => {
    const ph = brandPlaceholder(img.dataset.label);
    img.addEventListener("error", () => { img.src = ph; }, { once: true });
    // Sem src real definido → mostra placeholder de marca
    if (!img.getAttribute("src")) img.src = ph;
  });

  /* ---------- Carrossel de fotos (Sobre Nós) ---------- */
  (function carrossel() {
    const car = $("#sobre-carousel");
    if (!car) return;
    const track = $(".sc-track", car);
    const dotsWrap = $(".sc-dots", car);
    const lista = (typeof FOTOS !== "undefined" && Array.isArray(FOTOS)) ? FOTOS : [];

    if (!lista.length) { return mostrarFallback(); }

    track.innerHTML = lista.map((f, i) =>
      `<figure class="sc-slide"><img src="assets/fotos/${f}" alt="Atendimento Vet em Casa — foto ${i + 1}" loading="lazy" decoding="async"></figure>`
    ).join("");

    let idx = 0, timer = null;
    const slides = () => $$(".sc-slide", track);

    function render() {
      track.style.transform = `translateX(-${idx * 100}%)`;
      $$("button", dotsWrap).forEach((d, k) => d.classList.toggle("active", k === idx));
    }
    function buildDots() {
      dotsWrap.innerHTML = slides().map((_, i) =>
        `<button type="button" role="tab" aria-label="Foto ${i + 1}"></button>`).join("");
      $$("button", dotsWrap).forEach((d, i) => d.addEventListener("click", () => { idx = i; render(); restart(); }));
    }
    function go(n) { const s = slides(); if (!s.length) return; idx = (n + s.length) % s.length; render(); }
    function restart() { clearInterval(timer); timer = setInterval(() => go(idx + 1), 4500); }

    // Remove automaticamente fotos que não existirem na pasta
    slides().forEach((sl) => {
      const img = $("img", sl);
      img.addEventListener("error", () => {
        sl.remove();
        if (!slides().length) { mostrarFallback(); return; }
        if (idx >= slides().length) idx = 0;
        buildDots(); render();
      }, { once: true });
    });

    $(".sc-prev", car).addEventListener("click", () => { go(idx - 1); restart(); });
    $(".sc-next", car).addEventListener("click", () => { go(idx + 1); restart(); });

    // Arrastar (toque/mouse)
    let x0 = null;
    car.addEventListener("pointerdown", (e) => { x0 = e.clientX; });
    car.addEventListener("pointerup", (e) => {
      if (x0 === null) return;
      const dx = e.clientX - x0; x0 = null;
      if (Math.abs(dx) > 40) { go(dx < 0 ? idx + 1 : idx - 1); restart(); }
    });

    car.addEventListener("mouseenter", () => clearInterval(timer));
    car.addEventListener("mouseleave", restart);

    buildDots(); render(); restart();

    function mostrarFallback() {
      car.innerHTML = "";
      const img = document.createElement("img");
      img.className = "ph";
      img.alt = "Dra. Esther Maggessi em atendimento";
      img.src = brandPlaceholder("Dra. Esther com um paciente");
      car.appendChild(img);
    }
  })();

  /* ---------- Serviços (cards + modal) ---------- */
  const grid = $("#servicos-grid");
  grid.innerHTML = SERVICOS.map((s, i) => `
    <button class="card reveal" data-serv="${i}" type="button" style="transition-delay:${(i % 4) * 70}ms">
      <span class="card-ico">${s.icon}</span>
      <h3>${s.titulo}</h3>
      <p>${s.resumo}</p>
      <span class="card-more">Ver detalhes →</span>
    </button>`).join("");

  // Select de serviços na agenda
  const servSelect = $("#b-servico");
  servSelect.innerHTML = `<option value="">Selecione um serviço…</option>` +
    SERVICOS.map((s) => `<option>${s.titulo}</option>`).join("");

  /* ---------- Modal ---------- */
  const modal = $("#modal");
  let lastFocus = null;
  function openModal({ ico, titulo, body, cta }) {
    $("#modal-ico").textContent = ico || "";
    $("#modal-title").textContent = titulo;
    $("#modal-body").innerHTML = body;
    const ctaEl = $("#modal-cta");
    if (cta === null) {
      ctaEl.hidden = true;
    } else if (cta) {
      ctaEl.hidden = false;
      ctaEl.textContent = cta.text || "Quero este atendimento";
      ctaEl.setAttribute("href", waLink(cta.msg));
    } else {
      ctaEl.hidden = false;
      ctaEl.textContent = "Quero este atendimento";
      ctaEl.setAttribute("href", waLink(`Olá! Tenho interesse no serviço: ${titulo}.`));
    }
    $(".modal-box").scrollTop = 0;
    lastFocus = document.activeElement;
    modal.hidden = false;
    document.body.style.overflow = "hidden";
    $(".modal-close").focus();
  }
  function closeModal() {
    modal.hidden = true;
    document.body.style.overflow = "";
    if (lastFocus) lastFocus.focus();
  }
  grid.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-serv]");
    if (!btn) return;
    const s = SERVICOS[+btn.dataset.serv];
    openModal({ ico: s.icon, titulo: s.titulo, body: `<p>${s.detalhe}</p>` });
  });
  modal.addEventListener("click", (e) => { if (e.target.matches("[data-close]")) closeModal(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !modal.hidden) closeModal(); });

  // Modais institucionais (privacidade / termos)
  const INSTIT = {
    privacidade: {
      titulo: "Política de Privacidade", ico: "🔒", cta: null,
      body: `<p>Este site não coleta nem armazena dados pessoais em servidores. As informações preenchidas no formulário de agendamento são usadas apenas para montar a sua mensagem de WhatsApp, enviada por você mesmo.</p>
             <p>Ao entrar em contato, seus dados são tratados com confidencialidade e usados somente para o atendimento veterinário solicitado.</p>`
    },
    termos: {
      titulo: "Termos de Uso", ico: "📄", cta: null,
      body: `<p>As informações deste site têm caráter informativo e não substituem uma consulta veterinária presencial. O agendamento é confirmado diretamente pelo WhatsApp.</p>
             <p>Orientações emergenciais aqui descritas não substituem atendimento de urgência. Em caso de risco, procure um pronto atendimento veterinário.</p>`
    }
  };
  $$("[data-modal]").forEach((el) => el.addEventListener("click", (e) => {
    e.preventDefault();
    openModal(INSTIT[el.dataset.modal]);
  }));

  /* ---------- Depoimentos (carrossel) ---------- */
  const track = $("#reviews-track");
  const dots = $("#reviews-dots");
  const G_LOGO = `<svg class="g-logo" viewBox="0 0 48 48" aria-hidden="true"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>`;
  track.innerHTML = DEPOIMENTOS.map((d) => {
    const nota = d.nota || 5;
    const estrelas = "★".repeat(nota) + "☆".repeat(5 - nota);
    return `
    <div class="review">
      <div class="review-inner">
        <span class="g-badge">${G_LOGO}<span>Avaliação no Google</span></span>
        <div class="stars" aria-label="${nota} de 5 estrelas">${estrelas}</div>
        <p class="review-text">“${d.texto}”</p>
        <div class="review-author">
          <span class="review-avatar" style="background:${d.cor}">🐾</span>
          <span class="review-meta"><strong>${d.autor}</strong><span>${d.pet}</span></span>
        </div>
      </div>
    </div>`;
  }).join("");
  dots.innerHTML = DEPOIMENTOS.map((_, i) =>
    `<button type="button" role="tab" aria-label="Depoimento ${i + 1}"></button>`).join("");
  const dotEls = $$("button", dots);
  let idx = 0, timer;
  function go(i) {
    idx = (i + DEPOIMENTOS.length) % DEPOIMENTOS.length;
    track.style.transform = `translateX(-${idx * 100}%)`;
    dotEls.forEach((d, k) => d.classList.toggle("active", k === idx));
  }
  function auto() { clearInterval(timer); timer = setInterval(() => go(idx + 1), 5500); }
  dotEls.forEach((d, i) => d.addEventListener("click", () => { go(i); auto(); }));
  go(0); auto();
  $("#reviews").addEventListener("mouseenter", () => clearInterval(timer));
  $("#reviews").addEventListener("mouseleave", auto);

  /* ---------- Blog (filtro por categoria) ---------- */
  const cats = $("#blog-cats");
  const blogGrid = $("#blog-grid");

  // Ilustrações temáticas dos posts (mesma ordem do array BLOG)
  const BLOG_ART = [
    // 0 — Protocolo vacinal para filhotes (seringa + patinhas)
    `<svg viewBox="0 0 400 250" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="ba0" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#12606E"/><stop offset="1" stop-color="#0B2730"/></linearGradient></defs><rect width="400" height="250" fill="url(#ba0)"/><g fill="none" stroke="#F4E6C6" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"><g transform="translate(200 118) rotate(-28)"><rect x="-70" y="-19" width="140" height="38" rx="9"/><line x1="-70" y1="-30" x2="-70" y2="30"/><line x1="-122" y1="0" x2="-70" y2="0"/><line x1="-122" y1="-15" x2="-122" y2="15"/><line x1="-40" y1="-19" x2="-40" y2="-7"/><line x1="-13" y1="-19" x2="-13" y2="-7"/><line x1="14" y1="-19" x2="14" y2="-7"/><line x1="70" y1="0" x2="86" y2="0"/><line x1="86" y1="0" x2="124" y2="0"/></g></g><g fill="#D8B36A"><path d="M300 206 a11 11 0 1 0 22 0 a11 11 0 1 0 -22 0"/><circle cx="296" cy="184" r="5.5"/><circle cx="311" cy="179" r="5.5"/><circle cx="326" cy="184" r="5.5"/></g></svg>`,
    // 1 — Vacinas importantes (escudo + check)
    `<svg viewBox="0 0 400 250" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="ba1" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#1B2A47"/><stop offset="1" stop-color="#0C4A56"/></linearGradient></defs><rect width="400" height="250" fill="url(#ba1)"/><g fill="none" stroke="#F4E6C6" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"><path d="M200 50 L264 73 V133 C264 176 235 199 200 211 C165 199 136 176 136 133 V73 Z"/></g><path d="M172 130 l19 19 l38 -46" fill="none" stroke="#D8B36A" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    // 2 — Check-up preventivo (estetoscópio + coração)
    `<svg viewBox="0 0 400 250" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="ba2" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#12606E"/><stop offset="1" stop-color="#0C2A33"/></linearGradient></defs><rect width="400" height="250" fill="url(#ba2)"/><g fill="none" stroke="#F4E6C6" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"><path d="M150 70 C150 130 205 118 205 154"/><path d="M255 70 C255 130 205 118 205 154"/><path d="M205 154 C205 190 250 186 262 190"/><circle cx="272" cy="192" r="20"/></g><circle cx="150" cy="68" r="8" fill="#F4E6C6"/><circle cx="255" cy="68" r="8" fill="#F4E6C6"/><circle cx="272" cy="192" r="6" fill="#0C2A33"/><path d="M132 168 C116 153 114 134 128 128 C135 125 140 130 140 137 C140 130 145 125 152 128 C166 134 164 153 140 168 Z" fill="#D8B36A"/></svg>`,
    // 3 — Vermifugação / parasitas (parasita com proibido)
    `<svg viewBox="0 0 400 250" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="ba3" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#1B2A47"/><stop offset="1" stop-color="#0C4A56"/></linearGradient></defs><rect width="400" height="250" fill="url(#ba3)"/><g fill="none" stroke="#F4E6C6" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="190" cy="138" rx="28" ry="38"/><circle cx="190" cy="96" r="12"/><line x1="184" y1="86" x2="177" y2="74"/><line x1="196" y1="86" x2="203" y2="74"/><line x1="190" y1="104" x2="190" y2="174"/><line x1="162" y1="120" x2="138" y2="108"/><line x1="160" y1="140" x2="134" y2="140"/><line x1="162" y1="160" x2="138" y2="172"/><line x1="218" y1="120" x2="242" y2="108"/><line x1="220" y1="140" x2="246" y2="140"/><line x1="218" y1="160" x2="242" y2="172"/></g><g fill="none" stroke="#D8B36A" stroke-width="7" stroke-linecap="round"><circle cx="190" cy="138" r="64"/><line x1="145" y1="93" x2="235" y2="183"/></g></svg>`,
    // 4 — Gato no transporte (caixa de transporte + gato)
    `<svg viewBox="0 0 400 250" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="ba4" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#12606E"/><stop offset="1" stop-color="#0B2730"/></linearGradient></defs><rect width="400" height="250" fill="url(#ba4)"/><g fill="none" stroke="#F4E6C6" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"><path d="M170 92 C170 70 230 70 230 92"/><path d="M120 92 L280 92 L292 200 L108 200 Z"/><rect x="206" y="110" width="74" height="80" rx="9"/><line x1="228" y1="110" x2="228" y2="190"/><line x1="250" y1="110" x2="250" y2="190"/><line x1="206" y1="150" x2="280" y2="150"/><circle cx="163" cy="150" r="33"/><path d="M141 130 L138 108 L158 124 Z" fill="#F4E6C6"/><path d="M185 130 L188 108 L168 124 Z" fill="#F4E6C6"/></g><circle cx="153" cy="148" r="4.5" fill="#F4E6C6"/><circle cx="175" cy="148" r="4.5" fill="#F4E6C6"/><path d="M159 160 l4 4 l4 -4" fill="none" stroke="#D8B36A" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    // 5 — Cães idosos (carinha de cão + coração)
    `<svg viewBox="0 0 400 250" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="ba5" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0C4A56"/><stop offset="1" stop-color="#0B2730"/></linearGradient></defs><rect width="400" height="250" fill="url(#ba5)"/><g fill="none" stroke="#F4E6C6" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"><path d="M152 116 C152 84 248 84 248 116 C248 178 208 196 200 196 C192 196 152 178 152 116 Z"/><path d="M156 110 C124 102 120 152 142 160"/><path d="M244 110 C276 102 280 152 258 160"/><ellipse cx="200" cy="150" rx="11" ry="8" fill="#F4E6C6"/><path d="M200 158 V172 M200 172 C189 172 184 166 184 161 M200 172 C211 172 216 166 216 161"/></g><circle cx="180" cy="126" r="5" fill="#F4E6C6"/><circle cx="220" cy="126" r="5" fill="#F4E6C6"/><path d="M270 92 C258 80 256 63 269 58 C275 56 280 61 280 67 C280 61 285 56 291 58 C304 63 302 80 280 96 Z" fill="#D8B36A"/></svg>`,
    // 6 — Sinais de alerta (lupa + patinha)
    `<svg viewBox="0 0 400 250" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="ba6" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#1B2A47"/><stop offset="1" stop-color="#12606E"/></linearGradient></defs><rect width="400" height="250" fill="url(#ba6)"/><g fill="#D8B36A"><ellipse cx="170" cy="158" rx="26" ry="21"/><ellipse cx="142" cy="126" rx="10" ry="13"/><ellipse cx="164" cy="112" rx="10.5" ry="14"/><ellipse cx="187" cy="116" rx="10" ry="13"/></g><g fill="none" stroke="#F4E6C6" stroke-width="7" stroke-linecap="round"><circle cx="236" cy="120" r="44"/><line x1="268" y1="152" x2="304" y2="188"/></g></svg>`,
    // 7 — Emergências (kit de primeiros socorros)
    `<svg viewBox="0 0 400 250" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="ba7" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0C4A56"/><stop offset="1" stop-color="#1B2A47"/></linearGradient></defs><rect width="400" height="250" fill="url(#ba7)"/><g fill="none" stroke="#F4E6C6" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"><path d="M176 108 C176 90 224 90 224 108"/><rect x="114" y="108" width="172" height="106" rx="16"/></g><g fill="#D8B36A"><rect x="190" y="130" width="20" height="62" rx="4"/><rect x="169" y="151" width="62" height="20" rx="4"/></g></svg>`
  ];
  cats.innerHTML = BLOG_CATS.map((c, i) =>
    `<button type="button" class="${i === 0 ? "active" : ""}" data-cat="${c}">${c}</button>`).join("");
  function renderBlog(cat) {
    const list = cat === "Todos" ? BLOG : BLOG.filter((p) => p.cat === cat);
    blogGrid.innerHTML = (list.length ? list : BLOG).map((p) => {
      const i = BLOG.indexOf(p);
      return `
      <article class="post reveal">
        <div class="post-img">${BLOG_ART[i] || ""}<span class="post-cat">${p.cat}</span></div>
        <div class="post-body">
          <h3>${p.titulo}</h3>
          <p>${p.resumo}</p>
          <button type="button" class="post-link" data-post="${i}">Ler mais →</button>
        </div>
      </article>`;
    }).join("");
    revealObserve($$(".reveal", blogGrid));
  }
  blogGrid.addEventListener("click", (e) => {
    const b = e.target.closest("[data-post]");
    if (!b) return;
    const p = BLOG[+b.dataset.post];
    openModal({
      ico: "🐾",
      titulo: p.titulo,
      body: `<div class="article">${p.conteudo}</div>`,
      cta: { text: "Falar com a Dra. Esther", msg: `Olá! Li o conteúdo "${p.titulo}" no site e gostaria de saber mais.` }
    });
  });
  cats.addEventListener("click", (e) => {
    const b = e.target.closest("[data-cat]");
    if (!b) return;
    $$("button", cats).forEach((x) => x.classList.remove("active"));
    b.classList.add("active");
    renderBlog(b.dataset.cat);
  });
  renderBlog("Todos");

  /* ---------- Agenda online → WhatsApp (mensagem pronta + copiada) ---------- */
  const form = $("#booking-form");
  const errBox = $("#form-error");
  const feedback = $("#booking-feedback");
  // data mínima = hoje
  const today = new Date().toISOString().split("T")[0];
  $("#b-data").min = today;

  // Copia a mensagem para a área de transferência (com fallback p/ navegadores antigos)
  function copiarMensagem(texto) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(texto).catch(() => fallbackCopy(texto));
    }
    return Promise.resolve(fallbackCopy(texto));
  }
  function fallbackCopy(texto) {
    try {
      const ta = document.createElement("textarea");
      ta.value = texto;
      ta.setAttribute("readonly", "");
      ta.style.position = "absolute";
      ta.style.left = "-9999px";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    } catch (e) {}
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    const obrig = [["servico", "b-servico"], ["data", "b-data"], ["hora", "b-hora"], ["tutor", "b-tutor"], ["pet", "b-pet"], ["especie", "b-especie"]];
    let firstInvalid = null;
    obrig.forEach(([k, id]) => {
      const el = $("#" + id);
      const empty = !String(data[k] || "").trim();
      el.classList.toggle("invalid", empty);
      if (empty && !firstInvalid) firstInvalid = el;
    });
    if (firstInvalid) {
      errBox.hidden = false;
      errBox.textContent = "Por favor, preencha os campos destacados para continuar.";
      firstInvalid.focus();
      return;
    }
    errBox.hidden = true;

    const dataBr = data.data.split("-").reverse().join("/");
    const msg =
`🐾 *Novo agendamento Vet em Casa*

*Serviço:* ${data.servico}
*Data:* ${dataBr}
*Horário:* ${data.hora}
*Tutor(a):* ${data.tutor}${data.fone ? `\n*Telefone:* ${data.fone}` : ""}
*Pet:* ${data.pet} (${data.especie})${data.obs ? `\n*Observações:* ${data.obs}` : ""}

Aguardo a confirmação. Obrigado(a)! 🤍`;

    // 1) copia a mensagem; 2) abre o WhatsApp já com os dados preenchidos
    copiarMensagem(msg).finally(() => {
      window.open(waLink(msg), "_blank", "noopener");
    });

    feedback.hidden = false;
    clearTimeout(feedback._t);
    feedback._t = setTimeout(() => { feedback.hidden = true; }, 6000);
  });

  // limpa estado inválido ao digitar
  $$("#booking-form input, #booking-form select, #booking-form textarea").forEach((el) =>
    el.addEventListener("input", () => el.classList.remove("invalid")));

  /* ---------- Reveal on scroll ---------- */
  function revealObserve(els) {
    if (!("IntersectionObserver" in window)) { els.forEach((el) => el.classList.add("in")); return; }
    if (!io) io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { threshold: 0.12 });
    els.forEach((el) => io.observe(el));
  }
  // marca elementos para revelar
  $$(".section h2, .sec-lead, .values, .t-card, .compare-col, .area-map, .booking, .contact-card, .sobre-media")
    .forEach((el) => el.classList.add("reveal"));
  revealObserve($$(".reveal"));
  // Rede de segurança: se algo falhar no observer, garante que nada fique preso invisível.
  setTimeout(() => $$(".reveal").forEach((el) => el.classList.add("in")), 3000);

  /* ---------- PWA: registro do service worker ---------- */
  if ("serviceWorker" in navigator) {
    // Recarrega uma vez quando uma nova versão do app assume o controle (evita assets antigos em cache).
    let refreshing = false;
    navigator.serviceWorker.addEventListener("controllerchange", () => {
      if (refreshing) return;
      refreshing = true;
      window.location.reload();
    });
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("sw.js").then((reg) => reg.update()).catch(() => {});
    });
  }
})();
