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
          <section className="grid w-[40rem] grid-cols-[1fr,5fr] gap-x-11 gap-y-5 border-b border-solid border-sub-color1 px-5 pb-4">
            <label className="whitespace-nowrap font-semibold">
              패스권 이름
            </label>
            <input
              type="text"
              className="h-7 w-96 rounded-md border border-solid border-gray-500 px-3 focus:outline-none"
            />

            <label className="whitespace-nowrap font-semibold">
              클래스 선택
            </label>
            <div className="flex w-96 flex-col gap-2">
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
                  전체 클래스 적용
                </label>
              </div>
              <div className="h-7">
                <SelectClass options={[]} />
              </div>
              <div className="flex max-h-48 flex-col gap-1 overflow-y-auto ">
                <p className="flex items-center justify-between text-sm text-sub-color1">
                  sadasd
                  <CloseSVG className="h-4 w-4 stroke-gray-500 group-hover:stroke-sub-color1" />
                </p>
              </div>
            </div>

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

            <label className="whitespace-nowrap font-semibold">횟수</label>
            <div className="flex items-center gap-1">
              <input
                type="number"
                className="h-7 w-14 rounded-md border border-solid border-gray-500 text-center focus:outline-none"
              />
              회
            </div>

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
