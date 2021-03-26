import React, { memo, useCallback, useState } from 'react';
import { Picker, List, Calendar, Button, Toast } from 'antd-mobile';
import dayjs from 'dayjs';
import { Cities } from '@/types/city';
import { history } from 'umi';

interface SearchProps {
  cities: Cities;
  citiesLoading: boolean;
}

const Search: React.FC<SearchProps> = memo(({ cities, citiesLoading }) => {
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
  const handleClick = useCallback(() => {
    if (!times.includes('~')) {
      Toast.fail('请选择时间');
      return;
    }
    const [startTime, endTime] = times.split(' ~ ');
    history.push({
      pathname: '/search',
      query: {
        code: selectedCity,
        startTime,
        endTime,
      },
    });
  }, [times, selectedCity]);
  return (
    <div className="search">
      <div className="search-addr">
        {citiesLoading ? null : (
          <Picker
            title="城市"
            data={cities}
            value={cities.length === 0 ? [] : selectedCity}
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
      <Button type="warning" size="large" onClick={handleClick}>
        搜索民宿
      </Button>
      <Calendar
        visible={dateShow}
        onCancel={handleDate}
        onConfirm={handleDateConfirm}
      />
    </div>
  );
});

export { Search };
