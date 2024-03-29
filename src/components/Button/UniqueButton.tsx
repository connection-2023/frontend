import { ComponentPropsWithoutRef } from 'react';
import { ButtonSizes } from '../../constants/constants';

interface UniqueButtonProps extends ComponentPropsWithoutRef<'button'> {
  size?: 'xsmall' | 'small' | 'medium' | 'large';
  color?: 'primary' | 'secondary';
}

const UniqueButton = (props: UniqueButtonProps) => {
  const {
    size = 'medium',
    color = 'primary',
    children,
    type = 'button',
    ...rest
  } = props;
  const buttonStyles = {
    primary:
      'hover:bg-sub-color1-transparent group flex w-full items-center justify-center rounded-md border border-solid border-gray-500 bg-white text-gray-500 active:bg-sub-color1 active:text-white',
    secondary:
      'group flex w-full items-center justify-center rounded-md border border-solid border-gray-300 bg-white text-gray-300 hover:text-black active:bg-black active:text-white',
  };
  const buttonSize = `h-[${ButtonSizes[size]}px]`;
  const buttonColor = buttonStyles[color];

  return (
    <button type={type} className={`${buttonSize} ${buttonColor}`} {...rest}>
      {children}
    </button>
  );
};

export default UniqueButton;
