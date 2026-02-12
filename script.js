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
  stage.style.opacity = "0";
  setTimeout(() => {
    stage.style.display = "none";
    surprise.classList.add("show");
  }, 600);
});


/* падающие сердечки */

/* ресайз */
window.addEventListener('resize', ()=>{
  const btnRect = noBtn.getBoundingClientRect();
  if (btnRect.right>window.innerWidth || btnRect.bottom>window.innerHeight){
    placeNoAtRandom();
  }
});


