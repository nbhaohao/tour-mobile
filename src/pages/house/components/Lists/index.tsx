import React from 'react';

const Lists: React.FC = () => {
  return (
    <div className="comment">
      <h1 className="comment-title">评论列表</h1>
      <div className="comment-lists">
        <div className="comment-lists_item">
          <img
            alt="user"
            className="avatar"
            src={'https://via.placeholder.com/150'}
          />
          <div className="right">
            <div className="right-top">
              <p>{'user'}</p>
              <p>{'time'}</p>
            </div>
            <div className="right-bottom">{'info'}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Lists };
