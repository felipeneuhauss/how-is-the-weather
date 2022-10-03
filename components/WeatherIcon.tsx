import Image from 'next/image';
import React from 'react';

const WeatherIcon = ({ icon, alt } : {icon: string, alt: string}) => (
  <Image
    src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
    alt={alt}
    width={100}
    height={100}
  />
);

export default React.memo(WeatherIcon);
