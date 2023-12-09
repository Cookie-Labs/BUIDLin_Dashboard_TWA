'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { Event } from './eventInterface';
import { format } from 'date-fns';

import { usePopup, useQRScanner } from '@tma.js/sdk-react';

const Card = ({ eventItem, type }: { eventItem: Event; type: string }) => {
  const router = useRouter();
  const popup = usePopup();
  const qrScanner = useQRScanner();

  useEffect(() => {
    if (!popup.isOpened) {
      qrScanner.close();
    }
  }, [popup.isOpened]);

  return (
    <div className="grid min-h-[17rem] w-full grid-cols-2 items-center justify-center gap-[1rem] rounded-[2rem] bg-primary px-[1.5rem] py-[1rem] shadow-[rgba(125,_100,_255,_0.5)_0_8px_20px_0px]">
      <div className="flex h-auto w-full flex-col items-start justify-center gap-[1rem]">
        <div className="aspect-[16/9] w-full rounded-[1.6rem] border border-solid border-secondary">
          <Image
            src={eventItem.posterImgUrl}
            alt="event image url"
            priority
            className="h-auto w-full rounded-[1.6rem] object-fill"
            width={1600}
            height={900}
          />
        </div>
        <div className="items-between flex h-auto w-full justify-start gap-[1rem]">
          <span className="text-[1.5rem]">🎉</span>
          <span className="line-clamp-2 text-[1.2rem] font-medium text-white">
            {eventItem.title}
          </span>
        </div>
        <div className="flex h-auto w-full items-center justify-start gap-[1rem]">
          <span className="text-[1.5rem]">📆</span>
          <span className="text-[1.2rem] font-regular text-gray04">
            {format(eventItem.startDate, 'yy. MM. dd')} ~{' '}
            {format(eventItem.endDate, 'yy. MM. dd')}
          </span>
        </div>
        <div className="flex h-auto w-full items-center justify-start gap-[1rem]">
          <span className="text-[1.5rem]">⏰</span>
          <span className="text-[1.2rem] font-regular text-red">
            {format(eventItem.deadline, 'yy. MM. dd')}
          </span>
        </div>
      </div>
      <div
        className={`grid h-auto w-full items-center justify-center ${
          type === 'Upcoming'
            ? 'grid-rows-3 gap-[2rem]'
            : 'grid-rows-2 gap-[3.3rem]'
        }`}
      >
        <button
          className="cursor-pointer rounded-[0.5rem] bg-secondary px-[1.5rem] py-[1rem] text-[1.4rem] font-bold text-white duration-200 hover:scale-110 hover:bg-gray13 active:scale-100"
          onClick={() => {
            return router.push(
              `/created-event/view-participants/${eventItem.id}`,
            );
          }}
        >
          View Participants
        </button>
        {type === 'Upcoming' ? (
          <>
            <button
              className="cursor-pointer rounded-[0.5rem] bg-secondary px-[1.5rem] py-[1rem] text-[1.4rem] font-bold text-white duration-200 hover:scale-110 hover:bg-gray13 active:scale-100"
              onClick={() => {
                return popup.open({
                  title: 'Coming Soon',
                  message:
                    'If you wish to modify an event, please send an email to jack@cookielabs.me.',
                  buttons: [{ id: 'closePopup', type: 'close' }],
                });
              }}
            >
              Manage Event
            </button>
            <button
              className="flex cursor-pointer flex-col items-center justify-center gap-[0.5rem] rounded-[0.5rem] bg-secondary px-[1.5rem] py-[1rem] text-[1.4rem] font-bold text-white duration-200 hover:scale-110 hover:bg-gray13 active:scale-100"
              onClick={async () => {
                return qrScanner.open('Scan the QR code').then((content) => {
                  popup.open({
                    title: 'Scan Success',
                    message: content as string,
                    buttons: [
                      { id: 'closeScanner', type: 'close'},
                    ],
                  });
                });
              }}
            >
              Ticket Scan
              <span className="text-[0.8rem] font-extraLight text-gray06">
                ⚠️ It works only in the Mobile App.
              </span>
            </button>
          </>
        ) : (
          <div className="px-[1.5rem] py-[1rem] text-[1.4rem] font-bold text-[#FFF200]">
            📣 Event Ended
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
