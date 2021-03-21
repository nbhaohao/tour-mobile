export default {
  'post /api/house/search': (req, res) => {
    res.json({
      status: 200,
      data: [
        {
          id: 1,
          img: 'https://via.placeholder.com/150?text=Click me',
          title: '东城民宿',
          info: '东城区交通方便',
          price: '100',
        },
        {
          id: 2,
          img: 'https://via.placeholder.com/150?text=Click me',
          title: '西城民宿',
          info: '西城区山水怡情',
          price: '120',
        },
        {
          id: 3,
          img: 'https://via.placeholder.com/150?text=Click me',
          title: '新区民宿',
          info: '新区民宿位置优越',
          price: '200',
        },
        {
          id: 4,
          img: 'https://via.placeholder.com/150?text=Click me',
          title: '老城民宿',
          info: '老城区风景秀美',
          price: '220',
        },
      ],
    });
  },
};
