export async function getChannels(data: { serverId: string }) {
  const res = await fetch(`/api/channels?serverId=${data.serverId}`, {
    method: `GET`,
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || `Unknown error has occured`);
  }
  return res.json();
}
