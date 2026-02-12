/* == Параметры ==
   Сюда положи путь к картинке сюрприза при желании:
   (если нет картинки — оставь 'images/surprise.jpg' или удалите использование фоновой картинки)
*/
const SURPRISE_IMG = 'images/surprise.jpg'; // в репозитории должен быть этот файл

/* DOM элементы */
const noBtn = document.getElementById('no');
const yesBtn = document.getElementById('yes');
const stage = document.getElementById('stage');
const surprise = document.getElementById('surprise');

/* Прелоад изображения сюрприза, чтобы при показе не было задержки */
function preloadImage(url) {
  return new Promise((res, rej) => {
    if(!url) return rej();
    const img = new Image();
    img.onload = () => res(url);
    img.onerror = () => rej();
    img.src = url;
  });
}

/* Устанавливаем background сюрприза (после прелоада или как fallback) */
preloadImage(SURPRISE_IMG).then(url => {
  surprise.style.backgroundImage = `url('${url}')`;
}).catch(() => {
  // если картинка не загрузилась, оставляем фон розовым (или можно задать градиент)
  surprise.style.background = 'linear-gradient(180deg, rgba(255,200,220,1), rgba(255,230,240,1))';
});

/* Помещаем кнопку No случайно (и внутри экрана) */
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

/* обработчики для "убегания" No */
function moveNo(ev){
  ev && ev.preventDefault && ev.preventDefault();
  placeNoAtRandom();
}

/* при загрузке ставим кнопку */
window.addEventListener('load', () => {
  placeNoAtRandom();
});

/* события: мышь и тач */
noBtn.addEventListener('mouseenter', moveNo, {passive:false});
noBtn.addEventListener('mouseover', moveNo, {passive:false});
noBtn.addEventListener('touchstart', moveNo, {passive:false});
noBtn.addEventListener('touchmove', moveNo, {passive:false});
noBtn.addEventListener('click', moveNo);

/* Разлёт сердечек — аккуратно и плавно */
function explodeHearts() {
  const count = 14;
  for (let i = 0; i < count; i++) {
    const heart = document.createElement('div');
    heart.className = 'explode-heart';
    heart.textContent = '❤️';

    // угол и расстояние (фиксированный радиус + небольшая рандомизация)
    const angle = (i / count) * (2 * Math.PI) + (Math.random() * 0.4 - 0.2);
    const distance = 110 + Math.random() * 80;

    const x = Math.cos(angle) * distance + "px";
    const y = Math.sin(angle) * distance + "px";

    heart.style.setProperty('--x', x);
    heart.style.setProperty('--y', y);

    document.body.appendChild(heart);

    // удалить после анимации
    setTimeout(() => {
      heart.remove();
    }, 1000);
  }
}

/* Нажатие Yes: сначала разлет, затем плавный уход сцены и показ сюрприза */
yesBtn.addEventListener('click', () => {
  // визуальный отклик: чуть уменьшить кнопку, можно добавить эффект, но пока только разлет:
  explodeHearts();

  // через 300ms начинаем плавное исчезновение stage
  setTimeout(() => {
    stage.style.opacity = "0";
  }, 300);

  // через 900ms скрываем stage и показываем сюрприз
  setTimeout(() => {
    stage.style.display = "none";
    surprise.classList.add("show");
    surprise.setAttribute('aria-hidden','false');
  }, 900);
});

/* При ресайзе держим No внутри экрана */
window.addEventListener('resize', () => {
  const rect = noBtn.getBoundingClientRect();
  if (rect.right > window.innerWidth || rect.bottom > window.innerHeight) {
    placeNoAtRandom();
  }
});
