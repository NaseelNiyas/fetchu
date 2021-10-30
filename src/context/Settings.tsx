import { stringify } from 'flatted';
import { Settings } from '../types';
import { createContext, useState } from 'react';

export const SettingsContext = createContext<Settings>({} as Settings);

export const SettingsWrapper = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const [accentColor, changeAccentColor] = useState<string>(
    localStorage.getItem('accentColor') || 'purple'
  );

  const [defaultHTTP, changeDefaultHTTP] = useState(
    JSON.parse(localStorage.getItem('defaultHTTP')!) || false
  );

  // @ts-ignore
  const [envVars, changeEnvVars] = useState<any[]>(
    // @ts-ignore
    JSON.parse(localStorage.getItem('envVars') as unknown as any[]) || []
  );

  const setDefaultHTTP = (val: boolean) => {
    localStorage.setItem('defaultHTTP', val.toString());
    changeDefaultHTTP(val);
  };

  const setAccentColor = (color: string) => {
    localStorage.setItem('accentColor', color);
    changeAccentColor(color);
  };

  const setEnvVars = (envVars: any[]) => {
    localStorage.setItem('envVars', JSON.stringify(envVars));
    changeEnvVars(envVars);
  };

  return (
    <div>
      <SettingsContext.Provider
        value={{
          accentColor,
          setAccentColor,
          defaultHTTP,
          setDefaultHTTP,
          envVars,
          setEnvVars,
        }}
      >
        {children}
      </SettingsContext.Provider>
    </div>
  );
};
