import { API_URL } from "@/services/api";

interface Params {
  name: string;
  email: string;
  password: string;
}

interface Response {
  user?: object;
  message?: string;
}

export const register = async ({
  name,
  email,
  password,
}: Params): Promise<Response> => {
  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};
