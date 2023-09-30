import {
  AlarmSVG,
  ArrowDownSVG,
  CommentSVG,
  ProfileSVG,
  SearchSVG,
} from '../../../public/icons/svg';
import Image from 'next/image';

const UserProfileLinks = () => {
  return (
    <div className="flex items-end gap-3">
      <SearchSVG className="h-[1.8rem] w-[1.8rem]" />
      <AlarmSVG className="pt-0.5" />
      <CommentSVG />
      <div className="relative w-[4.8125rem]">
        <div className="absolute -top-10 flex h-12 w-full items-center justify-center rounded-[3.125rem] bg-white shadow-[1px_1px_4px_1px_rgba(0,0,0,0.25)]">
          <div className="relative ml-1.5 h-[2.45rem] w-[2.45rem] overflow-hidden rounded-full">
            <Image
              src="https://img.freepik.com/free-photo/pretty-woman-practising-hip-hop-dance_107420-85008.jpg?size=626&ext=jpg"
              fill
              alt="사용자 프로필 이미지"
              style={{ objectFit: 'cover' }}
            />
            {/* <ProfileSVG /> */}
          </div>
          <ArrowDownSVG className="-translate-x-1 fill-black" />
        </div>
      </div>
    </div>
  );
};

export default UserProfileLinks;
