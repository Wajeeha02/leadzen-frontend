import { FC } from "react";
import blogImage1 from "../../assets/images/blogImage1.png"; // Import your blog images
import blogImage2 from "../../assets/images/blogImage2.png";


const Blogs: FC = () => {
  const blogPosts = [
    {
      image: blogImage1.src,
      title: "How LeadZen will help you?",
      description: "Visualize and analyze each stage of your customer's journey to identify key touchpoints and optimize engagement.Communication Quality: Assess the effectiveness of your communication strategies to ensure clear, consistent, and impactful client interactions.",
      link: "#",
    },
    {
      image: blogImage2.src,
      title: "Business acceleration tips and tricks",
      description: "Visualize and analyze each stage of your customer's journey to identify key touchpoints and optimize engagement.Communication Quality: Assess the effectiveness of your communication strategies to ensure clear, consistent, and impactful client interactions.",
      link: "#",
    },
  ];

  return (
    <div className="bg-gray-100 py-12 font-poppins" id="blogs">
      <h1 className="text-center text-4xl font-bold text-bluedark mb-12 2xl:text-6xl">
        Our Blogs
      </h1>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-8 px-4 sm:px-12">
        {blogPosts.map((blog, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-lg overflow-hidden mb-10"
          >
            <img
              src={blog.image}
              alt={`blog-${index}`}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h2 className="text-2xl font-bold text-bluedark mb-2">
                {blog.title}
              </h2>
              <p className="text-gray-600 mb-4 text-xs">{blog.description}</p>
              <a
                href={blog.link}
                className="inline-block bg-bluedark text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Read More
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
