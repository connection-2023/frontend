import { UseFormHandleSubmit, FieldValues } from 'react-hook-form';
import Button from '@/components/Button/Button';
import UniqueButton from '@/components/Button/UniqueButton';

interface EditButtonsProps {
  handleEditCancel: () => void;
  handleSubmit: UseFormHandleSubmit<FieldValues>;
  onSubmit: (data: any) => void;
  invalid: (data: Record<string, any>) => void;
}

const EditButtons = ({
  handleSubmit,
  handleEditCancel,
  onSubmit,
  invalid,
}: EditButtonsProps) => (
  <div className="mb-11 mt-20 flex flex-col gap-2 text-lg font-semibold md:hidden">
    <Button
      type="submit"
      onClick={handleSubmit(onSubmit, invalid)}
      color="secondary"
      size="large"
    >
      수정 완료
    </Button>

    <UniqueButton onClick={handleEditCancel} color="secondary" size="large">
      수정 취소
    </UniqueButton>
  </div>
);

export default EditButtons;
