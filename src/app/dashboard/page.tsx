"use client";

import { Suspense } from "react";
import Dashboard from "../components/Dashboard/Dashboard";
import Footer from "../components/LandingPage/Footer";
import Header from "../components/LandingPage/Header";

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Header textColor="text-darkblue"/>
      <Dashboard/>
      <Footer/>
    </Suspense>
  );
}
