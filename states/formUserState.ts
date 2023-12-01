//TODO: 웹브라우저는 sessionStorage 가능하지만, telegramWebApp에서는 불가능하므로 cloudStorage 봐야함

import { atom } from 'recoil';

export interface FormData {
  [key: string]: any;
}

export const myFormData = atom<FormData>({
  key: 'fromUserState/myFormData',
  default: {
    userTelegramId: 0,
    userIsSubmitted: false,
  },
});
