import { get, post } from "./client"

export const getTokenForTalksuite = async (username: string, password: string) => {
  const response = await post('/proxy/talksuite/login', { username, password });
  return response['access_token'];
}

export const getOrganisations = async (token: string) => {
  const response = await get('/proxy/talksuite/organisations', { 'Authentication': `Bearer ${token}` });
  return response;
}

export const getBots = async (token: string, orgId: string) => {
  const response = await get(`/proxy/talksuite/organisations/${orgId}/bots`, { 'Authentication': `Bearer ${token}` });
  return response;
}


export const getBot = async (token: string, orgId: string, botId: string) => {
  const response = await get(`/proxy/talksuite/organisations/${orgId}/bots/${botId}`, { 'Authentication': `Bearer ${token}` });
  return response;
}