import React from 'react';
import { ResetSVG } from '../../../public/icons/svg';

interface ButtonProps {
  primary?: boolean;
  mode?: 'default' | 'reset';
  backgroundColor?: string;
  size?: 'small' | 'medium' | 'large';
  label: string;
  onClick?: () => void;
}

const btnSize = {
  small: 'text-sm px-[0.94rem] py-[0.35rem] ',
  medium: 'text-base px-5 py-3 ',
  large: 'text-lg px-[4.81rem] py-[0.81rem] ',
};

const btnMode = {
  primary: 'text-white bg-main-color',
  secondary: 'text-black bg-transparent shadow',
};

export const Button = ({
  primary = false,
  mode = 'default',
  size = 'medium',
  backgroundColor,
  label,
  ...props
}: ButtonProps) => {
  const styleType = primary ? 'primary' : 'secondary';
  return mode === 'reset' ? (
    <button
      onClick={props.onClick}
      className="flex cursor-pointer items-center text-[#B6B6B6]"
    >
      {label}
      <ResetSVG className="ml-1" />
    </button>
  ) : (
    <button
      type="button"
      className={`inline-block cursor-pointer rounded-md font-bold ${btnMode[styleType]} ${btnSize[size]}`}
      {...props}
    >
      {label}
      <style jsx>{`
        button {
          background-color: ${backgroundColor};
        }
      `}</style>
    </button>
  );
};
