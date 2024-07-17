import React from 'react';
import './App.css';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import Features from './components/Features';
import UseCases from './components/UseCases';
import Footer from './components/Footer';

const App = () => {
  return (
    <div className="app">
      <Header />
      <main className="main container">
        <HeroSection />
        <Features />
      </main>
      <Footer />
    </div>
  );
};

export default App;
