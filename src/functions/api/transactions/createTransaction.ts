import { API_URL } from "@/services/api";

export interface Params {
  accessToken: string;
  data: {
    amount: number;
    name: string;
    date: string;
    type: string;
    categoryId: string;
  };
}

export const createTransaction = async ({ accessToken, data }: Params) => {
  try {
    await fetch(`${API_URL}/transactions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};
