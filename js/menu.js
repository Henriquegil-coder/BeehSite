/* Menu · Beeh Design
   1. Deixa verde (vidro verde do manual) o botão da página em que o visitante está.
      Projetos e Ilustrações acendem "Portfólio"; o estudo de caso da marca acende "Beeh Design".
      Ao tocar ou clicar, o botão também fica verde por um instante.
   2. No celular (até 820 px): os botões do menu dão lugar a um botão "Menu" com tracinhos,
      que abre um painel com todas as páginas, como na página inicial. O WhatsApp continua no topo. */
(() => {
  if (window.__beehMenu) return;
  window.__beehMenu = true;

  const nav = document.querySelector('nav[aria-label="Principal"]');
  if (!nav || document.getElementById('abrir')) return; // a página inicial tem o próprio menu

  const css = document.createElement('style');
  css.textContent = `
    nav[aria-label="Principal"] a[aria-current="page"],
    nav[aria-label="Principal"] a:active,
    .painel-menu a[aria-current="page"],
    .painel-menu a:active{
      background:linear-gradient(160deg,rgba(12,64,45,.42),rgba(12,64,45,.56))!important;
      color:#EEEBE0!important;text-shadow:0 1px 2px rgba(12,64,45,.55)}
    .painel-menu a[aria-current="page"]{background:linear-gradient(160deg,rgba(12,64,45,.8),rgba(12,64,45,.9))!important}
    nav[aria-label="Principal"] a,.painel-menu a{transition:background .3s cubic-bezier(.22,.61,.36,1),color .3s cubic-bezier(.22,.61,.36,1)}
    .menu-abrir{display:none!important}
    .painel-menu{position:fixed;inset:0;z-index:60;display:grid;place-items:center;
      padding:max(24px,env(safe-area-inset-top,0px)) 16px max(24px,env(safe-area-inset-bottom,0px));
      background:rgba(238,235,224,.72);-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px)}
    .painel-menu[hidden]{display:none}
    .painel-menu ul{list-style:none;margin:0;padding:0;display:grid;gap:12px;justify-items:center}
    .painel-menu ul a{display:inline-flex!important;justify-content:center;align-items:center;min-width:220px;min-height:52px;
      padding:14px 30px!important;font:600 20px/1.2 Lora,Georgia,serif!important;color:#0C402D;text-decoration:none;border-radius:999px}
    .painel-menu .menu-fechar{position:absolute;top:max(16px,env(safe-area-inset-top,0px));right:16px;width:48px;height:48px;
      display:inline-flex;align-items:center;justify-content:center;border:0;border-radius:999px;color:#0C402D;cursor:pointer}
    .menu-abrir:focus-visible,.painel-menu a:focus-visible,.painel-menu button:focus-visible{outline:3px solid #1A2601;outline-offset:3px}
    @media (max-width:820px){
      nav[aria-label="Principal"] > a:not(.wa-top){display:none!important}
      nav[aria-label="Principal"] .menu-abrir{display:inline-flex!important;align-items:center;gap:8px}
    }
    @media (prefers-reduced-motion:reduce){nav[aria-label="Principal"] a,.painel-menu a{transition:none}}`;
  document.head.appendChild(css);

  /* Página atual em verde */
  const nome = p => (p.split('/').pop() || 'index').replace(/\.html$/, '').split(/[?#]/)[0] || 'index';
  let atual = nome(location.pathname);
  if (/^projeto-(?!beeh-design)/.test(atual) || atual === 'ilustracoes') atual = 'portfolio';
  const marca = a => {
    if (nome(a.getAttribute('href')) === atual) a.setAttribute('aria-current', 'page');
    else a.removeAttribute('aria-current');
  };
  const links = [...nav.querySelectorAll('a[href]:not(.wa-top)')];
  links.forEach(marca);

  /* Botão "Menu" com tracinhos (celular) */
  const abrir = document.createElement('button');
  abrir.type = 'button';
  abrir.className = 'btn vidro menu-abrir';
  abrir.setAttribute('aria-expanded', 'false');
  abrir.setAttribute('aria-controls', 'painel-menu');
  abrir.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M4 12h11M4 17h16"/></svg><span>Menu</span>';
  const wa = nav.querySelector('.wa-top');
  nav.insertBefore(abrir, wa || null);

  /* Painel com todas as páginas */
  const painel = document.createElement('div');
  painel.className = 'painel-menu';
  painel.id = 'painel-menu';
  painel.hidden = true;
  painel.setAttribute('role', 'dialog');
  painel.setAttribute('aria-modal', 'true');
  painel.setAttribute('aria-label', 'Menu');
  painel.innerHTML = '<button type="button" class="vidro menu-fechar" aria-label="Fechar menu"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg></button><ul></ul>';
  const ul = painel.querySelector('ul');
  links.forEach(a => {
    const li = document.createElement('li');
    const c = document.createElement('a');
    c.href = a.getAttribute('href');
    c.className = 'vidro';
    c.textContent = a.textContent.trim();
    marca(c);
    li.appendChild(c);
    ul.appendChild(li);
  });
  document.body.appendChild(painel);

  const fecharBtn = painel.querySelector('.menu-fechar');
  const abre = () => { painel.hidden = false; abrir.setAttribute('aria-expanded', 'true'); document.documentElement.style.overflow = 'hidden'; fecharBtn.focus(); };
  const fecha = () => { painel.hidden = true; abrir.setAttribute('aria-expanded', 'false'); document.documentElement.style.overflow = ''; abrir.focus(); };
  abrir.addEventListener('click', abre);
  fecharBtn.addEventListener('click', fecha);
  painel.addEventListener('click', e => { if (e.target === painel || e.target.closest('a')) fecha(); });
  addEventListener('keydown', e => { if (e.key === 'Escape' && !painel.hidden) fecha(); });
  addEventListener('resize', () => { if (innerWidth > 820 && !painel.hidden) fecha(); });
})();