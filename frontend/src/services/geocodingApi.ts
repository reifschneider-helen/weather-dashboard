const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function getCitySuggestions(city: string) {
  const response = await fetch(`${apiUrl}/geocoding/${city}`);
  if (!response.ok) {
    throw new Error("Failed to get geodata");
  }

  return await response.json();
}
