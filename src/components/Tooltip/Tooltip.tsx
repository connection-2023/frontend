import { Children, cloneElement, useState } from 'react';
import React from 'react';
import { TooltipSVG } from '@/icons/svg';

type ChildComponentProps = { setShow: (event: React.MouseEvent) => void };
type ChildComponent = React.ReactElement<ChildComponentProps>;

const Tooltip = ({ children }: { children: ChildComponent[] }) => {
  const [show, setShow] = useState(true);

  const closeViewHandler = (event: React.MouseEvent) => {
    event.stopPropagation();
    setShow(false);
  };

  const childrenWithProps = Children.map(children, (child: ChildComponent) => {
    return cloneElement(child, { setShow: closeViewHandler });
  });

  return (
    <div
      className={`${show && 'group'} relative`}
      onClick={() => setShow(true)}
    >
      <TooltipSVG />
      <div className="fixed left-1/2 top-1/2 z-20 hidden -translate-x-1/2 -translate-y-1/2 transform border border-solid border-gray-700 bg-white shadow-float group-hover:block sm:absolute sm:left-6 sm:top-0 sm:translate-x-0 sm:translate-y-0">
        {childrenWithProps}
      </div>

      <div className="fixed bottom-0 left-0 right-0 top-0 z-10 mx-auto hidden bg-black/25 group-hover:block sm:group-hover:hidden" />
    </div>
  );
};

export default Tooltip;
