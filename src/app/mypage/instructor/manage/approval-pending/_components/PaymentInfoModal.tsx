import PendingStatusButton from './PendingStatusButton';
import Modal from '@/components/Modal/Modal';
/* eslint-disable no-unused-vars */
interface PaymentInfoModalProps {
  isModalOpened: boolean;
  handleClosed: () => void;
  applicant: string;
  classTitle: string;
  applyList: string;
  applyCount: number;
  amount: number;
  applyTime: string;
  paymentMethod: string;
  request: string;
  id: number;
  lectureId: number;
  isApproved: boolean;
  isDeclined: boolean;
  handleDeclineModalStatus: (status: boolean) => void;
  handleApproveStatus: (status: boolean) => void;
}
/* eslint-enable no-unused-vars */
const PaymentInfoModal = ({
  isModalOpened,
  handleClosed,
  applicant,
  classTitle,
  applyList,
  applyCount,
  amount,
  applyTime,
  paymentMethod,
  request,
  id,
  lectureId,
  isApproved,
  isDeclined,
  handleDeclineModalStatus,
  handleApproveStatus,
}: PaymentInfoModalProps) => {
  return (
    <Modal isOpened={isModalOpened} handleClosed={handleClosed}>
      <div className="flex h-full w-full max-w-[40rem] flex-col">
        <h3 className="flex h-14 w-full items-center border-b border-solid border-gray-300 pl-6 text-lg font-bold">
          결제정보/요청사항
        </h3>

        <div className="mb-4 flex h-full w-full flex-col px-4 text-base md:px-6">
          <ul className="mb-3.5 mt-6 flex w-full flex-col gap-2.5 whitespace-nowrap border-b border-dotted border-gray-500 pb-3.5 font-medium">
            <li className="flex">
              <p className="mr-3.5 w-24 font-bold">신청자</p>
              <p>{applicant}</p>
            </li>
            <li className="line-clamp-1 flex">
              <p className="mr-3.5 w-24 whitespace-pre-line break-keep font-bold">
                클래스
              </p>
              <p>{classTitle}</p>
            </li>
            <li className="line-clamp-1 flex">
              <p className="mr-3.5 w-24 font-bold">신청내역</p>
              <div className="flex flex-col gap-y-1">
                <p>{`${applyList} ${applyCount}명`}</p>
              </div>
            </li>
            <li className="line-clamp-1 flex">
              <p className="mr-3.5 w-24 font-bold">합계</p>
              <p>{amount.toLocaleString()}원</p>
            </li>
          </ul>

          <ul className="mb-4 flex w-full flex-col gap-2.5 whitespace-nowrap border-b border-solid border-gray-500 pb-4 pt-3.5 font-medium">
            <li className="line-clamp-1 flex">
              <p className="mr-3.5 w-24 font-bold">신청일시</p>
              <p>{applyTime}</p>
            </li>
            <li className="flex">
              <p className="mr-3.5 w-24 font-bold">결제방식</p>
              <p>{paymentMethod}</p>
            </li>
            <li className="flex">
              <p className="mr-3.5 w-24 shrink-0 font-bold text-main-color">
                예약금
              </p>
              <div className="flex w-full flex-col md:flex-row">
                <p>{amount.toLocaleString()}원</p>
                <span className="ml-2 text-main-color">
                  *예약금 입금확인 후 승인해주세요
                </span>
              </div>
            </li>
          </ul>

          {request && (
            <ul className="flex w-full flex-col gap-2.5 whitespace-nowrap border-b border-solid border-gray-500 pb-4 font-medium">
              <li className="flex">
                <p className="mr-3.5 w-24 shrink-0 font-bold">요청사항</p>
                <p className="flex w-full whitespace-pre-line break-keep">
                  {request}
                </p>
              </li>
            </ul>
          )}

          <div className="flex justify-end">
            <PendingStatusButton
              id={id}
              lectureId={lectureId}
              isApproved={isApproved}
              isDeclined={isDeclined}
              handleDeclineModalStatus={handleDeclineModalStatus}
              handleApproveStatus={handleApproveStatus}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default PaymentInfoModal;
