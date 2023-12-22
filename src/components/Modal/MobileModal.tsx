'use client';

const MobileModal = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="absolute bottom-0 z-modal h-4/5 w-screen rounded-t-lg bg-white pt-2.5 sm:hidden">
      <div className="mb-8 flex w-full justify-center">
        <button className="h-1.5 w-16 rounded-lg bg-gray-700" />
      </div>

      {children}
    </div>
  );
};

export default MobileModal;
