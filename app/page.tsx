import Header from './components/Header';
import Hero from './components/Hero';
import WhatIs from './components/WhatIs';
import Why from './components/Why';
import Features from './components/Features';
import HowTo from './components/HowTo';
import FAQ from './components/FAQ';
import Footer from './components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <WhatIs />
      <Why />
      <Features />
      <HowTo />
      <FAQ />
      <Footer />
    </div>
  );
}
