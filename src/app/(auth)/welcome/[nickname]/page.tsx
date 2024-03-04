'use client';
import Welcome from '../../_components/Register/Welcome';

const WelcomePage = ({
  params: { nickname },
}: {
  params: { nickname: string };
}) => <Welcome nickname={decodeURIComponent(nickname)} />;

export default WelcomePage;
