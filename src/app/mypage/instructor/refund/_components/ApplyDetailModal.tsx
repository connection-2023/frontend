import { useState, useRef } from 'react';
import { useClickAway } from 'react-use';
import Button from '@/components/Button/Button';
import Dropdown from '@/components/Dropdown/Dropdown';
import Modal from '@/components/Modal/Modal';

interface ApplyDetailModalProps {
  isModalOpened: boolean;
  handleClosed: () => void;
  statusOptions: any;
}

const ApplyDetailModal = ({
  isModalOpened,
  handleClosed,
  statusOptions,
}: ApplyDetailModalProps) => {
  const [isStatusDropdownOpened, setIsStatusDropdownOpened] = useState(false);
  const statusRef = useRef(null);

  useClickAway(statusRef, () => {
    setIsStatusDropdownOpened(false);
  });

  return (
    <Modal isOpened={isModalOpened} handleClosed={handleClosed}>
      <div className="flex h-full w-[40rem] flex-col">
        <h3 className="flex h-14 w-full items-center border-b border-solid border-gray-300 pl-6 text-lg font-medium">
          신청정보
        </h3>

        <div className="mb-8 h-full w-full divide-y divide-gray-700 px-4 text-base md:px-6">
          <ul className="mb-3.5 mt-6 flex w-full flex-col gap-3.5 whitespace-nowrap font-medium">
            <li className="flex gap-3">
              <p className="w-24 font-bold">신청자</p>
              <p>신청자</p>
            </li>
            <li className="line-clamp-1 flex gap-3">
              <p className="w-24 font-bold">연락처</p>
              <p>010-1234-5678</p>
            </li>
          </ul>

          <ul className="mb-3.5 flex w-full flex-col gap-3.5 whitespace-nowrap pt-3.5 font-medium">
            <li className="flex gap-3">
              <p className="w-24 font-bold">신청 클래스</p>
              <p className="line-clamp-1">
                K-pop 한번에 정복할 수 있는 재미넘치는 댄스수업이에요.
              </p>
            </li>
            <li className="line-clamp-1 flex gap-3">
              <p className="w-24 font-bold">수업일시</p>
              <p>23.09.15 13:00-15:00</p>
            </li>
            <li className="flex gap-3">
              <p className="w-24 font-bold">신청금액</p>
              <p className="font-bold">100,000원</p>
            </li>
            <li className="flex gap-3">
              <p className="w-24 shrink-0 font-bold">취소사유</p>
              <p className="flex w-full whitespace-pre-line break-keep">
                갑자기 독감에 걸려서 부득이하게 수업에 참여할 수
                없게되었습니다... 웬만하면 그냥 갈텐데 독감은 전염성이 있어서
                함부로가기가 좀 그렇네요. 만약에라도 그래도 참여해도 괜찮다면
                연락주세요. 시간은 되니까 갈 수 있거든요~ 그대신 독감 옮겼다고
                뭐라하면 안됩니다.
              </p>
            </li>
          </ul>

          <ul className="flex w-full flex-col gap-3.5 whitespace-nowrap pt-3.5 font-medium">
            <li className="flex gap-3">
              <p className="w-24 font-bold">환불 요청 시간</p>
              <p>23.09.14 09:00</p>
            </li>
            <li className="line-clamp-1 flex gap-3">
              <p className="w-24 font-bold">환불금액</p>
              <p>90,000원</p>
            </li>
            <li className="flex gap-3">
              <p className="w-24 font-bold">환불계좌</p>
              <p>신한 100-234-1345583 (김민정)</p>
            </li>
            <li className="flex gap-3">
              <p className="flex w-24 items-center font-bold">환불 상태</p>
              <div className="flex items-baseline gap-4">
                <p className="text-main-color">환불대기</p>
                <div className="relative w-[4.5rem]" ref={statusRef}>
                  <Button
                    color="default"
                    size="medium"
                    onClick={() => setIsStatusDropdownOpened(true)}
                  >
                    상태변경
                  </Button>

                  {isStatusDropdownOpened && (
                    <Dropdown
                      options={statusOptions}
                      className="left-0 top-10"
                    />
                  )}
                </div>
              </div>
            </li>
          </ul>

          <div className="h-fit w-full text-lg md:hidden">
            <Button color="secondary" size="large" onClick={handleClosed}>
              닫기
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ApplyDetailModal;
