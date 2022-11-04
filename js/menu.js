const open = document.getElementById('creditos');
const modal_container = document.getElementById('modalcontainer');
const close = document.getElementById('cerrarcreditos');
const openc = document.getElementById('howtoplay');
const closec = document.getElementById('cclosehow');
const botton = document.getElementById('howto');

open.addEventListener('click', () => {
  modal_container.classList.add('show');  
});

close.addEventListener('click', () => {
  modal_container.classList.remove('show');
});

openc.addEventListener('click', () => {
  botton.classList.add('show');  
 });
  
closec.addEventListener('click', () => {
  botton.classList.remove('show');
});
