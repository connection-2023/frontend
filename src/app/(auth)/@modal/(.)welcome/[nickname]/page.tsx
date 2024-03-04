import Welcome from '../../../_components/Register/Welcome';
import RouterModal from '@/components/Modal/RouterModal';

const WelcomeModal = ({
  params: { nickname },
}: {
  params: { nickname: string };
}) => (
  <RouterModal path="/">
    <Welcome nickname={decodeURIComponent(nickname)} />
  </RouterModal>
);

export default WelcomeModal;
