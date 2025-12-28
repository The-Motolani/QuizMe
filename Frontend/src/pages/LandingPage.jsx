import Header from '../components/layout/Header';
 import Hero from '../components/layout/Hero';;
import React from 'react';
import HowItWorks from '../components/layout/HowItWorks';
import Footer from '../components/layout/Footer';



export default function LandingPage() {
  return (
    // <div className="min-h-screen bg-white antialiased mt-25 font-[Charis]">
    <>
      <Header /> 
      <hr className="border-grey-200 mx-15" />
      <Hero />
      <HowItWorks />
      <Footer/>
      </>
 // </div>
  );
}
