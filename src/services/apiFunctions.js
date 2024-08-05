import { openModal } from '../modules/modal';
import { apiConfig } from './apiConfig';

async function fetchClientCard({ id }) {
  try {
    const response = await fetch(`${apiConfig.baseUrl}/clients/${id}`);

    if (response.status === 404) {
      openModal(
        'error',
        'ID não encontrado',
        'Favor digite um ID válido',
        'warning'
      );
      return null;
    }
    const data = await response.json();

    return data;
  } catch (error) {
    openModal(
      'error',
      'Erro',
      'Ocorreu um erro ao processar a solicitação',
      'warning'
    );
  }
}

export { fetchClientCard };
