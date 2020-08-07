import auth from '../helpers/auth';

export const APIBaseUrl = `${process.env.NODE_ENV === 'production' ? 'https' : 'http'}://${window.MESMER_ENVIRONMENT['BASE_URL']}`;
export const WSBaseUrl = `${process.env.NODE_ENV === 'production' ? 'wss' : 'ws'}://${window.MESMER_ENVIRONMENT['BASE_URL']}`;  

export const get = async (path: string, headers: {[key: string]: any} = {}) => {

  const response = await fetch(APIBaseUrl + path, {
    headers: {
      'Accept': 'application/json',
      ...headers
    }
  })
  const body = await response.json();
  if(!isGood(response.status)) throw body;
  return body;
};

export const post = async (path: string, data: {[key: string]: any} = {}, headers: {[key: string]: any} = {}) => {

  const response = await fetch(APIBaseUrl + path, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      ...headers
    },
    body: JSON.stringify(data)
  })
  
  const body = await response.json();
  if(!isGood(response.status)) throw body;
  return body;
};

export const put = async (path: string, data: {[key: string]: any}) => {

  const response = await fetch(APIBaseUrl + path, {
    method: 'PUT',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  })
  
  const body = await response.json();
  if(!isGood(response.status)) throw body;
  return body;
};

const isGood = (status: number) => (status ===  200 || status === 201);