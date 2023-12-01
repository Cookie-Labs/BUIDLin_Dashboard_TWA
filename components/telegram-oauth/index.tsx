'use client';

import { useState, useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { myFormData } from '@/states/formUserState';
import TelegramLoginButton, { TelegramUser } from 'telegram-login-button';
import { getParticipant, createNewParticipant } from '@/services/dynamoDB';

import { useInitData } from '@tma.js/sdk-react';

import { FaTelegramPlane } from 'react-icons/fa';

interface User {
  addedToAttachmentMenu?: boolean;
  allowsWriteToPm?: boolean;
  firstName: string;
  id: number;
  isBot?: boolean;
  isPremium?: boolean;
  lastName?: string;
  languageCode?: string;
  photoUrl?: string;
  username?: string;
}

export const TelegramOAuth = ({
  eventId,
  allChecked,
  setAllChecked,
}: {
  eventId: string;
  allChecked: boolean;
  setAllChecked: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  // const initData = useInitData();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [userData, setUserData] = useState<User>({
    firstName: '',
    id: 0,
  });
  const [telegramResponse, setTelegramResponse] = useState<TelegramUser>({
    id: 0,
    first_name: '',
    username: '',
    photo_url: '',
    auth_date: 0,
    hash: '',
  });
  const setFormData = useSetRecoilState(myFormData);

  // useEffect(() => {
  //   if (initData && initData.user) {
  //     setUserData(initData.user);
  //   }
  // }, [initData]);

  const handleTelegramResponse = async (response: TelegramUser) => {
    try {
      setTelegramResponse(response);

      let user = await getParticipant({
        tableName: eventId,
        userTelegramId: response.id,
      });

      if (user?.Item === undefined) {
        await createNewParticipant({
          tableName: eventId,
          participantData: {
            userTelegramId: response.id,
            userIsSubmitted: false,
          },
        });
        setIsSubmitted(false);
        setAllChecked(true);
        setFormData({
          userTelegramId: response.id,
          userIsSubmitted: false,
        });
      } else {
        if (user?.Item.userIsSubmitted) {
          setIsSubmitted(true);
          setAllChecked(false);
          setFormData({
            userTelegramId: 0,
            userIsSubmitted: false,
          });
        } else {
          setIsSubmitted(false);
          setAllChecked(true);
          setFormData(user?.Item);
        }
      }
    } catch (error) {
      console.error('Error!', error);
    }
  };

  return (
    <>
      {isSubmitted ? (
        <div className="flex h-auto w-full items-center justify-center">
          <span className="text-center text-[2rem] font-semiBold text-white">
            🎉 Already submitted the form. 🎉
          </span>
        </div>
      ) : allChecked ? (
        <div className="flex h-auto w-auto items-center justify-center rounded-[2rem] bg-[#54a9eb] px-[2.1rem] py-[0.9rem]">
          <span className="text-center text-[1.6rem] font-medium text-white">
            {telegramResponse.first_name} Logged In!
          </span>
        </div>
      ) : userData.id === 0 ? (
        <TelegramLoginButton
          dataOnauth={handleTelegramResponse}
          botName="buidlin_bot"
          className="flex items-center justify-center"
        />
      ) : (
        <button
          className="flex h-auto w-auto items-center justify-center gap-[1.3rem] rounded-[2rem] bg-[#54a9eb] px-[2.1rem] py-[0.9rem]"
          onClick={() => {
            handleTelegramResponse({
              id: userData.id,
              first_name: userData.firstName,
              username: userData.username ?? '',
              photo_url: userData.photoUrl ?? '',
              auth_date: 0,
              hash: '',
            });
          }}
        >
          <FaTelegramPlane className="h-[1.6rem] w-[1.6rem] text-white" />
          <span className="text-center text-[1.6rem] font-medium text-white">
            Sign In
          </span>
        </button>
      )}
    </>
  );
};
