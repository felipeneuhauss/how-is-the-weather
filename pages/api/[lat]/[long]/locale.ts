import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { LocalesResponse, Locale } from 'shared/types';

// remove this guy
export default async (req: NextApiRequest, res: NextApiResponse<Locale>) => {
  const { lat, long } = req.query;

  const { data: locale } = await axios.get<LocalesResponse>(
    `${process.env.OPEN_WEATHER_MAP_API_URL_CITY_REVERSE}lat=${lat}&lon=${long}&limit=1&appid=${process.env.OPEN_WEATHER_MAP_API_KEY}`,
  );

  if (!locale) return res.status(404);

  return res.status(200).json(locale[0]);
};
