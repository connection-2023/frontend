'use client';
import { useRouter } from 'next/navigation';
import { useState, useRef } from 'react';
import { toast } from 'react-toastify';
import { AddImageSVG } from '@/icons/svg';
import { postProfileImage } from '@/lib/apis/userApi';
import { useUserStore } from '@/store';
import Button from '@/components/Button/Button';
import RouterModal from '@/components/Modal/RouterModal';

const UploadProfileModal = () => {
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [imgFile, setImgFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const store = useUserStore();

  const handleImgUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];

    if (!file || !file.type.startsWith('image/')) {
      toast.error('이미지를 선택해주세요!');
      return;
    }
    // 이미지 최대 크기 설정
    const fileSizeInMB = file.size / (1024 * 1024);

    if (fileSizeInMB > 3) {
      toast.error('프로필 이미지 크기는 3MB를 넘을 수 없습니다!');
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      setImgSrc(reader.result as string);
      setImgFile(file);
    };

    reader.onerror = (error) => {
      toast.error('프로필 이미지를 읽어올 수 없습니다 다시 시도해주세요!');

      if (inputRef.current) {
        inputRef.current.value = '';
      }
    };

    reader.readAsDataURL(file);
  };

  const handleUserImage = async () => {
    if (!imgFile) {
      toast.error('이미지를 업로드해주세요!');
      return;
    }
    const response = await postProfileImage(imgFile);

    if (response.statusCode === 201) {
      store.setAuthUserImage(response.data.newUserImage.imageUrl);
      toast.success('이미지 사진이 성공적으로 변경되었습니다!');
      handleSkip();
    } else if (response.statusCode === 400) {
      toast.error(
        <p>
          기존에 설정된 프로필 사진이 있습니다.
          <br /> 수정할 경우 마이페이지에서 진행해주세요!
        </p>,
      );
      handleSkip();
    }
  };

  const handleSkip = () => {
    router.replace('/');
  };

  return (
    <RouterModal path="/">
      <section className="mt-2 flex h-[37.5rem] w-full min-w-[25rem] flex-grow flex-grow flex-col items-center rounded-md bg-white px-4 pt-10">
        <h1 className="mb-3 mt-20 text-2xl font-semibold">프로필 설정</h1>
        <p className="mb-9 text-sm">나중에 언제든지 변경할 수 있습니다.</p>

        <input
          type="file"
          accept="image/*"
          onChange={handleImgUpload}
          className="hidden"
          id="upload-button"
          ref={inputRef}
        />

        <label htmlFor="upload-button" className="group">
          <div
            className={`group mb-[2.37rem] mr-6 flex h-44 w-44 cursor-pointer items-center justify-center overflow-hidden rounded-full ${
              imgSrc ? `bg-none` : `bg-gray-700`
            }
          `}
            style={
              imgSrc
                ? { backgroundImage: `url(${imgSrc})`, backgroundSize: 'cover' }
                : {}
            }
          >
            {/* trashcan Icon 추가하기 */}
            <div
              className={`flex h-full w-full items-center justify-center ${
                imgSrc && 'group-hover:backdrop-brightness-50'
              }`}
            >
              <AddImageSVG
                width="59"
                height="59"
                role="img"
                aria-label="프로필 이미지 업로드"
                className={imgSrc ? 'opacity-0 group-hover:opacity-100 ' : ''}
              />
            </div>
          </div>
        </label>
        <div className="mt-auto w-full">
          {imgFile ? (
            <Button color="secondary" size="large" onClick={handleUserImage}>
              저장하기
            </Button>
          ) : (
            <Button color="secondary" size="large" onClick={handleSkip}>
              건너뛰기
            </Button>
          )}
        </div>
      </section>
    </RouterModal>
  );
};

export default UploadProfileModal;
