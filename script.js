// script.js — vanilla JS interaksi untuk halaman Valentine
// script.js — sederhana: navigasi multi-tampilan + interaksi ringan
(function(){
  const screens = Array.from(document.querySelectorAll('.screen'));
  let idx = 0;

  function show(i){
    screens.forEach((s, n)=>{
      s.classList.toggle('active', n===i);
    });
    idx = i;
  }

  // Next / Back buttons (delegation)
  document.addEventListener('click', (e)=>{
    const btn = e.target.closest('button[data-action]');
    if(!btn) return;
    const action = btn.getAttribute('data-action');
    if(action === 'next') show(Math.min(idx+1, screens.length-1));
    if(action === 'back') show(Math.max(idx-1, 0));
  });

  // Prompt button in screen2 -> go next on click or Enter
  const promptBtn = document.getElementById('promptBtn');
  if(promptBtn){
    promptBtn.addEventListener('click', ()=> show(Math.min(idx+1, screens.length-1)));
    promptBtn.addEventListener('keydown', (e)=>{ if(e.key === 'Enter' || e.key === ' ') show(Math.min(idx+1, screens.length-1)); });
  }

  // Choices on screen3
  const yesBtn = document.getElementById('yesBtn');
  const noBtn = document.getElementById('noBtn');
  const box = document.getElementById('choiceBox');
  const secret = document.getElementById('secret');
  function revealSecret(text){
    secret.innerHTML = '';
    const span = document.createElement('span');
    span.className = 'pop';
    span.textContent = text;
    secret.appendChild(span);
  }

  if (noBtn && yesBtn && box) {
    function moveButton() {
      const maxX = box.clientWidth - noBtn.offsetWidth;
      const maxY = box.clientHeight - noBtn.offsetHeight;

      const randomX = Math.random() * maxX;
      const randomY = Math.random() * maxY;

      noBtn.style.left = randomX + 'px';
      noBtn.style.top = randomY + 'px';
    }

    noBtn.addEventListener('mouseover', moveButton);
    noBtn.addEventListener('click', moveButton);

    yesBtn.addEventListener('click', () => {
      secret.innerHTML = 'Hehe… soalnya aku suka kamu 🤍';
    });
  }

  // Final button — soft feedback
  const finalBtn = document.getElementById('finalBtn');
  finalBtn.addEventListener('click', ()=>{
    finalBtn.animate([{transform:'scale(1)'},{transform:'scale(1.06)'},{transform:'scale(1)'}],{duration:300});
    // small DOM message
    finalBtn.textContent = '😊 Terima kasih';
  });

  // Initialize
  show(0);

  // Optional: keyboard navigation (left/right)
  document.addEventListener('keydown', (e)=>{
    if(e.key === 'ArrowRight') show(Math.min(idx+1, screens.length-1));
    if(e.key === 'ArrowLeft') show(Math.max(idx-1, 0));
  });

  // expose simple helpers for inline handlers or external scripts
  window.nextPage = function(){ show(Math.min(idx+1, screens.length-1)); };
  window.prevPage = function(){ show(Math.max(idx-1, 0)); };

})();

