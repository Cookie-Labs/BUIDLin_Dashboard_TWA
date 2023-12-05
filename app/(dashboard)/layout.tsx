import DashboardLayout from '@/components/dashboard-layout';

export default function Layout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardLayout>
      <div className="relative z-0 mb-bottomMenuH flex min-h-[calc(100vh-8rem)] max-w-[100%] flex-col items-center justify-start bg-primary p-[1.6rem] pt-[3.2rem]">
        {children}
      </div>
    </DashboardLayout>
  );
}
