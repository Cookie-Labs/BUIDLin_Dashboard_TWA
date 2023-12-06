// import { myEventsData } from '@/states/formUserState';
// import { useRecoilValue } from 'recoil';

import ScrollToTopButton from '@/components/scroll-to-top-button';

export default function CreatedEventPage() {
  // const eventsData = useRecoilValue(myEventsData);

  return (
    <div className="relative flex flex-col items-center justify-center gap-[3rem]">
      <div>CreatedEventPage</div>
      {/* <div>{eventsData}</div> */}
      {/* <div>{window.location.href}</div> */}
      <ScrollToTopButton />
    </div>
  );
}
