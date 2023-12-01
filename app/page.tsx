import ScrollToTopButton from '@/components/scroll-to-top-button';

export default function HomePage() {
  return (
    <div className="relative flex min-h-[100vh] max-w-[100%] flex-col items-center justify-start bg-primary p-[1.6rem] pt-[3.2rem]">
      
      <ScrollToTopButton />
    </div>
  );
}
