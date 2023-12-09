import { formatSchedule } from '@/utils/parser';
import { LocationForm } from '../event-interface';

const InformationSection = ({
  country,
  location,
  startDate,
  endDate,
}: {
  country: string;
  location: LocationForm;
  startDate: number;
  endDate: number;
}) => {
  return (
    <div className="flex h-auto w-full flex-col items-start justify-center gap-[2.4rem]">
      <div className="flex h-auto w-full flex-col items-start justify-center gap-[0.8rem]">
        <span className="text-xxxl font-medium text-white">Information</span>
        <span className="text-[1.6rem] font-regular leading-8 text-gray08">
          Basic information about the event.
        </span>
      </div>
      <div className="flex h-auto w-full flex-col items-center justify-center gap-[1.6rem]">
        <div className="flex h-auto w-full items-center justify-start gap-[1.3rem] rounded-[1.6rem] border border-solid border-gray12 bg-primary bg-primary px-[2rem] py-[1.6rem]">
          <div className="flex items-center justify-center rounded-[1.2rem] bg-secondary p-[0.8rem]">
            <span className="text-[3rem] font-regular text-white">🗓️</span>
          </div>
          <div className="flex flex-col items-start justify-center gap-[0.4rem]">
            <span className="text-[1.6rem] font-medium text-white">
              When is it?
            </span>
            <span className="text-[1.4rem] font-regular text-gray08">
              {formatSchedule(startDate, endDate)}
            </span>
          </div>
        </div>
        <div className="flex h-auto w-full items-center justify-start gap-[1.3rem] rounded-[1.6rem] border border-solid border-gray12 bg-primary bg-primary px-[2rem] py-[1.6rem]">
          <div className="flex items-center justify-center rounded-[1.2rem] bg-secondary p-[0.8rem]">
            <span className="text-[3rem] font-regular text-white">🗺️</span>
          </div>
          <div className="flex flex-col items-start justify-center gap-[0.4rem]">
            <span className="text-[1.6rem] font-medium text-white">
              Where is it?
            </span>
            <span className="text-[1.4rem] font-regular leading-6 text-gray08">
              {location.address}, {country}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InformationSection;
