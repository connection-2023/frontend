import Link from 'next/link';
import Review from '@/components/Review/Review';
import Like from '@/components/Like/Like';
import Nav from '@/components/Nav/Nav';
import ReviewComment from '@/components/Review/ReviewComment';
import InstructorCarousel from './_components/InstructorCarousel';
import { dummyInstructor } from '@/constants/dummy';
import { INSTRUCTOR_SECTIONS } from '@/constants/constants';
import ManagementButton from './_components/ManagementButton';
import {
  OptionSVG,
  InstagramSVG,
  YoutubeSVG,
  LinkSVG,
  NoneInstagramSVG,
  NoneLinkSVG,
  NoneYoutubeSVG,
  ShareSVG,
} from '@/../public/icons/svg';
import ClassList from './_components/ClassList';

const h2Style = 'mb-2 text-lg font-bold';

const InstructorDetailPage = () => {
  const {
    imgURL,
    nickname,
    teamAffiliation,
    genre,
    location,
    like,
    review,
    instagramID,
    youtubeURL,
    anyURL,
    classList,
  } = dummyInstructor;
  return (
    <main className="flex w-screen flex-col items-center">
      {/* 강의 상세 헤더 섹션 */}
      <section className="flex w-full max-w-[1440px] flex-col items-center ">
        <InstructorCarousel imgURL={imgURL} />

        <div className="flex flex-col items-center">
          {/* 강사 이름 및 이벤트 */}
          <div className=" relative flex w-full min-w-[23rem] items-center justify-center ">
            <h1 className="box-border flex items-center gap-1 pl-6 text-lg font-bold">
              {nickname}
              <Like />
            </h1>
            <div className="absolute right-0 flex gap-3">
              <ShareSVG />
              <ManagementButton>
                <OptionSVG />
              </ManagementButton>
            </div>
          </div>

          {/* 리뷰 */}
          <div className="mb-4 mt-2 box-border flex h-4 gap-1 pl-4">
            <Review average={review.average} />
            <span className="text-sm font-bold text-sub-color2">
              ({review.average})
            </span>
          </div>

          {/* 강사 여러 정보 */}
          <dl className="inline-grid min-w-[40rem] grid-cols-2 gap-2 whitespace-nowrap border-t-2 border-solid border-[#D9D9D9] py-5">
            <div className="flex gap-3">
              <dt className="font-bold text-sub-color1">지역</dt>
              <dd>{location}</dd>
            </div>
            <div className="flex gap-3">
              <dt className="text-sub-color1">
                {instagramID ? <InstagramSVG /> : <NoneInstagramSVG />}
              </dt>
              <dd>{instagramID}</dd>
            </div>
            <div className="flex gap-3">
              <dt className="font-bold text-sub-color1">장르</dt>
              <dd>{genre.join(', ')}</dd>
            </div>
            <Link
              href={youtubeURL || ''}
              target="_blank"
              className={`${youtubeURL ?? 'pointer-events-none'} flex gap-3`}
            >
              <dt className="text-sub-color1">
                {youtubeURL ? <YoutubeSVG /> : <NoneYoutubeSVG />}
              </dt>
              <dd>{youtubeURL}</dd>
            </Link>
            <div className="flex gap-3">
              <dt className="font-bold text-sub-color1">소속</dt>
              <dd>{teamAffiliation.join(', ')}</dd>
            </div>
            <Link
              href={anyURL || ''}
              className={`${anyURL ?? 'pointer-events-none'} flex gap-3`}
              target="_blank"
            >
              <dt className="text-sub-color1">
                {anyURL ? <LinkSVG /> : <NoneLinkSVG />}
              </dt>
              <dd>{anyURL}</dd>
            </Link>
          </dl>
        </div>
      </section>

      <hr className="mb-2 h-[1px] w-screen bg-[#D9D9D9] shadow-[0_1px_4px_0_rgba(0,0,0,0.25)]" />

      <div className="sticky -top-[1px] z-20 flex w-full items-center justify-center bg-white">
        <div className="w-1/2 min-w-[23rem] max-w-5xl">
          <Nav sections={INSTRUCTOR_SECTIONS} />
        </div>
      </div>

      {/* 인스타그램 섹션 */}
      <section className="flex gap-3">
        <div className="h-[22.6875rem] w-[16.6875rem] bg-yellow-200">
          인스타 그램
        </div>
        <div className="h-[22.6875rem] w-[16.6875rem] bg-yellow-200">
          인스타 그램
        </div>
        <div className="h-[22.6875rem] w-[16.6875rem] bg-yellow-200">
          인스타 그램
        </div>
      </section>

      {/* 강사소개 섹션 */}
      <section
        id="introduction-section"
        className="w-full max-w-[51.1rem] pt-20"
      >
        <h2 className={h2Style}>강사소개</h2>
        <div>
          {`(글자제한 몇으로할지???) 
          "잘추는게 중요한가요?잘가르치는게 중요하지 "
           여러분의 굳 티쳐!! 세상에 몸치는 없다!! 
           수강생들의 진심어린 리뷰로 자신합니다>_< 
           재미있게 춤 배우실부운!!!!
           안녕하세요! 먼저 제 소개를 할게요! 
           방송댄스 레슨 전문 춤토니 입니다! 
           어릴적 배반의 장미(엄정화) 가 흘러나올 때 엉덩이를 씰룩거리던 아이가 !!
            각 반의 대표자 나오세요 ! 라는 소리에 뛰쳐나가 테크노를 추던 소녀가 !!(급 늙어보임)
            초등학교 5학년 하늘의 웃기네 라는 노래의 안무습득 및 레슨 ( 그당시는 친구들에게 알려주기겠죠)을 
            시작으로 어느새 이렇게나 컸습니다 !!
            한가지를 열심히 파고들면 그 분야에 전문가가 된다는 말이 사실이라는 것을 느끼며
            어느새 레슨자의 자리에 섰습니다 '잘춰서 부러워요' '저도 잘 추고 싶어요' '전 몸치에요'많은 주변인,
            수강생들에게 이러한 말을 들으며' 그럼 내가 그들에게 동작만을 알려주는 것이 아닌 잘 추기위한 방법을
            알려줘야겠구나'라는 생각과 함께 !
            취미로 배우는 분들이 많은 경우이기에전문적인 기술 보다 본인이 즐기며 출수 있는 점을 알려줘야겠다 !
            라는 생각으로 레슨을 진행하였고, 경험 만큼 저의 수업도 많이 성장해 왔다고 자부합니다 !`}
        </div>
      </section>

      {/* 강사 경력 섹션 */}
      <section
        id="work-experience-section"
        className=" w-full max-w-[51.1rem] pt-20"
      >
        <h2 className={h2Style}>강사 경력</h2>
        <div>
          {`ⓐ 수원과학대 공연연기과 졸업 (3년연속 축제 참가 및 수상이력 보유) ⓑ 토니의 춤정모 개설 (개인그룹레슨) ⓒ 유튜브 '춤토니' 커버댄스 컨텐츠 활동중 ⓓ 유튜브 크리에이터 바이올리니스트 '제니윤' 댄스올린 컨텐츠 영상 촬영 및 삼성전자런치콘서트,남이섬페스티발,잠실롯데월드몰 행사 백댄서 참여 ⓔ 결혼식 축하댄스 전문 업체 소속 댄서활동 경력 (레슨및 공연댄서활동) ⓕ 방송댄스 개인레슨 원데이클라스 및 취미반 경력 다수 ⓖ 장기자랑 전문 3회완성 클라스 레슨 경력 다수 ⓗ JTBC 알짜왕 원데이클라스 강사 출연! ⓘ MBC 경제매거진 직장인 강사 출연 !! ⓙ 줌바댄스 강사 자격증 2018년 5월 취득 ! ⓚ 한국일보 재능공유강사 취재! ⓛ L기업 직장인 취미 동호회 강사`}
        </div>
      </section>

      {/* 진행중인 강의 섹션 */}
      <section
        id="class-section"
        className="flex w-full flex-col items-center pt-20"
      >
        <div className="w-full max-w-[51.1rem] ">
          <h2 className={h2Style}>진행중인 강의 </h2>
        </div>
        <ClassList classList={classList} />
      </section>

      {/* 강사 후기 */}
      <section id="review-section" className="w-full max-w-[51.1rem] py-20">
        <h2 className={`flex items-center ${h2Style}`}>
          강사 후기 {review.count}건 <span className="ml-3" />
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
    </main>
  );
};

export default InstructorDetailPage;
