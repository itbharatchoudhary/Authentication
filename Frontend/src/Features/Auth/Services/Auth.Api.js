const BASE_URL = import.meta.env.VITE_API_URL;

export const apiRequest = async (
  endpoint,
  method = "GET",
  body = null,
  token = null,
) => {
  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      ...(body && { body: JSON.stringify(body) }),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.message || "Something went wrong");

    return data;
  } catch (err) {
    throw err;
  }
};
