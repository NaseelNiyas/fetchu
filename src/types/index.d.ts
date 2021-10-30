import { AxiosResponse, Method } from 'axios';

export interface Option {
  key: string;
  value: string;
  id: string;
}

export interface RequestType {
  url: string;
  setUrl: React.Dispatch<React.SetStateAction<string>>;
  method: Method;
  setMethod: React.Dispatch<React.SetStateAction<Method>>;
  params: Option[];
  setParams: React.Dispatch<React.SetStateAction<Option[]>>;
  headers: Option[];
  setHeaders: React.Dispatch<React.SetStateAction<Option[]>>;
  response: AxiosResponse<unknown, any>;
  setResponse: React.Dispatch<
    React.SetStateAction<AxiosResponse<unknown, any>>
  >;
  bodyData: string;
  setBodyData: React.Dispatch<React.SetStateAction<string>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  lang: 'json' | 'graphql';
  setLang: React.Dispatch<React.SetStateAction<'json' | 'graphql'>>;
  graphqlVars: string | null;
  setGraphqlVars: React.Dispatch<React.SetStateAction<string | null>>;
}

export interface ResponseParams {
  response: Response;
}

export interface EnvVar {
  name: string;
  value: string;
  id: string;
}

export interface Settings {
  accentColor: string;
  setAccentColor: (color: string) => void;
  defaultHTTP: boolean;
  setDefaultHTTP: (val: boolean) => void;
  envVars: EnvVar[];
  setEnvVars: (envVars: EnvVar[]) => void;
}
