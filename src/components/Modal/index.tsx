import React, { CSSProperties, useCallback, useEffect, useState } from 'react';
import { CreatePortal } from '../CreatePortal';
import { Icon } from 'antd-mobile';

const Styles: {
  modal: CSSProperties;
  body: CSSProperties;
  close: CSSProperties;
} = {
  modal: {
    position: 'relative',
    top: '0',
    left: '0',
    zIndex: 999,
  },
  body: {
    backgroundColor: '#fff',
    position: 'fixed',
    height: '100%',
    width: '100%',
    top: '0',
    left: '0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  close: {
    position: 'absolute',
    top: '10px',
    right: '10px',
  },
};

interface ModalProps {
  onClose: () => void;
  show: boolean;
  styleBody?: CSSProperties;
  styleClose?: CSSProperties;
}

const Modal: React.FC<ModalProps> = ({
  styleBody = {},
  styleClose = {},
  show,
  onClose,
  children,
}) => {
  const handleClose = useCallback(() => {
    onClose && onClose();
  }, [onClose]);
  // const [showModal, setShowModal] = useState(show);
  // useEffect(() => {
  //   setShowModal(show);
  // }, [show, setShowModal]);
  const _styleBody = {
    ...Styles.body,
    ...styleBody,
  };
  const _styleClose = {
    ...Styles.close,
    ...styleClose,
  };
  return (
    <>
      {show ? (
        <CreatePortal style={Styles.modal}>
          <div style={_styleBody}>
            {children}
            <Icon
              type="cross"
              size="lg"
              style={_styleClose}
              onClick={handleClose}
            />
          </div>
        </CreatePortal>
      ) : null}
    </>
  );
};

export { Modal };
