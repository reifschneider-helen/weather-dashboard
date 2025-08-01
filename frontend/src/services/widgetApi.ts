export async function createWidget(location: string) {
  const apiPort = process.env.NEXT_PUBLIC_API_PORT || 5000;
  const response = await fetch(`http://localhost:${apiPort}/widget`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ location }),
  });

  if (!response.ok) {
    throw new Error("Failed to create widget");
  }

  return await response.json();
}
