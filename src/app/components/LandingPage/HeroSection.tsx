"use client";

import Image from "next/image";
import { useRouter } from "next/navigation"; // Import useRouter
import { FC } from "react";
import bgImage from "../../assets/images/image.png";
import leftVector1 from "../../assets/svgs/landingpage/left-vector1.svg";
import leftVector2 from "../../assets/svgs/landingpage/left-vector2.svg";
import rightVector from "../../assets/svgs/landingpage/right-vector.svg";
import Header from "./Header";

const HeroSection: FC = () => {
  const router = useRouter(); // Initialize useRouter

  const handleClick = () => {
    router.push("/dashboard"); // Navigate to dashboard page
  };

  const bgImageUrl = `url(${bgImage.src})`;

  return (
    <div
      className="relative max-w-full h-[25rem] sm:h-[37.5rem] md:h-[43.75rem] lg:h-[40rem] xl:h-[40rem] 2xl:h-[50rem] bg-cover bg-no-repeat bg-bluedark"
      id="HeroSection"
      style={{ backgroundImage: bgImageUrl }}
    >
      <Header />

      <div className="flex">
        <div className="flex-col h-[37.5rem] justify-between hidden lg:flex">
          <Image src={leftVector1} width={70} height={70} alt="Vector 1" />
          <Image src={leftVector2} width={70} height={70} alt="Vector 2" />
        </div>

        <div className="relative flex flex-col justify-center w-full h-full text-center text-white p-2 sm:p-12 lg:p-18 mt-16">
          <div className="relative max-w-[80%] sm:max-w-4xl md:max-w-[60%] lg:max-w-[80%] xl:max-w-[90%] mx-auto text-center">
            <h1 className="font-bold text-[4rem] sm:text-[2.5rem] md:text-[1.75rem] lg:text-[6rem] 2xl:text-[7rem] leading-tight sm:leading-tight md:leading-normal lg:leading-normal xl:leading-tight text-lightblue">
              Lead<span className="text-white-light">Zen</span>
            </h1>
          </div>

          <p className="font-medium mt-[0.25rem] text-[1rem] sm:text-[0.4rem] md:text-[0.875rem] lg:text-[2rem] lg:p-4 rounded-lg 2xl:text-[2.5rem] mb-[0.75rem] px-0 sm:px-[1.5rem] md:px-[2rem] lg:justify-center tracking-wide bg-lightblue max-w-sm lg:max-w-4xl mx-auto text-center">
            <span>Transforming Business Insights</span> into Smarter,
            Data-Driven <span className="text-bluedark font-medium">Success</span>
          </p>

          <button
            className="text-white font-bold text-base bg-bluedark w-[11rem] h-[3rem] sm:w-[11rem] lg:w-[12.5rem] 2xl:w-[14rem] 2xl:mt-10 rounded-full mt-[0.5rem] mb-[0.5rem] sm:mt-[1.5rem] sm:mb-[1.5rem] mx-auto hover:bg-white hover:text-bluedark"
            onClick={handleClick}
          >
            Go To Dashboard!
          </button>
        </div>

        <div className="flex-col h-[20rem] justify-between hidden lg:flex">
          <Image src={rightVector} width={70} height={70} alt="Vector 3" />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
