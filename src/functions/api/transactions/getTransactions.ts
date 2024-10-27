import { API_URL } from "@/services/api";

export const getTransactions = async () => {
  try {
    const response = await fetch(`${API_URL}/transactions`);
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};
