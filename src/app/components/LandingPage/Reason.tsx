import { FC } from "react";
import reasonBg from "../../assets/svgs/landingpage/gradient.png";
import questionIcon from "../../assets/svgs/landingpage/question.svg"; // Import the SVG
import gradientBg from "../../assets/svgs/landingpage/solutions2-bg.svg";

const Reason: FC = () => {
  return (
    <div id='about'
      className="relative bg-bluedark font-poppins pt-4 h-[40rem] flex items-center justify-center"
      style={{
        backgroundImage: `url(${gradientBg.src})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
        backgroundPosition: "left",
      }}
    >
      <div className="text-center p-4 sm:p-12 ">
        <div className="flex justify-center items-center mb-14">
          <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl 2xl:text-7xl text-white-light">
            Why LeadZen?
          </h1>
          <div className=" w-28 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-24 lg:h-24">
            <img src={questionIcon.src} alt="question icon" />
          </div>
        </div>

        {/* Background applied to p container */}
        <div
          className="relative max-w-xl mx-auto p-10 rounded-lg 2xl:max-w-5xl 2xl:max-h-96 2xl:p-14"
          style={{
            backgroundImage: `url(${reasonBg.src})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <p className="text-white-light text-xl font-medium text-justify 2xl:text-2xl">
            Unlike other AI tools like GPT that risk exposing your data, LeadZen
            ensures complete security and privacy. Your sensitive business
            information stays protected within your organization, offering
            advanced AI insights without compromising confidentiality.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Reason;
