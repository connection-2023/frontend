import { useAnimation, PanInfo } from 'framer-motion';
import { useEffect, useState } from 'react';
import usePreviousValue from './usePreviousValue';

const useBottomSheet = (handleClosed: () => void) => {
  const [isOpen, setIsOpen] = useState(true);
  const controls = useAnimation();
  const prevIsOpen = usePreviousValue(isOpen);

  const onDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    const shouldClose =
      info.point.y > 20 || (info.point.y >= 0 && info.point.y > 45);

    if (shouldClose) {
      controls.start('hidden').then(handleClosed);
      setIsOpen(false);
    } else {
      controls.start('visible');
      setIsOpen(true);
    }
  };

  useEffect(() => {
    if (prevIsOpen && !isOpen) {
      controls.start('hidden');
    } else if (!prevIsOpen && isOpen) {
      controls.start('visible');
    }
  }, [controls, isOpen, prevIsOpen]);

  return { onDragEnd, controls, setIsOpen, isOpen };
};

export default useBottomSheet;
