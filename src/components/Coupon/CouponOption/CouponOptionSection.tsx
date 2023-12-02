import { FieldErrors, FieldValues } from 'react-hook-form';

interface CouponOptionSectionProps {
  title: string;
  children: React.ReactNode;
  errors: FieldErrors<FieldValues>;
  registerId: string;
}

const CouponOptionSection = ({
  title,
  children,
  errors,
  registerId,
}: CouponOptionSectionProps) => (
  <section className="flex flex-wrap sm:flex-nowrap sm:items-center sm:gap-10">
    <h2
      className={`${
        errors[registerId] && 'animate-vibration text-main-color'
      } w-36 whitespace-nowrap font-semibold sm:w-1/6`}
    >
      {title}
    </h2>
    {children}
  </section>
);

export default CouponOptionSection;
