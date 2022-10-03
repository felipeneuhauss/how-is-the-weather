import { useEffect, useState } from 'react';

const useGetCurrentLatLong = () => {
  const [lat, setLat] = useState(38.725);
  const [long, setLong] = useState(-9.137);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
    });
  }, []);

  console.log(lat, long);
  return { lat, long };
};

export default useGetCurrentLatLong;
