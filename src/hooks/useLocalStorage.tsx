import { useEffect, useState, useCallback } from 'react';

const useLocalStorage = (key: string, defaultValue: string) => {
  const [value, setValue] = useState(() => {
    const jsonValue = localStorage.getItem(key);
    if (jsonValue != null) return JSON.parse(jsonValue);

    if (typeof defaultValue === 'function') {
      // @ts-ignore
      return defaultValue();
    } else {
      return defaultValue;
    }
  });

  useEffect(() => {
    if (defaultValue === undefined) return localStorage.removeItem(key);
    localStorage.setItem(key, JSON.stringify(defaultValue));
  }, [key, defaultValue]);

  const remove = useCallback(() => {
    setValue(undefined);
  }, []);

  return [value, setValue, remove];
};

export default useLocalStorage;
