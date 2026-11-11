/* Botão "Voltar ao topo" · Beeh Design
   Computador: botão de vidro fixo no canto inferior esquerdo, aparece depois de rolar a página.
   Celular (até 760 px): botão no fim da página, sem ficar por cima de nenhum texto.
   Não aparece na página inicial e nunca é criado duas vezes, mesmo que o script seja chamado duas vezes. */
(() => {
  const pagina = (location.pathname.split('/').pop() || 'index').replace(/\.html$/, '') || 'index';
  if (pagina === 'index') return;
  if (window.__beehTopo || document.querySelector('.topo-flutua, .topo-fim')) return;
  window.__beehTopo = true;

  const ICONE = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 20V5M6 11l6-6 6 6"/></svg>';

  const css = document.createElement('style');
  css.textContent = `
    .topo-flutua{position:fixed;left:24px;bottom:24px;z-index:40;display:inline-flex;align-items:center;gap:8px;
      min-height:48px;padding:0 18px;border-radius:999px;font:600 14px/1 Karla,sans-serif;color:#0C402D;cursor:pointer;border:0;
      opacity:0;transform:translateY(12px);pointer-events:none;transition:opacity .3s cubic-bezier(.22,.61,.36,1),transform .3s cubic-bezier(.22,.61,.36,1)}
    .topo-flutua.mostra{opacity:1;transform:none;pointer-events:auto}
    .topo-fim{display:none}
    .topo-flutua:focus-visible,.topo-fim button:focus-visible{outline:3px solid #1A2601;outline-offset:3px}
    @media (max-width:760px){
      .topo-flutua{display:none}
      .topo-fim{display:flex;justify-content:center;padding:28px 0 40px}
      .topo-fim button{display:inline-flex;align-items:center;gap:8px;min-height:48px;padding:0 20px;border-radius:999px;font:600 14px/1 Karla,sans-serif;color:#0C402D;cursor:pointer;border:0}
    }`;
  document.head.appendChild(css);

  const sobe = () => {
    const calmo = matchMedia('(prefers-reduced-motion: reduce)').matches;
    scrollTo({ top: 0, behavior: calmo ? 'auto' : 'smooth' });
    const alvo = document.querySelector('h1');
    if (alvo) { alvo.setAttribute('tabindex', '-1'); alvo.focus({ preventScroll: true }); }
  };

  /* Computador */
  const flutua = document.createElement('button');
  flutua.type = 'button';
  flutua.className = 'vidro topo-flutua';
  flutua.innerHTML = ICONE + '<span>Topo</span>';
  flutua.setAttribute('aria-label', 'Voltar ao topo');
  flutua.addEventListener('click', sobe);
  document.body.appendChild(flutua);

  /* Celular */
  const fim = document.createElement('div');
  fim.className = 'topo-fim';
  fim.innerHTML = '<button type="button" class="vidro">' + ICONE + '<span>Voltar ao topo</span></button>';
  fim.querySelector('button').addEventListener('click', sobe);
  (document.querySelector('.wrap') || document.querySelector('main') || document.body).appendChild(fim);

  const checa = () => flutua.classList.toggle('mostra', scrollY > innerHeight * 0.8);
  addEventListener('scroll', checa, { passive: true });
  checa();
})();