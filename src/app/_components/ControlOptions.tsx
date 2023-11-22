'use client';
import * as ChannelService from '@channel.io/channel-web-sdk-loader';
import { useEffect } from 'react';
import { ScrollTopSVG } from '@/icons/svg';
import { useUserStore } from '@/store';
import { IBootOption } from '@/types/types';

const pluginKey = process.env.NEXT_PUBLIC_CHANNEL_TALK_PLUGIN_KEY;

const ControlOptions = () => {
  const userInfo = useUserStore((state) => state.authUser);
  const userType = useUserStore((state) => state.userType);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    if (!pluginKey) return;

    ChannelService.loadScript();

    const bootOption: IBootOption = {
      pluginKey,
      language: 'ko',
    };

    if (userInfo && userType) {
      const { id, name, phoneNumber } = userInfo;
      const profile = {
        name,
        mobileNumber: phoneNumber,
        userType,
      };

      bootOption.id = id;
      bootOption.profile = profile;
    }

    ChannelService.boot(bootOption);

    return () => {
      window.ChannelIO?.('shutdown');
    };
  }, [userInfo]);

  return (
    <button
      onClick={scrollToTop}
      className="flex h-10 w-10 items-center justify-center rounded-full shadow-float backdrop-blur-sm"
    >
      <ScrollTopSVG />
    </button>
  );
};

export default ControlOptions;
