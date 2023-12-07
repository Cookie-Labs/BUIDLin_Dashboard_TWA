import ScrollToTopButton from '@/components/scroll-to-top-button';

export default function SbtPage() {
  return (
    <div className="relative flex flex-col items-start justify-center gap-[3rem]">
      <span className="text-[2rem] font-semiBold text-white">My SBTs</span>
      <ScrollToTopButton />
    </div>
  );
}
