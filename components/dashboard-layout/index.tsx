import BottomMenu from './bottomMenu';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mx-auto flex min-h-[100vh] max-w-[100vw] flex-col overflow-hidden sm:min-h-[100vh] sm:max-w-[576px]">
      {children}
      <BottomMenu />
    </div>
  );
}
