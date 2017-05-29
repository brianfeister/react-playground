'use strict';

import { withJsonBody } from 'lib/http';
import { send } from 'lib/api';


export const login = credentials => {
  return withJsonBody(credentials)(send)(new Request('https://eagle.goexp.io/api/auth/login', { method: 'POST' }))
};
