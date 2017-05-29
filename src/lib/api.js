'use strict';

import { compose } from 'redux';

import * as http from 'lib/http';


export class ApiError extends http.HttpError {
  constructor ({ document, ...pass }) {
    super({
      message: document.message,
      code: `api.${document.code}`,
      metadata: { document, ...pass }
    });
  }
}


export const trap = () => method => async (...args) => {
  const { response, ...pass } = await method(...args);
  if (!response.ok) throw new ApiError({ response, ...pass });
  return { response, ...pass };
};


export const send = compose(http.trap(), trap(), http.parse())(http.send);
