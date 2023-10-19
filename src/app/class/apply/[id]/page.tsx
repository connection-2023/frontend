'use client';
import { useState } from 'react';
import { FormProvider, useForm, SubmitHandler } from 'react-hook-form';
import { MusicalNoteSVG, NoticeSVG } from '@/icons/svg';
import ApplyClassList from './_components/ApplyClassList';
import ApplySidebar from './_components/ApplySidebar';
import TextAreaSection from '@/components/TextArea/TextAreaSection';
import { paymentType } from '@/types/types';

type FormValues = {
  name: string;
  contact: string;
};

const ClassApplyPage = () => {
  const [payment, setPayment] = useState<paymentType>(null);
  const [contactValidation, setContactValidation] = useState(false);

  const handleContactValidation = () => {
    setContactValidation(true);
  };

  const handlePayment = (type: paymentType) => {
    setPayment((prev) => (prev === type ? null : type));
  };

  const formMethods = useForm<FormValues>({ shouldFocusError: false });
  const { register, handleSubmit } = formMethods;

  const onSubmit: SubmitHandler<FormValues> = (data) => console.log(data);

  return (
    <main className="grid-auto-rows-2 border-box mx-auto mb-20 flex grid w-full max-w-[1440px] grid-cols-[1fr_1.37fr_1fr] gap-x-12 px-[4.5rem]">
      {/* 임시 빈 공간 */}
      <div className="" />

      <section className="w-max max-w-[40rem]">
        <h2 className="flex w-full items-center gap-2 whitespace-pre-line break-keep border-b-[3px] border-solid border-black py-[0.81rem] text-2xl font-bold">
          <MusicalNoteSVG
            width="21"
            height="21"
            className="mr-1 shrink-0 cursor-pointer stroke-black"
          />
          원밀리언 댄스 스튜디오 with 리아킴에게 배우는 댄스 입문
        </h2>
        <section>
          <h3 className="my-2 flex items-center gap-1 font-semibold text-main-color">
            <NoticeSVG
              width="19"
              height="14"
              className="storke-main-color fill-main-color"
            />
            (강사의 말) 꼭 숙지해주세요!
          </h3>
          <div className="text-normal whitespace-pre-line break-keep border border-solid border-black p-2 text-sm">
            {`*실내에서 신을 개인 실내화(운동화)를 챙겨와주세요.\n*수업 24시간 전에 취소할 경우 무료취소 가능합니다. \n*외부음식 반입 금지입니다. 가져왔을 경우 외부에 버리고 오시거나 입장 불가할 수 있습니다 ㅠ`}
          </div>
        </section>

        <FormProvider {...formMethods}>
          <section className="mt-4 px-4 py-[1.31rem] shadow-[0px_1px_4px_1px_rgba(0,0,0,0.25)]">
            <h3 className="text-lg font-semibold">신청한 클래스</h3>
            <ul className="mt-4 divide-y divide-solid divide-sub-color1">
              <ApplyClassList selectedCount={2} />
              <ApplyClassList selectedCount={3} />
            </ul>
          </section>

          <div className="mt-4 px-4 py-[1.31rem] shadow-[0px_1px_4px_1px_rgba(0,0,0,0.25)]">
            <section className="whitespace-nowrap border-b border-solid border-sub-color2 pb-5">
              <h3 className="text-lg font-semibold">예약자 정보</h3>
              <ul className="mt-4 flex flex-col gap-2 text-sm font-semibold text-sub-color3 ">
                <li className="flex  items-center gap-4 px-[0.62rem] py-[0.31rem]">
                  <span>대표자 이름</span>
                  <input
                    {...register('name', { required: true })}
                    className="h-7 rounded-[0.31rem] border border-solid border-sub-color2 px-[0.62rem] py-[0.31rem] focus:outline-sub-color1"
                  />
                </li>
                <li className="flex  items-center gap-4 px-[0.62rem] py-[0.31rem]">
                  <span>대표 연락처</span>
                  <input
                    {...register('contact', { required: true })}
                    className="h-7 rounded-[0.31rem] border border-solid border-sub-color2 px-[0.62rem] py-[0.31rem] focus:outline-sub-color1"
                  />
                  <button
                    onClick={handleContactValidation}
                    className="h-7 w-24 cursor-pointer whitespace-nowrap rounded-md border border-solid border-black bg-black font-medium text-white"
                  >
                    인증번호 발송
                  </button>
                </li>
                {contactValidation && (
                  <li className="flex items-center gap-4 px-[0.62rem] py-[0.31rem]">
                    <span className="w-[64.03px]" />
                    <input
                      //  {...register('verification', { required: true })}
                      className="h-7 rounded-[0.31rem] border border-solid border-sub-color2 px-[0.62rem] py-[0.31rem] focus:outline-sub-color1"
                    />
                    <button className="h-7 w-24 cursor-pointer whitespace-nowrap rounded-md bg-sub-color2 font-medium text-white">
                      인증하기
                    </button>
                  </li>
                )}
              </ul>
            </section>

            <section className="mt-4">
              <h3 className="mb-2 text-lg font-semibold">예약 시 요청사항</h3>
              <TextAreaSection
                placeholder="강사에게 전달해야하는 요청사항을 적어주세요."
                maxLength={200}
                dataName="classRequest"
              />
            </section>
          </div>
        </FormProvider>
        <section className="mt-4 px-4 py-[1.31rem] shadow-[0px_1px_4px_1px_rgba(0,0,0,0.25)]">
          <h3 className="text-lg font-semibold">쿠폰/패스권 적용</h3>
          {/* 쿠폰 선택 */}
        </section>

        <section className="mt-4 px-4 py-[1.31rem] shadow-[0px_1px_4px_1px_rgba(0,0,0,0.25)]">
          <h3 className="text-lg font-semibold">결제 방법 선택</h3>
          <div className="mt-[0.81rem] flex gap-4 whitespace-nowrap text-lg font-semibold">
            <PaymentButton
              type="card"
              currentPayment={payment}
              handlePayment={handlePayment}
            />
            <PaymentButton
              type="deposit"
              currentPayment={payment}
              handlePayment={handlePayment}
            />
          </div>
        </section>
      </section>
      <aside className="h-full max-w-[17rem]">
        <ApplySidebar />
      </aside>
    </main>
  );
};

export default ClassApplyPage;

interface PaymentButtonProps {
  type: paymentType;
  currentPayment: paymentType | null;
  handlePayment: (type: paymentType) => void;
}

const PaymentButton = ({
  type,
  currentPayment,
  handlePayment,
}: PaymentButtonProps) => {
  const isSelected = type === currentPayment;

  return (
    <button
      onClick={() => handlePayment(type)}
      className={`h-16 w-full rounded-[0.31rem] border border-solid border-sub-color2 ${
        isSelected
          ? 'bg-sub-color1 font-bold text-white'
          : 'bg-white text-black'
      }`}
    >
      {type === 'card' ? '카드 결제' : '무통장 입금'}
    </button>
  );
};
