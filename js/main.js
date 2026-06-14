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
  track.innerHTML = DEPOIMENTOS.map((d) => `
    <div class="review">
      <div class="review-inner">
        <div class="stars" aria-label="5 de 5 estrelas">★★★★★</div>
        <p class="review-text">“${d.texto}”</p>
        <div class="review-author">
          <span class="review-avatar" style="background:${d.cor}">🐾</span>
          <span class="review-meta"><strong>${d.autor}</strong><span>${d.pet}</span></span>
        </div>
      </div>
    </div>`).join("");
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
  cats.innerHTML = BLOG_CATS.map((c, i) =>
    `<button type="button" class="${i === 0 ? "active" : ""}" data-cat="${c}">${c}</button>`).join("");
  function renderBlog(cat) {
    const list = cat === "Todos" ? BLOG : BLOG.filter((p) => p.cat === cat);
    blogGrid.innerHTML = (list.length ? list : BLOG).map((p) => {
      const i = BLOG.indexOf(p);
      return `
      <article class="post reveal">
        <div class="post-img"><span class="post-cat">${p.cat}</span></div>
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
