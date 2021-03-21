import React, { useCallback, useState } from 'react';
import { Picker, List, Calendar, Button } from 'antd-mobile';
import dayjs from 'dayjs';
import { Cities } from '@/types/city';

interface SearchProps {
  cities: Cities;
  citiesLoading: boolean;
}

const Search: React.FC<SearchProps> = ({ cities, citiesLoading }) => {
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
        {citiesLoading ? null : (
          <Picker
            title="城市"
            data={cities}
            value={selectedCity}
            cascade={false}
            cols={1}
            onChange={handleCityChange}
          >
            <List.Item>可选城市</List.Item>
          </Picker>
        )}
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
