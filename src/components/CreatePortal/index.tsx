import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

interface CreatePortalProps {
  style: React.CSSProperties;
}

const CreatePortal: React.FC<CreatePortalProps> = ({ children, style }) => {
  const el = document.createElement('div');
  useEffect(() => {
    const body = document.querySelector('body');
    el.setAttribute('id', 'portal-root');
    for (const styleName in style) {
      // @ts-ignore
      el.style[styleName] = style[styleName];
    }
    body && body.appendChild(el);
    return () => {
      if (body && el) {
        body.removeChild(el);
      }
    };
  }, []);
  return ReactDOM.createPortal(children, el);
};

export { CreatePortal };
