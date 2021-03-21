export default {
  'post /api/order/lists': (req, res) => {
    setTimeout(() => {
      let data;
      if (req.body.pageNum < 4) {
        const testData = [
          {
            id: 1,
            img: 'https://via.placeholder.com/150',
            title: '东城民宿',
            info: '东城区交通方便',
            price: '100',
            createTime: '2020-07-05',
          },
          {
            id: 2,
            img: 'https://via.placeholder.com/150',
            title: '西城民宿',
            info: '西城区山水怡情',
            price: '120',
            createTime: '2020-07-05',
          },
          {
            id: 3,
            img: 'https://via.placeholder.com/150',
            title: '新区民宿',
            info: '新区民宿位置优越',
            price: '200',
            createTime: '2020-07-05',
          },
          {
            id: 4,
            img:
              'http://img1.mukewang.com/szimg/5a1f65a900015d1505400300-360-202.jpg',
            title: '老城民宿',
            info: '老城区风景秀美',
            price: '220',
            createTime: '2020-07-05',
          },
        ];
        data = new Array(8).fill('').map((value, index) => {
          const item = testData[index % testData.length];
          return {
            ...item,
            id: `${req.body.pageNum}-${index}`,
            title: `${req.body.pageNum}-${index}-${item.title}`,
          };
        });
      } else {
        data = [];
      }
      res.json({
        status: 200,
        data,
      });
    }, 500);
  },
};
