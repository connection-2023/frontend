import { useAnimation, PanInfo } from 'framer-motion';
import { useEffect, useState } from 'react';
import usePreviousValue from './usePreviousValue';

const useBottomSheet = (handleClosed: () => void, isOpened: boolean) => {
  const controls = useAnimation();
  const prevIsOpen = usePreviousValue(isOpened);

  const onDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    const shouldClose =
      info.point.y > 20 || (info.point.y >= 0 && info.point.y > 45);

    if (shouldClose) {
      controls.start('hidden').then(handleClosed);
    } else {
      controls.start('visible');
    }
  };

  useEffect(() => {
    if (prevIsOpen && !isOpened) {
      controls.start('hidden');
    } else if (!prevIsOpen && isOpened) {
      controls.start('visible');
    }
  }, [controls, isOpened, prevIsOpen]);

  return { onDragEnd, controls, isOpened };
};

export default useBottomSheet;
