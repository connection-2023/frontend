'use client';
import '../../styles/mapInfowindow.css';
import { DEFAULT_ADDRESS } from '../../constants/constants';
import React, { useEffect, useState } from 'react';
import {
  InfoWindow,
  Marker,
  NaverMap,
  NavermapsProvider,
  useNavermaps,
  Container as MapDiv,
} from 'react-naver-maps';

interface MapProps {
  address: string;
  studioName: string;
}

const Map = ({ ...props }: MapProps) => {
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
  }, []);

  useEffect(() => {
    if (map && infowindow) {
      map.setCenter(latLng);

      infowindow.setContent(
        '<div class="infowindow-container">' +
          `<address class="studio-name">${studioName}</address>` +
          `<address class="studio-address">${address}</address>` +
          `<div class="button-container">
            <a class="start-button" href="https://www.naver.com" target="_blank" rel="noopener noreferrer">출발</a>
            <a class="destination-button" href="https://www.naver.com" target="_blank" rel="noopener noreferrer">도착</a>
          </div>` +
          '</div>',
      );
      infowindow.open(map, latLng);
    }
  }, [latLng]);

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

// const icon = {
//   content: [
//     '<div>',
//     `<svg xmlns="http://www.w3.org/2000/svg" width="29" height="30" viewBox="0 0 29 30" fill="none">
//   <path d="M23.8119 6.33061C22.5396 5.01243 20.853 4.20789 19.0567 4.06231C17.2605 3.91674 15.4731 4.43973 14.0174 5.53682C12.4902 4.36305 10.5894 3.8308 8.6976 4.04727C6.80583 4.26373 5.0637 5.21282 3.82202 6.70342C2.58035 8.19402 1.93136 10.1154 2.00576 12.0806C2.08015 14.0459 2.8724 15.909 4.22296 17.2948L11.6769 25.0095C12.301 25.6442 13.1417 26 14.0174 26C14.8932 26 15.7339 25.6442 16.358 25.0095L23.8119 17.2948C25.2134 15.8378 26 13.867 26 11.8127C26 9.75845 25.2134 7.78763 23.8119 6.33061ZM22.1195 15.5832L14.6656 23.2855C14.5808 23.374 14.4798 23.4442 14.3686 23.4922C14.2573 23.5401 14.138 23.5648 14.0174 23.5648C13.8969 23.5648 13.7776 23.5401 13.6663 23.4922C13.5551 23.4442 13.4541 23.374 13.3693 23.2855L5.91539 15.546C4.97406 14.5517 4.44695 13.2161 4.44695 11.8251C4.44695 10.4342 4.97406 9.09852 5.91539 8.10423C6.87462 7.12562 8.16833 6.57689 9.5163 6.57689C10.8643 6.57689 12.158 7.12562 13.1172 8.10423C13.2288 8.22048 13.3616 8.31275 13.5078 8.37572C13.6541 8.43869 13.811 8.47111 13.9694 8.47111C14.1279 8.47111 14.2848 8.43869 14.431 8.37572C14.5773 8.31275 14.7101 8.22048 14.8217 8.10423C15.7809 7.12562 17.0746 6.57689 18.4226 6.57689C19.7705 6.57689 21.0643 7.12562 22.0235 8.10423C22.9778 9.08549 23.5222 10.4139 23.5401 11.8049C23.5581 13.1959 23.0481 14.5388 22.1195 15.546V15.5832Z" fill="#B6B6B6"/>
//   <path d="M5.61531 6.33061C8.97617 3.35389 12.6171 5.91717 14.0174 7.5709C15.0177 6.33061 17.9785 4.34613 21.8195 6.3306C30.2217 11.9119 18.2185 20.594 13.4173 24.9351C1.41424 15.0127 1.41424 10.0515 5.61531 6.33061Z" />
// </svg>`,
//     '</div>',
//   ].join(''),
//   size: new navermaps.Size(30, 50),
//   anchor: new navermaps.Point(20, 28),
// }; 추후 마커 커스텀 시 추가 예정
