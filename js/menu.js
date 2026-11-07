/* Menu · Beeh Design
   Deixa verde (vidro verde do manual) o botão da página em que o visitante está.
   Projetos e Ilustrações acendem "Portfólio"; o estudo de caso da marca acende "Beeh Design".
   Ao tocar ou clicar, o botão também fica verde por um instante. */
(() => {
  const css = document.createElement('style');
  css.textContent = `
    nav[aria-label="Principal"] a[aria-current="page"],
    nav[aria-label="Principal"] a:active{
      background:linear-gradient(160deg,rgba(12,64,45,.42),rgba(12,64,45,.56))!important;
      color:#EEEBE0!important;text-shadow:0 1px 2px rgba(12,64,45,.55)}
    nav[aria-label="Principal"] a{transition:background .3s cubic-bezier(.22,.61,.36,1),color .3s cubic-bezier(.22,.61,.36,1)}`;
  document.head.appendChild(css);

  const nome = p => (p.split('/').pop() || 'index').replace(/\.html$/, '') || 'index';
  let atual = nome(location.pathname);
  if (/^projeto-(?!beeh-design)/.test(atual) || atual === 'ilustracoes') atual = 'portfolio';

  document.querySelectorAll('nav[aria-label="Principal"] a[href]').forEach(a => {
    const destino = nome(a.getAttribute('href'));
    if (destino === atual) a.setAttribute('aria-current', 'page');
    else a.removeAttribute('aria-current');
  });
})();