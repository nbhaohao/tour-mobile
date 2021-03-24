export default {
  'post /api/house/search': (req, res) => {
    debugger;
    setTimeout(() => {
      const locationItems = [
        { title: '东城民宿', info: '东城区交通方便', price: '100' },
        {
          title: '西城民宿',
          info: '西城区山水怡情',
          price: '120',
        },
        {
          title: '新区民宿',
          info: '新区民宿位置优越',
          price: '200',
        },
        {
          title: '老城民宿',
          info: '老城区风景秀美',
          price: '220',
        },
      ];
      if (req.body.pageNum < 4) {
        res.json({
          status: 200,
          data: new Array(8).fill('').map((value, index) => {
            const item = {
              id: `${index}-${req.body.pageNum}`,
              img: 'https://www.dute.org/imgplaceholder/150x150?fontsize=12&text=点击我',
              ...locationItems[index % locationItems.length],
            };
            item.title = `${req.body.pageNum}-${item.title}`;
            return item;
          }),
        });
      } else {
        res.json({
          status: 200,
          data: [],
        });
      }
    }, 100);
  },
  'post /api/house/detail': (req, res) => {
    res.json({
      status: 200,
      data: {
        id: 8,
        banner: [
          'https://www.dute.org/imgplaceholder/150x150?fontsize=12&text=silde 1',
          'https://www.dute.org/imgplaceholder/150x150?fontsize=12&text=silde 2',
          'https://www.dute.org/imgplaceholder/150x150?fontsize=12&text=silde 3',
        ],
        info: {
          id: 8,
          img: '',
          title: '西城民宿',
          info: '西城区山水怡情',
          price: '120',
          publishTime: 1595238771000,
          startTime: 1595238771000,
          endTime: 1597917171000,
        },
      },
    });
  },
  'post /api/comments/lists': (req, res) => {
    setTimeout(() => {
      let data;
      if (req.body.pageNum < 4) {
        const examples = ['房屋很满意', '空气清新', '态度温和', '早餐味道美'];
        data = new Array(8).fill('').map((value, index) => {
          return {
            id: `${index}-${req.body.pageNum}`,
            avatar: 'https://www.dute.org/imgplaceholder/150x150?fontsize=12',
            username: `user-${index}-${req.body.pageNum}`,
            createTime: 1595238771000,
            info: examples[index % examples.length],
          };
        });
      } else {
        data = [];
      }
      res.json({
        status: 200,
        data,
      });
    }, 100);
  },
  'post /api/comments/add': (req, res) => {
    res.json({
      status: 200,
      data: 'ok',
    });
  },
};
