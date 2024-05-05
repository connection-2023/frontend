'use client';
import { differenceInDays } from 'date-fns';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { useClickAway } from 'react-use';
import { ButtonStyles } from '@/constants/constants';
import { CloseSVG, SmallLogoSVG } from '@/icons/svg';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

const PWAInstallPrompt = ({ isMobile }: { isMobile: boolean }) => {
  const modalRef = useRef(null);
  const [view, setView] = useState(false);
  const [prompt, setPrompt] = useState<BeforeInstallPromptEvent | null>(null);

  useClickAway(modalRef, () => {
    setView(false);
  });

  useEffect(() => {
    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setPrompt(event as BeforeInstallPromptEvent);
    };

    window.addEventListener(
      'beforeinstallprompt',
      handleBeforeInstallPrompt as EventListener,
    );

    setView(checkIfMoreThan7Days);

    return () => {
      window.removeEventListener(
        'beforeinstallprompt',
        handleBeforeInstallPrompt as EventListener,
      );
    };
  }, []);

  const checkIfMoreThan7Days = () => {
    const dateString = localStorage.getItem('appInstallModal');
    if (!dateString) return true;

    const date = new Date(dateString);
    const now = new Date();

    const diffDays = differenceInDays(now, date);

    if (diffDays > 7) {
      localStorage.removeItem('appInstallModal');
      return true;
    } else {
      return false;
    }
  };

  const handleInstallClick = () => {
    if (prompt) {
      prompt.prompt();

      prompt.userChoice.then((choiceResult) => {
        setView(false);
        setPrompt(null);
      });
    }
  };

  const handleCloseWeek = () => {
    setView(false);
    localStorage.setItem('appInstallModal', new Date().toString());
  };

  return (
    isMobile &&
    view &&
    !window.matchMedia('(display-mode: standalone)').matches && (
      <div className="fixed bottom-0 left-0 right-0 top-0 z-modal mx-auto overflow-hidden bg-black/60">
        <article
          ref={modalRef}
          className="absolute bottom-[14%] left-0 right-0 mx-auto w-5/6"
        >
          <section>
            <nav className="mb-1 flex justify-between text-white">
              <button className="text-sm underline" onClick={handleCloseWeek}>
                7일동안 안볼래요
              </button>
              <button onClick={() => setView(false)}>
                <CloseSVG className="size-6 stroke-white stroke-[3px]" />
              </button>
            </nav>
            <div className="flex h-52 w-full flex-col items-center justify-between rounded-md bg-white px-3 py-2">
              <div className="flex flex-grow items-center gap-4 px-5 font-bold">
                <span className="h-fit rounded-lg p-3 shadow-vertical">
                  <SmallLogoSVG className="size-14" />
                </span>
                <div className="flex flex-col">
                  <p className="text-xl text-main-color">커넥션앱에서는</p>
                  <p>실시간 알림과 혜택을 받아보실 수 있어요</p>
                </div>
              </div>
              {prompt ? (
                <button
                  onClick={handleInstallClick}
                  className={`${ButtonStyles.apply} py-2`}
                >
                  앱 설치하기
                </button>
              ) : (
                <Link
                  onClick={() => setView(false)}
                  href="/install-guide"
                  className={`${ButtonStyles.apply} py-2`}
                >
                  자세한 설치방법 알아보기
                </Link>
              )}
            </div>
          </section>
        </article>
      </div>
    )
  );
};

export default PWAInstallPrompt;
