'use client';
import { useState } from 'react';
import { dummyInterestedInstructor } from '@/constants/dummy';
import { ArrowDownSVG } from '@/icons/svg';
import BlockedInstructors from './_components/BlockedInstructors';
import InterestedInstructors from './_components/InterestedInstructors';
import FineSplitIcon from '@/components/InstructorCard/FineSplitIcon';
import LargeSplitIcon from '@/components/InstructorCard/LargeSplitIcon';

const InstructorPage = () => {
  const [isInterested, setIsInterested] = useState(true);
  const [largeImg, setLargeImg] = useState(true);
  const [accordion, setAccordion] = useState(false);

  const imgStateHandler = (state: boolean) => {
    setLargeImg(state);
  };

  return (
    <section className="col-span-1 mx-auto flex w-full flex-col p-4">
      <header className="mb-3 flex justify-center border-b border-solid border-gray-500 pb-3 text-lg font-semibold sm:hidden">
        관심/차단 강사
      </header>
      <nav className="mb-3 flex items-center justify-between whitespace-nowrap sm:mb-8">
        <div className="flex gap-6">
          <button
            className={`flex text-lg font-bold sm:text-2xl ${
              !isInterested && 'text-gray-500'
            }`}
            onClick={() => setIsInterested(true)}
          >
            관심 강사<p>({dummyInterestedInstructor.length})</p>
          </button>
          <button
            className={`text-lg font-bold sm:text-2xl ${
              isInterested && 'text-gray-500'
            }`}
            onClick={() => setIsInterested(false)}
          >
            차단 강사
          </button>
        </div>
        {isInterested && (
          <div className="flex gap-3 sm:hidden">
            <LargeSplitIcon
              activated={largeImg}
              imgStateHandler={imgStateHandler}
            />
            <FineSplitIcon
              activated={!largeImg}
              imgStateHandler={imgStateHandler}
            />
          </div>
        )}
      </nav>

      {isInterested ? (
        <InterestedInstructors
          instructors={dummyInterestedInstructor}
          largeImg={largeImg}
        />
      ) : (
        <section className="flex flex-col gap-4">
          <h3 className="hidden font-semibold sm:block">
            차단한 강사 ({dummyInterestedInstructor.length})명
          </h3>
          <div className="flex flex-col-reverse gap-4 sm:flex-row">
            <BlockedInstructors instructors={dummyInterestedInstructor} />

            <h3 className="font-semibold sm:hidden">
              차단한 강사 ({dummyInterestedInstructor.length})명
            </h3>

            <article className="h-fit w-full border border-solid border-gray-700 bg-white shadow-float sm:w-fit">
              <dl className="m-4 flex flex-col gap-1 text-sm">
                <div className="flex items-center">
                  <dt className="font-semibold text-main-color">
                    Q.강사를 차단하면 어떻게 되나요?
                  </dt>
                  <button
                    onClick={() => setAccordion((state) => !state)}
                    className="sm:hidden"
                  >
                    <ArrowDownSVG
                      className={`fill-main-color duration-200 ${
                        accordion && '-rotate-180'
                      }`}
                    />
                  </button>
                </div>
                <dd className={`${!accordion && 'hidden sm:block'}`}>
                  강사 찾기에서 찾을 수 없으며, 해당 강사가 개설한
                  <br />
                  클래스, 패스권 또한 보여지지 않습니다.
                  <br />
                  강사는 회원님이 다른 클래스에 기재한 후기를 열람
                  <br />할 수 없고 회원님께 채팅을 보낼 수 없습니다.
                </dd>
              </dl>
            </article>
          </div>
        </section>
      )}
    </section>
  );
};

export default InstructorPage;
