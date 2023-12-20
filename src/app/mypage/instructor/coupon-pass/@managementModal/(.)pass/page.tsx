'use client';
import { CloseSVG, PassSVG } from '@/icons/svg';
import Button from '@/components/Button/Button';
import SelectClass from '@/components/Coupon/CouponOption/SelectClass';
import RouterModal from '@/components/Modal/RouterModal';

const PassCreateModal = () => {
  return (
    <RouterModal>
      <main className="h-screen sm:h-fit">
        <header className="mb-4 flex justify-between gap-2 border-b border-gray-500 px-5 pb-4 pt-5">
          <div className="flex items-center gap-2">
            <PassSVG className="h-6 w-6 fill-black " />
            <h1 className="text-lg font-semibold">패스권 생성하기</h1>
          </div>
        </header>
        <form>
          <section className="grid w-screen grid-cols-[1fr,5fr] gap-x-7 gap-y-4 border-b border-solid border-sub-color1 px-5 pb-4 sm:w-[40rem] sm:gap-x-11 sm:gap-y-5">
            <label className="col-span-2 whitespace-nowrap font-semibold sm:col-auto">
              패스권 이름
            </label>
            <input
              type="text"
              className="col-span-2 h-7 rounded-md border border-solid border-gray-500 px-3 focus:outline-none sm:col-auto sm:w-96"
            />

            <hr className="col-span-2 border-t border-solid border-gray-500 sm:hidden" />

            <div className="col-span-2 grid grid-cols-[1fr,5fr] items-center gap-x-11 gap-y-1 sm:gap-x-14 sm:gap-y-2">
              <label className="whitespace-nowrap font-semibold">
                클래스 선택
              </label>

              <div className="flex items-center gap-1">
                <input
                  id="lectureIds"
                  type="checkbox"
                  className="peer mr-1 h-7 w-[1.12rem] accent-sub-color1"
                  //   checked={isAllSelected}
                  //   onChange={(e) => classSelectAll(e)}
                />
                <label
                  htmlFor="lectureIds"
                  className="cursor-pointer select-none font-semibold text-gray-500 peer-checked:text-black"
                >
                  전체 클래스
                </label>
              </div>
              <div className="col-span-2 mb-1 h-7 sm:col-auto sm:col-start-2 sm:mb-0 sm:w-96">
                <SelectClass options={[]} />
              </div>
              <div className="col-span-2 flex max-h-48 flex-col gap-1 overflow-y-auto sm:col-auto sm:col-start-2 sm:w-96">
                <p className="flex items-center justify-between text-sm text-sub-color1">
                  sadasd
                  <CloseSVG className="h-4 w-4 stroke-gray-500 group-hover:stroke-sub-color1" />
                </p>
              </div>
            </div>

            <hr className="col-span-2 border-t border-solid border-gray-500 sm:hidden" />

            <label className="whitespace-nowrap font-semibold">
              사용가능 기간
            </label>
            <div className="flex items-center gap-1">
              <input
                type="number"
                className="h-7 w-14 rounded-md border border-solid border-gray-500 text-center focus:outline-none"
              />
              개월
            </div>

            <hr className="col-span-2 border-t border-solid border-gray-500 sm:hidden" />

            <label className="whitespace-nowrap font-semibold">횟수</label>
            <div className="flex items-center gap-1">
              <input
                type="number"
                className="h-7 w-14 rounded-md border border-solid border-gray-500 text-center focus:outline-none"
              />
              회
            </div>

            <hr className="col-span-2 border-t border-solid border-gray-500 sm:hidden" />

            <label className="whitespace-nowrap font-semibold">판매 가격</label>
            <div className="flex items-center gap-1">
              <input
                type="number"
                className="h-7 w-20 rounded-md border border-solid border-gray-500 text-center focus:outline-none"
              />
              원
            </div>
          </section>

          {/* <div>약관 동의 컴포넌트 추가 예정</div> */}

          <div className="mt-5 flex justify-end gap-2">
            <div className="mr-5 w-24 font-semibold">
              <Button type="submit" size="small">
                생성 하기
              </Button>
            </div>
          </div>
        </form>
      </main>
    </RouterModal>
  );
};

export default PassCreateModal;
