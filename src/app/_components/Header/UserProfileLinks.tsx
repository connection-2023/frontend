import Link from 'next/link';
import { dummyUserInfo } from '@/constants/dummy';
import { AlarmSVG, CommentSVG, SearchSVG } from '@/icons/svg';
import { useUserStore } from '@/store/userStore';
import Profile from './Profile';
import { instructorProfile, userProfile } from '@/types/auth';

const UserProfileLinks = () => {
  const { alarmCount, commentCount } = dummyUserInfo;
  const userStoreState = useUserStore.getState();

  return (
    <div className="flex items-end gap-3">
      <h2 className="text-0 overflow-hidden indent-[-9999px]">
        Connection 유저 메뉴
      </h2>

      <Link href="/search">
        <SearchSVG className="h-[1.8rem] w-[1.8rem] fill-black" />
      </Link>

      {!userStoreState.authUser && (
        <Link href="/login" className="text-lg font-medium">
          로그인/회원가입
        </Link>
      )}

      {userStoreState.authUser && (
        <>
          <button className="relative">
            <AlarmSVG className="fill-black pt-0.5" width="31" height="31" />
            <span className="absolute -right-1.5 top-0 min-w-[1rem] rounded-full bg-main-color px-1 text-xs font-bold text-white">
              {alarmCount}
            </span>
          </button>

          <button className="relative">
            <CommentSVG fill="black" width="29" height="30" />
            <span className="absolute -right-1.5 top-0 min-w-[1rem] rounded-full bg-main-color px-1 text-xs font-bold text-white">
              {commentCount}
            </span>
          </button>

          <Profile
            defaultProfileImg={
              userStoreState.userType === 'lecturer'
                ? (userStoreState.authUser as instructorProfile)
                    ?.profileCardImageUrl
                : (userStoreState.authUser as userProfile)?.userProfileImage
                    ?.imageUrl
            }
          />
        </>
      )}
    </div>
  );
};
// profileCardImageUrl
// userProfileImage

export default UserProfileLinks;
