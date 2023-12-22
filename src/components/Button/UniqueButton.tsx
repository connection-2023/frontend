import { ButtonSizes } from '../../constants/constants';

interface UniqueButtonProps {
  size?: 'xsmall' | 'small' | 'medium' | 'large';
  color?: 'primary' | 'secondary';
  children?: React.ReactNode;
  type?: 'button' | 'submit';
  onClick?: () => void;
}

const UniqueButton = ({
  size = 'medium',
  color = 'primary',
  children,
  onClick,
  type = 'button',
}: UniqueButtonProps) => {
  const buttonStyles = {
    primary:
      'hover:bg-sub-color1-transparent group flex w-full items-center justify-center rounded-md border border-solid border-gray-500 bg-white text-gray-500 active:bg-sub-color1 active:text-white',
    secondary:
      'group flex w-full items-center justify-center rounded-md border border-solid border-gray-300 bg-white text-gray-300 hover:text-black active:bg-black active:text-white',
  };
  const buttonSize = `h-[${ButtonSizes[size]}px]`;
  const buttonColor = buttonStyles[color];

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${buttonSize} ${buttonColor}`}
    >
      {children}
    </button>
  );
};

export default UniqueButton;
