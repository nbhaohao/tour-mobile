import { Toast } from 'antd-mobile';

interface HttpParams {
  url: string;
  method?: string;
  headers?: {};
  body?: {};
  setLoading?: (loading: boolean) => void;
  setResult?: (data: any) => void;
}

export async function Http<R>({
  setLoading,
  setResult,
  method = 'post',
  headers,
  body,
  url,
}: HttpParams): Promise<R> {
  setLoading && setLoading(true);

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
  return new Promise((resolve, reject) => {
    fetch('/api' + url, params)
      .then((res) => res.json())
      .then((res) => {
        if (res.status === 200) {
          resolve(res.data);
          setResult && setResult(res.data);
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
        setLoading && setLoading(false);
      });
  });
}
