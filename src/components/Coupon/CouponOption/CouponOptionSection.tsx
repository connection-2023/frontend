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
  <section className="flex items-center gap-10">
    <h2
      className={`${
        errors[registerId] && 'animate-vibration text-main-color'
      } w-1/6 font-semibold`}
    >
      {title}
    </h2>
    {children}
  </section>
);

export default CouponOptionSection;
