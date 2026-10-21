import React from 'react'
import CarbonCredit from '../components/CarbonCredit.js'
import EsgCredit from '../components/EsgCredit.js';
import { Helmet } from 'react-helmet-async';

function Services() {
  return (
    <>
      <Helmet>
            <title>Act East Carbon Credit Services | Sustainable Impact</title>
            <meta name="description" content=" Empower sustainable agriculture with Act East’s Carbon Credit Services turn farming into climate action through eco-conscious produce and partnerships.

"/>
            <link rel="canonical" href="https://acteast.co.in/" />
         </Helmet>
    <div> 
    <CarbonCredit />
    <EsgCredit />
    </div>
    </>
  )
}

export default Services