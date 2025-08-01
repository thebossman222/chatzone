export async function POST(data: { content: string; channelId: string }) {
  const res = await fetch("/api/messages", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || `Unknown error has occured`);
  }

  return res.json();
}
