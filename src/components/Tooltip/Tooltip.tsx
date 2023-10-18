import { TooltipSVG } from '@/icons/svg';

const Tooltip = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="group relative">
      <TooltipSVG />
      <div className="absolute left-6 top-0 z-10 hidden border border-solid border-sub-color4 bg-white shadow-[0px_1px_4px_0px_rgba(0,0,0,0.25)] group-hover:block">
        {children}
      </div>
    </div>
  );
};

export default Tooltip;
// h-14 w-96
