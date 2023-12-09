import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { Event } from './eventInterface';
import { format } from 'date-fns';

import { usePopup } from '@tma.js/sdk-react';

const Card = ({ eventItem, type }: { eventItem: Event; type: string }) => {
  const router = useRouter();
  const popup = usePopup();

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
        {type === 'Upcoming' && (
          <div className="flex h-auto w-full items-center justify-start gap-[1rem]">
            <span className="text-[1.5rem]">⏰</span>
            <span className="text-[1.2rem] font-regular text-red">
              {format(eventItem.deadline, 'yy. MM. dd')}
            </span>
          </div>
        )}
      </div>
      <div
        className={`grid h-auto w-full items-center justify-center ${
          type === 'Upcoming'
            ? 'grid-rows-2 gap-[2rem]'
            : 'grid-rows-1 gap-[3.3rem]'
        }`}
      >
        <button
          className="cursor-pointer rounded-[0.5rem] bg-secondary px-[1.5rem] py-[1rem] text-[1.4rem] font-bold text-white duration-200 hover:scale-110 hover:bg-gray13 active:scale-100"
          onClick={() => {
            return router.push(
              `/participated-event/view-detail/${eventItem.id}`,
            );
          }}
        >
          View Detail
        </button>
        {type === 'Upcoming' ? (
          <button
            className="cursor-pointer rounded-[0.5rem] bg-secondary px-[1.5rem] py-[1rem] text-[1.4rem] font-bold text-white duration-200 hover:scale-110 hover:bg-gray13 active:scale-100"
            onClick={() => {
              return popup.open({
                title: 'Coming Soon',
                message: 'It will be created soon!',
                buttons: [{ id: 'closePopup', type: 'close' }],
              });
            }}
          >
            Ticket QRcode
          </button>
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
