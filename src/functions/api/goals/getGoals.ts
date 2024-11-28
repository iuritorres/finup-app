import { API_URL } from '@/services/api';

export const getGoals = async (accessToken: string) => {
  try {
    const response = await fetch(`${API_URL}/goals`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) throw new Error('Failed to fetch goals');

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};
