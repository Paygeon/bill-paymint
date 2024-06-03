import * as React from "react";

interface LabelData {
  title: string;
  subtitle: string;
}

interface ImageData {
  src: string;
  alt: string;
}

interface TimelineProps {
  labelData: LabelData[];
  imageData: ImageData;
}

const TimelineLabel: React.FC<LabelData> = ({ title, subtitle }) => (
  <div className="flex flex-col uppercase tracking-[2px]">
    <div className="text-xs font-semibold leading-3 text-emerald-400">{title}</div>
    <div className="mt-1 text-xs font-bold text-white">{subtitle}</div>
  </div>
);

const Timeline: React.FC<TimelineProps> = ({ labelData, imageData }) => (
  <section className="flex flex-col p-5 bg-emerald-500 max-w-[347px]">
    <header className="flex gap-3.5 justify-between text-base font-bold tracking-wide leading-5 text-white">
      <h1 className="my-auto">Rewards coming soon!</h1>
      <img loading="lazy" src={imageData.src} alt={imageData.alt} className="shrink-0 w-14 aspect-square" />
    </header>
    <div className="flex gap-5 justify-between mt-10">
      {labelData.map((label, index) => (
        <TimelineLabel key={index} {...label} />
      ))}
    </div>
  </section>
);

const GreenCheckMarkCard: React.FC = () => {
  const labelData = [
    { title: "start", subtitle: "Current" },
    { title: "eta", subtitle: "9/24/24" },
  ];

  const imageData = {
    src: "https://cdn.builder.io/api/v1/image/assets/TEMP/75032cb3b814bdbebe3df5053b005fd965165c4162467a34502cb157de855cdd?apiKey=aa19eef6d1f1473ba394866de3aadd86&",
    alt: "Rewards coming soon icon",
  };

  return <Timeline labelData={labelData} imageData={imageData} />;
}

export default GreenCheckMarkCard;