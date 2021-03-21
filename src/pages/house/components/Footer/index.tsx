import React, { useCallback, useState } from 'react';
import { Modal } from '@/components/Modal';
import { TextareaItem, Button } from 'antd-mobile';

const Footer: React.FC = () => {
  const [show, setShow] = useState(false);
  const handleClick = useCallback(() => {
    setShow(true);
  }, [setShow]);
  const handleChange = (value: string) => {
    console.log('value', value);
  };
  return (
    <>
      <div className="footer" onClick={handleClick}>
        评论~
      </div>
      <Modal
        onClose={() => setShow(false)}
        show={show}
        styleBody={{
          height: 220,
          bottom: 0,
          top: 'unset',
        }}
      >
        <div className="modal-comment">
          <TextareaItem rows={2} count={200} onChange={handleChange} />
          <Button className="comment-btn" type="warning">
            评论
          </Button>
        </div>
      </Modal>
    </>
  );
};

export { Footer };
