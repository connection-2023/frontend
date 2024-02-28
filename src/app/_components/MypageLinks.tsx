import {
  BookmarkSVG,
  CouponSVG,
  DashboardSVG,
  ProfileSVG,
  ReportSVG,
  MoneySVG,
  HeartSVG,
  BigStar,
  PeopleSVG,
  BasicCalendarSVG,
  ReviewSVG,
} from '@/icons/svg';

const MORE_ICON_STYLE = {
  FILL: 'fill-gray-100',
  STROKE: 'stroke-gray-100',
  WSTROKE: 'stroke-gray-100 stroke-2',
};

const MYPAGE_ICON_STYLE = {
  FILL: 'mr-2.5 fill-gray-500 group-hover:fill-sub-color1 group-focus:fill-sub-color1 group-[.is-actived]:fill-sub-color1',
  STROKE:
    'mr-2.5 stroke-gray-500 group-hover:stroke-sub-color1 group-focus:stroke-sub-color1 group-[.is-actived]:stroke-sub-color1',
  WSTROKE:
    'mr-2.5 stroke-gray-500 stroke-2 group-hover:stroke-sub-color1 group-focus:stroke-sub-color1 group-[.is-actived]:fill-sub-color1 group-[.is-actived]:stroke-sub-color1',
};

export const getInstructorLinks = (mode: 'more' | 'mypage') => {
  const style = mode === 'more' ? MORE_ICON_STYLE : MYPAGE_ICON_STYLE;

  return [
    {
      path: '/dashboard',
      text: '대시보드',
      icon: <DashboardSVG width="21" height="21" className={style.WSTROKE} />,
    },
    {
      path: '/mypage/instructor/manage/schedule',
      text: '내 클래스',
      icon: <BookmarkSVG width="21" height="21" className={style.FILL} />,
      submenuItems: [
        {
          path: '/mypage/instructor/manage/schedule',
          text: '수업 일정',
          icon: (
            <BasicCalendarSVG width="21" height="21" className={style.FILL} />
          ),
        },
        {
          path: '/mypage/instructor/manage/myclass',
          text: '클래스 관리',
          icon: <BookmarkSVG width="21" height="21" className={style.FILL} />,
        },
        {
          path: '/mypage/instructor/manage/member',
          text: '회원 관리',
          icon: <PeopleSVG width="21" height="21" className={style.FILL} />,
        },
        {
          path: '/mypage/instructor/manage/review',
          text: '리뷰 관리',
          icon: <ReviewSVG width="22" height="22" className={style.FILL} />,
        },
      ],
    },
    {
      path: '/mypage/instructor/coupon-pass?state=coupon',
      text: '패스권/쿠폰',
      icon: <CouponSVG width="21" height="21" className={style.FILL} />,
    },
    {
      path: '/mypage/instructor/income',
      text: '수익 관리',
      icon: <MoneySVG width="19" height="19" className={style.FILL} />,
    },
    {
      path: '/mypage/instructor/report',
      text: '신고내역',
      icon: <ReportSVG width="20" height="20" className={style.FILL} />,
    },
    {
      path: '/mypage/instructor/info',
      text: '내 정보',
      icon: <ProfileSVG width="21" height="21" className={style.FILL} />,
    },
  ];
};

export const getUserLinks = (mode: 'more' | 'mypage') => {
  const style = mode === 'more' ? MORE_ICON_STYLE : MYPAGE_ICON_STYLE;

  return [
    {
      path: '/mypage/user/myclass/apply',
      text: '내 클래스',
      icon: <BookmarkSVG width="21" height="21" className={style.FILL} />,
      submenuItems: [
        {
          path: '/mypage/user/myclass/apply',
          text: '신청한 클래스',
          icon: <BookmarkSVG width="21" height="21" className={style.FILL} />,
        },
        {
          path: '/mypage/user/myclass/myclass',
          text: '관심 클래스',
          icon: <HeartSVG width="24" height="24" className={style.WSTROKE} />,
        },
        {
          path: '/mypage/user/myclass/member',
          text: '작성한 리뷰',
          icon: <BigStar width="20" height="20" className={style.WSTROKE} />,
        },
      ],
    },
    {
      path: '/mypage/user/instructor',
      text: '관심/차단 강사',
      icon: <PeopleSVG width="21" height="21" className={style.FILL} />,
    },
    {
      path: '/mypage/user/coupon',
      text: '패스권/쿠폰',
      icon: <CouponSVG width="21" height="21" className={style.FILL} />,
    },
    {
      path: '/mypage/user/payment-history',
      text: '결제 내역',
      icon: <MoneySVG width="19" height="19" className={style.FILL} />,
    },
    {
      path: '/mypage/user/report',
      text: '신고내역',
      icon: <ReportSVG width="20" height="20" className={style.FILL} />,
    },
    {
      path: '/mypage/user/info',
      text: '내 정보',
      icon: <ProfileSVG width="21" height="21" className={style.FILL} />,
    },
  ];
};
