import fetch from 'node-fetch';

export const fetchUrl = async (url: string) => {
  return fetch(url)
    .then(res => res.json())
    .catch(err => console.log(err));
};
