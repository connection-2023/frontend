import { useEffect, useRef } from 'react';
import { CloseSVG } from '@/icons/svg';
import { usefilterStore } from '@/store/filterStore';
import Button from '../Button/Button';

interface MobileFullModalProps {
  handleClosed: () => void;
  filterComponents: JSX.Element[];
}

const FilterMobileModal = ({
  handleClosed,
  filterComponents,
}: MobileFullModalProps) => {
  const { executeAllResets } = usefilterStore((state) => ({
    executeAllResets: state.executeAllResets,
  }));
  const overlayRef = useRef(null);

  const handleKeyUp = (e: KeyboardEvent) => {
    if (e.key !== 'Escape') return;
    handleClosed();
  };

  useEffect(() => {
    window.addEventListener('keyup', handleKeyUp);
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return (
    <div
      ref={overlayRef}
      className="fixed bottom-0 left-0 right-0 top-0 z-modal"
    >
      <section className="flex h-screen w-screen flex-col overflow-y-auto bg-white">
        <header className="relative flex h-24 min-h-[6rem] items-center justify-center border-b border-solid border-gray-300">
          <h1 className="mt-4 text-xl font-semibold">필터</h1>
          <button className="absolute right-4" onClick={handleClosed}>
            <CloseSVG
              width="24"
              height="24"
              className="stroke-gray-500 stroke-2"
            />
          </button>
        </header>
        <div className="mb-24 flex flex-shrink-0 flex-col">
          {filterComponents.map((FilterComponent) => FilterComponent)}
        </div>
        <nav className="fixed bottom-0 flex h-24 w-full justify-center gap-3 bg-white px-3 pt-2">
          <Button onClick={executeAllResets} color="secondary" size="large">
            초기화
          </Button>
          <Button color="primary" size="large">
            적용
          </Button>
        </nav>
      </section>
    </div>
  );
};

export default FilterMobileModal;
