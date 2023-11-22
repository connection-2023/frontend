import React from 'react';
import Modal from '@/components/Modal/ReceiptModal';

const applicationDetails = [
  {
    type: '클래스명',
    content: '"원밀리언 댄스 스튜디오 with리아킴" 에게 배우는 댄스 입문 3회',
  },
  {
    type: '승인일시',
    content: '2023.11.23.14:00:55',
  },
  {
    type: '승인번호',
    content: '21046300',
  },
  {
    type: '결제수단',
    content: '신한카드(2311)',
  },
  {
    type: '결제구분',
    content: '일시불',
  },
  {
    type: '결제정보',
    content: '2023.11.23.14:00:55',
  },
  {
    type: '클래스 금액',
    content: '200,000 원',
  },
  {
    type: '적용 쿠폰',
    content: (
      <>
        - 20,000원 <br />
        (리아킴의 10%할인 쿠폰)
      </>
    ),
  },
];

const BillPage = () => {
  return (
    <Modal>
      <div className="relative mx-auto box-border flex flex-col items-center pb-[3.5rem] leading-normal">
        <h1 className="mb-1 text-lg font-semibold">Connection</h1>
        <p className="text-sm font-semibold text-gray-300">02298798789</p>
        <hr className="my-4 w-full border-main-color" />

        <ul className="mt-4 grid w-full grid-cols-[min-content_minmax(auto,_1fr)] items-baseline  gap-y-2 text-sm font-normal">
          {applicationDetails.map((detail, index) => (
            <React.Fragment key={index}>
              <li className="flex w-fit whitespace-nowrap text-gray-300">
                {detail.type}
              </li>
              <li className="break-words text-right">{detail.content}</li>
              {index === 0 || index === 4 ? (
                <hr className="col-span-2 my-2 border-dashed border-gray-500" />
              ) : null}
            </React.Fragment>
          ))}
        </ul>
        <div className="mb-6 mt-6 flex w-full items-center justify-between ">
          <p className="whitespace-nowrap text-lg font-semibold">총 결제금액</p>
          <p className="whitespace-pre-wrap break-words text-right text-2xl font-semibold text-main-color">
            180,000원
          </p>
        </div>

        <div className="flex w-full flex-col gap-2 text-sm font-medium">
          <button className="h-[1.875rem] cursor-pointer rounded-md border border-solid border-gray-700">
            영수증 저장
          </button>
          <button className="h-[1.875rem] cursor-pointer rounded-md border border-solid border-gray-700">
            결제취소
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default BillPage;
