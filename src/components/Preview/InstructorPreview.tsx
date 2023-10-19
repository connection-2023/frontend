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
    <div className="relative flex flex-col">
      <Image width={148} height={114} src={src} alt="TOP 강사 이미지" />
      <p className="absolute bottom-0 flex h-[38px] w-full items-center justify-center bg-black text-sm font-bold text-white">
        {nickname}
      </p>
    </div>
  );
};

export default InstructorPreview;
