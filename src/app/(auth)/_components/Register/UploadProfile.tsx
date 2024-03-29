'use client';
import { useRouter } from 'next/navigation';
import { useState, useRef } from 'react';
import { toast } from 'react-toastify';
import { AddImageSVG, TrashcanSVG } from '@/../public/icons/svg';
import { postProfileImage } from '@/lib/apis/userApi';
import { useUserStore } from '@/store';
import { Button } from '@/components/Button';

const UploadProfile = () => {
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [imgFile, setImgFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const store = useUserStore();

  const handleImgUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];

    if (!file || !file.type.startsWith('image/')) {
      toast.error('이미지를 업로드해주세요!');
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

    reader.onerror = () => {
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
    const toastId = toast.loading('프로필 이미지 변경 중...');
    const response = await postProfileImage(imgFile);
    const profileImage = response.data.newUserImage.imageUrl;

    if (response.statusCode === 201) {
      store.setAuthUserField('profileImage', profileImage);

      toast.update(toastId, {
        render: '이미지 사진이 성공적으로 변경되었습니다!',
        type: 'success',
        isLoading: false,
        autoClose: 1500,
      });
      handleSkip();
    } else if (response.statusCode === 400) {
      toast.update(toastId, {
        render: (
          <p>
            기존에 설정된 프로필 사진이 있습니다.
            <br /> 수정할 경우 마이페이지에서 진행해주세요!
          </p>
        ),
        type: 'error',
        isLoading: false,
        autoClose: 1500,
      });

      handleSkip();
    }
  };

  const handleSkip = () => {
    router.replace('/');
  };

  const handleImgdelete = () => {
    const confirm = window.confirm('프로필 사진을 삭제하시겠습니까?');
    if (confirm) {
      setImgSrc(null);
      setImgFile(null);
    }
  };

  return (
    <section className="mx-auto flex h-[37.5rem] w-[25.5rem] flex-col items-center rounded-md bg-white px-4 py-10 pt-2 shadow-float">
      <h1 className="mb-3 mt-[4.5rem] text-2xl font-semibold">프로필 설정</h1>
      <p className="mb-9 text-sm">나중에 언제든지 변경할 수 있습니다.</p>

      <div className="relative">
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
            className={`group flex h-44 w-44 cursor-pointer items-center justify-center overflow-hidden rounded-full 
          ${imgSrc ? `bg-none` : `bg-gray-700`}
          `}
            style={
              imgSrc
                ? { backgroundImage: `url(${imgSrc})`, backgroundSize: 'cover' }
                : {}
            }
          >
            <div className="flex h-full w-full items-center justify-center rounded-full group-hover:backdrop-brightness-50">
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

        {imgFile && (
          <button
            onClick={handleImgdelete}
            className="absolute bottom-0 right-0 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-float"
            aria-label="프로필 이미지 삭제"
          >
            <TrashcanSVG className="h-7 w-7 stroke-black" />
          </button>
        )}
      </div>

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
  );
};

export default UploadProfile;
