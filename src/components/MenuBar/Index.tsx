import React, { useMemo } from 'react';
import { TabBar } from 'antd-mobile';
import {
  BsHouseDoorFill,
  BsHouseDoor,
  BsBagFill,
  BsBag,
  BsPersonFill,
  BsPerson,
} from 'react-icons/bs';
import { history } from 'umi';

import './index.less';

interface MenuBarProps {
  show: boolean;
  pathname: string;
}

const MenuBar: React.FC<MenuBarProps> = ({ show, pathname }) => {
  const tabs = useMemo(() => {
    const iconStyle = { fontSize: '1.5rem' };
    return [
      {
        title: '首页',
        selectedIcon: <BsHouseDoorFill style={iconStyle} />,
        icon: <BsHouseDoor style={iconStyle} />,
        link: '/',
      },
      {
        title: '订单',
        selectedIcon: <BsBagFill style={iconStyle} />,
        icon: <BsBag style={iconStyle} />,
        link: '/order',
      },
      {
        title: '我的',
        selectedIcon: <BsPersonFill style={iconStyle} />,
        icon: <BsPerson style={iconStyle} />,
        link: '/user',
      },
    ];
  }, []);
  return (
    <div className="menu-bar">
      <TabBar hidden={!show}>
        {tabs.map(({ title, icon, selectedIcon, link }) => (
          <TabBar.Item
            selected={pathname === link}
            key={link}
            icon={icon}
            title={title}
            selectedIcon={selectedIcon}
            onPress={() => {
              history.push(link);
            }}
          />
        ))}
      </TabBar>
    </div>
  );
};

MenuBar.defaultProps = {
  show: false,
  pathname: '',
};

export { MenuBar };
