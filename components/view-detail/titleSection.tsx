import Image from 'next/image';

const TitleSection = ({
  title,
  host,
  hostImgUrl,
  description,
}: {
  title: string;
  host: string;
  hostImgUrl: string;
  description: string;
}) => {
  return (
    <div className="flex h-auto w-full flex-col items-start justify-center gap-[1.6rem]">
      <span className="text-[2.4rem] font-semiBold text-white">{title}</span>
      <div className="flex items-center justify-start gap-[1.2rem]">
        <Image
          src={hostImgUrl}
          alt="host image url"
          style={{
            width: '3.2rem',
            height: '3.2rem',
            borderRadius: '1.6rem',
            objectFit: 'cover',
          }}
          width={1000}
          height={1000}
        />
        <span className="text-[1.6rem] font-medium text-white">{host}</span>
      </div>
      <span className="text-[1.6rem] font-regular leading-8 text-gray08">
        {description}
      </span>
    </div>
  );
};

export default TitleSection;
