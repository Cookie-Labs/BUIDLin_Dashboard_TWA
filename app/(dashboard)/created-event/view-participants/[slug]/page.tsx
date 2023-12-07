'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getEventParticipantsData, getEventData } from '@/services/dynamoDB';

import { myLoginData } from '@/states/formUserState';
import { useRecoilValue } from 'recoil';
import Table from '@/components/view-participants/table';

export default function ViewParticipantsPage({
  params,
}: {
  params: { slug: string };
}) {
  const router = useRouter();
  const myData = useRecoilValue(myLoginData);
  const [participants, setParticipants] = useState<any[]>([]);
  const [eventQuestion, setEventQuestion] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const getParticipants = async () => {
      try {
        const eventParticipantsData = await getEventParticipantsData({
          eventId: params.slug,
        });
        const eventData = await getEventData({ eventId: params.slug });

        if (
          eventParticipantsData?.Items !== undefined &&
          eventData?.Item !== undefined
        ) {
          if (eventData.Item.hostTelegramId.includes(myData.id)) {
            const slicedApplyForm = eventData.Item.applyForm.slice(1, -1);
            const allQuestions = slicedApplyForm
              .map((qs: any) => qs.questions.map((q: any) => q.question))
              .flat();
            allQuestions.unshift('userTelegramId', 'userIsSubmitted');
            setParticipants(eventParticipantsData.Items);
            setEventQuestion(allQuestions);
            setIsLoading(false);
          } else {
            router.push('/');
          }
        } else {
          router.push('/');
        }
      } catch (error) {
        console.error('Error!', error);
        setIsLoading(false);
      }
    };

    getParticipants();
  }, [params.slug]);

  if (isLoading) {
    <div>isLoading...</div>
  } else {
    return (
      <div>
        <Table questions={eventQuestion} data={participants} />
      </div>
    );
  }
}
