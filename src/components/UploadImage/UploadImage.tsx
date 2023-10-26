import Image from 'next/image';
import { useEffect, useState } from 'react';
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';
import { ClearSVG, CropSVG, UploadImageSVG } from '@/../public/icons/svg';
import CropperModal from './CropperModal';

interface UploadImageProps {
  onChange?: (
    data: {
      file: File;
      url: string;
    }[],
  ) => void;
  defaultImg?: {
    file: File;
    url: string;
  }[];
  errors?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
}

const UploadImage = ({
  onChange,
  defaultImg = [],
  errors,
}: UploadImageProps) => {
  const [images, setImages] =
    useState<{ file: File; url: string }[]>(defaultImg);
  const [selectedImage, setSelectedImage] = useState<string | null>(
    defaultImg?.[0]?.url || null,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (onChange) {
      onChange(images);
    }
  }, [images]);

  const handleOpenModal = () => {
    if (!isModalOpen) setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    if (isModalOpen) setIsModalOpen(false);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files).map((file) => ({
        file,
        url: URL.createObjectURL(file),
      }));

      if (images.length + filesArray.length > 5) {
        alert('최대 5개까지만 업로드 가능합니다.');
        const remainingSpace = 5 - images.length;

        setImages((prevImages) => [
          ...prevImages,
          ...filesArray.slice(0, remainingSpace),
        ]);
      } else {
        setImages((prevImages) => [...prevImages, ...filesArray]);
      }

      if (!selectedImage && filesArray.length > 0) {
        setSelectedImage(filesArray[0].url);
      }
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages((prevImages) => {
      const newImages = prevImages.filter((_, i) => i !== index);

      // 선택된 이미지가 삭제되면 selectedImage를 null로 설정
      if (selectedImage === prevImages[index].url) {
        setSelectedImage(newImages[0] ? newImages[0].url : null);
      }

      // 모든 이미지가 삭제되면 selectedImage를 null로 설정
      if (newImages.length === 0) {
        setSelectedImage(null);
      }

      return newImages;
    });
  };

  const handleDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    index: number,
  ) => {
    event.dataTransfer.setData('selectedIdx', index.toString());
    event.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (
    event: React.DragEvent<HTMLDivElement>,
    index: number,
  ) => {
    const selectedIdxStr = event.dataTransfer.getData('selectedIdx');
    if (selectedIdxStr !== null) {
      const selectedIdx = Number(selectedIdxStr);

      setImages((prevImages) => {
        const newImages = [...prevImages];
        const [removed] = newImages.splice(selectedIdx, 1);
        newImages.splice(index, 0, removed);
        return newImages;
      });
    }
  };

  const handleCroppedData = (croppedDataURL: string) => {
    setSelectedImage(croppedDataURL);

    setImages((prevImages) =>
      prevImages.map((image) =>
        image.url === selectedImage ? { ...image, url: croppedDataURL } : image,
      ),
    );
  };

  return (
    <div className="flex w-full flex-col items-center">
      {images.length === 0 ? (
        <div className="cursor-pointer">
          <label
            htmlFor="image-upload"
            className="flex cursor-pointer flex-col items-center"
          >
            <UploadImageSVG
              width={117}
              height={107}
              className="fill-sub-color2"
            />
            <p
              className={`mb-3 mt-6 flex h-10 w-[12.5rem] items-center justify-center rounded-[0.31rem] text-lg font-bold  shadow-float
            ${errors ? 'animate-vibration text-main-color' : 'text-sub-color2'}
            `}
            >
              클래스 사진 업로드
            </p>
            <p className="text-sm text-sub-color1">
              *최대 5개까지 업로드 가능합니다
            </p>
          </label>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleImageUpload}
          />
        </div>
      ) : (
        <>
          {/* 이미지 미리보기 */}
          <div className="h-[17.17rem] w-[26.6rem]">
            {selectedImage && (
              <div className="relative h-full w-full overflow-hidden">
                <Image
                  src={selectedImage}
                  alt="선택된 클래스 업로드 이미지"
                  fill
                  style={{ objectFit: 'contain' }}
                />
                <div className="absolute right-0 top-0 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-sub-color3">
                  <CropSVG
                    width={19}
                    height={19}
                    aria-label="이미지 크롭"
                    onClick={handleOpenModal}
                    className="fill-white"
                  />
                </div>
              </div>
            )}
          </div>
          {/* 추가한 이미지 리스트 */}
          <div className="mt-2 flex w-full justify-center gap-3">
            {images.map((image, index) => (
              <div
                key={index}
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDrop={(e) => handleDrop(e, index)}
                onDragOver={(e) => e.preventDefault()}
                className={`relative h-[4rem] w-[6.3rem] ${
                  image.url === selectedImage
                    ? 'border-[3px] border-solid border-sub-color1'
                    : ''
                }`}
              >
                <div className="relative h-full w-full cursor-grab overflow-hidden">
                  <Image
                    src={image.url}
                    alt={`클래스 업로드 이미지 ${index + 1}`}
                    fill
                    style={{ objectFit: 'cover' }}
                    onClick={() => setSelectedImage(image.url)}
                  />
                </div>
                <ClearSVG
                  height={19}
                  width={19}
                  aria-label="이미지 삭제"
                  onClick={() => handleRemoveImage(index)}
                  className="absolute right-0 top-0 cursor-pointer fill-sub-color3"
                />
                {index === 0 && (
                  <div className="absolute bottom-0 right-0 flex h-6 w-9 translate-y-[1px] items-center justify-center bg-sub-color1 text-white">
                    대표
                  </div>
                )}
              </div>
            ))}
            {/* 이미지 추가하기 */}
            {images.length < 5 && (
              <>
                <label htmlFor="addintional-image-upload">
                  <div className="flex h-[4rem] w-[6.3rem] cursor-pointer items-center justify-center bg-sub-color4">
                    <UploadImageSVG width={52} height={47} fill="white" />
                  </div>
                </label>
                <input
                  id="addintional-image-upload"
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </>
            )}
          </div>
        </>
      )}
      {isModalOpen && selectedImage && (
        <CropperModal
          isOpen={isModalOpen}
          selectedImage={selectedImage}
          closeModal={handleCloseModal}
          handleCroppedData={handleCroppedData}
        />
      )}
    </div>
  );
};

export default UploadImage;
