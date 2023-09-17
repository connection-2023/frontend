'use client';
import React, { useEffect, useState } from 'react';
import {
  Container as MapDiv,
  Marker,
  NaverMap,
  useNavermaps,
} from 'react-naver-maps';
import { NavermapsProvider } from 'react-naver-maps';

const Map = ({ address }: { address: string }) => {
  const navermaps = useNavermaps();
  const [map, setMap] = useState<naver.maps.Map | null>(null);
  const [latLng, setLatLng] = useState(
    new navermaps.LatLng(37.5666103, 126.9783882),
  );

  useEffect(() => {
    navermaps.Service.geocode(
      {
        query: address,
      },
      function (status, response) {
        if (status === navermaps.Service.Status.ERROR) {
          return console.error('Geocode Error, address:' + address);
        }

        if (response.v2.meta.totalCount === 0) {
          return console.error('No result.');
        }

        let item = response.v2.addresses[0];

        setLatLng(new navermaps.LatLng(Number(item.y), Number(item.x)));
      },
    );
  }, [address, navermaps.Service]);

  useEffect(() => {
    if (map) {
      map.setCenter(latLng);
    }
  }, [latLng, map]);

  return (
    <NaverMap ref={setMap} defaultCenter={latLng}>
      <Marker position={latLng} />
    </NaverMap>
  );
};

const MapContainer = ({ address }: { address: string }) => {
  return (
    <NavermapsProvider
      submodules={['geocoder']}
      ncpClientId={process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID!}
    >
      <MapDiv
        style={{
          width: '100%',
          height: '100%',
        }}
      >
        <Map address={address} />
      </MapDiv>
    </NavermapsProvider>
  );
};

export default MapContainer;
