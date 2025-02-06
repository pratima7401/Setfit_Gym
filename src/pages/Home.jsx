import React from 'react';
import Hero from '../Components/Hero';
import Classes from '../pages/Classes';
import MembershipPlans from '../Components/MembershipPlans';
import About from './About';
import TransformationPlans from '../Components/TransformationPlans';

function Home() {
  return (
    <div className='container max-w-auto mx-auto px-4 py-8'>
      <Hero />
      <About />
      <Classes/>
      <MembershipPlans />
      <TransformationPlans/>
      
    </div>
  );
}

export default Home;

