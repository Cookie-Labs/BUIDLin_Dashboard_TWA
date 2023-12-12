import Image from 'next/image';
import { OrganizerForm } from '../event-interface/eventInterface';

const OrganizerSection = ({ organizers }: { organizers: OrganizerForm[] }) => {
  return (
    <div className="flex h-auto w-full flex-col items-start justify-center gap-[2.4rem]">
      <div className="flex h-auto w-full flex-col items-start justify-center gap-[0.8rem]">
        <span className="text-xxxl font-medium text-white">
          Host & Organizers
        </span>
        <span className="text-[1.6rem] font-regular leading-8 text-gray08">
          Host & Organizers of this event.
        </span>
      </div>
      <div className="grid h-auto w-full grid-cols-3 items-start justify-center gap-[2.9rem]">
        {organizers.map((s) => {
          return (
            <div
              key={s.name}
              className="flex flex-col items-center justify-center gap-[0.8rem]"
            >
              <Image
                src={s.imgUrl}
                alt={`${s.name} Image`}
                className="h-[10rem] w-[10rem] rounded-[50%] object-contain"
                width={1000}
                height={1000}
              />
              <span className="text-center text-[1.6rem] font-medium text-white">
                {s.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrganizerSection;
