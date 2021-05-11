const request = async ({ uri, body, method, returnType }) => {
  const response = await fetch(uri, fetchOptions({ method, body }));

  if (!response.ok) {
    throw new Error(await response.text());
  }

  if (returnType) {
    return await response[returnType]();
  }
};

const fetchOptions = ({ method, body }) => ({
  method,
  headers: { 'Content-type': 'application/json; charset=UTF-8' },
  body: body && JSON.stringify(body),
});

export const httpClient = {
  get: ({ uri, returnType }) => request({ uri, method: 'GET', returnType }),
  post: ({ uri, body, returnType }) => request({ uri, body, method: 'POST', returnType }),
  delete: ({ uri, body, returnType }) => request({ uri, body, method: 'DELETE', returnType }),
};
