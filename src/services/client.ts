import auth from '../helpers/auth';

const mesmerAPIBaseUrl = 'http://localhost:4008/api';
export const mesmerWSBaseUrl = 'ws://localhost:4008/api';


export const get = async (path: string, headers: {[key: string]: any} = {}) => {
  const { idToken } = await auth.getIdToken();

  const response = await fetch(mesmerAPIBaseUrl + path, {
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

  const response = await fetch(mesmerAPIBaseUrl + path, {
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

  const response = await fetch(mesmerAPIBaseUrl + path, {
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