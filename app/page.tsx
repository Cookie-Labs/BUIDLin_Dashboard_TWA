import ScrollToTopButton from '@/components/scroll-to-top-button';

export default function HomePage() {
  return (
    <div className="relative z-0 mt-topbarH flex min-h-[calc(100vh-11.75rem)] max-w-[100%] flex-col items-center justify-start bg-primary p-[1.6rem] pb-[9.6rem] pt-[3.2rem]">
      <div className="text-[10rem]">Hello</div>
      <ScrollToTopButton />
    </div>
  );
}