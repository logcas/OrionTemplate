import axios from 'axios';

const baseUrls = {
  'production': 'http://api.logcas.name',
  'development': 'http://api.lxzmww.xyz'
};

const instance = axios.create({
  baseURL: baseUrls[process.env.NODE_ENV] || baseUrls['development'],
  timeout: 5000,
  responseType: 'json'
});

const httpMethods = ['post', 'head', 'put', 'delete'];
const requestWrapper = {};
httpMethods.forEach(method => {
  requestWrapper[`$${method}`] = (url, data) => instance[method](url, data);
});
requestWrapper['$get'] = (url, data) => instance.get(url, {
  data
});

export default requestWrapper;