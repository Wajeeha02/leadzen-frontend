import { Suspense, lazy } from 'react';

// Lazy load components
const Header = lazy(() => import("../components/LandingPage/Header"));
const HeroSection = lazy(() => import("../components/LandingPage/HeroSection"));
const Reason = lazy(() => import("../components/LandingPage/Reason"));
const InfoSection = lazy(() => import("../components/LandingPage/InfoSection"));
const Solution = lazy(() => import("../components/LandingPage/Solution"));
const Blogs = lazy(() => import("../components/LandingPage/Blogs"));
const Team = lazy(() => import("../components/LandingPage/Team"));
const ContactUs = lazy(() => import("../components/LandingPage/ContactUs"));
const Footer = lazy(() => import("../components/LandingPage/Footer"));

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HeroSection  />
      <Reason />
      <InfoSection />
      <Solution />
      <Blogs />
      <Team />
      <ContactUs />
      <Footer />
    </Suspense>
  );
}
