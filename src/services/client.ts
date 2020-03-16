import auth from '../helpers/auth';

export const APIBaseUrl = `https://${window.MESMER_ENVIRONMENT['BASE_URL']}`;
export const WSBaseUrl = `wss://${window.MESMER_ENVIRONMENT['BASE_URL']}`;  

export const get = async (path: string, headers: {[key: string]: any} = {}) => {
  const { idToken } = await auth.getIdToken();

  const response = await fetch(APIBaseUrl + path, {
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${idToken.rawIdToken}`,
      ...headers
    }
  })
  const body = await response.json();
  if(!isGood(response.status)) throw body;
  return body;
};

export const post = async (path: string, data: {[key: string]: any} = {}) => {
  const { idToken } = await auth.getIdToken();

  const response = await fetch(APIBaseUrl + path, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken.rawIdToken}`
    },
    body: JSON.stringify(data)
  })
  
  const body = await response.json();
  if(!isGood(response.status)) throw body;
  return body;
};

export const put = async (path: string, data: {[key: string]: any}) => {
  const { idToken } = await auth.getIdToken();

  const response = await fetch(APIBaseUrl + path, {
    method: 'PUT',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken.rawIdToken}`
    },
    body: JSON.stringify(data)
  })
  
  const body = await response.json();
  if(!isGood(response.status)) throw body;
  return body;
};

const isGood = (status: number) => (status ===  200 || status === 201);