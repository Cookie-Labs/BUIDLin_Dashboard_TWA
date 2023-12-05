// import { useRouter } from "next/navigation";

const BottomMenu = () => {
  // const router = useRouter();

  return (
    <div className="fixed bottom-0 z-30 flex h-bottomMenuH w-full items-center justify-evenly bg-secondary sm:max-w-[576px]">
      <button>MENU1</button>
      <button>MENU2</button>
      <button>MENU3</button>
    </div>
  );
}

export default BottomMenu