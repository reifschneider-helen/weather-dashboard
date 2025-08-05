import Location from "@/models/location.model";
import Widget from "@/models/widget.model";

const apiPort = process.env.NEXT_PUBLIC_API_PORT || 5000;

export async function getWidgets(): Promise<Widget[]> {
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
    const errorText = await response.text();
    throw new Error(`Failed to create widget: ${response.status} ${errorText}`);
  }
  return await response.json();
}

export async function deleteWidget(id: string) {
  const response = await fetch(`http://localhost:${apiPort}/widget/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to delete widget: ${response.status} ${errorText}`);
  }
}
