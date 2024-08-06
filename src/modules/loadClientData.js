import { fetchClientCard } from '../services/apiFunctions';
import { openModal } from './modal';

const form = document.querySelector('form');
const input = document.getElementById('input');
const button = document.querySelector('#form button');

const clientAvatar = document.querySelector('#avatar img');
const clientName = document.querySelector('#info h2');
const clientSince = document.querySelector('#info span strong');

const historyCutCount = document.querySelector('#history header span');
const historyList = document.querySelector('#history ul');

const cardTag = document.querySelector('#tag h3 span');
const cardSlots = document.querySelectorAll('#slots div');

const progressTitle = document.querySelector('#progress .content h1');
const progressBar = document.querySelector('.progress-gradient');
const progressCounter = document.querySelector('.linear-progress span strong');
const progressItem = document.querySelector('#progress .item');

const sealIconSrc = './src/assets/icons/SealCheck.svg';

input.addEventListener('input', () => {
  const digitRegex = /\D/g;
  let value = input.value.replace(digitRegex, '');
  let maskedValue = '';

  if (value.length > 12) {
    value = value.slice(0, 12);
  }

  for (let i = 0; i < value.length; i++) {
    if (i === 3 || i === 6 || i === 9) {
      maskedValue += '-';
    }
    maskedValue += value[i];
  }

  if (maskedValue.length === 15) {
    button.disabled = false;
  } else {
    button.disabled = true;
  }

  input.value = maskedValue;
});

form.onsubmit = async (event) => {
  event.preventDefault();

  try {
    cardSlots.forEach((slot) => slot.classList.remove('filled'));
    historyList.innerHTML = '';
    progressBar.classList.value = 'progress-gradient';
    progressItem.classList.remove('finished');

    const id = input.value;

    if (!id) {
      return;
    }

    const clientData = await fetchClientCard({ id });

    if (!clientData) {
      return;
    }

    clientAvatar.src = clientData.avatarUrl;
    clientName.textContent = clientData.name;
    clientSince.textContent = clientData.clientSince;

    const totalCuts = clientData.appointmentHistory.length;
    historyCutCount.textContent = `${totalCuts} corte${
      totalCuts === 1 ? '' : 's'
    }`;

    const cuts = clientData.appointmentHistory;

    cuts.forEach((cut) => {
      const listItem = document.createElement('li');
      listItem.classList.add('list-row');

      const itemTitle = document.createElement('div');
      itemTitle.classList.add('list-item-title');
      const titleHead = document.createElement('h4');
      const titleDate = document.createElement('span');

      titleHead.textContent = cut.date;
      titleDate.textContent = cut.time;

      itemTitle.appendChild(titleHead);
      itemTitle.appendChild(titleDate);

      const sealIcon = document.createElement('div');
      sealIcon.classList.add('seal-icon');
      const sealIconImage = document.createElement('img');
      sealIconImage.src = sealIconSrc;
      sealIcon.appendChild(sealIconImage);

      listItem.appendChild(itemTitle);
      listItem.appendChild(sealIcon);

      historyList.appendChild(listItem);
    });

    cardTag.textContent = clientData.id;

    let count = 0;

    cardSlots.forEach((slot) => {
      if (count < totalCuts) {
        slot.classList.add('filled');
        count++;
      }
    });

    const remainingCuts = clientData.loyaltyCard.cutsNeeded - totalCuts;

    progressTitle.innerHTML = `${remainingCuts} <span>corte${
      remainingCuts !== 1 ? 's' : ''
    } restante${remainingCuts !== 1 ? 's' : ''}</span>`;

    progressCounter.textContent = totalCuts;

    progressBar.classList.add(`progress-${totalCuts}`);

    if (totalCuts === 10) {
      progressItem.classList.add('finished');
      setTimeout(() => {
        openModal(
          'success',
          'Parabéns',
          'Seu próximo corte é gratuito!',
          'diamond'
        );
      }, 1000);
    }
  } catch (error) {}
};
