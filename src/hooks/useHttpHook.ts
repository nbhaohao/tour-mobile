import { useState, useEffect } from 'react';
import { Toast } from 'antd-mobile';

interface HttpHookParams {
  url: string;
  defaultValue: any;
  method?: string;
  headers?: {};
  body?: {};
  watch?: Array<any>;
}
function useHttpHook<T>({
  url,
  defaultValue,
  method = 'post',
  headers = {},
  body = {},
  watch = [],
}: HttpHookParams): [result: T, loading: boolean] {
  const [result, setResult] = useState<T>(defaultValue);
  const [loading, setLoading] = useState(true);

  async function Http() {
    setLoading(true);

    const defaultHeader = {
      'Content-type': 'application/json',
    };

    let params: any;
    if (method.toUpperCase() === 'GET') {
      params = undefined;
    } else {
      params = {
        headers: {
          ...defaultHeader,
          headers,
        },
        method,
        body: JSON.stringify(body),
      };
    }
    console.log('url', 'request')
    return new Promise((resolve, reject) => {
      fetch('/api' + url, params)
        .then((res) => res.json())
        .then((res) => {
          if (res.status === 200) {
            resolve(res.data);
            setResult(res.data);
          } else {
            Toast.fail(res.errMsg);
            reject(res.errMsg);
          }
        })
        .catch((err) => {
          Toast.fail(err);
          reject(err);
        })
        .finally(() => {
          setLoading(false);
        });
    });
  }

  useEffect(() => {
    void Http();
  }, watch);

  return [result as T, loading];
}

export { useHttpHook };
