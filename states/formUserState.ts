//TODO: 웹브라우저는 sessionStorage 가능하지만, telegramWebApp에서는 불가능하므로 cloudStorage 봐야함

import { atom } from 'recoil';

export interface FormData {
  [key: string]: any;
}

export interface User {
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

export interface MyEventsData {
  [key: string]: any;
}

export const myFormData = atom<FormData>({
  key: 'formUserState/myFormData',
  default: {
    userTelegramId: 0,
    userIsSubmitted: false,
    userIsParticipated: false,
  },
});

export const myLoginData = atom<User>({
  key: 'formUserState/myLoginData',
  default: {
    firstName: '',
    id: 0,
  },
});

export const myEventsData = atom<MyEventsData>({
  key: 'formUserStat/myEventsData',
  default: {
    id: 0,
    createdEvents: [],
    participatedEvents: [],
    walletAddress: '',
  },
});