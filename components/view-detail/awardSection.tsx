import { addCommasToNumber } from '@/utils/parser';
import { AwardForm } from '../event-interface/eventInterface';

const AwardSection = ({ award }: { award: AwardForm[] }) => {
  const totalPrize = award.reduce((acc, item) => {
    return acc + item.teamCount * item.prize;
  }, 0);

  return (
    <div className="flex h-auto w-full flex-col items-start justify-center gap-[2.4rem]">
      <div className="flex h-auto w-full flex-col items-start justify-center gap-[0.8rem]">
        <span className="text-xxxl font-medium text-white">Award</span>
        <span className="text-[1.6rem] font-regular leading-8 text-gray08">
          A total prize pool of {addCommasToNumber(totalPrize)}
          {award[0].currency} is waiting for you in the hackathon.
        </span>
      </div>
      <div className="flex h-auto w-full flex-col items-center justify-center gap-[1.6rem]">
        {award.map((a) => {
          return (
            <div
              key={a.rank}
              className="flex h-auto w-full items-center justify-start gap-[1.3rem] rounded-[1.6rem] bg-secondary px-[2rem] py-[1.6rem]"
            >
              <div className="flex items-center justify-center rounded-[1.2rem] bg-gray14  p-[0.8rem]">
                <span className="text-[3rem] font-regular text-white">
                  {a.emoji}
                </span>
              </div>
              <div className="flex flex-col items-start justify-center gap-[0.4rem]">
                <span className="text-[1.6rem] font-medium text-white">
                  {a.rank} ({a.teamCount} Team)
                </span>
                <span className="text-[1.4rem] font-regular text-gray08">
                  {addCommasToNumber(a.prize)}
                  {a.currency} * {a.teamCount} Team
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AwardSection;
