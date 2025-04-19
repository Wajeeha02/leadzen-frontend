import { Suspense } from "react";

import ContactUs from "../components/LandingPage/ContactUs";
import Footer from "../components/LandingPage/Footer";
import Header from "../components/LandingPage/Header";

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Header textColor="text-darkblue"/>
      <ContactUs/>
      <Footer/>
    </Suspense>
  );
}
