import { Suspense } from "react";

import About from "../components/About/About";
import Footer from "../components/LandingPage/Footer";
import Header from "../components/LandingPage/Header";

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
    <Header textColor="text-darkblue"/>
     <About/>
     <Footer/>
    </Suspense>
  );
}
