/** @jsxRuntime automatic */
/** @jsxImportSource theme-ui */

import React from 'react';
import {
  Box, Button, Flex, Text,
} from 'theme-ui';
import WeatherIcon from './WeatherIcon';
import { Forecast, NextDay } from '../shared/types';

type ForecastProps = {
  forecast: Forecast,
  // eslint-disable-next-line react/require-default-props
  onForecastRemoved?: (id: number) => void
}

const WeatherForecast: React.FC<ForecastProps> = ({
  forecast, onForecastRemoved,
}: ForecastProps) => {
  const handleRemoveCityForecast = () => {
    if (onForecastRemoved) {
      onForecastRemoved(forecast.id);
    }
  };

  return (
    <Box data-cy="weather-forecast-component">
      <>
        <Flex sx={{
          flexDirection: 'row',
        }}
        >
          <Flex sx={{
            flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 12,
          }}
          >
            <WeatherIcon icon={forecast?.icon!} alt={forecast?.desc || '-'} />
            <Text as="span" sx={{ fontSize: 28, fontWeight: 'bold' }}>{forecast?.temp}</Text>
            <Text
              as="h2"
              sx={{ fontSize: 28, fontWeight: 'bold', position: 'relative' }}
              data-cy="weather-forecast-component-locale"
            >
              {forecast.where}
              {' '}
            </Text>
            {onForecastRemoved
                && (
                <Button
                  sx={{ p: 1, fontSize: 12, cursor: 'pointer' }}
                  onClick={() => handleRemoveCityForecast()}
                >
                  Remove
                </Button>
                )}
          </Flex>
        </Flex>
        <Flex sx={{
          flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8,
        }}
        >
          {forecast.nextDays.length && forecast.nextDays.map((day: NextDay) => (
            <Flex sx={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }} key={`${day.id}`}>
              <Text as="span" sx={{ fontSize: 12 }}>{day.when}</Text>
              <WeatherIcon icon={day?.icon} alt={day?.desc || '-'} />
              <Text as="span" sx={{ fontSize: 16, fontWeight: 'bold' }}>{day.min}</Text>
              <Text as="span" sx={{ fontSize: 22, fontWeight: 'bold' }}>{day.max}</Text>
              <Text as="span" sx={{ fontSize: 14 }}>{day.desc}</Text>
            </Flex>
          ))}
        </Flex>
      </>
    </Box>
  );
};

export default WeatherForecast;
