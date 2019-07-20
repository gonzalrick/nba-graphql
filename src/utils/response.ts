export function response(body?: object, statusCode = 200) {
  return {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    body: body ? JSON.stringify(body) : '',
    statusCode,
  };
}

export function error(errors: string[], statusCode = 400) {
  // Report error the the lambda logs
  console.error(errors); // eslint-disable-line no-console

  return response({ errors }, statusCode);
}

export function success(data?: object, statusCode = 200) {
  return response(data, statusCode);
}
