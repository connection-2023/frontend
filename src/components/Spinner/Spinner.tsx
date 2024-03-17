import React from 'react';

const Spinner = ({
  color = 'sub-color1',
  size = 8,
}: {
  color?: string;
  size?: number;
}) => {
  const spinnerColor = `border-${color}`;

  const w = `w-${size}`;
  const h = `h-${size}`;

  return (
    <div
      className={`inline-block ${w} ${h} animate-spin rounded-full border-4 border-solid ${spinnerColor} border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]`}
      role="status"
    >
      <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
        Loading...
      </span>
    </div>
  );
};

export default Spinner;
