'use strict';

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

export const trapApiError = () => method => async (...args) => {
  const { response, ...pass } = await method(...args);
  if (!response.ok) throw new ApiError({ response, ...pass });
  return { response, ...pass };
};


const send = trapApiError()(http.toDocument()(http.fetch));;

export default { fetch: send };
