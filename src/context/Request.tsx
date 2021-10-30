import { Option } from '../types';
import { RequestType } from '../types';
import { Method, AxiosResponse } from 'axios';
import { createContext, useContext, useState } from 'react';
import { SettingsContext } from './Settings';

export const Context = createContext<RequestType>({} as RequestType);

export const TabWrapper = ({ children }: { children: any }) => {
  const { defaultHTTP } = useContext(SettingsContext);
  const [url, setUrl] = useState(!defaultHTTP ? 'http://' : '');
  const [method, setMethod] = useState<Method>('get');
  const [params, setParams] = useState<Option[]>([]);
  const [headers, setHeaders] = useState<Option[]>([]);
  const [bodyData, setBodyData] = useState('{\n\t\n}');
  const [response, setResponse] = useState<AxiosResponse>({} as AxiosResponse);
  const [loading, setLoading] = useState(false);
  const [lang, setLang] = useState<'json' | 'graphql'>('json');
  const [graphqlVars, setGraphqlVars] = useState<string | null>(null);
  return (
    <div>
      <Context.Provider
        value={{
          url,
          setUrl,
          method,
          setMethod,
          headers,
          params,
          setHeaders,
          setParams,
          response,
          setResponse,
          bodyData,
          setBodyData,
          loading,
          setLoading,
          lang,
          setLang,
          graphqlVars,
          setGraphqlVars,
        }}
      >
        {children}
      </Context.Provider>
    </div>
  );
};
