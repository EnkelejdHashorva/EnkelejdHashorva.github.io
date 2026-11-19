(() => {
  const canvases = Array.from(document.querySelectorAll('canvas'));
  if (!canvases.length) return;
  const dialog = document.createElement('dialog');
  if (typeof dialog.showModal !== 'function') return;

  dialog.className = 'plot-dialog';
  dialog.setAttribute('aria-labelledby', 'plot-preview-title');
  dialog.innerHTML = '<header><strong id="plot-preview-title">Plot at full size</strong><button type="button">Close</button></header><div class="plot-frame" tabindex="0" role="region" aria-label="Scrollable plot"><canvas role="img"></canvas></div><p></p>';
  document.body.append(dialog);
  const close = dialog.querySelector('button');
  const frame = dialog.querySelector('.plot-frame');
  const snapshot = dialog.querySelector('canvas');
  const description = dialog.querySelector('p');
  let opener;
  close.addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => {
    snapshot.width = 1;
    snapshot.height = 1;
    if (opener) opener.focus();
  });
  canvases.forEach((canvas, index) => {
    const figure = canvas.closest('figure');
    const caption = figure && figure.querySelector('figcaption');
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'plot-expand';
    button.textContent = 'Enlarge plot';
    button.setAttribute('aria-haspopup', 'dialog');
    button.setAttribute('aria-label', 'Enlarge plot ' + (index + 1));
    (caption || canvas).after(button);
    button.addEventListener('click', () => {
      const text = (caption && caption.textContent.trim()) || canvas.getAttribute('aria-label') || document.querySelector('h1').textContent;
      snapshot.width = canvas.width;
      snapshot.height = canvas.height;
      const originalWidth = canvas.getBoundingClientRect().width;
      const displayWidth = Math.max(canvas.width, Math.min(700, 2 * originalWidth));
      snapshot.style.width = displayWidth + 'px';
      snapshot.style.height = (displayWidth * canvas.height / canvas.width) + 'px';
      snapshot.setAttribute('aria-label', text);
      snapshot.getContext('2d').drawImage(canvas, 0, 0);
      description.textContent = text;
      opener = button;
      dialog.showModal();
      frame.scrollTop = frame.scrollLeft = 0;
      close.focus();
    });
  });
})();
