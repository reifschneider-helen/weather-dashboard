import Location from "@/models/location.model";

const apiPort = process.env.NEXT_PUBLIC_API_PORT || 5000;

export async function getWidgets() {
  const response = await fetch(`http://localhost:${apiPort}/widget`);

  if (!response.ok) {
    throw new Error("Failed to get widgets");
  }

  return await response.json();
}

export async function createWidget(location: Location) {
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

export async function deleteWidget(id: string) {
  const response = await fetch(`http://localhost:${apiPort}/widget/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete widget");
  }
}
