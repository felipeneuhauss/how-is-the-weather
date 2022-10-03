/** @jsxImportSource theme-ui */
/** @jsxRuntime automatic */

import { Box, Flex, Text } from 'theme-ui';

import dynamic from 'next/dynamic';
import { useWeatherForecasts } from '../contexts/MainWeatherProvider';

const Forecast = dynamic(() => import('./WeatherForecast'), {
  loading: () => <div>Loading local weather...</div>,
  ssr: false,
});

const Header = () => {
  const { localForecast } = useWeatherForecasts();
  return (
    <Box sx={{
      bg: 'primary',
      width: '100%',
      px: [20, null, null, 0],
      py: [20, null, null, 80],
    }}
    >
      <Flex
        sx={{
          width: ['100%', null, null, 1024],
          margin: '0 auto',
          flexDirection: ['column', null, null, 'row'],
          gap: 20,
          alignItems: 'flex-start',
        }}
      >
        <Flex sx={{
          color: 'white',
          width: ['100%', null, null, '50%'],
          flexDirection: 'column',
        }}
        >
          <>
            <Text as="h1">How is the weather today?</Text>
            <Text as="h2">
              Check here the weather where you are
            </Text>
          </>
        </Flex>
        <Flex sx={{ width: ['100%', null, null, '50%'], justifyContent: ['center', null, 'start'] }}>
          {localForecast && <Forecast forecast={localForecast} />}
        </Flex>
      </Flex>
    </Box>
  );
};
export default Header;
