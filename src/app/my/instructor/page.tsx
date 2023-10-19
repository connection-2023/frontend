'use client';
import Image from 'next/image';
import { useState } from 'react';
import { dummyInterestedInstructor } from '@/constants/dummy';
import InstructorCard from '@/components/InstructorCard/InstructorCard';

const InstructorPage = () => {
  const [isInterested, setIsInterested] = useState(true);

  return (
    <section className="mx-auto flex w-full flex-col p-4">
      <nav className="mb-8 flex gap-6">
        <button
          className={`flex text-2xl font-bold ${
            !isInterested && 'text-sub-color2'
          }`}
          onClick={() => setIsInterested(true)}
        >
          관심 강사<p>({dummyInterestedInstructor.length})</p>
        </button>
        <button
          className={`text-2xl font-bold ${isInterested && 'text-sub-color2'}`}
          onClick={() => setIsInterested(false)}
        >
          차단 강사
        </button>
      </nav>

      {isInterested ? (
        <section className="flex flex-wrap gap-4">
          {dummyInterestedInstructor.map((info, i) => (
            <InstructorCard {...info} key={info.name + i} />
          ))}
        </section>
      ) : (
        <section className="flex flex-col gap-4">
          <h3 className="font-semibold">
            차단한 강사 ({dummyInterestedInstructor.length})명
          </h3>

          <div className="flex gap-4">
            <ul className="flex w-5/12 min-w-[18.75rem] flex-col">
              {dummyInterestedInstructor.map(({ name, imgURL }, index) => {
                return (
                  <li
                    key={name + index}
                    className="flex justify-between border-y border-solid border-sub-color4 py-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative h-[34px] w-[34px] rounded-full">
                        <Image
                          src={imgURL[0]}
                          fill
                          alt="사용자 프로필 이미지"
                          style={{ objectFit: 'cover' }}
                          className="rounded-full"
                        />
                      </div>
                      {name}
                    </div>
                    <div className="flex gap-16 text-[#414141]">
                      <button>차단취소</button>
                      <button>신고</button>
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className="h-32 border border-solid border-sub-color4 bg-white shadow-float">
              <dl className="m-4 flex flex-col gap-1 whitespace-nowrap text-sm">
                <dt className="font-semibold text-main-color">
                  Q.강사를 차단하면 어떻게 되나요?
                </dt>
                <dd>
                  강사 찾기에서 찾을 수 없으며, 해당 강사가 개설한
                  <br />
                  클래스, 패스권 또한 보여지지 않습니다.
                  <br />
                  강사는 회원님이 다른 클래스에 기재한 후기를 열람
                  <br />할 수 없고 회원님께 채팅을 보낼 수 없습니다.
                </dd>
              </dl>
            </div>
          </div>
          {/* Profile */}
        </section>
      )}
    </section>
  );
};

export default InstructorPage;
