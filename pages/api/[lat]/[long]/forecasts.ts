import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import {
  Forecast, ForecastResponse, LocalesResponse,
} from 'shared/types';
import { timeToWeekDay } from 'helpers/convertor';

export default async (req: NextApiRequest, res: NextApiResponse<Forecast | string>) => {
  const { lat, long } = req.query;

  try {
    const forecastRequest = axios.get<ForecastResponse>(
      `${process.env.OPEN_WEATHER_MAP_API_URL_COORD}lat=${lat}&lon=${long}&exclude=minutely,hourly,alerts&units=metric&appid=${process.env.OPEN_WEATHER_MAP_API_KEY}`,
    );

    const localeRequest = axios.get<LocalesResponse>(
      `${process.env.OPEN_WEATHER_MAP_API_URL_CITY_REVERSE}lat=${lat}&lon=${long}&limit=1&appid=${process.env.OPEN_WEATHER_MAP_API_KEY}`,
    );

    const requestsResolved = await Promise.all([forecastRequest, localeRequest]);

    const [{ data: forecast }, { data: locale }] = requestsResolved;

    if (!forecast || !locale) return res.status(404).send('Forecasts for the location given not found');

    return res.status(200).json({
      id: forecast.current.weather[0]?.id,
      where: `${locale[0].name}, ${locale[0].country}`,
      when: timeToWeekDay(forecast.current.dt),
      desc: forecast.current.weather[0]?.main || '-',
      temp: `${forecast.current.temp}º`,
      icon: forecast.current.weather[0]?.icon || '01d',
      nextDays: forecast.daily.slice(1, 7).map((item) => ({
        when: timeToWeekDay(item.dt),
        desc: item.weather[0]?.main || '-',
        min: `${item.temp.min.toFixed()}ºC`,
        max: `${item.temp.max.toFixed()}ºC`,
        icon: item.weather[0]?.icon || '01d',
        id: item.dt,
      })),
    });
  } catch (e) {
    console.error(e);
  }

  return res.status(404).send('Forecasts for the given location/coords not found');
};
