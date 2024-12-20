import { API_URL } from '@/services/api';

export const getTransactions = async (accessToken: string) => {
  try {
    const response = await fetch(`${API_URL}/transactions`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) throw new Error('Failed to fetch transactions');

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};
