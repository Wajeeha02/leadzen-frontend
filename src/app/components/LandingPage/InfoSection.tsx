import { FC } from "react";
import gradientBg from "../../assets/svgs/landingpage/solutions2-bg.svg";

const InfoSection: FC = () => {
  return (
    <div id="demo"
      className="relative bg-white-light font-poppins h-[40rem] flex items-center justify-center"
      style={{
        backgroundImage: `url(${gradientBg.src})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
        backgroundPosition: "left",
      }}
    >
      <div className="flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto w-full px-4 sm:px-12 2xl:justify-evenly">
        
        {/* YouTube Iframe on the Left */}
        <div className="w-full md:w-1/2">
          <iframe
            className="w-full h-64 md:h-80 lg:h-96"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        {/* Text on the Right */}
        <div className="w-full md:w-1/2 text-bluedark md:pl-8 mt-8 md:mt-0">
          <h1 className="text-3xl font-bold mb-4 2xl:text-5xl">What is LeadZen?</h1>
          <p className="text-lg leading-relaxed font-medium text-justify 2xl:text-2xl">
          Lead Zen is a Business Acceleration Dashboard designed to provide businesses with real-time actionable insights and smarter data-driven strategies to enhance lead generation and client interaction.
          </p>
        </div>
      </div>
    </div>
  );
};

export default InfoSection;
