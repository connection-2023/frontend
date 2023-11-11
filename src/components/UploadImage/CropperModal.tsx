import { useRef } from 'react';
import Cropper, { ReactCropperElement } from 'react-cropper';
import Modal from 'react-modal';
import {
  CloseSVG,
  ResetSVG,
  ZoomInSVG,
  ZoomOutSVG,
} from '@/../public/icons/svg';
import 'cropperjs/dist/cropper.css';
import '@/styles/cropper.css';

interface CropperModalProps {
  isOpen: boolean;
  selectedImage: string;
  closeModal: () => void;
  handleCroppedData: (croppedDataURL: string) => void;
}

const CropperModal = ({
  isOpen,
  selectedImage,
  closeModal,
  handleCroppedData,
}: CropperModalProps) => {
  const cropperRef = useRef<ReactCropperElement>(null);

  const handleReset = () => {
    const cropper = cropperRef?.current?.cropper;
    if (cropper) {
      cropper.reset();
    }
  };

  const handleZoomIn = () => {
    const cropper = cropperRef?.current?.cropper;
    if (cropper) {
      cropper.zoom(0.1);
    }
  };

  const handleZoomOut = () => {
    const croppper = cropperRef?.current?.cropper;
    if (croppper) {
      croppper.zoom(-0.1);
    }
  };

  const handleApply = () => {
    const cropper = cropperRef?.current?.cropper;
    if (cropper) {
      const croppedCanvas = cropper.getCroppedCanvas().toDataURL();
      handleCroppedData(croppedCanvas);

      closeModal();
    }
  };

  return (
    <Modal
      onRequestClose={closeModal}
      isOpen={isOpen}
      style={customModalStyles}
      ariaHideApp={false}
      shouldCloseOnOverlayClick={false}
    >
      <div className="relative flex h-16 w-full items-center bg-white">
        <h2 className="flex w-full justify-center text-2xl font-bold">
          사진 편집
        </h2>
        <CloseSVG
          width={24}
          height={24}
          onClick={closeModal}
          className="absolute right-2 cursor-pointer stroke-gray-500 stroke-2"
        />
      </div>

      <Cropper
        ref={cropperRef}
        src={selectedImage}
        viewMode={1}
        background={false}
        aspectRatio={448 / 289}
        autoCropArea={0.7}
        minContainerHeight={420}
        minContainerWidth={370}
        dragMode="move"
        restore={false}
        className="h-[420px] overflow-hidden"
      />

      {/* 하단 버튼 */}
      <div className="flex flex h-16 w-full items-center justify-between bg-white px-4">
        <div className="flex">
          <button
            onClick={handleReset}
            className="mr-5 flex items-center text-lg font-bold text-gray-500"
          >
            <ResetSVG className="mr-2" /> 되돌리기
          </button>
          <button onClick={handleZoomIn} className="mr-2">
            <ZoomInSVG />
          </button>
          <button onClick={handleZoomOut}>
            <ZoomOutSVG />
          </button>
        </div>
        <button
          onClick={handleApply}
          className="h-9 w-[5.3125rem] rounded-md bg-sub-color1 text-lg font-bold text-white"
        >
          적용하기
        </button>
      </div>
    </Modal>
  );
};

export default CropperModal;

const customModalStyles: ReactModal.Styles = {
  content: {
    width: '80%',
    height: 'fit-content',
    maxWidth: '675px',
    maxHeight: '550px',
    padding: '0px',
    zIndex: '10',
    boxSizing: 'border-box',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    boxShadow: '0 2px 5px 1px rgba(0, 0, 0, 0.25)',
    backgroundColor: 'rgb(40, 43, 45)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
};
