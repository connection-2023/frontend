import Button from '@/components/Button/Button';
import Modal from '@/components/Modal/Modal';

interface PaymentInfoModalProps {
  isModalOpened: boolean;
  handleClosed: () => void;
}

const PaymentInfoModal = ({
  isModalOpened,
  handleClosed,
}: PaymentInfoModalProps) => {
  return (
    <Modal isOpened={isModalOpened} handleClosed={handleClosed}>
      <div className="flex h-full w-full max-w-[40rem] flex-col">
        <h3 className="flex h-14 w-full items-center border-b border-solid border-gray-300 pl-6 text-lg font-bold">
          결제정보/요청사항
        </h3>

        <div className="mb-8 flex h-full w-full flex-col divide-y divide-gray-700 px-4 text-base md:px-6">
          <ul className="mb-3.5 mt-6 flex w-full flex-col gap-2.5 whitespace-nowrap font-medium">
            <li className="flex">
              <p className="mr-3.5 w-24 font-bold">신청자</p>
              <p>신청자</p>
            </li>
            <li className="line-clamp-1 flex">
              <p className="mr-3.5 w-24 whitespace-pre-line break-keep font-bold">
                클래스
              </p>
              <p>원밀리언 댄스 스튜디오 with리아킴 에게 배우는 댄스 입문</p>
            </li>
            <li className="line-clamp-1 flex">
              <p className="mr-3.5 w-24 font-bold">신청내역</p>
              <div className="flex flex-col gap-y-1">
                <p>09월 09일 (토) 15:00-16:00 1명</p>
                <p>09월 09일 (토) 15:00-16:00 1명</p>
              </div>
            </li>
            <li className="line-clamp-1 flex">
              <p className="mr-3.5 w-24 font-bold">합계</p>
              <p>200,000원</p>
            </li>
          </ul>

          <ul className="mb-3.5 flex w-full flex-col gap-2.5 whitespace-nowrap pt-3.5 font-medium">
            <li className="line-clamp-1 flex">
              <p className="mr-3.5 w-24 font-bold">신청일시</p>
              <p>2023.10.23 17:00:55</p>
            </li>
            <li className="flex">
              <p className="mr-3.5 w-24 font-bold">결제방식</p>
              <p>현장결제</p>
            </li>
            <li className="flex">
              <p className="mr-3.5 w-24 shrink-0 font-bold text-main-color">
                취소 위약금
              </p>
              <div className="flex w-full flex-col md:flex-row">
                <p>20,000원</p>
                <span className="ml-2 text-main-color">
                  *취소위약금 입금확인 후 승인해주세요
                </span>
              </div>
            </li>
          </ul>

          <ul className="flex w-full flex-col gap-2.5 whitespace-nowrap pt-3.5 font-medium">
            <li className="flex">
              <p className="mr-3.5 w-24 shrink-0 font-bold">요청사항</p>
              <p className="flex w-full whitespace-pre-line break-keep">
                제가 실내용 신발이 없어서 그런데 따로 준비해주실 수 있나요?
                그리고 수업 시간보다 한 10분 정도 늦을 것 같아요 제가 그날
                회사가 몇시에 끝날지 아직 몰라서... 일찍 갈 수도 있는데 어쨋든
                최대한 노력해볼게요 *가로길이 유지, 세로길이는 글이 길어질수록
                늘어남
              </p>
            </li>
          </ul>

          <div className="mb-8 mt-auto h-fit w-full text-lg md:hidden">
            <Button color="secondary" size="large" onClick={handleClosed}>
              닫기
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default PaymentInfoModal;
