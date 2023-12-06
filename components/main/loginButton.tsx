'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useMainButton, useInitData } from '@tma.js/sdk-react';

import { myLoginData, myEventsData } from '@/states/formUserState';
import { useSetRecoilState } from 'recoil';

import { getUserData, createNewUser } from '@/services/dynamoDB';

const LoginButton = () => {
  const router = useRouter();
  const mainButton = useMainButton();
  const initData = useInitData();
  const setUserData = useSetRecoilState(myLoginData);
  const setUserEventsData = useSetRecoilState(myEventsData);

  const handleClickLoginButton = async () => {
    try {
      if (initData && initData.user) {
        // Telegram in
        let user = await getUserData({ userTelegramId: initData.user.id });
        if (user?.Item !== undefined) {
          // Not the first time in
          setUserEventsData(user?.Item);
          router.push('/created-event');
        } else {
          // First time in
          await createNewUser({
            firstUserData: {
              id: initData.user.id,
              createdEvents: [],
              participatedEvents: [],
              walletAddress: '',
            },
          });
          router.push('/created-event');
        }
      } // Not Telegram in
    } catch (error) {
      console.error('Error!', error);
    }
  };

  useEffect(() => {
    const onMainButtonClick = () => handleClickLoginButton();

    mainButton.enable().show();
    mainButton.setText('Apply');
    mainButton.on('click', onMainButtonClick);

    return () => {
      mainButton.off('click', onMainButtonClick);
      mainButton.hide();
    };
  }, []);

  useEffect(() => {
    if (initData && initData.user) {
      setUserData(initData.user);
    }
  }, [initData]);

  // for Browser
  //   return (
  //     <button
  //       className="flex h-[6rem] w-full cursor-pointer items-center justify-center rounded-[1.2rem] bg-blue07 duration-200 hover:scale-105 active:scale-100"
  //       onClick={handleClickLoginButton}
  //     >
  //       <span className="text-center font-[semiBold] text-[1.8rem] text-white">
  //         Login
  //       </span>
  //     </button>
  //   );

  // for Telegram App
  return null;
};

export default LoginButton;
