import Image from 'next/image';
import Link from 'next/link';
import { ButtonStyles } from '@/constants/constants';
import UniqueButton from '@/components/Button/UniqueButton';
import ProfileImage from '@/components/ProfileImage/ProfileImage';

interface IClassList {
  activeTab: string;
  title: string;
  profile?: {
    src: null;
    nickname: string;
  };
  onItemClick: () => void;
}

const ClassList = ({ activeTab, title, profile, onItemClick }: IClassList) => {
  return (
    <li
      onClick={onItemClick}
      className="grid h-full max-h-[13.6rem] w-full max-w-[40rem] cursor-pointer auto-rows-max grid-cols-2 gap-x-2.5 gap-y-3.5 rounded-md p-[0.88rem] shadow-vertical md:gap-4"
    >
      <figure className="flex aspect-[297/188] h-full max-h-[188px] w-full md:row-span-2">
        <Image
          src="https://connection-bucket.s3.amazonaws.com/lectures/1700525913534_99F17695-2B35-4571-85FA-93114EB95768-55389-000021ABFC85CE19-min.JPG"
          alt="클래스 이미지"
          width={0}
          height={0}
          placeholder="blur"
          blurDataURL="https://connection-bucket.s3.amazonaws.com/lectures/1700525913534_99F17695-2B35-4571-85FA-93114EB95768-55389-000021ABFC85CE19-min.JPG"
          sizes="(max-width: 720px) 60vw, (max-width: 1440px) 30vw"
          className="object-none"
          style={{
            width: '100%',
            height: '100%',
            maxHeight: '11.75rem',
          }}
        />
      </figure>

      <div className="flex w-full flex-col items-center">
        <h2 className="mb-2.5 line-clamp-1 text-base font-bold text-black">
          {title}
        </h2>

        <div className="grid w-full grid-cols-[3.3rem_1fr] gap-x-[0.69rem] gap-y-[0.44rem] text-sm">
          <p>신청 횟수</p> <span>12회</span>
          <p>수업 날짜</p>
          <div className="flex w-full flex-wrap gap-x-4 gap-y-1">
            <span>23.10.02</span>
            <span>23.10.02</span>
            <span>23.10.02</span>
            <span>23.10.02</span>
          </div>
        </div>
      </div>

      <div className="col-span-2 mt-auto flex w-full items-center justify-between gap-3.5 whitespace-nowrap pr-2 text-sm md:col-span-1">
        <div className="flex gap-2.5">
          <button className="w-[4.69rem]">
            <Link
              href="/"
              className={`h-7 font-semibold ${ButtonStyles.default}`}
            >
              커리큘럼
            </Link>
          </button>

          <div className="w-[4.69rem]">
            <UniqueButton size="small" color="secondary">
              {activeTab === 'progress' ? '수강취소' : '다시신청'}
            </UniqueButton>
          </div>
        </div>

        <ProfileImage
          size="small"
          src={profile?.src || null}
          nickname="가비쌤"
        />
      </div>
    </li>
  );
};

export default ClassList;
