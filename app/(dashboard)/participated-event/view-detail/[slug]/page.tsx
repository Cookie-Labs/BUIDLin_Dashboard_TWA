'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getEventData } from '@/services/dynamoDB';
import { EventForm } from '@/components/event-interface/eventInterface';

import PosterSection from '@/components/view-detail/posterSection';
import TitleSection from '@/components/view-detail/titleSection';
import AwardSection from '@/components/view-detail/awardSection';
import ChannelSection from '@/components/view-detail/channelSection';
import InformationSection from '@/components/view-detail/informationSection';
import ProgramSection from '@/components/view-detail/programSection';
import SpeakerSection from '@/components/view-detail/speakerSection';
import SponsorSection from '@/components/view-detail/sponsorSection';
import NotFound from './not-found';
import Loading from '../../loading';
import ScrollToTopButton from '@/components/scroll-to-top-button';

export default function ViewDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const router = useRouter();
  const [currentEvent, setCurrentEvent] = useState<EventForm | undefined>(
    undefined,
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const getEvent = async () => {
      try {
        const eventData = await getEventData({ eventId: params.slug });
        if (eventData?.Item !== undefined) {
          const eventItem = eventData.Item as EventForm;
          setCurrentEvent(eventItem);
          setIsLoading(false);
        } else {
          router.push('/');
        }
      } catch (error) {
        console.error('Error!', error);
        setIsLoading(false);
      }
    };

    getEvent();
  }, [params.slug]);

  if (isLoading) {
    return <Loading />;
  } else if (!currentEvent) {
    return <NotFound />;
  } else {
    return (
      <div className="relative flex min-h-[100vh] max-w-[100%] flex-col items-center justify-start gap-[3.2rem] bg-primary">
        <PosterSection posterImgUrl={currentEvent.posterImgUrl} />
        <TitleSection
          title={currentEvent.title}
          host={currentEvent.host}
          hostImgUrl={currentEvent.hostImgUrl}
          description={currentEvent.description}
        />
        {currentEvent.award && <AwardSection award={currentEvent.award} />}
        {currentEvent.telegram && (
          <ChannelSection telegram={currentEvent.telegram} />
        )}
        <InformationSection
          country={currentEvent.country}
          location={currentEvent.location}
          startDate={currentEvent.schedule[0].date}
          endDate={currentEvent.schedule[currentEvent.schedule.length - 1].date}
        />
        {currentEvent.schedule[0].programs && (
          <ProgramSection schedule={currentEvent.schedule} />
        )}
        {currentEvent.speakers && (
          <SpeakerSection speakers={currentEvent.speakers} />
        )}
        {currentEvent.sponsors && (
          <SponsorSection sponsors={currentEvent.sponsors} />
        )}
        <ScrollToTopButton />
      </div>
    );
  }
}
