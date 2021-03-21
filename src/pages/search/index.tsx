import React, { useCallback, useState } from 'react';
import './index.less';
import { SearchBar, ActivityIndicator } from 'antd-mobile';
import { useHttpHook } from '@/hooks/useHttpHook';
import { Houses } from '@/types/house';

const Search: React.FC = () => {
  const [houseName, setHouseName] = useState('');
  const handleChange = useCallback((value) => {
    setHouseName(value);
  }, []);
  const [houses, loading] = useHttpHook<Houses>({
    url: '/house/search',
    defaultValue: [],
  });
  const handleCancel = () => {};
  const handleSubmit = () => {};
  const renderSearchResult = (result: Houses, loading: boolean) => {
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
      {renderSearchResult(houses, loading)}
    </div>
  );
};

export default Search;
