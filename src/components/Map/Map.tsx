'use client';
import '../../styles/mapInfowindow.css';
import React, { useEffect, useState } from 'react';
import {
  InfoWindow,
  Marker,
  NaverMap,
  NavermapsProvider,
  useNavermaps,
  Container as MapDiv,
} from 'react-naver-maps';
import { DEFAULT_ADDRESS } from '../../constants/constants';

interface MapProps {
  address: string;
  studioName: string;
}

const Map = ({ ...props }: MapProps) => {
  return (
    <NavermapsProvider
      ncpClientId={process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID!}
      submodules={['geocoder']}
    >
      <MapDiv
        style={{
          width: '100%',
          height: '100%',
        }}
      >
        <NaverMapRenderer {...props} />
      </MapDiv>
    </NavermapsProvider>
  );
};

const NaverMapRenderer = ({ address, studioName }: MapProps) => {
  const navermaps = useNavermaps();
  const [map, setMap] = useState<naver.maps.Map | null>(null);
  const [infowindow, setInfoWindow] = useState<naver.maps.InfoWindow | null>(
    null,
  );
  const [latLng, setLatLng] = useState(
    new navermaps.LatLng(DEFAULT_ADDRESS.X, DEFAULT_ADDRESS.Y),
  );

  useEffect(() => {
    if (!address) {
      return;
    }

    navermaps.Service.geocode(
      {
        query: address,
      },
      function (status, response) {
        if (status === navermaps.Service.Status.ERROR) {
          return console.error('Geocode Error, address:' + address);
        }
        if (response.v2.meta.totalCount === 0) {
          return;
        }

        let item = response.v2.addresses[0];
        setLatLng(new navermaps.LatLng(Number(item.y), Number(item.x)));
      },
    );
  }, [address, navermaps.LatLng, navermaps.Service]);

  useEffect(() => {
    if (map && infowindow) {
      map.setCenter(latLng);
      const { x, y } = navermaps.TransCoord.fromLatLngToEPSG3857(latLng);

      const startLink = `https://map.naver.com/p/directions/${x},${y},${studioName}/-/-/transit?c=17.56,0,0,0,dh`;
      const destinationLink = `https://map.naver.com/p/directions/-/${x},${y},${studioName}/-/transit?c=17.56,0,0,0,dh`;

      const content = `
          <div class="infowindow-container">
            <address class="studio-name">${studioName}</address>
            <address class="studio-address">${address}</address>
            <div class="button-container">
              <a class="start-button" href="${startLink}" target="_blank" rel="noopener noreferrer">출발</a>
              <a class="destination-button" href="${destinationLink}" target="_blank" rel="noopener noreferrer">도착</a>
            </div>
          </div>
        `;

      infowindow.setContent(content);
      infowindow.open(map, latLng);
    }
  }, [address, infowindow, latLng, map, navermaps.TransCoord, studioName]);

  return (
    <NaverMap ref={setMap} defaultCenter={latLng}>
      <Marker position={latLng} />
      <InfoWindow
        content={address}
        ref={setInfoWindow}
        borderWidth={0}
        backgroundColor="none"
        anchorSize={new naver.maps.Size(0, 40)}
      />
    </NaverMap>
  );
};

export default Map;
