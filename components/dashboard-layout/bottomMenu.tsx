'use client';

import { useRouter, usePathname } from 'next/navigation';
import { IoIosPeople, IoMdMicrophone, IoIosPerson } from 'react-icons/io';

const BottomMenu = () => {
  const router = useRouter();
  const pathname = usePathname();

  const handleClickButton = (url: string) => {
    router.push(url);
  };

  const menuItems = [
    { path: '/created-event', icon: IoMdMicrophone, label: 'Host' },
    { path: '/participated-event', icon: IoIosPeople, label: 'Guest' },
    { path: '/sbt', icon: IoIosPerson, label: 'SBT' },
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <div className="fixed bottom-0 z-30 flex h-bottomMenuH w-full items-center justify-evenly bg-secondary sm:max-w-[576px]">
      {menuItems.map(({ path, icon: Icon, label }) => (
        <button
          key={path}
          className={`flex cursor-pointer items-center justify-center rounded-[1.5rem] px-[2.2rem] py-[1rem] duration-200 hover:scale-105 active:scale-100 ${
            isActive(path) ? 'gap-[1rem] bg-blue07' : ''
          }`}
          onClick={() => {
            return handleClickButton(path);
          }}
        >
          <Icon
            className={`h-[3.2rem] w-[3.2rem] hover:text-white ${
              isActive(path) ? 'text-white' : 'text-gray11'
            }`}
          />
          <span
            className={`text-xl font-semiBold hover:text-white ${
              isActive(path) ? 'text-white' : 'text-gray11'
            }`}
          >
            {isActive(path) ? label : ''}
          </span>
        </button>
      ))}
    </div>
  );
};

export default BottomMenu;
