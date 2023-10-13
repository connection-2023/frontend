interface CouponContainerProps {
  title: string;
  children: React.ReactNode;
}

const CouponContainer = ({ title, children }: CouponContainerProps) => (
  <section className="flex items-center gap-4">
    <h2 className="w-1/6 font-semibold">{title}</h2>
    {children}
  </section>
);

export default CouponContainer;
