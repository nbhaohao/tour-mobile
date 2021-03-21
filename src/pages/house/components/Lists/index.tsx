import React from 'react';
import { ShowLoading } from '@/components';
import { Comments } from '@/types/comment';
import timer from '@/utils/timer';

interface ListsProps {
  showLoading: boolean;
  lists: Comments;
}

const Lists: React.FC<ListsProps> = ({ showLoading, lists }) => {
  return (
    <div className="comment">
      <h1 className="comment-title">评论列表</h1>
      <div className="comment-lists">
        {(lists || []).map(({ avatar, id, username, createTime, info }) => {
          return (
            <div className="comment-lists_item" key={id}>
              <img alt="user" className="avatar" src={avatar} />
              <div className="right">
                <div className="right-top">
                  <p>{username}</p>
                  <p>{timer(createTime)}</p>
                </div>
                <div className="right-bottom">{info}</div>
              </div>
            </div>
          );
        })}
        <ShowLoading showLoading={showLoading} />
      </div>
    </div>
  );
};

export { Lists };
