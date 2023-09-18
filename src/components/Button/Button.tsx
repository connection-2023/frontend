'use client';
import React from 'react';
import { ResetSVG } from '../../../public/icons/svg';

interface ButtonProps {
  primary?: boolean;
  mode?: 'default' | 'reset';
  backgroundColor?: string;
  size?: 'small' | 'medium' | 'large';
  children?: React.ReactNode;
  onClick?: () => void;
}

const btnSize = {
  small: 'text-sm px-[0.94rem] py-[0.35rem] ',
  medium: 'text-sm px-[0.87rem] py-[0.31rem] ',
  large: 'text-lg px-[6.25rem] py-[0.63rem] ',
};

const btnMode = {
  primary: 'text-white bg-main-color',
  secondary: 'text-white bg-black',
};

const commonStyle = 'flex cursor-pointer items-center whitespace-nowrap';

export const Button = ({
  primary = false,
  mode = 'default',
  size = 'medium',
  backgroundColor,
  children,
  ...props
}: ButtonProps) => {
  const styleType = primary ? 'primary' : 'secondary';
  return mode === 'reset' ? (
    <button onClick={props.onClick} className={`${commonStyle} text-[#B6B6B6]`}>
      {children}
      <ResetSVG className="ml-1" />
    </button>
  ) : (
    <button
      type="button"
      className={`${commonStyle} rounded-md ${primary ? 'font-bold' : ''} ${
        btnMode[styleType]
      } ${btnSize[size]}`}
      {...props}
    >
      {children}
      <style jsx>{`
        button {
          background-color: ${backgroundColor};
        }
      `}</style>
    </button>
  );
};
