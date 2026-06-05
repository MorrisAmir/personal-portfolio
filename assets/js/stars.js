(function(){
  const canvas = document.getElementById('starsCanvas');
  if(!canvas) return;
  const ctx = canvas.getContext('2d');
  let stars = [];
  let rafId = null;

  function resizeCanvas(){
    canvas.width = window.innerWidth;
    canvas.height = document.body.scrollHeight;
  }

  function createStars(){
    stars = [];
    const area = canvas.width * canvas.height;
    const count = Math.max(200, Math.floor(area / 15000));
    for(let i=0;i<count;i++){
      stars.push({
        x: Math.random()*canvas.width,
        y: Math.random()*canvas.height,
        r: Math.random()*1.4+0.2,
        v: Math.random()*3+2,
        a: Math.random()*0.9+0.1
      });
    }
  }

  function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    for(const s of stars){
      s.y -= s.v;
      if(s.y < -2) s.y = canvas.height + 2;
      ctx.globalAlpha = s.a;
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI*2);
      ctx.fill();
    }
    rafId = requestAnimationFrame(draw);
  }

  function startStars(){
    canvas.style.display = 'block';
    resizeCanvas();
    createStars();
    if(rafId) cancelAnimationFrame(rafId);
    draw();
  }

  function stopStars(){
    canvas.style.display = 'none';
    if(rafId) cancelAnimationFrame(rafId);
    rafId = null;
  }

  window.addEventListener('resize', ()=>{
    if(localStorage.getItem('starsEnabled') === 'false') return;
    resizeCanvas();
    createStars();
  });

  // Re-measure page height after content loads
  window.addEventListener('load', ()=>{
    if(localStorage.getItem('starsEnabled') !== 'false'){
      resizeCanvas();
      createStars();
    }
  });

  const toggleBtn = document.getElementById('toggleStarsBtn');
  function updateText(on){
    if(!toggleBtn) return;
    toggleBtn.textContent = on ? 'Disable background stars' : 'Enable background stars';
  }

  let enabled = localStorage.getItem('starsEnabled');
  if(enabled === null) enabled = 'true';
  enabled = enabled === 'true';
  updateText(enabled);
  if(enabled) startStars(); else stopStars();

  toggleBtn && toggleBtn.addEventListener('click', ()=>{
    enabled = !enabled;
    localStorage.setItem('starsEnabled', enabled);
    updateText(enabled);
    if(enabled) startStars(); else stopStars();
  });
})();