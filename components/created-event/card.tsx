import { Event } from "./eventInterface";

import Image from "next/image";

const Card = ({ eventItem }: { eventItem: Event }) => {
  return (
    <div className="aspect-[1/0.5] w-full rounded-[2rem] bg-primary shadow-[rgba(125,_100,_255,_0.5)_0_8px_20px_0px]">
      <span className="text-white">{eventItem.id}</span>
      <span className="text-white">{eventItem.title}</span>
    </div>
  );
};

export default Card;
