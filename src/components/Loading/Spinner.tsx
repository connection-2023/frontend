import { SpinnerSVG } from '../../../public/icons/svg';

const Spinner = ({ size = 80 }: { size?: number }) => (
  <div className="spinner">
    <SpinnerSVG width={size} height={size} />
  </div>
);

export default Spinner;
