import React from 'react';
import Hero from '../Components/Hero';
import Classes from '../pages/Classes';
import MembershipPlans from '../components/MembershipPlans';
import About from './About';
import TransformationPlans from '../components/TransformationPlans';

function Home() {
  return (
    <div className='container max-w-auto mx-auto px-4 py-8'>
      <Hero />
      <Classes/>
      <About />
      <TransformationPlans/>
      <MembershipPlans />
    </div>
  );
}

export default Home;

