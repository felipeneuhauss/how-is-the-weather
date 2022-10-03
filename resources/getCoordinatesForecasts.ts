import axios from 'axios';
import { Forecast } from '../shared/types';

async function getCoordinatesForecasts(
  lat: number,
  lon: number,
): Promise<any> {
  const { data } = await axios.get<Forecast>(`api/${lat}/${lon}/forecasts`);
  try {
    if (!data) throw new Error('No weather forecast found');

    return data;
  } catch (_) {
    // This catch could be improved with real error message
    throw new Error('Weather API unavailable');
  }
}

export default getCoordinatesForecasts;
