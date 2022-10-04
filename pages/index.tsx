/** @jsxRuntime automatic */
/** @jsxImportSource theme-ui */

import { Flex, Text } from 'theme-ui';
import { ReactElement, useEffect, useState } from 'react';
import Seo from 'components/Seo';
import MainLayout from 'layouts/MainLayout';
import { GetServerSidePropsContext } from 'next';
import parseCookies from 'shared/helpers/parse-cookies';
import { CityForecast, Forecast } from 'shared/types';
import { useWeatherForecasts } from 'contexts/MainWeatherProvider';
import getCoordinatesWeather from 'resources/getCoordinatesForecasts';
import WeatherForecast from 'components/WeatherForecast';
import Autocomplete from 'react-google-autocomplete';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
import { TOAST_DEFAULT_CONFIG } from 'shared/consts';
import Svg from 'components/Svg';
import { NextPageWithLayout } from './_app';

// eslint-disable-next-line no-undef
import PlaceResult = google.maps.places.PlaceResult;

export async function getServerSideProps({ req, res }: GetServerSidePropsContext) {
  const cookiesData = parseCookies(req);
  const localForecast = cookiesData.localForecast && cookiesData.localForecast !== 'undefined' ? JSON.parse(cookiesData.localForecast) : null;
  const cityForecastsSelected = cookiesData.cityForecasts && cookiesData.cityForecasts !== 'undefined' ? JSON.parse(cookiesData.cityForecasts) : null;
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=60, stale-while-revalidate=59',
  );

  return {
    props: {
      localForecast,
      cityForecastsSelected,
    },
  };
}

type HomeProps = {
  localForecast: Forecast | null
  cityForecastsSelected: CityForecast[] | null
};

const Home: NextPageWithLayout<HomeProps> = ({
  localForecast, cityForecastsSelected,
}: HomeProps) => {
  const [cityForecasts, setCityForecasts] = useState<CityForecast[]>(cityForecastsSelected || []);
  const [, setCookie] = useCookies(['cityForecasts']);
  const {
    onLocalForecastSelected,
    setLocalForecast,
  } = useWeatherForecasts();
  useEffect(() => {
    if (localForecast) {
      setLocalForecast(localForecast);
    }
    navigator.geolocation.getCurrentPosition(async (position) => {
      onLocalForecastSelected(await getCoordinatesWeather(
        position.coords.latitude,
        position.coords.longitude,
      ));
    }, async () => {
      onLocalForecastSelected(await getCoordinatesWeather(38.725, -9.137));
    });
  }, []);

  const setNewForecasts = (newCityForecasts: CityForecast[]) => {
    setCookie('cityForecasts', JSON.stringify(newCityForecasts), { path: '/' });
    setCityForecasts(() => newCityForecasts);
  };

  const handleAutocomplete = async (place: PlaceResult) => {
    if (!place.geometry?.location?.lat() || !place.geometry?.location?.lng()) {
      toast.error(
        'Coordinates not found ',
        TOAST_DEFAULT_CONFIG,
      );
      return;
    }

    if (cityForecasts.find(
      (cityForecast) => cityForecast.id === place.place_id,
    )) {
      toast.error(
        'City already added',
        TOAST_DEFAULT_CONFIG,
      );
      return;
    }

    const forecast = await getCoordinatesWeather(
      place.geometry?.location?.lat(),
      place.geometry?.location?.lng(),
    );

    const newCityForecasts = [...cityForecasts, {
      id: place.place_id,
      name: place.formatted_address,
      forecast,
    }];
    setNewForecasts(newCityForecasts);
    toast.success(
      'New place added ',
      TOAST_DEFAULT_CONFIG,
    );
  };

  const onForecastRemoved = (forecastId: number) => {
    const newCityForecasts = cityForecasts.filter(
      (cityForecast) => cityForecast.forecast.id !== forecastId,
    );

    setNewForecasts(newCityForecasts);
    toast.info('Weather forecast removed');
  };

  return (
    <>
      <Seo title="How is the weather today?" />
      <Flex sx={{
        flexDirection: 'column',
        maxWidth: 1024,
        margin: '20px auto',
        px: [20, null, null, 0],
      }}
      >
        <Flex sx={{
          flexDirection: 'column',
          gap: 16,
          mb: 100,
        }}
        >
          <Text as="h2" data-cy="h1-el">Search a city and find out how the weather is.</Text>
          <Autocomplete
            data-cy="autocomplete-el"
            style={{
              fontSize: 14, paddingTop: 8, paddingBottom: 8, paddingLeft: 4, paddingRight: 4,
            }}
            apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
            onPlaceSelected={(place) => handleAutocomplete(place)}
          />
          {cityForecasts.length ? (
            <Flex sx={{
              alignContent: 'center', justifyContent: 'center', flexDirection: 'column', mb: 50,
            }}
            >
              {cityForecasts.map(
                (cityForecast) => (
                  <WeatherForecast
                    key={cityForecast.id}
                    forecast={cityForecast.forecast}
                    onForecastRemoved={onForecastRemoved}
                  />
                ),
              )}
            </Flex>
          ) : (
            <Flex sx={{
              alignContent: 'center',
              justifyContent: 'center',
              maxWidth: 200,
              margin: '0 auto',
              pt: 100,
            }}
            >
              <Svg path="empty-state.svg" size="auto" />
            </Flex>
          )}
        </Flex>
      </Flex>
    </>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default Home;
