'use client';
import { useState } from 'react';
import MobileModal from '@/components/Modal/MobileModal';

const SelectClassModal = () => {
  const [modalView, setModalView] = useState(false);

  const closeModalHandler = () => {
    setModalView(false);
  };

  return (
    <div onClick={() => setModalView(true)} className="h-8 w-full bg-black">
      <MobileModal isOpened={modalView} handleClosed={closeModalHandler}>
        <div>sadasda</div>
      </MobileModal>
    </div>
  );
};

export default SelectClassModal;
