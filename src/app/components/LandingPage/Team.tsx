import { FC } from "react";
import areesha from "../../assets/images/areesha.png"; // Import images of team members
import raafay from "../../assets/images/raafay.png";
import wajeeha from "../../assets/images/wajeeha.png";

const Team: FC = () => {
  const teamMembers = [
    {
      image: wajeeha.src,
      name: "Wajeeha Usman",
      role: "Lead Developer",
      description: "Specializes in full-stack development and software architecture.",
      style: "mt-[-10px]" // Move Wajeeha's image up
    },
    {
      image: raafay.src,
      name: "M. Abdur Raafay",
      role: "Security Expert",
      description: "Ensures system security, integrity, and privacy protection.",
      style: "mt-[40px]" // Move Raafay's image down
    },
    {
      image: areesha.src,
      name: "Areesha Tariq Khan",
      role: "Machine Learning Specialist",
      description: "Focused on implementing AI/ML models and data-driven insights.",
      style: "mt-[-10px]" // Move Areesha's image up
    },
  ];

  return (
    <div className="bg-lightgray py-12 font-poppins" id="team">
      <h1 className="text-center text-4xl font-bold text-bluedark mb-20 2xl:text-6xl">
        Meet Our Team
      </h1>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 px-4 sm:px-12">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className={`text-center ${member.style}`}
          >
            <img
              src={member.image}
              alt={`member-${index}`}
              className="w-full  mx-auto mb-4 object-cover" // Rectangle image style
            />
            <div className="bg-lightblue p-4 shadow-lg">
              <h2 className="text-2xl font-bold text-bluedark mb-2">
                {member.name}
              </h2>
              <h3 className="text-xl font-medium text-white-light mb-4">
                {member.role}
              </h3>
              <p className="text-white-light">{member.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;
