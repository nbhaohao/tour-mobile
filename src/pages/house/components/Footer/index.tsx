import React, { useCallback, useState } from 'react';
import { TextareaItem, Button, Toast, Modal } from 'antd-mobile';
import { useStoreHook } from 'think-react-store';
import { useLocation } from 'umi';

const Footer: React.FC = React.memo(() => {
  const [show, setShow] = useState(false);
  const [commentsValue, setCommentsValue] = useState('');
  // @ts-ignore
  const { query } = useLocation();
  const {
    house: { addCommentsAsync },
  } = useStoreHook();
  const handleClick = useCallback(() => {
    setShow(true);
  }, [setShow]);
  const handleChange = (value: string | undefined) => {
    setCommentsValue(value || '');
  };
  const handleSubmit = () => {
    if (!commentsValue) {
      Toast.fail('请输入评论信息');
      return;
    }
    setShow(false);
    addCommentsAsync({
      comment: commentsValue,
      houseId: query?.id,
    });
  };
  return (
    <>
      <div className="footer" onClick={handleClick}>
        评论~
      </div>
      <Modal
        animationType="slide-up"
        onClose={() => setShow(false)}
        visible={show}
        popup
      >
        <div className="modal-comment">
          <TextareaItem
            value={commentsValue}
            rows={2}
            count={200}
            onChange={handleChange}
          />
          <Button className="comment-btn" type="warning" onClick={handleSubmit}>
            评论
          </Button>
        </div>
      </Modal>
    </>
  );
});

export { Footer };
