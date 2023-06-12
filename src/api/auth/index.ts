import request from '@/utils/request';
import axios, { AxiosPromise } from 'axios';
import { CaptchaResult, LoginData, LoginResult } from './types';

/**
 * 登录API
 *
 * @param data {LoginData}
 * @returns
 */
export function loginApi(data: LoginData): AxiosPromise<LoginResult> {
	console.log(data);
  // return request({
  //   url: '/login',
  //   method: 'post',
  //   params: data
  // });
  return axios.post('/login', data);
}

/**
 * 注销API
 */
export function logoutApi() {
  return request({
    url: '/api/v1/auth/logout',
    method: 'delete'
  });
}



/**
 * 获取验证码
 */
export function getCaptchaApi(): AxiosPromise<CaptchaResult> {
  return request({
    url: '/api/v1/auth/captcha',
    method: 'get'
  });
}
