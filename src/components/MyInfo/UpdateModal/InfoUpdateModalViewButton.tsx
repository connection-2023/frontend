'use client';
import Modal from '@/components/Modal/Modal';
import { BigArrowSVG } from '@/icons/svg';
import { useState } from 'react';

const InfoUpdateModalViewButton = ({ children }: { children: JSX.Element }) => {
  const [modalView, setModalView] = useState(false);

  const closeModalHandler = () => {
    setModalView(false);
  };

  return (
    <>
      <button className="justify-self-end" onClick={() => setModalView(true)}>
        <BigArrowSVG
          width="34"
          height="34"
          className="fill-gray-700 hover:fill-black"
        />
      </button>
      <Modal
        disableModalSwipe={true}
        isOpened={modalView}
        handleClosed={closeModalHandler}
      >
        {children}
      </Modal>
    </>
  );
};

export default InfoUpdateModalViewButton;
