import { Http } from '@/utils/http';
import { CommonEnum } from '@/enums';
import { Toast } from 'antd-mobile';

async function handleOrder(
  url: string,
  dispatch: any,
  payload: any,
  type: string,
) {
  const result = await Http({
    url,
    body: payload,
  });
  if (type === 'add') {
    Toast.success('预定成功');
  } else if (type === 'del') {
    Toast.success('取消预定成功');
  }
  dispatch({
    type: 'setOrder',
    payload: result,
  });
  return result;
}

export const house = {
  state: {
    detail: {},
    comments: [],
    page: CommonEnum.PAGE,
    showLoading: true,
    reloadCommentsNum: 0,
    order: null,
  },
  reducers: {
    setOrder(state: any, payload: any) {
      return {
        ...state,
        order: payload,
      };
    },
    getDetail(state: any, payload: any) {
      return {
        ...state,
        detail: payload,
      };
    },
    getComments(state: any, payload: any) {
      return {
        ...state,
        comments: payload,
      };
    },
    setShowLoading(state: any, payload: any) {
      return {
        ...state,
        showLoading: payload,
      };
    },
    reloadComments(state: any, payload: any) {
      return {
        ...state,
        reloadCommentsNum: state.reloadCommentsNum + 1,
        page: {
          ...CommonEnum.PAGE,
          pageNum: state.page.pageNum + 1,
        },
      };
    },
    resetData(state: any, payload: any) {
      return {
        ...state,
        comments: [],
        page: CommonEnum.PAGE,
        showLoading: true,
        reloadCommentsNum: -1,
        ...payload,
      };
    },
  },
  effects: {
    async getDetailAsync(dispatch: any, rootState: any, payload: any) {
      const detail = await Http({
        url: `/house/detail?id=${payload.id}`,
        method: 'get',
      });
      dispatch({
        type: 'getDetail',
        payload: detail,
      });
    },
    async getCommentsAsync(dispatch: any, rootState: any, payload: any) {
      const { comments, page } = rootState.house;
      const lists: any = await Http({
        url: '/comment/lists',
        body: {
          ...payload,
          pageSize: page.pageSize,
          pageNum: page.pageNum,
        },
      });
      dispatch({
        type: 'getComments',
        payload: [...comments, ...lists],
      });
      dispatch({
        type: 'setShowLoading',
        payload: !!lists.length,
      });
    },
    async addCommentsAsync(dispatch: any, rootState: any, payload: any) {
      const result = await Http({
        url: '/comment/add',
        body: payload,
      });
      if (result) {
        dispatch({
          type: 'resetData',
          payload: {},
        });
      }
    },
    async hasOrderAsync(dispatch: any, rootState: any, payload: any) {
      return await handleOrder('/orders/hasOrder', dispatch, payload, '');
    },
    async addOrderAsync(dispatch: any, rootState: any, payload: any) {
      return await handleOrder('/orders/addOrder', dispatch, payload, 'add');
    },
    async delOrderAsync(dispatch: any, rootState: any, payload: any) {
      return await handleOrder('/orders/delOrder', dispatch, payload, 'del');
    },
  },
};
