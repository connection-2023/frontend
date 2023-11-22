import { ResetSVG } from '../../../public/icons/svg';
import { ButtonSizes } from '../../constants/constants';

interface ResetButtonProps {
  size?: 'small' | 'medium' | 'large';
  children?: React.ReactNode;
  onClick?: () => void;
}

const ResetButton = ({
  size = 'medium',
  children,
  onClick,
}: ResetButtonProps) => {
  const styles = `h-[${ButtonSizes[size]}] flex cursor-pointer items-center whitespace-nowrap text-gray-300 text-sm font-bold`;

  return (
    <button onClick={onClick} className={styles}>
      {children}
      <ResetSVG className="ml-1" />
    </button>
  );
};

export default ResetButton;
