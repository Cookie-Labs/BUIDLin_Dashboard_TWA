import Image from "next/image";

const PosterSection = ({posterImgUrl} : {posterImgUrl: string}) => {
  return (
    <div className="aspect-[16/9] w-full">
      <Image
        src={posterImgUrl}
        alt="event image url"
        priority
        style={{
          width: '100%',
          height: 'auto',
          borderRadius: '1.6rem',
          objectFit: 'contain',
        }}
        width={1000}
        height={1000}
      />
    </div>
  );
}

export default PosterSection