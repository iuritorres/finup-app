import { API_URL } from "@/services/api";

interface Params {
  email: string;
  password: string;
}

interface Response {
  access_token?: string;
  user?: object;
  message?: string;
  statusCode?: number;
}

export async function signIn({ email, password }: Params): Promise<Response> {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}
