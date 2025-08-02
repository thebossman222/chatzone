export async function getServers() {
  const res = await fetch(`/api/servers`, {
    method: `GET`,
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || `Failed to fetch servers`);
  }
  return res.json();
}
