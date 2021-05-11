import { httpClient } from '../../request/httpClient';

export const requestInsertItem = (path, item) => httpClient.post({ uri: `http://localhost:4000/${path}`, body: item });
export const requestDeleteItem = (path, id) => httpClient.delete({ uri: `http://localhost:4000/${path}/${id}` });
export const requestGetItemList = (path) =>
  httpClient.get({ uri: `http://localhost:4000/${path}`, returnType: 'json' });
