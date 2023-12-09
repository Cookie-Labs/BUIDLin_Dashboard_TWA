'use client';

import { useState, useEffect } from 'react';
import { myEventsData } from '@/states/formUserState';
import { useRecoilValue } from 'recoil';

import { getEventData } from '@/services/dynamoDB';

import { Event } from '@/components/participated-event/eventInterface';
import Card from '@/components/participated-event/card';
import ScrollToTopButton from '@/components/scroll-to-top-button';

export default function ParticipatedEvent() {
  const [tab, setTab] = useState('Upcoming');
  const eventsData = useRecoilValue(myEventsData);
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [pastEvents, setPastEvents] = useState<Event[]>([]);

  useEffect(() => {
    const classifyEvents = async () => {
      try {
        let myEvents = await Promise.all(
          eventsData.participatedEvents.map(async (eventId: string) => {
            const eachEventData = await getEventData({ eventId: eventId });
            if (eachEventData?.Item !== undefined) {
              return {
                id: eachEventData.Item.id,
                posterImgUrl: eachEventData.Item.posterImgUrl,
                title: eachEventData.Item.title,
                deadline: eachEventData.Item.deadline,
                startDate: eachEventData.Item.schedule[0].date,
                endDate:
                  eachEventData.Item.schedule[
                    eachEventData.Item.schedule.length - 1
                  ].date,
              };
            }
          }),
        );

        const nowTimestamp = Date.now();
        const upcoming: Event[] = [];
        const past: Event[] = [];

        myEvents.forEach((event) => {
          if (event.endDate > nowTimestamp) {
            upcoming.push(event);
          } else {
            past.push(event);
          }
        });

        setUpcomingEvents(upcoming);
        setPastEvents(past);
      } catch (error) {
        console.error('Error!', error);
      }
    };

    classifyEvents();
  }, [eventsData]);

  return (
    <div className="relative flex flex-col items-start justify-center gap-[3rem]">
      <div className="flex h-auto w-full items-center justify-between">
        <span className="text-[2rem] font-semiBold text-white">
          Participated Events
        </span>
        <div className="grid grid-cols-2 items-center justify-center gap-[1rem] rounded-[0.5rem] bg-gray12 p-[0.3rem]">
          <button
            className={`h-auto cursor-pointer overflow-hidden rounded-[0.5rem] px-[0.8rem] py-[0.6rem] ${
              tab === 'Upcoming'
                ? 'bg-blue07 text-white'
                : 'text-gray07 duration-200 hover:scale-105 hover:text-gray05 active:scale-100'
            }`}
            onClick={() => {
              return setTab('Upcoming');
            }}
          >
            Upcoming
          </button>
          <button
            className={`h-auto cursor-pointer overflow-hidden rounded-[0.5rem] px-[0.8rem] py-[0.6rem] ${
              tab === 'Past'
                ? 'bg-blue07 text-white'
                : 'text-gray07 duration-200 hover:scale-105 hover:text-gray05 active:scale-100'
            }`}
            onClick={() => {
              return setTab('Past');
            }}
          >
            Past
          </button>
        </div>
      </div>
      {tab === 'Upcoming' &&
        (upcomingEvents.length !== 0 ? (
          upcomingEvents.map((event: Event) => {
            return <Card key={event.id} eventItem={event} type={tab} />;
          })
        ) : (
          <div className="flex h-auto w-full flex-col items-center justify-center gap-[1rem]">
            <span className="text-[1.5rem] font-semiBold text-white">
              No Upcoming Events
            </span>
            <span className="text-[1rem] font-regular text-gray07">
              Join the event!
            </span>
          </div>
        ))}
      {tab === 'Past' &&
        (pastEvents.length !== 0 ? (
          pastEvents.map((event: Event) => {
            return <Card key={event.id} eventItem={event} type={tab} />;
          })
        ) : (
          <div className="flex h-auto w-full flex-col items-center justify-center gap-[1rem]">
            <span className="text-[1.5rem] font-semiBold text-white">
              No Past Events
            </span>
          </div>
        ))}
      <ScrollToTopButton />
    </div>
  );
}
