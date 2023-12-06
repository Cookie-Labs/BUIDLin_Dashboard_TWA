'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useMainButton, useInitData } from '@tma.js/sdk-react';

import { myLoginData, myEventsData } from '@/states/formUserState';
import { useSetRecoilState } from 'recoil';

import { getUserData, createNewUser } from '@/services/dynamoDB';

const LoginButton = () => {
  const router = useRouter();

  const setUserData = useSetRecoilState(myLoginData);
  const setUserEventsData = useSetRecoilState(myEventsData);

  const mainButton = useMainButton();
  const initData = useInitData();

  const handleClickTWALoginButton = async () => {
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
          const initUserData = {
            id: initData.user.id,
            createdEvents: [],
            participatedEvents: [],
            walletAddress: '',
          };
          await createNewUser({ firstUserData: initUserData });
          setUserEventsData(initUserData);
          router.push('/created-event');
        }
      } // Not Telegram in
    } catch (error) {
      console.error('Error!', error);
    }
  };

  useEffect(() => {
    const onMainButtonClick = () => handleClickTWALoginButton();

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

  //   const handleClickBrowserLoginButton = async () => {
  //     // TODO: mockData임.

  //     let user = await getUserData({ userTelegramId: 1592912022 });
  //     if (user?.Item !== undefined) {
  //       // Not the first time in
  //       setUserEventsData(user?.Item);
  //       router.push('/created-event');
  //     } else {
  //       // First time in
  //       const initData = {
  //         id: 1592912022,
  //         createdEvents: [],
  //         participatedEvents: [],
  //         walletAddress: '',
  //       };
  //       await createNewUser({ firstUserData: initData });
  //       setUserEventsData(initData);
  //       router.push('/created-event');
  //     }
  //   };

  //   // for Browser
  //   return (
  //     <button
  //       className="flex h-[6rem] w-full cursor-pointer items-center justify-center rounded-[1.2rem] bg-blue07 duration-200 hover:scale-105 active:scale-100"
  //       onClick={handleClickBrowserLoginButton}
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
