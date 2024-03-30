'use client';
import { NavermapsProvider } from 'react-naver-maps';

const NAVER_CLIENT_ID = process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID;

const NaverMapsProviders = ({ children }: { children: React.ReactNode }) => {
  if (!NAVER_CLIENT_ID) {
    return <>{children}</>;
  }

  return (
    <NavermapsProvider ncpClientId={NAVER_CLIENT_ID} submodules={['geocoder']}>
      {children}
    </NavermapsProvider>
  );
};

export default NaverMapsProviders;
