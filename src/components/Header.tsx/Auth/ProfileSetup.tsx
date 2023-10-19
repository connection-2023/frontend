import { useState, useRef, useEffect } from 'react';
import { ImageSVG, AddImageSVG } from '@/../public/icons/svg';
import { ISignUp } from '@/types/auth';

interface ProfileSetupProps {
  defaultProfile: string | null;
  //handleUserInfo: (key: keyof ISignUp, value: string | File) => void;
}

const ProfileSetup = ({ defaultProfile }: ProfileSetupProps) => {
  const [imgSrc, setImgSrc] = useState<string | null>(defaultProfile);
  const [imgFile, setImgFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // if (imgFile) handleUserInfo('image', imgFile);
  }, [imgFile]);

  const handleImgUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];

    if (!file || !file.type.startsWith('image/')) {
      // --- 에러 처리 : 토스트 메세지 추가 예정 ---
      console.log('Please select an image file.');
      return;
    }
    // 이미지 최대 크기 설정
    const fileSizeInMB = file.size / (1024 * 1024);

    if (fileSizeInMB > 3) {
      // --- 에러 처리 : 토스트 메세지 추가 예정 ---
      console.log('프로필 이미지 크기는 3MB를 넘을 수 없습니다!');
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      setImgSrc(reader.result as string);
      setImgFile(file);
    };

    reader.onerror = (error) => {
      // --- 에러 처리 : 토스트 메세지 추가 예정 ---
      console.log('FileReader error: ', error);

      if (inputRef.current) {
        inputRef.current.value = '';
      }
    };

    reader.readAsDataURL(file);
  };

  return (
    <section className="mt-6 flex flex-col items-center">
      <h1 className="mb-[0.31rem] text-2xl font-semibold">프로필 설정</h1>
      <p className="mb-6 text-sm">
        프로필 변경은 마이페이지에서 언제든지 가능합니다.
      </p>

      <input
        type="file"
        accept="img/*"
        onChange={handleImgUpload}
        className="hidden"
        id="upload-button"
        ref={inputRef}
      />

      <label htmlFor="upload-button">
        <div
          className={`group mb-[2.37rem] mr-6 flex h-44 w-44 cursor-pointer items-center justify-center rounded-full ${
            imgSrc ? `bg-none` : `bg-sub-color4`
          }`}
          style={
            imgSrc
              ? { backgroundImage: `url(${imgSrc})`, backgroundSize: 'cover' }
              : {}
          }
        >
          {imgSrc ? (
            <div className="flex h-full w-full items-center justify-center group-hover:bg-slate-600  group-hover:opacity-50">
              <ImageSVG
                width="70"
                height="70"
                role="img"
                aria-label="프로필 이미지 업로드"
                className="opacity-0 group-hover:opacity-100"
              />
            </div>
          ) : (
            <AddImageSVG
              width="59"
              height="59"
              role="img"
              aria-label="프로필 이미지 업로드"
            />
          )}
        </div>
      </label>
    </section>
  );
};

export default ProfileSetup;
