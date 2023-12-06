// import { useRouter } from "next/navigation";

export default function BottomMenu() {
  // const router = useRouter();

  return (
    <div className="fixed bottom-0 left-0 z-30 flex h-bottomMenuH w-screen items-center justify-between bg-gray02 px-10 dark:bg-gray14 sm:hidden">
      <button>MENU1</button>
      <button>MENU2</button>
      <button>MENU3</button>
      <button>MENU4</button>
    </div>
  );
}
