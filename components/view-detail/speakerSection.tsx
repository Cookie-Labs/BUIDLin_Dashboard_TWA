import Image from 'next/image';
import { SpeakersForm } from '../event-interface';

const SpeakerSection = ({ speakers }: { speakers: SpeakersForm[] }) => {
  return (
    <div className="flex h-auto w-full flex-col items-start justify-center gap-[2.4rem]">
      <div className="flex h-auto w-full flex-col items-start justify-center gap-[0.8rem]">
        <span className="text-xxxl font-medium text-white">Speakers</span>
        <span className="text-[1.6rem] font-regular leading-8 text-gray08">
          These are the keynote speakers for this event.
        </span>
      </div>
      <div className="grid h-auto w-full grid-cols-3 items-start justify-center gap-[2.9rem]">
        {speakers.map((s) => {
          return (
            <div
              key={s.name}
              className="flex flex-col items-center justify-center gap-[0.8rem]"
            >
              <Image
                src={s.imgUrl}
                alt={`${s.name} Image`}
                style={{
                  width: '10rem',
                  height: '10rem',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  padding: '1px',
                  backgroundImage:
                    'linear-gradient(to bottom, #AEAA4B, #BB9227, #262A91)',
                }}
                width={1000}
                height={1000}
              />
              <span className="text-center text-[1.6rem] font-medium text-white">
                {s.name}
              </span>
              <span className="text-center text-[1.2rem] font-regular text-gray10">
                {s.position}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SpeakerSection;
