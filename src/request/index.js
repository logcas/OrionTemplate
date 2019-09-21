import axios from 'axios';
const { prod, dev } = require('../../config');

const baseUrls = {
  production: prod.baseUrl,
  development: dev.baseUrl
};

const instance = axios.create(
  Object.assign(
    {
      timeout: 5000,
      responseType: 'json'
    },
    baseUrls[process.env.NODE_ENV]
      ? {
          baseURL: baseUrls[process.env.NODE_ENV]
        }
      : {}
  )
);

instance.interceptors.request.use(
  config => {
    // do something before sending request
    return config;
  },
  error => {
    // do something when error occured
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  response => {
    // do something before handle response
    return response;
  },
  error => {
    // do something when error occured
    return Promise.reject(error);
  }
);

const httpRequestMethods = ['get', 'post', 'put', 'patch', 'delete', 'head'];
httpRequestMethods.forEach(method => {
  instance['$' + method] = (url, config) =>
    instance[method](
      Object.assign(
        {
          url,
          method
        },
        config
      )
    );
});

export default instance;
