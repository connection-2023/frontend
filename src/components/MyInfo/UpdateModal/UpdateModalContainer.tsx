import Button from '@/components/Button/Button';
import UniqueButton from '@/components/Button/UniqueButton';

interface UpdateModalContainerProps {
  title: string;
  children: React.ReactNode;
  disabled: boolean;
  updateEvent: () => Promise<void>;
  closeEvent?: () => void;
}

const UpdateModalContainer = ({
  title,
  children,
  disabled,
  updateEvent,
  closeEvent,
}: UpdateModalContainerProps) => {
  return (
    <main className="flex h-full w-full flex-col sm:w-[40rem]">
      <header className="flex justify-center border-b border-solid border-gray-700 pb-6 pt-9 sm:py-4 ">
        <h1 className="text-lg font-semibold sm:text-2xl">{title}</h1>
      </header>
      {children}
      <div className="my-6 flex gap-4 px-4 sm:px-8">
        <div className="hidden w-1/2 sm:block">
          <UniqueButton onClick={closeEvent}>취소</UniqueButton>
        </div>
        <div className="w-full sm:w-1/2">
          <Button
            onClick={updateEvent}
            size="medium"
            color="secondary"
            disabled={disabled}
          >
            변경하기
          </Button>
        </div>
      </div>
    </main>
  );
};

export default UpdateModalContainer;
