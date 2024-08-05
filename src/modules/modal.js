const modal = document.getElementById('modal');
const modalHeader = document.getElementById('modal-title');
const modalIcon = document.querySelector('#modal-title span');
const modalTitle = document.querySelector('#modal-title h1');
const modalMessage = document.querySelector('#modal-message p');
const modalButton = document.querySelector('#modal footer button');
const modalShadow = document.getElementById('modal-shadow');

function openModal(type = 'error', title, message, icon) {
  modalTitle.textContent = title;
  modalMessage.textContent = message;
  modalIcon.textContent = icon;

  modalHeader.classList.add(type);

  modal.style.animation = 'modalIn .5s ease-in';
  modalShadow.style.animation = 'modalShadowIn .5s ease-in';
  modal.style.display = 'flex';
  modalShadow.style.display = 'block';
}

function closeModal() {
  modal.style.animation = 'modalOut .5s ease-out';
  modalShadow.style.animation = 'modalShadowOut .5s ease-out';
  setTimeout(() => {
    modal.style.display = 'none';
    modalShadow.style.display = 'none';
  }, 499);
}

modalButton.addEventListener('click', closeModal);

export { openModal };
