export default {
  'post /api/user/detail': (req, res) => {
    res.json({
      status: 200,
      data: {
        id: 10,
        username: '测试用户',
        avatar: 'https://via.placeholder.com/70',
        tel: '1313131313',
        sign: '个性签名123213123',
      },
    });
  },
  'post /api/user/edit': (req, res) => {
    res.json({
      status: 200,
      data: 'ok',
    });
  },
  'post /api/user/login': (req, res) => {
    res.json({
      status: 200,
      data: {
        id: 100,
        username: 'admin',
      },
    });
  },
  'post /api/user/register': (req, res) => {
    res.json({
      status: 200,
      data: {
        id: 100,
        username: 'admin',
      },
    });
  },
};
