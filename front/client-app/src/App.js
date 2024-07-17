import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import Features from './components/Features';
import Footer from './components/Footer';
import ContactForm from './components/ContactForm';

const Home = () => {
  return (
    <div className="app">
      <main className="main container">
        <HeroSection />
        <Features />
      </main>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<ContactForm />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
