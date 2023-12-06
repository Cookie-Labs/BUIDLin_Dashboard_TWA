import Header from '../header';
import Sidebar from '../sidebar';
import Footer from '../footer';
import BottomMenu from '../bottom-menu';
// <div>{children}</div> min-h-[calc(100vh-topbarH-footerH)]

export default function CommonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-screen">
      <div className="relative flex flex-col">
        <Header />
        <div className="z-0 mt-topbarH min-h-[calc(100vh-20.25rem)] w-screen bg-gray04 p-2 dark:bg-gray12 sm-max:min-h-[calc(100vh-11.75rem)]">
          {children}
        </div>
        <Footer />
        <BottomMenu />
      </div>
      <Sidebar />
    </div>
  );
}
