export default {
  'post /api/commons/cities': (req, res) => {
    res.json({
      status: 200,
      data: [
        [
          { label: '杭州', value: '10001' },
          {
            label: '苏州',
            value: '10002',
          },
        ],
      ],
    });
  },
  'post /api/houses/hot': (req, res) => {
    res.json({
      status: 200,
      data: [
        {
          id: 1,
          img:
            'https://www.dute.org/imgplaceholder/150x150?fontsize=12&text=点击我',
          title: '东城民宿',
          info: '东城区交通方便',
          price: '100',
        },
        {
          id: 2,
          img:
            'https://www.dute.org/imgplaceholder/150x150?fontsize=12&text=点击我',
          title: '西城民宿',
          info: '西城区山水怡情',
          price: '120',
        },
        {
          id: 3,
          img:
            'https://www.dute.org/imgplaceholder/150x150?fontsize=12&text=点击我',
          title: '新区民宿',
          info: '新区民宿位置优越',
          price: '200',
        },
        {
          id: 4,
          img:
            'https://www.dute.org/imgplaceholder/150x150?fontsize=12&text=点击我',
          title: '老城民宿',
          info: '老城区风景秀美',
          price: '220',
        },
      ],
    });
  },
};
