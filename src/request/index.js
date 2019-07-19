import axios from 'axios';
import devConfig from '../../config/dev.env';
import prodConfig from '../../config/prod.env';

const baseUrls = {
  'production': prodConfig.baseUrl,
  'development': devConfig.baseUrl
};

const instance = axios.create({
  baseURL: baseUrls[process.env.NODE_ENV] || baseUrls['development'],
  timeout: 5000,
  responseType: 'json'
});

instance.interceptors.request.use(config => {
  // do something before sending request
  return config;
}, error => {
  // do something when error occured
  return Promise.reject(error);
});

instance.interceptors.response.use(response => {
  // do something before handle response
  return response;
}, error => {
  // do something when error occured
  return Promise.reject(error);
});

const httpRequestMethods = ['get', 'post', 'put', 'patch', 'delete', 'head'];
httpRequestMethods.forEach(method => {
  instance['$' + method] = (url, config) => instance[method](Object.assign({
    url,
    method
  }, config));
});

export default instance;
