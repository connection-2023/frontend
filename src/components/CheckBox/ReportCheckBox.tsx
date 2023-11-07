import { UseFormRegister, FieldValues } from 'react-hook-form';

interface ReportCheckBoxProps {
  label: string;
  register: UseFormRegister<FieldValues>;
}

const ReportCheckBox = ({ label, register }: ReportCheckBoxProps) => {
  return (
    <li key={label} className="flex items-center gap-1.5">
      <input
        {...register(label)}
        type="checkbox"
        id={label}
        className="h-[1.125rem] w-[1.125rem] checked:accent-sub-color1"
      />
      <label htmlFor={label} className="text-base font-semibold text-gray-100">
        {label}
      </label>
    </li>
  );
};

export default ReportCheckBox;
