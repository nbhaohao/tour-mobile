import React, { useCallback, useEffect, useState } from 'react';
import './index.less';
import { SearchBar, ActivityIndicator } from 'antd-mobile';
import { useHttpHook } from '@/hooks/useHttpHook';
import { useObserverHook } from '@/hooks/useObserverHook';
import { Houses } from '@/types/house';
import { useLocation } from 'umi';

const Search: React.FC = () => {
  // @ts-ignore
  const { query } = useLocation();
  console.log(query);
  const [houseName, setHouseName] = useState('');
  const [houseSubmitName, setHouseSubmitName] = useState('');
  const [page, setPage] = useState({
    pageSize: 8,
    pageNum: 1,
  });
  const handleChange = useCallback((value) => {
    setHouseName(value);
  }, []);
  const [houses, loading] = useHttpHook<Houses>({
    url: '/house/search',
    defaultValue: [],
    watch: [page.pageNum, houseSubmitName],
    body: {
      ...page,
      houseName,
      code: query?.code,
      startTime: query?.startTime + ' 00:00:00',
      endTime: query?.endTime + ' 23:59:59',
    },
  });
  const [housesList, setHousesList] = useState<Houses>([]);
  const [showLoading, setLoading] = useState(true);
  useObserverHook({
    element: '#loading',
    callback: (entries) => {
      if (loading || !entries[0].isIntersecting) {
        return;
      }
      setPage((value) => ({ ...value, pageNum: value.pageNum + 1 }));
    },
  });
  useEffect(() => {
    if (!loading && houses) {
      if (houses.length) {
        setHousesList((value) => [...value].concat(houses));
        if (houses.length < page.pageSize) {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    }
  }, [loading, houses, page.pageSize]);
  const _handleSubmit = (value: string) => {
    setHouseName(value);
    setHouseSubmitName(value);
    setPage((value) => ({ ...value, pageNum: 1 }));
    setHousesList([]);
  };
  const handleCancel = () => {
    _handleSubmit('');
  };
  const handleSubmit = (value: string) => {
    _handleSubmit(value);
  };
  const renderSearchResult = (
    result: Houses,
    loading: boolean,
    showLoading: boolean,
  ) => {
    if (loading) {
      return <ActivityIndicator toast />;
    }
    return (
      <div className="result">
        {result.map(({ id, img, title, price }) => {
          return (
            <div className="item" key={id}>
              <img alt="img" src={img} />
              <div className="item-right">
                <div className="title">{title}</div>
                <div className="price">¥{price}</div>
              </div>
            </div>
          );
        })}
        {showLoading ? (
          <div id="loading">loading</div>
        ) : (
          <div>没有更多的数据了</div>
        )}
      </div>
    );
  };
  return (
    <div className="search-page">
      <SearchBar
        placeholder="搜索民宿"
        value={houseName}
        onChange={handleChange}
        onCancel={handleCancel}
        onSubmit={handleSubmit}
      />
      {renderSearchResult(housesList, !housesList.length, showLoading)}
    </div>
  );
};

export default Search;
