import { FC } from "react";
import svg1 from "../../assets/svgs/landingpage/icon1.svg";
import svg2 from "../../assets/svgs/landingpage/icon2.svg";
import svg3 from "../../assets/svgs/landingpage/icon3.svg";
import svg4 from "../../assets/svgs/landingpage/icon4.svg";

const Solutions: FC = () => {
  const solutions = [
    {
      svg: svg1.src,
      title: "Customer Journey Mapping",
      description: "Visualize and analyze each stage of your customer's journey to identify key touchpoints and optimize engagement.",
    },
    {
      svg: svg2.src,
      title: "Sentiment Analysis",
      description: "Assess the effectiveness of your communication strategies to ensure clear, consistent, and impactful client interactions.",
    },
    {
      svg: svg3.src,
      title: "Communication Quality",
      description: "Leverage AI to gauge customer emotions and attitudes across multiple channels for more personalized and responsive strategies.",
    },
    {
      svg: svg4.src,
      title: "Lead Source Analysis",
      description: "Track and evaluate the origin of your leads to refine targeting and improve lead generation efficiency.",
    },
  ];

  return (
    <div className="bg-lightgray py-12 font-poppins" id="solutions">
      <h1 className="text-center text-5xl font-bold text-bluedark mb-12 2xl:text-6xl">
        Our Solution
      </h1>

      <div className="max-w-5xl 2xl:max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-8 2xl:gap-24 px-4 sm:px-12 mb-6">
        {solutions.map((solution, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center bg-lightgrey p-6 rounded-lg shadow-lg  hover:bg-lightblue hover:text-white hover:cursor-pointer"
          >
            <img
              src={solution.svg}
              alt={`icon-${index}`}
              className="w-16 h-16 mb-4"
            />
            <h2 className="text-2xl font-semibold text-bluedark mb-2 hover:text-white">
              {solution.title}
            </h2>
            <p className="text-bluedark text-sm p-6 hover:text-white-light">{solution.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Solutions;
