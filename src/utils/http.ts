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
  headers = {},
  body,
  url,
}: HttpParams): Promise<R> {
  setLoading && setLoading(true);

  const token = localStorage.getItem('token');
  const defaultHeader: { [key: string]: string } = {
    'Content-type': 'application/json',
  };
  if (token) {
    defaultHeader.token = token;
  }

  let params: any = {
    headers: {
      ...defaultHeader,
      headers,
    },
    method,
  };
  if (method.toUpperCase() === 'POST') {
    params.body = JSON.stringify(body);
  }
  return new Promise((resolve, reject) => {
    fetch(
      `${
        process.env.NODE_ENV === 'development'
          ? '/api'
          : 'http://8.136.222.10:7001/api'
      }` + url,
      params,
    )
      .then((res) => {
        if (res.status === 429) {
          return {
            status: 429,
            errMsg: '请求频率过快，请60秒后在试',
          };
        }
        return res.json();
      })
      .then((res) => {
        if (res.status === 200) {
          resolve(res.data);
          setResult && setResult(res.data);
        } else if (res.status === 429) {
          Toast.fail(res.errMsg);
          reject(res.errMsg);
        } else {
          if (res.status === 1001) {
            if (!location.hash.includes('#/login')) {
              location.hash = `#/login?from=${window.encodeURIComponent(
                location.hash.slice(1),
              )}`;
              localStorage.clear();
            }
          }
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
