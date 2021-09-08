import React, {useEffect, useState} from 'react';
import CryptoJS from 'crypto-js';
const api = require('../../api-key.json');

export const baseURLAPI = 'https://gateway.marvel.com:443/v1/public';

export const removeBaseURLAPI = uri => {
  return uri.split('v1/public/')[1];
};

const useAPIFetch = (url, options, dependencies) => {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const params = (options || {}).params || {};
  const ts = new Date().getTime();
  const hash = CryptoJS.MD5(`${ts}${api.marvel.private}${api.marvel.public}`).toString();
  params.apikey = api.marvel.public;
  params.hash = hash;
  params.ts = ts;
  useEffect(() => {
    setLoading(true);
    let uri = `${baseURLAPI}/${url}?${new URLSearchParams(params)}`;
    fetch(uri)
      .then(response => {
        return response.json();
      })
      .then(json => {
        setData(json);
      })
      .catch(e => {
        alert('cannot load page');
        console.log(e);
      })
      .finally(() => {
        setLoading(false);
      });
  }, dependencies);
  return [isLoading, data];
};

export default useAPIFetch;
