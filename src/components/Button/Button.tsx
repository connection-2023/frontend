import { ButtonSizes, ButtonStyles } from '../../constants/constants';

interface ButtonProps {
  size?: 'small' | 'medium' | 'large';
  color?: 'primary' | 'default' | 'secondary';
  children?: React.ReactNode;
  type?: 'button' | 'submit';
  onClick?: () => void;
}

const Button = ({
  size = 'medium',
  color = 'default',
  children,
  type = 'button',
  onClick,
}: ButtonProps) => {
  const styles = `h-[${ButtonSizes[size]}px] ${ButtonStyles[color]}`;

  return (
    <button type={type} onClick={onClick} className={styles}>
      {children}
    </button>
  );
};

export default Button;
