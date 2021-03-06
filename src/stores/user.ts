import { Http } from '@/utils/http';
import { Toast } from 'antd-mobile';
import { history } from 'umi';
import { urlGet } from 'project-libs';
import { LoginResponse } from '@/types/user';

export const user = {
  state: {
    id: undefined,
    username: undefined,
    avatar: undefined,
    phone: undefined,
    sign: undefined,
  },
  reducers: {
    getUser(state: any, payload: any) {
      return {
        ...state,
        ...payload,
      };
    },
    editUser(state: any, payload: any) {
      return {
        ...state,
        ...payload,
      };
    },
  },
  effects: {
    async getUserAsync(dispatch: any, rootState: any, payload: any) {
      const user = await Http({
        url: '/user/detail',
        body: payload,
      });
      if (user) {
        dispatch({
          type: 'getUser',
          payload: user,
        });
      }
      return user;
    },
    async editUserAsync(dispatch: any, rootState: any, payload: any) {
      const result = await Http({
        url: '/user/edit',
        body: payload,
      });
      if (result) {
        Toast.success('编辑成功');
        history.push('/user');
      }
    },
    async loginAsync(dispatch: any, rootState: any, payload: any) {
      const result = await Http<LoginResponse>({
        url: '/user/login',
        body: payload,
      });
      if (result) {
        localStorage.setItem('token', result.token);
        localStorage.setItem('username', result.username);
        history.push(window.decodeURIComponent(urlGet('from') || '') || '/');
        Toast.success('登录成功');
      }
    },
    async registerAsync(dispatch: any, rootState: any, payload: any) {
      const result = await Http<LoginResponse>({
        url: '/user/register',
        body: payload,
      });
      localStorage.setItem('token', result.token);
      localStorage.setItem('username', result.username);
      if (result) {
        Toast.success('注册成功');
        history.push(window.decodeURIComponent(urlGet('from') || '') || '/');
      }
    },
    async logoutAsync(dispatch: any, rootState: any, payload: any) {
      await Http({
        url: '/user/logout',
        body: payload,
      });
      Toast.success('退出登录成功');
      setTimeout(() => {
        localStorage.clear();
        location.hash = `#/login?from=${window.encodeURIComponent(
          location.hash.slice(1),
        )}`;
      }, 1000);
    },
  },
};
