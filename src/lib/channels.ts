/*
 * Fetches the list of channels for a given server from the API
 * Makes a GET request to the /api/channels endpoint with the serverId as a query parameter
 * If the response is not OK, it throws an error with the message from the response or a default message
 * @param {Object} data - The data object containing the serverId
 * @param {string} data.serverId - The ID of the server to fetch channels for
 * @returns The JSON response containing the list of channels
 * @throws Will throw an error if the fetch operation fails or if the response is not OK
 */
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
