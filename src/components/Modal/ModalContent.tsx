import { AnimationControls, PanInfo, motion } from 'framer-motion';
import useMediaQuery from '@/hooks/useMediaQuery';
import { CloseSVG } from '../../../public/icons/svg';

interface ModalContentProps {
  children: React.ReactNode;
  handleClosed: () => void;
  disableModalSwipe: boolean;
  onDragEnd: (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => void;
  controls: AnimationControls;
}

const ModalContent = ({
  children,
  handleClosed,
  disableModalSwipe,
  onDragEnd,
  controls,
}: ModalContentProps) => {
  const isSm = disableModalSwipe
    ? undefined
    : useMediaQuery('(min-width: 640px)');

  if (disableModalSwipe) {
    return (
      <div
        className={`absolute bottom-0 z-modal h-screen w-screen bg-white sm:bottom-auto sm:left-1/2 sm:top-1/2 sm:h-auto sm:w-auto sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-md sm:pt-0 sm:shadow-float`}
      >
        <button onClick={handleClosed} className="absolute right-6 top-5">
          <CloseSVG
            width="24"
            height="24"
            className="stroke-gray-500 stroke-2"
          />
        </button>
        {children}
      </div>
    );
  } else {
    return (
      <motion.div
        drag={isSm ? false : 'y'}
        onDragEnd={isSm ? undefined : onDragEnd}
        initial={isSm ? false : 'hidden'}
        animate={isSm ? false : controls}
        transition={{
          type: 'spring',
          damping: 40,
          stiffness: 400,
        }}
        variants={{
          visible: { y: 0 },
          hidden: { y: '100%' },
        }}
        dragConstraints={{ top: 0 }}
        dragElastic={0.2}
        style={isSm ? { y: '-50%', x: '-50%' } : undefined}
        className={`absolute bottom-0 z-modal h-[90%] w-screen rounded-t-lg bg-white pt-2.5 sm:bottom-auto sm:left-1/2 sm:top-1/2 sm:h-auto sm:w-auto sm:rounded-md sm:pt-0 sm:shadow-float`}
      >
        <button
          onClick={handleClosed}
          className="absolute right-2 top-2 hidden sm:block"
        >
          <CloseSVG
            width="24"
            height="24"
            className="stroke-gray-500 stroke-2"
          />
        </button>

        <div className="mb-8 flex w-full justify-center sm:hidden">
          <button className="h-1.5 w-16 rounded-lg bg-gray-700" />
        </div>

        {children}
      </motion.div>
    );
  }
};

export default ModalContent;
