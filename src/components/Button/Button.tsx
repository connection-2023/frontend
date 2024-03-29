import { ComponentPropsWithoutRef } from 'react';
import { ButtonSizes, ButtonStyles } from '../../constants/constants';

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  size?: 'small' | 'medium' | 'large' | 'full';
  color?: 'primary' | 'default' | 'secondary';
}

const Button = (props: ButtonProps) => {
  const {
    size = 'medium',
    color = 'default',
    disabled = false,
    children,
    ...rest
  } = props;

  const styles = (() => {
    if (disabled) {
      return 'group flex h-[35px] w-full cursor-not-allowed items-center justify-center rounded-md border border-solid border-gray-300 bg-white text-gray-300';
    } else {
      return `${ButtonStyles[color]} ${
        size === 'full' ? 'h-full' : `h-[${ButtonSizes[size]}px]`
      }`;
    }
  })();

  return (
    <button {...rest} className={styles}>
      {children}
    </button>
  );
};

export default Button;
