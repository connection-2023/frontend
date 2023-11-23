import Image from 'next/image';

interface IPreviewProps {
  image: string;
  nickname: string;
}

const InstructorPreview = ({ image, nickname }: IPreviewProps) => {
  const src =
    image ||
    'https://img.freepik.com/free-photo/pretty-woman-practising-hip-hop-dance_107420-85008.jpg?size=626&ext=jpg';
  return (
    <>
      <div className="relative hidden h-[8.3rem] flex-col min-[744px]:flex">
        <Image width={148} height={114} src={src} alt="TOP 강사 이미지" />
        <p className="absolute bottom-0 flex h-[38px] w-full items-center justify-center bg-black text-sm font-bold text-white">
          {nickname}
        </p>
      </div>

      <div className="flex h-24 w-fit flex-col min-[744px]:hidden">
        <figure className="max-w-[70px] flex-1">
          <Image
            src={src}
            alt="TOP 강사 이미지"
            width={0}
            height={0}
            sizes="(max-width: 720px) 60vw, (max-width: 1440px) 30vw"
            style={{
              width: 'auto',
              height: '100%',
            }}
            className="rounded-lg object-cover"
          />
        </figure>

        <p className="mt-2.5 flex items-center justify-center text-sm font-bold">
          {nickname}
        </p>
      </div>
    </>
  );
};

export default InstructorPreview;
