// services/api.ts

const handleResponse = async (res: Response) => {
  if (!res.ok) {
    throw new Error(`Erreur API: ${res.status}`);
  }
  return res.json();
};

export const getAdvices = async () => {
  console.log(`Fetching advices from ${process.env.EXPO_PUBLIC_API_URL}/api/advices`);
  const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/api/advices`);
  return handleResponse(res);
};

export const getExercises = async () => {
  const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/api/exercises`);
  return handleResponse(res);
};