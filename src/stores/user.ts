import { Http } from '@/utils/http';
import { Toast } from 'antd-mobile';
import { history } from 'umi';

export const user = {
  state: {
    id: undefined,
    username: undefined,
    avatar: undefined,
    tel: undefined,
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
      const result = await Http({
        url: '/user/login',
        body: payload,
      });
      if (result) {
        Toast.success('登录成功');
      }
    },
    async registerAsync(dispatch: any, rootState: any, payload: any) {
      const result = await Http({
        url: '/user/register',
        body: payload,
      });
      if (result) {
        Toast.success('注册成功');
      }
    },
  },
};
