import request from '@/request';

/**
 * @description 获取用户名
 * @param {String} id 用户ID 
 */
export const getName = (id) => request.$get('/getname', {
  params: {
    id
  }
});

/**
 * @description 设置用户名
 * @param {*} id 用户ID
 * @param {*} name 用户名
 */
export const setName = (id, name) => request.$post('/setname', {
  data: {
    id,
    name
  }
});