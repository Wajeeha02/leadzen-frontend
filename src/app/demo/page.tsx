import { Suspense } from "react";

import Demo from "../components/Demo/Demo";
import Footer from "../components/LandingPage/Footer";
import Header from "../components/LandingPage/Header";

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Header textColor="text-darkblue"/>
      <Demo/>
      <Footer/>
    </Suspense>
  );
}
