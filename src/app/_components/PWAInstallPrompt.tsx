'use client';
import React, { useEffect, useState } from 'react';
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

const PWAInstallPrompt = () => {
  const [prompt, setPrompt] = useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setPrompt(event as BeforeInstallPromptEvent);
    };

    window.addEventListener(
      'beforeinstallprompt',
      handleBeforeInstallPrompt as EventListener,
    );

    return () => {
      window.removeEventListener(
        'beforeinstallprompt',
        handleBeforeInstallPrompt as EventListener,
      );
    };
  }, []);

  const handleInstallClick = () => {
    if (prompt) {
      prompt.prompt();

      prompt.userChoice.then((choiceResult) => {
        console.log(
          choiceResult.outcome === 'accepted' ? 'Accepted' : 'Cancelled',
        );
        setPrompt(null);
      });
    }
  };

  return (
    prompt &&
    !window.matchMedia('(display-mode: standalone)').matches && (
      <div className="fixed bottom-0 left-0 right-0 top-0 z-modal mx-auto overflow-hidden bg-black/60 sm:hidden">
        <article className="absolute bottom-[14%] left-0 right-0 mx-auto w-5/6">
          <section>
            <nav className="mb-1 flex justify-between text-white">
              <button className="text-sm underline">7일동안 안볼래요</button>
              <button>
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
              <button
                onClick={handleInstallClick}
                className={`${ButtonStyles.apply} py-2`}
              >
                앱 설치하기
              </button>
            </div>
          </section>
        </article>
      </div>
    )
  );
};

export default PWAInstallPrompt;
