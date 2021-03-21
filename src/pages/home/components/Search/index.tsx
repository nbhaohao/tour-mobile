import React, { useCallback, useState } from 'react';
import { Picker, List, Calendar, Button } from 'antd-mobile';
import dayjs from 'dayjs';

const CITIES = [
  [
    { label: '杭州', value: '10001' },
    {
      label: '苏州',
      value: '10002',
    },
  ],
];

const Search: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState(['10001']);
  const handleCityChange = useCallback((value) => {
    setSelectedCity(value);
  }, []);
  const [times, setTimes] = useState('可选时间');
  const [dateShow, setDateShow] = useState(false);
  const handleDate = useCallback(() => {
    setDateShow((value) => !value);
  }, [setDateShow]);
  const handleDateConfirm = useCallback(
    (startTime, endTime) => {
      console.log('startTime', startTime);
      console.log('endTime', endTime);
      setTimes(
        `${dayjs(startTime).format('YYYY-MM-DD')} ~ ${dayjs(endTime).format(
          'YYYY-MM-DD',
        )}`,
      );
      handleDate();
    },
    [setTimes, handleDate],
  );
  return (
    <div className="search">
      <div className="search-addr">
        <Picker
          title="城市"
          data={CITIES}
          value={selectedCity}
          cascade={false}
          cols={1}
          onChange={handleCityChange}
        >
          <List.Item>可选城市</List.Item>
        </Picker>
      </div>
      <div className="search-time" onClick={handleDate}>
        <p className="search-time_left">出租时间</p>
        <p className="search-time_right">{times}</p>
      </div>
      <Button type="warning" size="large">
        搜索民宿
      </Button>
      <Calendar
        visible={dateShow}
        onCancel={handleDate}
        onConfirm={handleDateConfirm}
      />
    </div>
  );
};

export { Search };
