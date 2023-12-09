'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getEventParticipantsData, getEventData } from '@/services/dynamoDB';
import { FaDownload } from 'react-icons/fa';

import LoadingSpinner from '@/components/loading-spinner';
import ScrollToTopButton from '@/components/scroll-to-top-button';
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

  const escapeCSV = (str: string) => {
    if (str.includes(',') || str.includes('\n') || str.includes('"')) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  };

  const convertToCSV = (questions: string[], data: any[]) => {
    const headers = ['#'].concat(questions.map((q) => escapeCSV(q))).join(',');
    const rows = data
      .map((row, index) =>
        [(index + 1).toString()]
          .concat(
            questions.map((q) => escapeCSV(row[q] ? row[q].toString() : '')),
          )
          .join(','),
      )
      .join('\n');

    return headers + '\n' + rows;
  };

  const downloadCSV = (csvData: string, filename: string) => {
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', filename);

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
  };

  const handleDownload = () => {
    const csvData = convertToCSV(eventQuestion, participants);
    downloadCSV(csvData, 'participants-data.csv');
  };

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
            const submittedParticipants = eventParticipantsData.Items.filter(
              (participant) => participant.userIsSubmitted === true,
            );
            setParticipants(submittedParticipants);
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
    return (
      <div className="flex h-full w-full items-center justify-center">
        <LoadingSpinner color="white" />
      </div>
    );
  } else {
    return (
      <div className="relative">
        <div className="mb-[3rem] flex h-auto w-full items-center justify-between">
          <span className="text-[2rem] font-semiBold text-white">
            Participants
          </span>
          <button
            onClick={handleDownload}
            className="flex cursor-pointer flex-col items-center justify-center gap-[1rem] rounded-[0.5rem] bg-blue07 px-[1.5rem] py-[1rem] text-gray06 duration-200 hover:scale-105 hover:text-white active:scale-100"
          >
            <div className="flex items-center justify-center gap-[1rem]">
              <FaDownload />
              <span className="text-[1.2rem] font-semiBold">
                Export CSV File
              </span>
            </div>
            <span className="text-[0.8rem] font-extraLight">
              ⚠️ It works only in the Windows App.
            </span>
          </button>
        </div>
        <Table questions={eventQuestion} participants={participants} />
        <ScrollToTopButton />
      </div>
    );
  }
}
