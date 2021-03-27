import { defineConfig } from 'umi';

export default defineConfig({
  publicPath: process.env.NODE_ENV === 'production' ? '/tour-mobile/' : '/',
  nodeModulesTransform: {
    type: 'none',
  },
  mock: false,
  proxy: {
    '/api': {
      target: 'http://127.0.0.1:7001/',
      changeOrigin: true,
    },
  },
  history: {
    type: 'hash',
  },
  routes: [
    {
      path: '/',
      component: '@/layouts/index',
      routes: [
        {
          path: '/',
          component: '@/pages/home/index',
          title: '首页',
        },
        {
          path: '/order',
          component: '@/pages/order/index',
          title: '订单',
          auth: true,
        },
        {
          path: '/user',
          component: '@/pages/user/index',
          title: '我的',
          auth: true,
        },
        {
          path: '/user/edit',
          component: '@/pages/user/edit',
          title: '设置用户',
        },
        {
          path: '/search',
          component: '@/pages/search/index',
          title: '搜索',
        },
        {
          path: '/house',
          component: '@/pages/house/index',
          title: '房屋详情',
        },
        {
          path: '/login',
          component: '@/pages/login/index',
          title: '登录',
        },
        {
          path: '/register',
          component: '@/pages/register/index',
          title: '注册',
        },
      ],
    },
  ],
  fastRefresh: {},
  extraBabelPlugins: [['import', { libraryName: 'antd-mobile', style: 'css' }]],
});
