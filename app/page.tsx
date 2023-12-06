import Image from 'next/image';
import homeImageUrl from '@/images/home_image.png';
import LoginButton from '@/components/main/loginButton';

export default function HomePage() {
  return (
    <div className="relative flex min-h-[100vh] max-w-[100%] flex-col items-center justify-between bg-primary p-[1.6rem] pt-[3.2rem]">
      <div className="relative aspect-[1/1.9127399] w-[75%]">
        <div className="absolute left-1/2 top-1/2 z-0 aspect-[1/1] w-[60%] origin-center -translate-x-1/2 -translate-y-1/2 transform rounded-[50%] bg-[#FF7200] blur-3xl" />
        <Image
          src={homeImageUrl}
          alt="home image url"
          priority
          className="absolute z-10 h-auto w-full object-fill"
          width={573}
          height={1096}
        />
        <div className="absolute right-0 top-1/2 z-20 flex flex-col items-end justify-center gap-[1rem]">
          <span className="font-mono text-[1.6rem] font-semiBold text-white">
            Welcome to
          </span>
          <div />
          <span className="text-[3.3rem] font-black text-blue05">BUIDLin</span>
          <div />
          <span className="font-mono text-[1.4rem] font-medium text-gray07">
            This app will help you
          </span>
          <span className="font-mono text-[1.4rem] font-medium text-gray07">
            manage your events.
          </span>
        </div>
      </div>
      <LoginButton />
    </div>
  );
}
