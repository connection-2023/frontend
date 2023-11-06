import { useState, useRef, useEffect } from 'react';
import { toast } from 'react-toastify';
import { ImageSVG, AddImageSVG } from '@/../public/icons/svg';

interface ProfileSetupProps {
  defaultProfile: string | null;
  handleUserImage: (image: File) => void;
}

const ProfileSetup = ({
  defaultProfile,
  handleUserImage,
}: ProfileSetupProps) => {
  const [imgSrc, setImgSrc] = useState<string | null>(defaultProfile);
  const [imgFile, setImgFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (imgFile) handleUserImage(imgFile);
  }, [imgFile]);

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

  return (
    <section className="mt-2 flex flex-col items-center">
      <h1 className="mb-[0.31rem] text-2xl font-semibold">프로필 설정</h1>
      <p className="mb-6 text-sm">
        프로필 변경은 마이페이지에서 언제든지 가능합니다.
      </p>

      <input
        type="file"
        accept="image/*"
        onChange={handleImgUpload}
        className="hidden"
        id="upload-button"
        ref={inputRef}
      />

      <label htmlFor="upload-button">
        <div
          className={`group mb-[2.37rem] mr-6 flex h-44 w-44 cursor-pointer items-center justify-center rounded-full ${
            imgSrc ? `bg-none` : `bg-gray-700`
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
