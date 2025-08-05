const apiPort = process.env.NEXT_PUBLIC_API_PORT || 5000;

export async function getCitySuggestions(city: string) {
  const response = await fetch(`http://localhost:${apiPort}/geocoding/${city}`);
  if (!response.ok) {
    throw new Error("Failed to get geodata");
  }

  return await response.json();
}
