import Image from 'next/image';
import { parse } from 'date-fns';
import Profile from '@/components/Profile/Profile';
import Review from '@/components/Review/Review';
import ReviewComment from '@/components/Review/ReviewComment';
import Nav from '@/components/Nav/Nav';
import Like from '@/components/Like/Like';
import Apply from './_components/Apply';
import Notice from './_components/Notice';
import ProfileButtons from './_components/ProfileButtons';
import { CLASS_SECTIONS } from '@/constants/constants';
import { dummyClass, dummyImgURL } from '@/constants/dummy';
import {
  LocationSVG,
  TimeSVG,
  GroupSVG,
  LevelSVG,
  BasicCalendarSVG,
} from '@/../public/icons/svg';
import Carousel from '@/components/Carousel/Carousel';
import ScheduleView from '@/components/ScheduleView/ScheduleView';
import Map from '@/components/Map/Map';

const h2Style = 'mb-2 text-lg font-bold';
const h3Style = 'flex gap-[0.38rem] text-sm';

const ClassDetailPage = () => {
  const {
    title,
    review,
    location,
    locationDetail,
    duration,
    method,
    level,
    notice,
    profile,
    intro,
    curriculum,
    schedule,
    dateTimeData,
    lectureSchedule,
    coupon,
    price,
    studioName,
  } = dummyClass;
  return (
    <main className="grid-auto-rows-2 border-box mt-[1.38rem]  grid max-w-[1440px] grid-cols-[1fr_1.37fr_1fr] gap-x-12">
      <section className="col-span-3 mb-4 flex flex-col items-center shadow-[0_1px_3px_0_rgba(0,0,0,0.25)]">
        {/* 클래스 이미지 */}
        <div className="mb-5 flex h-[18rem] w-full justify-center px-10">
          {dummyImgURL.length > 2 ? (
            <div className="relative h-full w-full overflow-hidden">
              <div className="h-full w-1/3">
                <Carousel
                  imgURL={dummyImgURL}
                  move={true}
                  priority={3}
                  showCurrentElementBackGround={false}
                />
              </div>
            </div>
          ) : (
            dummyImgURL.map((imgURL) => (
              <div key={imgURL} className="relative h-full w-1/3">
                <Image
                  src={imgURL}
                  alt="Connection 댄스 춤 이미지"
                  fill
                  sizes="(max-width: 720px) 60vw, (max-width: 1440px) 30vw"
                />
              </div>
            ))
          )}
        </div>

        <h1 className="relative flex w-full max-w-[40rem] justify-center text-lg font-bold">
          {title}
          <div className="absolute right-0">
            <Like />
          </div>
        </h1>
        {/* Review */}
        <div className="mb-4 mt-2 flex gap-1">
          <Review average={review.average} />
          <span className="text-sm font-bold text-sub-color2">
            ({review.average})
          </span>
        </div>

        <hr className="mb-6 h-1 w-full max-w-[40rem]" />
        {/* Class Info */}
        <div className="mb-7 flex w-full max-w-[464px] items-center justify-between">
          <h3 className={`${h3Style}`}>
            <LocationSVG /> {location}
          </h3>
          <h3 className={`${h3Style}`}>
            <TimeSVG /> {duration}
          </h3>
          <h3 className={`${h3Style}`}>
            <GroupSVG /> {method}
          </h3>
          <h3 className={`${h3Style}`}>
            <LevelSVG /> {level}
          </h3>
        </div>
      </section>
      {/* 임시 빈 공간 */}
      <div className="" />

      <section className="flex flex-col">
        <Nav sections={CLASS_SECTIONS} />

        <Notice content={notice.content} updateDate={notice.lastDate} />
        {/* 프로필 */}
        <div className="mb-10 mt-[1.81rem] flex w-full items-center justify-between">
          <div className="text-lg font-bold">
            <Profile src={profile.src} nickname={profile.nickname} size={59} />
          </div>
          <div className="flex gap-[0.81rem] text-sm font-normal">
            <ProfileButtons id={profile.id} />
          </div>
        </div>

        {/* 클래스 소개 */}
        <section id="intro-section" className="mb-14 scroll-mt-16 text-sm">
          <h2 className={`${h2Style}`}>클래스 소개</h2>
          <p>{intro}</p>
        </section>

        {/* 커리큘럼 */}
        <section id="curriculum-section" className="mb-14 text-sm">
          <h2 className={`${h2Style}`}>커리큘럼</h2>
          <div>
            [원데이 단체 클래스] ● 퇴근 후 or 주말에 취미활동 하고 싶으신
            분들에게 추천하는 클래스! ● 수업시간- 월, 화, 목 : 19 ~ 21시 / 주말,
            공휴일 : 13 ~ 15시, 16 ~ 18시 ● 수업장소- 아래 일정 옆 장소를
            확인하세요 (신림or사당)(자세한 주소는 전 날 문자 확인 부탁드립니다)
            ● 수업비용- 2시간 방송댄스 33000원 + 대관료 별도(수강생1/n, 최소
            3000 ~ 최대 7000원) ● 개설된 클래스 일정(신청자 있을 시 ★표시) -
            신청자 없을 시 곡 변경 가능하며 아래 곡들 중에 선택 가능합니다.
            (예시. 2/8의 경우 마감인원 8인, 현재 신청자 2인, 잔여석 6자리) ○
            전소미- Fast Forward (38초~1분 25초) - 9/9 토 (13 ~ 15시) - 사당★
            (8/8 마감) - 9/14 목 (19 ~ 21시) - 신림★ (1/5) ○ 뉴진스- Super Shy
            버전2 (처음~38초+1분3초~1분29초) - 9/9 토 (16 ~ 18시) - 신림★ (2/5)-
            9/16 토 (13 ~ 15시) - 사당★ (1/8) - 9/21 목 (19 ~ 21시) - 사당★
            (1/8) ○ 스테이씨 - Bubble (30초~1절) - 9/10 일 (13 ~ 15시) - 사당★
            (3/8) ○ 뉴진스 - ETA (35초~1절)- 9/10 일 (16 ~ 18시) - 사당★ ○
            스테이씨 - Bubble (30초~1절) - 9/10 일 (13 ~ 15시) - 사당★ (3/8) ○
            뉴진스 - ETA (35초~1절) - 9/10 일 (16 ~ 18시) - 사당★ (8/8 마감) -
            9/12 화 (19 ~ 21시) - 사당★ (3/8) - 9/23 토 (13 ~ 15시) - 사당★
            (3/8) ○ 키스오브라이프 - 쉿 (33초~1분12초) - 9/11 월 (19 ~ 21시) -
            사당★ (1/8) - 9/17 일 (13 ~ 15시) - 사당★ (2/8) ○ 스우파 바다ver
            챌린지 (유튭확인) - 9/16 토 (16 ~ 18시) - 사당 - 9/17 일 (16 ~ 18시)
            - 사당★ (8/8 마감) - 9/18 월 (19 ~ 21시) - 사당★ (3/8) - 9/24 일 (13
            ~ 15시) - 사당or신림(문의주세요) ○ nct u - baggy jeans (43초~1절) -
            9/24 일 (16 ~ 18시) - 사당★ (2/8) ○ 뉴진스 - newjeans (1분4초~끝) -
            9/26 화 (19 ~ 21시) - 사당★ (1/8) ○ 뉴진스 - Super Shy 버전1
            (38초~1분29초) ○ 정국 - Seven (1분27초~1분58초) ○ 곡 문의, 분량은 곡
            옆에 () 참고해주세요. (Fast Forward, Super Shy 버전 1or2, Bubble,
            ETA, 쉿, 스우파 바다ver, Seven 중에 선택가능) - 9/30 토 (13 ~ 15시)
            - 사당or신림(문의주세요) - 9/30 토 (16 ~ 18시) -
            사당or신림(문의주세요) - 10/1 일 (13 ~ 15시) -
            사당or신림(문의주세요) - 10/1 일 (16 ~ 18시) -
            사당or신림(문의주세요) ● 마감인원 - 신림 최대 5인 - 사당 최대 8인 ●
            안내사항 - 원하실 경우 매 수업 촬영해드리고 있습니다.
            -------------------------------------------------------------------
            [개인레슨] ● 안무를 디테일하게 배우고 싶거나 개인적으로 오디션,
            장기자랑 준비 하시는 분들께 추천드리는 클래스 ● 수업장소 - 2호선
            원하시는 곳으로 이동 가능합니다. 신촌, 을지로, 성수 등 위쪽은 불가
            (장소 상관 없을시 신림 or 사당에서 진행) ● 수업비용 - 수강료 +
            대관료 별도(수강생 부담) = 문의 주세요 :) ● 신청방법 - 원하시는 곡,
            장소 정하셔서 일정, 금액 문의주세요! ● 안내사항 - 1회 1시간/1회
            2시간/2~4회(1회당 2시간) 중에 선택가능합니다. - 수강권 사용기한은 첫
            일정 기준 3개월입니다. (이후 수강권 소멸, 사용기한이 지난 것이기
            때문에 50% 진행전이여도 부분환불불가)
            -----------------------------------------------------------------------------
            [그룹레슨] ● 친한 친구 & 동료들과 함께 수업을 듣고 싶은 분들께 추천
            드리는 클래스 ● 수업장소 - 신림, 사당 중 원하시는 곳에서 진행됩니다.
            ● 수업비용 - 수강료 + 대관료 별도(수강생 부담) = 문의 주세요 :) ●
            신청방법- 원하시는 곡, 장소 정하셔서 일정, 금액 문의주세요! ●
            안내사항 - 1~4회(1회당 2시간) 중 선택가능합니다. - 그룹레슨 특성상
            2명부터 수업가능합니다. - 수강권 사용기한은 첫 일정 기준
            3개월입니다. (이후 수강권 소멸, 사용기한이 지난 것이기 때문에 50%
            진행전이여도 부분환불불가)
          </div>
        </section>

        <section
          id="date-section"
          className="mb-14 scroll-mt-16 whitespace-nowrap"
        >
          <h2 className={`${h2Style} `}>일정 및 시간</h2>
          <div className="my-4 flex gap-7">
            <span className="flex items-center gap-2">
              <BasicCalendarSVG className="w-[19px] fill-sub-color1" />
              {schedule.date}
            </span>
            <span className="flex items-center gap-2">
              <TimeSVG /> {duration} 수업
            </span>
          </div>

          <p className="mb-2 text-sm font-medium text-main-color">
            *궁금한 날짜를 클릭해주세요
          </p>
          <ScheduleView
            clickableDates={Object.keys(dateTimeData).map(createDate)}
            lectureSchedule={lectureSchedule}
          />
        </section>

        <section id="location-section" className="mb-14 scroll-mt-16">
          <h2 className={`${h2Style}`}>진행 장소</h2>
          <span className="mb-[0.62rem] mt-2 flex items-center gap-[0.13rem]">
            <LocationSVG /> {locationDetail}
          </span>
          <div className="h-[18.25rem] max-w-[40rem] bg-slate-100">
            <Map address={locationDetail} studioName={studioName} />
          </div>
        </section>

        {/* 클래스 후기 */}
        <section id="review-section" className="mb-20 scroll-mt-16">
          <h2 className={`mb-6 flex items-center scroll-smooth ${h2Style}`}>
            클래스 후기 {review.count}건 <span className="ml-3" />
            <Review average={review.average} />
            <span className="ml-1 text-sub-color2">({review.average})</span>
          </h2>
          <div className="flex flex-col gap-6">
            {review.reviewer.map((review) => (
              <ReviewComment
                key={review.nickname}
                src={review.src}
                nickname={review.nickname}
                average={review.average}
                content={review.content}
                date={review.date}
                title={review.title}
              />
            ))}
          </div>
        </section>
      </section>

      <section className="max-w-[17rem] ">
        <Apply coupon={coupon} price={price} />
      </section>
    </main>
  );
};

export default ClassDetailPage;

const createDate = (str: string) => {
  const currentYear = new Date().getFullYear(); // 현재 연도
  const currentMonth = new Date().getMonth() + 1; // 현재 월
  // 월 추출
  const month = Number(str.slice(0, 2));
  // 현재 월보다 작으면 내년으로 설정
  const year = month < currentMonth ? currentYear + 1 : currentYear;

  // "MM.dd" 형식으로 변환
  const dateStr = str.slice(0, -5).replace('월 ', '.').replace('일', '');

  return parse(dateStr, 'MM.dd', new Date(year, 0));
};
