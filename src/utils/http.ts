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
    fetch('/api' + url, params)
      .then((res) => res.json())
      .then((res) => {
        if (res.status === 200) {
          resolve(res.data);
          setResult && setResult(res.data);
        } else {
          if (res.status === 1001) {
            location.href = `/login?from=${window.encodeURIComponent(
              location.pathname + location.search,
            )}`;
            localStorage.clear();
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
