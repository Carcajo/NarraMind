const API_URL = "http://localhost:8000/api/v1/auth";

export const login = async (email: string, password: string): Promise<{ access_token: string }> => {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || "Ошибка входа");
  }

  return await response.json();
};

export async function register(name: string, email: string, password: string) {
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),  // убираем role
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || "Ошибка регистрации");
  }

  return await response.json();
};