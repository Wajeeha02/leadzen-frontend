import { Suspense } from "react";

import Blog from "../components/Blogs/Blog";
import Footer from "../components/LandingPage/Footer";
import Header from "../components/LandingPage/Header";

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Header textColor="text-darkblue"/>
    <Blog/>
    <Footer/>
    </Suspense>
  );
}
