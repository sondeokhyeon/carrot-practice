import { useEffect, useState } from "react";

interface UseCoordsState {
  longitude: number | null;
  latitude: number | null;
}

export default function useCoords() {
  const [coords, setCoords] = useState<UseCoordsState>({
    longitude: null,
    latitude: null,
  });
  const onSuccess = ({
    coords: { longitude, latitude },
  }: GeolocationPosition) => {
    setCoords({ latitude, longitude });
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(onSuccess);
  }, []);
  return coords;
}
