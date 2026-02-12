const noBtn = document.getElementById('no');
const yesBtn = document.getElementById('yes');
const stage = document.getElementById('stage');
const surprise = document.getElementById('surprise');

/* кнопка No убегает */
function placeNoAtRandom() {
  const padding = 12;
  const btnW = noBtn.offsetWidth || 100;
  const btnH = noBtn.offsetHeight || 44;
  const maxX = Math.max(window.innerWidth - btnW - padding, padding);
  const maxY = Math.max(window.innerHeight - btnH - padding, padding);
  const x = Math.random() * (maxX - padding) + padding;
  const y = Math.random() * (maxY - padding) + padding;
  noBtn.style.position = 'fixed';
  noBtn.style.left = `${Math.round(x)}px`;
  noBtn.style.top = `${Math.round(y)}px`;
}

window.addEventListener('load', () => placeNoAtRandom());
noBtn.addEventListener('mouseenter', moveNo, {passive:false});
noBtn.addEventListener('mouseover', moveNo, {passive:false});
noBtn.addEventListener('touchstart', moveNo, {passive:false});
noBtn.addEventListener('touchmove', moveNo, {passive:false});
noBtn.addEventListener('click', moveNo);
function moveNo(ev){ ev && ev.preventDefault && ev.preventDefault(); placeNoAtRandom(); }

/* Нажатие Yes */
yesBtn.addEventListener('click', () => {

  explodeHearts();

  setTimeout(() => {
    stage.style.opacity = "0";
  }, 300);

  setTimeout(() => {
    stage.style.display = "none";
    surprise.classList.add("show");
  }, 900);
});


function explodeHearts() {
  const count = 14;

  for (let i = 0; i < count; i++) {
    const heart = document.createElement("div");
    heart.className = "explode-heart";
    heart.textContent = "❤️";

    const angle = Math.random() * 2 * Math.PI;
    const distance = 120 + Math.random() * 80;

    const x = Math.cos(angle) * distance + "px";
    const y = Math.sin(angle) * distance + "px";

    heart.style.setProperty("--x", x);
    heart.style.setProperty("--y", y);

    document.body.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, 900);
  }
}


/* падающие сердечки */

/* ресайз */
window.addEventListener('resize', ()=>{
  const btnRect = noBtn.getBoundingClientRect();
  if (btnRect.right>window.innerWidth || btnRect.bottom>window.innerHeight){
    placeNoAtRandom();
  }
});



