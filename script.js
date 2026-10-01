const tabs = document.querySelectorAll('.tab');
const panels = document.querySelectorAll('.panel');
tabs.forEach(t => t.addEventListener('click', () => {
  tabs.forEach(x => x.classList.toggle('active', x === t));
  panels.forEach(p => p.classList.toggle('active', p.id === t.dataset.tab));
}));
document.getElementById('y').textContent = new Date().getFullYear();
