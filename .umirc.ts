import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
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
        },
        {
          path: '/user',
          component: '@/pages/user/index',
          title: '我的',
        },
        {
          path: '/search',
          component: '@/pages/search/index',
          title: '搜索',
        },
        {
          path: '/house',
          component: '@/pages/house/index',
          title: '房屋详情'
        }
      ],
    },
  ],
  fastRefresh: {},
  extraBabelPlugins: [['import', { libraryName: 'antd-mobile', style: 'css' }]],
});