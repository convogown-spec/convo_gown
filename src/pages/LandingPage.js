import React from 'react';
import Hero from '../components/Hero/Hero';
import Testimonials from '../components/Testimonials/Testimonials';
import CTASection from '../components/CTASection/CTASection';
import SampleGowns from '../components/SampleGowns/SampleGowns';
import Partners from '../components/Partners/Partners';

const LandingPage = () => {
  return (
    <>
      <Hero />
      <SampleGowns />
      <Partners />
      <Testimonials />
      <CTASection />
    </>
  );
};

export default LandingPage;
