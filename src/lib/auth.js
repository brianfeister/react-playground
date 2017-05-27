'use strict';

import { jsonUnauthenticated as fetchJson } from 'lib/api';


export const login = ({ username, password, organization }) => {
  console.log('Attempting to login...');
  try {
    return fetchJson(new Request('https://eagle.goexp.io/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password, organization })
    }));
  } catch (error) {
    console.log(error);
    return {};
  }
};
