import { useState, useEffect } from 'react';
import { Http } from '@/utils/http';

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

  useEffect(() => {
    void Http({
      setLoading,
      setResult,
      method,
      headers,
      body,
      url,
    });
  }, watch);

  return [result as T, loading];
}

export { useHttpHook };
