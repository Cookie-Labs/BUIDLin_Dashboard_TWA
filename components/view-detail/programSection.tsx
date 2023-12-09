import { format } from 'date-fns';
import { ScheduleForm } from '../event-interface';

const ProgramSection = ({ schedule }: { schedule: ScheduleForm[] }) => {
  return (
    <div className="flex h-auto w-full flex-col items-start justify-center gap-[2.4rem]">
      <div className="flex h-auto w-full flex-col items-start justify-center gap-[0.8rem]">
        <span className="text-xxxl font-medium text-white">Program</span>
        <span className="text-[1.6rem] font-regular leading-8 text-gray08">
          The main program schedule for the hackathon is as follows.
        </span>
      </div>
      <div className="flex h-auto w-full flex-col gap-[1.6rem]">
        {schedule.map((s) => {
          return (
            <div
              key={s.date}
              className="flex h-auto w-full flex-col items-start justify-center gap-[1.6rem]"
            >
              <span className="text-[1.6rem] font-semiBold text-white">
                {format(new Date(s.date), 'MMMM do')}
              </span>
              {s.programs
                ? s.programs.map((p, i) => {
                    return (
                      <div
                        key={i}
                        className="flex h-auto w-full items-center justify-start gap-[1.3rem] rounded-[1.6rem] border border-solid border-gray12 bg-primary bg-primary px-[2rem] py-[1.6rem]"
                      >
                        <div className="flex items-center justify-center rounded-[1.2rem] bg-secondary p-[0.8rem]">
                          <span className="text-[3rem] font-regular text-white">
                            {p.emoji}
                          </span>
                        </div>
                        <div className="flex flex-col items-start justify-center gap-[0.4rem]">
                          <span className="text-[1.6rem] font-medium text-white">
                            {p.title}
                          </span>
                          <span className="text-[1.4rem] font-regular text-gray08">
                            {p.time}
                          </span>
                        </div>
                      </div>
                    );
                  })
                : null}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgramSection;
