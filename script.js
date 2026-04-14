function updateSlider(input) {
  const val = input.value;
  const opacity = val / 100;
  input.style.background = `linear-gradient(to right, rgba(200,240,224,${opacity}) 0%, rgba(200,240,224,1) ${val}%, rgba(255,255,255,0.08) ${val}%, rgba(255,255,255,0.08) 100%)`;
}

document.querySelectorAll('.sound-card').forEach(card => {
  const src = card.dataset.src;
  const audio = new Audio(src);
  audio.loop = true;
  audio.volume = 0;

  const slider = card.querySelector('input[type="range"]');
  slider.value = 0;
  updateSlider(slider);

  card.audio = audio;

  slider.addEventListener('input', function() {
    audio.volume = this.value / 100;
    if (audio.paused && this.value > 0) audio.play();
    if (this.value == 0) audio.pause();
    updateSlider(this);
  });
});

function toggle(card) {
  if (event.target.tagName === 'INPUT') return;
  card.classList.toggle('active');
  const audio = card.audio;
  const slider = card.querySelector('input[type="range"]');
  if (card.classList.contains('active')) {
    slider.value = 50;
    audio.volume = 0.5;
    audio.play();
  } else {
    slider.value = 0;
    audio.volume = 0;
    audio.pause();
  }
  updateSlider(slider);
}

function updateSlider(input) {
  const val = input.value;
  const opacity = val / 100;
  input.style.background = `linear-gradient(to right, rgba(200,240,224,${opacity * 0.3}) 0%, rgba(200,240,224,${opacity}) ${val}%, rgba(255,255,255,0.08) ${val}%, rgba(255,255,255,0.08) 100%)`;
  input.style.opacity = opacity < 0.15 ? 0.15 : opacity;
}

document.querySelectorAll('input[type="range"]').forEach(input => {
  updateSlider(input);
});