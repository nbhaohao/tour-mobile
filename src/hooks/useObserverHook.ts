import { useEffect } from 'react';

interface UseObserverHookParams {
  element: string;
  callback: (entries: IntersectionObserverEntry[]) => void;
  watch?: Array<any> | undefined;
}

function useObserverHook({
  element,
  callback,
  watch = undefined,
}: UseObserverHookParams) {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      callback && callback(entries);
    });
    const dom = document.querySelector(element);
    if (dom) {
      observer.observe(dom);
    }
    return () => {
      if (observer && dom) {
        observer.unobserve(dom);
        observer.disconnect();
      }
    };
  }, watch);
}

export { useObserverHook };
