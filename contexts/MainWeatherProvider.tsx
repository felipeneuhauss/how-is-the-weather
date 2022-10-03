import {
  createContext, useContext, useMemo, useState,
} from 'react';
import { Forecast } from 'shared/types';
import { useCookies } from 'react-cookie';
import 'react-toastify/dist/ReactToastify.css';

type WeatherProviderValueProps = {
    localForecast?: Forecast | null;
    onLocalForecastSelected: (forecast?: Forecast) => void;
    setLocalForecast: (forecast: Forecast) => void;
}

export const WeatherContext = createContext<WeatherProviderValueProps>({
  localForecast: null,
  onLocalForecastSelected: () => null,
  setLocalForecast: () => null,
});

const MainWeatherProvider = ({ children }: { children: any }) => {
  const [localForecast, setLocalForecast] = useState<Forecast>();

  const [, setCookie] = useCookies(['localForecast']);

  const onLocalForecastSelected = (lf?: Forecast) => {
    setCookie('localForecast', JSON.stringify(lf), { path: '/' });
    setLocalForecast(lf);
  };

  const value = useMemo(() => ({
    localForecast,
    onLocalForecastSelected,
    setLocalForecast,
  }), [localForecast, onLocalForecastSelected, setLocalForecast]);

  return (
    <WeatherContext.Provider value={value}>
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeatherForecasts = (): WeatherProviderValueProps => {
  const context = useContext(WeatherContext);
  if (!context) throw new Error('useWeatherForecasts must be used within a MainWeatherProvider');
  const {
    localForecast,
    onLocalForecastSelected,
    setLocalForecast,
  } = context;

  return {
    localForecast,
    onLocalForecastSelected,
    setLocalForecast,
  };
};

export default MainWeatherProvider;
