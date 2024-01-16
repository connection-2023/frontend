'use client';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { SpinnerSVG } from '@/icons/svg';

const Spinner = ({ size }: { size: number }) => {
  const sizeStyle = `h-[${size}] w-[${size}]`;
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prev) => (prev + 45) % 360);
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className={`${sizeStyle} overflow-hidden rounded-full`}
      style={{ rotate: rotation }}
      animate={{ rotate: rotation }}
    >
      <SpinnerSVG width={size} height={size} />
    </motion.div>
  );
};

export default Spinner;
