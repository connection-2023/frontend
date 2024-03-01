import { userPassList } from '@/types/pass';

const Pass = ({ passInfo }: { passInfo: userPassList }) => {
  return <div>{passInfo.id}</div>;
};

export default Pass;
