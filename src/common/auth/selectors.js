'use strict';

export const getToken = () => state => _.get(['auth', 'payload', 'token'], state) || null;
