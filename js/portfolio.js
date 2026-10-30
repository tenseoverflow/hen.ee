(() => {
  const dialog = document.querySelector('#portfolio-dialog');
  if (!dialog) return;
  const launch = document.querySelector('.portfolio-launch');
  const scroll = dialog.querySelector('.portfolio-scroll');
  const steps = [...dialog.querySelectorAll('.portfolio-step')];
  const controls = [...dialog.querySelectorAll('[data-direction]')];
  let active = 0;
  function update() {
    active = steps.reduce((best, step, index) => Math.abs(step.offsetTop - scroll.scrollTop) < Math.abs(steps[best].offsetTop - scroll.scrollTop) ? index : best, 0);
    dialog.querySelector('output').textContent = `${active + 1} / ${steps.length}`;
    controls[0].disabled = active === 0;
    controls[1].disabled = active === steps.length - 1;
  }
  function move(direction) {
    const index = Math.max(0, Math.min(steps.length - 1, active + direction));
    scroll.scrollTo({ top: steps[index].offsetTop, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  }
  launch.addEventListener('click', () => { dialog.showModal(); document.body.style.overflow = 'hidden'; update(); });
  dialog.querySelectorAll('.portfolio-close').forEach(button => button.addEventListener('click', () => dialog.close()));
  dialog.addEventListener('click', event => { if (event.target === dialog || event.target.classList.contains('portfolio-step') || event.target === scroll) dialog.close(); });
  dialog.addEventListener('close', () => { document.body.style.overflow = ''; launch.focus(); });
  dialog.addEventListener('keydown', event => { if (['ArrowDown', 'ArrowRight', 'ArrowUp', 'ArrowLeft'].includes(event.key)) { event.preventDefault(); move(['ArrowDown', 'ArrowRight'].includes(event.key) ? 1 : -1); } });
  controls.forEach(button => button.addEventListener('click', () => move(Number(button.dataset.direction))));
  scroll.addEventListener('scroll', update, { passive: true });
})();
