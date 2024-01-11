'use client';
import { FieldErrors, FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { PassSVG } from '@/icons/svg';
import { createNewPass } from '@/lib/apis/passApis';
import { accessTokenReissuance } from '@/lib/apis/userApi';
import CreatePass from '../../_components/CreatePass';
import Button from '@/components/Button/Button';
import RouterModal from '@/components/Modal/RouterModal';
import { IcreatePass } from '@/types/pass';

const PassCreateModal = () => {
  const formMethods = useForm<IcreatePass>({ shouldFocusError: false });
  const { handleSubmit } = formMethods;

  const onValid = async (data: IcreatePass) => {
    const { lectureIds } = data;

    const reqData = {
      ...data,
      lectureIds: lectureIds.map(({ value }) => value),
    };
    try {
      if (!window.confirm('패스권을 생성하시겠습니까?')) {
        return;
      }

      await createNewPass(reqData);

      toast.success('패스권 생성 완료');

      window.location.reload();
    } catch (error) {
      if (error instanceof Error && error.message.includes('401')) {
        await accessTokenReissuance();
        await createNewPass(reqData);
      } else {
        toast.error('패스권 생성 실패, 잠시후 다시 시도해주세요.');
        console.error(error);
      }
    }
  };

  const invalid = (data: FieldErrors<IcreatePass>) => {
    Object.values(data).forEach(({ message }) => {
      toast.error(message);
    });
  };

  return (
    <RouterModal>
      <main className="h-screen sm:h-fit">
        <header className="mb-4 flex justify-between gap-2 border-b border-gray-500 px-5 pb-4 pt-5">
          <div className="flex items-center gap-2">
            <PassSVG className="h-6 w-6 fill-black " />
            <h1 className="text-lg font-semibold">패스권 생성하기</h1>
          </div>
        </header>
        <form onSubmit={handleSubmit(onValid, invalid)}>
          <FormProvider {...formMethods}>
            <CreatePass />
          </FormProvider>

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
