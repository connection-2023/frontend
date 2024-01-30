import { ButtonSizes, ButtonStyles } from '../../constants/constants';

interface ButtonProps {
  size?: 'small' | 'medium' | 'large' | 'full';
  color?: 'primary' | 'default' | 'secondary';
  children?: React.ReactNode;
  type?: 'button' | 'submit';
  onClick?: () => void;
  disabled?: boolean;
}

const Button = ({
  size = 'medium',
  color = 'default',
  children,
  type = 'button',
  onClick,
  disabled = false,
}: ButtonProps) => {
  const DisabledStyled = {
    secondary:
      'bg-gray-500 text-white group flex w-full items-center justify-center rounded-md ',
    default: 'hover:bg-white active:text-sub-color1 active:bg-white',
    primary:
      'hover:text-white hover:bg-main-color active:text-white active:bg-main-color',
  };

  const styles = `${
    disabled ? DisabledStyled[color] : ButtonStyles[color]
  } group ${size === 'full' ? 'h-full' : `h-[${ButtonSizes[size]}px]`}`;

  return (
    <button
      type={type}
      onClick={onClick}
      className={styles}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
