import { useEffect } from 'react';

interface UseImageHookParams {
  element: string;
  callback?: (entries: IntersectionObserverEntry[]) => void;
  watch?: Array<any> | undefined;
}

function useImageHook({
  element,
  callback,
  watch = undefined,
}: UseImageHookParams) {
  useEffect(() => {
    const nodes = document.querySelectorAll(element);
    let observer: IntersectionObserver;
    if (nodes && nodes.length) {
      observer = new IntersectionObserver((entries) => {
        callback && callback(entries);
        entries.forEach((item) => {
          if (item.isIntersecting) {
            const dataSrc = item.target.getAttribute('data-src');
            if (dataSrc) {
              item.target.setAttribute('src', dataSrc);
              observer.unobserve(item.target);
            }
          }
        });
      });
      nodes.forEach((imgDom) => {
        observer.observe(imgDom);
      });
    }
    return () => {
      if (nodes && nodes.length && observer) {
        observer.disconnect();
      }
    };
  }, watch);
}

export { useImageHook };
