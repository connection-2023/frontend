'use client';
import { ButtonSizes, ButtonStyles } from '../../constants/constants';

interface StatusButtonProps {
  children: React.ReactNode;
  disabled: boolean;
  size?: 'small' | 'medium' | 'large';
  type?: 'button' | 'submit';
  onClick?: () => void;
}

const StatusButton = ({
  size = 'medium',
  children,
  type = 'button',
  disabled,
  onClick,
}: StatusButtonProps) => {
  const styles = `h-[${ButtonSizes[size]}px] ${
    disabled
      ? 'group flex w-full items-center justify-center rounded-md border border-solid border-gray-300 bg-white text-gray-300 cursor-not-allowed'
      : ButtonStyles.secondary
  }`;

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={styles}
    >
      {children}
    </button>
  );
};

export default StatusButton;
