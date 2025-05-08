// src/services/api.ts

const BASE_URL = "https://api.wizybot.com/products";

export const fetchData = async (endpoint: string) => {
  try {
    const response = await fetch(`${BASE_URL}/${endpoint}`);
    
    // Verificamos si la respuesta es exitosa
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    // Devolvemos los datos en formato JSON
    return data;
  } catch (error) {
      console.error("Error al obtener datos:", error);
      throw error; 
  }
};